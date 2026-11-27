import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Layout.css'

export function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const location = useLocation()

  // Cierra el menú móvil al cambiar de pantalla
  useEffect(() => {
    setMenuAbierto(false)
  }, [location.pathname])

  const navegacion = [
    { ruta: '/lotes', etiqueta: 'Lotes', icono: '📦' },
    { ruta: '/pedidos', etiqueta: 'Pedidos', icono: '📋' },
    { ruta: '/comparador', etiqueta: 'Comparador', icono: '💰' },
    { ruta: '/perfil', etiqueta: 'Perfil', icono: '👤' },
  ]

  return (
    <div className="layout">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="header">
        <button
          className="menu-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
        <NavLink to="/" className="logo" aria-label="AgroLink - Inicio">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">AgroLink</span>
        </NavLink>

        <nav
          className={`nav ${menuAbierto ? 'abierto' : ''}`}
          role="navigation"
          aria-label="Navegación principal"
        >
          <ul className="nav-lista">
            {navegacion.map((item) => (
              <li key={item.ruta}>
                <NavLink
                  to={item.ruta}
                  className={({ isActive }) => `nav-enlace ${isActive ? 'activo' : ''}`}
                  onClick={() => setMenuAbierto(false)}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.icono}
                  </span>
                  <span>{item.etiqueta}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/lotes/publicar"
                className="nav-enlace primario"
                onClick={() => setMenuAbierto(false)}
              >
                <span className="nav-icon" aria-hidden="true">
                  ➕
                </span>
                <span>Publicar lote</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main" id="contenido" role="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>
          AgroLink — Bolsa de cosechas con garantía simulada · Ambiente:{' '}
          <strong>{(import.meta.env.VITE_APP_ENV || 'local').toUpperCase()}</strong>
        </p>
      </footer>
    </div>
  )
}