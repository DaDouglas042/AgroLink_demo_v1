# 06 · Decisiones abiertas y opciones futuras

## Decididas

| # | Decisión | Fuente |
|---|---|---|
| D1 | Kubernetes/Minikube queda fuera del proyecto | ADR-001 |
| D2 | Otras cosas vistas en el curso se pueden sumar después, sin compromiso | Equipo, 21 oct |

## Propuestas esperando confirmación

| # | Propuesta | ADR |
|---|---|---|
| P1 | Un solo API (Hono) con dos destinos: Compose + MySQL y Cloudflare + D1 | ADR-002 |
| P2 | Modo sin señal ligero (cola + servidor decide), sin CRDTs | ADR-003 |
| P3 | Garantía simulada, nunca dinero real | ADR-004 |

## Abiertas

| # | Pregunta | Qué depende | Cómo se resuelve |
|---|---|---|---|
| A1 | ¿Cultivo y región del piloto? (limón vs. berries/aguacate; Jalisco vs. Michoacán) | Datos semilla, narrativa | Revisar entrevistas del Experimento Cero y decidir |
| A2 | ¿React o Vue? | Interfaz | Lo que más domine el equipo; sin diferencia técnica relevante aquí |
| A3 | ¿MySQL + D1 o SQLite en ambos? | ADR-002 | Pregunta al profesor sobre el contenedor de base de datos |
| A4 | ¿Reparto de áreas? | Plan | Reunión de equipo |
| A5 | ¿Dónde se corre el Compose "en vivo" durante la demo de Infra? | Demo | Laptop propia + pipeline como evidencia |

## Por investigar

| # | Tema | Por qué importa |
|---|---|---|
| I1 | Fecha y rúbrica del Proyecto Final | Define qué sobra y qué falta |
| I2 | Regulación de custodia de fondos de terceros en México | Justifica "simulado" y define el camino a producción |
| I3 | Facturación del productor (una entrevista la marcó como puerta cerrada) | Posible barrera de adopción |
| I4 | Fuente abierta de precios de mercado para el historial | Función S2 |
| I5 | Estado real de AgroOferta (¿hay transacciones? ¿sigue activa?) | Hoy solo hay inferencias; la página oficial bloquea el acceso automático |
| I6 | Conectividad en la zona del piloto | Determina cuánto invertir en modo sin señal |
| I7 | Cifra de pérdida poscosecha (FAO 13.2% vs. PNUMA 13%) | Unificar en pitch y documentos |

## Opciones futuras (nada definitivo)

**De Infraestructura (cosas vistas en el curso, a sumar si sobra tiempo):**

- Reverse proxy/Cloudflare Tunnel para exponer el Compose local durante la demo
- Dashboard de contenedores (ligero) para mostrar el estado
- Más ambientes (staging) en el pipeline
- Monitoreo básico de salud

**De producto (del reporte, para después del MVP):**

- Sincronización con CRDTs o vectores de versión si el modelo simple falla
- Alertas e inteligencia de precios con datos reales
- Financiamiento pre-cosecha o pago anticipado (requiere socio regulado)
- Marketplace de fletes y seguros
- Trazabilidad con tecnologías descentralizadas
- App nativa si la PWA se queda corta
