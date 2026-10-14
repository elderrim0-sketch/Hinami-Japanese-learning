from pathlib import Path
import re,base64,zipfile,json
root=Path('/mnt/data/HanamiV19')
h=(root/'index.html').read_text()
scenes={p.stem:'data:image/webp;base64,'+base64.b64encode(p.read_bytes()).decode() for p in (root/'assets/scenes').glob('*.webp')}
def style(m):
 p=root/m.group(1)
 if not p.exists():raise FileNotFoundError(p)
 return '<style>\n/* '+m.group(1)+' */\n'+p.read_text()+'\n</style>'
def script(m):
 p=root/m.group(1)
 if not p.exists():raise FileNotFoundError(p)
 return '<script>\n/* '+m.group(1)+' */\n'+p.read_text().replace('</script>','<\\/script>')+'\n</script>'
h=re.sub(r'<link rel="stylesheet" href="([^"]+)">',style,h)
h=re.sub(r'<script src="([^"]+)"></script>',script,h)
h=h.replace('<title>Hanami V19 — Understanding First</title>','<title>Hanami V19 — Understanding First (Standalone)</title>')
h=h.replace('href="assets/icon.svg"','href="data:image/svg+xml;base64,'+base64.b64encode((root/'assets/icon.svg').read_bytes()).decode()+'"')
h=h.replace('<link rel="manifest" href="manifest.webmanifest">','')
scenes='<script>window.HANAMI_SCENES='+json.dumps(scenes,ensure_ascii=False,separators=(',',':'))+';</script>\n'
h=h.replace('<script>\n/* source/starter-data.js */',scenes+'<script>\n/* source/starter-data.js */',1)
out=Path('/mnt/data/Hanami_Japanese_v19_Standalone.html');out.write_text(h)
zipdest=Path('/mnt/data/Hanami_Japanese_v19_Complete_App.zip')
with zipfile.ZipFile(zipdest,'w',zipfile.ZIP_DEFLATED,compresslevel=8) as z:
 for p in root.rglob('*'):
  if p.is_file() and '__pycache__' not in p.parts and not p.name.startswith('.') and not p.suffix=='.pyc':z.write(p,p.relative_to(root))
print('STANDALONE',out, out.stat().st_size, 'ZIP',zipdest,zipdest.stat().st_size)
