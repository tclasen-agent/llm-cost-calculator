"""APP305 static evaluator v1; reads candidates, writes only qualified-map.json here."""
import pathlib,json,hashlib,stat,datetime,re
O=pathlib.Path(__file__).resolve().parent; P=O.parents[3]; B=O.parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def item(p):
 b=p.read_bytes();return dict(path=str(p.relative_to(P)),sha256=sha(b),bytes=len(b),mode=oct(stat.S_IMODE(p.stat().st_mode)))
def load(p):return json.loads(p.read_text())
checks=[]
def check(name,ok,observed):
 checks.append(dict(criterion=name,expected='exact match / bounded proposal',observed=observed,outcome='verified' if ok else 'failed'));assert ok,(name,observed)
subjects=[]
for name,pin in [('model-audit304','e17c4825ea71267b37f7f1b9464429673b932e4a2bae56a8d20b9e160ef38ff4'),('model-recovery306','87c6a3a657571814ce1d5bd4be443e0ad93fe2eaf14c7efe49980416f0baafda')]:
 c=B/name/'CANDIDATE.json';check(name+' candidate pin',sha(c.read_bytes())==pin,pin);subjects.append(item(c));d=load(c)
 actual={str(p.relative_to(P)) for p in c.parent.rglob('*') if p.is_file() and p!=c};expected={f['path'] for f in d['files']}
 check(name+' complete inventory',actual==expected,len(actual))
 for f in d['files']:assert item(P/f['path'])==f and not (P/f['path']).is_symlink(),f
 check(name+' file hashes bytes modes',True,len(d['files']));subjects+=d['files']
 for f in load(c.parent/'source-baseline.json')['files']:assert item(P/f['path'])==f,f
 check(name+' original source baseline',True,'all recorded source files unchanged')
R=B/'model-recovery306';data=json.loads((P/'src/data/models.js').read_text().split('export default ',1)[1].strip().removesuffix(';'));models=data['values'];matrix=load(R/'audit-matrix.json')['models'];receipts=load(R/'receipts.json');evidence=load(R/'source-evidence.json')
check('19 exact stable IDs',len(models)==19 and set(models)=={m['id'] for m in matrix},list(models))
check('38 complete raw receipts',len(receipts)==38 and {(r['model'],r['kind']) for r in receipts}=={(m,k) for m in models for k in ['card','endpoints']},len(receipts))
for r in receipts:
 m=models[r['model']];url='https://openrouter.ai/api/v1/models/'+m['apiModel']+'/endpoints' if r['kind']=='endpoints' else m['source']+'/raw/main/README.md'
 assert r['source_url']==r['final_url']==url and r['status']=='200' and r['exit_code']==0 and r['error'] is None and r['retries']==0 and r['follow_redirects'] is False and r['authentication']=='none' and r['method']=='GET'
 body=(R/r['body_path']).read_bytes();assert sha(body)==r['sha256'] and len(body)==r['bytes']
 headers=(R/r['headers_path']).read_text();codes=re.findall(r'^HTTP/\S+ (\d+)',headers,re.M);assert codes==['200'],codes
 assert datetime.datetime.fromisoformat(r['started_utc'])<=datetime.datetime.fromisoformat(r['finished_utc'])
