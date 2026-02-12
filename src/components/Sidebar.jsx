import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  LayoutDashboard, 
  Users,
  Trophy,
  LogOut,
  BarChart3,
  Menu,
  X,
  Upload,
  Calendar,
  TrendingUp
} from 'lucide-react'

export const Sidebar = ({ activeView, setActiveView, profile }) => {
  const navigate = useNavigate()
  const { signOut } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
    { id: 'carga-diaria', label: 'Carga Diaria', icon: Upload, path: '/app/carga-diaria' },
    { id: 'resumen-semanal', label: 'Resumen Semanal', icon: Calendar, path: '/app/resumen-semanal' },
    { id: 'vendedores', label: 'Vendedores', icon: Users, path: '/app/vendedores' },
    { id: 'ranking', label: 'Ranking', icon: Trophy, path: '/app/ranking' },
  ]

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handleMenuClick = (item) => {
    setActiveView(item.id)
    navigate(item.path)
    setIsOpen(false)
  }

  return (
    <>
      {/* Botón hamburguesa - Solo móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-black 
        shadow-2xl border-r border-yellow-600/20 overflow-y-auto z-40
        transition-transform duration-300 ease-in-out
        w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-yellow-600/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
                VentasPro
              </h1>
              <p className="text-xs text-gray-400">CRM de Ventas</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-3 lg:p-4 border-b border-yellow-600/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs lg:text-sm">
                {profile?.nombre_completo?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-semibold text-white truncate">
                {profile?.nombre_completo || 'Administrador'}
              </p>
              <p className="text-xs text-gray-400">Supervisor</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-3 lg:p-4 space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-600/50' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span className="font-medium text-xs lg:text-sm truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="p-3 lg:p-4 border-t border-yellow-600/20 mt-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-2">Accesos Rápidos</p>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleMenuClick({ id: 'carga-diaria', path: '/app/carga-diaria' })}
                className="w-full flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Upload className="w-3 h-3" />
                <span>Cargar datos hoy</span>
              </button>
              <button
                onClick={() => handleMenuClick({ id: 'resumen-semanal', path: '/app/resumen-semanal' })}
                className="w-full flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <TrendingUp className="w-3 h-3" />
                <span>Ver semana actual</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-yellow-600/20 bg-black">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
            <span className="font-medium text-xs lg:text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  )
}