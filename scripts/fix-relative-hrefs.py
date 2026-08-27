#!/usr/bin/env python3
"""
Fix relative href to absolute href in JS files.

When the SPA is loaded under a subpath like /servicios-profesionales/publicidad/some-biz,
relative links like href="admin.html" resolve to /servicios-profesionales/publicidad/admin.html
instead of /admin.html.

This script finds all href="xxx.html" patterns in JS files and replaces them with href="/xxx.html"
(also href='xxx.html' single-quote variant).

Only matches simple filenames (no path separators), preserving query strings.
"""
import re
import os
import sys

# Files to process
JS_FILES = [
    'js/app.js',
    'js/business-detail.js',
    'js/business-form.js',
    'js/dashboard.js',
    'js/admin.js',
    'js/map.js',
    'js/seller.js',
    'js/property-detail.js',
    'js/property-form.js',
]

# Pattern: href="(name).html" or href='(name).html'  where name has no slashes
# Capture the quote type and filename, preserve any querystring after .html
PATTERN = re.compile(r'''href=(["'])([a-zA-Z][a-zA-Z0-9_-]*\.html)([^"']*)\1''')

def replacer(m):
    quote = m.group(1)
    filename = m.group(2)
    rest = m.group(3)  # querystring like ?id=123
    return f'href={quote}/{filename}{rest}{quote}'

os.chdir('/home/z/my-project/repos/meridaunclick')

total_replaced = 0
for path in JS_FILES:
    if not os.path.exists(path):
        print(f'  SKIP (not found): {path}')
        continue
    with open(path) as f:
        content = f.read()
    new_content, n = PATTERN.subn(replacer, content)
    if n > 0:
        with open(path, 'w') as f:
            f.write(new_content)
        print(f'  {path}: {n} replacements')
        total_replaced += n
    else:
        print(f'  {path}: no changes')

print(f'\nTotal: {total_replaced} replacements across {len(JS_FILES)} files')
