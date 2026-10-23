"""Bounded public GETs. Run first ONE request, inspect, then remaining requests."""
import datetime, hashlib, json, pathlib, subprocess, sys
ROOT=pathlib.Path(__file__).resolve().parent
PROJECT=ROOT.parents[3]
models=json.loads((PROJECT/'src/data/models.js').read_text().split('export default ',1)[1].rstrip().removesuffix(';'))['values']
def get(mid,kind,url):
    stem=ROOT/'raw'/f'{mid}-{kind}'
    record={'model':mid,'kind':kind,'source_url':url,'started_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'authentication':'none','method':'GET','retries':0,'follow_redirects':False}
    result=subprocess.run(['curl','--silent','--show-error','--max-time','30','--max-redirs','0','--max-filesize','1048576','--proto','=https','--dump-header',str(stem)+'.headers','--output',str(stem)+'.body','--write-out','%{http_code}\n%{url_effective}\n',url],capture_output=True,text=True)
    body=pathlib.Path(str(stem)+'.body')
    content=body.read_bytes() if body.exists() else b''
    if not body.exists(): body.write_bytes(content)
    output=result.stdout.splitlines()
    record.update(exit_code=result.returncode,error=result.stderr or None,status=output[0] if output else None,final_url=output[1] if len(output)>1 else None,finished_utc=datetime.datetime.now(datetime.timezone.utc).isoformat(),body_path=str(body.relative_to(ROOT)),bytes=len(content),sha256=hashlib.sha256(content).hexdigest(),headers_path=str(pathlib.Path(str(stem)+'.headers').relative_to(ROOT)))
    return record
if __name__=='__main__':
    (ROOT/'raw').mkdir(exist_ok=True)
    path=ROOT/'receipts.json'
    receipts=json.loads(path.read_text()) if path.exists() else []
    if sys.argv[1]=='first':
        assert not receipts
        jobs=[('qwen30','endpoints','https://openrouter.ai/api/v1/models/'+models['qwen30']['apiModel']+'/endpoints')]
    else:
        assert len(receipts)==1 and receipts[0]['status']=='200' and receipts[0]['exit_code']==0
        jobs=[(mid,'endpoints','https://openrouter.ai/api/v1/models/'+model['apiModel']+'/endpoints') for mid,model in models.items() if mid!='qwen30']
        jobs += [(mid,'card',model['source']+'/raw/main/README.md') for mid,model in models.items()]
    for mid,kind,url in jobs:
        assert len(receipts)<40
        record=get(mid,kind,url); receipts.append(record)
        path.write_text(json.dumps(receipts,indent=2)+'\n')
        print(json.dumps({k:record[k] for k in ['model','kind','status','exit_code','bytes','error']}),flush=True)
        if record['exit_code'] or record['status']=='429':
            print('STOP shared transport failure/rate limit; no subsequent request',flush=True)
            break
        if sum(r['bytes'] for r in receipts)>20*1024*1024:
            print('STOP cache cap',flush=True); break
