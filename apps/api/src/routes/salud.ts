import { Hono } from 'hono'

export const salud = new Hono().get('/salud', (c) => {
  return c.json({ ok: true, servicio: 'agrolink-api', timestamp: new Date().toISOString() })
})