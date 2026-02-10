import React from 'react'
import { MetricCard } from '../components/MetricCard'
import { EquipoCard } from '../components/EquipoCard'
import { ChartSection } from '../components/ChartSection'
import { AlertCircle, TrendingUp } from 'lucide-react'

export const Dashboard = ({ ventas }) => {
  // Calcular totales
  const totales = ventas.reduce((acc, v) => ({
    agendadas: acc.agendadas + v.citas_agendadas,
    realizadas: acc.realizadas + v.citas_realizadas,
    canceladas: acc.canceladas + v.citas_canceladas,
    ventas: acc.ventas + v.ventas,
    encuestas: acc.encuestas + v.encuestas,
    recomendados: acc.recomendados + v.recomendados,
  }), {
    agendadas: 0,
    realizadas: 0,
    canceladas: 0,
    ventas: 0,
    encuestas: 0,
    recomendados: 0,
  })

  const tasaCancelacionTotal = totales.agendadas > 0 
    ? Math.round((totales.canceladas / totales.agendadas) * 100) 
    : 0

  const tasaConversionTotal = totales.realizadas > 0
    ? Math.round((totales.ventas / totales.realizadas) * 100)
    : 0

  const metaEncuestasTotal = 60 * 8
  const equiposConProblemas = ventas.filter(v => {
    const tasaCancelacion = v.citas_agendadas > 0 
      ? (v.citas_canceladas / v.citas_agendadas) * 100 
      : 0
    return tasaCancelacion > 30 || v.encuestas < 60
  }).length

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {(tasaCancelacionTotal > 30 || totales.encuestas < metaEncuestasTotal) && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-lg">⚠️ Alertas Críticas</h3>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                {tasaCancelacionTotal > 30 && (
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Tasa de cancelación global: <strong>{tasaCancelacionTotal}%</strong> (máximo: 30%)
                  </li>
                )}
                {totales.encuestas < metaEncuestasTotal && (
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Encuestas: <strong>{totales.encuestas}/{metaEncuestasTotal}</strong> (faltan {metaEncuestasTotal - totales.encuestas})
                  </li>
                )}
                {equiposConProblemas > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <strong>{equiposConProblemas}</strong> equipo(s) con bajo rendimiento
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Agendadas" 
          value={totales.agendadas} 
        />
        <MetricCard 
          title="Total Realizadas" 
          value={totales.realizadas} 
        />
        <MetricCard 
          title="Tasa de Cancelación" 
          value={tasaCancelacionTotal} 
          suffix="%"
          target={30}
          type={tasaCancelacionTotal > 30 ? 'danger' : 'success'}
        />
        <MetricCard 
          title="Total Ventas" 
          value={totales.ventas} 
          type="success"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Encuestas" 
          value={totales.encuestas} 
          target={metaEncuestasTotal}
          type={totales.encuestas >= metaEncuestasTotal ? 'success' : 'warning'}
        />
        <MetricCard 
          title="Tasa de Conversión" 
          value={tasaConversionTotal} 
          suffix="%"
        />
        <MetricCard 
          title="Total Recomendados" 
          value={totales.recomendados} 
        />
      </div>

      {/* Gráficas */}
      <ChartSection ventas={ventas} />

      {/* Equipos */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Desempeño por Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ventas.map((venta) => (
            <EquipoCard key={venta.id} equipo={venta} />
          ))}
        </div>
      </div>
    </div>
  )
}