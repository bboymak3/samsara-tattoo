#!/usr/bin/env python3
"""Generar sitemap.xml con todas las URLs."""
import re

REPO = '/home/z/my-project/repos/car-audio-pro'
SITE = 'https://car-audio-pro.pages.dev'
today = '2026-08-28'

services = [
    'car-audio-cableado', 'calibracion-ecualizacion', 'pantallas-radios-android',
    'camaras-retroceso', 'alarmas-gps-seguridad', 'reparacion-plantas-amplificadores',
    'cajones-acusticos', 'cableado-profesional'
]

comunas = [
    'providencia','las-condes','nunoa','vitacura','la-reina','lo-barnechea',
    'santiago-centro','recoleta','independencia','estacion-central','macul',
    'penalolen','la-florida','puente-alto','maipu','pudahuel','quilicura',
    'huechuraba','conchali','renca','cerro-navia','lo-prado','cerrillos',
    'lo-espejo','pedro-aguirre-cerda','san-miguel','san-joaquin','la-cisterna',
    'la-granja','la-pintana','san-ramon','el-bosque','san-bernardo',
    'calera-de-tango','buin','paine','colina','lampa','til-til','melipilla',
    'alhue','curacavi','maria-pinto','el-monte','padre-hurtado','penaflor',
    'isla-de-maipo','san-pedro','san-jose-de-maipo','pirque','quinta-normal'
]

urls = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>{SITE}/</loc><lastmod>{today}</lastmod><priority>1.0</priority><changefreq>weekly</changefreq></url>
'''

for s in services:
    urls += f'  <url><loc>{SITE}/services/{s}.html</loc><lastmod>{today}</lastmod><priority>0.9</priority><changefreq>monthly</changefreq></url>\n'

for c in comunas:
    urls += f'  <url><loc>{SITE}/comunas/{c}.html</loc><lastmod>{today}</lastmod><priority>0.8</priority><changefreq>weekly</changefreq></url>\n'

urls += '</urlset>'

with open(f'{REPO}/sitemap.xml', 'w') as f:
    f.write(urls)

total = 1 + len(services) + len(comunas)
print(f'sitemap.xml generado con {total} URLs')
