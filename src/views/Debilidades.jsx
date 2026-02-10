import React from 'react'
import { AlertTriangle, TrendingDown, XCircle } from 'lucide-react'

export const Debilidades = ({ ventas }) => {
  // Identificar equipos con problemas
  const problemasEquipos = ventas.map(v => {
    const tasaCancelacion = v.citas_agendadas > 0 
      ? Math.round((v.citas_canceladas / v.citas_agendadas) * 100) 
      : 0
    
    const tasaConversion = v.citas_realizadas > 0
      ? Math.round((v.ventas / v.citas_realizadas) * 100)
      : 0

    const problemas = []
    
    if (tasaCancelacion > 30) {
      problemas.push({
        tipo: 'Cancelaciones Altas',
        nivel: 'critico',
        detalle: `${tasaCancelacion}% de cancelación (máx: 30%)`,
        icon: XCircle
      })
    }
    
    if (v.encuestas < 60) {
      problemas.push({
        tipo: 'Encuestas Insuficientes',
        nivel: 'alto',
        detalle: `${v.encuestas}/60 encuestas completadas`,
        icon: AlertTriangle
      })
    }
    
    if (v.ventas === 0 && v.citas_realizadas > 0) {
      problemas.push({
        tipo: 'Sin Conversión',
        nivel: 'alto',
        detalle: `${v.citas_realizadas} citas sin ventas`,
        icon: TrendingDown
      })
    }

    if (tasaConversion < 20 && v.citas_realizadas > 0) {
      problemas.push({
        tipo: 'Baja Conversión',
        nivel: 'medio',
        detalle: `${tasaConversion}% de conversión`,
        icon: TrendingDown
      })
    }

    return {
      equipo: v.equipos?.numero_equipo,
      problemas,
      tasaCancelacion,
      tasaConversion,
      encuestas: v.encuestas
    }
  }).filter(e => e.problemas.length > 0)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Identificación de Debilidades
        </h2>
        <p className="text-gray-600">
          Análisis de equipos con bajo rendimiento y áreas críticas
        </p>
      </div>

      {problemasEquipos.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingDown className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-900 mb-2">
            ¡Excelente Desempeño!
          </h3>
          <p className="text-green-700">
            No se han detectado debilidades críticas en ningún equipo
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problemasEquipos.map((equipo) => (
            <div key={equipo.equipo} className="bg-white rounded-lg shadow-md border-2 border-red-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Equipo {equipo.equipo}
                </h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {equipo.problemas.length} problema(s)
                </span>
              </div>

              <div className="space-y-3">
                {equipo.problemas.map((problema, idx) => {
                  const Icon = problema.icon
                  const colorClass = {
                    critico: 'bg-red-50 border-red-300 text-red-800',
                    alto: 'bg-orange-50 border-orange-300 text-orange-800',
                    medio: 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  }[problema.nivel]

                  return (
                    <div key={idx} className={`border-l-4 p-4 rounded ${colorClass}`}>
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">{problema.tipo}</h4>
                          <p className="text-sm mt-1">{problema.detalle}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Métricas del equipo */}
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Cancelación</p>
                  <p className="text-lg font-bold text-red-600">{equipo.tasaCancelacion}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversión</p>
                  <p className="text-lg font-bold text-orange-600">{equipo.tasaConversion}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Encuestas</p>
                  <p className="text-lg font-bold text-yellow-600">{equipo.encuestas}/60</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}