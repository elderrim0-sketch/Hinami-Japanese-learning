/* Low-cost, scroll-reactive ambience. No continuous JavaScript animation loops. */
(() => {
'use strict';
const field=document.getElementById('petalField');
if(!field)return;
const shades=['#ecb5bd','#f2ccd0','#f8e4df','#dc9eaf','#f5d7df'];
for(let i=0;i<17;i++){
  const petal=document.createElement('span');petal.className='ambient-petal';
  const left=(i*41+17)%97;const duration=15+(i*7)%18;const delay=-(i*13)%31;
  petal.style.cssText=`--petal-color:${shades[i%shades.length]};--petal-left:${left}%;--petal-duration:${duration}s;--petal-delay:${delay}s;--petal-scale:${.6+i%5*.18};--petal-drift:${i%2?-1:1}`;
  field.appendChild(petal);
}
const root=document.documentElement;
let pending=false;
const update=()=>{pending=false;const y=window.scrollY||0;root.style.setProperty('--scene-scroll',`${Math.min(90,Math.max(-90,y*.11))}px`);root.style.setProperty('--petal-gust',`${Math.min(56,Math.max(0,y*.06))}px`)};
window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});
window.addEventListener('pagehide',()=>{root.style.removeProperty('--petal-gust')});
update();
})();
