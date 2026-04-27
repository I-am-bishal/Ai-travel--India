import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract inline styles
styles = set(re.findall(r'style="([^"]*)"', html))
style_map = {}
css_content = "\n/* Extracted Inline Styles */\n"
for i, s in enumerate(styles):
    cls_name = f"util-style-{i+1}"
    style_map[s] = cls_name
    css_content += f".{cls_name} {{\n  {s.strip()}{';' if not s.strip().endswith(';') else ''}\n}}\n"

# Replace styles in html
for s, cls_name in style_map.items():
    # If the tag already has a class attribute
    html = re.sub(r'(class="[^"]*)(".*?style="' + re.escape(s) + r'")', r'\1 ' + cls_name + r'\2', html)
    # If it doesn't have a class attribute (might be tricky with regex, simpler way: replace style="s" with class="cls_name" if no class)
    # Actually, let's just do a string replace, but we must combine classes if they exist.
    # It's safer to just replace style="s" with class="cls_name" and then we might have two class="" attributes.
    # Browsers only read the first class attribute. We must merge them.
    
def replacer_style(match):
    tag = match.group(0)
    s = match.group(1)
    cls_name = style_map[s]
    # Remove style
    tag = tag.replace(f'style="{s}"', '')
    if 'class="' in tag:
        tag = tag.replace('class="', f'class="{cls_name} ', 1)
    else:
        tag = tag.replace('<', f'< ', 1).replace(' ', f' class="{cls_name}" ', 1).replace('  ', ' ')
    return tag

html = re.sub(r'<[^>]+style="([^"]*)"[^>]*>', replacer_style, html)

# 2. Extract inline events
events = re.findall(r'(on([a-z]+)="([^"]*)")', html)
# This gives tuples of (full_match, event_type, js_code)
# We need to replace them. Let's do it tag by tag.

js_content = "\n// Extracted Inline Events\ndocument.addEventListener('DOMContentLoaded', () => {\n"

event_counter = 1
def replacer_event(match):
    global event_counter
    global js_content
    tag = match.group(0)
    
    # Find all events in this tag
    tag_events = re.findall(r'on([a-z]+)="([^"]*)"', tag)
    if not tag_events:
        return tag
        
    # Check if tag has an id
    id_match = re.search(r'id="([^"]*)"', tag)
    if id_match:
        tag_id = id_match.group(1)
    else:
        tag_id = f"event-hook-{event_counter}"
        event_counter += 1
        # Insert id into tag
        tag = tag.replace('<', f'<', 1).replace(' ', f' id="{tag_id}" ', 1).replace('  ', ' ')
        
    for ev_type, ev_code in tag_events:
        tag = tag.replace(f'on{ev_type}="{ev_code}"', '')
        
        # fix 'this' and 'event'
        ev_code = ev_code.replace('this', f'document.getElementById("{tag_id}")')
        js_content += f"  const el_{tag_id.replace('-', '_')}_{ev_type} = document.getElementById('{tag_id}');\n"
        js_content += f"  if(el_{tag_id.replace('-', '_')}_{ev_type}) {{\n"
        js_content += f"    el_{tag_id.replace('-', '_')}_{ev_type}.addEventListener('{ev_type}', function(event) {{\n      {ev_code};\n    }});\n  }}\n"

    return tag

html = re.sub(r'<[^>]+on[a-z]+="[^"]*"[^>]*>', replacer_event, html)

js_content += "});\n"

# 3. Clean up any double spaces or broken formatting caused by replacements
# html = re.sub(r'\s+', ' ', html).replace(' >', '>').replace('< ', '<')
# Wait, replacing \s+ with ' ' will break HTML formatting (newlines). We shouldn't do that.
# Let's revert the \s+ replacement to preserve lines, we'll just clean double spaces inside tags.
html = html.replace(' >', '>').replace('< ', '<')

with open('css/base/global.css', 'a', encoding='utf-8') as f:
    f.write(css_content)
    
with open('js/core/inline-events.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
    
# Add inline-events.js to html before closing body
html = html.replace('</body>', '  <script src="js/core/inline-events.js"></script>\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    
print("Extraction complete.")
