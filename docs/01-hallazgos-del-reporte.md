# 01 · Hallazgos del reporte "Análisis de AgroOferta y alternativas"

Fuente: reporte de 17 páginas entregado por el equipo (59 referencias). Aquí se resume qué dice, qué tan sólido es y cómo cambia el plan.

## Lo que dice (resumen)

1. **AgroOferta** (SADER/SIAP) nació gratuita, sin volúmenes mínimos, con geolocalización y comparación de precios. Reportó ~49 mil productores y ~12,800 descargas. El reporte la califica de "abandonware".
2. **Por qué falló (según el reporte):** (a) "Falacia del directorio telefónico": solo conectaba, sin pago seguro, garantía, disputas ni logística; (b) el coyote funciona como banco informal: adelanta insumos/efectivo a cambio de la cosecha; (c) conectividad rural pobre y diseño que depende de internet.
3. **Por qué persiste el coyote:** logística propia (compra "a pie de parcela"), liquidez inmediata y acceso a almacenamiento/financiamiento. Una plataforma que quiera sustituirlo debe absorber esas funciones.
4. **Alternativas privadas:** Smattcom (escrow llamado "Transacción Protegida", analítica de precios, membresías + comisión) y ProducePay (pago rápido del ~96% en 24 h, financiamiento pre-cosecha, enfocado en exportación).
5. **Arquitectura recomendada:** offline-first (PWA + base local + sincronización por eventos; menciona SQLite sobre OPFS, IndexedDB, CRDTs, vectores de versión, marcas de Lamport).
6. **Negocio:** freemium + comisión sobre operaciones liquidadas + suscripción premium para compradores; piloto hiperlocal en Jalisco; alianzas con SADER Jalisco, Agroemprende (UdeG), Jalisco Agroempresarial, aceleradoras.
7. **Frontera:** trazabilidad con blockchain, big data/IA para predicción.

## Qué tan firme es cada cosa

| Afirmación | Solidez | Nota |
|---|---|---|
| Escrow/garantía resuelve el problema de confianza | Media-alta | Coincide con nuestras entrevistas (pago garantizado al entregar) y con lo que hace Smattcom |
| El coyote es también financiador | Media | Plausible y con fuentes periodísticas; **no lo preguntamos en el Experimento Cero** → hipótesis nueva |
| Offline-first es necesario | Media | La conectividad rural es real, pero el reporte no la mide en nuestra zona. Validar con los usuarios |
| AgroOferta es "abandonware" | **Baja** | Se infiere de que SADER redirigió presupuesto a transferencias directas; el reporte no muestra una prueba de que la plataforma no funcione. Nuestra revisión previa halló un salto de 1,835 usuarios (ene 2023) a 46,167 (nov 2023) en comunicados del IFT, sin evidencia de ventas cerradas. Decirlo como "no encontramos evidencia de transacciones", no como "está muerta" |
| Cifras de Smattcom (150 mil usuarios, etc.) | Baja | Vienen del blog de la propia empresa |
| Varias referencias | Baja | Scribd, YouTube, blogs y un documento sobre derecho informático citado como respaldo de afirmaciones técnicas. Para entregables, citar las fuentes primarias (SADER, SIAP, IFT, INEGI, FIRA) |

Dos temas con riesgo de pasar desapercibidos: el reporte propone custodiar fondos de terceros, y en México eso puede requerir autorización regulatoria (**Por investigar**, ley Fintech). Por eso el MVP usa garantía **simulada** y la presenta como tal.

## Qué adoptamos, qué dejamos y por qué

| Idea del reporte | Decisión | Cómo entra al MVP |
|---|---|---|
| Garantía/escrow | **Adoptar (simulada)** | `SimuladorDeGarantia`: estados Pactado → PagoRetenido → … → Pagado |
| Pago rápido tipo Quick-Pay | Adoptar como demostración | Botón "Liberar pago" inmediato tras confirmar peso; sin dinero real |
| Coyote como financiador | **Probar primero** | Preguntas nuevas en Experimento Dos; en el MVP, un campo "¿tienes adelanto con un intermediario?" en el comparador |
| Offline-first | **Adoptar versión ligera** | PWA + IndexedDB + cola de acciones pendientes; el servidor decide (ver ADR-003) |
| CRDTs / Lamport / OPFS | Dejar para después | Complejidad desproporcionada para un MVP universitario |
| Analítica de precios/IA | Reducir | Historial de precios simple y alertas por regla ("precio > X") con datos propios; IA queda en `06-decisiones-abiertas.md` |
| KYC de compradores | Versión mínima | Verificación manual (RFC y teléfono) hecha por el admin del demo |
| Freemium + comisión | Adoptar en el modelo de negocio | Comisión simulada visible en el comparador de margen |
| Piloto hiperlocal en Jalisco | Adoptar | Datos de demostración de una zona; alianzas son tema del pitch, no del código |
| Blockchain/trazabilidad | Dejar | Fuera de alcance |
| Marketplace de fletes, factoraje | Dejar | Fuera de alcance; mencionar en hoja de ruta |

## Hipótesis nuevas para el Experimento Dos

1. ¿Cuántos productores reciben adelanto o crédito del comprador y qué pasa si se lo pagan de otra forma?
2. ¿Qué tan seguido les falla la señal justo al momento de negociar o publicar?
3. ¿Aceptarían una comisión? ¿De qué tamaño frente al descuento que hoy les aplica el coyote?
4. ¿Qué pasaría con la factura? (una entrevista la mencionó como puerta cerrada)
5. Del lado comprador: ¿qué los haría dejar su proveedor actual? (hoy es la parte con menos evidencia)
