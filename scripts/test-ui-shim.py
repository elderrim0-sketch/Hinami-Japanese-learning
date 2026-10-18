from playwright.sync_api import sync_playwright
h=open('/mnt/data/Hanami_Japanese_v21_Standalone.html').read()
shim='''<script>(function(){const maps={};const openDB=(name)=>{let db=maps[name];if(!db){db={maps:{},objectStoreNames:{contains:k=>!!db.maps[k]},createObjectStore:k=>{db.maps[k]=new Map()},transaction:(key,mode)=>{const tx={objectStore:()=>({get(k){const r={};setTimeout(()=>{r.result=db.maps[key]?.get(k);r.onsuccess?.()},0);return r},count(){const r={};setTimeout(()=>{r.result=db.maps[key]?.size||0;r.onsuccess?.()},0);return r},getAll(){const r={};setTimeout(()=>{r.result=[...(db.maps[key]?.values()||[])];r.onsuccess?.()},0);return r},put(v,k){const recordKey=k??v.id;db.maps[key].set(recordKey,v)}})};setTimeout(()=>tx.oncomplete?.(),0);return tx}};maps[name]=db}const req={};setTimeout(()=>{req.result=db;req.onupgradeneeded?.();req.onsuccess?.()},0);return req};Object.defineProperty(window,'indexedDB',{value:{open:openDB},configurable:true});})();</script>'''
h=h.replace('<body>', '<body>'+shim,1)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu'])
 page=b.new_page(viewport={'width':1350,'height':900});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(h,wait_until='domcontentloaded',timeout=45000)
 page.locator('[data-act="nav"][data-page="flashcards"]').first.click(timeout=10000)
 page.locator('.f21-hero').wait_for()
 page.wait_for_timeout(600)
 print('INIT',page.locator('.f21-alert').all_text_contents(),errors[:3]);page.screenshot(path='/mnt/data/Hanami_V21_Flashcards.png',full_page=True)
 # import actual Kaishi collection 1501 and 6 media; note file size ~600KB
 page.locator('#flashAnkiFile').set_input_files('/mnt/data/HanamiV21/scripts/mini-kaishi.apkg')
 try:page.locator('.f21-saved').wait_for(timeout=45000)
 except Exception as e:print('Import fail',page.locator('.f21-alert').all_text_contents(),page.locator('.f21-progress').all_text_contents(),str(e)[:200])
 print('AFTER IMPORT',page.locator('.f21-stat b').all_text_contents(),page.locator('.f21-saved').all_text_contents()[:2]);
 page.locator('[data-act="flashStart"]').first.click()
 print('CARD',page.locator('.f21-jp').inner_text(),page.locator('.f21-sentence').inner_text()[:60]);
 page.locator('[data-act="flashReveal"]').click()
 print('ANSWER',page.locator('.f21-answer h3').inner_text());
 page.locator('[data-act="flashGrade"][data-grade="good"]').click()
 page.wait_for_timeout(500);print('NEXT',page.locator('.f21-jp').inner_text());
 page.screenshot(path='/mnt/data/Hanami_V21_Review.png',full_page=False)
 print('ERR',errors[:7]);
 page.locator('[data-act="flashTab"][data-value="overview"]').first.click(); page.locator('#flashAnkiFile').set_input_files('/mnt/data/HanamiV21/scripts/mini-kaishi.apkg'); page.locator('.f21-saved').wait_for(timeout=25000);print('REIMPORT',page.locator('.f21-saved').all_text_contents()[:1]);
 page.set_viewport_size({'width':390,'height':844});page.locator('[data-act="flashTab"][data-value="overview"]').first.click()
 page.screenshot(path='/mnt/data/Hanami_V21_Mobile.png',full_page=True)
 print('MOBILE overflow',page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth'))
 b.close()
