# Dockerfile para API (Node + Hono)
FROM node:20-alpine AS base

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar código
COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.node.js"]