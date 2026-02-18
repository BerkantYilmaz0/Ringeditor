import re

input_file = r'c:\Users\berkant\Desktop\ring-planner\aa.sql'
output_file = r'c:\Users\berkant\Desktop\ring-planner\database\schema.sql'
seed_file = r'c:\Users\berkant\Desktop\ring-planner\database\seed.sql'

import os
os.makedirs(os.path.dirname(output_file), exist_ok=True)

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Filter out INSERT statements for schema
schema_content = re.sub(r'INSERT INTO `[^`]+`.*?;', '', content, flags=re.DOTALL)
# Remove empty lines left by removal
schema_content = re.sub(r'\n\s*\n', '\n\n', schema_content)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("-- Bu dosya sadece veritabanı şemasını içerir. Gerçek verileri içermez.\n")
    f.write(schema_content)

print(f"Created schema.sql at {output_file}")
