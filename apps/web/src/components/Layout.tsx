import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Layout.css'

export function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const location = useLocation()

  const navegacion = [
    { ruta: '/lotes', etiqueta: 'Lotes', icono: '📦' },
    { ruta: '/pedidos', etiqueta: 'Pedidos', icono: '📋' },
    { ruta: '/comparador', etiqueta: 'Comparador', icono: '💰' },
    { ruta: '/perfil', etiqueta: 'Perfil', icono: '👤' },
  ]

  return (
    <div className="layout">
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
      </header>

      <nav className={`nav ${menuAbierto ? 'abierto' : ''}`} role="navigation" aria-label="Navegación principal">
        <ul className="nav-lista">
          {navegacion.map((item) => (
            <li key={item.ruta}>
              <NavLink
                to={item.ruta}
                className={({ isActive }) => `nav-enlace ${isActive ? 'activo' : ''}`}
                onClick={() => setMenuAbierto(false)}
              >
                <span className="nav-icon">{item.icono}</span>
                <span>{item.etiqueta}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/lotes/publicar" className="nav-enlace primario" onClick={() => setMenuAbierto(false)}>
              <span className="nav-icon">➕</span>
              <span>Publicar lote</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="main" role="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>AgroLink — Bolsa de cosechas con garantía simulada</p>
      </footer>
    </div>
  )
}