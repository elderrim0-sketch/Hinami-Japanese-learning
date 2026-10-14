from playwright.sync_api import sync_playwright
from pathlib import Path
import time
url='file:///mnt/data/HanamiV17/index.html'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-web-security','--disable-gpu'])
 page=b.new_page(viewport={'width':1365,'height':900}, permissions=['microphone'])
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  page.goto(url, wait_until='domcontentloaded',timeout=20000)
  page.wait_for_timeout(1800)
  print('title',page.title(),'nav',page.locator('.nav-link').count())
  print('errors',errors[:5])
  page.locator('[data-page="immersive17"]').click(timeout=4000)
  page.wait_for_timeout(900)
  print('heading',page.locator('.v17-banner h1').inner_text())
  print('episodes',page.locator('.v17-episode').count())
  page.screenshot(path='/mnt/data/Hanami_V17_Studio.png',full_page=False)
  page.locator('[data-act="v17Open"]').first.click()
  page.wait_for_timeout(550)
  print('scene',page.locator('.v17-scene').count(),'q locked',page.locator('[data-act="v17Answer"]').first.is_disabled())
  page.screenshot(path='/mnt/data/Hanami_V17_Episode.png',full_page=False)
  page.locator('[data-act="v17Back"]').click()
  page.locator('[data-act="v17Tab"][data-tab="clinics"]').click()
  print('clinics',page.locator('.v17-clinic').count())
  page.locator('[data-act="v17Tab"][data-tab="native"]').click()
  print('native',page.locator('#v17Tsv').count())
  page.locator('[data-act="v17Tab"][data-tab="exam"]').click()
  print('exam banks',page.locator('.v17-bank').count())
  page.locator('[data-act="v17Tab"][data-tab="report"]').click()
  print('report conditions',page.locator('.v17-check').count())
  print('all errors',errors[:10])
 except Exception as e:
  print('TEST FAILURE',repr(e))
 finally: b.close()
