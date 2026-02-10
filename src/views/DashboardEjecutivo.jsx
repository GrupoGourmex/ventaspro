import React from 'react'
import { useDashboard } from '../hooks/useDashboard'
import { KPICard } from '../components/KPICard'
import { EmbudoVentas } from '../components/EmbudoVentas'
import { TopVendedores } from '../components/TopVendedores'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Target,
  Award
} from 'lucide-react'

export const DashboardEjecutivo = () => {
  const { resumen, topVendedores, bottomVendedores, loading } = useDashboard()

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Ejecutivo</h1>
        <p className="text-gray-600 mt-1">Vista general del rendimiento del equipo</p>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Vendedores Activos"
          value={resumen?.total_vendedores_activos || 0}
          icon={Users}
          color="blue"
          subtitle="En el sistema"
        />
        <KPICard
          title="Citas Esta Semana"
          value={resumen?.citas_semana || 0}
          icon={Calendar}
          color="green"
          trend="up"
          trendValue="+12% vs sem. anterior"
        />
        <KPICard
          title="Ventas Esta Semana"
          value={resumen?.ventas_semana || 0}
          icon={Target}
          color="purple"
          trend="up"
          trendValue="+8%"
        />
        <KPICard
          title="Ingresos Semana"
          value={resumen?.ingresos_semana || 0}
          icon={DollarSign}
          color="yellow"
          format="currency"
        />
      </div>

      {/* Segunda fila de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Ingresos del Mes"
          value={resumen?.ingresos_mes || 0}
          icon={TrendingUp}
          color="green"
          format="currency"
          subtitle="Acumulado mensual"
        />
        <KPICard
          title="Ticket Promedio"
          value={resumen?.ticket_promedio || 0}
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
    </div>
  )
}