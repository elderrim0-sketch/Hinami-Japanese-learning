/* Optional low-resolution WebGL fragment shader: time-varying sunbeams, atmosphere, floaters.
   Rate limited to 12 FPS, suspended when tab is hidden, canvas absent, or reduced motion active. */
(()=>{
'use strict';
let frame=0, observer=null, active=null, currentGL=null;
function cleanup(){if(frame)cancelAnimationFrame(frame);frame=0;if(observer){observer.disconnect();observer=null}active=null;if(currentGL){try{currentGL.getExtension('WEBGL_lose_context')?.loseContext()}catch{}currentGL=null}}
const vert=`attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const frag=`precision mediump float;
varying vec2 uv;
uniform float uTime;
uniform vec2 uSize;
uniform vec3 uTint;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float glow(vec2 pos,float size){vec2 d=uv-pos;d.x*=uSize.x/max(1.,uSize.y);return exp(-dot(d,d)*size);}
void main(){
 float tm=uTime*.34;float dust=0.;
 for(int i=0;i<10;i++){float fi=float(i);vec2 o=vec2(hash(vec2(fi,3.)),hash(vec2(fi,71.)));
 vec2 pos=vec2(o.x+.03*sin(tm*.45+fi),fract(o.y+.035*tm*(.25+o.x)));
 dust+=glow(pos,6000.)*(.2+.55*hash(vec2(fi,91.)));
 }
 float rays=pow(max(0.,sin(uv.x*8.4-uv.y*1.3+tm*.11)),20.)*.11*(1.-uv.y);
 float haze=.06*pow(1.-abs(uv.y-.58),2.);
 float pulse=.014*sin(tm+uv.x*3.);
 float alpha=min(.24,dust*.32+rays+haze+pulse);
 gl_FragColor=vec4(uTint,alpha);
}`;
function shader(gl,kind,source){const sh=gl.createShader(kind);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){gl.deleteShader(sh);return null}return sh}
function attach(view){cleanup();if(!view||document.documentElement.dataset.graphics==='off'||!window.WebGLRenderingContext||matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('no-motion'))return;
 const canvas=view.querySelector('.world-shader');if(!canvas)return;
 let gl;try{gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,powerPreference:'low-power',depth:false,stencil:false})}catch{}if(!gl)return;currentGL=gl;
 const vs=shader(gl,gl.VERTEX_SHADER,vert),fs=shader(gl,gl.FRAGMENT_SHADER,frag);if(!vs||!fs)return;
 const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;
 gl.useProgram(pr);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const attr=gl.getAttribLocation(pr,'p');gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(attr);
 const tm=gl.getUniformLocation(pr,'uTime'),size=gl.getUniformLocation(pr,'uSize'),tint=gl.getUniformLocation(pr,'uTint');
 const colors={village:[1,.87,.59],forest:[.68,1,.72],market:[1,.79,.55],mountain:[.74,.79,1],archive:[.86,.71,1]};let biome=[...view.classList].find(x=>x.startsWith('biome-'))?.slice(6)||'village';let color=colors[biome]||colors.village;
 canvas.width=490;canvas.height=269;gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(size,canvas.width,canvas.height);gl.uniform3f(tint,...color);
 let visible=true,last=0,start=performance.now();observer=new IntersectionObserver(e=>visible=e[0]?.isIntersecting??false,{threshold:0});observer.observe(view);
 active=view;
 function draw(now){if(!active||!document.contains(canvas))return;frame=requestAnimationFrame(draw);if(!visible||document.hidden||now-last<83)return;last=now;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('no-motion')){canvas.style.display='none';return}
 canvas.style.display='block';gl.uniform1f(tm,(now-start)/1000);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6)}
 frame=requestAnimationFrame(draw);
}
window.HANAMI_WORLD_SHADER={attach,cleanup};
})();
