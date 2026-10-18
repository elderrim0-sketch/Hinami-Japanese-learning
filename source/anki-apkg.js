/* Hanami V21: read standard Anki .apkg SQLite collections locally, without a server.
   SQLite read-only B-tree parser: table row traversal, overflow pages, SQLite record serials. */
(function(){'use strict';
const decoder=new TextDecoder('utf-8');
function sqliteTables(buffer){
 const b=buffer instanceof Uint8Array?buffer:new Uint8Array(buffer),d=new DataView(b.buffer,b.byteOffset,b.byteLength);
 if(decoder.decode(b.slice(0,15))!=='SQLite format 3')throw Error('Not an SQLite Anki collection');
 const pageSize=(d.getUint16(16)===1?65536:d.getUint16(16)),usable=pageSize-b[20];
 if(pageSize<512||pageSize>65536||pageSize&(pageSize-1))throw Error('Unsupported SQLite page size');
 const u16=p=>d.getUint16(p),u32=p=>d.getUint32(p),bounds=(p,n)=>{if(p<0||p+n>b.length)throw Error('Corrupt or truncated Anki database')};
 function varint(p){let v=0;for(let i=0;i<9;i++){bounds(p+i,1);const x=b[p+i];if(i===8)return [v*256+x,9];v=v*128+(x&127);if(!(x&128))return [v,i+1]}throw Error('SQLite varint invalid')}
 function int(p,n){bounds(p,n);if(n===0)return null;if(n===8){const big=d.getBigInt64(p);return Number(big)}let v=0;for(let i=0;i<n;i++)v=v*256+b[p+i];if(n&&n<8&&b[p]&128)v-=2**(n*8);return v}
 function record(bytes){const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);let pos=0;function rv(){let x=0;for(let i=0;i<9;i++){if(pos>=bytes.length)throw Error('Invalid record header');const a=bytes[pos++];if(i===8)return x*256+a;x=x*128+(a&127);if(!(a&128))return x;}return x}
  const end=rv(),formats=[];while(pos<end)formats.push(rv());let at=end;const vals=[];
  for(const type of formats){let n=0,out=null;if(type===0){}else if(type>=1&&type<=6){n=[0,1,2,3,4,6,8][type];if(n===8){out=Number(new DataView(bytes.buffer,bytes.byteOffset+at,8).getBigInt64(0))}else{for(let j=0;j<n;j++)out=(out||0)*256+bytes[at+j];if(bytes[at]&128)out-=2**(n*8)}}else if(type===7){n=8;out=v.getFloat64(at)}else if(type===8)out=0;else if(type===9)out=1;else if(type>=12){n=Math.floor((type-12)/2);out=type%2?decoder.decode(bytes.subarray(at,at+n)):bytes.slice(at,at+n)}if(at+n>bytes.length)throw Error('Invalid SQLite field');at+=n;vals.push(out)}return vals}
 const visited=new Set();
 function pageRows(num,out){if(!Number.isInteger(num)||num<1||num*pageSize>b.length+pageSize)throw Error('Bad SQLite page pointer');if(visited.has(num))return;visited.add(num);const start=(num-1)*pageSize+(num===1?100:0);bounds(start,12);const type=b[start],count=u16(start+3),h=type===5?12:8;if(![5,13].includes(type))throw Error('Unsupported SQLite table page '+type);if(count>3000)throw Error('SQLite page appears corrupt');
  for(let i=0;i<count;i++){const cell=(num-1)*pageSize+u16(start+h+i*2);bounds(cell,4);
   if(type===5){pageRows(u32(cell),out);continue}
   let [size,a]=varint(cell),[rowid,z]=varint(cell+a);let ptr=cell+a+z;const maxLocal=usable-35,minLocal=Math.floor((usable-12)*32/255)-23;let local=size<=maxLocal?size:minLocal+(size-minLocal)%(usable-4);if(local>maxLocal)local=minLocal;
   bounds(ptr,local);const contents=new Uint8Array(size);contents.set(b.subarray(ptr,ptr+local));let written=local;if(size>local){let next=u32(ptr+local),guard=0;while(next&&written<size){if(++guard>10000)throw Error('Bad SQLite overflow chain');const ofs=(next-1)*pageSize;bounds(ofs,4);const n=Math.min(size-written,usable-4);bounds(ofs+4,n);contents.set(b.subarray(ofs+4,ofs+4+n),written);written+=n;next=u32(ofs)}}if(written!==size)throw Error('Incomplete Anki database record');out.push({rowid,values:record(contents)});
  }
  if(type===5)pageRows(u32(start+8),out)
 }
 function rows(root){visited.clear();const out=[];pageRows(root,out);return out}
 const tables=rows(1).filter(r=>r.values[0]==='table');const root=name=>{const row=tables.find(r=>r.values[1]===name);if(!row)throw Error('Anki database missing '+name);return Number(row.values[3])};
 return {notes:rows(root('notes')),col:rows(root('col'))};
}
const txt=s=>String(s??'');
const plain=(html)=>{const t=document.createElement('template');t.innerHTML=txt(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/\[sound:[^\]]+\]/gi,'').replace(/<br\s*\/?\s*>/gi,' ');return (t.content?.textContent||'').trim().replace(/\s+/g,' ').replace(/\[[^\]]+\]/g,'')};
const sounds=s=>[...txt(s).matchAll(/\[sound:([^\]]+)\]/gi)].map(x=>x[1]);
const images=s=>[...txt(s).matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)].map(x=>x[1]);
function cardFromNote(row,models,deckName){const [nid,guid,mid,_mod,_usn,tags,flds]=row.values;const model=models[txt(mid)]||Object.values(models)[0];if(!model)return null;const fields=txt(flds).split('\x1f');const names=model.flds||[];const get=(patterns)=>{const ix=names.findIndex(f=>patterns.some(p=>p.test(f.name)));return ix<0?'':(fields[ix]||'')};
 const front=get([/^word$/i,/^expression$/i,/^vocabulary$/i,/^front$/i,/^sentence$/i,/^text$/i])||fields[0]||'';
 const word=plain(front).slice(0,350);if(!word)return null;
 const reading=plain(get([/^word reading$/i,/^reading$/i,/^pronunciation$/i,/^kana$/i])).slice(0,200);
 const meaningNames=[/^word meaning$/i,/^meaning$/i,/^definition$/i,/^english$/i,/^back$/i,/^translation$/i];
 const hasMeaningField=names.some(f=>meaningNames.some(p=>p.test(f.name)));
 const meaning=plain(get(meaningNames)||(hasMeaningField?'':fields[1])||'').slice(0,900);
 const sentence=plain(get([/^sentence$/i,/^example$/i,/^context$/i])).slice(0,800);
 const translation=plain(get([/^sentence meaning$/i,/^sentence translation$/i,/^example translation$/i])).slice(0,900);
 if(!meaning&&!/[\u3040-\u30ff\u3400-\u9fff]/u.test(word))return null; // Skip non-Japanese instruction/placeholder cards.
 const notes=plain(get([/^notes$/i,/^extra$/i,/^explanation$/i])).slice(0,500);
 const image=fields.flatMap(images).find(x=>!/^https?:/i.test(x))||'';
 const allSounds=fields.flatMap(sounds),wordSounds=sounds(get([/^word audio$/i,/^audio$/i,/^sound$/i])),sentenceSounds=sounds(get([/^sentence audio$/i]));
 const audio=wordSounds[0]||allSounds[0]||'';
 const sentenceAudio=sentenceSounds[0]||allSounds.find(x=>x!==audio)||'';
 return {id:'anki:'+txt(guid||nid),kind:'anki',deck:deckName,word,reading,meaning,sentence,translation,notes,tags:txt(tags).trim(),image,audio,sentenceAudio,created:Date.now()};
}
async function parse(file,onProgress=()=>{}){
 if(!window.JSZip)throw Error('Anki importer is not loaded. Please refresh Hanami.');
 if(!/\.apkg$/i.test(file.name))throw Error('Choose an Anki .apkg deck');
 if(file.size>350_000_000)throw Error('Deck over 350MB. Export a smaller deck from Anki.');
 onProgress('Opening Anki package…');const zip=await JSZip.loadAsync(await file.arrayBuffer(),{checkCRC32:false});
 let collection=zip.file('collection.anki21')||zip.file('collection.anki2');if(!collection)throw Error('No readable Anki collection found. Export a standard .apkg from Anki.');
 let tables=sqliteTables(await collection.async('uint8array'));
 if(tables.notes.length<2&&zip.file('collection.anki21')&&collection.name!=='collection.anki21'){collection=zip.file('collection.anki21');tables=sqliteTables(await collection.async('uint8array'))}
 if(!tables.col.length)throw Error('No Anki collection metadata');const col=tables.col[0].values;const models=JSON.parse(txt(col[9]));const decks=JSON.parse(txt(col[10]));
 const deckNames=Object.values(decks||{}).map(d=>d.name).filter(x=>x&&x!=='Default');const deckName=deckNames[0]||file.name.replace(/\.apkg$/i,'');
 onProgress('Reading '+tables.notes.length.toLocaleString()+' Anki notes…');
 const map=new Map();for(const note of tables.notes){const card=cardFromNote(note,models,deckName);if(card)map.set(card.id,card)}
 const cards=[...map.values()];if(!cards.length)throw Error('No usable flashcards found');
 const refNames=new Set(cards.flatMap(c=>[c.image,c.audio,c.sentenceAudio].filter(Boolean)));
 let media={};if(zip.file('media')){try{media=JSON.parse(await zip.file('media').async('string'))}catch{}}
 const paths=new Map();for(const [id,name]of Object.entries(media)){if(refNames.has(name)&&zip.file(id))paths.set(name,zip.file(id))}
 for(const name of refNames){if(!paths.has(name)&&zip.file(name))paths.set(name,zip.file(name))}
 return {cards,mediaPaths:paths,deckName,mediaReferences:refNames.size};
}
window.HANAMI_APKG={parse,sqliteTables,cardFromNote};
})();
