# 02 · Funcionalidades del MVP

Prioridad MoSCoW. **Must** = sin esto no hay demo. Todo es **Propuesto** salvo lo marcado.

## Must (flujo completo de punta a punta)

| # | Funcionalidad | Qué prueba o cubre |
|---|---|---|
| M1 | Registro/entrada como productor o comprador (correo + contraseña o código; sin verificación real) | Acceso simple |
| M2 | Publicar lote (producto, cantidad, calidad, ubicación aproximada, fecha disponible, precio mínimo) | Hipótesis 1 |
| M3 | Ver lotes y hacer oferta (precio, cantidad) | Mercado |
| M4 | Aceptar oferta → crear pedido | Pedido |
| M5 | Pedido con estados y garantía simulada (ver máquina abajo) | Confianza |
| M6 | Confirmación de peso por ambas partes (si difieren más de un umbral → EnDisputa) | Dolor "pierdo visibilidad en la báscula" |
| M7 | Calificación mutua al cerrar | Reputación |
| M8 | Comparador de margen: lo que recibiría con AgroLink vs. precio de venta al coyote, con comisión simulada | Hipótesis 3 |
| M9 | Enlace `wa.me` con mensaje prellenado para contactar a la contraparte | Canal que ya usan |
| M10 | Modo sin señal ligero: instalar como PWA, ver lo ya cargado y encolar acciones (publicar lote, ofertar, confirmar peso) para enviarlas al volver la señal | Lección del reporte |

## Should

| # | Funcionalidad |
|---|---|
| S1 | Alerta simple por regla ("avísame si alguien ofrece más de $X/kg") |
| S2 | Historial de precios con datos de la propia plataforma (y, si se logra, precios de mercado públicos: **Por investigar** si hay una fuente abierta utilizable) |
| S3 | Pedido colectivo: varios productores completan una cantidad que pide el comprador |
| S4 | Fotos del lote (R2 en la nube; en Compose, volumen local) |

## Could

| # | Funcionalidad |
|---|---|
| C1 | Campo "adelanto con intermediario" y su efecto en el comparador |
| C2 | Panel de administrador (verificar compradores, resolver disputas) |
| C3 | Datos semilla realistas para la demo |

## Won't (por ahora)

Pagos reales · custodia real de fondos · factoraje/financiamiento real · fletes · IA predictiva · blockchain · app nativa · CRDTs · Kubernetes.

## Máquina de estados del pedido

Ver diagrama en `03-arquitectura.md`. Reglas:

- **Pactado** → comprador "deposita" (simulado) → **PagoRetenido**.
- **PagoRetenido** → productor marca carga → **Cargado**.
- **Cargado** → ambos registran peso; coinciden (dentro del umbral) → **Pesado**; no coinciden → **EnDisputa**.
- **Pesado** → liberación de pago (simulada) → **Pagado** → calificaciones → **Calificado**.
- **Cancelado** solo antes de Cargado. **EnDisputa** la resuelve el admin en el MVP.

Cada transición se guarda como evento con fecha, actor y datos (sirve para auditoría, para la sincronización sin señal y para las pruebas unitarias).

## Modo sin señal (versión ligera)

1. La PWA guarda en el dispositivo (IndexedDB) lo último que vio el usuario.
2. Cada acción del usuario se guarda como operación en una **cola local** con un identificador único (idempotencia).
3. Al volver la señal, la PWA envía la cola al endpoint de sincronización y recibe los cambios del servidor desde la última marca.
4. **El servidor decide** en caso de choque (ej.: se agotó el lote): la operación se rechaza con motivo y la PWA se lo muestra al usuario.

Esto cubre el 90% del valor sin CRDTs. Si en pruebas con usuarios aparecen choques frecuentes, se evalúa el siguiente nivel (ver `06-decisiones-abiertas.md`).
