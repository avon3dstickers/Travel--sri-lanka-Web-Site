import json
import re

with open("travel-tips.html", "r", encoding="utf-8") as f:
    html = f.read()

tips = []
pattern = re.compile(r'<div class="tip-card" data-cat="(.*?)" data-keywords="(.*?)">[\s\S]*?<i data-lucide="(.*?)"[\s\S]*?<div class="tip-title">(.*?)</div><div class="tip-desc">(.*?)</div>')

for i, match in enumerate(pattern.finditer(html)):
    tips.append({
        "id": i + 1,
        "category": match.group(1),
        "keywords": match.group(2),
        "icon": match.group(3),
        "title": match.group(4),
        "desc": match.group(5)
    })

with open("tips_data.json", "w", encoding="utf-8") as f:
    json.dump(tips, f, indent=2)

print(f"Extracted {len(tips)} tips.")
