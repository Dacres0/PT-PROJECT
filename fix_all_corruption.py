#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import codecs

print("Reading file...")
with codecs.open('pages/booking.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Count total corruptions
total = 0

# Fix all possible corruption patterns
patterns = [
    # Pound symbol corruptions (multiple levels)
    ('Ãƒâ€šÃ‚Â£', '£'),
    ('Ã‚Â£', '£'),
    ('Â£', '£'),
    
    # Gear emoji corruptions
    ('Ã¢Å¡â„¢Ã¯Â¸Â', '⚙️'),
    ('âš™ï¸', '⚙️'),
    
    # Lock emoji corruptions (multiple levels)
    ('ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â', '🔒'),
    ('Ã°Å¸â€Â', '🔒'),
    ('ðŸ"', '🔒'),
    
    # Lock with key emoji
    ('Ã°Å¸â€œÂ§', '🔐'),
    
    # Checkmark corruptions (multiple levels)
    ('ÃƒÂ¢Ã…"Ã¢â‚¬Å"', '✓'),
    ('Ã¢Å"â€œ', '✓'),
    ('ÃƒÂ¢Ã…"Ã¢â‚¬Â¦', '✅'),
    ('Ã¢Å"â€¦', '✅'),
    
    # Any other common UTF-8 corruptions
    ('â€™', "'"),
    ('â€œ', '"'),
    ('â€', '"'),
]

print("\nFixing corruptions:")
for old, new in patterns:
    if old in content:
        count = content.count(old)
        content = content.replace(old, new)
        print(f"  ✓ {new} - fixed {count} occurrence(s)")
        total += count

# Write back as clean UTF-8 without BOM
print("\nWriting clean file...")
with codecs.open('pages/booking.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✓ Successfully fixed {total} total corruptions!")
print("✓ File saved as UTF-8 without BOM")
