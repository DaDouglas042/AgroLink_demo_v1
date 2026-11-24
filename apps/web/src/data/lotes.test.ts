import { describe, it, expect } from 'vitest'
import {
  LOTES_SEMILLA,
  NOMBRE_PRODUCTO,
  formatearFecha,
  precioTexto,
  todosLosLotes,
} from './lotes'

describe('lotes — datos de la demo', () => {
  it('tiene lotes semilla con ids únicos', () => {
    expect(LOTES_SEMILLA.length).toBeGreaterThanOrEqual(4)
    const ids = LOTES_SEMILLA.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada lote tiene precio mínimo menor o igual al precio publicado', () => {
    for (const lote of LOTES_SEMILLA) {
      expect(lote.precioMin).toBeLessThanOrEqual(lote.precio)
    }
  })

  it('todos los lotes usan productos conocidos', () => {
    for (const lote of LOTES_SEMILLA) {
      expect(NOMBRE_PRODUCTO[lote.producto]).toBeTruthy()
    }
  })

  it('mezcla los lotes publicados en el dispositivo con los semilla', () => {
    // Sin almacenamiento local (entorno de prueba) solo quedan los semilla
    expect(todosLosLotes()).toHaveLength(LOTES_SEMILLA.length)
  })
})

describe('lotes — utilidades', () => {
  it('formatea fechas ISO al formato de la app', () => {
    expect(formatearFecha('2026-12-05')).toBe('5 dic 2026')
    expect(formatearFecha('2026-10-25')).toBe('25 oct 2026')
  })

  it('devuelve el texto original si la fecha no es válida', () => {
    expect(formatearFecha('próximamente')).toBe('próximamente')
    expect(formatearFecha('')).toBe('')
  })

  it('formatea precios con dos decimales', () => {
    expect(precioTexto(18.5)).toBe('$18.50')
    expect(precioTexto(16)).toBe('$16.00')
  })
})
