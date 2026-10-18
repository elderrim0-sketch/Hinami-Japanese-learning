from playwright.sync_api import sync_playwright
import json,os,time,traceback
URL='file:///mnt/data/HanamiV21/index.html#flashcards'
mini='/mnt/data/HanamiV21/scripts/mini-kaishi.apkg'
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu'])
 ctx=browser.new_context(viewport={'width':1380,'height':930},accept_downloads=True)
 page=ctx.new_page();errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
 page.goto(URL,wait_until='domcontentloaded',timeout=30000)
 page.locator('.f21-hero').wait_for(timeout=25000)
 print('INITIAL',page.locator('.f21-root').count(),page.locator('.f21-stat b').all_text_contents(), 'errors',errors[:5]);
 page.screenshot(path='/mnt/data/Hanami_V21_Flashcards.png',full_page=True)
 page.locator('#flashIncludeMedia').uncheck()
 page.locator('#flashAnkiFile').set_input_files(mini)
 try: page.get_by_text('Kaishi 1.5k:',exact=False).wait_for(timeout=35000)
 except Exception as e:print('IMPORT WAIT ERR',str(e)[:180],page.locator('.f21-root').inner_text()[:1100]);
 print('IMPORT',page.locator('.f21-stat b').all_text_contents(),'note',page.locator('.f21-saved').all_text_contents(),'error',page.locator('.f21-alert').all_text_contents())
 page.locator('[data-act="flashStart"]').first.click()
 print('CARD',page.locator('.f21-jp').inner_text(),page.locator('.f21-sentence').inner_text())
 page.locator('[data-act="flashReveal"]').click();print('ANSWER',page.locator('.f21-answer h3').inner_text())
 page.locator('[data-act="flashGrade"][data-grade="good"]').click();print('NEXT',page.locator('.f21-jp').inner_text())
 page.reload(wait_until='domcontentloaded');page.locator('.f21-hero').wait_for(timeout=20000)
 print('AFTER RELOAD',page.locator('.f21-stat b').all_text_contents());
 # repeat import preserved review
 page.locator('#flashIncludeMedia').uncheck();page.locator('#flashAnkiFile').set_input_files(mini)
 page.get_by_text('Kaishi 1.5k:',exact=False).wait_for(timeout=35000)
 print('REIMPORT',page.locator('.f21-saved').all_text_contents())
 # inject actual Kotoba-like mines into existing progress and reload
 page.evaluate('''() => { let s=JSON.parse(localStorage.getItem('hanami-studio-progress-v1'));s.kotoba ||= {mines:[],status:{},reviews:{}};s.kotoba.mines.push({id:'kb123',word:'魔法',reading:'まほう',meaning:'magic',sentence:'魔法を使います。',translation:'I use magic.',title:'Anime example'});localStorage.setItem('hanami-studio-progress-v1',JSON.stringify(s));}''')
 page.reload(wait_until='domcontentloaded');page.locator('.f21-hero').wait_for();
 print('KOTOBA',page.locator('.f21-stat b').all_text_contents());page.locator('[data-act="flashChoose"][data-value="kotoba"]').click();print('KOTOBA CARD',page.locator('.f21-jp').inner_text());
 page.set_viewport_size({'width':390,'height':844});page.reload(wait_until='domcontentloaded');page.locator('.f21-hero').wait_for();page.screenshot(path='/mnt/data/Hanami_V21_Mobile.png',full_page=True)
 print('MOBILE OVERFLOW',page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth'));print('ERRORS',errors[:20]);
 ctx.close();browser.close()
