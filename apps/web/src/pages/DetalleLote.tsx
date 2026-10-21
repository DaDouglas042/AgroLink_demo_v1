export function DetalleLote() {
  return (
    <div className="page detalle-lote">
      <header className="page-header">
        <h1>Detalle del lote</h1>
      </header>

      <article className="lote-detalle-completo">
        <div className="lote-header">
          <span className="lote-badge">Limón</span>
          <div>
            <h2>Limón persa, 2,000 kg</h2>
            <p className="lote-meta">Publicado por: Juan Pérez · Hace 2 horas</p>
          </div>
        </div>

        <dl className="lote-datos">
          <div><dt>Calidad</dt><dd>Exportación (90% calibre 1)</dd></div>
          <div><dt>Ubicación</dt><dd>Zapotlán el Grande, Jalisco</dd></div>
          <div><dt>Disponible desde</dt><dd>25 oct 2026</dd></div>
          <div><dt>Precio mínimo</dt><dd>$16.00/kg</dd></div>
          <div><dt>Estado</dt><dd><span className="estado estado-disponible">Disponible</span></dd></div>
        </dl>

        <section className="ofertas" id="ofertar">
          <h3>Ofertas recibidas</h3>
          <ul className="ofertas-lista">
            <li className="oferta-card">
              <div className="oferta-info">
                <p className="oferta-comprador">Frutas del Sur S.A. de C.V. ✓ Verificado</p>
                <p className="oferta-precio">$18.50/kg por 1,500 kg</p>
                <p className="oferta-total">Total: $27,750 MXN</p>
              </div>
              <nav className="oferta-acciones">
                <a href="#" className="btn btn-primary">Aceptar</a>
                <a href="#" className="btn btn-secondary">Rechazar</a>
              </nav>
            </li>
            <li className="oferta-card">
              <div className="oferta-info">
                <p className="oferta-comprador">Mercado Central Guadalajara</p>
                <p className="oferta-precio">$17.80/kg por 2,000 kg</p>
                <p className="oferta-total">Total: $35,600 MXN</p>
              </div>
              <nav className="oferta-acciones">
                <a href="#" className="btn btn-primary">Aceptar</a>
                <a href="#" className="btn btn-secondary">Rechazar</a>
              </nav>
            </li>
          </ul>

          <form className="formulario-oferta" aria-label="Hacer una oferta">
            <h4>Hacer una oferta</h4>
            <div className="campo">
              <label htmlFor="ofertaPrecio">Tu precio (MXN/kg) *</label>
              <input type="number" id="ofertaPrecio" name="ofertaPrecio" min="16" step="0.01" placeholder="Mínimo $16.00" required />
            </div>
            <div className="campo">
              <label htmlFor="ofertaCantidad">Cantidad (kg) *</label>
              <input type="number" id="ofertaCantidad" name="ofertaCantidad" min="1" max="2000" step="1" placeholder="Máx. 2,000 kg" required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Enviar oferta</button>
          </form>
        </section>

        <section className="contacto">
          <h3>Contactar al productor</h3>
          <a href="https://wa.me/521331234567?text=Hola%2C%20vi%20tu%20lote%20de%20lim%C3%B3n%20en%20AgroLink%20y%20me%20interesa" target="_blank" rel="noopener" className="btn btn-whatsapp btn-lg">
            <span>💬</span> WhatsApp
          </a>
        </section>
      </article>
    </div>
  )
}