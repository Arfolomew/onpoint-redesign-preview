#!/bin/bash
# Rebuilds blog.html with current posts data embedded
PROJ="/home/jake/Desktop/Projects/OnPoint"

python3 << 'PYEOF'
import re

proj = "/home/jake/Desktop/Projects/OnPoint"
posts = open(f"{proj}/content/blog/posts.json").read().strip()
html = open(f"{proj}/blog.html").read()

# Remove old injection
html = re.sub(r'<!-- POSTS_DATA_START -->.*?<!-- POSTS_DATA_END -->\n\s*', '', html, flags=re.DOTALL)

# Inject before marker
injection = '<!-- POSTS_DATA_START -->\n    <script>window.__POSTS__ = ' + posts + ';</script>\n    <!-- POSTS_DATA_END -->\n    '
html = html.replace('<!-- POSTS_DATA injected by build script -->', injection + '<!-- POSTS_DATA injected by build script -->')

open(f"{proj}/blog.html", 'w').write(html)
print("Rebuilt blog.html")
PYEOF
