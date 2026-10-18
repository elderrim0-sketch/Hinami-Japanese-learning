from playwright.sync_api import sync_playwright
h=open('/mnt/data/Hanami_Japanese_v21_Standalone.html').read()
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu'])
 page=b.new_page(viewport={'width':1360,'height':900});errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
 page.set_content(h,wait_until='domcontentloaded',timeout=30000)
 try:
  page.locator('[data-act="nav"][data-page="flashcards"]').first.click(timeout=10000)
  page.wait_for_timeout(500)
  print('rendered',page.locator('.f21-hero').count(),page.locator('.f21-root').inner_text()[:450]);
  print('errors',errors[:8]);
  page.screenshot(path='/mnt/data/Hanami_V21_Flashcards.png',full_page=True)
  page.set_viewport_size({'width':390,'height':844});page.screenshot(path='/mnt/data/Hanami_V21_Mobile.png',full_page=True)
  print('mobileOverflow',page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth'))
 except Exception as e:
  print('failed',str(e)[:1000],errors[:8]);
 b.close()
