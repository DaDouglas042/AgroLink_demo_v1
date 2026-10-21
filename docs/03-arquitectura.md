# 03 · Arquitectura

Los diagramas están en Mermaid (se ven en GitHub y en la Wiki) y como PNG en `docs/diagramas/` para el PDF.

Estado: **Propuesto** (salvo Kubernetes descartado = **Decidido**, ver ADR-001).

## Qué corre dónde (capa gratuita)

Verificado en octubre de 2026 en documentación oficial y comparativos; volver a revisar antes de la demo porque estos límites cambian.

| Pieza | Dónde | Límite relevante | Nota |
|---|---|---|---|
| Código, issues, Project Board, Wiki, CI | GitHub | CI gratuita en repos públicos | Repo público para no gastar minutos |
| Imágenes Docker | Docker Hub (repo público) | Repos públicos ilimitados | Requisito del curso. Usar un token con permiso de escritura |
| PWA + API para la demo pública | Cloudflare Workers (Static Assets) | 100,000 solicitudes/día; **10 ms de CPU por solicitud**; 50 subsolicitudes | Suficiente para demo; las consultas deben ser ligeras |
| Base de datos de la demo | Cloudflare D1 | 5 GB; 5 M lecturas/día; 100 mil escrituras/día | Es SQLite |
| Fotos (opcional) | Cloudflare R2 | 10 GB | Should (S4) |
| Sistema en contenedores (Infra) | Docker Compose en la laptop y en el runner de CI | Sin costo | Se muestra en clase y se prueba en el pipeline |
| Hosting de Compose en la nube | **No se usa** | Render gratis se duerme tras 15 min, sin disco persistente, Postgres caduca a 30 días; Fly.io ya no tiene plan gratis; Koyeb pide tarjeta y no da volúmenes; Oracle pide tarjeta, redujo su cuota (2 OCPU/12 GB) y suele quedarse sin capacidad | Si se quisiera, Oracle es la única con recursos reales, pero con riesgo |

**Consecuencia:** el curso de Infra se demuestra con Compose + pipeline + Docker Hub; la materia de Innovación se demuestra con la URL pública en Cloudflare. Es **un solo código** (ver ADR-002).

## Vista de contenedores (modo Compose)

```mermaid
flowchart LR
  U["Usuario<br/>PWA en el celular"] -->|HTTP| W["web<br/>nginx con la PWA"]
  W -->|proxy /api| A["api<br/>Node + Hono"]
  A -->|SQL| D[("db<br/>MySQL")]
  D --- V[["volumen<br/>mysql_data"]]
  A -.->|fotos opcionales| F[["volumen<br/>uploads"]]
```

## Vista de despliegue (los dos destinos)

```mermaid
flowchart TB
  subgraph GH["GitHub"]
    R["Repositorio<br/>main / develop / feature"]
    CI["GitHub Actions"]
    PB["Project Board + Wiki"]
  end
  subgraph DH["Docker Hub"]
    IW["agrolink-web"]
    IA["agrolink-api"]
  end
  subgraph LOCAL["Laptop o runner - Compose"]
    CW["web"]
    CA["api"]
    CD[("MySQL")]
  end
  subgraph CF["Cloudflare gratuito"]
    SA["Static Assets - PWA"]
    WK["Worker - API Hono"]
    D1[("D1")]
  end
  R --> CI
  CI -->|"push de imagenes"| DH
  DH -->|"docker compose pull"| LOCAL
  CI -->|"wrangler deploy"| CF
  SA --> WK --> D1
  CW --> CA --> CD
```

## Pipeline y ramas

Ramas: `main` (estable, lo que se demuestra) · `develop` (integración) · `feature/<issue>-<nombre>` (trabajo). Todo entra por Pull Request.

```mermaid
flowchart LR
  F["feature/*"] -->|PR| DV["develop"]
  DV -->|"PR de release"| M["main"]
  subgraph "En cada PR a develop"
    L["lint"] --> T["pruebas unitarias"] --> B["build de imagenes"]
  end
  subgraph "En develop - UAT"
    UP["compose up en el runner"] --> SM["pruebas de humo contra la API"]
  end
  subgraph "En main"
    PH["push a Docker Hub con tag"] --> DP["wrangler deploy"]
  end
  F -.-> L
  DV -.-> UP
  M -.-> PH
```

