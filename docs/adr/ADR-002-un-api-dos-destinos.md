# ADR-002 · Un solo API con dos destinos de despliegue

- **Estado:** Propuesto
- **Contexto:** La materia de Infra pide contenedores y Compose; la de Innovación necesita una URL pública gratuita. En capa gratuita no hay hosting confiable para Compose (Render se duerme y no tiene disco; Fly.io no tiene plan gratis; Koyeb y Oracle piden tarjeta). Cloudflare sí ofrece Workers + D1 gratis, con 10 ms de CPU por solicitud en el plan gratuito.
- **Decisión:** API en Hono (corre en Node y en Workers) con repositorios de datos intercambiables: MySQL para Compose, D1 para Cloudflare. Consultas en SQL común; DDL separado por motor.
- **Alternativas:** (a) Dos backends distintos → doble trabajo, descartado. (b) SQLite en ambos → un solo dialecto, pero elimina el contenedor de BD en Compose; es el **Plan B**. (c) Solo Compose y mostrar en laptop → la demo de Innovación no tendría URL pública.
- **Riesgos:** Diferencias sutiles entre MySQL y SQLite (tipos, fechas, claves). Mitigación: ids de texto generados por la app, fechas ISO, pruebas de repositorio corridas contra ambos motores en CI.
- **A confirmar:** si la rúbrica exige un contenedor de base de datos separado.
