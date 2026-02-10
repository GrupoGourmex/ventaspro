import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { BarChart3, Mail, Lock, AlertCircle, Loader } from 'lucide-react'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(formData.email, formData.password)
      navigate('/app')
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Header Corporativo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Grupo Gourmex
              </h1>
              <p className="text-amber-400 text-sm font-medium">Gestor de Ventas</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
          <p className="text-gray-400">Accede a tu cuenta corporativa</p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="correo@grupogourmex.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold py-3.5 rounded-lg hover:shadow-xl hover:shadow-amber-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center space-y-2">
            <p className="text-sm text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Solicitar acceso
              </Link>
            </p>
            <Link to="/" className="block text-sm text-gray-500 hover:text-gray-400 transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <p className="text-xs text-blue-300 mb-2 font-semibold">🔐 Credenciales de Prueba</p>
          <div className="text-xs text-blue-400/90 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Admin:</span>
              <span className="font-mono">admin@ventaspro.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Ejecutivo:</span>
              <span className="font-mono">ejecutivo@ventaspro.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Telemarketing:</span>
              <span className="font-mono">telemarketing@ventaspro.com</span>
            </div>
            <p className="text-gray-500 text-center mt-2 pt-2 border-t border-blue-800/30">
              Contraseña: <span className="font-mono text-blue-400">admin123 / ejecutivo123 / telemarketing123</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 Grupo Gourmex - Royal Prestige | Sistema Interno
          </p>
        </div>
      </div>
    </div>
  )
}