## Modelo de clases

Es el diagrama de "componentes y métodos" que pide la rúbrica de Infra. Se refina al implementar.

```mermaid
classDiagram
  class Usuario {
    +id
    +nombre
    +telefono
    +rol
    +registrar()
    +iniciarSesion()
  }
  class Productor {
    +ubicacion
    +publicarLote()
    +aceptarOferta()
    +confirmarPeso()
  }
  class Comprador {
    +razonSocial
    +verificado
    +ofertar()
    +depositarGarantia()
    +confirmarPeso()
  }
  class Lote {
    +id
    +producto
    +cantidadKg
    +calidad
    +precioMinimo
    +disponibleDesde
    +estado
  }
  class Oferta {
    +id
    +precioKg
    +cantidadKg
    +estado
    +aceptar()
    +rechazar()
  }
  class Pedido {
    +id
    +estado
    +pesoProductor
    +pesoComprador
    +avanzar(evento)
    +cancelar()
    +abrirDisputa()
  }
  class Calificacion {
    +puntaje
    +comentario
  }
  class CalculadoraDeMargen {
    +calcular(precioCoyote, precioOferta, comisionPct)
  }
  class SimuladorDeGarantia {
    +retener(pedido)
    +liberar(pedido)
    +devolver(pedido)
  }
  class OperacionPendiente {
    +idOperacion
    +tipo
    +datos
    +creadaEn
    +enviar()
  }
  Usuario <|-- Productor
  Usuario <|-- Comprador
  Productor "1" --> "*" Lote : publica
  Lote "1" --> "*" Oferta : recibe
  Comprador "1" --> "*" Oferta : hace
  Oferta "1" --> "0..1" Pedido : origina
  Pedido "1" --> "*" Calificacion : genera
  Pedido ..> SimuladorDeGarantia : usa
  Oferta ..> CalculadoraDeMargen : usa
  Usuario "1" --> "*" OperacionPendiente : encola
```

## Estados del pedido

```mermaid
stateDiagram-v2
  [*] --> Pactado
  Pactado --> PagoRetenido: comprador deposita - simulado
  Pactado --> Cancelado: cualquiera cancela
  PagoRetenido --> Cargado: productor marca carga
  PagoRetenido --> Cancelado: acuerdo mutuo
  Cargado --> Pesado: pesos coinciden
  Cargado --> EnDisputa: pesos difieren
  EnDisputa --> Pesado: admin resuelve
  Pesado --> Pagado: libera pago - simulado
  Pagado --> Calificado: ambos califican
  Calificado --> [*]
  Cancelado --> [*]
```

## Sincronización sin señal

```mermaid
sequenceDiagram
  participant P as PWA
  participant L as IndexedDB local
  participant S as API
  P->>L: guardar operacion en cola con id unico
  Note over P,L: sin senal, la pantalla ya muestra el cambio como pendiente
  P->>S: POST /sync con cola y ultima marca
  S->>S: validar y aplicar - el servidor decide
  S-->>P: resultados por operacion y cambios nuevos
  P->>L: limpiar cola y actualizar datos
  Note over P,S: reenviar la misma operacion no duplica nada
```

## Un API, dos destinos (resumen de ADR-002)

- El API está escrito en **Hono**, que corre igual en Node (Compose) y en Workers (Cloudflare).
- El acceso a datos pasa por una capa de repositorios con dos adaptadores: MySQL para Compose y D1 para Cloudflare.
- Las consultas usan el subconjunto común de SQL (parámetros `?`, ids de texto generados por la app, fechas en formato ISO). Solo el DDL (crear tablas) difiere entre `db/migrations/mysql` y `db/migrations/d1`.
- **Plan B si se complica:** usar SQLite en ambos destinos (archivo en volumen en Compose, D1 en Cloudflare). Un solo dialecto, pero el servicio `db` desaparece de Compose; hay que confirmar con el profesor si la rúbrica exige un contenedor de base de datos.
