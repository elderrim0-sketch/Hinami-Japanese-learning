from playwright.sync_api import sync_playwright
from pathlib import Path
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu']);q=b.new_page(viewport={'width':1200,'height':850});q.set_default_timeout(6000);q.route('https://**/*',lambda r:r.abort())
 q.on('pageerror',lambda e: print('PAGEERROR',e,flush=True))
 q.evaluate("""() => {window.fetch=async()=>{throw Error('offline')};window.__memoryStorage={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return window.__memoryStorage[k]||null},setItem(k,v){window.__memoryStorage[k]=String(v)},removeItem(k){delete window.__memoryStorage[k]}}});} """)
 q.set_content(Path('/mnt/data/Hanami_Japanese_v18_Standalone.html').read_text(),wait_until='domcontentloaded',timeout=20000)
 print('page initialized',flush=True)
 q.evaluate("() => document.querySelector('[data-page=curriculum]').click()")
 print('curriculum',flush=True)
 q.evaluate("() => document.querySelector('[data-act=c18Continue]').click()")
 print('stage',flush=True)
 q.evaluate("() => document.querySelector('[data-act=c18Type][data-type=grammar]').click()")
 print('switch type',flush=True)
 print('first item',q.evaluate("() => document.querySelector('[data-act=c18Item]')?.outerHTML"),flush=True)
 q.evaluate("() => document.querySelector('[data-act=c18Item]').click()")
 print('opened grammar',q.locator('.c18-lesson-hero').inner_text()[:180],flush=True)
 b.close()
