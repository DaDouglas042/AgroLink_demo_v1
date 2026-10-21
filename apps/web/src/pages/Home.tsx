export function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <h1>Vende tu cosecha directo al comprador</h1>
        <p className="subtitle">
          Bolsa de cosechas con garantía de pago simulada, confirmación de peso
          por ambas partes y funciona aunque falle la señal.
        </p>
        <nav className="hero-actions">
          <a href="/lotes/publicar" className="btn btn-primary btn-lg">
            <span>📦</span> Publicar mi lote
          </a>
          <a href="/lotes" className="btn btn-secondary btn-lg">
            <span>🔍</span> Ver lotes disponibles
          </a>
        </nav>
      </section>

      <section className="features">
        <article className="feature">
          <span className="feature-icon">🛡️</span>
          <h3>Garantía simulada</h3>
          <p>El pago se retiene hasta que ambos confirman el peso. Sin dinero real, solo la experiencia.</p>
        </article>
        <article className="feature">
          <span className="feature-icon">⚖️</span>
          <h3>Peso confirmado</h3>
          <p>Productor y comprador registran el peso. Si difieren, se abre disputa para resolverla.</p>
        </article>
        <article className="feature">
          <span className="feature-icon">📶</span>
          <h3>Modo sin señal</h3>
          <p>Instala como app, ve lo último cargado y encola acciones para cuando vuelva la conexión.</p>
        </article>
        <article className="feature">
          <span className="feature-icon">💰</span>
          <h3>Comparador de margen</h3>
          <p>Ve cuánto ganarías vendiendo directo vs. el precio del coyote, con comisión simulada.</p>
        </article>
      </section>

      <section className="how-it-works">
        <h2>Cómo funciona</h2>
        <ol className="steps">
          <li>
            <span className="step-number">1</span>
            <div>
              <h4>Publicas tu lote</h4>
              <p>Producto, cantidad, calidad, ubicación y precio mínimo en menos de 2 minutos.</p>
            </div>
          </li>
          <li>
            <span className="step-number">2</span>
            <div>
              <h4>Recibes ofertas</h4>
              <p>Compradores ofrecen precio y cantidad. Tú eliges la mejor.</p>
            </div>
          </li>
          <li>
            <span className="step-number">3</span>
            <div>
              <h4>Se pacta y retiene pago</h4>
              <p>El comprador "deposita" (simulado) y el pedido avanza a PagoRetenido.</p>
            </div>
          </li>
          <li>
            <span className="step-number">4</span>
            <div>
              <h4>Cargas y confirman peso</h4>
              <p>Tú marcas la carga; ambos registran peso. Si coincide → se libera el pago.</p>
            </div>
          </li>
          <li>
            <span className="step-number">5</span>
            <div>
              <h4>Califican y cierran</h4>
              <p>Ambos califican la experiencia. Reputación para futuras transacciones.</p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  )
}