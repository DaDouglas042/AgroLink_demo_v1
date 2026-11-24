import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarLote, NOMBRE_PRODUCTO, precioTexto } from '@/data/lotes'

type EstadoOferta = 'Nueva' | 'Aceptada' | 'Rechazada'

type Oferta = {
  id: string
  comprador: string
  precio: number
  cantidad: number
  verificado: boolean
  estado: EstadoOferta
}

const OFERTAS_SEMILLA: Record<string, Oferta[]> = {
  '1': [
    {
      id: 'OF-001',
      comprador: 'Frutas del Sur S.A. de C.V.',
      precio: 18.5,
      cantidad: 1500,
      verificado: true,
      estado: 'Nueva',
    },
    {
      id: 'OF-002',
      comprador: 'Mercado Central Guadalajara',
      precio: 17.8,
      cantidad: 2000,
      verificado: false,
      estado: 'Nueva',
    },
  ],
}

export function DetalleLote() {
  const { id } = useParams()
  const lote = buscarLote(id)

  const [ofertas, setOfertas] = useState<Oferta[]>(() =>
    lote ? (OFERTAS_SEMILLA[lote.id] ?? []) : [],
  )
  const [mensaje, setMensaje] = useState('')
  const [errorOferta, setErrorOferta] = useState('')

  if (!lote) {
    return (
      <div className="page detalle-lote">
        <header className="page-header">
          <h1>Detalle del lote</h1>
        </header>
        <div className="estado-vacio">
          <p>No encontramos este lote. Puede que ya se haya vendido.</p>
          <Link to="/lotes" className="btn btn-primary">
            Ver lotes disponibles
          </Link>
        </div>
      </div>
    )
  }

  const resolverOferta = (idOferta: string, estado: 'Aceptada' | 'Rechazada') => {
    setOfertas((prev) =>
      prev.map((o) => (o.id === idOferta ? { ...o, estado } : o)),
    )
    const oferta = ofertas.find((o) => o.id === idOferta)
    setMensaje(
      estado === 'Aceptada'
        ? `Oferta de ${precioTexto(oferta?.precio ?? 0)}/kg aceptada. El pedido pasa a "Pactado" y aparece en Mis pedidos (demo).`
        : `Oferta de ${precioTexto(oferta?.precio ?? 0)}/kg rechazada.`,
    )
  }

  const manejarOferta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const datos = new FormData(e.currentTarget)
    const precio = Number(datos.get('ofertaPrecio'))
    const cantidad = Number(datos.get('ofertaCantidad'))

    if (!precio || !cantidad) {
      setErrorOferta('Completa precio y cantidad para enviar tu oferta.')
      return
    }
    if (precio < lote.precioMin) {
      setErrorOferta(
        `La oferta debe ser igual o mayor al mínimo de ${precioTexto(lote.precioMin)}/kg.`,
      )
      return
    }

    setErrorOferta('')
    setOfertas((prev) => [
      {
        id: `OF-${Date.now()}`,
        comprador: 'Tú (comprador verificado)',
        precio,
        cantidad,
        verificado: true,
        estado: 'Nueva',
      },
      ...prev,
    ])
    setMensaje(
      `Oferta enviada: ${precioTexto(precio)}/kg por ${cantidad.toLocaleString('es-MX')} kg. El productor la verá en su lista (demo).`,
    )
    e.currentTarget.reset()
  }

  const hayAceptada = ofertas.some((o) => o.estado === 'Aceptada')

  return (
    <div className="page detalle-lote">
      <header className="page-header">
        <h1>Detalle del lote</h1>
        <Link to="/lotes" className="btn btn-secondary">
          ← Volver a lotes
        </Link>
      </header>

      <article className="lote-detalle-completo">
        <div className="lote-header">
          <span className="lote-badge">{NOMBRE_PRODUCTO[lote.producto]}</span>
          <div>
            <h2>{lote.titulo}</h2>
            <p className="lote-meta">
              Publicado por: {lote.publicadoPor} · {lote.hace}
            </p>
          </div>
        </div>

        <dl className="lote-datos">
          <div>
            <dt>Calidad</dt>
            <dd>{lote.calidad}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>{lote.ubicacion}</dd>
          </div>
          <div>
            <dt>Disponible desde</dt>
            <dd>{lote.disponible}</dd>
          </div>
          <div>
            <dt>Precio mínimo</dt>
            <dd className="numero">{precioTexto(lote.precioMin)}/kg</dd>
          </div>
          <div>
            <dt>Estado</dt>
            <dd>
              <span className="estado estado-disponible">
                {hayAceptada ? 'Pactado' : 'Disponible'}
              </span>
            </dd>
          </div>
        </dl>

        <p className="resultados-info" role="status" aria-live="polite">
          {mensaje ||
            `${ofertas.length} ${
              ofertas.length === 1 ? 'oferta recibida' : 'ofertas recibidas'
            }`}
        </p>

        <section className="ofertas" id="ofertar">
          <h3>Ofertas recibidas</h3>
          {ofertas.length === 0 && (
            <p className="estado-vacio">Todavía no hay ofertas. ¡Sé el primero!</p>
          )}
          <ul className="ofertas-lista">
            {ofertas.map((oferta) => (
              <li key={oferta.id} className="oferta-card">
                <div className="oferta-info">
                  <p className="oferta-comprador">
                    {oferta.comprador}
                    {oferta.verificado && (
                      <>
                        {' '}
                        <span aria-label="Verificado">✓</span> Verificado
                      </>
                    )}
                  </p>
                  <p className="oferta-precio">
                    {precioTexto(oferta.precio)}/kg por{' '}
                    {oferta.cantidad.toLocaleString('es-MX')} kg
                  </p>
                  <p className="oferta-total">
                    Total: $
                    {Math.round(oferta.precio * oferta.cantidad).toLocaleString('es-MX')}{' '}
                    MXN
                  </p>
                  {oferta.estado !== 'Nueva' && (
                    <p
                      className={`estado estado-${
                        oferta.estado === 'Aceptada' ? 'pactado' : 'cancelado'
                      }`}
                    >
                      {oferta.estado}
                    </p>
                  )}
                </div>
                {oferta.estado === 'Nueva' ? (
                  <nav
                    className="oferta-acciones"
                    aria-label={`Acciones de la oferta de ${oferta.comprador}`}
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => resolverOferta(oferta.id, 'Aceptada')}
                    >
                      Aceptar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => resolverOferta(oferta.id, 'Rechazada')}
                    >
                      Rechazar
                    </button>
                  </nav>
                ) : (
                  <span className="oferta-cerrada" aria-hidden="true">
                    —
                  </span>
                )}
              </li>
            ))}
          </ul>

          {hayAceptada && (
            <div className="exito-panel compacto" role="status">
              <h4>Pedido pactado</h4>
              <p>El pedido ya está en tu lista con la garantía retenida (simulada).</p>
              <nav className="exito-acciones">
                <Link to="/pedidos" className="btn btn-primary">
                  Ver en Mis pedidos
                </Link>
              </nav>
            </div>
          )}

          <form className="formulario-oferta" onSubmit={manejarOferta} aria-label="Hacer una oferta" noValidate>
            <h4>Hacer una oferta</h4>
            <div className="campo">
              <label htmlFor="ofertaPrecio">Tu precio (MXN/kg) *</label>
              <input
                type="number"
                id="ofertaPrecio"
                name="ofertaPrecio"
                min={lote.precioMin}
                step="0.01"
                placeholder={`Mínimo ${precioTexto(lote.precioMin)}`}
                required
                aria-invalid={errorOferta ? 'true' : undefined}
              />
            </div>
            <div className="campo">
              <label htmlFor="ofertaCantidad">Cantidad (kg) *</label>
              <input
                type="number"
                id="ofertaCantidad"
                name="ofertaCantidad"
                min="1"
                step="1"
                placeholder="Ej: 1500"
                required
                aria-invalid={errorOferta ? 'true' : undefined}
              />
            </div>
            {errorOferta && (
              <p className="error-campo" role="alert">
                {errorOferta}
              </p>
            )}
            <button type="submit" className="btn btn-primary btn-lg">
              Enviar oferta
            </button>
          </form>
        </section>

        <section className="contacto">
          <h3>Contactar al productor</h3>
          <a
            href={`https://wa.me/521331234567?text=${encodeURIComponent(
              `Hola, vi tu lote de ${NOMBRE_PRODUCTO[lote.producto].toLowerCase()} en AgroLink y me interesa`,
            )}`}
            target="_blank"
            rel="noopener"
            className="btn btn-whatsapp btn-lg"
          >
            <span aria-hidden="true">💬</span> WhatsApp
          </a>
        </section>
      </article>
    </div>
  )
}