check('HTTP URLs UTC headers body hashes',True,'38 status200; exact canonical URLs; no redirect status; receipt retry0; actual GET execution not independently replayed')
assert evidence['raw_receipts']==receipts and sum(r['bytes'] for r in receipts)==948949
prior=load(B/'model-audit304/source-evidence.json');assert len(prior['records'])==38 and all('nodename nor servname' in r['error'] and r['bytes']==0 and r['retries']==0 for r in prior['records'])
check('bounded counts and prior failures',prior['web_tool_queries']==1 and prior['conservative_total_attempts']==39 and evidence['cumulative_attempts']==78 and evidence['new306_web_queries']==1,'304 38 DNS+1web;306 38GET+1web;78 cumulative; modelrequests0 as collector/receipt scope')
qualified=[];drifts=[];absent=[];evals=[]
for m in matrix:
 mid=m['id'];old=models[mid]['endpoint'];assert old==m['maintained_endpoint'];raw=load(R/m['raw_json_path']);es=raw['data']['endpoints'];assert len(es)==m['endpoint_rows_observed'] and sha((R/m['raw_json_path']).read_bytes())==m['raw_json_sha256']
 matches=[(i,e) for i,e in enumerate(es) if all(e.get(k)==old[k] for k in ['provider_name','tag','quantization'])]
 assert bool(matches)==m['selected_tuple_present'] and len(matches)<=1
 rowhash=None;pointer=None;observed=None
 if matches:
  i,e=matches[0];pointer='/data/endpoints/'+str(i);assert pointer==m['raw_json_pointer']
  observed={k:e.get(k) for k in old if k!='pricing'};observed['pricing']={k:e['pricing'].get(k) for k in old['pricing']};assert observed==m['selected_observed_owned_fields'];assert e['status']==0 and e['pricing']['discount']==0 and e.get('service_tier') is None
  rowhash=sha(json.dumps(e,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode())
  diffs=[dict(field='endpoint.pricing.'+k,maintained=v,observed=observed['pricing'][k]) for k,v in old['pricing'].items() if observed['pricing'][k]!=v]
  assert all(observed[k]==old[k] for k in old if k!='pricing') and diffs==m['drift']
  if diffs:drifts.append(mid)
 else:absent.append(mid);assert mid=='qwen30' and len(es)==2
 c=m['card'];assert c['canonical_url']==models[mid]['source'];lines=(R/c['raw_path']).read_text().splitlines();assert sha((R/c['raw_path']).read_bytes())==c['sha256'];assert all(0<i<=len(lines) for i in c['identity_line_pointers']+c['evaluation']['lines'])
 if 'evidence' in models[mid]:assert c['evaluation']['lines'];evals.append(mid)
 qualified.append(dict(id=mid,tuple={k:old[k] for k in ['provider_name','tag','quantization']},present=bool(matches),raw_body_sha256=m['raw_json_sha256'],raw_pointer=pointer,full_row_canonical_sha256=rowhash,owned_fields=observed,card_sha256=c['sha256'],evaluation_lines=c['evaluation']['lines']))
check('selected tuple qualification',absent==['qwen30'] and drifts==['glm53'],'18present/17unchanged/1GLMdrift; qwen30Novita/fp8absent; alternatives not qualified')
proposal=load(R/'proposed-data-diff.json');changes=proposal['minimal_changes'];glm=next(m for m in matrix if m['id']=='glm53');assert len(changes)==1 and changes[0]['leaf_changes']==glm['drift'] and changes[0]['proposed_endpoint']==glm['selected_observed_owned_fields'];assert [(d['field'],d['maintained'],d['observed']) for d in glm['drift']]==[('endpoint.pricing.prompt','0.00000055','0.0000004'),('endpoint.pricing.input_cache_read','0.00000018','0.00000012')]
check('two coherent USD/token leaves',True,'same /data/endpoints/9 Inceptron/inceptron/fp4/fp4; companion completion0.00000196 and limits unchanged')
check('eight existing evaluation pointers',len(evals)==8,evals)
check('historical maintenance date',data['maintenance']['reviewed']=='2026-09-27','2026-09-27; no source mutation')
metadata={'Target System':'project','Change Classification':'project','Authorized Scope':'APP-000305 new model-review305/** static independent evidence only','Affected Paths or Resources':'exact304/306 candidate/source baselines and proposed two GLM rate leaves read-only','Owning Role':'Reviewer /root/calculator_review305','Related Requirements':'REQ-000057; owning AGENTS data ownership and preserved usable paths','Related Tasks':'TASK-000165 / RUN-000160 plan revision9','Approval Requirements':'APP-000305 source/proposal review only; separate implementation admission/affected review/PR/main/live required'}
result={**metadata,'observed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'evaluator':'verify.py v1; Python standard library; static no network/Git/source execution','subject_head':'7071c89bf1832b07b6066889c381ef7d10979d20 as recorded baseline; Git not invoked','decision':'PASS_SOURCE_PROPOSAL_ONLY','checks':checks,'subjects':subjects,'qualified_models':qualified,'row_hash_serialization':'UTF-8 JSON sort_keys=True,separators=(comma,colon),ensure_ascii=False; hash binds whole raw row; body SHA binds original raw bytes','failures':[],'limits':['HTTP execution/absence of outside effects not independently replayed; static receipts/collector consistency only','No architecture/config/revision/license/image benchmark requalification; 8 README descriptions corroborated by human inspection','No app implementation, tests, build, inventory generation, browser, deployment or remote-main review','Requested inherited parent model; actual native configuration/reasoning/CPU/token/cost unknown','Optional per-model schema metadata not approved by this two-leaf proposal decision']}
(O/'qualified-map.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'decision':result['decision'],'criteria':len(checks),'subjects':len(subjects),'qualified':len(qualified),'failures':[]}))
