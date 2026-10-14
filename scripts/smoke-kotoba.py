from playwright.sync_api import sync_playwright
from pathlib import Path
import json
html=Path('/mnt/data/Hanami_Japanese_v20_Standalone.html').read_text()
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu'])
 ctx=b.new_context(viewport={'width':1240,'height':900})
 page=ctx.new_page()
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://**/*',lambda r:r.abort())
 page.goto('about:blank')
 page.evaluate("""() => {window.__storage={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return window.__storage[k]||null},setItem(k,v){window.__storage[k]=String(v)},removeItem(k){delete window.__storage[k]}}});window.fetch=async()=>{throw Error('offline')};}""")
 page.set_content(html,wait_until='domcontentloaded',timeout=20000)
 page.locator('[data-page="kotoba"]').first.click()
 print('Kotoba page:',page.locator('h1').first.inner_text(),flush=True)
 print('Status:',page.locator('.kb-note').inner_text()[:100],flush=True)
 sample={'schema':'kotoba-hanami-v1','mines':[{'word':'魔法','reading':'まほう','meaning':'magic','sentence':'この魔法は強い。','title':'My Anime','at':1740000000000,'url':'https://www.youtube.com/watch?v=123'},{'word':'魔法','reading':'まほう','meaning':'magic','sentence':'この魔法は強い。','title':'My Anime','at':1740000000000}], 'known':['魔法'], 'learning':['冒険']}
 page.locator('#kotobaImportFile').set_input_files({'name':'kotoba.json','mimeType':'application/json','buffer':json.dumps(sample,ensure_ascii=False).encode()})
 page.wait_for_timeout(500)
 print('Mine count:',page.locator('.kb-stat strong').first.inner_text(),flush=True)
 assert page.locator('.kb-stat strong').first.inner_text()=='1'
 page.locator('[data-act="kotobaOpen"]').first.click()
 page.locator('[data-act="kotobaReveal"]').click()
 print('word:',page.locator('.kb-word').inner_text(),flush=True)
 print('meaning:',page.locator('.kb-meaning strong').inner_text(),flush=True)
 page.locator('[data-act="kotobaGrade"][data-grade="good"]').click()
 print('Review scheduled:',page.evaluate("Object.values(JSON.parse(localStorage.getItem('hanami-studio-progress-v1')).kotoba.reviews).length"),flush=True)
 page.locator('[data-page="dashboard"]').first.click()
 page.locator('[data-page="kotoba"]').first.click()
 print('Return count:',page.locator('.kb-stat strong').first.inner_text(),flush=True)
 assert page.locator('.kb-stat strong').first.inner_text()=='1'
 print('Errors:',errors,flush=True)
 assert not errors
 ctx.close();b.close()
