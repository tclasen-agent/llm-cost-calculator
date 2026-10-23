"""Finite unauthenticated primary-source GET audit; no model calls or retries."""
import concurrent.futures, datetime, hashlib, json, pathlib, threading, urllib.request, urllib.error
ROOT = pathlib.Path(__file__).resolve().parent
PROJECT = ROOT.parents[3]
raw = (PROJECT / 'src/data/models.js').read_text()
models = json.loads(raw.split('export default ', 1)[1].rstrip().removesuffix(';'))['values']
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None
opener = urllib.request.build_opener(NoRedirect)
stop = threading.Event()
def get(item):
    mid, kind, url = item
    if stop.is_set():
        return {'model': mid, 'kind': kind, 'url': url, 'skipped': 'prior rate limit or cache cap'}
    record = {'model': mid, 'kind': kind, 'url': url, 'started_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'method': 'GET', 'authentication': 'none', 'retries': 0}
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'Public-model-fact-audit/304', 'Accept': 'application/json'})
        with opener.open(request, timeout=35) as response:
            body = response.read(1024 * 1024 + 1)
            record.update(status=response.status, content_type=response.headers.get('Content-Type'))
    except urllib.error.HTTPError as error:
        body = error.read(1024 * 1024 + 1)
        record.update(status=error.code, error=str(error), retry_after=error.headers.get('Retry-After'))
        if error.code == 429: stop.set()
    except Exception as error:
        record.update(error=type(error).__name__ + ': ' + str(error))
        body = b''
    if len(body) > 1024 * 1024:
        stop.set()
        record['error'] = 'per-response 1 MiB cap exceeded; truncated'
    name = f'raw/{mid}-{kind}.json'
    (ROOT / name).write_bytes(body)
    record.update(path=name, bytes=len(body), sha256=hashlib.sha256(body).hexdigest(), finished_utc=datetime.datetime.now(datetime.timezone.utc).isoformat())
    return record
if __name__ == '__main__':
    (ROOT / 'raw').mkdir(exist_ok=True)
    jobs = [(mid, 'endpoints', 'https://openrouter.ai/api/v1/models/' + model['apiModel'] + '/endpoints') for mid, model in models.items()]
    jobs += [(mid, 'model-card', model['source'].replace('huggingface.co/', 'huggingface.co/api/models/')) for mid, model in models.items()]
    records = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        # Batch at most two to ensure a rate limit stops subsequent work.
        for i in range(0, len(jobs), 2):
            records.extend(pool.map(get, jobs[i:i+2]))
            if stop.is_set(): break
    (ROOT / 'source-evidence.json').write_text(json.dumps({'web_tool_queries': 1, 'max_total_queries': 40, 'records': records}, indent=2) + '\n')
    print(json.dumps({'attempted_gets': len([r for r in records if not r.get('skipped')]), 'bytes': sum(r.get('bytes', 0) for r in records), 'statuses': {str(s): sum(r.get('status') == s for r in records) for s in set(r.get('status') for r in records)}, 'errors': [r for r in records if r.get('error')]}, indent=2))
