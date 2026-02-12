import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Auth
import { LoginPage } from '../pages/LoginPage'

// Protected
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AppLayout } from '../layouts/AppLayout'

export const AppRouter = () => {
  const { user } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/app" replace /> : <LoginPage />} 
        />

        {/* App Principal */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />

        {/* Redirect */}
        <Route 
          path="/" 
          element={<Navigate to={user ? "/app" : "/login"} replace />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}