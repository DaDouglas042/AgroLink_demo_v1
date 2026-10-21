export function MisPedidos() {
  const pedidos = [
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

  const getEstadoClass = (estado: string) => {
    const clases: Record<string, string> = {
      Pactado: 'estado-pactado',
      PagoRetenido: 'estado-pagoret',
      Cargado: 'estado-cargado',
      Pesado: 'estado-pesado',
      Pagado: 'estado-pagado',
      Calificado: 'estado-calificado',
      EnDisputa: 'estado-disputa',
      Cancelado: 'estado-cancelado',
    }
    return clases[estado] || ''
  }

  const getProximaAccion = (estado: string, rol: string) => {
    if (estado === 'Pactado' && rol === 'comprador') return 'Depositar garantía (simulada)'
    if (estado === 'PagoRetenido' && rol === 'productor') return 'Marcar como cargado'
    if (estado === 'Cargado') return 'Registrar peso'
    if (estado === 'EnDisputa') return 'Esperar resolución del admin'
    if (estado === 'Pesado' && rol === 'comprador') return 'Liberar pago'
    if (estado === 'Pagado') return 'Calificar'
    return '—'
  }

  return (
    <div className="page mis-pedidos">
      <header className="page-header">
        <h1>Mis pedidos</h1>
        <select className="filtro-rol" defaultValue="todos" aria-label="Filtrar por rol">
          <option value="todos">Todos</option>
          <option value="productor">Como productor</option>
          <option value="comprador">Como comprador</option>
        </select>
      </header>

      <ul className="pedidos-lista" role="list">
        {pedidos.map((pedido) => (
          <li key={pedido.id} className="pedido-card">
            <article className="pedido-info">
              <header className="pedido-header">
                <span className={`estado-badge ${getEstadoClass(pedido.estado)}`}>{pedido.estado}</span>
                <span className="pedido-id">{pedido.id}</span>
              </header>
              <h2 className="pedido-lote">{pedido.lote}</h2>
              <p className="pedido-contraparte">
                <strong>{pedido.rol === 'productor' ? 'Comprador' : 'Productor'}:</strong> {pedido.contraparte}
              </p>
              <div className="pedido-meta">
                <span>📅 {pedido.fecha}</span>
                <span>💰 {pedido.monto}</span>
                <span>👤 {pedido.rol === 'productor' ? 'Productor' : 'Comprador'}</span>
              </div>
            </article>
            <nav className="pedido-acciones">
              <div className="proxima-accion">
                <span className="accion-label">Próxima acción:</span>
                <span className="accion-texto">{getProximaAccion(pedido.estado, pedido.rol)}</span>
              </div>
              <a href={`/pedidos/${pedido.id}`} className="btn btn-primary">Ver detalle</a>
            </nav>
          </li>
        ))}
      </ul>

      {pedidos.length === 0 && (
        <div className="estado-vacio">
          <p>No tienes pedidos aún.</p>
          <a href="/lotes" className="btn btn-primary">Explorar lotes</a>
        </div>
      )}
    </div>
  )
}