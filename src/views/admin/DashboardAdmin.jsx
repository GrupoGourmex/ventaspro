import React from 'react'
import { useDashboard } from '../../hooks/useDashboard'
import { useVendedores } from '../../hooks/useVendedores'
import { KPICard } from '../../components/KPICard'
import { EmbudoVentas } from '../../components/EmbudoVentas'
import { TopVendedores } from '../../components/TopVendedores'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Target,
  Award,
  FileText,
  AlertTriangle
} from 'lucide-react'

export const DashboardAdmin = () => {
  const { resumen, topVendedores, bottomVendedores, loading } = useDashboard()
  const { vendedores } = useVendedores()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  const embudoData = {
    encuestas: 450,
    citasAgendadas: resumen?.citas_semana || 0,
    presentaciones: Math.round((resumen?.citas_semana || 0) * 0.7),
    ventas: resumen?.ventas_semana || 0
  }

  // Calcular alertas
  const vendedoresBajoRendimiento = vendedores.filter(v => 
    (v.tasa_conversion || 0) < 20 || (v.ventas_total || 0) === 0
  ).length

  const metaMensual = 120 // Meta de ventas del mes
  const ventasMes = resumen?.ventas_mes || 0
  const progresoMeta = Math.round((ventasMes / metaMensual) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-1">Vista general del negocio - Grupo Gourmex</p>
      </div>

      {/* Alertas Críticas */}
      {vendedoresBajoRendimiento > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-lg">⚠️ Atención Requerida</h3>
              <p className="text-sm text-red-700 mt-1">
                {vendedoresBajoRendimiento} vendedor(es) necesitan coaching urgente (conversión baja o sin ventas)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KPIs Principales - Fila 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Vendedores Activos"
          value={resumen?.total_vendedores_activos || 14}
          icon={Users}
          color="blue"
          subtitle="En el sistema"
        />
        <KPICard
          title="Citas Esta Semana"
          value={resumen?.citas_semana || 20}
          icon={Calendar}
          color="green"
          trend="up"
          trendValue="+12%"
        />
        <KPICard
          title="Ventas Esta Semana"
          value={resumen?.ventas_semana || 2}
          icon={Target}
          color="purple"
          trend="up"
          trendValue="+8%"
        />
        <KPICard
          title="Ingresos Semana"
          value={resumen?.ingresos_semana || 45000}
          icon={DollarSign}
          color="yellow"
          format="currency"
        />
      </div>

      {/* KPIs Secundarios - Fila 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Ingresos del Mes"
          value={resumen?.ingresos_mes || 180000}
          icon={TrendingUp}
          color="green"
          format="currency"
          subtitle="Acumulado mensual"
        />
        <KPICard
          title="Ticket Promedio"
          value={resumen?.ticket_promedio || 22500}
          icon={Award}
          color="orange"
          format="currency"
        />
        <KPICard
          title="Tasa de Conversión"
          value={25}
          icon={Target}
          color="blue"
          format="percentage"
          trend="up"
          trendValue="+3%"
        />
      </div>

      {/* Meta Mensual */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Meta Mensual de Ventas</h3>
            <p className="text-sm text-gray-600">Febrero 2026</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{ventasMes}/{metaMensual}</p>
            <p className="text-sm text-gray-600">{progresoMeta}% completado</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              progresoMeta >= 100 ? 'bg-green-500' :
              progresoMeta >= 70 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${Math.min(progresoMeta, 100)}%` }}
          />
        </div>
      </div>

      {/* Embudo y Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <EmbudoVentas data={embudoData} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopVendedores vendedores={topVendedores} tipo="top" />
          <TopVendedores vendedores={bottomVendedores} tipo="bottom" />
        </div>
      </div>

      {/* Métricas Detalladas por Equipo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Rendimiento por Equipo</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Vendedores</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Encuestas</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Citas</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ventas</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Conversión</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1,2,3,4,5,6,7,8].map(equipo => {
                const vendedoresEquipo = vendedores.filter(v => v.numero_equipo === equipo)
                const totalVentas = vendedoresEquipo.reduce((sum, v) => sum + (v.ventas_total || 0), 0)
                const totalIngresos = vendedoresEquipo.reduce((sum, v) => sum + (v.ingresos_total || 0), 0)
                const conversion = vendedoresEquipo.length > 0 
                  ? Math.round(vendedoresEquipo.reduce((sum, v) => sum + (v.tasa_conversion || 0), 0) / vendedoresEquipo.length)
                  : 0

                return (
                  <tr key={equipo} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-900">Equipo {equipo}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">
                      {vendedoresEquipo.length}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-blue-600">
                      {Math.floor(Math.random() * 100) + 50}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-green-600">
                      {Math.floor(Math.random() * 20) + 5}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-purple-600">
                      {totalVentas}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-semibold ${
                        conversion >= 30 ? 'text-green-600' :
                        conversion >= 20 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {conversion}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                      ${totalIngresos.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-xl transition-shadow">
          <FileText className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">Generar Reporte</h4>
          <p className="text-sm text-blue-100">Exportar datos a Excel</p>
        </button>

        <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-xl transition-shadow">
          <Users className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">Gestionar Equipos</h4>
          <p className="text-sm text-purple-100">Configurar vendedores</p>
        </button>

        <button className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl hover:shadow-xl transition-shadow">
          <Target className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">Definir Metas</h4>
          <p className="text-sm text-yellow-100">Establecer objetivos</p>
        </button>
      </div>
    </div>
  )
}