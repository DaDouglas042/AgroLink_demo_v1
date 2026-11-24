import { describe, it, expect } from 'vitest'
import {
  CLASE_ESTADO,
  FLUJO,
  PEDIDOS_SEMILLA,
  proximaAccion,
} from './pedidos'

describe('pedidos — máquina de estados', () => {
  it('el flujo tiene los 6 estados en orden', () => {
    expect(FLUJO).toEqual([
      'Pactado',
      'PagoRetenido',
      'Cargado',
      'Pesado',
      'Pagado',
      'Calificado',
    ])
  })

  it('cada estado del flujo tiene clase CSS de badge', () => {
    for (const estado of FLUJO) {
      expect(CLASE_ESTADO[estado]).toBeTruthy()
    }
  })

  it('el comprador deposita y el productor marca la carga', () => {
    expect(proximaAccion('Pactado', 'comprador').siguiente).toBe('PagoRetenido')
    expect(proximaAccion('PagoRetenido', 'productor').siguiente).toBe('Cargado')
  })

  it('la contraparte espera mientras le toca al otro lado', () => {
    expect(proximaAccion('Pactado', 'productor').siguiente).toBeUndefined()
    expect(proximaAccion('Pesado', 'productor').siguiente).toBeUndefined()
  })

  it('el peso confirmado libera el pago y luego se califica', () => {
    expect(proximaAccion('Cargado', 'productor').siguiente).toBe('Pesado')
    expect(proximaAccion('Pesado', 'comprador').siguiente).toBe('Pagado')
    expect(proximaAccion('Pagado', 'comprador').siguiente).toBe('Calificado')
  })

  it('un pedido calificado ya no tiene acciones', () => {
    const accion = proximaAccion('Calificado', 'productor')
    expect(accion.siguiente).toBeUndefined()
    expect(accion.etiqueta).toBe('Pedido completado')
  })

  it('la semilla trae 3 pedidos de ejemplo con monto y rol', () => {
    expect(PEDIDOS_SEMILLA).toHaveLength(3)
    for (const pedido of PEDIDOS_SEMILLA) {
      expect(pedido.monto).toMatch(/^\$[\d,]+ MXN$/)
      expect(['productor', 'comprador']).toContain(pedido.rol)
    }
  })
})
