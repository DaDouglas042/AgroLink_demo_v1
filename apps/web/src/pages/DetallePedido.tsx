import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CLASE_ESTADO,
  FLUJO,
  guardarPedidos,
  leerPedidos,
  proximaAccion,
} from '@/data/pedidos'

export function DetallePedido() {
  const { id } = useParams()
  const [pedidos, setPedidos] = useState(() => leerPedidos())
  const pedido = pedidos.find((p) => p.id === id)

  if (!pedido) {
    return (
      <div className="page detalle-pedido">
        <header className="page-header">
          <h1>Detalle del pedido</h1>
        </header>
        <div className="estado-vacio">
          <p>No encontramos el pedido {id}.</p>
          <Link to="/pedidos" className="btn btn-primary">
            Volver a mis pedidos
          </Link>
        </div>
      </div>
    )
  }

  const accion = proximaAccion(pedido.estado, pedido.rol)
  const posicion = FLUJO.indexOf(pedido.estado)

  const avanzar = () => {
    if (!accion.siguiente) return
    const siguientes = pedidos.map((p) =>
      p.id === pedido.id ? { ...p, estado: accion.siguiente! } : p,
    )
    guardarPedidos(siguientes)
    setPedidos(siguientes)
  }

  const textoWhatsapp = encodeURIComponent(
    `Hola, vi tu pedido ${pedido.id} de ${pedido.lote} en AgroLink`,
  )

  return (
    <div className="page detalle-pedido">
      <header className="page-header">
        <h1>Detalle del pedido</h1>
        <Link to="/pedidos" className="btn btn-secondary">
          ← Volver
        </Link>
      </header>

      <article className="pedido-detalle">
        <header className="pedido-detalle-header">
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
          <strong>{pedido.rol === 'productor' ? 'Comprador' : 'Productor'}:</strong>{' '}
          {pedido.contraparte}
        </p>

        <dl className="lote-datos">
          <div>
            <dt>Monto</dt>
            <dd className="numero">{pedido.monto}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{pedido.fecha}</dd>
          </div>
          <div>
            <dt>Mi rol</dt>
            <dd>{pedido.rol === 'productor' ? 'Productor' : 'Comprador'}</dd>
          </div>
          <div>
            <dt>Garantía</dt>
            <dd>Simulada (sin dinero real)</dd>
          </div>
        </dl>

        <section className="flujo">
          <h3>Avance del pedido</h3>
          <ol className="timeline">
            {FLUJO.map((estado, i) => (
              <li
                key={estado}
                className={
                  i < posicion
                    ? 'timeline-paso completado'
                    : i === posicion
                      ? 'timeline-paso actual'
                      : 'timeline-paso'
                }
                aria-current={i === posicion ? 'step' : undefined}
              >
                <span className="timeline-punto" aria-hidden="true">
                  {i < posicion ? '✓' : i + 1}
                </span>
                <span className="timeline-texto">{estado}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="pedido-siguiente">
          <h3>Próxima acción</h3>
          <p className="accion-texto">{accion.etiqueta}</p>
          <div className="pedido-siguiente-acciones">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={avanzar}
              disabled={!accion.siguiente}
            >
              {accion.siguiente ? `Confirmar: ${accion.etiqueta}` : 'Esperando a la otra parte'}
            </button>
            <a
              href={`https://wa.me/521331234567?text=${textoWhatsapp}`}
              target="_blank"
              rel="noopener"
              className="btn btn-whatsapp"
            >
              <span aria-hidden="true">💬</span> Contactar
            </a>
          </div>
          <p className="ayuda">
            Demo: los estados se guardan en este dispositivo; no hay dinero real en
            juego.
          </p>
        </section>
      </article>
    </div>
  )
}
