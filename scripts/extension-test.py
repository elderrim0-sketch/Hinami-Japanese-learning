from playwright.sync_api import sync_playwright
from pathlib import Path
import tempfile,time
K='/mnt/data/Kotoba-Hanami-v2.6'
with sync_playwright() as p:
 try:
  ctx=p.chromium.launch_persistent_context(tempfile.mkdtemp(prefix='kotoba-browser-'),executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu',f'--disable-extensions-except={K}',f'--load-extension={K}'],viewport={'width':1200,'height':900})
  print('Service workers:',[w.url for w in ctx.service_workers],flush=True)
  if not ctx.service_workers:ctx.wait_for_event('serviceworker',timeout=7000)
  worker=ctx.service_workers[0];id=worker.url.split('/')[2]
  print('Extension ID:',id,flush=True)
  p1=ctx.new_page();p1.goto(f'chrome-extension://{id}/hanami.html',wait_until='domcontentloaded',timeout=12000)
  print('Pair page:',p1.title(),flush=True)
  p1.locator('#site').fill('http://localhost:8765/')
  p1.locator('#pair').click()
  p1.wait_for_timeout(600)
  print('Pair status:',p1.locator('#status').inner_text()[:180],flush=True)
  print('Extension data:',worker.evaluate("async()=>await chrome.storage.local.get(['kotobaHanamiUrl'])"),flush=True)
  ctx.close()
 except Exception as e:
  print('Browser extension testing unavailable:',str(e)[:500],flush=True)
