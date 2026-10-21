# 04 · Propuesta del proyecto final — Infraestructura para el desarrollo continuo

Este documento sigue el orden de la rúbrica. De aquí salen el **PDF** y el **MD para la Wiki**. Entregable adicional: el **GitHub Project Board** (ver `05-plan-de-trabajo.md`).

> La propuesta tenía fecha 4 de octubre. Si ya se entregó una versión, esta es la actualización con Kubernetes descartado y el alcance combinado; si no se entregó, hay que preguntar al profesor si aún se recibe.

| Rúbrica | Dónde está |
|---|---|
| Título | Abajo |
| Descripción | Abajo |
| Componentes y métodos (diagrama de clases) | `03-arquitectura.md` → "Modelo de clases" |
| Stack tecnológico | Abajo |
| Recursos: diagrama de infraestructura | `03-arquitectura.md` → "Vista de contenedores" |
| Recursos: diagrama de deployment | `03-arquitectura.md` → "Vista de despliegue" y "Pipeline" |
| Recursos: pruebas unitarias | Abajo |
| Recursos: Docker Hub | Abajo |
| Estrategia de ramas | `03-arquitectura.md` → "Pipeline y ramas" |
| Plan de trabajo (Project Board con issues) | `05-plan-de-trabajo.md` |

## Título

**AgroLink: bolsa de cosechas con despliegue continuo en contenedores**

## Descripción

AgroLink conecta a pequeños productores agrícolas con compradores, con pedidos que avanzan por estados, garantía de pago simulada y confirmación de peso por ambas partes, y funciona con mala señal. El proyecto aplica lo visto en el curso: servicios en contenedores orquestados con Docker Compose, volúmenes para persistencia, imágenes publicadas en Docker Hub, pruebas unitarias y un pipeline con ambiente de aceptación (UAT). La misma base de código se publica además en Cloudflare para la demo de la materia de Innovación y Emprendimiento.

## Stack (Propuesto)

| Capa | Tecnología | Por qué |
|---|---|---|
| Interfaz | PWA (React o Vue, a decidir) + Service Worker + IndexedDB | Instalable desde un enlace, sin tienda de apps; sirve para el modo sin señal |
| API | Node + Hono | Mismo código en Node y en Workers |
| Datos (Compose) | MySQL con volumen | Lo practicado en el curso (Práctica 3) |
| Datos (Cloudflare) | D1 | Capa gratuita |
| Servidor web | nginx | Sirve la PWA y hace proxy al API |
| Contenedores | Docker + Compose | Núcleo del curso |
| Registro de imágenes | Docker Hub (repo público) | Requisito del curso |
| CI/CD | GitHub Actions | Gratis en repos públicos |
| Pruebas | Vitest (o Jest) para unitarias; pruebas de humo con curl o Playwright en UAT | Rápidas y sin costo |
| Gestión | GitHub Project Board + Wiki | Lo pide la rúbrica |

**Descartado:** Kubernetes/Minikube (ADR-001).

## Recursos a crear

1. **Diagrama de infraestructura:** contenedores web, api, db y volúmenes (Compose).
2. **Diagrama de deployment:** GitHub → Actions → Docker Hub → Compose, y Actions → Cloudflare.
3. **Pruebas unitarias (mínimo propuesto):** máquina de estados del pedido (transiciones válidas e inválidas), `CalculadoraDeMargen`, `SimuladorDeGarantia`, detección de disputa de peso, idempotencia de operaciones de sincronización.
4. **Docker Hub:** dos repos públicos (`agrolink-web`, `agrolink-api`) con tags `develop-<sha>` y `vX.Y.Z`. Usar un token con permisos de lectura y escritura (el fallo de la Tarea 3 fue por un token sin permiso de escritura).
5. **Estrategia de ramas:** `main` / `develop` / `feature/*`, todo por PR con la plantilla de `.github/`.

## Pipeline

1. **PR a develop:** lint → pruebas unitarias → construir imágenes.
2. **Merge a develop (UAT):** levantar Compose en el runner y correr pruebas de humo sobre el API (crear lote → ofertar → recorrer el pedido hasta Calificado).
3. **Merge a main:** subir imágenes a Docker Hub con tag y desplegar a Cloudflare.

## Pendiente de confirmar con el profesor

- ¿El proyecto final exige un contenedor de base de datos separado, o basta con la persistencia en volumen?
- ¿Se acepta que el despliegue "en vivo" sea Compose local + Cloudflare, sin servidor propio?
- Fecha y rúbrica del Proyecto Final (100 pts); hoy no están en Canvas.
