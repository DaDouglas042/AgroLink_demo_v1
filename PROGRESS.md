# Progress Log - AgroLink_demo_v1

> Bitácora de iteraciones. Se actualiza en cada sesión de trabajo para no perdernos.

---

## Formato de entrada

```
### YYYY-MM-DD — Sesión N
**Objetivo:** Qué se quería lograr
**Hecho:** Qué se completó (commits, PRs, decisiones)
**Bloqueos:** Qué detuvo el avance
**Decisiones:** Qué se decidió (y por qué)
**Próximo:** Qué atacar en la siguiente sesión
```

---

## Iteraciones

### 2026-10-21 — Sesión 1 (Inicialización)
**Objetivo:** Crear carpeta espejo `AgroLink_demo_v1` en la ubicación correcta, con toda la planeación copiada + código inicial funcional (H1), git init + primer commit, ramas `main`/`develop`.

**Hecho:**
- ✅ Movido `AgroLink_demo_v1` a `C:\Users\FRANCISCO\Desktop\9noSemestre\Inovacion y Emprendimiento\Agrolink\AgroLink_demo_v1` (eliminada copia en 8voSemestre)
- ✅ Copia fiel de `AgroLink_estructura_v1/agrolink`: 25 archivos planeación (docs, research, ADRs, diagramas PNG)
- ✅ Código inicial H1:
  - **API** (`apps/api`): Hono + TS + Vitest, estructura `src/{routes,domain,repos}`, health check `/api/salud` con test, Dockerfile
  - **Web** (`apps/web`): React 18 + Vite + TS, PWA-ready (manifest), 7 páginas (Home, Lotes, Publicar, Detalle, Pedidos, Comparador, Perfil), Layout responsive móvil-first, nginx.conf con proxy `/api`, Dockerfile
  - **DB** (`db/migrations`): Esquema completo MySQL y D1/SQLite (usuarios, lotes, ofertas, pedidos, eventos, calificaciones, operaciones_procesadas)
  - **Infra**: `docker-compose.yml` (web:8080, api:3000, db:3306 con healthcheck), `.gitignore`
  - **CI/CD**: `.github/workflows/ci.yml` (lint+test → build → UAT Compose+smoke → push Docker Hub → deploy Cloudflare)
- ✅ `git init` + primer commit `a64918c` ("chore: init AgroLink_demo_v1 - planeación + código inicial H1")
- ✅ Rama `develop` creada
- ✅ `PROGRESO.md` actualizado con bitácora, checklist H0-H7, decisiones abiertas
- ✅ `README.md` actualizado con quickstart y mapa del repo

**Bloqueos:** Ninguno técnico. Falta crear repo remoto en GitHub y configurar secrets.

**Decisiones:**
- Mantener React (no Vue) por ahora — consistente con código ya escrito
- MySQL + D1 (no SQLite en ambos) — según ADR-002 propuesto; confirmar con profesor si rúbrica exige contenedor BD
- Estructura de carpetas `domain/` y `repos/` vacías listas para H2/H3

**Próximo (H0 → H1):**
1. Crear repo público en GitHub y hacer `git push -u origin main develop`
2. Proteger ramas `main` y `develop` en GitHub (branch protection rules)
3. Crear GitHub Project Board con columnas: Backlog · Listo · En curso · En revisión · Hecho
4. Configurar secrets en GitHub: `DOCKERHUB_TOKEN` (write), `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
5. Verificar CI verde en PR de prueba
6. Probar `docker compose up --build -d` local y health checks

---

### 2026-10-21 — Sesión 2 (Pendiente)
**Objetivo:** Completar H0 (repo remoto, Project Board, secrets) y validar H1 (docker compose up + health checks + CI verde).

**Hecho:**
- 

**Bloqueos:**
- 

**Decisiones:**
- 

**Próximo:**
- 

---

## Checklist Hitos (resumen rápido)

| Hito | Estado | Qué falta |
|------|--------|-----------|
| **H0** Base | 🔄 **En curso** | Repo GitHub, branch protection, Project Board, secrets |
| **H1** Esqueleto | 🔄 **En curso** | Push remoto, CI verde, `docker compose up` verificado |
| **H2** Flujo mínimo | ⏳ | API: registro, lotes CRUD, ofertas; tests dominio; web conectada |
| **H3** Pedido completo | ⏳ | Estados, garantía simulada, disputa peso, comparador, wa.me |
| **H4** Pipeline | ⏳ | Secrets, UAT real, push Docker Hub automático |
| **H5** Nube | ⏳ | wrangler.toml, adaptador D1, deploy Workers/Pages |
| **H6** Sin señal | ⏳ | SW, IndexedDB, cola ops, `/sync` idempotente |
| **H7** Pulido demo | ⏳ | Datos semilla, guion 3-5 min, PDF/Wiki |

---

## Decisiones abiertas (tracking)

| ID | Tema | Estado | Nota |
|----|------|--------|------|
| A1 | Cultivo/región piloto | Abierto | Revisar entrevistas Experimento Cero |
| A2 | React vs Vue | **React** (code exists) | Confirmar con equipo |
| A3 | MySQL+D1 vs SQLite ambos | **MySQL+D1** (ADR-002) | Preguntar a profesor sobre contenedor BD |
| A4 | Reparto áreas | Abierto | Reunión equipo |
| A5 | Dónde corre Compose en demo | Abierto | Laptop + pipeline evidencia |

---

## Comandos útiles

```bash
# Desarrollo local
cd AgroLink_demo_v1
docker compose up --build -d
curl http://localhost:8080/           # PWA
curl http://localhost:3000/api/salud  # API health

# Tests
cd apps/api && npm test
cd apps/web && npm test

# Git workflow
git checkout -b feature/xxx develop
# ... trabajo ...
git push -u origin feature/xxx
# PR a develop → CI corre → merge → UAT
# PR develop→main → deploy
```