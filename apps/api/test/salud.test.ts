import { describe, it, expect } from 'vitest'
import { app } from '../src/index.node'

describe('GET /api/salud', () => {
  it('devuelve ok true', async () => {
    const res = await app.request('/api/salud')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(body.servicio).toBe('agrolink-api')
    expect(body.timestamp).toBeDefined()
  })
})