/* Hanami V3 · locally synthesised interface sounds, no downloaded audio and no tracking. */
(()=>{
'use strict';
let ctx;
const tones={tap:[[650,.026],[880,.04]],open:[[490,.045],[740,.06]],good:[[523,.08],[659,.08],[880,.14]],wrong:[[220,.08],[165,.14]],win:[[392,.08],[523,.08],[659,.1],[1046,.23]],focus:[[440,.07],[660,.12]],page:[[520,.035],[760,.08]]};
function play(type='tap'){
 try{
   const A=window.AudioContext||window.webkitAudioContext;if(!A)return;
   ctx ||= new A();if(ctx.state==='suspended')ctx.resume();
   const theme=window.HANAMI_V4?.themes[document.documentElement.dataset.theme]||window.HANAMI_V4?.themes.sakura;const tune=theme?.sound||[523,659,784];let start=ctx.currentTime;
   for(const [freq,duration] of (tones[type]||tones.tap).map(([n,d],i)=>[type==='wrong'?n:tune[i%tune.length]*(type==='win'?(i>1?2:1):type==='focus'?.5:1),d])){
     const oscillator=ctx.createOscillator(),gain=ctx.createGain();oscillator.type=type==='wrong'?'triangle':document.documentElement.dataset.theme==='storm'?'triangle':document.documentElement.dataset.theme==='lantern'?'sine':document.documentElement.dataset.theme==='tide'?'sine':document.documentElement.dataset.theme==='astral'?'sine':'sine';oscillator.frequency.setValueAtTime(freq,start);oscillator.frequency.exponentialRampToValueAtTime(freq*(type==='wrong'?.84:1.055),start+duration);
     gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(type==='win'?.052:.025,start+.009);gain.gain.exponentialRampToValueAtTime(.0001,start+duration+.075);
     oscillator.connect(gain);gain.connect(ctx.destination);oscillator.start(start);oscillator.stop(start+duration+.09);start+=duration*.81;
   }
 }catch{}
}
function petals(x,y){if(document.documentElement.classList.contains('no-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const root=document.createElement('div');root.className='hanami-sparkles';root.style.cssText=`left:${x||window.innerWidth*.5}px;top:${y||window.innerHeight*.37}px`;
 for(let i=0;i<13;i++){const p=document.createElement('i');p.style.cssText=`--a:${i*27.7}deg;--r:${42+i%4*17}px;--d:${i%3*40}ms`;root.appendChild(p)}document.body.appendChild(root);setTimeout(()=>root.remove(),950);
}
window.HANAMI_FEEL={play,petals};
})();
