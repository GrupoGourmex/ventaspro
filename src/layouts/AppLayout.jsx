import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Componentes
import { Sidebar } from '../components/Sidebar'

// Vistas Admin
import { DashboardAdmin } from '../views/admin/DashboardAdmin'
import { CargaDiaria } from '../views/admin/CargaDiaria'
import { ResumenSemanal } from '../views/admin/ResumenSemanal'

// Vistas Telemarketing
import { DashboardTelemarketing } from '../views/telemarketing/DashboardTelemarketing'

// Vistas Ejecutivo
import { DashboardEjecutivo } from '../views/ejecutivo/DashboardEjecutivo'

// Vistas compartidas
import { Vendedores } from '../views/Vendedores'
import { Actividades } from '../views/Actividades'
import { Metas } from '../views/Metas'
import { Gamificacion } from '../views/Gamificacion'

export const AppLayout = () => {
  const { role, profile } = useAuthStore()
  const [activeView, setActiveView] = useState('dashboard')

  useEffect(() => {
    if (role === 'admin' || role === 'director') {
      setActiveView('dashboard-admin')
    } else if (role === 'telemarketing') {
      setActiveView('dashboard-telemarketing')
    } else if (role === 'ejecutivo_ventas') {
      setActiveView('dashboard-ejecutivo')
    }
  }, [role])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        role={role}
        profile={profile}
      />

      {/* Main Content - Responsive padding */}
      <div className="lg:ml-64 min-h-screen">
        {/* Padding top for mobile menu button */}
        <main className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <Routes>
            {/* Rutas Admin */}
            {(role === 'admin' || role === 'director') && (
              <>
                <Route path="dashboard-admin" element={<DashboardAdmin />} />
                <Route path="carga-diaria" element={<CargaDiaria />} />
                <Route path="resumen-semanal" element={<ResumenSemanal />} />
                <Route path="vendedores" element={<Vendedores />} />
                <Route path="gamificacion" element={<Gamificacion />} />
              </>
            )}

            {/* Rutas Telemarketing */}
            {role === 'telemarketing' && (
              <>
                <Route path="dashboard-telemarketing" element={<DashboardTelemarketing />} />
              </>
            )}

            {/* Rutas Ejecutivo */}
            {role === 'ejecutivo_ventas' && (
              <>
                <Route path="dashboard-ejecutivo" element={<DashboardEjecutivo />} />
                <Route path="actividades" element={<Actividades />} />
                <Route path="metas" element={<Metas />} />
              </>
            )}

            {/* Redirect según rol */}
            <Route 
              path="/" 
              element={
                <Navigate 
                  to={
                    role === 'admin' || role === 'director' 
                      ? 'dashboard-admin' 
                      : role === 'telemarketing'
                      ? 'dashboard-telemarketing'
                      : 'dashboard-ejecutivo'
                  } 
                  replace 
                />
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}