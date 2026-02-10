import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Loader } from 'lucide-react'

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role, loading, initAuth } = useAuthStore()
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
          <p className="text-gray-400">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Redirigir a login si no está autenticado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar roles permitidos
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Acceso Denegado</h2>
          <p className="text-gray-300 mb-4">
            No tienes permisos para acceder a esta sección.
          </p>
          <p className="text-sm text-gray-400">
            Tu rol: <span className="font-semibold text-white">{role}</span>
          </p>
        </div>
      </div>
    )
  }

  return children
}