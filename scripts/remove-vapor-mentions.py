#!/usr/bin/env python3
"""
Quitar todas las menciones de 'pistola de vapor' / 'a vapor' / 'tecnologia a vapor'
del archivo src/app/page.tsx, enfocando en trabajo manual.

Reglas:
- 'aspiradora a vapor' -> 'aspiradora profesional'
- 'tecnología a vapor' -> 'técnicas manuales profesionales'
- 'sistema de vapor' -> 'sistema manual de inyección y extracción'
- 'vapor de alta temperatura' -> 'productos profesionales y técnicas manuales'
- 'a vapor' (suelto) -> 'profesional'
- 'limpieza a vapor' -> 'limpieza profunda manual'
- 'desinfección a vapor' -> 'desinfección profunda'
- 'sistema a vapor' -> 'sistema manual'
- 'con vapor' -> 'profesionalmente'
- 'vapor que' -> 'sistema que'
- 'tecnología de vapor' -> 'técnicas profesionales'

Tambien agrega nuevos servicios para obras, escuelas (especificos):
"""
import re

FILE = '/home/z/my-project/repos/moclean/src/app/page.tsx'
with open(FILE, encoding='utf-8') as f:
    content = f.read()

# Reemplazos (de mas especifico a mas general)
replacements = [
    # Muy especificos primero
    ('aspiradora a vapor que inyectan vapor de alta temperatura en las fibras y superficies. El vapor disuelve la suciedad, elimina bacterias, ácaros y germenes, y luego se extrae con succión potente. Es un método ecológico que no requiere productos químicos agresivos.',
     'aspiradora profesional que combinamos con técnicas manuales para tratar fibras y superficies en profundidad. Aplicamos productos ecológicos, dejamos actuar y luego extraemos la suciedad con succión potente. Es un método ecológico que no requiere químicos agresivos.'),

    # Otros especificos
    ('aspiradora a vapor para eliminar el 99% de bacterias y ácaros, dejando cada rincón impecable sin usar productos químicos agresivos.',
     'aspiración profesional y trabajo manual para eliminar el 99% de bacterias y ácaros, dejando cada rincón impecable sin usar productos químicos agresivos.'),

    ('Aspirado profundo con tecnología a vapor',
     'Aspirado profundo con técnicas manuales profesionales'),

    ('Tecnología de inyección y extracción a vapor',
     'Sistema manual de inyección y extracción profesional'),

    ('sistema de inyección y extracción a vapor',
     'sistema manual de inyección y extracción profesional'),

    ('sistema de limpieza a vapor penetra profundamente en las fibras, eliminando manchas, ácaros, bacterias y olores sin mojar ni dañar los tejidos.',
     'sistema manual de limpieza penetra profundamente en las fibras, eliminando manchas, ácaros, bacterias y olores sin mojar ni dañar los tejidos.'),

    ('tecnología a vapor que elimina manchas, olores, bacterias y ácaros sin dañar los materiales del auto.',
     'técnicas manuales que eliminan manchas, olores, bacterias y ácaros sin dañar los materiales del auto.'),

    ('Desinfección profunda de colchones con tecnología a vapor.',
     'Desinfección profunda de colchones con técnicas manuales profesionales.'),

    ('Desodorización natural con vapor',
     'Desodorización natural con productos ecológicos'),

    ('sistema a vapor elimina polvo, alérgenos, manchas y olores incrustados',
     'sistema manual elimina polvo, alérgenos, manchas y olores incrustados'),

    ('Desinfección hospitalaria con tecnología a vapor',
     'Desinfección hospitalaria con técnicas profesionales'),

    ('Inyección y extracción profesional de vapor',
     'Inyección y extracción profesional manual'),

    # Generales
    ('aspiradora a vapor', 'aspiración profesional manual'),
    ('tecnología a vapor', 'técnicas manuales profesionales'),
    ('sistema de vapor', 'sistema manual profesional'),
    ('a vapor', 'profesional'),
    (' con vapor', ' profesionalmente'),
    ('limpieza a vapor', 'limpieza profunda manual'),
    ('desinfección a vapor', 'desinfección profunda'),
    ('limpieza de vapor', 'limpieza profunda'),
    ('de vapor', 'manual'),
]

total = 0
for old, new in replacements:
    count = content.count(old)
    if count > 0:
        content = content.replace(old, new)
        total += count
        print(f'  Replaced {count}x: "{old[:50]}..."')

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'\nTotal cambios: {total}')

# Verificar que no queden menciones problematicas
remaining = re.findall(r'(?i)\bvapor\b', content)
print(f'\nMenciones de "vapor" restantes: {len(remaining)}')
if remaining:
    # Mostrar contexto
    for m in re.finditer(r'(?i)\bvapor\b', content):
        start = max(0, m.start() - 30)
        end = min(len(content), m.end() + 30)
        ctx = content[start:end].replace('\n', ' ')
        print(f'  ...{ctx}...')
