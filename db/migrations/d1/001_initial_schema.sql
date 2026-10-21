-- Migración inicial: esquema base para AgroLink (Cloudflare D1 / SQLite)
-- Compatible con SQLite (D1)

CREATE TABLE IF NOT EXISTS usuarios (
  id TEXT NOT NULL PRIMARY KEY,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE,
  telefono TEXT NOT NULL,
  rol TEXT NOT NULL CHECK (rol IN ('productor','comprador')),
  ubicacion TEXT,
  razon_social TEXT,
  verificado INTEGER NOT NULL DEFAULT 0,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lotes (
  id TEXT NOT NULL PRIMARY KEY,
  productor_id TEXT NOT NULL,
  producto TEXT NOT NULL,
  cantidad_kg REAL NOT NULL,
  calidad TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  disponible_desde TEXT NOT NULL,
  precio_minimo REAL NOT NULL,
  estado TEXT NOT NULL DEFAULT 'disponible' CHECK (estado IN ('disponible','pactado','cerrado','cancelado')),
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (productor_id) REFERENCES usuarios(id)
);

CREATE INDEX IF NOT EXISTS idx_lotes_productor ON lotes(productor_id);
CREATE INDEX IF NOT EXISTS idx_lotes_estado ON lotes(estado);
CREATE INDEX IF NOT EXISTS idx_lotes_producto ON lotes(producto);

CREATE TABLE IF NOT EXISTS ofertas (
  id TEXT NOT NULL PRIMARY KEY,
  lote_id TEXT NOT NULL,
  comprador_id TEXT NOT NULL,
  precio_kg REAL NOT NULL,
  cantidad_kg REAL NOT NULL,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aceptada','rechazada','expirada')),
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (lote_id) REFERENCES lotes(id),
  FOREIGN KEY (comprador_id) REFERENCES usuarios(id)
);

CREATE INDEX IF NOT EXISTS idx_ofertas_lote ON ofertas(lote_id);
CREATE INDEX IF NOT EXISTS idx_ofertas_comprador ON ofertas(comprador_id);
CREATE INDEX IF NOT EXISTS idx_ofertas_estado ON ofertas(estado);

CREATE TABLE IF NOT EXISTS pedidos (
  id TEXT NOT NULL PRIMARY KEY,
  oferta_id TEXT NOT NULL UNIQUE,
  lote_id TEXT NOT NULL,
  productor_id TEXT NOT NULL,
  comprador_id TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'Pactado' CHECK (estado IN ('Pactado','PagoRetenido','Cargado','Pesado','Pagado','Calificado','EnDisputa','Cancelado')),
  peso_productor_kg REAL,
  peso_comprador_kg REAL,
  umbral_disputa_pct REAL NOT NULL DEFAULT 2.0,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (oferta_id) REFERENCES ofertas(id),
  FOREIGN KEY (lote_id) REFERENCES lotes(id),
  FOREIGN KEY (productor_id) REFERENCES usuarios(id),
  FOREIGN KEY (comprador_id) REFERENCES usuarios(id)
);

CREATE INDEX IF NOT EXISTS idx_pedidos_lote ON pedidos(lote_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_productor ON pedidos(productor_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_comprador ON pedidos(comprador_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);

CREATE TABLE IF NOT EXISTS eventos_pedido (
  id TEXT NOT NULL PRIMARY KEY,
  pedido_id TEXT NOT NULL,
  tipo TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  datos_json TEXT,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE INDEX IF NOT EXISTS idx_eventos_pedido ON eventos_pedido(pedido_id, creado_en);

CREATE TABLE IF NOT EXISTS calificaciones (
  id TEXT NOT NULL PRIMARY KEY,
  pedido_id TEXT NOT NULL,
  autor_id TEXT NOT NULL,
  destinatario_id TEXT NOT NULL,
  puntaje INTEGER NOT NULL CHECK (puntaje BETWEEN 1 AND 5),
  comentario TEXT,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (pedido_id, autor_id),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (autor_id) REFERENCES usuarios(id),
  FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);

CREATE INDEX IF NOT EXISTS idx_calificaciones_destinatario ON calificaciones(destinatario_id);

CREATE TABLE IF NOT EXISTS operaciones_procesadas (
  id_operacion TEXT NOT NULL PRIMARY KEY,
  tipo TEXT NOT NULL,
  procesado_en TEXT NOT NULL DEFAULT (datetime('now'))
);