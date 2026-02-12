import React, { useState, useEffect } from 'react'
import { resumenSemanalAPI, getSemanaActual, getRangoSemana } from '../../lib/supabase'
import { KPICard } from '../../components/KPICard'
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

export const ResumenSemanal = () => {
  const [semanaActual, setSemanaActual] = useState(getSemanaActual())
  const [resumen, setResumen] = useState([])
  const [loading, setLoading] = useState(true)
  const [rangoFechas, setRangoFechas] = useState(null)

  useEffect(() => {
    cargarResumen()
  }, [semanaActual])

  const cargarResumen = async () => {
    setLoading(true)
    try {
      const data = await resumenSemanalAPI.getPorEquipos(semanaActual.semana, semanaActual.año)
      setResumen(data)
      
      const rango = getRangoSemana(semanaActual.semana, semanaActual.año)
      setRangoFechas(rango)
    } catch (error) {
      console.error('Error cargando resumen:', error)
    } finally {
      setLoading(false)
    }
  }

  const cambiarSemana = (direccion) => {
    const nuevaSemana = semanaActual.semana + direccion
    if (nuevaSemana < 1) {
      setSemanaActual({ semana: 52, año: semanaActual.año - 1 })
    } else if (nuevaSemana > 52) {
      setSemanaActual({ semana: 1, año: semanaActual.año + 1 })
    } else {
      setSemanaActual({ ...semanaActual, semana: nuevaSemana })
    }
  }

  // Calcular totales globales
  const totales = resumen.reduce((acc, r) => ({
    encuestas: acc.encuestas + (r.total_encuestas || 0),
    citas_agendadas: acc.citas_agendadas + (r.total_citas_agendadas || 0),
    citas_realizadas: acc.citas_realizadas + (r.total_citas_realizadas || 0),
    ventas: acc.ventas + (r.total_ventas || 0),
    ingresos: acc.ingresos + (r.total_ingresos || 0),
    canceladas: acc.canceladas + (r.total_citas_canceladas || 0)
  }), {
    encuestas: 0,
    citas_agendadas: 0,
    citas_realizadas: 0,
    ventas: 0,
    ingresos: 0,
    canceladas: 0
  })

  // Calcular tasas globales
  const tasaConversionGlobal = totales.citas_realizadas > 0 
    ? Math.round((totales.ventas / totales.citas_realizadas) * 100) 
    : 0
  
  const showRateGlobal = totales.citas_agendadas > 0
    ? Math.round((totales.citas_realizadas / totales.citas_agendadas) * 100)
    : 0
  
  const tasaCancelacionGlobal = totales.citas_agendadas > 0
    ? Math.round((totales.canceladas / totales.citas_agendadas) * 100)
    : 0
  
  const ticketPromedio = totales.ventas > 0
    ? Math.round(totales.ingresos / totales.ventas)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header con Selector de Semana */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Resumen Semanal</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Análisis consolidado por equipo
            </p>
          </div>

          {/* Navegación de Semanas */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => cambiarSemana(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 sm:px-6 py-3 rounded-lg text-center min-w-[200px]">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Calendar className="w-5 h-5" />
                <span className="font-bold text-lg">Semana {semanaActual.semana}</span>
              </div>
              <p className="text-xs">{semanaActual.año}</p>
              {rangoFechas && (
                <p className="text-xs mt-1">
                  {new Date(rangoFechas.inicio).toLocaleDateString('es-MX')} - {new Date(rangoFechas.fin).toLocaleDateString('es-MX')}
                </p>
              )}
            </div>

            <button
              onClick={() => cambiarSemana(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* KPIs Globales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard
          title="Total Encuestas"
          value={totales.encuestas}
          icon={Users}
          color="blue"
          subtitle={`${resumen.length} equipos activos`}
        />
        <KPICard
          title="Citas Realizadas"
          value={totales.citas_realizadas}
          icon={CheckCircle}
          color="green"
          subtitle={`${totales.citas_agendadas} agendadas`}
        />
        <KPICard
          title="Ventas Totales"
          value={totales.ventas}
          icon={Target}
          color="purple"
          subtitle={`Conversión ${tasaConversionGlobal}%`}
        />
        <KPICard
          title="Ingresos Totales"
          value={totales.ingresos}
          icon={DollarSign}
          color="yellow"
          format="currency"
          subtitle={`Ticket $${ticketPromedio.toLocaleString()}`}
        />
      </div>

      {/* Indicadores de Rendimiento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Show Rate Global</h3>
            {showRateGlobal >= 70 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className={`text-3xl sm:text-4xl font-bold ${
            showRateGlobal >= 70 ? 'text-green-600' : 'text-red-600'
          }`}>
            {showRateGlobal}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totales.citas_realizadas} de {totales.citas_agendadas} citas
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Tasa de Conversión</h3>
            {tasaConversionGlobal >= 25 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-orange-600" />
            )}
          </div>
          <p className={`text-3xl sm:text-4xl font-bold ${
            tasaConversionGlobal >= 25 ? 'text-green-600' : 'text-orange-600'
          }`}>
            {tasaConversionGlobal}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totales.ventas} ventas / {totales.citas_realizadas} citas
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Tasa de Cancelación</h3>
            {tasaCancelacionGlobal <= 30 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className={`text-3xl sm:text-4xl font-bold ${
            tasaCancelacionGlobal <= 30 ? 'text-green-600' : 'text-red-600'
          }`}>
            {tasaCancelacionGlobal}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totales.canceladas} canceladas / {totales.citas_agendadas} agendadas
          </p>
        </div>
      </div>

      {/* Tabla por Equipos - Desktop */}
      <div className="bg-white rounded-xl shadow-sm border hidden lg:block overflow-x-auto">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900">Rendimiento por Equipo</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Días Registrados</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Encuestas</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Citas</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Show Rate</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ventas</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Conversión</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cancelación</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resumen.map((equipo) => {
              const cancelacion = equipo.tasa_cancelacion || 0
              const conversion = equipo.tasa_conversion || 0
              const showRate = equipo.show_rate || 0

              const estadoEquipo = 
                conversion >= 30 && cancelacion <= 30 && showRate >= 70 ? 'excelente' :
                conversion >= 20 && cancelacion <= 40 ? 'bueno' :
                'necesita_apoyo'

              return (
                <tr key={equipo.equipo_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">Equipo {equipo.numero_equipo}</p>
                      <p className="text-xs text-gray-500">{equipo.nombre_equipo}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {equipo.dias_registrados || 0}/7
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-blue-600">{equipo.total_encuestas || 0}</p>
                      <p className="text-xs text-gray-500">
                        ~{Math.round(equipo.promedio_encuestas_diarias || 0)}/día
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-green-600">{equipo.total_citas_realizadas || 0}</p>
                      <p className="text-xs text-gray-500">
                        de {equipo.total_citas_agendadas || 0}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-semibold ${
                      showRate >= 70 ? 'text-green-600' :
                      showRate >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {showRate.toFixed(0)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-purple-600">{equipo.total_ventas || 0}</p>
                      <p className="text-xs text-gray-500">
                        ~{(equipo.promedio_ventas_diarias || 0).toFixed(1)}/día
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-semibold ${
                      conversion >= 30 ? 'text-green-600' :
                      conversion >= 20 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {conversion.toFixed(0)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-semibold ${
                      cancelacion <= 30 ? 'text-green-600' :
                      cancelacion <= 40 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {cancelacion.toFixed(0)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        ${(equipo.total_ingresos || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Ticket ${(equipo.ticket_promedio || 0).toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      estadoEquipo === 'excelente' ? 'bg-green-100 text-green-800' :
                      estadoEquipo === 'bueno' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {estadoEquipo === 'excelente' ? '⭐ Excelente' :
                       estadoEquipo === 'bueno' ? '👍 Bueno' :
                       '⚠️ Necesita Apoyo'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Cards por Equipo - Mobile */}
      <div className="lg:hidden space-y-4">
        {resumen.map((equipo) => {
          const cancelacion = equipo.tasa_cancelacion || 0
          const conversion = equipo.tasa_conversion || 0
          const showRate = equipo.show_rate || 0

          const estadoEquipo = 
            conversion >= 30 && cancelacion <= 30 && showRate >= 70 ? 'excelente' :
            conversion >= 20 && cancelacion <= 40 ? 'bueno' :
            'necesita_apoyo'

          return (
            <div key={equipo.equipo_id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">Equipo {equipo.numero_equipo}</h4>
                  <p className="text-xs text-gray-500">{equipo.nombre_equipo}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  estadoEquipo === 'excelente' ? 'bg-green-100 text-green-800' :
                  estadoEquipo === 'bueno' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {estadoEquipo === 'excelente' ? '⭐' :
                   estadoEquipo === 'bueno' ? '👍' :
                   '⚠️'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Encuestas</p>
                  <p className="font-bold text-blue-600">{equipo.total_encuestas || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Citas</p>
                  <p className="font-bold text-green-600">{equipo.total_citas_realizadas || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Ventas</p>
                  <p className="font-bold text-purple-600">{equipo.total_ventas || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Conversión</p>
                  <p className={`font-bold ${
                    conversion >= 30 ? 'text-green-600' :
                    conversion >= 20 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {conversion.toFixed(0)}%
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 text-xs">Ingresos</p>
                  <p className="font-bold text-gray-900">${(equipo.total_ingresos || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alertas */}
      {resumen.some(e => (e.tasa_conversion || 0) < 20 || (e.tasa_cancelacion || 0) > 40) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-900">Equipos que requieren atención</h3>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                {resumen.filter(e => (e.tasa_conversion || 0) < 20).map(e => (
                  <li key={e.equipo_id}>
                    • Equipo {e.numero_equipo}: Conversión baja ({e.tasa_conversion?.toFixed(0)}%)
                  </li>
                ))}
                {resumen.filter(e => (e.tasa_cancelacion || 0) > 40).map(e => (
                  <li key={e.equipo_id}>
                    • Equipo {e.numero_equipo}: Alta cancelación ({e.tasa_cancelacion?.toFixed(0)}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}