export function Perfil() {
  return (
    <div className="page perfil">
      <header className="page-header">
        <h1>Mi perfil</h1>
      </header>

      <section className="perfil-header">
        <div className="avatar-placeholder">JP</div>
        <div>
          <h2>Juan Pérez</h2>
          <p className="rol-badge productor">Productor</p>
        </div>
      </section>

      <section className="perfil-seccion">
        <h3>Información de cuenta</h3>
        <dl className="info-lista">
          <div><dt>Correo</dt><dd>juan.perez@ejemplo.com</dd></div>
          <div><dt>Teléfono</dt><dd>+52 33 1234 5678</dd></div>
          <div><dt>Ubicación</dt><dd>Zapotlán el Grande, Jalisco</dd></div>
          <div><dt>Registro</dt><dd>15 oct 2026</dd></div>
        </dl>
      </section>

      <section className="perfil-seccion">
        <h3>Estadísticas</h3>
        <ul className="stats">
          <li><strong>3</strong> lotes publicados</li>
          <li><strong>2</strong> pedidos completados</li>
          <li><strong>4.8</strong> ⭐ calificación promedio</li>
        </ul>
      </section>

      <section className="perfil-seccion">
        <h3>Configuración</h3>
        <ul className="config-lista">
          <li>
            <a href="#" className="config-enlace">
              <span>🔔</span> Notificaciones y alertas de precio
            </a>
          </li>
          <li>
            <a href="#" className="config-enlace">
              <span>🌙</span> Modo oscuro
            </a>
          </li>
          <li>
            <a href="#" className="config-enlace">
              <span>💾</span> Datos guardados y modo sin señal
            </a>
          </li>
          <li>
            <a href="#" className="config-enlace peligro">
              <span>🗑️</span> Eliminar cuenta
            </a>
          </li>
        </ul>
      </section>

      <section className="perfil-seccion">
        <h3>Ayuda y legal</h3>
        <ul className="config-lista">
          <li><a href="#" className="config-enlace">❓ Preguntas frecuentes</a></li>
          <li><a href="#" className="config-enlace">📄 Términos y condiciones</a></li>
          <li><a href="#" className="config-enlace">🔒 Privacidad</a></li>
          <li><a href="#" className="config-enlace">📧 Contactar soporte</a></li>
        </ul>
      </section>

      <div className="version">AgroLink v0.1.0-demo</div>
    </div>
  )
}