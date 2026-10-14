/* Run from the unpacked project: node scripts/audit-advanced.cjs */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.createContext(ctx);
const src=(name)=>vm.runInContext(fs.readFileSync(path.join(__dirname,'../source',name),'utf8'),ctx,{filename:name});
for(const f of ['n3n2-content.js','n3n2-readings.js','n1-content.js','n1-readings.js'])src(f);
const chapters=ctx.window.HANAMI_ADVANCED_CONTENT.chapters;
let fail=false;
for(const level of ['N3','N2','N1']){
 const cs=chapters.filter(c=>c.level===level),lessons=cs.flatMap(c=>c.lessons);
 const missing=lessons.filter(l=>['id','pattern','idea','ja','en','ja2','en2','trap'].some(k=>!String(l[k]||'').trim()));
 const patterns=new Set(lessons.map(l=>l.pattern));
 const readings=cs.filter(c=>c.reading?.jp&&c.reading.en&&c.reading.q?.length===2);
 const quizzes=cs.flatMap(c=>c.reading?.q||[]);const wrong=quizzes.filter(q=>q.length!==3||q[1]?.length<3||q[2]<0||q[2]>=q[1].length);
 console.log(`${level}: ${cs.length} chapters, ${lessons.length} authored lessons (${patterns.size} unique), ${readings.length} chapter readings, ${quizzes.length} comprehension checks; invalid lessons ${missing.length}, invalid checks ${wrong.length}`);
 if(cs.length!==15||lessons.length!==75||patterns.size!==75||readings.length!==15||quizzes.length!==30||missing.length||wrong.length)fail=true;
}
console.log('\nThis static audit checks structural completeness, NOT linguistic accuracy, native recordings, or JLPT certification.');
if(fail)process.exitCode=1;
