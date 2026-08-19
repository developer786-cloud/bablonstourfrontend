from bs4 import BeautifulSoup

from pathlib import Path

path = Path("index.html")

html = path.read_text(encoding="utf-8")

soup = BeautifulSoup(html, "html.parser")

tag = soup.find("meta", attrs={"name":"keywords"})

if tag:

    tag["content"] = "international tour packages from India, travel agency in Delhi..."

    path.write_text(str(soup), encoding="utf-8")

else:

    print("Meta keywords tag not found")