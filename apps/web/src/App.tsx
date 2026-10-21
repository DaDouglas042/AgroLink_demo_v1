import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Lotes } from '@/pages/Lotes'
import { PublicarLote } from '@/pages/PublicarLote'
import { DetalleLote } from '@/pages/DetalleLote'
import { MisPedidos } from '@/pages/MisPedidos'
import { ComparadorMargen } from '@/pages/ComparadorMargen'
import { Perfil } from '@/pages/Perfil'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lotes" element={<Lotes />} />
        <Route path="lotes/publicar" element={<PublicarLote />} />
        <Route path="lotes/:id" element={<DetalleLote />} />
        <Route path="pedidos" element={<MisPedidos />} />
        <Route path="comparador" element={<ComparadorMargen />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>
    </Routes>
  )
}