import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CLASE_ESTADO,
  guardarPedidos,
  leerPedidos,
  proximaAccion,
  type Pedido,
  type Rol,
} from '@/data/pedidos'

export function MisPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(() => leerPedidos())
  const [rol, setRol] = useState<Rol | 'todos'>('todos')

  const visibles = pedidos.filter((p) => rol === 'todos' || p.rol === rol)

  const avanzar = (id: string) => {
    setPedidos((prev) => {
      const siguientes = prev.map((p) => {
        if (p.id !== id) return p
        const accion = proximaAccion(p.estado, p.rol)
        return accion.siguiente ? { ...p, estado: accion.siguiente } : p
      })
      guardarPedidos(siguientes)
      return siguientes
    })
  }

  const reiniciar = () => {
    setPedidos((prev) => {
      const base = prev.map((p) => ({ ...p }))
      guardarPedidos(base)
      return base
    })
  }

  const etiquetaRol =
    rol === 'todos' ? '' : rol === 'productor' ? ' como productor' : ' como comprador'

  return (
    <div className="page mis-pedidos">
      <header className="page-header">
        <h1>Mis pedidos</h1>
        <select
          className="filtro-rol"
          value={rol}
          onChange={(e) => setRol(e.target.value as Rol | 'todos')}
          aria-label="Filtrar por rol"
        >
          <option value="todos">Todos</option>
          <option value="productor">Como productor</option>
          <option value="comprador">Como comprador</option>
        </select>
      </header>

      <p className="resultados-info" role="status">
        {visibles.length === 0
          ? `Sin pedidos${etiquetaRol}`
          : `${visibles.length} ${visibles.length === 1 ? 'pedido' : 'pedidos'}${etiquetaRol}`}
      </p>

      <ul className="pedidos-lista" role="list">
        {visibles.map((pedido) => {
          const accion = proximaAccion(pedido.estado, pedido.rol)
          return (
            <li key={pedido.id} className="pedido-card">
              <article className="pedido-info">
                <header className="pedido-header">
                  <span
                    className={`estado-badge ${CLASE_ESTADO[pedido.estado] ?? ''}`}
                    aria-live="polite"
                  >
                    {pedido.estado}
                  </span>
                  <span className="pedido-id">{pedido.id}</span>
                </header>
                <h2 className="pedido-lote">{pedido.lote}</h2>
                <p className="pedido-contraparte">
                  <strong>
                    {pedido.rol === 'productor' ? 'Comprador' : 'Productor'}:
                  </strong>{' '}
                  {pedido.contraparte}
                </p>
                <div className="pedido-meta">
                  <span>
                    <span aria-hidden="true">📅</span> {pedido.fecha}
                  </span>
                  <span>
                    <span aria-hidden="true">💰</span> {pedido.monto}
                  </span>
                  <span>
                    <span aria-hidden="true">👤</span>{' '}
                    {pedido.rol === 'productor' ? 'Productor' : 'Comprador'}
                  </span>
                </div>
              </article>
              <nav className="pedido-acciones" aria-label={`Acciones del pedido ${pedido.id}`}>
                <div className="proxima-accion">
                  <span className="accion-label">Próxima acción:</span>
                  <button
                    type="button"
                    className="btn btn-primary btn-accion"
                    onClick={() => avanzar(pedido.id)}
                    disabled={!accion.siguiente}
                    title={
                      accion.siguiente
                        ? 'Avanza el pedido al siguiente estado'
                        : 'No hay acción pendiente en este estado'
                    }
                  >
                    {accion.etiqueta}
                  </button>
                </div>
                <Link to={`/pedidos/${pedido.id}`} className="btn btn-secondary">
                  Ver detalle
                </Link>
              </nav>
            </li>
          )
        })}
      </ul>

      {visibles.length === 0 && (
        <div className="estado-vacio">
          <p>
            {rol === 'todos'
              ? 'No tienes pedidos aún.'
              : `No tienes pedidos${etiquetaRol}.`}
          </p>
          <Link to="/lotes" className="btn btn-primary">
            Explorar lotes
          </Link>
        </div>
      )}

      <div className="ayuda-pedidos">
        <button type="button" className="btn btn-secondary" onClick={reiniciar}>
          Reiniciar estados de la demo
        </button>
      </div>
    </div>
  )
}
