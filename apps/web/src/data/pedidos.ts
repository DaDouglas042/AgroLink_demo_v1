export type Rol = 'productor' | 'comprador'

export type Estado =
  | 'Pactado'
  | 'PagoRetenido'
  | 'Cargado'
  | 'Pesado'
  | 'Pagado'
  | 'Calificado'
  | 'EnDisputa'
  | 'Cancelado'

export type Pedido = {
  id: string
  lote: string
  contraparte: string
  rol: Rol
  estado: Estado
  fecha: string
  monto: string
}

/** Flujo completo de un pedido (para la línea de tiempo) */
export const FLUJO: Estado[] = [
  'Pactado',
  'PagoRetenido',
  'Cargado',
  'Pesado',
  'Pagado',
  'Calificado',
]

export const PEDIDOS_SEMILLA: Pedido[] = [
  {
    id: 'PED-001',
    lote: 'Limón persa, 1,500 kg',
    contraparte: 'Frutas del Sur S.A. de C.V.',
    rol: 'productor',
    estado: 'Pesado',
    fecha: '22 oct 2026',
    monto: '$27,750 MXN',
  },
  {
    id: 'PED-002',
    lote: 'Aguacate Hass, 800 kg',
    contraparte: 'Mercado Central Guadalajara',
    rol: 'productor',
    estado: 'PagoRetenido',
    fecha: '20 oct 2026',
    monto: '$33,600 MXN',
  },
  {
    id: 'PED-003',
    lote: 'Berries mixtos, 500 kg',
    contraparte: 'Exportadora BerryMX',
    rol: 'comprador',
    estado: 'Pactado',
    fecha: '18 oct 2026',
    monto: '$42,500 MXN',
  },
]

export const CLASE_ESTADO: Record<string, string> = {
  Pactado: 'estado-pactado',
  PagoRetenido: 'estado-pagoret',
  Cargado: 'estado-cargado',
  Pesado: 'estado-pesado',
  Pagado: 'estado-pagado',
  Calificado: 'estado-calificado',
  EnDisputa: 'estado-disputa',
  Cancelado: 'estado-cancelado',
}

export type Accion = {
  /** Texto del botón */
  etiqueta: string
  /** Estado al que pasa si se completa la acción (undefined = no hay acción) */
  siguiente?: Estado
}

/**
 * Próxima acción según el estado del pedido y el rol del usuario.
 * El botón se vuelve una acción real que avanza el flujo (demo).
 */
export function proximaAccion(estado: Estado, rol: Rol): Accion {
  switch (estado) {
    case 'Pactado':
      return rol === 'comprador'
        ? { etiqueta: 'Depositar garantía (simulada)', siguiente: 'PagoRetenido' }
        : { etiqueta: 'Esperar depósito del comprador' }
    case 'PagoRetenido':
      return rol === 'productor'
        ? { etiqueta: 'Marcar como cargado', siguiente: 'Cargado' }
        : { etiqueta: 'Esperar carga del productor' }
    case 'Cargado':
      return { etiqueta: 'Registrar peso', siguiente: 'Pesado' }
    case 'Pesado':
      return rol === 'comprador'
        ? { etiqueta: 'Liberar pago', siguiente: 'Pagado' }
        : { etiqueta: 'Esperar confirmación del comprador' }
    case 'Pagado':
      return { etiqueta: 'Calificar al comprador', siguiente: 'Calificado' }
    case 'EnDisputa':
      return { etiqueta: 'Esperar resolución del admin' }
    default:
      return { etiqueta: 'Pedido completado' }
  }
}

const CLAVE = 'agrolink.pedidos.v1'

export function leerPedidos(): Pedido[] {
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return PEDIDOS_SEMILLA
    const datos = JSON.parse(crudo)
    return Array.isArray(datos) && datos.length ? (datos as Pedido[]) : PEDIDOS_SEMILLA
  } catch {
    return PEDIDOS_SEMILLA
  }
}

export function guardarPedidos(pedidos: Pedido[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(pedidos))
  } catch {
    /* noop */
  }
}

export function limpiarPedidos(): void {
  try {
    localStorage.removeItem(CLAVE)
  } catch {
    /* noop */
  }
}
