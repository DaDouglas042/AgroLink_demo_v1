# 05 · Plan de trabajo

Sin fechas inventadas: no conocemos la fecha del Proyecto Final ni la de la demo de Innovación. **Abierto:** poner fechas cuando se sepan. Mientras tanto, el orden de los hitos es lo que importa.

## Hitos

| Hito | Resultado verificable | Materia que gana |
|---|---|---|
| H0 · Base | Repo público, ramas, Project Board, plantilla de PR, README | Infra |
| H1 · Esqueleto que corre | `docker compose up` levanta web + api + db y `/api/salud` responde | Infra |
| H2 · Flujo mínimo | Registro → publicar lote → ofertar → aceptar → pedido Pactado, con pruebas unitarias | Ambas |
| H3 · Pedido completo | Estados hasta Calificado, garantía simulada, disputa de peso, comparador de margen | Innovación |
| H4 · Pipeline | CI con lint, pruebas, imágenes en Docker Hub, UAT con humo | Infra |
| H5 · Nube | Mismo código desplegado en Cloudflare con D1; URL pública | Innovación |
| H6 · Sin señal | PWA instalable y cola de operaciones con sincronización | Innovación |
| H7 · Pulido y demo | Datos semilla, guion de demo, Wiki y PDF de la propuesta | Ambas |

Orden recomendado: H0 → H1 → H2 → H4 (para que cada cambio ya pase por el pipeline) → H3 → H5 → H6 → H7. Si falta tiempo, H6 se reduce a "instalable y muestra lo último visto" sin cola de operaciones.

## Issues iniciales para el Project Board

Columnas: `Backlog` · `Listo` · `En curso` · `En revisión` · `Hecho`. Etiquetas: `infra`, `api`, `web`, `db`, `docs`, `pruebas`, `investigación`.

**H0**
- [ ] Crear repo público y proteger `main` y `develop`
- [ ] Crear Project Board y estas columnas
- [ ] Agregar plantilla de PR y ramas base
- [ ] Publicar README y subir docs a la Wiki

**H1**
- [ ] Dockerfile de api
- [ ] Dockerfile de web (nginx)
- [ ] `docker-compose.yml` con web, api, db y volumen
- [ ] Endpoint `/api/salud`
- [ ] Script de migraciones al arrancar

**H2**
- [ ] Migración: usuarios, lotes, ofertas, pedidos, eventos
- [ ] API: registro y entrada
- [ ] API: lotes (crear, listar)
- [ ] API: ofertas (crear, aceptar)
- [ ] Pruebas unitarias de reglas de oferta
- [ ] Pantallas mínimas: lista de lotes, publicar lote

**H3**
- [ ] Máquina de estados del pedido + pruebas
- [ ] `SimuladorDeGarantia` + pruebas
- [ ] Confirmación de peso y disputa + pruebas
- [ ] Calificaciones
- [ ] `CalculadoraDeMargen` + pantalla de comparador
- [ ] Enlaces `wa.me`

**H4**
- [ ] Workflow: lint + pruebas + build en PR
- [ ] Workflow: UAT con Compose y pruebas de humo
- [ ] Workflow: push a Docker Hub (secretos con token de escritura)

**H5**
- [ ] Adaptador de repositorio para D1
- [ ] Migraciones D1
- [ ] `wrangler.toml` y despliegue desde Actions
- [ ] Revisar consumo de CPU (límite de 10 ms por solicitud)

**H6**
- [ ] Manifiesto y Service Worker
- [ ] IndexedDB y cola de operaciones
- [ ] Endpoint `/sync` idempotente
- [ ] Prueba manual en modo avión

**H7**
- [ ] Datos semilla
- [ ] Guion de demo (3–5 minutos)
- [ ] PDF y MD de la propuesta

**Investigación (ver `06-decisiones-abiertas.md`)**
- [ ] Experimento Dos: preguntas nuevas del reporte
- [ ] Confirmar rúbrica y fecha del Proyecto Final
- [ ] Revisar tema regulatorio de custodia de fondos

## Reparto

**Abierto:** decidir entre Franks y el resto del equipo quién lleva `infra`/`pipeline`, `api`, `web` y `investigación`. Se sugiere una persona dueña por área y revisión cruzada en los PR.
