#!/usr/bin/env python3
"""
Fix two issues reported by user:

1. Website field with type="url" rejects valid URLs without protocol
   (e.g. www.tunegocio.com, negocio33.hxx.com).
   Solution: change type="url" to type="text" for website fields, and
   normalize the URL in JS before sending to backend (auto-prepend https://).

2. Business title with special characters (commas, accents, quotes) might
   cause issues. Solution: add a cleanTitle() helper that strips dangerous
   characters (quotes, backslashes, control chars) but PRESERVES accents
   and common punctuation for display.
   Backend already generates a clean slug, but title is stored as-is.
"""
import re
import os

os.chdir('/home/z/my-project/repos/meridaunclick')

# ============================================================
# 1. Fix website inputs: type="url" -> type="text"
# ============================================================
# Only for website fields (not video URLs which are different)
files_with_website = [
    ('new-business.html', 'input type="url" id="propWebsite"'),
    ('admin-edit-business.html', 'input type="url" class="eb-input" id="ebWebsite"'),
    ('dashboard.html', 'input type="url" id="editBizWebsite"'),
]

print('=== Fix website inputs: type="url" -> type="text" ===')
for path, search in files_with_website:
    with open(path) as f:
        content = f.read()
    if search in content:
        new_search = search.replace('type="url"', 'type="text"')
        content = content.replace(search, new_search)
        with open(path, 'w') as f:
            f.write(content)
        print(f'  {path}: OK')
    else:
        print(f'  {path}: SKIP (not found)')

# Google Maps URL — keep type="url" because it's always https://
# But let's also change it for consistency
google_maps_changes = [
    ('admin-edit-business.html',
     'input type="url" class="eb-input" id="ebGoogleMapsUrl"',
     'input type="text" class="eb-input" id="ebGoogleMapsUrl"'),
]
for path, old, new in google_maps_changes:
    with open(path) as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(path, 'w') as f:
            f.write(content)
        print(f'  {path} (google_maps): OK')

# ============================================================
# 2. Add cleanTitle() + normalizeWebsite() helpers to business-form.js
# ============================================================
print('\n=== Add helpers to business-form.js ===')

with open('js/business-form.js') as f:
    content = f.read()

# Add helper functions at the top (after the IIFE opening)
helpers = '''
// FIX: limpiar titulo de caracteres problematicos antes de enviar.
// Conserva acentos y ñ (UTF-8 valido), pero elimina caracteres que pueden
// romper JSON, SQL o el renderizado HTML (comillas, backslashes, <, >).
function cleanTitle(title) {
    if (!title) return '';
    return String(title)
        .trim()
        // Eliminar caracteres de control
        .replace(/[\\u0000-\\u001F\\u007F]/g, '')
        // Reemplazar comillas tipograficas por versiones ASCII
        .replace(/[\\u201C\\u201D\\u201E\\u201F]/g, '"')
        .replace(/[\\u2018\\u2019\\u201A\\u201B]/g, "'")
        // Eliminar backslashes (pueden romper JSON)
        .replace(/\\\\/g, '')
        // Eliminar < > (previene XSS en caso de fallo del escape)
        .replace(/[<>]/g, '')
        // Reemplazar multiples espacios por uno solo
        .replace(/\\s+/g, ' ')
        // Limitar a 150 caracteres
        .substring(0, 150);
}

// FIX: normalizar website URL antes de enviar.
// Si no tiene protocolo, agregar https://
// Acepta cualquier dominio (incluido subdominios como negocio33.hxx.com)
function normalizeWebsite(url) {
    if (!url) return '';
    url = String(url).trim();
    if (!url) return '';
    // Si ya tiene protocolo, dejar asi
    if (/^https?:\\/\\//i.test(url)) return url;
    // Si empieza con //, agregar https:
    if (url.startsWith('//')) return 'https:' + url;
    // Si no tiene protocolo, agregar https://
    return 'https://' + url;
}
'''

# Find a good insertion point: after the IIFE opening line
# Pattern: (function() { or similar at top of file
match = re.search(r'^(\(function\s*\([^)]*\)\s*\{|var\s+\w+\s*=\s*\(function\s*\([^)]*\)\s*\{)', content, re.MULTILINE)
if match:
    # Insert after the IIFE opening
    insert_pos = match.end()
    new_content = content[:insert_pos] + helpers + content[insert_pos:]
else:
    # Fallback: insert at top of file
    new_content = helpers + content

with open('js/business-form.js', 'w') as f:
    f.write(new_content)
print('  js/business-form.js: cleanTitle() + normalizeWebsite() agregadas')

# ============================================================
# 3. Use cleanTitle() and normalizeWebsite() in submit handler
# ============================================================
# Find: const title = getValue('propTitle');
# Replace with: const title = cleanTitle(getValue('propTitle'));
old_title_line = "const title = getValue('propTitle');"
new_title_line = "const title = cleanTitle(getValue('propTitle'));"
if old_title_line in new_content:
    new_content = new_content.replace(old_title_line, new_title_line)
    with open('js/business-form.js', 'w') as f:
        f.write(new_content)
    print('  js/business-form.js: title ahora usa cleanTitle()')

