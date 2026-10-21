# ADR-001 · Descartar Kubernetes

- **Estado:** Decidido (equipo, 21 oct 2026)
- **Contexto:** El curso enseñó Kubernetes (Minikube, Dashboard), pero no es necesario para el proyecto final y añade complejidad (clúster local, manifiestos, redes). Además no hay hosting gratuito razonable para un clúster.
- **Decisión:** El proyecto usa Docker + Docker Compose. No se usa Kubernetes ni Minikube.
- **Consecuencias:** Menos piezas que mantener. Se pierde la demostración de orquestación avanzada; se compensa con pipeline y UAT. Si más adelante sobra tiempo, puede reconsiderarse (ver `06-decisiones-abiertas.md`).
