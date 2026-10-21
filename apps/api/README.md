# apps/api

API en Hono (TypeScript recomendado). Corre en Node (Compose) y en Workers (Cloudflare).

Estructura propuesta cuando se empiece a escribir código:

```
src/
  routes/        # lotes, ofertas, pedidos, sync, salud
  domain/        # reglas puras: estados del pedido, margen, garantía simulada (aquí van las pruebas unitarias)
  repos/         # interfaces + adaptadores mysql/ y d1/
  index.node.ts  # arranque en Node
  index.worker.ts# arranque en Workers
test/
```

Regla: `domain/` no importa nada de HTTP ni de base de datos, para probarlo sin infraestructura.
