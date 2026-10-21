import { useState } from 'react'

export function ComparadorMargen() {
  const [datos, setDatos] = useState({
    precioCoyote: '',
    precioOferta: '',
    cantidadKg: '',
    comisionPct: '5',
    tieneAdelanto: false,
    montoAdelanto: '',
  })

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  const calcular = () => {
    const coyote = parseFloat(datos.precioCoyote) || 0
    const oferta = parseFloat(datos.precioOferta) || 0
    const cantidad = parseFloat(datos.cantidadKg) || 0
    const comision = parseFloat(datos.comisionPct) || 0
    const adelanto = datos.tieneAdelanto ? (parseFloat(datos.montoAdelanto) || 0) : 0

    if (!coyote || !oferta || !cantidad) return null

    const ingresoCoyote = coyote * cantidad
    const ingresoBrutoAgroLink = oferta * cantidad
    const comisionMonto = ingresoBrutoAgroLink * (comision / 100)
    const ingresoNetoAgroLink = ingresoBrutoAgroLink - comisionMonto - adelanto
    const diferencia = ingresoNetoAgroLink - ingresoCoyote
    const pctMejora = ingresoCoyote > 0 ? ((diferencia / ingresoCoyote) * 100) : 0

    return {
      ingresoCoyote,
      ingresoBrutoAgroLink,
      comisionMonto,
      ingresoNetoAgroLink,
      adelanto,
      diferencia,
      pctMejora,
    }
  }

  const resultado = calcular()

  return (
    <div className="page comparador">
      <header className="page-header">
        <h1>Comparador de margen</h1>
      </header>

      <section className="calculadora">
        <h2>Ingresa tus números</h2>
        <form className="formulario" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Referencia: lo que te paga el coyote</legend>
            <div className="campo">
              <label htmlFor="precioCoyote">Precio coyote (MXN/kg) *</label>
              <input
                type="number"
                id="precioCoyote"
                name="precioCoyote"
                min="0.01"
                step="0.01"
                value={datos.precioCoyote}
                onChange={manejarCambio}
                placeholder="Ej: 10.00"
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Oferta en AgroLink</legend>
            <div className="campo">
              <label htmlFor="precioOferta">Precio oferta (MXN/kg) *</label>
              <input
                type="number"
                id="precioOferta"
                name="precioOferta"
                min="0.01"
                step="0.01"
                value={datos.precioOferta}
                onChange={manejarCambio}
                placeholder="Ej: 18.50"
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="cantidadKg">Cantidad (kg) *</label>
              <input
                type="number"
                id="cantidadKg"
                name="cantidadKg"
                min="1"
                step="1"
                value={datos.cantidadKg}
                onChange={manejarCambio}
                placeholder="Ej: 2000"
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="comisionPct">Comisión simulada AgroLink (%)</label>
              <input
                type="number"
                id="comisionPct"
                name="comisionPct"
                min="0"
                max="20"
                step="0.5"
                value={datos.comisionPct}
                onChange={manejarCambio}
                defaultValue="5"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Adelanto con intermediario (opcional)</legend>
            <label className="checkbox-campo">
              <input
                type="checkbox"
                name="tieneAdelanto"
                checked={datos.tieneAdelanto}
                onChange={(e) => setDatos({ ...datos, tieneAdelanto: e.target.checked })}
              />
              <span>Tengo un adelanto con mi intermediario actual</span>
            </label>
            {datos.tieneAdelanto && (
              <div className="campo">
                <label htmlFor="montoAdelanto">Monto del adelanto (MXN)</label>
                <input
                  type="number"
                  id="montoAdelanto"
                  name="montoAdelanto"
                  min="0"
                  step="100"
                  value={datos.montoAdelanto}
                  onChange={manejarCambio}
                  placeholder="Ej: 15000"
                />
                <p className="ayuda">Se descuenta de tu ingreso neto en AgroLink para comparar justo.</p>
              </div>
            )}
          </fieldset>

          <button type="button" className="btn btn-primary btn-lg" onClick={calcular}>
            Calcular
          </button>
        </form>
      </section>

      {resultado && (
        <section className="resultado" aria-live="polite">
          <h2>Resultado</h2>

          <div className="comparativa">
            <article className="tarjeta coyote">
              <h3>Con el coyote</h3>
              <p className="monto-grande">${resultado.ingresoCoyote.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              <p className="detalle">${datos.precioCoyote}/kg × {datos.cantidadKg} kg</p>
            </article>

            <article className="tarjeta agrolink">
              <h3>Con AgroLink (simulado)</h3>
              <p className="monto-grande">${resultado.ingresoNetoAgroLink.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              <dl className="desglose">
                <div><dt>Bruto</dt><dd>${resultado.ingresoBrutoAgroLink.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</dd></div>
                <div><dt>Comisión ({datos.comisionPct}%)</dt><dd>-${resultado.comisionMonto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</dd></div>
                {resultado.adelanto > 0 && (
                  <div><dt>Adelanto a descontar</dt><dd>-${resultado.adelanto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</dd></div>
                )}
              </dl>
            </article>
          </div>

          <div className="conclusion">
            {resultado.diferencia > 0 ? (
              <div className="ganancia">
                <span className="icono">✅</span>
                <div>
                  <p>Ganas <strong>${resultado.diferencia.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</strong> más con AgroLink</p>
                  <p className="pct">({resultado.pctMejora.toFixed(1)}% de mejora)</p>
                </div>
              </div>
            ) : resultado.diferencia < 0 ? (
              <div className="perdida">
                <span className="icono">⚠️</span>
                <div>
                  <p>Pierdes <strong>${Math.abs(resultado.diferencia).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</strong> vs. el coyote</p>
                  <p className="pct">({Math.abs(resultado.pctMejora).toFixed(1)}% menos)</p>
                </div>
              </div>
            ) : (
              <div className="empate">
                <span className="icono">➖</span>
                <p>Sale igual. La comisión y el adelanto equilibran la diferencia.</p>
              </div>
            )}
          </div>

          <details className="nota-legal">
            <summary>⚠️ Importante: simulación, no asesoría financiera</summary>
            <p>Este comparador usa una comisión simulada ({datos.comisionPct}%) y no considera costos de flete, empaque, ni riesgos. Los precios del coyote varían por región y temporada. Valida con datos reales antes de decidir.</p>
          </details>
        </section>
      )}
    </div>
  )
}