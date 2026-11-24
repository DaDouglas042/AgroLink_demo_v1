import { useEffect, useState } from 'react'
import { leerPublicados, limpiarPublicados } from '@/data/lotes'
import { limpiarPedidos } from '@/data/pedidos'

type SeccionAyuda = 'faq' | 'terminos' | 'privacidad' | 'soporte'

const TEXTOS_AYUDA: Record<SeccionAyuda, string> = {
  faq: 'Las ofertas y los lotes se publican en este dispositivo (modo demo). El pago es simulado: no se mueve dinero real, solo se practica el flujo de garantía.',
  terminos: 'AgroLink es un prototipo escolar de demostración. No constituye una oferta de servicios reales ni establece contratos de compra-venta.',
  privacidad: 'Los datos de la demo se guardan localmente en tu navegador y no se envían a ningún servidor. Puedes borrarlos desde "Datos guardados".',
  soporte: 'Escríbenos al correo del equipo (demo). En la versión real habría chat y centro de ayuda dentro de la app.',
}

function aplicarTema(tema: 'claro' | 'oscuro') {
  document.documentElement.dataset.tema = tema
}

export function Perfil() {
  const [oscuro, setOscuro] = useState<boolean>(() => {
    try {
      return localStorage.getItem('agrolink.tema') === 'oscuro'
    } catch {
      return false
    }
  })
  const [notificaciones, setNotificaciones] = useState(true)
  const [sinSenal, setSinSenal] = useState(true)
  const [ayuda, setAyuda] = useState<SeccionAyuda | null>(null)
  const [confirmarBorrar, setConfirmarBorrar] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    aplicarTema(oscuro ? 'oscuro' : 'claro')
    try {
      localStorage.setItem('agrolink.tema', oscuro ? 'oscuro' : 'claro')
    } catch {
      /* noop */
    }
  }, [oscuro])

  const publicados = leerPublicados().length

  const borrarDatos = () => {
    limpiarPublicados()
    limpiarPedidos()
    setConfirmarBorrar(false)
    setMensaje('Datos de la demo borrados de este dispositivo.')
  }

  return (
    <div className="page perfil">
      <header className="page-header">
        <h1>Mi perfil</h1>
      </header>

      <section className="perfil-header">
        <div className="avatar-placeholder" aria-hidden="true">
          JP
        </div>
        <div>
          <h2>Juan Pérez</h2>
          <p className="rol-badge productor">Productor verificado</p>
        </div>
      </section>

      <p className="resultados-info" role="status" aria-live="polite">
        {mensaje}
      </p>

      <section className="perfil-seccion">
        <h3>Información de cuenta</h3>
        <dl className="info-lista">
          <div>
            <dt>Correo</dt>
            <dd>juan.perez@ejemplo.com</dd>
          </div>
          <div>
            <dt>Teléfono</dt>
            <dd className="numero">+52 33 1234 5678</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>Zapotlán el Grande, Jalisco</dd>
          </div>
          <div>
            <dt>Registro</dt>
            <dd>15 oct 2026</dd>
          </div>
        </dl>
      </section>

      <section className="perfil-seccion">
        <h3>Estadísticas</h3>
        <ul className="stats">
          <li>
            <strong>{3 + publicados}</strong> lotes publicados
          </li>
          <li>
            <strong>2</strong> pedidos completados
          </li>
          <li>
            <strong>4.8</strong> ⭐ calificación promedio
          </li>
        </ul>
      </section>

      <section className="perfil-seccion">
        <h3>Configuración</h3>
        <ul className="config-lista">
          <li>
            <button
              type="button"
              className="config-enlace"
              aria-pressed={notificaciones}
              onClick={() => {
                setNotificaciones((v) => !v)
                setMensaje(
                  notificaciones
                    ? 'Notificaciones de precio desactivadas.'
                    : 'Notificaciones de precio activadas.',
                )
              }}
            >
              <span aria-hidden="true">🔔</span>
              Notificaciones y alertas de precio
              <span className="config-valor">{notificaciones ? 'Activadas' : 'Desactivadas'}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="config-enlace"
              aria-pressed={oscuro}
              onClick={() => setOscuro((v) => !v)}
            >
              <span aria-hidden="true">🌙</span>
              Modo oscuro
              <span className="config-valor">{oscuro ? 'Activado' : 'Desactivado'}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="config-enlace"
              aria-pressed={sinSenal}
              onClick={() => {
                setSinSenal((v) => !v)
                setMensaje(
                  sinSenal
                    ? 'Modo sin señal desactivado: la app pedirá conexión para guardar.'
                    : 'Modo sin señal activado: los cambios se encolan y se envían al volver la red.',
                )
              }}
            >
              <span aria-hidden="true">💾</span>
              Datos guardados y modo sin señal
              <span className="config-valor">
                {sinSenal ? 'Activado' : 'Desactivado'} · {publicados} locales
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="config-enlace peligro"
              onClick={() => {
                if (confirmarBorrar) borrarDatos()
                else {
                  setConfirmarBorrar(true)
                  setMensaje('¿Seguro? Vuelve a presionar para borrar los datos de la demo.')
                }
              }}
            >
              <span aria-hidden="true">🗑️</span>
              {confirmarBorrar ? 'Confirmar borrado (demo)' : 'Eliminar datos de la demo'}
            </button>
          </li>
        </ul>
        {confirmarBorrar && (
          <button type="button" className="btn btn-secondary btn-cancelar" onClick={() => setConfirmarBorrar(false)}>
            Cancelar
          </button>
        )}
      </section>

      <section className="perfil-seccion">
        <h3>Ayuda y legal</h3>
        <ul className="config-lista">
          {(Object.keys(TEXTOS_AYUDA) as SeccionAyuda[]).map((clave) => (
            <li key={clave}>
              <button
                type="button"
                className="config-enlace"
                aria-expanded={ayuda === clave}
                onClick={() => setAyuda(ayuda === clave ? null : clave)}
              >
                <span aria-hidden="true">
                  {clave === 'faq'
                    ? '❓'
                    : clave === 'terminos'
                      ? '📄'
                      : clave === 'privacidad'
                        ? '🔒'
                        : '📧'}
                </span>
                {clave === 'faq'
                  ? 'Preguntas frecuentes'
                  : clave === 'terminos'
                    ? 'Términos y condiciones'
                    : clave === 'privacidad'
                      ? 'Privacidad'
                      : 'Contactar soporte'}
                <span className="config-valor">{ayuda === clave ? '−' : '+'}</span>
              </button>
              {ayuda === clave && (
                <p className="panel-ayuda" role="region">
                  {TEXTOS_AYUDA[clave]}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="version">AgroLink v0.2.0 · demo de pasarela final</div>
    </div>
  )
}
