import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Public Pages
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegistroPage } from '../pages/RegistroPage'

// Protected Components
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AppLayout } from '../layouts/AppLayout'

export const AppRouter = () => {
  const { user } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/app" replace /> : <LandingPage />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/app" replace /> : <LoginPage />} 
        />
        <Route 
          path="/registro" 
          element={user ? <Navigate to="/app" replace /> : <RegistroPage />} 
        />

        {/* Rutas Protegidas - App Principal */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />

        {/* Catch all - Redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}