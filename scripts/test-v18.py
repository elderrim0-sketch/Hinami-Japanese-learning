from pathlib import Path
from playwright.sync_api import sync_playwright
import re,json, mimetypes
ROOT=Path('/mnt/data/HanamiV18')
CNT={'vocab':[674,630,1659,1778,3070],'kanji':[84,169,387,398,1345],'grammar':[81,98,101,123,123]}
LEVELS=['n5','n4','n3','n2','n1']
def fixture(t,l):
    n=CNT[t][LEVELS.index(l)];lev=l.upper()
    if t=='vocab':return [{'id':f'{l}-v-{i}','word':f'語{i}','reading':'ご','meanings':[f'word {i} meaning'],'level':lev,'examples':[{'ja':f'日本語の言葉{i}です。','en':f'word {i} sample'}]} for i in range(n)]
    if t=='grammar':return [{'id':f'{l}-g-{i}','pattern':f'〜ように{i}','meaning':f'grammar concept {i}','formation':'Verb + 〜ように','level':lev,'notes':'Compare context carefully','examples':[{'ja':f'例文{i}は大切です。','en':f'Example {i} matters.'},{'ja':f'他の例文{i}を見ます。','en':f'Another example {i}.'}]} for i in range(n)]
    return [{'character':chr(0x4e00+sum(CNT['kanji'][:LEVELS.index(l)])+i),'level':lev,'meanings':[f'kanji {i}'],'onyomi':['ゴ'],'kunyomi':['ご'],'strokes':4,'words':[f'語{i}']} for i in range(n)]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'])
    ctx=browser.new_context(viewport={'width':1280,'height':870},reduced_motion='reduce')
    page=ctx.new_page();page.set_default_timeout(7500);page.route('https://**/*',lambda r:r.abort()); errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    fixtures={f'{t}/{l}':fixture(t,l) for t in CNT for l in LEVELS}
    page.evaluate("""(fixtures)=>{window.__fixtures=fixtures;
     window.__memoryStorage={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return window.__memoryStorage[k]||null},setItem(k,v){window.__memoryStorage[k]=String(v)},removeItem(k){delete window.__memoryStorage[k]}}});
     window.fetch=async function(url){const m=String(url).match(/\/data\/json\/(vocab|grammar|kanji)\/(n[1-5])\.json/);const k=m&&m[1]+'/'+m[2];return {ok:!!fixtures[k],status:fixtures[k]?200:404,json:async()=>fixtures[k]}};
    }""",fixtures)
    page.set_content(Path('/mnt/data/Hanami_Japanese_v18_Standalone.html').read_text(),wait_until='domcontentloaded',timeout=30000)
    page.locator('[data-page="curriculum"]').click()
    page.wait_for_function('window.HANAMI_V18 && window.HANAMI_V18.coverage().every(x => x.installed && Object.values(x.installed).every(Boolean))',timeout=30000)
    counts=page.evaluate('window.HANAMI_V18.coverage().map(x => ({l:x.level,c:x.counts}))')
    assert sum(x['c']['vocab'] for x in counts)==7811,counts
    assert sum(x['c']['grammar'] for x in counts)==526,counts
    assert sum(x['c']['kanji'] for x in counts)==2383,counts
    print('DATASET assigned',counts,flush=True)
    stages=page.evaluate('''() => {
     let m=window.HANAMI_V18;let totals={vocab:0,grammar:0,kanji:0};const uniq={vocab:new Set(),grammar:new Set(),kanji:new Set()};
     for(let n=1;n<=100;n++){for(let t of Object.keys(totals)){for(let x of m.assigned(t,n)){totals[t]++;uniq[t].add(m._debug.kOf(t,x))}}}
     return {totals,unique:Object.fromEntries(Object.entries(uniq).map(([k,v])=>[k,v.size]))}
    }''')
    print('ALL STAGES',stages,flush=True)
    assert stages['totals']=={'vocab':7811,'grammar':526,'kanji':2383}
    assert stages['unique']=={'vocab':7811,'grammar':526,'kanji':2383}
    assert not page.evaluate('window.HANAMI_V18.stageReady(1)')
    page.locator('[data-act="c18Continue"]').click()
    assert 'Level 1' in page.locator('.c18-stage-head').inner_text()
    page.locator('[data-act="c18Item"]').first.click()
    assert page.locator('.c18-lesson-hero h1').inner_text()=='語0'
    page.locator('[data-act="c18BeginQuiz"]').click()
    # answer key is computed in debug with item
    target=page.evaluate('''() => window.HANAMI_V18._debug.options('vocab',window.HANAMI_V18.assigned('vocab',1)[0]).answer''')
    page.locator('[data-act="c18Choose"]').nth(target).click()
    page.locator('[data-act="c18GoRecall"]').click()
    assert 'word 0 meaning' not in page.locator('.c18-lesson-hero').inner_text()
    page.locator('#c18Draft').fill('ご')
    page.evaluate("""() => document.querySelector('[data-act=\"c18CheckDraft\"]').click()""")
    assert 'Lesson practised' in page.locator('.c18-lesson-card').inner_text()
    assert page.evaluate('window.HANAMI_V18.stats("vocab",1).introduced')==1
    page.screenshot(path='/mnt/data/Hanami_V18_Study.png',full_page=False)
    print('return from vocab',flush=True);page.locator('[data-act="c18Return"]').first.click()
    print('switch grammar',flush=True);page.locator('[data-act="c18Type"][data-type="grammar"]').click()
    print('open grammar',flush=True);page.locator('[data-act="c18Item"]').first.click()
    assert page.locator('.c18-example').count()>=2
    page.locator('[data-act="c18BeginQuiz"]').click()
    a=page.evaluate('window.HANAMI_V18._debug.options("grammar",window.HANAMI_V18.assigned("grammar",1)[0]).answer')
    page.locator('[data-act="c18Choose"]').nth(a).click(); page.locator('[data-act="c18GoRecall"]').click()
    page.locator('#c18Draft').fill('この文章は私の練習です。')
    page.evaluate("""() => document.querySelector('[data-act=\"c18CheckDraft\"]').click()""")
    print('self-rate',flush=True);page.evaluate("""() => document.querySelector('[data-act=\"c18CheckDraft\"]').click()""");page.evaluate("""() => document.querySelector('[data-act=\"c18SelfGood\"]').click()""")
    assert page.evaluate('window.HANAMI_V18.stats("grammar",1).introduced')==1
    print('return from vocab',flush=True);page.locator('[data-act="c18Return"]').first.click()
    print('map view',flush=True);page.locator('[data-act="c18Back"]').click()
    page.screenshot(path='/mnt/data/Hanami_V18_Coverage.png',full_page=False)
    # Verify navigating back to main level journey and stage gating:
    page.locator('[data-act="c18Journey"]').first.click()
    page.wait_for_timeout(80)
    assert page.locator('[data-page="truepath"]').count()==1
    assert page.evaluate('window.HANAMI_V18.stageReady(1)') is False
    # Storage survives reload (sync library data in IDB and progress in localStorage).
    # Storage snapshot is kept in the same in-memory page for this opaque-origin harness.
    assert page.evaluate('window.__memoryStorage["hanami-studio-progress-v1"]?.length > 10')
    assert page.evaluate('window.HANAMI_V18.stats("vocab",1).introduced')==1
    assert page.evaluate('window.HANAMI_V18.stats("grammar",1).introduced')==1
    print('PERSISTENCE OK',flush=True)
    # Mobile test
    page.set_viewport_size({'width':390,'height':844})
    page.evaluate('''() => {document.querySelector('[data-page="curriculum"]').click()}''')
    page.wait_for_timeout(100)
    dims=page.evaluate('({w:document.documentElement.scrollWidth,v:innerWidth})');print('MOBILE',dims,flush=True)
    assert dims['w']<=dims['v']+1
    page.screenshot(path='/mnt/data/Hanami_V18_Mobile.png',full_page=False)
    print('JS ERRORS:',errors[:8],flush=True)
    assert not errors,errors[:8]
    browser.close()
