import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  NOMBRE_PRODUCTO,
  precioTexto,
  todosLosLotes,
  type Producto,
} from '@/data/lotes'

type Orden = 'recientes' | 'precio-asc' | 'precio-desc' | 'cercania'

const OPCIONES_PRODUCTO: Array<{ valor: Producto | ''; etiqueta: string }> = [
  { valor: '', etiqueta: 'Todos' },
  { valor: 'limon', etiqueta: 'Limón' },
  { valor: 'aguacate', etiqueta: 'Aguacate' },
  { valor: 'berries', etiqueta: 'Berries' },
  { valor: 'jitomate', etiqueta: 'Jitomate' },
  { valor: 'cebolla', etiqueta: 'Cebolla' },
  { valor: 'otros', etiqueta: 'Otros' },
]

export function Lotes() {
  const [producto, setProducto] = useState<Producto | ''>('')
  const [orden, setOrden] = useState<Orden>('recientes')

  const lotes = useMemo(() => {
    const todos = todosLosLotes()
    const filtrados = producto
      ? todos.filter((l) => l.producto === producto)
      : todos
    const ordenados = [...filtrados]
    if (orden === 'precio-asc') ordenados.sort((a, b) => a.precio - b.precio)
    else if (orden === 'precio-desc') ordenados.sort((a, b) => b.precio - a.precio)
    else if (orden === 'cercania') ordenados.sort((a, b) => a.distanciaKm - b.distanciaKm)
    return ordenados
  }, [producto, orden])

  const etiquetaFiltro = producto ? NOMBRE_PRODUCTO[producto] : ''

  return (
    <div className="page lotes">
      <header className="page-header">
        <h1>Lotes disponibles</h1>
        <Link to="/lotes/publicar" className="btn btn-primary">
          <span aria-hidden="true">➕</span> Publicar lote
        </Link>
      </header>

      <div className="filtros">
        <label>
          <span>Producto</span>
          <select
            value={producto}
            onChange={(e) => setProducto(e.target.value as Producto | '')}
          >
            {OPCIONES_PRODUCTO.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.etiqueta}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Ordenar por</span>
          <select value={orden} onChange={(e) => setOrden(e.target.value as Orden)}>
            <option value="recientes">Más recientes</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="cercania">Más cercanos</option>
          </select>
        </label>
      </div>

      <p className="resultados-info" role="status">
        {lotes.length === 0
          ? 'Sin resultados con este filtro'
          : `${lotes.length} ${lotes.length === 1 ? 'lote disponible' : 'lotes disponibles'}`}
        {producto ? ` · ${etiquetaFiltro}` : ''}
      </p>

      <ul className="lotes-lista" role="list">
        {lotes.map((lote) => (
          <li key={lote.id} className="lote-card">
            <article className="lote-info">
              <div className="lote-badge">
                {NOMBRE_PRODUCTO[lote.producto]}
                {lote.mio ? ' · Tuyo' : ''}
              </div>
              <h2 className="lote-titulo">{lote.titulo}</h2>
              <p className="lote-detalle">
                <span aria-hidden="true">📍</span> {lote.ubicacion}
              </p>
              <p className="lote-detalle">
                <span aria-hidden="true">📅</span> Disponible: {lote.disponible}
              </p>
              <p className="lote-precio">
                {precioTexto(lote.precio)}/kg{' '}
                {lote.precio > lote.precioMin && (
                  <span className="lote-precio-min">
                    (mín: {precioTexto(lote.precioMin)})
                  </span>
                )}
              </p>
              <p className="lote-calidad">Calidad: {lote.calidad}</p>
            </article>
            <nav className="lote-acciones" aria-label={`Acciones del lote ${lote.titulo}`}>
              <Link to={`/lotes/${lote.id}`} className="btn btn-secondary">
                Ver detalle
              </Link>
              <Link to={`/lotes/${lote.id}#ofertar`} className="btn btn-primary">
                Ofertar
              </Link>
            </nav>
          </li>
        ))}

        {lotes.length === 0 && (
          <li className="lote-card vacio">
            <p>
              No hay lotes de {etiquetaFiltro || 'esta zona'} por ahora.
            </p>
            <Link to="/lotes/publicar" className="btn btn-primary">
              Sé el primero en publicar
            </Link>
          </li>
        )}
      </ul>

      <nav className="paginacion" aria-label="Paginación">
        <button className="btn btn-secondary" disabled>
          Anterior
        </button>
        <span className="paginacion-info">Página 1 de 1</span>
        <button className="btn btn-secondary" disabled>
          Siguiente
        </button>
      </nav>
    </div>
  )
}
