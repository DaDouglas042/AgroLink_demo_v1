# AgroLink_demo_v1

> **Versión demo/implementación** — Espejo funcional de la planeación en `../AgroLink_estructura_v1/agrolink`.
> Aquí se construye el código real: contenedores, API, PWA, migraciones, pipeline.

---

## Stack (según `docs/03-arquitectura.md` y `docs/04-propuesta-infra.md`)

| Capa | Tecnología |
|------|------------|
| Interfaz | PWA (React + Vite + TypeScript) + Service Worker + IndexedDB |
| API | Node 20 + Hono (corre en Node y en Cloudflare Workers) |
| Datos (Compose) | MySQL 8.0 con volumen persistente |
| Datos (Cloudflare) | D1 (SQLite) |
| Servidor web | nginx (sirve PWA + proxy `/api` → API) |
| Contenedores | Docker + Compose |
| Registro imágenes | Docker Hub (repos públicos) |
| CI/CD | GitHub Actions |
| Pruebas | Vitest (unitarias) + humo en UAT |
| Gestión | GitHub Project Board + Wiki |

---

## Inicio rápido (H1: Esqueleto que corre)

```bash
# 1. Clonar y entrar
cd AgroLink_demo_v1

# 2. Levantar todo con Docker Compose
docker compose up --build -d

# 3. Verificar
curl http://localhost:8080/           # PWA (nginx)
curl http://localhost:3000/api/salud  # API health check
```

**Puertos:**
- `8080` → PWA (nginx)
- `3000` → API (Hono en Node)
- `3306` → MySQL (interno, expuesto para debug)

---

## Estructura del repo

```
AgroLink_demo_v1/
├── README.md                 # Este archivo
├── PROGRESO.md               # Bitácora de avances, hitos, decisiones
├── .gitignore
├── docker-compose.yml        # Orquestación local (web, api, db)
├── docs/                     # Planeación (copiada de estructura_v1)
│   ├── 00-vision-y-alcance.md
│   ├── 01-hallazgos-del-reporte.md
│   ├── 02-funcionalidades-mvp.md
│   ├── 03-arquitectura.md
│   ├── 04-propuesta-infra.md
│   ├── 05-plan-de-trabajo.md
│   ├── 06-decisiones-abiertas.md
│   ├── adr/                  # ADR-001..004
│   └── diagramas/            # PNGs de arquitectura
├── research/                 # Fuentes, matriz de comparación
├── apps/
│   ├── api/                  # API Hono (Node/Workers)
│   │   ├── src/
│   │   │   ├── index.node.ts       # Entry point Node
│   │   │   ├── routes/             # /api/salud, /api/lotes, etc.
│   │   │   ├── domain/             # Reglas puras (estados, garantía, margen)
│   │   │   └── repos/              # Interfaces + adaptadores MySQL/D1
│   │   ├── test/                   # Vitest unitarias
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vitest.config.ts
│   │   └── Dockerfile
│   └── web/                  # PWA React + Vite
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx + App.css
│       │   ├── components/         # Layout, UI reutilizable
│       │   ├── pages/              # Home, Lotes, Publicar, Detalle, Pedidos, Comparador, Perfil
│       │   ├── hooks/              # useAuth, useSync, etc.
│       │   └── services/           # apiClient, indexedDB, syncQueue
│       ├── public/
│       │   ├── manifest.webmanifest
│       │   └── vite.svg
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── nginx.conf
│       └── Dockerfile
├── db/
│   └── migrations/
│       ├── mysql/              # DDL para Compose (MySQL)
│       └── d1/                 # DDL para Cloudflare D1 (SQLite)
└── infra/                      # (futuro) wrangler.toml, .env.example, etc.
```

---

## Hitos (de `docs/05-plan-de-trabajo.md`)

| Hito | Qué entrega | Estado |
|------|-------------|--------|
| **H0** | Repo público, ramas, Project Board, PR template, README | ✅ Estructura lista |
| **H1** | `docker compose up` levanta web+api+db, `/api/salud` responde | 🔄 **En curso** |
| **H2** | Registro → publicar lote → ofertar → aceptar → pedido Pactado + tests | ⏳ Pendiente |
| **H3** | Estados completos, garantía simulada, disputa peso, comparador margen | ⏳ Pendiente |
| **H4** | Pipeline CI: lint + tests + build + push Docker Hub + UAT | ⏳ Pendiente |
| **H5** | Despliegue en Cloudflare (Workers + D1), URL pública | ⏳ Pendiente |
| **H6** | PWA instalable + cola operaciones + `/sync` idempotente | ⏳ Pendiente |
| **H7** | Datos semilla, guion demo 3-5 min, PDF/Wiki propuesta | ⏳ Pendiente |

Ver `PROGRESO.md` para checklist detallado y bitácora.

---

## Desarrollo local (sin Docker)

### API
```bash
cd apps/api
npm install
npm run dev          # http://localhost:3000/api/salud
npm test             # Vitest
npm run lint
npm run typecheck
```

### Web
```bash
cd apps/web
npm install
npm run dev          # http://localhost:5173 (proxy /api → localhost:3000)
npm run build        # Genera dist/ para nginx
npm test
npm run lint
```

---

## Variables de entorno

Nunca subas secretos reales. Usa `.env` local (gitignorado) basado en `.env.example` (por crear en `infra/`).

```env
# apps/api/.env (ejemplo)
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=agrolink
DB_USER=agrolink
DB_PASSWORD=agrolink
```

---

## Decisiones arquitectónicas clave (ADR)

| ADR | Tema | Estado |
|-----|------|--------|
| [ADR-001](docs/adr/ADR-001-descartar-kubernetes.md) | No Kubernetes | **Decidido** |
| [ADR-002](docs/adr/ADR-002-un-api-dos-destinos.md) | Un API (Hono) → Node + Workers | **Propuesto** |
| [ADR-003](docs/adr/ADR-003-modo-sin-senal-ligero.md) | Modo sin señal ligero (cola + servidor decide) | **Propuesto** |
| [ADR-004](docs/adr/ADR-004-garantia-simulada.md) | Garantía simulada, nunca dinero real | **Propuesto** |

---

## Próximos pasos inmediatos

1. `git init` + primer commit + subir a GitHub (repo público)
2. Proteger ramas `main` y `develop`
3. Crear GitHub Project Board con columnas: Backlog · Listo · En curso · En revisión · Hecho
4. Completar H1: verificar que `docker compose up` levanta todo y health check responde
5. Escribir migraciones y conectar API a MySQL
6. Implementar registro/login y CRUD de lotes (H2)

---

## Referencias

- Planeación original: `../AgroLink_estructura_v1/agrolink/`
- Documentos de arquitectura: `docs/03-arquitectura.md`
- Plan de trabajo: `docs/05-plan-de-trabajo.md`
- Decisiones abiertas: `docs/06-decisiones-abiertas.md`