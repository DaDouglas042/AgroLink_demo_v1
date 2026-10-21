# db

```
migrations/
  mysql/   # DDL para Compose
  d1/      # DDL para Cloudflare D1 (SQLite)
```

Convenciones (ver ADR-002): ids de texto generados por la aplicación, fechas en formato ISO, consultas con parámetros `?`, sin funciones propias de un solo motor.

Tablas previstas: `usuarios`, `lotes`, `ofertas`, `pedidos`, `eventos_pedido`, `calificaciones`, `operaciones_procesadas` (para idempotencia de `/sync`).
