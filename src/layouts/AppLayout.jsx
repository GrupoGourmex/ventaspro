import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Sidebar } from '../components/Sidebar'

// Importa tus componentes reales
import { DashboardAdmin } from '../views/admin/DashboardAdmin'
import { Vendedores } from '../views/Vendedores'
import { Gamificacion } from '../views/Gamificacion'

import { DashboardEjecutivo } from '../views/ejecutivo/DashboardEjecutivo'
import { Actividades } from '../views/Actividades'
import { Metas } from '../views/Metas'

import { DashboardTelemarketing } from '../views/telemarketing/DashboardTelemarketing'


export const AppLayout = () => {
  const location = useLocation()
  const { role } = useAuthStore()
  const [activeView, setActiveView] = useState('')

  useEffect(() => {
    const path = location.pathname.split('/').pop()
    setActiveView(path || 'dashboard')
  }, [location])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-1 ml-64 p-8">
        <Routes>
          {role === 'admin' && (
            <>
              <Route path="dashboard-admin" element={<DashboardAdmin />} />
              <Route path="vendedores" element={<Vendedores />} />
              <Route path="gamificacion" element={<Gamificacion />} />
              <Route path="*" element={<Navigate to="/app/dashboard-admin" replace />} />
            </>
          )}
          
          {role === 'ejecutivo_ventas' && (
            <>
              <Route path="dashboard-ejecutivo" element={<DashboardEjecutivo />} />
              <Route path="actividades" element={<Actividades />} />
              <Route path="metas" element={<Metas />} />
              <Route path="*" element={<Navigate to="/app/dashboard-ejecutivo" replace />} />
            </>
          )}
          
          {role === 'telemarketing' && (
            <>
              <Route path="dashboard-telemarketing" element={<DashboardTelemarketing />} />
              <Route path="encuestas" element={<Encuestas />} />
              <Route path="calidad" element={<Calidad />} />
              <Route path="*" element={<Navigate to="/app/dashboard-telemarketing" replace />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  )
}