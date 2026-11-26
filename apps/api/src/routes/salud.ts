import { Hono } from 'hono'

export type AppBindings = {
  APP_ENV?: string
}

function getEnvName(bindingEnv?: string): string {
  if (bindingEnv) return bindingEnv
  const nodeEnv =
    typeof globalThis !== 'undefined' &&
    'process' in globalThis &&
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.APP_ENV
  return nodeEnv || 'local'
}

export const salud = new Hono<{ Bindings: AppBindings }>()
  .get('/salud', (c) => {
    return c.json({
      ok: true,
      servicio: 'agrolink-api',
      ambiente: getEnvName(c.env?.APP_ENV),
      version: '0.3.0',
      timestamp: new Date().toISOString(),
    })
  })
  .get('/demo-error', (c) => {
    const ambiente = getEnvName(c.env?.APP_ENV)
    console.error(
      JSON.stringify({
        level: 'error',
        service: 'agrolink-api',
        ambiente,
        event: 'demo_error_triggered',
        path: c.req.path,
        timestamp: new Date().toISOString(),
      }),
    )
    throw new Error('Error controlado de prueba APM - AgroLink')
  })