# Find: const website = getValue('propWebsite');
# Replace with: const website = normalizeWebsite(getValue('propWebsite'));
old_website_line = "const website = getValue('propWebsite');"
new_website_line = "const website = normalizeWebsite(getValue('propWebsite'));"
if old_website_line in new_content:
    new_content = new_content.replace(old_website_line, new_website_line)
    with open('js/business-form.js', 'w') as f:
        f.write(new_content)
    print('  js/business-form.js: website ahora usa normalizeWebsite()')

# ============================================================
# 4. Apply same fixes to dashboard.js edit modal
# ============================================================
print('\n=== Add helpers to dashboard.js ===')

with open('js/dashboard.js') as f:
    content = f.read()

# Add helpers if not present
if 'function cleanTitle(' not in content:
    helpers_dash = '''
// FIX: limpiar titulo de caracteres problematicos antes de enviar.
function cleanTitle(title) {
    if (!title) return '';
    return String(title)
        .trim()
        .replace(/[\\u0000-\\u001F\\u007F]/g, '')
        .replace(/[\\u201C\\u201D\\u201E\\u201F]/g, '"')
        .replace(/[\\u2018\\u2019\\u201A\\u201B]/g, "'")
        .replace(/\\\\/g, '')
        .replace(/[<>]/g, '')
        .replace(/\\s+/g, ' ')
        .substring(0, 150);
}

// FIX: normalizar website URL antes de enviar.
function normalizeWebsite(url) {
    if (!url) return '';
    url = String(url).trim();
    if (!url) return '';
    if (/^https?:\\/\\//i.test(url)) return url;
    if (url.startsWith('//')) return 'https:' + url;
    return 'https://' + url;
}
'''
    # Insert at top (before any other content)
    content = helpers_dash + content
    with open('js/dashboard.js', 'w') as f:
        f.write(content)
    print('  js/dashboard.js: helpers agregadas')

# Use cleanTitle in saveBusiness / submit
# Pattern: var title = document.getElementById('editBizTitle').value;
# Replace with: var title = cleanTitle(document.getElementById('editBizTitle').value);
content = content.replace(
    "var title = document.getElementById('editBizTitle').value;",
    "var title = cleanTitle(document.getElementById('editBizTitle').value);"
)
# Also for const pattern
content = content.replace(
    "const title = document.getElementById('editBizTitle').value;",
    "const title = cleanTitle(document.getElementById('editBizTitle').value);"
)

# Use normalizeWebsite
content = content.replace(
    "website: document.getElementById('editBizWebsite').value,",
    "website: normalizeWebsite(document.getElementById('editBizWebsite').value),"
)

with open('js/dashboard.js', 'w') as f:
    f.write(content)
print('  js/dashboard.js: cleanTitle + normalizeWebsite aplicados a editBiz')

# ============================================================
# 5. Apply same to admin-edit-business.html (ebSave)
# ============================================================
print('\n=== Add helpers to admin-edit-business.html ===')

with open('admin-edit-business.html') as f:
    content = f.read()

# Add helpers script tag before the main script
helpers_html = '''
<script>
// FIX: limpiar titulo y normalizar website
function cleanTitle(title) {
    if (!title) return '';
    return String(title).trim()
        .replace(/[\\u0000-\\u001F\\u007F]/g, '')
        .replace(/[\\u201C\\u201D\\u201E\\u201F]/g, '"')
        .replace(/[\\u2018\\u2019\\u201A\\u201B]/g, "'")
        .replace(/\\\\/g, '')
        .replace(/[<>]/g, '')
        .replace(/\\s+/g, ' ')
        .substring(0, 150);
}
function normalizeWebsite(url) {
    if (!url) return '';
    url = String(url).trim();
    if (!url) return '';
    if (/^https?:\\/\\//i.test(url)) return url;
    if (url.startsWith('//')) return 'https:' + url;
    return 'https://' + url;
}
</script>
'''

# Insert before the first <script> tag
script_match = re.search(r'<script[^>]*>', content)
if script_match and 'function cleanTitle' not in content:
    insert_pos = script_match.start()
    content = content[:insert_pos] + helpers_html + '\n' + content[insert_pos:]
    print('  admin-edit-business.html: helpers agregadas')

# Apply to ebSave payload
content = content.replace(
    "title: document.getElementById('ebTitle').value,",
    "title: cleanTitle(document.getElementById('ebTitle').value),"
)
content = content.replace(
    "website: document.getElementById('ebWebsite').value,",
    "website: normalizeWebsite(document.getElementById('ebWebsite').value),"
)

with open('admin-edit-business.html', 'w') as f:
    f.write(content)
print('  admin-edit-business.html: cleanTitle + normalizeWebsite aplicados a ebSave')

print('\n=== DONE ===')
