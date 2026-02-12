import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Componentes
import { Sidebar } from '../components/Sidebar'

// Vistas Admin
import { DashboardAdmin } from '../views/admin/DashboardAdmin'
import { CargaDiaria } from '../views/admin/CargaDiaria'
import { ResumenSemanal } from '../views/admin/ResumenSemanal'
import { Vendedores } from '../views/Vendedores'
import { Gamificacion } from '../views/Gamificacion'

export const AppLayout = () => {
  const { profile } = useAuthStore()
  const [activeView, setActiveView] = useState('dashboard-admin')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        profile={profile}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <Routes>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="carga-diaria" element={<CargaDiaria />} />
            <Route path="resumen-semanal" element={<ResumenSemanal />} />
            <Route path="vendedores" element={<Vendedores />} />
            <Route path="ranking" element={<Gamificacion />} />
            
            {/* Redirect por defecto */}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}