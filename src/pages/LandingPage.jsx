import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, LogIn, UserPlus, TrendingUp, Users, FileText, Activity } from 'lucide-react'

export const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        {/* Header Corporativo */}
        <div className="text-center mb-12">
          {/* Logo y Branding */}
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Grupo Gourmex. 
              </h1>
              <p className="text-amber-400 text-sm font-medium">SaaS de gestion ventas</p>
            </div>
          </div>
          
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Sistema de Gestión Comercial - Plataforma integral para el control y análisis de operaciones de ventas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Card Principal - Acceso */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Acceso al Sistema</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold py-3.5 rounded-lg hover:shadow-xl hover:shadow-amber-600/30 transition-all flex items-center justify-center gap-2.5"
              >
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </button>

              <button
                onClick={() => navigate('/registro')}
                className="w-full bg-gray-700 border border-gray-600 text-gray-200 font-medium py-3.5 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2.5"
              >
                <UserPlus className="w-5 h-5" />
                Crear Nueva Cuenta
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-start gap-3 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-sm">ℹ️</span>
                </div>
                <div>
                  <p className="text-blue-300 text-sm font-medium mb-1">Nuevo Usuario</p>
                  <p className="text-blue-400/80 text-xs">
                    Si no tienes credenciales, solicita acceso a tu supervisor o al departamento de TI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Lateral - Módulos */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-amber-400 font-semibold text-sm mb-4 uppercase tracking-wide">
              Módulos del Sistema
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Dashboard Ejecutivo</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Gestión de Equipos</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FileText className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Control de Encuestas</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Activity className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Reportes en Vivo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Análisis en Tiempo Real</h4>
            <p className="text-gray-400 text-xs">Métricas y KPIs actualizados</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Gestión de Equipos</h4>
            <p className="text-gray-400 text-xs">Control integral de vendedores</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Reportería Avanzada</h4>
            <p className="text-gray-400 text-xs">Exportación y análisis de datos</p>
          </div>
        </div>

        {/* Footer Corporativo */}
        <div className="text-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm font-medium">
            © 2026 Grupo Gourmex - Royal Prestige
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Sistema Interno de Gestión Comercial | Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  )
}