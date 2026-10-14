/* Hanami V5: original, offline, productive-skills study lab.
   This is deliberate practice, not an automated fluency or JLPT certification test. */
window.createHanamiFluency=function createHanamiFluency(api){
 'use strict';
 const {state,save,addXP,addDaily,speak,esc,attr,render,toast}=api;
 const raw=window.HANAMI_FLUENCY_CONTENT||{readings:[],builders:[],prompts:[]};
 const levels=['N5','N4','N3','N2','N1'];
 const active=state.fluency||{};
 state.fluency={readings:active.readings||{},listening:active.listening||{},builders:active.builders||{},drafts:active.drafts||{},express:active.express||{},...active};
 for(const k of ['readings','listening','builders','drafts','express'])if(!state.fluency[k]||typeof state.fluency[k]!=='object')state.fluency[k]={};
 const f=state.fluency;
 let lvl=levels.includes(active.activeLevel)?active.activeLevel:'N5';
 let mode='home', selected=null, answers={}, listened=false, transcriptRevealed=false, builderPicked=[], builderResult=null, feedback='',expressReveal=false;
 const list=()=>mode==='reading'?raw.readings:mode==='builder'?raw.builders:raw.prompts;
 const atLevel=(m,l)=>((m==='reading'?raw.readings:m==='builder'?raw.builders:raw.prompts)||[]).filter(x=>x.level===l);
 const unique=(m,l)=>atLevel(m,l).length;
 const done=(m,id)=>!!(m==='reading'?f.readings[id]:m==='builder'?f.builders[id]:f.express[id]?.tried);
 const progress=(m,l)=>atLevel(m,l).filter(x=>done(m,x.id)).length;
 const item=()=>list().find(x=>x.id===selected)||null;
 const norm=s=>String(s||'').replace(/[\s\u3000。、，,！!？?・]/g,'').normalize('NFKC');
 const statLabel=(n,d)=>`${n} / ${d}`;
 const progressBar=(v,max)=>`<div class="flu-bar" role="progressbar" aria-valuenow="${v}" aria-valuemax="${max}" aria-valuemin="0"><span style="width:${max?Math.round(v/max*100):0}%"></span></div>`;
 const tooltip=(label,sub,icon)=>`<span class="flu-badge"><span aria-hidden="true">${icon}</span><span><b>${label}</b><small>${sub}</small></span></span>`;
 function resetExercise(){answers={};listened=false;transcriptRevealed=false;builderPicked=[];builderResult=null;feedback='';expressReveal=false}
 function select(id){selected=id;resetExercise();render()}
 const totalReading=()=>Object.keys(f.readings).filter(k=>f.readings[k]?.passed).length;
 const countComplete=(store)=>Object.keys(store).filter(k=>store[k]).length;
 function home(){
  const readCount=totalReading(),buildCount=countComplete(f.builders),outputCount=Object.values(f.express).filter(v=>v?.tried).length;
  return `<div class="flu-home">
   <section class="flu-hero"><div class="flu-hero-copy"><span class="flu-mini">✦ THE ROAD BEYOND FLASHCARDS</span><h2>Understand it. <em>Build it.</em> <br>Make it your own.</h2><p>Practice using Japanese—not just recognising it. Read original short stories, rebuild natural sentences and express your own ideas. Start at N5 and work upward.</p><div class="flu-stats">${tooltip(statLabel(readCount,raw.readings.length),'Stories understood','📖')}${tooltip(statLabel(buildCount,raw.builders.length),'Sentences constructed','🧩')}${tooltip(statLabel(outputCount,raw.prompts.length),'Output attempts','🎙️')}</div></div><div class="flu-hero-flower" aria-hidden="true"><span>言</span><i>✦</i><i>✿</i><i>✧</i></div></section>
   <div class="flu-level-heading"><div><span class="flu-mini">A FIVE-LEVEL CLIMB</span><h3>Choose your current chapter</h3></div><div class="flu-level-picker" role="group" aria-label="JLPT level">${levels.map(l=>`<button data-act="fluLevel" data-level="${l}" class="${lvl===l?'active':''}" aria-pressed="${lvl===l}">${l}</button>`).join('')}</div></div>
   <div class="flu-activity-grid">
    <button class="flu-path-card flu-read" data-act="fluMode" data-mode="reading"><span class="flu-activity-top"><span class="flu-activity-icon">📖</span><span class="flu-activity-arrow">↗</span></span><strong>Graded stories & listening</strong><span>Follow Hana and your companions through original N5–N1 passages. Listen first, read closely, then answer comprehension questions.</span>${progressBar(progress('reading',lvl),unique('reading',lvl))}<small>${progress('reading',lvl)} / ${unique('reading',lvl)} stories understood</small></button>
    <button class="flu-path-card flu-build" data-act="fluMode" data-mode="builder"><span class="flu-activity-top"><span class="flu-activity-icon">🧩</span><span class="flu-activity-arrow">↗</span></span><strong>Sentence workshop</strong><span>Place Japanese chunks in a natural model order. Learn what particles and endings actually do.</span>${progressBar(progress('builder',lvl),unique('builder',lvl))}<small>${progress('builder',lvl)} / ${unique('builder',lvl)} models constructed</small></button>
    <button class="flu-path-card flu-speak" data-act="fluMode" data-mode="express"><span class="flu-activity-top"><span class="flu-activity-icon">🎤</span><span class="flu-activity-arrow">↗</span></span><strong>Speak & write</strong><span>Produce your own Japanese. Write a response, practice aloud, then compare it with a model and self-check.</span>${progressBar(progress('express',lvl),unique('express',lvl))}<small>${progress('express',lvl)} / ${unique('express',lvl)} attempts recorded</small></button>
   </div><div class="flu-bottom-grid"><div class="flu-note"><b>✦ Your daily four-skill loop</b><p><strong>1.</strong> Learn a guided lesson. <strong>2.</strong> Read or listen to one short story. <strong>3.</strong> Build a sentence. <strong>4.</strong> Say or write something yourself. Review cards due today.</p></div><div class="flu-note flu-reality"><b>Learning progress ≠ tested fluency</b><p>These exercises are a start. Real fluency also needs extensive authentic reading, human conversations, feedback on your output and listening to real speakers. The JLPT itself does not test speaking or writing.</p></div></div>
   </div>`;
 }
 function tiles(){return atLevel(mode,lvl).map((x,i)=>`<button class="flu-lesson-tile ${done(mode,x.id)?'flu-done':''} ${selected===x.id?'active':''}" data-act="fluOpen" data-id="${attr(x.id)}" aria-current="${selected===x.id?'true':'false'}"><span class="flu-lesson-index">${done(mode,x.id)?'✓':String(i+1).padStart(2,'0')}</span><span><b>${esc(x.title||x.en)}</b><small>${mode==='reading'?esc(x.scene):mode==='builder'?esc(x.tip):esc(x.situation)}</small></span><span aria-hidden="true">→</span></button>`).join('')}
 function levelCards(){return levels.map(l=>`<button class="flu-small-level ${lvl===l?'active':''}" data-act="fluLevel" data-level="${l}">${l}<small>${progress(mode,l)}/${unique(mode,l)}</small></button>`).join('')}
 function reader(x){
  const qTotal=x.questions.length,passed=!!f.readings[x.id]?.passed;
  const checked=Object.keys(answers).length===qTotal;
  const allRight=checked&&x.questions.every((q,i)=>answers[i]===q.answer);
  const canSave=allRight;
  return `<article class="flu-exercise flu-reader"><div class="flu-exercise-top"><span class="flu-mini">${esc(x.scene)} · ${x.level}</span><h2>${esc(x.title)}</h2><p>${esc(x.insight)}</p></div>
    <div class="flu-mode-switch"><b>Choose how to approach this passage</b><div><button data-act="fluListen" class="${!transcriptRevealed?'emphasis':''}" title="Use your device Japanese voice">♫ Listen to the passage</button><button data-act="fluTranscript">${transcriptRevealed?'Hide':'Show'} transcript</button></div></div>
    <div class="flu-reading-paper"><div class="flu-paper-heading"><span>✦ ${transcriptRevealed?'JAPANESE TEXT':'LISTEN-FIRST CHALLENGE'}</span><span>${x.level}</span></div>${transcriptRevealed?`<div class="flu-jp-passage jp" lang="ja">${esc(x.jp)}</div>`:`<div class="flu-covered"><span aria-hidden="true">♫</span><strong>Can you catch the meaning before reading?</strong><p>Play the audio, answer if you can, then reveal the text when you need it. No penalty for reading.</p></div>`}<button class="flu-hear" data-act="fluListen">♫ Play Japanese audio</button></div>
    <details class="flu-gloss"><summary>Open the vocabulary hints (${x.gloss.length})</summary><div class="flu-word-grid">${x.gloss.map(g=>`<span><b lang="ja">${esc(g.jp)}</b><small>${esc(g.en)}</small></span>`).join('')}</div></details>
    <div class="flu-q-grid">${x.questions.map((q,i)=>`<div class="flu-question"><span>COMPREHENSION ${i+1}/${qTotal}</span><h3>${esc(q.q)}</h3><div class="flu-choices">${q.choices.map((c,k)=>`<button data-act="fluAnswer" data-q="${i}" data-index="${k}" class="${answers[i]===k?'selected':''} ${answers[i]===k&&k===q.answer?'correct':''} ${answers[i]===k&&k!==q.answer?'incorrect':''}" aria-pressed="${answers[i]===k}">${esc(c)}</button>`).join('')}</div>${answers[i]!==undefined?`<p class="flu-answer-feedback ${answers[i]===q.answer?'good':'needs-work'}">${answers[i]===q.answer?'✓ You found it.':'↻ Try again.'} ${esc(q.why)}</p>`:''}</div>`).join('')}</div>
    <div class="flu-result"><div><strong>${passed?'✓ This story is in your finished library':allRight?'✨ All comprehension answers are correct.':'Complete both comprehension questions.'}</strong><small>Passing shows you understood this exercise—not that you are fluent at ${x.level}.</small></div><button class="btn" data-act="fluFinishRead" ${!canSave?'disabled':''}>${passed?'Practice recorded':'Complete story +20 XP'} →</button></div>
    <details class="flu-translation"><summary>Reveal English meaning and compare your interpretation</summary><p>${esc(x.en)}</p></details>
    </article>`;
 }
 function builder(x){
  // Deterministic shuffle, avoids random reordering on each render; seeded by id.
  const correct=x.parts.map((_,i)=>i),order=correct.slice();let seed=[...x.id].reduce((a,c)=>a*17+c.charCodeAt(0),13);
  for(let i=order.length-1;i>0;i--){seed=(seed*1664525+1013904223)>>>0;const j=seed%(i+1);[order[i],order[j]]=[order[j],order[i]]}
  if(order.every((id,i)=>id===i))order.push(order.shift());
  const remaining=order.filter(i=>!builderPicked.includes(i));
  const answer=builderPicked.map(i=>x.parts[i]).join('');
  const completed=!!f.builders[x.id];
  return `<article class="flu-exercise"><div class="flu-exercise-top"><span class="flu-mini">${x.level} · SENTENCE WORKSHOP</span><h2>Make the sentence feel natural.</h2><p>${esc(x.tip)}</p></div>
   <div class="flu-prompt-card"><span>YOUR MISSION</span><h3>${esc(x.en)}</h3><p>Tap the chunks to build the taught model sentence. Japanese can permit other arrangements; this exercise checks one useful standard pattern.</p></div>
   <div class="flu-builder-area"><div class="flu-slot-label">YOUR SENTENCE <span>${builderPicked.length}/${x.parts.length}</span></div><div class="flu-sentence-target" aria-live="polite">${builderPicked.length?builderPicked.map((idx,position)=>`<button class="flu-selected-chunk jp" data-act="fluUnpick" data-index="${position}" aria-label="Remove ${esc(x.parts[idx])}">${esc(x.parts[idx])}<span>×</span></button>`).join(''):`<span class="flu-placeholder">Choose a Japanese chunk to begin…</span>`}</div><div class="flu-slot-label">CHOOSE THE NEXT CHUNK</div><div class="flu-chunk-bank">${remaining.map(i=>`<button class="flu-chunk jp" data-act="fluPick" data-index="${i}">${esc(x.parts[i])}</button>`).join('')}</div></div>
   ${builderResult===true?`<div class="flu-callout flu-success"><b>✦ Beautifully built!</b><p>${esc(x.explanation)}</p></div>`:builderResult===false?`<div class="flu-callout flu-error"><b>Not quite. Read the clue and try again.</b><p>${esc(x.tip)}</p></div>`:''}
   <div class="flu-builder-actions"><button class="btn pale" data-act="fluClear">↻ Start again</button><button class="btn" data-act="fluCheck" ${builderPicked.length!==x.parts.length?'disabled':''}>Check sentence →</button></div>${completed?'<p class="flu-completed-tag">✓ Model sentence practised</p>':''}</article>`;
 }
 function express(x){
  const val=f.drafts[x.id]||'',record=f.express[x.id],tried=record?.tried;
  return `<article class="flu-exercise flu-expression"><div class="flu-exercise-top"><span class="flu-mini">${x.level} · OUTPUT PRACTICE</span><h2>${esc(x.title)}</h2><p>${esc(x.situation)}</p></div>
   <div class="flu-prompt-card"><span>SAY IT IN YOUR OWN JAPANESE</span><h3>${esc(x.question)}</h3><p><b>Scaffold:</b> ${esc(x.scaffold)}</p></div>
   <label for="fluResponse" class="flu-slot-label">WRITE YOUR JAPANESE RESPONSE BELOW</label><textarea id="fluResponse" class="flu-write" rows="6" lang="ja" spellcheck="false" placeholder="自分の日本語で書いてみましょう…">${esc(val)}</textarea>
   <div class="flu-builder-actions"><button class="btn pale" data-act="fluModel">${expressReveal?'Hide':'Show'} one possible answer</button><button class="btn ghost" data-act="fluSpeakDraft">♫ Hear my draft</button></div>
   ${expressReveal?`<div class="flu-callout flu-success"><span>ONE POSSIBLE RESPONSE — NOT THE ONLY CORRECT ONE</span><p class="jp" lang="ja">${esc(x.example)}</p><button class="flu-hear" data-act="fluSpeakModel">♫ Hear this example</button></div>`:''}
   <div class="flu-selfcheck"><h3>Check your work, not just your memory</h3><p>${esc(x.check)}</p><p>Speak your answer aloud at least once. This app cannot verify grammar, accent or pronunciation automatically—compare with the model and seek human feedback for important corrections.</p><button class="btn" data-act="fluFinishOutput" ${val.trim().length<3?'disabled':''}>${tried?'✓ Practice recorded':'I wrote and tried saying it →'}</button></div></article>`;
 }
 function activity(){
  const name={reading:'Graded stories',builder:'Sentence workshop',express:'Speak & write'}[mode];
  const x=item();
  return `<div class="flu-activity-page"><div class="flu-activity-breadcrumb"><button data-act="fluHome">← Workshop</button><span> / ${esc(name)}</span></div><div class="flu-level-strip">${levelCards()}</div><div class="flu-study-columns"><aside class="flu-study-index"><div class="flu-mini">${lvl} PRACTICE ${progress(mode,lvl)}/${unique(mode,lvl)}</div><h3>${name}</h3><p>${mode==='reading'?'Listening-first stories and comprehension':mode==='builder'?'Put words and particles into useful sentences':'Turn your ideas into spoken and written Japanese'}</p>${tiles()}</aside><div class="flu-study-panel">${x?(mode==='reading'?reader(x):mode==='builder'?builder(x):express(x)):`<div class="flu-exercise flu-empty"><span>✦</span><h2>Choose a practice from the left.</h2><p>Start with the first unfinished activity. These exercises build on the guided lessons and grow harder from N5 to N1.</p><button class="btn" data-act="fluOpen" data-id="${atLevel(mode,lvl)[0]?.id||''}">Begin the first activity →</button></div>`}</div></div></div>`;
 }
 function page(){return `<div class="fluency-root">${mode==='home'?home():activity()}</div>`}
 function action(a,node){if(!a?.startsWith('flu'))return false;switch(a){
  case 'fluHome':mode='home';selected=null;render();break;
  case 'fluLevel':if(levels.includes(node.dataset.level)){lvl=node.dataset.level;f.activeLevel=lvl;save();selected=null;resetExercise();render()}break;
  case 'fluMode':mode=node.dataset.mode;if(!['reading','builder','express'].includes(mode))mode='reading';selected=atLevel(mode,lvl).find(x=>!done(mode,x.id))?.id||atLevel(mode,lvl)[0]?.id||null;resetExercise();render();break;
  case 'fluOpen':select(node.dataset.id);break;
  case 'fluListen':{const x=item();if(x&&mode==='reading'){listened=true;speak(x.jp);toast('Listen for the sentence endings and what happened.');}break}
  case 'fluTranscript':transcriptRevealed=!transcriptRevealed;render();break;
  case 'fluAnswer':{const x=item();if(!x||mode!=='reading')break;const qi=Number(node.dataset.q),choice=Number(node.dataset.index);if(!x.questions[qi]||!x.questions[qi].choices[choice])break;answers[qi]=choice;render();break}
  case 'fluFinishRead':{const x=item();if(!x||!x.questions.every((q,i)=>answers[i]===q.answer))break;if(!f.readings[x.id]?.passed){f.readings[x.id]={passed:true,at:Date.now()};addXP(20);addDaily('learned',1)}if(listened&&!transcriptRevealed&&!f.listening[x.id]){f.listening[x.id]={attempted:true,at:Date.now()}}save();toast('Story finished! Keep coming back to review the language.');render();break}
  case 'fluPick':{const x=item(),idx=Number(node.dataset.index);if(!x||!x.parts[idx]||builderPicked.includes(idx))break;builderPicked.push(idx);builderResult=null;render();break}
  case 'fluUnpick':{const idx=Number(node.dataset.index);if(idx>=0&&idx<builderPicked.length)builderPicked.splice(idx,1);builderResult=null;render();break}
  case 'fluClear':builderPicked=[];builderResult=null;render();break;
  case 'fluCheck':{const x=item();if(!x||builderPicked.length!==x.parts.length)break;builderResult=norm(builderPicked.map(i=>x.parts[i]).join(''))===norm(x.parts.join(''));if(builderResult){if(!f.builders[x.id]){f.builders[x.id]={passed:true,at:Date.now()};addXP(15);addDaily('learned',1)}save();toast('You built the model sentence! ✦')}render();break}
  case 'fluModel':expressReveal=!expressReveal;render();break;
  case 'fluSpeakDraft':{const x=item();if(x&&f.drafts[x.id]?.trim())speak(f.drafts[x.id]);break}
  case 'fluSpeakModel':{const x=item();if(x)speak(x.example);break}
  case 'fluFinishOutput':{const x=item();if(!x||!String(f.drafts[x.id]||'').trim())break;if(!f.express[x.id]?.tried){f.express[x.id]={tried:true,at:Date.now()};addXP(10);addDaily('learned',1)}save();toast('Output practice logged. Compare with the sample or ask a fluent speaker for feedback.');render();break}
  default:return false;
 }return true}
 function input(e){if(e.target?.id!=='fluResponse')return false;const x=item();if(!x)return false;f.drafts[x.id]=e.target.value;save();const b=document.querySelector('[data-act="fluFinishOutput"]');if(b)b.disabled=f.drafts[x.id].trim().length<3;return true}
 function afterRender(){if(mode==='express'){const t=document.querySelector('#fluResponse');if(t)t.setAttribute('autocomplete','off')}}
 return {page,action,input,afterRender};
};
