import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  BarChart3, 
  Mail, 
  Lock, 
  User, 
  Phone,
  AlertCircle, 
  Loader,
  CheckCircle
} from 'lucide-react'

export const RegistroPage = () => {
  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre_completo: '',
    telefono: '',
    rol: 'ejecutivo_ventas' // Por defecto
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      // Obtener nombre del rol según el rol seleccionado
      const roleMapping = {
        'admin': 'admin',
        'ejecutivo_ventas': 'ejecutivo_ventas',
        'telemarketing': 'telemarketing'
      }

      await signUp(formData.email, formData.password, {
        nombre_completo: formData.nombre_completo,
        telefono: formData.telefono,
        rol: roleMapping[formData.rol]
      })

      setSuccess(true)
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta')
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-green-900/20 border border-green-500/50 rounded-xl p-8 text-center shadow-2xl">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">¡Cuenta Creada Exitosamente!</h2>
          <p className="text-gray-300 mb-4">Tu registro ha sido completado correctamente.</p>
          <p className="text-sm text-gray-400">Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
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
              <p className="text-amber-400 text-sm font-medium">Gestión de ventas</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Crear Nueva Cuenta</h2>
          <p className="text-gray-400">Completa el formulario para unirte al equipo</p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Grid de 2 columnas para campos principales */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Nombre Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="3312345678"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico Corporativo
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

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Cuenta
              </label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              >
                <option value="ejecutivo_ventas">Ejecutivo de Ventas</option>
                <option value="telemarketing">Telemarketing</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {/* Grid de 2 columnas para contraseñas */}
            <div className="grid md:grid-cols-2 gap-5">
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
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Repite tu contraseña"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold py-3.5 rounded-lg hover:shadow-xl hover:shadow-amber-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center space-y-2">
            <p className="text-sm text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
            <Link to="/" className="block text-sm text-gray-500 hover:text-gray-400 transition-colors">
              ← Volver al inicio
            </Link>
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