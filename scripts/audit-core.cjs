// Reproducible static audit of Hanami's authored N5/N4 course. Run: node scripts/audit-core.cjs
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.createContext(ctx);
for(const file of ['starter-data.js','n5n4-content.js','n5n4-readings.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../source',file),'utf8'),ctx);
const ch=ctx.window.HANAMI_FOUNDATION_CONTENT.chapters;
let fail=false;
for(const level of ['N5','N4']){
 const chapters=ch.filter(x=>x.level===level),lessons=chapters.flatMap(x=>x.lessons),invalid=lessons.filter(x=>['idea','ja','en','ja2','en2','trap'].some(k=>!String(x[k]||'').trim()));
 const readings=chapters.filter(x=>x.reading?.jp&&x.reading.q?.length>=2);
 console.log(`${level}: ${chapters.length} chapters; ${lessons.length} grammar lessons; ${readings.length} graded readings; ${invalid.length} incomplete lesson fields`);
 if(chapters.length!==15||lessons.length!==75||readings.length!==15||invalid.length)fail=true;
}
process.exitCode=fail?1:0;
