import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  LayoutDashboard, 
  Users,
  ClipboardList,
  Trophy,
  LogOut,
  BarChart3,
  FileSpreadsheet,
  UserCheck
} from 'lucide-react'

export const Sidebar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate()
  const { signOut, role, profile } = useAuthStore()

  // Menú según rol
  const getMenuItems = () => {
    if (role === 'admin' || role === 'director') {
      return [
        { id: 'dashboard-admin', label: 'Dashboard Admin', icon: LayoutDashboard, path: '/app/dashboard-admin' },
        { id: 'vendedores', label: 'Gestión Vendedores', icon: Users, path: '/app/vendedores' },
        { id: 'gamificacion', label: 'Ranking General', icon: Trophy, path: '/app/gamificacion' },
      ]
    }

    if (role === 'telemarketing') {
      return [
        { id: 'dashboard-telemarketing', label: 'Mi Dashboard', icon: LayoutDashboard, path: '/app/dashboard-telemarketing' },
        { id: 'encuestas', label: 'Gestión Encuestas', icon: FileSpreadsheet, path: '/app/encuestas' },
        { id: 'calidad', label: 'Control Calidad', icon: UserCheck, path: '/app/calidad' },
      ]
    }

    if (role === 'ejecutivo_ventas') {
      return [
        { id: 'dashboard-ejecutivo', label: 'Mi Dashboard', icon: LayoutDashboard, path: '/app/dashboard-ejecutivo' },
        { id: 'actividades', label: 'Mis Actividades', icon: ClipboardList, path: '/app/actividades' },
        { id: 'metas', label: 'Mis Metas', icon: Trophy, path: '/app/metas' },
      ]
    }

    return []
  }

  const menuItems = getMenuItems()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handleMenuClick = (item) => {
    setActiveView(item.id)
    navigate(item.path)
  }

  const getRoleDisplayName = () => {
    switch(role) {
      case 'ejecutivo_ventas': return 'Ejecutivo de Ventas'
      case 'admin': return 'Administrador'
      case 'telemarketing': return 'Telemarketing'
      case 'director': return 'Director'
      default: return 'Usuario'
    }
  }

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-gray-900 h-screen fixed left-0 top-0 shadow-2xl border-r border-gray-700 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Grupo Gourmex
            </h1>
            <p className="text-xs text-amber-400 font-medium">Gestión de Ventas</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">
              {profile?.nombre_completo?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {profile?.nombre_completo || 'Usuario'}
            </p>
            <p className="text-xs text-amber-400">
              {getRoleDisplayName()}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-600/30' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-amber-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Cerrar Sesión</span>
        </button>
        
        <div className="mt-3 pt-3 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600">© 2026 Grupo Gourmex</p>
        </div>
      </div>
    </div>
  )
}