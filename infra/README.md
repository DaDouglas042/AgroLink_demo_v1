# infra

Aquí van, cuando se construyan:

- `docker-compose.yml` (web, api, db, volúmenes)
- `Dockerfile.api`, `Dockerfile.web`, `nginx.conf`
- `wrangler.toml` (Cloudflare)
- `.env.example` (nunca subir secretos reales)

Secretos del pipeline (en GitHub, no en el repo): token de Docker Hub **con permiso de escritura**, token de Cloudflare.

Kubernetes queda fuera (ADR-001).
