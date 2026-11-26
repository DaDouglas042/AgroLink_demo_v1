import { Hono } from 'hono'
import { salud, type AppBindings } from './routes/salud.js'

export const app = new Hono<{ Bindings: AppBindings }>()

// Middleware de trazabilidad estructurada (visible en Cloudflare Workers Observability y logs Docker)
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  const durationMs = Date.now() - start
  console.log(
    JSON.stringify({
      level: c.res.status >= 500 ? 'error' : 'info',
      service: 'agrolink-api',
      ambiente: c.env?.APP_ENV ?? 'local',
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      durationMs,
      timestamp: new Date().toISOString(),
    }),
  )
})

app.get('/', (c) => {
  return c.json({
    ok: true,
    servicio: 'agrolink-api',
    ambiente: c.env?.APP_ENV ?? 'local',
    endpoints: ['/api/salud', '/api/demo-error'],
  })
})

app.route('/api', salud)

app.onError((err, c) => {
  const traceId = `tr-${Date.now().toString(36)}`
  console.error(
    JSON.stringify({
      level: 'error',
      service: 'agrolink-api',
      ambiente: c.env?.APP_ENV ?? 'local',
      traceId,
      path: c.req.path,
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
    }),
  )
  return c.json(
    {
      ok: false,
      error: err.message,
      traceId,
      timestamp: new Date().toISOString(),
    },
    500,
  )
})
