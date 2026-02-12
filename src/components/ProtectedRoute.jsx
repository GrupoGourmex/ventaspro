import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Loader } from 'lucide-react'

export const ProtectedRoute = ({ children }) => {
  const { user, loading, initAuth } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    if (!user && !loading) {
      initAuth()
    }
  }, [user, loading, initAuth])

  // Mostrar loading mientras se verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  // Redirigir a login si no está autenticado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}