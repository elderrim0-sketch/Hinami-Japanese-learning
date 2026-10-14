/* Hanami V20 — privacy-first, comprehension-first Kotoba Miner companion */
window.createHanamiKotobaLink=function createKotobaLink({state,save,render,toast,esc,attr,data,speak,setPage,isActive}){
  const CHANNEL='kotoba-hanami-v1';
  state.kotoba ||= {mines:[],status:{},reviews:{},lastSync:0,sourceCount:0};
  const k=state.kotoba;
  k.mines ||= [];k.status ||= {};k.reviews ||= {};
  let tab='all',search='',activeId='',revealed=false,waiting=false,connected=false,note='',listPage=0;
  let timer=null;
  const clean=(v,n=550)=>typeof v==='string'?v.trim().slice(0,n):'';
  const jp=/[\u3040-\u30ff\u3400-\u9fff]/u;
  const stable=m=>[m.word,m.reading,m.sentence].join('\u241f');
  const hash=s=>{let n=2166136261;for(let i=0;i<s.length;i++){n^=s.charCodeAt(i);n=Math.imul(n,16777619);}return 'kb'+(n>>>0).toString(16)};
  const pickMeta=(entry)=>{for(const lv of ['N5','N4','N3','N2','N1']){const e=(data.vocab?.[lv]||[]).find(v=>v.word===entry.word||(entry.reading&&v.word===entry.word&&v.reading===entry.reading));if(e)return e;}return null};
  function normalize(m){if(!m||typeof m!=='object')return null;
    const word=clean(m.word,110),reading=clean(m.reading,110),sentence=clean(m.sentence,520);
    if(!word||!jp.test(word))return null;
    const out={word,reading,meaning:clean(m.meaning,450),sentence,translation:clean(m.translation,450),title:clean(m.title,180),url:clean(m.url,550),source:clean(m.source,120),seconds:Number.isFinite(+m.seconds)&&m.seconds!==null?Math.max(0,+m.seconds):null,at:Number(m.at)||Date.now(),deck:clean(m.deck,100)};
    out.id=hash(stable(out));return out;
  }
  function importData(payload,automatic=false){
    if(!payload||payload.schema!=='kotoba-hanami-v1')throw Error('This is not a Kotoba Hanami transfer file.');
    let added=0,updated=0;
    const byKey=new Map(k.mines.map(m=>[stable(m),m]));
    for(const raw of (Array.isArray(payload.mines)?payload.mines:[]).slice(0,2500)){
      const m=normalize(raw);if(!m)continue;
      const key=stable(m),old=byKey.get(key);
      if(old){updated++;byKey.set(key,{...old,...Object.fromEntries(Object.entries(m).filter(([a,v])=>v!==''&&v!==null))})}
      else{added++;byKey.set(key,m)}
    }
    // The Kotoba statuses are labels from the extension — never count them as a Hanami mastery pass.
    for(const word of (Array.isArray(payload.known)?payload.known:[]).slice(0,12000)){const w=clean(word,110);if(w&&jp.test(w))k.status[w]='known'}
    for(const word of (Array.isArray(payload.learning)?payload.learning:[]).slice(0,12000)){const w=clean(word,110);if(w&&jp.test(w)&&k.status[w]!=='known')k.status[w]='learning'}
    for(const [raw,s] of Object.entries(payload.statuses||{}).slice(0,15000)){
      const w=clean(raw,110);if(w&&jp.test(w)&&['known','learning','track','ignore','unknown'].includes(s))k.status[w]=s;
    }
    // Earlier Kotoba versions saved only a word in their latest Anki activity log.
    for(const r of (Array.isArray(payload.recent)?payload.recent:[]).slice(0,80)){
      const word=clean(r?.word,110);if(!jp.test(word))continue;
      const m=normalize({word,deck:r.deck,at:r.at,source:'Earlier Kotoba history'});
      if(m&&!byKey.has(stable(m))){byKey.set(stable(m),m);added++;}
    }
    k.mines=[...byKey.values()].sort((a,b)=>(b.at||0)-(a.at||0)).slice(0,1800);
    // Keep only reviews belonging to records still available.
    k.lastSync=Date.now();k.sourceCount=Object.keys(k.status).length;save();
    note=`${added} new mined items · ${updated} updated · ${k.sourceCount} vocabulary status labels`;
    if(!automatic||added>0)toast(`Kotoba: ${added} new mined items ✿`);
    if(isActive())render();return {added,updated,total:k.mines.length};
  }
  function request(type='REQUEST_SYNC'){
    if(!['http:','https:'].includes(location.protocol)){waiting=false;note='Automatic sync requires your paired HTTPS Hanami website. For standalone HTML or iPad, import a Kotoba JSON export.';if(isActive())render();return;}
    waiting=true;note='Waiting for your paired Kotoba extension…';render();
    const requestId='kb-'+Date.now()+'-'+Math.random().toString(16).slice(2,6);
    window.postMessage({channel:CHANNEL,source:'hanami-web',type,requestId},location.origin);
    clearTimeout(timer);timer=setTimeout(()=>{if(waiting){waiting=false;note='Kotoba not detected. Pair your website from Kotoba → Connect to Hanami, then reload. Or import a JSON file.';render();}},5500);
  }
  window.addEventListener('message',event=>{
    const m=event.data;
    if(event.source!==window||event.origin!==location.origin||m?.channel!==CHANNEL||m.source!=='kotoba-extension')return;
    if(m.type==='EXTENSION_READY'){connected=true;if(isActive())request('PING');return;}
    if(m.type==='SYNC_ERROR'){waiting=false;clearTimeout(timer);note='Kotoba: '+clean(m.error,240);if(isActive())render();return;}
    if(['SYNC_RESULT','STATUS_RESULT','AUTO_SYNC'].includes(m.type)){
      waiting=false;clearTimeout(timer);connected=true;
      try{importData(m.payload,m.type==='AUTO_SYNC'||m.type==='STATUS_RESULT')}catch(e){note=e.message;if(isActive())render()}
    }
  });
  function sense(m){
    if(m.meaning)return m.meaning;
    const e=pickMeta(m);return Array.isArray(e?.meanings)?e.meanings.slice(0,3).join('; '):'Meaning missing — look it up in Vocabulary or edit the Kotoba mine.';
  }
  function sourceLink(m){
    try{const u=new URL(m.url);if(!['https:','http:'].includes(u.protocol))return '';return `<a class="kb-source" href="${attr(u.href)}" target="_blank" rel="noopener noreferrer">↗ Open source</a>`;}catch{return '';}
  }
  const due=m=>!k.reviews[m.id]||Number(k.reviews[m.id].due||0)<=Date.now();
  function rows(){let a=k.mines.filter(m=>{
   const status=k.status[m.word]||'';
   if(tab==='due'&&!due(m))return false;
   if(tab==='new'&&k.reviews[m.id])return false;
   if(tab==='learning'&&status==='known')return false;
   const q=search.toLowerCase();return !q||[m.word,m.reading,m.meaning,m.sentence,m.title,m.translation].some(x=>x.toLowerCase().includes(q))
  });return a;}
  function stat(label,value,sub){return `<div class="kb-stat"><strong>${esc(value)}</strong><span>${esc(label)}</span><small>${esc(sub)}</small></div>`}
  function page(){
    const found=rows(),current=k.mines.find(m=>m.id===activeId),dueCount=k.mines.filter(due).length;
    return `<section class="kb-hero"><span class="kb-kicker">語 ✿ 花 · KOTOBA COMPANION</span><h1>Your anime becomes your textbook.</h1><p>Save words while watching with Kotoba. Hanami turns those exact sentences into meaning-first review cards, without making speaking or handwriting compulsory.</p><div class="kb-toolbar"><button class="btn" data-act="kotobaSync" ${waiting?'disabled':''}>${waiting?'Connecting…':'↻ Sync with Kotoba'}</button><button class="btn pale" data-act="kotobaExport">↓ Export mines</button><label class="btn ghost kb-file-label" for="kotobaImportFile">↑ Import Kotoba JSON</label><input id="kotobaImportFile" type="file" accept=".json,application/json" hidden></div><p class="kb-note">${esc(note||'Sync automatically when Kotoba saves a new word and this paired website is open. Use JSON import for iPad or standalone HTML.')}</p></section>
    <div class="kb-stats">${stat('Sentence cards',k.mines.length,'Mined from your viewing')}${stat('Ready to review',dueCount,'Only real recall earns credit')}${stat('Kotoba labels',Object.keys(k.status).length,'Known / tracking are hints')}${stat('Connection',connected?'Linked':'Local','Connection is device/browser-specific')}</div>
    <div class="kb-panel kb-how"><h3>How your two apps work together</h3><p><strong>1.</strong> Watch anime with Kotoba → <strong>2.</strong> Click <em>Save to Hanami</em> on a word → <strong>3.</strong> The paired Hanami page receives the word and sentence → <strong>4.</strong> Review the meaning when it is due → <strong>5.</strong> Recognise it when you hear it again.</p><small>Words labelled Known in Kotoba are not automatically marked mastered in Hanami. This dashboard measures study activity, not subtitle-free comprehension.</small></div>
    <div class="kb-work"><div class="kb-panel"><div class="kb-work-head"><h2>My mined Japanese</h2><input id="kotobaSearch" value="${attr(search)}" placeholder="Search words, meaning or anime…" aria-label="Search mined words"></div><div class="kb-filters">${[['all','All'],['due','Review due'],['new','Not reviewed'],['learning','Needs practice']].map(([x,n])=>`<button class="kb-filter ${x===tab?'on':''}" data-act="kotobaFilter" data-value="${x}">${n}</button>`).join('')}</div>${found.length?found.slice(listPage*35,listPage*35+35).map(m=>`<button class="kb-item ${activeId===m.id?'selected':''}" data-act="kotobaOpen" data-id="${attr(m.id)}"><b lang="ja">${esc(m.word)}</b><span>${esc((sense(m)||'').slice(0,70))}</span><small>${esc(m.title||m.source||'Kotoba')}${k.status[m.word]?' · Kotoba: '+esc(k.status[m.word]):''}</small><i>${due(m)?'● Due':'✓ Scheduled'}</i></button>`).join(''):`<div class="kb-empty">${k.mines.length?'No matches. Try another filter.':'No words yet. Pair Kotoba and save a word while watching, or import a Kotoba JSON export.'}</div>`}<div class="kb-pager"><button class="btn ghost sm" data-act="kotobaPrev" ${listPage===0?'disabled':''}>← Previous</button><small>${found.length} matches · Page ${listPage+1}/${Math.max(1,Math.ceil(found.length/35))}</small><button class="btn ghost sm" data-act="kotobaNext" ${(listPage+1)*35>=found.length?'disabled':''}>Next →</button></div></div>
    <div class="kb-panel kb-detail">${current?`<div class="kb-kicker">LISTEN · UNDERSTAND · REMEMBER</div><div class="kb-word" lang="ja">${esc(current.word)} <button class="kb-hear" data-act="kotobaSpeak" data-id="${attr(current.id)}" aria-label="Hear Japanese pronunciation">♫</button></div><div class="kb-reading" lang="ja">${esc(current.reading)}</div>${current.sentence?`<blockquote class="kb-sentence" lang="ja">${esc(current.sentence)}</blockquote>`:''}<button class="kb-reveal" data-act="kotobaReveal">${revealed?'Hide meaning ↑':'Reveal meaning ↓'}</button>${revealed?`<div class="kb-meaning"><strong>${esc(sense(current))}</strong>${current.translation?`<p>Sentence translation: ${esc(current.translation)}</p>`:''}<div class="kb-rate"><button class="btn pale" data-act="kotobaGrade" data-grade="again">↻ Didn't understand</button><button class="btn" data-act="kotobaGrade" data-grade="good">✓ Understood</button><button class="btn ghost" data-act="kotobaGrade" data-grade="easy">✧ Easy</button></div></div>`:`<p class="subhead">Listen once. Recall what the word means, then reveal the answer. Only self-rated recall schedules a review.</p>`}<div class="kb-meta">${esc(current.title||current.source||'Kotoba')}${current.seconds!==null?' · '+Math.round(current.seconds)+'s':''} ${sourceLink(current)}</div>${k.reviews[current.id]?`<small class="kb-date">Last reviewed: ${new Date(k.reviews[current.id].last).toLocaleDateString()} · ${k.reviews[current.id].reps} successful recalls</small>`:''}`:`<div class="kb-empty">Select a mined word to practise comprehension in the original sentence.</div>`}</div></div>`;
  }
  function download(){const blob=new Blob([JSON.stringify({schema:'kotoba-hanami-v1',generatedAt:Date.now(),mines:k.mines,known:Object.keys(k.status).filter(w=>k.status[w]==='known'),learning:Object.keys(k.status).filter(w=>k.status[w]==='learning'),statuses:k.status},null,2)],{type:'application/json'});const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='hanami-kotoba-mines.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1800);}
  function action(node){
    const act=node.dataset.act;if(!act||!act.startsWith('kotoba'))return false;
    switch(act){
      case 'kotobaSync':request();break;
      case 'kotobaExport':download();break;
      case 'kotobaFilter':tab=node.dataset.value;listPage=0;activeId='';render();break;
      case 'kotobaPrev':listPage=Math.max(0,listPage-1);render();break;
      case 'kotobaNext':listPage++;render();break;
      case 'kotobaOpen':activeId=node.dataset.id;revealed=false;render();break;
      case 'kotobaReveal':revealed=!revealed;render();break;
      case 'kotobaSpeak':{const m=k.mines.find(r=>r.id===node.dataset.id);if(m)speak(m.sentence||m.reading||m.word);break;}
      case 'kotobaGrade':{
        const r=k.mines.find(m=>m.id===activeId);if(!r)break;
        const prev=k.reviews[r.id]||{reps:0,interval:0},g=node.dataset.grade;
        const interval=g==='again'?0:g==='good'?(prev.reps===0?1:prev.reps===1?3:Math.min(90,prev.interval*2.3)):(prev.reps===0?3:prev.reps===1?7:Math.min(150,prev.interval*2.8));
        k.reviews[r.id]={reps:g==='again'?0:prev.reps+1,interval,due:Date.now()+(g==='again'?60_000:interval*86_400_000),last:Date.now(),grade:g};save();
        toast(g==='again'?'This expression will return soon ✿':'Comprehension review scheduled ✿');
        const next=k.mines.find(m=>due(m)&&m.id!==activeId);activeId=next?.id||'';revealed=false;render();break;
      }
    }
    return true;
  }
  function change(e){if(e.target.id==='kotobaImportFile'){
     const f=e.target.files?.[0];if(!f)return true;
     if(f.size>4_000_000){toast('Kotoba file too large (4MB max)');return true;}
     f.text().then(t=>{try{importData(JSON.parse(t));}catch(err){toast('Import failed: '+err.message)}});e.target.value='';return true;
   }
   if(e.target.id==='kotobaSearch'){search=e.target.value;listPage=0;render();return true;}
   return false;
  }
  function input(e){if(e.target.id==='kotobaSearch'){search=e.target.value;listPage=0;const cursor=e.target.selectionStart;render();const box=document.getElementById('kotobaSearch');box?.focus();box?.setSelectionRange(cursor,cursor);return true}return false}
  function whenOpen(){if(!k.lastSync&&!waiting)request('PING');}
  return {page,action,change,input,whenOpen,importData};
};
