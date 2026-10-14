/* Hanami V11 — independent-original exam preparation and evidence.
 * Does not imply official test endorsement, native audio or expert review.
 */
window.createHanamiReadiness = function (api) {
 'use strict';
 const {state, save, render, data, speak, esc, attr, toast, setPage, ready} = api;
 const S = state.readiness ||= {level:'N5', attempts:[], output:{}, skillGoals:{}};
 S.attempts ||= []; S.output ||= {}; S.skillGoals ||= {};
 const levels=['N5','N4'], names={vocab:'Words',kanji:'Kanji',grammar:'Sentence meaning',reading:'Reading',listening:'Listening'};
 const E=x=>esc(String(x??'')), A=x=>attr(String(x??''));
 const chapters=window.HANAMI_FOUNDATION_CONTENT.chapters;
 const dayMs=86400000;
 const hasReference=l=>ready(l);
 let screen='home', exam=null, cursor=0, reveal=false, draft='', selectedTab='coverage';
 function shuffle(a){let b=a.slice();for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
 function choices(correct,pool){const others=shuffle([...new Set(pool.filter(x=>x&&x!==correct))]).slice(0,3);return others.length>=3?shuffle([correct,...others]):null;}
 function grammarBank(l){return chapters.filter(c=>c.level===l).flatMap(c=>c.lessons)}
 function readBank(l){return chapters.filter(c=>c.level===l).filter(c=>c.reading?.q?.length>=2)}
 function buildForm(l){
   const items=[];
   const vocab=(data.vocab[l]||[]).filter(x=>x.word&&x.reading&&x.meanings?.[0]), kanji=(data.kanji[l]||[]).filter(x=>x.character&&x.meanings?.[0]);
   const grammar=grammarBank(l).filter(x=>x.ja&&x.en&&x.ja2&&x.en2), stories=readBank(l);
   function wordOrKanji(t,list,max){
      const pool=[...new Set(list.map(x=>x.meanings?.[0]?.trim()).filter(Boolean))];
      for(const item of shuffle(list).slice(0,Math.min(max,list.length))){
        const correct=item.meanings[0].trim(), opts=choices(correct,pool);
        if(!opts)continue;
        items.push({kind:t, prompt:t==='vocab'?'Choose the meaning of this Japanese word.':'Choose the meaning of this kanji.',jp:t==='vocab'?item.word:item.character,options:opts,answer:correct,explain:`${t==='vocab'?item.word+'（'+item.reading+'）':item.character}: ${item.meanings.join('; ')}`});
      }
   }
   wordOrKanji('vocab',vocab,14);wordOrKanji('kanji',kanji,9);
   const english=[...new Set(grammar.flatMap(g=>[g.en,g.en2]).filter(Boolean))];
   for(const g of shuffle(grammar).slice(0,14)){
     const useSecond=Math.random()<.5,jp=useSecond?g.ja2:g.ja,en=useSecond?g.en2:g.en;
     const opts=choices(en,english);if(!opts)continue;
     items.push({kind:'grammar',prompt:'What does this sentence mean?',jp,options:opts,answer:en,explain:`${g.pattern} · ${g.idea} · Watch out: ${g.trap}`});
   }
   const used=shuffle(stories);
   function addReading(kind,subset){
     for(const ch of subset){const s=ch.reading;
       for(const [qi,q] of s.q.slice(0,2).entries()){
         if(!Array.isArray(q[1])||q[1].length<3||!Number.isInteger(q[2]))continue;
         items.push({kind,prompt:q[0],jp:kind==='reading'?s.jp:'',audio:kind==='listening'?s.jp:null,
           story:ch.name,options:q[1],answer:q[1][q[2]],explain:`${s.jp} — ${s.en}`,passageKey:s.id});
       }
     }
   }
   addReading('reading',used.slice(0,3));addReading('listening',used.slice(3,6));
   // An additional writing checkpoint is purposely not auto-marked; many natural translations are possible.
   const output=shuffle(grammar).slice(0,6).map(g=>({kind:'output',prompt:'Translate into Japanese. Write your own sentence, then compare with a model.',en:g.en,model:g.ja,pattern:g.pattern,tip:g.idea}));
   return {items:shuffle(items),output,counts:{vocab:vocab.length,kanji:kanji.length,grammar:grammar.length,stories:stories.length},libraryReady:hasReference(l)};
 }
 function grade(){if(!exam)return null;const result={},mistakes=[];
   for(const kind of Object.keys(names)){
     const indices=exam.form.items.map((q,i)=>[q,i]).filter(([q])=>q.kind===kind);
     const correct=indices.filter(([q,i])=>exam.answers[i]===q.answer && (kind!=='listening'||exam.heard[i])).length;
     result[kind]={correct,total:indices.length,percent:indices.length?Math.round(100*correct/indices.length):null};
     indices.forEach(([q,i])=>{if(exam.answers[i]!==q.answer||(kind==='listening'&&!exam.heard[i]))mistakes.push({kind,question:q.prompt,jp:q.jp||q.audio,answer:q.answer,yours:exam.answers[i]||'Unanswered',explain:q.explain});});
   }
   const total=Object.values(result).reduce((a,b)=>a+b.total,0),correct=Object.values(result).reduce((a,b)=>a+b.correct,0);
   const sectionPass=Object.values(result).every(x=>x.total>=3&&x.percent>=80);
   return {skills:result,correct,total,percent:total?Math.round(100*correct/total):0,sectionPass,mistakes};
 }
 function milestones(l){const passes=S.attempts.filter(x=>x.level===l&&x.sectionPass&&x.fullReference).sort((a,b)=>a.at-b.at);
   const spaced=passes.some((x,i)=>passes.slice(i+1).some(y=>y.at-x.at>=7*dayMs));
   return {passes:passes.length,spaced,sourceReady:hasReference(l),outputCount:Object.values(S.output).filter(x=>x.level===l&&x.text?.trim().length>=3).length};
 }
 function coverageStats(l){
   const sessions=state.coverage?.sessions||{},found=state.foundations||{};
   const grammar=grammarBank(l),all=[...data.vocab[l].map(x=>['vocab',x.id||x.word]),...data.kanji[l].map(x=>['kanji',x.character]),...grammar.map(x=>['grammar','authored-'+x.id]),...data.grammar[l].map(x=>['grammar',x.id||x.pattern])];
   let introduced=0,retained=0;
   for(const [type,id] of all){const r=sessions[`${l}:${type}:${id}`];if(r?.introduced)introduced++;
     const successes=(r?.attempts||[]).filter(x=>x.ok&&!['introduction','self-rating'].includes(x.mode)).sort((a,b)=>a.at-b.at);
     const days=new Set(successes.map(x=>new Date(x.at).toLocaleDateString('en-CA')));
     if(successes.length>=3&&days.size>=3&&successes.at(-1).at-successes[0].at>=6*dayMs&&r.attempts.at(-1)?.ok)retained++;
   }
   const chaptersAt=chapters.filter(x=>x.level===l),completed=chaptersAt.filter(c=>c.lessons.every(lesson=>found.lessons?.[lesson.id])&&!!found.readings?.[c.id]?.read&&(found.chapters?.[c.id]||[]).some(x=>x.score>=85)).length;
   const passageAudio=chaptersAt.filter(c=>window.HANAMI_NATIVE?.hasClip?.(c.reading?.jp||'')).length;
   const read=chaptersAt.filter(c=>!!found.readings?.[c.id]?.read).length;
   const heard=chaptersAt.filter(c=>!!found.readings?.[c.id]?.listen).length;
   return {catalogued:all.length,introduced,retained,completed,chapterTotal:chaptersAt.length,read,heard,passageAudio,libraryComplete:hasReference(l)};
 }
 const card=(title,body)=>`<section class="rd-card"><h3>${title}</h3>${body}</section>`;
 function home(){const l=S.level,f=buildForm(l),m=milestones(l);
   return `<div class="rd-root"><div class="rd-hero"><div><span class="rd-kicker">HANAMI V11 · REAL SKILL EVIDENCE</span><h1>From studying to <em>understanding.</em></h1><p>Practise every part of N5 and N4 separately. Real reading, audio-first comprehension and original sentence production—not only flashcard recognition.</p><div class="rd-levels">${levels.map(v=>`<button data-act="rdLevel" data-level="${v}" class="${v===l?'on':''}">${v} · ${v==='N5'?'Foundations':'Everyday language'}</button>`).join('')}</div></div><div class="rd-stamp">合格<small>Practice. Review. Repeat.</small></div></div>
   <div class="rd-notice">${m.sourceReady?'✓ Full '+l+' reference sets are available on this device.':'⚠ Only starter reference content is loaded. This practice is available, but results do not cover the full community '+l+' list.'} <button data-act="rdLibrary">Library settings ↗</button></div>
   <div class="rd-grid">${card('Current question pool',`<div class="rd-numbers"><span><b>${f.counts.vocab}</b> words</span><span><b>${f.counts.kanji}</b> kanji</span><span><b>${f.counts.grammar}</b> authored grammar topics</span><span><b>${f.counts.stories}</b> chapter passages</span></div><p>Data changes when you sync the full library; no claim of official item-list completeness.</p>`)}
   ${card('Readiness evidence',`<div class="rd-numbers"><span><b>${m.passes}</b> sectional passes with full library</span><span><b>${m.spaced?'Yes':'No'}</b> 7-day retest</span><span><b>${m.outputCount}</b> saved original translations</span></div><p>A pass requires at least 80% separately in <em>each</em> section. This tracks internal practice—not JLPT certification.</p>`)}</div>
   ${(()=>{const c=coverageStats(l);return `<div class="rd-coverage"><div><b>${c.retained} / ${c.catalogued}</b><span>Community-list words, kanji &amp; grammar retained in spaced active recall</span></div><div><b>${c.completed} / ${c.chapterTotal}</b><span>Chapters with lessons, reading and quiz completed</span></div><div><b>${c.passageAudio} / ${c.chapterTotal}</b><span>Matching licensed human-recorded chapter passages</span></div><div><b>${c.heard} / ${c.chapterTotal}</b><span>Listening-first chapter passages completed</span></div></div><p class="rd-fine">Counts reflect installed data. The complete community-list benchmark is available only after the N5/N4 library is synced; list coverage is not official JLPT syllabus certification.</p>`})()}
   <div class="rd-actions"><button class="rd-primary" data-act="rdStart">Start mixed-skills practice exam →</button><button data-act="rdOutput">Try sentence production →</button><button data-act="rdEvidence">View my results →</button></div>
   <div class="rd-grid">${card('How this check works',`<ol><li>Answer meaning questions for words, kanji, and grammar <em>in sentences</em>.</li><li>Read three full chapter passages.</li><li>Play three listening passages before answering; no transcript is shown first.</li><li>Write original Japanese using model sentences as feedback.</li><li>Repeat a different form after at least seven days.</li></ol>`)}
   ${card('What it cannot certify',`<p>These authored exercises and browser-spoken passages do not duplicate the official JLPT blueprint or a qualified examiner. Imported human audio plays where a licensed transcript match exists.</p><p><a target="_blank" rel="noopener" href="https://www.jlpt.jp/e/samples/sampleindex.html">Use official JLPT audio and practice workbooks ↗</a></p>`)}</div></div>`;
 }
 function start(){const form=buildForm(S.level);if(form.items.length<25){toast('Insufficient question pool. Load more data in Settings.');return;}
   exam={level:S.level,form,answers:{},heard:{},started:Date.now(),submitted:false,mark:null,formId:`${Date.now()}-${Math.floor(Math.random()*1e5)}`};cursor=0;screen='test';render();}
 const qAt=()=>exam?.form.items[cursor];
 function question(){if(!exam)return home();const q=qAt();if(!q)return home();const picked=exam.answers[cursor],isAudio=q.kind==='listening';
  const section=names[q.kind]||q.kind;const progress=Math.round((cursor+1)/exam.form.items.length*100);
  return `<div class="rd-root rd-test"><div class="rd-head"><button data-act="rdAbort">← Leave exam</button><span>${E(exam.level)} · ${E(section)} · ${cursor+1}/${exam.form.items.length}</span></div><div class="rd-bar"><b style="width:${progress}%"></b></div><div class="rd-card rd-question"><span class="rd-kicker">${E(section.toUpperCase())}</span><h2>${E(q.prompt)}</h2>
  ${q.story?`<span class="rd-scene">${E(q.story)}</span>`:''}
  ${q.audio?`<div class="rd-listening"><div class="rd-listen-icon">♫</div><p>Listen before reading. Japanese text stays hidden until results.</p><button class="rd-primary" data-act="rdPlay">${exam.heard[cursor]?'Replay Japanese ↻':'Play Japanese ▶'}</button><small>${window.HANAMI_NATIVE?.hasClip?.(q.audio)?'Your licensed human recording':'Device-generated Japanese voice (not a human recording)'}</small></div>`:q.jp?`<div class="rd-japanese" lang="ja">${E(q.jp)}</div>`:''}
  <div class="rd-choices">${q.options.map((o,i)=>`<button data-act="rdChoose" data-choice="${A(o)}" class="${picked===o?'selected':''}" ${isAudio&&!exam.heard[cursor]?'disabled':''}><span>${'ABCD'[i]}</span> ${E(o)}</button>`).join('')}</div>
  <div class="rd-control"><button data-act="rdPrev" ${cursor===0?'disabled':''}>← Previous</button>${cursor===exam.form.items.length-1?`<button class="rd-primary" data-act="rdFinish">Grade all answers →</button>`:`<button class="rd-primary" data-act="rdNext">Next question →</button>`}</div><small>${Object.keys(exam.answers).length} of ${exam.form.items.length} answered · unanswered count as incorrect</small></div></div>`;
 }
 function finish(){if(!exam||exam.submitted)return;const mark=grade();exam.submitted=true;exam.mark=mark;
   S.attempts.push({at:Date.now(),level:exam.level,sectionPass:mark.sectionPass,fullReference:exam.form.libraryReady,skills:mark.skills,correct:mark.correct,total:mark.total,percent:mark.percent});if(S.attempts.length>100)S.attempts=S.attempts.slice(-100);
   save();screen='results';render();}
 function results(){if(!exam?.mark)return home();const m=exam.mark;
   return `<div class="rd-root"><div class="rd-head"><button data-act="rdHome">← Readiness studio</button><span>${exam.level} · Your result</span></div><div class="rd-result"><span class="rd-kicker">IN-APP PRACTICE · NOT OFFICIAL</span><h1>${m.percent}%</h1><p>${m.correct}/${m.total} objectively scored answers. ${m.sectionPass?'All section thresholds reached.':'Revisit the weakest sections and try again.'}</p><div class="rd-grid">${Object.keys(names).map(k=>`<div class="rd-skill"><b>${E(names[k])}</b><strong>${m.skills[k].total?m.skills[k].percent+'%':'N/A'}</strong><div class="rd-bar"><b style="width:${m.skills[k].percent||0}%"></b></div><small>${m.skills[k].correct}/${m.skills[k].total} correct</small></div>`).join('')}</div></div><div class="rd-actions"><button class="rd-primary" data-act="rdOutput">Practise sentence production →</button><button data-act="rdStart">New form ↻</button></div>${card('Review every missed question',m.mistakes.length?m.mistakes.map((x,i)=>`<details class="rd-miss"><summary>${i+1}. ${E(names[x.kind])} · ${E(x.question)}</summary><p lang="ja">${E(x.jp||'')}</p><p>Your answer: <b>${E(x.yours)}</b></p><p>Correct: <b>${E(x.answer)}</b></p><p>${E(x.explain)}</p></details>`).join(''):'<p>You answered every scored question correctly.</p>')}</div>`;
 }
 function output(){const authored=grammarBank(S.level);const saved=S.output;
    return `<div class="rd-root"><div class="rd-head"><button data-act="rdHome">← Readiness studio</button><span>${S.level} · Create Japanese</span></div><div class="rd-hero"><div><span class="rd-kicker">SENTENCE PRODUCTION · 6 TASKS</span><h1>Make Japanese <em>your own.</em></h1><p>Write a natural Japanese sentence for each English idea. Reveal one model afterward. Alternative valid translations exist: model matching is not an automatic correctness score.</p></div></div><div class="rd-output-list">${authored.slice(0,6).map((g,i)=>{const id=`${S.level}-${g.id}`,draft=saved[id]?.text||'';return `<section class="rd-card"><span class="rd-kicker">${S.level} · TASK ${i+1} / 6 · ${E(g.pattern)}</span><h3>${E(g.en)}</h3><p>${E(g.idea)}</p><label for="rdDraft${i}">Write your Japanese:</label><textarea rows="2" id="rdDraft${i}" data-rd-draft="${A(id)}" placeholder="日本語で書いてください">${E(draft)}</textarea><button data-act="rdReveal" data-id="${A(id)}">${saved[id]?.reveal?'Hide model':'Show model answer and explanation'} →</button>${saved[id]?.reveal?`<div class="rd-example"><div lang="ja">${E(g.ja)}</div><p>${E(g.trap)}</p><button data-act="rdSpeak" data-text="${A(g.ja)}">♫ Hear the model</button></div>`:''}</section>`}).join('')}</div></div>`;
 }
 function evidence(){const arr=S.attempts.filter(x=>x.level===S.level).slice().reverse();const m=milestones(S.level);
   return `<div class="rd-root"><div class="rd-head"><button data-act="rdHome">← Readiness studio</button><span>${S.level} · Evidence</span></div><section class="rd-card"><h1>What your results actually show</h1><p>Section scores help you find weaknesses. They are not externally calibrated, and a passing score is not the same as an official N5/N4 qualification.</p><p>${m.passes} internal sectional pass(es) with a full reference library · delayed second pass: <b>${m.spaced?'Recorded':'Not yet'}</b></p></section><div class="rd-output-list">${arr.map((r,i)=>`<div class="rd-card"><span class="rd-kicker">${new Date(r.at).toLocaleDateString()} · ${r.fullReference?'FULL COMMUNITY REFERENCE':'STARTER REFERENCE'}</span><h3>${r.percent}% · ${r.sectionPass?'All thresholds met':'More practice needed'}</h3><p>${Object.keys(r.skills).map(k=>`${names[k]} ${r.skills[k].percent??'n/a'}%`).join(' · ')}</p></div>`).join('')||card('No attempts yet','<p>Take your first mixed-skills practice to begin collecting evidence.</p>')}</div><div class="rd-actions"><button data-act="rdStart" class="rd-primary">New attempt →</button><button data-act="rdOutput">Practise output</button></div></div>`;
 }
 function page(){return screen==='test'?question():screen==='results'?results():screen==='output'?output():screen==='evidence'?evidence():home();}
 function action(a,node){if(!a?.startsWith('rd'))return false;
   switch(a){case 'rdLevel':S.level=node.dataset.level;screen='home';save();render();break;
    case 'rdLibrary':setPage('settings');break;case 'rdHome':screen='home';render();break;case 'rdStart':start();break;
    case 'rdAbort':screen='home';exam=null;render();break;case 'rdNext':cursor=Math.min(exam.form.items.length-1,cursor+1);render();break;
    case 'rdPrev':cursor=Math.max(0,cursor-1);render();break;case 'rdPlay':{const q=qAt();if(q?.audio){exam.heard[cursor]=true;save();if(window.HANAMI_NATIVE?.speakWithNative)window.HANAMI_NATIVE.speakWithNative(q.audio);else speak(q.audio);render();}break;}
    case 'rdChoose':if(exam&&qAt()&&(qAt().kind!=='listening'||exam.heard[cursor])){exam.answers[cursor]=node.dataset.choice;render()}break;
    case 'rdFinish':finish();break;case 'rdOutput':screen='output';render();break;case 'rdEvidence':screen='evidence';render();break;
    case 'rdReveal':{const id=node.dataset.id;S.output[id]||={level:S.level,text:'',reveal:false};S.output[id].reveal=!S.output[id].reveal;save();render();break;}
    case 'rdSpeak':speak(node.dataset.text||'');break;
   }return true;
 }
 function input(e){if(!e.target?.dataset?.rdDraft)return false;const id=e.target.dataset.rdDraft;S.output[id]||={level:S.level,text:'',reveal:false};S.output[id].text=e.target.value.slice(0,1200);save();return true;}
 return {page,action,input,_debug:{buildForm,grade,milestones}};
};
