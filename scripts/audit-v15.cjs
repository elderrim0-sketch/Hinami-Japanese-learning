const fs=require('fs'),path=require('path'),vm=require('vm');const base=path.join(__dirname,'..');
const ctx={window:{},Date,console};vm.createContext(ctx);
for(const f of ['starter-data.js','n5n4-content.js','n5n4-readings.js','n3n2-content.js','n3n2-readings.js','n1-content.js','n1-readings.js','anime-content.js','real-life-content.js','true-path.js'])vm.runInContext(fs.readFileSync(path.join(base,'source',f),'utf8'),ctx,{filename:f});
const bad=[];const state={settings:{sound:true},truePath:{clears:{},attempts:{},writing:{},reviews:{},listen:{},selectedLevel:0,scenarios:{},drafts:{}}};let xp=0,renders=0,saves=0;
const api={state,save:()=>saves++,render:()=>renders++,speak:()=>{},toast:()=>{},addXP:n=>xp+=n,addDaily:()=>{},esc:x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'),setPage:()=>{},data:ctx.window.HANAMI_STARTER,goKana:()=>{}};
const app=ctx.window.createHanamiTruePath(api);const stages=app._debug.stages;
const assert=(x,why)=>{if(!x)bad.push(why)};assert(stages.length===100,'Expected 100 levels');assert(app._debug.unlocked(0),'Level 1 should unlock');assert(!app._debug.unlocked(1),'Level 2 should be gated');
const ids=new Set();for(let i=0;i<stages.length;i++){let s=stages[i];assert(s.number===i+1,'Number order '+i);assert(s.lessons.length>=3&&s.lessons.length<=4,'Wrong grammar batch '+s.number);assert(s.reading&&s.reading.jp&&s.reading.q?.length===2,'Missing reading '+s.number);assert(s.listening&&s.listening.options?.length===3,'Missing listening '+s.number);let qs=app._debug.quizItems(s);assert(qs.length>=5,'Too few questions '+s.number);qs.forEach(q=>assert(q.correct>=0&&q.correct<q.options.length,'Invalid choice '+s.number+'/'+q.id));s.lessons.forEach(l=>{if(ids.has(l.id))bad.push('Repeated authored grammar '+l.id);ids.add(l.id);});}
assert(ids.size===375,'Grammar coverage expected 375 got '+ids.size);
for(let level of ['N5','N4','N3','N2','N1']){let ss=stages.filter(s=>s.level===level),rows=ctx.window.HANAMI_REAL_SCENES.filter(s=>s.level===level);assert(ss.length===20,'Wrong stage count '+level);assert(rows.length===5,'Wrong everyday conversation count '+level);}
const open=(i)=>app._debug.select(i);
// Walk every level in the same controlled order as a learner.
for(let i=0;i<100;i++){
 assert(app._debug.unlocked(i),'Next stage not unlocked '+i);open(i);let st=stages[i];assert(app.page().includes('STEP 1'),'Lesson not rendered '+i);
 app.action('tpPhase',{dataset:{phase:'practice'}});
 for(let q of app._debug.quizItems(st)){
  if(q.kind==='listening')app.action('tpReadOnly',{dataset:{}});
  app.action('tpAnswer',{dataset:{index:String(q.correct)}});
  app.action('tpNextQuestion',{dataset:{}});
 }
 app.action('tpPhase',{dataset:{phase:'create'}});
 app.input({target:{id:'tpWriting',value:st.lessons[0].ja}});
 app.action('tpComplete',{dataset:{}});
 assert(state.truePath.clears[i+1]?.passed===true,'Unable to clear stage '+(i+1));
 assert(app.page().includes('cleared'),'Results missing '+(i+1));
}
assert(Object.keys(state.truePath.clears).length===100,'Cleared count wrong');assert(!Object.values(state.truePath.listen).some(x=>x.heard===true),'Read-only fallback mislabelled listening');assert(app._debug.stats().listens===0,'Audio evidence should be 0');assert(Object.keys(state.truePath.reviews).length===100,'Review schedule missing');
// Real-world scenes are reachable from the integrated studio.
app.action('tpBack',{dataset:{}});app.action('tpScenarios',{dataset:{}});assert(app.page().includes('Everyday Japanese'),'Scenario studio not visible');
for(let i=0;i<5;i++){app.action('tpWorldScenes',{dataset:{index:String(i)}});assert((app.page().match(/class="tp-sc-card"/g)||[]).length===11,'Level not showing 11 dialogues: '+i)}
console.log('100 stages / 375 unique grammar lessons / 75 linked readings / 25 everyday and 30 anime scenes');
console.log('100 complete lesson-to-checkpoint workflows simulated, gates and review records present, read-only fallback not counted as listening');
console.log('Checks',bad.length?'FAILED '+bad.length:'PASSED','renders',renders,'saves',saves,'xp',xp);
if(bad.length){console.error(bad.slice(0,30).join('\n'));process.exitCode=1}
