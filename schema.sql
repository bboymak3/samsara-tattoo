-- Schema SQL para Cloudflare D1
-- Tabla: cotizaciones
-- Aplicar con: wrangler d1 execute car-audio-pro --file=schema.sql

CREATE TABLE IF NOT EXISTS cotizaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  servicio TEXT NOT NULL,
  mensaje TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'nuevo'
);

CREATE INDEX IF NOT EXISTS idx_cotizaciones_status ON cotizaciones(status);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_created_at ON cotizaciones(created_at);
