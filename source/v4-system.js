/* Hanami V4 - theme atelier, illustrated spirit collection, small genuine grammar heuristics.
   No tracking, remote assets, GPU loops, external audio libraries or subscription keys. */
(()=>{
'use strict';
const themes={
 sakura:{name:'Sakura Sanctuary',place:'Spring in Japan',symbol:'🌸',motif:'petal',a:'#ef90b4',b:'#6fbaa0',dark:'#24473e',paper:'#fffaf6',back:'#f8eee9',sound:[523,659,784],layout:'garden',story:'Blossoms, soft light and mountain air'},
 jade:{name:'Jade Dynasty',place:'Dragon & Crane Palace',symbol:'🐉',motif:'crane',a:'#cda04d',b:'#57aa8f',dark:'#183e38',paper:'#fffaea',back:'#e8f0e5',sound:[392,587,784],layout:'palace',story:'Jade dragon silhouettes and drifting white cranes'},
 lantern:{name:'Lantern Reverie',place:'Festival after sunset',symbol:'🏮',motif:'ember',a:'#f59b64',b:'#be5b89',dark:'#40283e',paper:'#fff3ed',back:'#241e37',sound:[440,554,659],layout:'festival',story:'Floating lanterns, gilded edges and warm chimes'},
 kitsune:{name:'Kitsune Moon',place:'Spirits of the shrine',symbol:'🦊',motif:'firefly',a:'#a894fc',b:'#8caada',dark:'#222a50',paper:'#f8f3ff',back:'#e8e5f6',sound:[466,698,932],layout:'moon',story:'Foxfire, moon halos and midnight cedar'},
 tide:{name:'Coral Kingdom',place:'Underwater sanctuary',symbol:'🪼',motif:'bubble',a:'#6ccdd2',b:'#63a8bc',dark:'#164653',paper:'#f1fffc',back:'#e3f6f8',sound:[349,523,698],layout:'sea',story:'Bubbles, living coral and deep-sea glow'},
 mycelia:{name:'Mushroom Dreams',place:'The glowing fairywood',symbol:'🍄',motif:'spore',a:'#e3a0bd',b:'#95b77d',dark:'#3a3b4c',paper:'#fff8ec',back:'#f3e9ef',sound:[494,622,740],layout:'forest',story:'Bioluminescent mushrooms and drifting spores'},
 storm:{name:'Thunder Oni',place:'Mountain of thunder',symbol:'⚡',motif:'spark',a:'#ebad4c',b:'#93a8e4',dark:'#2d3351',paper:'#f6f7ff',back:'#ebedf9',sound:[294,440,587],layout:'forge',story:'Lightning glyphs, dramatic mountains and copper'},
 astral:{name:'Astral Observatory',place:'Above the clouds',symbol:'🌠',motif:'star',a:'#c4a3fc',b:'#8fd2db',dark:'#252b4d',paper:'#faf6ff',back:'#eeeafa',sound:[659,880,1046],layout:'cosmos',story:'Constellations, stardust and orbiting moons'}
};
// 40 new plants, with 10 distinct structural families and carefully chosen ornaments.
// The existing six are retained. Each plant has an individualized SVG structure and timer identity.
const entries=[
 ['dragonpine','Imperial Dragon Pine','dragon','龍','jade','#7dc7a0','#d6b369','A dragon curls around its jade canopy'],
 ['cranewillow','Cloud Crane Willow','crane','鶴','jade','#eff4e9','#a4b7bf','A white crane spreads its wings in the boughs'],
 ['jadepagoda','Jade Pagoda Cedar','pagoda','塔','jade','#8fe0bb','#c8a457','Seven miniature shrine roofs'],
 ['goldenlotus','Golden Lotus Grove','lotus','蓮','jade','#f7d58e','#e69c6b','Lotuses bloom in spirals'],
 ['pearlbamboo','Pearl Dragon Bamboo','bamboo','珠','jade','#99e2af','#f7e1ad','A floating pearl circles the leaves'],
 ['inkbrush','Living Ink Cypress','ink','墨','jade','#414c59','#dfba78','Calligraphy strokes grow into branches'],
 ['paperfan','Origami Fan Tree','origami','扇','jade','#d6d9cb','#b88573','Folded fans open in its canopy'],
 ['tigerplum','Tiger Plum Spirit','spirit','虎','jade','#e9ad6e','#e7d49a','A striped woodland guardian'],
 ['lanternoak','Lantern Cathedral','lantern','灯','lantern','#f5a05c','#f7d484','Twenty tiny floating lanterns'],
 ['phoenixash','Phoenix Ember Ash','phoenix','鳳','lantern','#ff917e','#f5bf67','A firebird rises from its crown'],
 ['candyflame','Candyflame Maple','candy','飴','lantern','#ff8ea7','#ffcf77','Spiralling ribbons of glowing candy'],
 ['festivaldrum','Festival Drumwood','drum','祭','lantern','#dd7f5c','#efd18a','Celebration drums hang like fruit'],
 ['sunflowerking','Sunflower Monarch','sun','陽','lantern','#f3cb58','#8cba6b','An enormous royal sunflower canopy'],
 ['copperclock','Clockwork Clocktree','clock','時','lantern','#d0a779','#a6bdc4','Copper cogs tick between the leaves'],
 ['foxglimmer','Nine-Tail Foxglow','fox','狐','kitsune','#bea1fd','#f3bedd','Nine luminous tails form a crown'],
 ['spiritgate','Walking Torii Tree','torii','鳥','kitsune','#ea97ac','#c2b2e4','Its roots become a glowing shrine gate'],
 ['moonlily','Crescent Moon Lily','moon','月','kitsune','#d3d9ff','#dcb5ee','Silver crescents bloom like flowers'],
 ['ghostmoss','Friendly Ghost Moss','ghost','幽','kitsune','#ace6d9','#c9c5ff','Tiny spirits peek from the leaves'],
 ['dreamcatcher','Dreamcatcher Birch','dream','夢','kitsune','#b3a5e9','#95c9ed','A woven dream circle hangs in the air'],
 ['starwolf','Star-Wolf Sapling','wolf','狼','kitsune','#b5abeb','#dce1fb','A guardian wolf watches the constellations'],
 ['jellycoral','Jellyfish Crown','jelly','海','tide','#75d5de','#cda7f6','Its living crown pulses like a jellyfish'],
 ['kelpharp','Kelp Harp','harp','琴','tide','#77d5b4','#89c9e1','Waving kelp strings sing underwater'],
 ['octogrove','Octopus Orchestra','octo','蛸','tide','#c49bea','#87cddb','Eight curling branches embrace the reef'],
 ['shellspire','Pearl Shell Spire','shell','貝','tide','#ecc4ae','#85cde7','An iridescent shell grows on its trunk'],
 ['seahorse','Seahorse Spiraltree','horse','馬','tide','#f0c784','#7adbc5','A seahorse spirals around coral'],
 ['tideglass','Hourglass Anemone','glass','砂','tide','#99d9dd','#f4bbcf','Living hourglass fronds turn with the tide'],
 ['mushroomcastle','Mushroom Castle','mushroom','茸','mycelia','#d8a3df','#f6d08e','A tiny castle made of spotted caps'],
 ['butterflyfern','Butterfly Fern','butterfly','蝶','mycelia','#c2b1f9','#e6b5bd','Wings flutter among crystal leaves'],
 ['teacupmoss','Teacup Tea Forest','tea','茶','mycelia','#9fcb99','#e2c6a1','A teacup sprouts enchanted moss'],
 ['snailshroom','Snail-Shell Shroom','snail','蝸','mycelia','#cab1d6','#d2cf96','A sleepy snail wears a forest'],
 ['bookbloom','Storybook Blossom','book','本','mycelia','#e6bcb3','#a5c0da','Open books flower into new worlds'],
 ['froglantern','Frog Lantern Sprout','frog','蛙','mycelia','#abcc83','#f1d180','A glowing frog watches its pond'],
 ['stormheart','Thunderheart Oak','bolt','雷','storm','#f8cd6c','#8daef4','A living bolt crowns its branches'],
 ['metaloni','Iron Oni Spruce','oni','鬼','storm','#bb8cbd','#e4b0ab','A mischievous horned guardian'],
 ['crystalforge','Crystal Forge Tree','crystal','晶','storm','#9cc4f6','#d5a2f2','Angular crystals hum with energy'],
 ['stormkite','Tempest Kite Cedar','kite','風','storm','#cbd5ff','#e1b469','Kites and windsocks dance above it'],
 ['meteorfruit','Meteor-Fruit Orchard','meteor','星','astral','#c8b8f8','#e8b0b5','Comets ripen like fruit'],
 ['planetarium','Little Planetarium','planet','宙','astral','#97cce8','#d6b0f6','Tiny planets orbit every branch'],
 ['cometfeather','Comet Feather Tree','feather','羽','astral','#9bdeeb','#f8deac','Shimmering feathers leave star trails'],
 ['galaxyclock','Galaxy Clockflower','galaxy','銀','astral','#b4a3ec','#9bcfd9','A spinning spiral galaxy blooms']
];
const trees={};for(const [id,name,family,symbol,theme,primary,secondary,subtitle] of entries)trees[id]={name,family,symbol,theme,color:primary,secondary,subtitle};
const classic={sakura:['Sakura Guardian','petal','✿','sakura','#ef9cb9','#f8d4df','Blossoms of patience'],bamboo:['Moon Bamboo','bamboo','竹','jade','#a8d48a','#d0f7bb','Quiet and unstoppable'],oni:['Oni Heartwood','oni','鬼','storm','#aeb0df','#f7a5bb','A friendly forest beast'],bonsai:['Astral Bonsai','galaxy','星','astral','#a7bdea','#d2b3ff','A tiny cosmic garden'],willow:['Dreamweaver Willow','dream','月','kitsune','#b5c7e6','#e5c2ff','Branches of starlight'],kitsune:['Ember Kitsune','fox','狐','kitsune','#f6af94','#fce9b1','A tree with foxfire']};
for(const [id,[name,family,symbol,theme,color,secondary,subtitle]]of Object.entries(classic))trees[id]={name,family,symbol,theme,color,secondary,subtitle};
const shadows=(p,s)=>`<defs><linearGradient id="wood-${s}" x2=".85" y2="1"><stop stop-color="#6e544b"/><stop offset="1" stop-color="#c49b79"/></linearGradient><radialGradient id="leaf-${s}"><stop stop-color="${p}"/><stop offset="1" stop-color="${p}" stop-opacity=".76"/></radialGradient><filter id="glow-${s}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter></defs>`;
function renderTree(id='sakura',progress=1,small=false){
 const t=trees[id]||trees.sakura;const p=Math.max(.02,Math.min(1,Number(progress)||.02));const growth=.4+p*.6;
 const s=id.replace(/[^a-z0-9]/gi,'');const x=150,y=169;
 const trunk=`<path d="M145 272 Q151 236 147 208 Q142 175 145 146" stroke="url(#wood-${s})" stroke-width="${12*growth}" stroke-linecap="round" fill="none"/><path d="M146 208 Q121 185 110 164 M146 190 Q174 165 191 155" stroke="#94725b" stroke-width="${7*growth}" stroke-linecap="round" fill="none"/>`;
 const f=t.family;const color=t.color,sec=t.secondary;
 let crown='';
 const circ=(cx,cy,r,fill=color)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>`;
 const star=(cx,cy,r,fill=sec)=>`<path d="M${cx} ${cy-r} Q${cx+r*.22} ${cy-r*.2} ${cx+r} ${cy} Q${cx+r*.18} ${cy+r*.12} ${cx} ${cy+r} Q${cx-r*.15} ${cy+r*.17} ${cx-r} ${cy} Q${cx-r*.18} ${cy-r*.18} ${cx} ${cy-r}Z" fill="${fill}"/>`;
 const ellipse=(cx,cy,rx,ry,fill=color)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
 // These families have deliberately different outer silhouettes, not one generic recoloured canopy.
 if(['bamboo','harp'].includes(f)){
   crown=Array.from({length:5},(_,i)=>{const bx=94+i*29,h=95+(i%3)*21;return `<path d="M${bx} 265 Q${bx-10+i*3} ${200-h/2} ${bx+8} ${265-h}" stroke="${i%2?sec:color}" stroke-width="${8+i%2*4}" fill="none" stroke-linecap="round"/><path d="M${bx-5} ${215-h/2} Q${bx-33} ${201-h/2} ${bx-33} ${173-h/2} Q${bx-7} ${177-h/2} ${bx-5} ${215-h/2}M${bx+2} ${190-h/2}Q${bx+39} ${174-h/2} ${bx+44} ${148-h/2} Q${bx+9} ${154-h/2} ${bx+2} ${190-h/2}" fill="${color}"/>`}).join('');
 } else if(['mushroom','snail','frog'].includes(f)){
   crown=`<path d="M69 151 Q69 60 151 63 Q233 60 234 151 Q208 172 151 159 Q96 172 69 151" fill="${color}" stroke="${sec}" stroke-width="7"/>${[[-43,-37],[11,-57],[62,-29],[-12,-16]].map(([dx,dy],i)=>ellipse(x+dx,y+dy,12+i%2*6,10,sec)).join('')}<path d="M113 163 L118 211 Q151 222 180 211 L185 163" fill="#efe1c2" stroke="#8c7698" stroke-width="5"/>`;
 }else if(['jelly','octo','kelp','shell','horse','glass'].includes(f)){
   crown=`${ellipse(148,112,80,48,color)}${ellipse(132,93,33,18,sec)}${Array.from({length:9},(_,i)=>`<path d="M${91+i*15} 141 Q${83+i*15} 187 ${91+i*15} ${212+i%3*8}" stroke="${i%2?sec:color}" stroke-width="${6+i%3}" fill="none" stroke-linecap="round"/>`).join('')}`;
 }else if(['crystal','bolt','kite','meteor','planet','galaxy','clock','glass','origami','ink'].includes(f)){
   crown=Array.from({length:9},(_,i)=>{const a=i*Math.PI*2/9;const cx=x+Math.cos(a)*60,cy=116+Math.sin(a)*48;return `<path d="M${cx} ${cy-24} L${cx+18} ${cy-3} L${cx+4} ${cy+23} L${cx-20} ${cy+5}Z" fill="${i%2?color:sec}" stroke="#fff8" stroke-width="2"/>`}).join('')+circ(149,115,36,sec);
 }else if(['lotus','sun','butterfly','phoenix','feather'].includes(f)){
   crown=Array.from({length:12},(_,i)=>{const a=i*Math.PI*2/12,cx=148+Math.cos(a)*61,cy=117+Math.sin(a)*55;return `<ellipse cx="${cx}" cy="${cy}" rx="20" ry="36" fill="${i%2?color:sec}" transform="rotate(${i*30+90} ${cx} ${cy})"/>`}).join('')+circ(148,118,35,color);
 }else if(['pagoda','torii','book','tea','drum','lantern'].includes(f)){
   crown=Array.from({length:4},(_,i)=>{const yy=82+i*31,wide=40+i*14;return `<path d="M${150-wide-10} ${yy+13} L150 ${yy-8} L${150+wide+10} ${yy+13} L${150+wide} ${yy+22} L${150-wide} ${yy+22}Z" fill="${i%2?color:sec}" stroke="#5e5452" stroke-width="3"/><rect x="${150-wide+12}" y="${yy+20}" width="${2*wide-24}" height="18" rx="3" fill="#f9dfbb"/>`}).join('');
 }else if(['fox','wolf','oni','ghost','spirit','tiger'].includes(f)){
  crown=`${circ(116,114,51,color)}${circ(177,112,53,sec)}${circ(147,74,48,color)}<path d="M112 69 L99 25 L136 52 L162 52 L196 26 L190 83" fill="${sec}" stroke="${color}" stroke-width="8"/><ellipse cx="128" cy="101" rx="6" ry="9" fill="#30484c"/><ellipse cx="170" cy="101" rx="6" ry="9" fill="#30484c"/><path d="M140 120 Q150 133 161 120" fill="none" stroke="#314047" stroke-width="4" stroke-linecap="round"/>`;
 }else{
   crown=`${[[112,141,43],[182,142,47],[148,83,53],[97,96,36],[199,93,37],[152,135,42]].map(([cx,cy,r],i)=>circ(cx,cy,r,i%3===1?sec:color)).join('')}`;
 }
 // A distinctive symbolic companion/ornament belongs to each individual tree.
 const motifs={dragon:`<path d="M70 167 C30 114 72 57 115 76 S180 68 212 36 Q233 27 234 52 Q207 75 188 80 Q153 90 152 120 Q157 154 197 156" stroke="${sec}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M226 32 L244 18 L245 42Z" fill="${color}"/>`,crane:`<path d="M99 102 Q135 51 158 93 Q175 65 211 79 Q174 102 167 128 Q148 100 99 102M167 128 L187 145" fill="${sec}" stroke="${color}" stroke-width="5"/>`,galaxy:`${Array.from({length:8},(_,i)=>star(82+i*19,70+i%4*29,4+i%3,sec)).join('')}<ellipse cx="152" cy="105" rx="86" ry="27" transform="rotate(-21 152 105)" stroke="${sec}" stroke-width="4" fill="none"/>`,planet:`<ellipse cx="150" cy="116" rx="95" ry="33" transform="rotate(-22 150 116)" stroke="${sec}" stroke-width="5" fill="none"/>${circ(205,70,13,sec)}${circ(82,161,8,color)}`,lantern:`${[76,111,157,203].map((xx,i)=>`<path d="M${xx} 103 L${xx} 160" stroke="#745c58" stroke-width="2"/><rect x="${xx-10}" y="${156+i%2*10}" width="20" height="27" rx="6" fill="${sec}" stroke="#a96855" stroke-width="4"/>`).join('')}`,moon:`<path d="M191 31 A36 36 0 1 0 222 95 A35 35 0 1 1 191 31" fill="${sec}"/>`,butterfly:`<path d="M160 82 C108 18 95 78 149 118 C96 161 130 185 156 133 C178 184 220 165 174 116 C213 67 179 46 160 82" fill="${sec}" stroke="${color}" stroke-width="5"/>`,clock:`${circ(147,100,40,'#f8e2b6')}<path d="M146 76 L146 103 L166 115" stroke="#554842" stroke-width="6" fill="none"/>`,glass:`<path d="M116 62 H188 L130 131 L186 202 H116 L171 131Z" fill="none" stroke="${sec}" stroke-width="7"/>`};
 crown+=motifs[f]||Array.from({length:4},(_,i)=>star(92+i*37,67+i%2*100,7+i%2*3,sec)).join('');
 const opacity=Math.max(0,Math.min(1,(p-.22)*2.3));
 return `<svg class="spirit-tree-svg" viewBox="0 0 300 300" role="img" aria-label="${t.name} at ${Math.round(p*100)}% growth" xmlns="http://www.w3.org/2000/svg">${shadows(color,s)}<ellipse cx="150" cy="278" rx="96" ry="11" fill="#3b6255" opacity=".13"/><path d="M83 277 Q151 253 217 277" stroke="${sec}" stroke-width="3" fill="none" opacity=".65"/><g style="transform-origin:150px 266px;transform:scale(${growth})">${trunk}<g style="opacity:${opacity}">${crown}</g></g>${p<.21?`<path d="M140 273 Q150 243 160 273" stroke="${color}" stroke-width="7" fill="none"/>`:''}<circle cx="150" cy="247" r="5" fill="${sec}" opacity=".8"/></svg>`;
}
const shortcuts=[
 ['The verb is the engine','Read the end of the sentence first. Japanese often gives you the action last.','私は水を飲みます。','I drink water. Find 飲みます first: “drink”.','sentence'],
 ['Zero is a real word','If everyone already knows the person, Japanese simply skips saying them again.','食べます。','(I / you / they) eat. Context chooses the subject.','sentence'],
 ['は is your scene title','は tells the listener what you are talking about: “Speaking of...”','私は学生です。','As for me, student. → I am a student.','particles'],
 ['が points to the star','が marks the subject of the statement, often information being identified.','猫がいます。','There is a cat. The cat is the subject here.','particles'],
 ['を points at the target','を (said “o”) marks the thing directly acted on.','りんごを食べます。','Eat an apple. Apple = the target of eating.','particles'],
 ['に gives a destination','Think of に as a pin on a map, or a target point in time.','学校に行きます。','Go to school. The school is the destination.','particles'],
 ['で is your stage','で often marks where an action happens or the tool used.','家で勉強します。','Study at home. Home is the stage.','particles'],
 ['の is the linking ribbon','の connects two nouns. Often it means “of” or possession, but not always.','私の本です。','My book. Literally: me + の + book.','particles'],
 ['Descriptions go before nouns','Japanese puts descriptions ahead of the thing being described.','小さい猫です。','It is a small cat.','sentence'],
 ['Questions are often statements + か','Polite questions can use か at the end.','学生ですか。','Are you a student?','sentence'],
 ['No future tense required','The same non-past verb can talk about now or later; context does the work.','明日行きます。','I will go tomorrow.','verbs'],
 ['Two main adjective families','い adjectives and な adjectives behave differently before nouns.','静かな町です。','A quiet town. 静か uses な here.','verbs'],
 ['て form makes Lego connections','て links actions and also builds requests and helpful patterns.','見てください。','Please look.','verbs'],
 ['Small っ makes a pause','That tiny っ doubles the next consonant. Hold the beat for one count.','きって','Stamp / cut (depending on kanji); don’t say it like きて.','sounds'],
 ['Long vowels count','おばさん (aunt) and おばあさん (grandmother) are different words.','おばあさん','Hold あ one extra mora.','sounds'],
 ['りょ is one sound unit','Small ゃ, ゅ, ょ combine with the kana before them.','りょこう','Travel = りょ + こ + う.','sounds'],
 ['Pitch is not stress','Japanese pitch patterns rise and fall; shouting a syllable is not pitch accent.','はし','橋 (bridge) and 箸 (chopsticks) can differ by pitch in Tokyo Japanese.','sounds'],
 ['Use chunks instead of translation','Store useful patterns like 〜てもいいですか as single tools.','入ってもいいですか。','May I come in?','chunks'],
 ['ている has multiple jobs','It can describe ongoing action or a resulting state. Context and verb matter.','結婚しています。','I am married (a continuing state).','verbs'],
 ['Because often comes after the reason','〜から and 〜ので commonly give the reason before a result.','雨だから、行きません。','Because it is raining, I won’t go.','chunks'],
 ['Even if ≠ although','〜ても introduces a condition despite which something happens.','雨でも行きます。','I will go even if it rains.','chunks'],
 ['Honorifics follow relationships','Politeness is not a single ladder; situation and familiarity matter.','お待ちください。','Please wait (respectful request).','culture'],
 ['Read the room, not just the words','A speaker may imply their true request through context.','ちょっと難しいです。','“It is a bit difficult” may politely signal refusal.','culture'],
 ['Rehearse one useful sentence','Say a real sentence several times with your own substitution.','今日は忙しいです。','I am busy today. Replace 今日 with 明日.','practice']
];
function makeAmbient(host,theme='sakura'){
 if(!host)return;host.innerHTML='';const t=themes[theme]||themes.sakura;
 for(let i=0;i<18;i++){const d=document.createElement('i');d.className='theme-particle particle-'+t.motif;d.style.cssText=`--x:${(i*47.39)%100}%;--delay:${-(i*1.72)%20}s;--duration:${10+(i%8)*3}s;--scale:${.55+i%5*.2};--drift:${(i%5-2)*35}px`;host.appendChild(d)}
}
const scenery={
 sakura:`<g fill="#d69baa" opacity=".65"><circle cx="1230" cy="168" r="70"/><circle cx="1288" cy="130" r="66"/><circle cx="1162" cy="131" r="53"/><circle cx="1280" cy="212" r="57"/></g><path d="M1210 340 Q1212 248 1235 154" fill="none" stroke="#a88075" stroke-width="15"/><path d="M0 790 L210 535 L355 742 L535 550 L760 770 L960 550 L1220 775 L1440 505 V900 H0" fill="#9fbea6" opacity=".46"/>`,
 jade:`<g fill="#aaad7c" opacity=".75"><path d="M1018 595 L1110 555 L1200 595 L1200 612 H1018Z M1047 550 L1110 515 L1175 550 V568 H1047Z M1074 503 L1110 485 L1150 503 V520 H1074Z"/><path d="M1063 613 H1155 V865 H1063Z"/></g><path d="M150 225 C95 138 185 72 262 128 C339 184 283 263 378 232 Q445 210 428 147 Q490 188 466 249 C446 342 301 297 259 240" stroke="#70b09a" stroke-width="31" fill="none" opacity=".62"/><path d="M390 120 Q450 64 472 117 Q508 67 559 105 Q494 131 484 158 Q470 127 390 120" fill="#e7efe0" opacity=".9"/>`,
 lantern:`<path d="M0 195 Q730 345 1440 151" fill="none" stroke="#e9a36e" stroke-width="5"/>${Array.from({length:10},(_,i)=>{let x=60+i*144,y=195+Math.sin(i/9*Math.PI)*80;return `<path d="M${x} ${y-20}v30" stroke="#e2a474" stroke-width="3"/><rect x="${x-19}" y="${y+4}" width="38" height="52" rx="12" fill="#f5b080" opacity=".65"/><path d="M${x-20} ${y+7}h40" stroke="#a85764" stroke-width="6"/>`}).join('')}<path d="M0 780 Q300 660 700 785 T1440 720 V900 H0" fill="#b8798c" opacity=".4"/>`,
 kitsune:`<circle cx="1156" cy="209" r="134" fill="#f2e5ff" opacity=".63"/><path d="M980 805 L980 550 H1228 V805 M932 550 H1273" fill="none" stroke="#9a8cb7" stroke-width="38" opacity=".55"/><path d="M946 500 Q1098 448 1265 500" fill="none" stroke="#baa0dd" stroke-width="23"/><path d="M0 790 L300 580 L575 810 L800 570 L1050 900 H0" fill="#9aa4cf" opacity=".38"/>`,
 tide:`${Array.from({length:20},(_,i)=>{let x=(i*149)%1440,y=80+((i*77)%700),r=12+i%4*8;return `<circle cx="${x}" cy="${y}" r="${r}" stroke="#8bd2db" fill="#bcebed" fill-opacity=".25" stroke-width="3"/>`}).join('')}<path d="M0 800 Q150 680 300 805 T620 795 T940 760 T1440 780 V900 H0" fill="#83caca" opacity=".55"/><path d="M116 900 Q70 737 159 650 Q113 755 228 900 M1230 900 Q1190 750 1320 680 Q1260 797 1380 900" fill="#76bbaa" opacity=".65"/>`,
 mycelia:`${[[155,740,1],[435,785,.65],[1280,720,1.7],[1030,815,.68]].map(([x,y,k])=>`<g transform="translate(${x} ${y}) scale(${k})"><path d="M-8 6 V132 H17 V6" fill="#e9d6c7"/><path d="M-75 21 Q-64-95 3-96 Q85-91 95 21Z" fill="#d29dba"/><circle cx="-22" cy="-18" r="14" fill="#f5cdd8"/><circle cx="39" cy="-30" r="17" fill="#f2dfec"/></g>`).join('')}<path d="M0 870 Q400 730 720 870 T1440 810 V900 H0" fill="#a5b58b" opacity=".5"/>`,
 storm:`<path d="M0 900 L0 685 L170 470 L260 612 L433 315 L730 890Z M620 900 L810 520 L925 600 L1100 290 L1440 690 V900" fill="#8691b7" opacity=".5"/><path d="M1047 65 L952 286 H1040 L912 478 L963 303 H883Z" fill="#f5d586" opacity=".65"/>`,
 astral:`<circle cx="1148" cy="220" r="119" fill="#c3b4e9" opacity=".6"/><ellipse cx="1148" cy="220" rx="205" ry="70" transform="rotate(-17 1148 220)" fill="none" stroke="#a8d5e3" stroke-width="13" opacity=".6"/>${Array.from({length:25},(_,i)=>{const x=(i*191)%1440,y=(i*83)%800;return `<path d="M${x} ${y-5}v10m-5-5h10" stroke="#bfafea" stroke-width="2" opacity=".75"/>`}).join('')}<path d="M0 880 L205 670 L410 828 L620 560 L880 882 L1095 655 L1440 900Z" fill="#8ca6d5" opacity=".44"/>`
};
function svgScene(name,front=false){const t=themes[name]||themes.sakura;const paths=front?`<path d="M0 890 Q300 820 600 880 T1150 870 T1440 850 V900 H0" fill="${t.b}" opacity=".34"/>`:scenery[name]||scenery.sakura;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><rect width="1440" height="900" fill="none"/>${paths}</svg>`;
 return 'url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
}
let appliedName='';
function applyTheme(name){const t=themes[name]||themes.sakura;const valid=themes[name]?name:'sakura';document.documentElement.dataset.theme=valid;document.documentElement.dataset.layout=t.layout;
 if(appliedName===valid)return;appliedName=valid;
 let f=document.getElementById('themeAtmosphere');if(!f){f=document.createElement('div');f.id='themeAtmosphere';f.setAttribute('aria-hidden','true');document.body.prepend(f)}makeAmbient(f,valid);
 let back=document.getElementById('themeBackdrop');if(!back){back=document.createElement('div');back.id='themeBackdrop';back.setAttribute('aria-hidden','true');back.innerHTML='<div class="back-layer"></div><div class="front-layer"></div>';document.body.prepend(back)}
 back.querySelector('.back-layer').style.backgroundImage=svgScene(valid,false);
 back.querySelector('.front-layer').style.backgroundImage=svgScene(valid,true);
}

window.HANAMI_V4={themes,trees,renderTree,shortcuts,applyTheme};
})();
