from pathlib import Path
import re,base64,zipfile,datetime,json
root=Path('/mnt/data/HanamiV17')
h=(root/'index.html').read_text()
scenes={p.stem:'data:image/webp;base64,'+base64.b64encode(p.read_bytes()).decode() for p in (root/'assets/scenes').glob('*.webp')}
# Embed assets and keep the script dependency order.
def style(m):
 filename=m.group(1)
 path=root/filename
 if not path.exists():raise FileNotFoundError(path)
 return '<style>\n/* '+filename+' */\n'+path.read_text()+'\n</style>'

def script(m):
 filename=m.group(1)
 path=root/filename
 if not path.exists():raise FileNotFoundError(path)
 return '<script>\n/* '+filename+' */\n'+path.read_text().replace('</script>','<\\/script>')+'\n</script>'
h=re.sub(r'<link rel="stylesheet" href="([^"]+)">',style,h)
h=re.sub(r'<script src="([^"]+)"></script>',script,h)
h=h.replace('<title>Hanami V17 — Cinematic Listening</title>', '<title>Hanami V17 — Cinematic Listening (Standalone)</title>')
icon=root/'assets/icon.svg'
h=h.replace('href="assets/icon.svg"','href="data:image/svg+xml;base64,'+base64.b64encode(icon.read_bytes()).decode()+'"')
h=h.replace('<link rel="manifest" href="manifest.webmanifest">','')
# Expose embedded art for prior versions' sprite engine.
scenejs='<script>window.HANAMI_SCENES='+json.dumps(scenes,ensure_ascii=False,separators=(',',':'))+';</script>\n'
h=h.replace('<script>\n/* source/starter-data.js */',scenejs+'<script>\n/* source/starter-data.js */',1)
out=Path('/mnt/data/Hanami_Japanese_v17_Standalone.html');out.write_text(h)
zipdest=Path('/mnt/data/Hanami_Japanese_v17_Complete_App.zip')
with zipfile.ZipFile(zipdest,'w',zipfile.ZIP_DEFLATED,compresslevel=8) as z:
 for p in root.rglob('*'):
  if p.is_file() and not p.name.startswith('.') and '__pycache__' not in p.parts:
   z.write(p,p.relative_to(root))
print('STANDALONE',out, out.stat().st_size)
print('ZIP',zipdest,zipdest.stat().st_size)
print('Inline scripts',h.count('<script>'),'styles',h.count('<style>'),'scene images',h.count('data:image/webp;base64'))
