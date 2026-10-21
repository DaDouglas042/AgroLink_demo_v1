import { Hono } from 'hono'
import { salud } from '@/routes/salud'

const app = new Hono()

app.route('/api', salud)

export default app