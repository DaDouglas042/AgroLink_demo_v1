export function Lotes() {
  return (
    <div className="page lotes">
      <header className="page-header">
        <h1>Lotes disponibles</h1>
        <a href="/lotes/publicar" className="btn btn-primary">
          <span>➕</span> Publicar lote
        </a>
      </header>

      <div className="filtros">
        <label>
          <span>Producto</span>
          <select>
            <option value="">Todos</option>
            <option value="limon">Limón</option>
            <option value="aguacate">Aguacate</option>
            <option value="berries">Berries</option>
            <option value="otros">Otros</option>
          </select>
        </label>
        <label>
          <span>Ordenar por</span>
          <select>
            <option value="recientes">Más recientes</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="cercania">Más cercanos</option>
          </select>
        </label>
      </div>

      <ul className="lotes-lista" role="list">
        <li className="lote-card">
          <article className="lote-info">
            <div className="lote-badge">Limón</div>
            <h2 className="lote-titulo">Limón persa, 2,000 kg</h2>
            <p className="lote-detalle">📍 Zapotlán el Grande, Jalisco</p>
            <p className="lote-detalle">📅 Disponible: 25 oct 2026</p>
            <p className="lote-precio">$18.50/kg <span className="lote-precio-min">(mín: $16.00)</span></p>
            <p className="lote-calidad">Calidad: Exportación (90% calibre 1)</p>
          </article>
          <nav className="lote-acciones">
            <a href="/lotes/1" className="btn btn-secondary">Ver detalle</a>
            <a href="/lotes/1#ofertar" className="btn btn-primary">Ofertar</a>
          </nav>
        </li>

        <li className="lote-card">
          <article className="lote-info">
            <div className="lote-badge">Aguacate</div>
            <h2 className="lote-titulo">Aguacate Hass, 1,500 kg</h2>
            <p className="lote-detalle">📍 Ciudad Guzmán, Jalisco</p>
            <p className="lote-detalle">📅 Disponible: 28 oct 2026</p>
            <p className="lote-precio">$42.00/kg <span className="lote-precio-min">(mín: $38.00)</span></p>
            <p className="lote-calidad">Calidad: Nacional premium</p>
          </article>
          <nav className="lote-acciones">
            <a href="/lotes/2" className="btn btn-secondary">Ver detalle</a>
            <a href="/lotes/2#ofertar" className="btn btn-primary">Ofertar</a>
          </nav>
        </li>

        <li className="lote-card vacio">
          <p>No hay más lotes en esta zona.</p>
          <a href="/lotes/publicar" className="btn btn-primary">Sé el primero en publicar</a>
        </li>
      </ul>

      <nav className="paginacion" aria-label="Paginación">
        <button className="btn btn-secondary" disabled>Anterior</button>
        <span className="paginacion-info">Página 1 de 1</span>
        <button className="btn btn-secondary" disabled>Siguiente</button>
      </nav>
    </div>
  )
}