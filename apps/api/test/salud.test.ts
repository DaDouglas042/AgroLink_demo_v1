import { describe, it, expect, vi } from 'vitest'
import { app } from '../src/app'

describe('AgroLink API', () => {
  it('GET / devuelve metadata y endpoints disponibles', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(body.servicio).toBe('agrolink-api')
    expect(body.endpoints).toContain('/api/salud')
  })

  it('GET /api/salud devuelve ok true y ambiente', async () => {
    const res = await app.request('/api/salud', {}, { APP_ENV: 'dev' })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(body.servicio).toBe('agrolink-api')
    expect(body.ambiente).toBe('dev')
    expect(body.timestamp).toBeDefined()
  })

  it('GET /api/demo-error registra traza y devuelve 500 controlado para APM', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await app.request('/api/demo-error', {}, { APP_ENV: 'prod' })
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.traceId).toMatch(/^tr-/)
    expect(body.error).toContain('APM')
    expect(errSpy).toHaveBeenCalled()
    errSpy.mockRestore()
  })

  it('GET /ruta-no-existe devuelve 404', async () => {
    const res = await app.request('/ruta-no-existe')
    expect(res.status).toBe(404)
  })
})
