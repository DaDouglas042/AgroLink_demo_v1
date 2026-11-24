export type Producto =
  | 'limon'
  | 'aguacate'
  | 'berries'
  | 'jitomate'
  | 'cebolla'
  | 'otros'

export type Lote = {
  id: string
  producto: Producto
  titulo: string
  ubicacion: string
  distanciaKm: number
  disponible: string
  precio: number
  precioMin: number
  calidad: string
  publicadoPor: string
  hace: string
  mio?: boolean
}

export const NOMBRE_PRODUCTO: Record<Producto, string> = {
  limon: 'Limón',
  aguacate: 'Aguacate',
  berries: 'Berries',
  jitomate: 'Jitomate',
  cebolla: 'Cebolla',
  otros: 'Otros',
}

const MESES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
]

/** Convierte un ISO (aaaa-mm-dd) a "25 oct 2026" */
export function formatearFecha(iso: string): string {
  const partes = iso.split('-')
  if (partes.length !== 3) return iso
  const [anio, mes, dia] = partes
  const m = Number(mes) - 1
  if (Number.isNaN(m) || m < 0 || m > 11) return iso
  return `${Number(dia)} ${MESES[m]} ${anio}`
}

export function precioTexto(precio: number): string {
  return `$${precio.toFixed(2)}`
}

/** Lotes de ejemplo de la demo (datos embebidos) */
export const LOTES_SEMILLA: Lote[] = [
  {
    id: '1',
    producto: 'limon',
    titulo: 'Limón persa, 2,000 kg',
    ubicacion: 'Zapotlán el Grande, Jalisco',
    distanciaKm: 85,
    disponible: '25 oct 2026',
    precio: 18.5,
    precioMin: 16,
    calidad: 'Exportación (90% calibre 1)',
    publicadoPor: 'Juan Pérez',
    hace: 'Hace 2 horas',
  },
  {
    id: '2',
    producto: 'aguacate',
    titulo: 'Aguacate Hass, 1,500 kg',
    ubicacion: 'Ciudad Guzmán, Jalisco',
    distanciaKm: 125,
    disponible: '28 oct 2026',
    precio: 42,
    precioMin: 38,
    calidad: 'Nacional premium',
    publicadoPor: 'Rancho El Roble',
    hace: 'Hace 5 horas',
  },
  {
    id: '3',
    producto: 'berries',
    titulo: 'Arándano azul, 500 kg',
    ubicacion: 'Tlajomulco de Zúñiga, Jalisco',
    distanciaKm: 48,
    disponible: '30 oct 2026',
    precio: 85,
    precioMin: 78,
    calidad: 'Nacional estándar',
    publicadoPor: 'Huerta San Miguel',
    hace: 'Ayer',
  },
  {
    id: '4',
    producto: 'jitomate',
    titulo: 'Jitomate saladet, 3,000 kg',
    ubicacion: 'Tapalpa, Jalisco',
    distanciaKm: 140,
    disponible: '2 nov 2026',
    precio: 14.5,
    precioMin: 12.8,
    calidad: 'Industrial / procesamiento',
    publicadoPor: 'Productores de Tapalpa',
    hace: 'Hace 3 días',
  },
]

const CLAVE = 'agrolink.lotes.v1'

/** Lotes publicados desde el formulario (guardados en este dispositivo) */
export function leerPublicados(): Lote[] {
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return []
    const datos = JSON.parse(crudo)
    return Array.isArray(datos) ? (datos as Lote[]) : []
  } catch {
    return []
  }
}

export function guardarPublicado(lote: Lote): void {
  try {
    const actuales = leerPublicados()
    actuales.unshift(lote)
    localStorage.setItem(CLAVE, JSON.stringify(actuales))
  } catch {
    /* modo sin almacenamiento: el lote se muestra solo en esta sesión */
  }
}

export function todosLosLotes(): Lote[] {
  return [...leerPublicados(), ...LOTES_SEMILLA]
}

export function buscarLote(id: string | undefined): Lote | undefined {
  if (!id) return undefined
  return todosLosLotes().find((l) => l.id === id)
}

export function limpiarPublicados(): void {
  try {
    localStorage.removeItem(CLAVE)
  } catch {
    /* noop */
  }
}
