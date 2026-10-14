const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../source/anime-content.js'),'utf8'),ctx);
const {scenes,levels}=ctx.window.HANAMI_ANIME_CONTENT;
let bad=[];
const ids=new Set();
for(const s of scenes){
 const required=['id','level','genre','title','setting','focus','formal','casual','tip','question','prompt','target','why'];
 const missing=required.filter(k=>!String(s[k]||'').trim());
 if(missing.length)bad.push(`${s.id}: missing ${missing}`);
 if(ids.has(s.id))bad.push(`${s.id}: duplicated ID`);
 ids.add(s.id);
 if(s.lines.length<2||s.lines.some(x=>!x.ja||!x.en||!x.speaker))bad.push(`${s.id}: incomplete dialogue`);
 if(s.options.length!==3||s.answer<0||s.answer>=3)bad.push(`${s.id}: invalid quiz`);
 if(!s.lines.map(x=>x.ja).join('').includes(s.focus))bad.push(`${s.id}: highlighted phrase absent from script`);
}
for(const l of levels){const items=scenes.filter(x=>x.level===l);console.log(`${l}: ${items.length} original listening-first scenes, ${items.reduce((a,s)=>a+s.lines.length,0)} dialogue lines, ${items.length} comprehension questions, ${items.length} output tasks`);if(items.length!==6)bad.push(`${l}: count ${items.length}`)}
console.log('Original scenes',scenes.length,'Structural errors',bad.length);if(bad.length){console.log(bad.join('\n'));process.exitCode=1}
console.log('This audit checks structure, not certified linguistic or JLPT completeness.');
