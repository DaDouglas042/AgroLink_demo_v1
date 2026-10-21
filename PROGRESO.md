# Progreso Iterativo - AgroLink_demo_v1

> Bitácora de avances, decisiones y bloqueos. Se actualiza en cada sesión de trabajo.

---

## Estado actual (21 oct 2026)

**Fase:** H0 - Base (repo, ramas, Project Board, plantilla PR, README)
**Próximo hito:** H1 - Esqueleto que corre (`docker compose up` levanta web + api + db)

---

## Bitácora

| Fecha | Hito | Avance | Decisiones / Bloqueos | Próximo paso |
|-------|------|--------|----------------------|--------------|
| 21 oct | H0 | Estructura copiada desde planeación | Crear repo público, proteger ramas, Project Board | H1: Dockerfiles + compose |

---

## Checklist de hitos (de `docs/05-plan-de-trabajo.md`)

### H0 · Base
- [ ] Crear repo público en GitHub
- [ ] Proteger ramas `main` y `develop`
- [ ] Crear Project Board con columnas: Backlog · Listo · En curso · En revisión · Hecho
- [ ] Agregar plantilla de PR (`.github/PULL_REQUEST_TEMPLATE.md` ya existe)
- [ ] Publicar README y subir docs a la Wiki

### H1 · Esqueleto que corre
- [ ] `Dockerfile.api`
- [ ] `Dockerfile.web` (nginx)
- [ ] `docker-compose.yml` con web, api, db y volumen
- [ ] Endpoint `/api/salud`
- [ ] Script de migraciones al arrancar

### H2 · Flujo mínimo
- [ ] Migración: usuarios, lotes, ofertas, pedidos, eventos
- [ ] API: registro y entrada
- [ ] API: lotes (crear, listar)
- [ ] API: ofertas (crear, aceptar)
- [ ] Pruebas unitarias de reglas de oferta
- [ ] Pantallas mínimas: lista de lotes, publicar lote

### H3 · Pedido completo
- [ ] Máquina de estados del pedido + pruebas
- [ ] `SimuladorDeGarantia` + pruebas
- [ ] Confirmación de peso y disputa + pruebas
- [ ] Calificaciones
- [ ] `CalculadoraDeMargen` + pantalla de comparador
- [ ] Enlaces `wa.me`

### H4 · Pipeline
- [ ] Workflow: lint + pruebas + build en PR
- [ ] Workflow: UAT con Compose y pruebas de humo
- [ ] Workflow: push a Docker Hub (secretos con token de escritura)

### H5 · Nube
- [ ] Adaptador de repositorio para D1
- [ ] Migraciones D1
- [ ] `wrangler.toml` y despliegue desde Actions
- [ ] Revisar consumo de CPU (límite 10 ms/solicitud)

### H6 · Sin señal
- [ ] Manifiesto y Service Worker
- [ ] IndexedDB y cola de operaciones
- [ ] Endpoint `/sync` idempotente
- [ ] Prueba manual en modo avión

### H7 · Pulido y demo
- [ ] Datos semilla
- [ ] Guion de demo (3–5 min)
- [ ] PDF y MD de la propuesta

---

## Decisiones pendientes (de `docs/06-decisiones-abiertas.md`)

| ID | Pregunta | Estado | Nota |
|----|----------|--------|------|
| A1 | Cultivo y región del piloto | Abierto | Revisar entrevistas Experimento Cero |
| A2 | React o Vue | Abierto | Lo que domine el equipo |
| A3 | MySQL + D1 o SQLite en ambos | Abierto | Preguntar al profesor |
| A4 | Reparto de áreas | Abierto | Reunión de equipo |
| A5 | Dónde corre Compose en demo | Abierto | Laptop + pipeline como evidencia |

---

## Próximas acciones inmediatas

1. **Inicializar git** en esta carpeta y hacer primer commit
2. **Crear repo en GitHub** y subir
3. **Crear Dockerfiles** básicos (api con Node/Hono, web con nginx)
4. **Crear docker-compose.yml** con 3 servicios
5. **Endpoint `/api/salud`** que devuelva `{ ok: true }`