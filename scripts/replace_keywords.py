from pathlib import Path
import re
path = Path(r'c:\Users\Hello\Desktop\Bablons Travel\client-public\index.html')
text = path.read_text(encoding='utf-8')
pattern = re.compile(r'<meta name="keywords"\s*content="[^"]*"\s*/>', re.DOTALL)
replacement = '<meta name="keywords" content="international tour packages from India, travel agency in Delhi, family holiday packages, honeymoon tour packages, visa assistance services" />'
new_text, count = pattern.subn(replacement, text)
print('replaced', count)
if count == 1:
    path.write_text(new_text, encoding='utf-8')
else:
    raise SystemExit('failed to replace keywords tag')
