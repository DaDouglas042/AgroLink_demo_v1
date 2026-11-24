# Dockerfile para API (Node + Hono) - Multi-stage build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar TODAS las dependencias (incluyendo dev para compilar)
COPY package*.json ./
RUN npm install

# Copiar código y compilar
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Solo dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copiar código compilado
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.node.js"]