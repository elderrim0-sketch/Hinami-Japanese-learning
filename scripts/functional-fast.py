from playwright.sync_api import sync_playwright
from pathlib import Path
h=Path('/mnt/data/Hanami_Japanese_v17_Standalone.html').read_text()
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu','--disable-web-security'])
 page=b.new_page(viewport={'width':1000,'height':900});err=[];page.on('pageerror',lambda e:err.append(str(e)))
 print('setup',flush=True)
 page.set_content(h,wait_until='domcontentloaded',timeout=30000)
 print('loaded',flush=True)
 print('click nav',page.evaluate('''() => {document.querySelector('[data-page="immersive17"]').click();return document.querySelector('.v17-episode')?.textContent?.slice(0,20)}'''),flush=True)
 print('click story',page.evaluate('''() => {document.querySelector('[data-act="v17Open"]').click();return document.querySelector('.v17-quest h3')?.textContent}'''),flush=True)
 print('setup voice',page.evaluate('''() => {try{Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},getVoices(){return []},speak(u){setTimeout(()=>u.onend?.(),10)}}});return 'OK'}catch(e){return String(e)}}'''),flush=True)
 print('click play',page.evaluate('''() => {document.querySelector('[data-act="v17Play"]').click();return document.querySelector('.v17-status')?.textContent}'''),flush=True)
 page.wait_for_timeout(6000)
 print('post 6 secs',page.evaluate('''() => ({disabled:document.querySelector('[data-act="v17Answer"]')?.disabled,txt:document.querySelector('.v17-status')?.textContent})'''),flush=True)
 print('errors',err[:5],flush=True)
 b.close()
