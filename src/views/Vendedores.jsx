import React, { useState } from 'react'
import { useVendedores } from '../hooks/useVendedores'
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Award,
  AlertCircle,
  Search,
  Filter,
  Eye
} from 'lucide-react'
import clsx from 'clsx'

export const Vendedores = () => {
  const { vendedores, loading } = useVendedores()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEquipo, setFiltroEquipo] = useState('todos')
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  // Filtrar vendedores
  const vendedoresFiltrados = vendedores.filter(v => {
    const matchBusqueda = v.nombre_completo?.toLowerCase().includes(busqueda.toLowerCase()) ||
                          v.codigo_vendedor?.toLowerCase().includes(busqueda.toLowerCase())
    const matchEquipo = filtroEquipo === 'todos' || v.numero_equipo === parseInt(filtroEquipo)
    return matchBusqueda && matchEquipo
  })

  // Obtener equipos únicos
  const equipos = [...new Set(vendedores.map(v => v.numero_equipo))].filter(Boolean).sort()

  const getScoreColor = (vendedor) => {
    const score = vendedor.tasa_conversion || 0
    if (score >= 30) return 'text-green-600 bg-green-50'
    if (score >= 20) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getScoreIcon = (vendedor) => {
    const score = vendedor.tasa_conversion || 0
    if (score >= 30) return <TrendingUp className="w-5 h-5" />
    if (score >= 20) return <AlertCircle className="w-5 h-5" />
    return <TrendingDown className="w-5 h-5" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Vendedores</h1>
          <p className="text-gray-600 mt-1">Rendimiento individual y métricas detalladas</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-blue-900">{vendedores.length}</span>
          <span className="text-sm text-blue-600">Vendedores Activos</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Filtro de equipo */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filtroEquipo}
              onChange={(e) => setFiltroEquipo(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="todos">Todos los equipos</option>
              {equipos.map(eq => (
                <option key={eq} value={eq}>Equipo {eq}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600 mb-1">Promedio de Ventas</p>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(vendedores.reduce((sum, v) => sum + (v.ventas_total || 0), 0) / vendedores.length || 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600 mb-1">Conversión Promedio</p>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round(vendedores.reduce((sum, v) => sum + (v.tasa_conversion || 0), 0) / vendedores.length || 0)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600 mb-1">Show Rate Promedio</p>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(vendedores.reduce((sum, v) => sum + (v.show_rate || 0), 0) / vendedores.length || 0)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600 mb-1">Ingresos Totales</p>
          <p className="text-2xl font-bold text-purple-600">
            ${vendedores.reduce((sum, v) => sum + (v.ingresos_total || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tabla de Vendedores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipo
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citas Agendadas
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citas Realizadas
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Show Rate
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ventas
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversión
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingresos
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendedoresFiltrados.map((vendedor, index) => (
                <tr 
                  key={vendedor.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {vendedor.nombre_completo?.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vendedor.nombre_completo}
                        </div>
                        <div className="text-xs text-gray-500">
                          {vendedor.codigo_vendedor}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Equipo {vendedor.numero_equipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {vendedor.citas_agendadas || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-green-600">
                      {vendedor.citas_realizadas || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {vendedor.show_rate || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-purple-600">
                      {vendedor.ventas_total || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={clsx(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                      getScoreColor(vendedor)
                    )}>
                      {getScoreIcon(vendedor)}
                      <span>{vendedor.tasa_conversion || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-green-600">
                      ${(vendedor.ingresos_total || 0).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {vendedor.tasa_conversion >= 30 ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Excelente
                      </span>
                    ) : vendedor.tasa_conversion >= 20 ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Promedio
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Necesita Apoyo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setVendedorSeleccionado(vendedor)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 mx-auto"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalle (simplificado) */}
      {vendedorSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {vendedorSeleccionado.nombre_completo}
              </h3>
              <button
                onClick={() => setVendedorSeleccionado(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Citas Realizadas</p>
                <p className="text-2xl font-bold text-gray-900">{vendedorSeleccionado.citas_realizadas}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Ventas Totales</p>
                <p className="text-2xl font-bold text-purple-600">{vendedorSeleccionado.ventas_total}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Tasa de Conversión</p>
                <p className="text-2xl font-bold text-blue-600">{vendedorSeleccionado.tasa_conversion}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Ingresos Generados</p>
                <p className="text-2xl font-bold text-green-600">
                  ${(vendedorSeleccionado.ingresos_total || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}