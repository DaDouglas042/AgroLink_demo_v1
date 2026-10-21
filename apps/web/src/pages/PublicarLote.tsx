import { useState } from 'react'

export function PublicarLote() {
  const [form, setForm] = useState({
    producto: '',
    cantidadKg: '',
    calidad: '',
    ubicacion: '',
    disponibleDesde: '',
    precioMinimo: '',
  })

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Publicar lote:', form)
    alert('Lote publicado (demo - pendiente de conectar con API)')
  }

  return (
    <div className="page publicar-lote">
      <header className="page-header">
        <h1>Publicar nuevo lote</h1>
      </header>

      <form onSubmit={manejarEnvio} className="formulario" noValidate>
        <fieldset>
          <legend>Información del producto</legend>

          <div className="campo">
            <label htmlFor="producto">Producto *</label>
            <select id="producto" name="producto" value={form.producto} onChange={manejarCambio} required>
              <option value="">Selecciona...</option>
              <option value="limon">Limón</option>
              <option value="aguacate">Aguacate</option>
              <option value="berries">Berries (fresa, arándano, frambuesa)</option>
              <option value="jitomate">Jitomate</option>
              <option value="cebolla">Cebolla</option>
              <option value="otros">Otro</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="cantidadKg">Cantidad (kg) *</label>
            <input
              type="number"
              id="cantidadKg"
              name="cantidadKg"
              min="1"
              step="1"
              value={form.cantidadKg}
              onChange={manejarCambio}
              placeholder="Ej: 2000"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="calidad">Calidad *</label>
            <select id="calidad" name="calidad" value={form.calidad} onChange={manejarCambio} required>
              <option value="">Selecciona...</option>
              <option value="exportacion">Exportación (calibre 1, >90%)</option>
              <option value="nacional-premium">Nacional premium</option>
              <option value="nacional-estandar">Nacional estándar</option>
              <option value="industrial">Industrial / procesamiento</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Ubicación y disponibilidad</legend>

          <div className="campo">
            <label htmlFor="ubicacion">Ubicación aproximada *</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={form.ubicacion}
              onChange={manejarCambio}
              placeholder="Municipio, Estado (ej: Zapotlán el Grande, Jalisco)"
              required
            />
            <p className="ayuda">No se muestra tu ubicación exacta, solo la zona general.</p>
          </div>

          <div className="campo">
            <label htmlFor="disponibleDesde">Disponible desde *</label>
            <input
              type="date"
              id="disponibleDesde"
              name="disponibleDesde"
              value={form.disponibleDesde}
              onChange={manejarCambio}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Precio</legend>

          <div className="campo">
            <label htmlFor="precioMinimo">Precio mínimo (MXN/kg) *</label>
            <input
              type="number"
              id="precioMinimo"
              name="precioMinimo"
              min="0.01"
              step="0.01"
              value={form.precioMinimo}
              onChange={manejarCambio}
              placeholder="Ej: 16.50"
              required
            />
            <p className="ayuda">Las ofertas deben ser iguales o superiores a este precio.</p>
          </div>
        </fieldset>

        <div className="formulario-acciones">
          <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            <span>📦</span> Publicar lote
          </button>
        </div>
      </form>
    </div>
  )
}