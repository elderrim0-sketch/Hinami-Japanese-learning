const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const context={window:{}};vm.createContext(context);
for(const f of ['source/episode-content-v17.js','source/final-trials-v17.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context);
const e=context.window.HANAMI_EPISODES_V17,c=context.window.HANAMI_SPEECH_CLINICS_V17,t=context.window.HANAMI_FINAL_TRIALS_V17;
function assert(x,m){if(!x)throw Error(m)}
assert(e.length===10,'10 original episodes');assert(c.length===16,'16 speech patterns');assert(t.length===15,'15 separate blind trials');
const langs=['N5','N4','N3','N2','N1'];for(const l of langs)assert(e.filter(x=>x.level===l).length===2,'2 episodes for '+l);
for(const s of [...e,...t]){assert(s.id&&langs.includes(s.level),'id and level');assert(s.lines.every(l=>l.ja?.length>3&&l.speaker),'Japanese lines');for(const q of (s.questions||[s]))assert(q.options?.length>=3&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,'answer '+s.id)}
for(const s of e)assert(s.lines.length===16&&s.questions.length===2&&s.lines.every(l=>l.en),`translated 16 lines: ${s.id}`);
assert(new Set([...e,...t].map(x=>x.id)).size===25,'unique evaluation and practice scene ids');
for(const f of ['v17.css','source/episode-content-v17.js','source/final-trials-v17.js','source/immersive-v17.js'])assert(fs.existsSync(path.join(root,f)),f+' missing');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const f of ['episode-content-v17.js','final-trials-v17.js','immersive-v17.js','v17.css']){assert(index.includes(f),'HTML missing '+f);assert(sw.includes(f),'offline cache missing '+f)}
console.log('V17 COURSE AUDIT PASSED:',e.length,'episodes;',e.reduce((n,x)=>n+x.lines.length,0),'translated lines;',c.length,'speech clinics;',t.length,'new blind scenes; all 5 JLPT bands.');
