# Progreso Iterativo - AgroLink_demo_v1

> Bitácora de avances, decisiones y bloqueos. Se actualiza en cada sesión de trabajo.

---

## Estado actual (23 nov 2026)

**Fase:** H1 listo localmente · H4 (pipeline) en curso · frontend demo en v0.2.0
**Próximo hito:** Crear repo en GitHub + secrets para correr el CI real (H0/H4)

---

## Bitácora

| Fecha | Hito | Avance | Decisiones / Bloqueos | Próximo paso |
|-------|------|--------|----------------------|--------------|
| 21 oct | H0 | Estructura copiada desde planeación | Crear repo público, proteger ramas, Project Board | H1: Dockerfiles + compose |
| 23 nov | H1/H4 | Dockerfiles, compose, `/api/salud`, migraciones SQL (mysql+d1), CI local en verde (lint+typecheck+tests+build), frontend v0.2.0 | Commit `817883e`; sin remoto/`gh` → CI real pendiente; Docker Desktop off | Repo GitHub + secrets + evidencias de CI |

---

## Checklist de hitos (de `docs/05-plan-de-trabajo.md`)

### H0 · Base
- [ ] Crear repo público en GitHub
- [ ] Proteger ramas `main` y `develop`
- [ ] Crear Project Board con columnas: Backlog · Listo · En curso · En revisión · Hecho
- [ ] Agregar plantilla de PR (`.github/PULL_REQUEST_TEMPLATE.md` ya existe)
- [ ] Publicar README y subir docs a la Wiki

### H1 · Esqueleto que corre
- [x] `Dockerfile.api`
- [x] `Dockerfile.web` (nginx)
- [x] `docker-compose.yml` con web, api, db y volumen
- [x] Endpoint `/api/salud`
- [x] Script de migraciones al arrancar (`db/migrations/mysql` → init de MySQL)

### H2 · Flujo mínimo
- [x] Migración: usuarios, lotes, ofertas, pedidos, eventos (`db/migrations/mysql/001_initial_schema.sql`)
- [ ] API: registro y entrada
- [ ] API: lotes (crear, listar)
- [ ] API: ofertas (crear, aceptar)
- [ ] Pruebas unitarias de reglas de oferta
- [x] Pantallas mínimas: lista de lotes, publicar lote

### H3 · Pedido completo
- [ ] Máquina de estados del pedido + pruebas *(existe en `src/data/pedidos.ts` con tests; falta moverla a la API)*
- [ ] `SimuladorDeGarantia` + pruebas
- [ ] Confirmación de peso y disputa + pruebas
- [ ] Calificaciones
- [x] `CalculadoraDeMargen` + pantalla de comparador
- [x] Enlaces `wa.me`

### H4 · Pipeline
- [x] Workflow: lint + pruebas + build en PR
- [x] Workflow: UAT con Compose y pruebas de humo
- [ ] Workflow: push a Docker Hub (falta secret `DOCKERHUB_TOKEN`)

### H5 · Nube
- [ ] Adaptador de repositorio para D1
- [x] Migraciones D1 (`db/migrations/d1/001_initial_schema.sql`)
- [ ] `wrangler.toml` y despliegue desde Actions
- [ ] Revisar consumo de CPU (límite 10 ms/solicitud)

### H6 · Sin señal
- [ ] Manifiesto y Service Worker *(manifiesto ✅, SW ❌)*
- [ ] IndexedDB y cola de operaciones
- [ ] Endpoint `/sync` idempotente
- [ ] Prueba manual en modo avión

### H7 · Pulido y demo
- [x] Datos semilla
- [x] Guion de demo (3–5 min)
- [ ] PDF y MD de la propuesta *(docx entregado en IPDC; falta copiar al repo)*

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

1. **Crear repo en GitHub** y hacer push de `master` y `develop` (sin remoto todavía)
2. **Configurar secrets**: `DOCKERHUB_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
3. **Primera corrida real del CI** + capturar evidencias (runs verdes en GitHub Actions)
4. **Prender Docker Desktop** y verificar `docker compose up --build -d` + `/api/salud`
5. **Pedir rúbrica del Proyecto Final IPDC** para cerrar faltantes