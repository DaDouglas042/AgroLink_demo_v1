import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  NOMBRE_PRODUCTO,
  formatearFecha,
  guardarPublicado,
  type Lote,
  type Producto,
} from '@/data/lotes'

type Campos = {
  producto: string
  cantidadKg: string
  calidad: string
  ubicacion: string
  disponibleDesde: string
  precioMinimo: string
}

const VACIO: Campos = {
  producto: '',
  cantidadKg: '',
  calidad: '',
  ubicacion: '',
  disponibleDesde: '',
  precioMinimo: '',
}

const NOMBRE_CALIDAD: Record<string, string> = {
  exportacion: 'Exportación (calibre 1, 90%+)',
  'nacional-premium': 'Nacional premium',
  'nacional-estandar': 'Nacional estándar',
  industrial: 'Industrial / procesamiento',
}

export function PublicarLote() {
  const [form, setForm] = useState<Campos>(VACIO)
  const [errores, setErrores] = useState<Partial<Record<keyof Campos, string>>>({})
  const [publicado, setPublicado] = useState<Lote | null>(null)

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrores((err) => ({ ...err, [name]: undefined }))
  }

  const validar = (): Partial<Record<keyof Campos, string>> => {
    const err: Partial<Record<keyof Campos, string>> = {}
    if (!form.producto) err.producto = 'Selecciona un producto.'
    const kg = Number(form.cantidadKg)
    if (!form.cantidadKg || Number.isNaN(kg) || kg < 1)
      err.cantidadKg = 'Indica una cantidad en kg mayor a 0.'
    if (!form.calidad) err.calidad = 'Selecciona la calidad.'
    if (!form.ubicacion.trim()) err.ubicacion = 'Indica municipio y estado.'
    if (!form.disponibleDesde) err.disponibleDesde = 'Elige la fecha de disponibilidad.'
    const precio = Number(form.precioMinimo)
    if (!form.precioMinimo || Number.isNaN(precio) || precio <= 0)
      err.precioMinimo = 'Fija un precio mínimo mayor a 0.'
    return err
  }

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validar()
    setErrores(err)
    if (Object.keys(err).length > 0) {
      // Enfoca el primer campo con error (los ids coinciden con los nombres)
      const primero = Object.keys(err)[0] as keyof Campos
      requestAnimationFrame(() => document.getElementById(primero)?.focus())
      return
    }

    const producto = form.producto as Producto
    const kg = Number(form.cantidadKg)
    const precio = Number(form.precioMinimo)
    const nuevo: Lote = {
      id: `mio-${Date.now()}`,
      producto,
      titulo: `${NOMBRE_PRODUCTO[producto]}, ${kg.toLocaleString('es-MX')} kg`,
      ubicacion: form.ubicacion.trim(),
      distanciaKm: 0,
      disponible: formatearFecha(form.disponibleDesde),
      precio,
      precioMin: precio,
      calidad: NOMBRE_CALIDAD[form.calidad] ?? form.calidad,
      publicadoPor: 'Tú (productor verificado)',
      hace: 'Recién publicado',
      mio: true,
    }
    guardarPublicado(nuevo)
    setPublicado(nuevo)
    setForm(VACIO)
  }

  if (publicado) {
    return (
      <div className="page publicar-lote">
        <header className="page-header">
          <h1>Publicar nuevo lote</h1>
        </header>

        <div className="exito-panel" role="status">
          <span className="exito-icono" aria-hidden="true">
            ✅
          </span>
          <h2>Lote publicado</h2>
          <p>
            <strong>{publicado.titulo}</strong> ya aparece en la bolsa con precio
            mínimo de ${publicado.precioMin.toFixed(2)}/kg (guardado en este
            dispositivo, modo demo).
          </p>
          <nav className="exito-acciones" aria-label="Siguientes pasos">
            <Link to={`/lotes/${publicado.id}`} className="btn btn-primary">
              Ver mi publicación
            </Link>
            <Link to="/lotes" className="btn btn-secondary">
              Ver todos los lotes
            </Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPublicado(null)}
            >
              Publicar otro lote
            </button>
          </nav>
        </div>
      </div>
    )
  }

  const err = (campo: keyof Campos): { 'aria-invalid'?: 'true'; 'aria-describedby'?: string } => ({
    'aria-invalid': errores[campo] ? 'true' : undefined,
    'aria-describedby': errores[campo] ? `error-${campo}` : undefined,
  })

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
            <select
              id="producto"
              name="producto"
              value={form.producto}
              onChange={manejarCambio}
              required
              {...err('producto')}
            >
              <option value="">Selecciona…</option>
              <option value="limon">Limón</option>
              <option value="aguacate">Aguacate</option>
              <option value="berries">Berries (fresa, arándano, frambuesa)</option>
              <option value="jitomate">Jitomate</option>
              <option value="cebolla">Cebolla</option>
              <option value="otros">Otro</option>
            </select>
            {errores.producto && (
              <p className="error-campo" id="error-producto">
                {errores.producto}
              </p>
            )}
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
              {...err('cantidadKg')}
            />
            {errores.cantidadKg && (
              <p className="error-campo" id="error-cantidadKg">
                {errores.cantidadKg}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="calidad">Calidad *</label>
            <select
              id="calidad"
              name="calidad"
              value={form.calidad}
              onChange={manejarCambio}
              required
              {...err('calidad')}
            >
              <option value="">Selecciona…</option>
              <option value="exportacion">Exportación (calibre 1, 90%+)</option>
              <option value="nacional-premium">Nacional premium</option>
              <option value="nacional-estandar">Nacional estándar</option>
              <option value="industrial">Industrial / procesamiento</option>
            </select>
            {errores.calidad && (
              <p className="error-campo" id="error-calidad">
                {errores.calidad}
              </p>
            )}
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
              {...err('ubicacion')}
            />
            <p className="ayuda">No se muestra tu ubicación exacta, solo la zona general.</p>
            {errores.ubicacion && (
              <p className="error-campo" id="error-ubicacion">
                {errores.ubicacion}
              </p>
            )}
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
              {...err('disponibleDesde')}
            />
            {errores.disponibleDesde && (
              <p className="error-campo" id="error-disponibleDesde">
                {errores.disponibleDesde}
              </p>
            )}
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
              {...err('precioMinimo')}
            />
            <p className="ayuda">Las ofertas deben ser iguales o superiores a este precio.</p>
            {errores.precioMinimo && (
              <p className="error-campo" id="error-precioMinimo">
                {errores.precioMinimo}
              </p>
            )}
          </div>
        </fieldset>

        <div className="formulario-acciones">
          <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            <span aria-hidden="true">📦</span> Publicar lote
          </button>
        </div>
      </form>
    </div>
  )
}
