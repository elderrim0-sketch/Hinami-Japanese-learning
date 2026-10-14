from playwright.sync_api import sync_playwright
from pathlib import Path
import re
b=Path('/mnt/data/HanamiV16');r=b.joinpath('index.html').read_text();r=re.sub(r'<link rel="stylesheet" href="([^"]+)">',lambda m:'<style>'+b.joinpath(m.group(1)).read_text()+'</style>',r);r=re.sub(r'<script src="([^"]+)"></script>',lambda m:'<script>'+b.joinpath(m.group(1)).read_text()+'</script>',r);r=re.sub(r'<link(?![^>]*rel="stylesheet")[^>]+>','',r)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
 for width in [1300,390]:
  c=browser.new_context(viewport={'width':width,'height':900});page=c.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(r,wait_until='domcontentloaded',timeout=20000)
  page.add_style_tag(content='*.root-in,*:before,*:after{animation:none!important;transition:none!important}')
  for route in ['immersion','pitch','truepath','anime']:
   page.evaluate('(route) => document.querySelector(`[data-page=${route}]`).click()',route)
   page.wait_for_timeout(120)
   exists=page.locator('.im-root' if route=='immersion' else '.pi-root' if route=='pitch' else '.tp-root' if route=='truepath' else '.an-root').count()
   over=page.evaluate('document.documentElement.scrollWidth-innerWidth')
   print(width,route,'exists',exists,'over',over,'errors',errs[:1],flush=True)
   if route in ['immersion','pitch']:
    page.screenshot(path=f'/mnt/data/Hanami_V16_{"Mobile_" if width==390 else ""}{"Immersion" if route=="immersion" else "Pitch"}.png',timeout=10000)
   assert exists==1 and over<=2,(width,route,exists,over)
  assert not errs,errs
  c.close()
 browser.close()
