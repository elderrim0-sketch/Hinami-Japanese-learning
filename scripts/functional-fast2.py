from playwright.sync_api import sync_playwright
from pathlib import Path
h=Path('/mnt/data/Hanami_Japanese_v17_Standalone.html').read_text()
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu','--disable-web-security'])
 page=b.new_page(viewport={'width':1180,'height':900});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(h,wait_until='domcontentloaded',timeout=30000)
 page.evaluate('''() => {Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},getVoices(){return []},speak(u){setTimeout(()=>u.onend?.(),8)}}});document.querySelector('[data-page="immersive17"]').click();document.querySelector('[data-act="v17Tab"][data-tab="clinics"]').click();document.querySelector('[data-act="v17Clinic"]').click();}''')
 page.locator('#v17ClinicAnswer').fill('何してるの？')
 page.evaluate('''() => document.querySelector('[data-act="v17ClinicCheck"]').click()''')
 print('clinic success',page.locator('.v17-clinic').first.inner_text().splitlines()[0:4],flush=True)
 page.evaluate('''() => {document.querySelector('[data-act="v17Tab"][data-tab="exam"]').click();document.querySelector('[data-act="v17ExamBegin"][data-id="A"]').click()}''')
 answers=[1,0,1,1,0]
 for k,v in enumerate(answers):
  page.evaluate('''() => document.querySelector('[data-act="v17ExamPlay"]').click()''')
  page.wait_for_function("document.querySelector('[data-act=v17ExamPick]')?.disabled === false",timeout=8000)
  page.evaluate('''(i) => {document.querySelectorAll('[data-act="v17ExamPick"]')[i].click();document.querySelector('[data-act="v17ExamNext"]').click()}''',v)
  print('checkpoint',k+1,flush=True)
 print('exam score bank A',page.locator('.v17-bank').first.inner_text().replace('\n',' / ')[:130],flush=True)
 print('errors',errors[:10],flush=True)
 b.close()
