import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { salud } from './routes/salud.js'

export const app = new Hono()

app.route('/api', salud)

if (process.argv[1] && process.argv[1].endsWith('index.node.js')) {
  const port = Number(process.env.PORT) || 3000
  serve({
    fetch: app.fetch,
    port,
  })
  console.log(`API listening on http://localhost:${port}`)
}