# ADR-003 · Modo sin señal ligero, sin CRDTs

- **Estado:** Propuesto
- **Contexto:** El reporte recomienda arquitectura offline-first con base local y sincronización por eventos, incluso CRDTs y marcas de Lamport. La conectividad rural es una barrera real, pero no tenemos medición en nuestra zona piloto.
- **Decisión:** PWA con Service Worker e IndexedDB; cada acción se guarda como operación con id único en una cola; el endpoint `/sync` es idempotente y **el servidor decide** ante conflictos, devolviendo el motivo del rechazo.
- **Por qué no CRDTs ahora:** Nuestros datos no se editan de forma concurrente por muchos actores (un lote tiene un dueño; un pedido avanza por estados). Los choques serán raros y se resuelven con reglas de negocio.
- **Cuándo reconsiderar:** Si en pruebas con usuarios los choques son frecuentes o si se necesita edición colaborativa.
- **Validación pendiente:** Preguntar en el Experimento Dos qué tan seguido falla la señal al publicar o negociar.
