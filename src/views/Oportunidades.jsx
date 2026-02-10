import React from 'react'
import { Target, TrendingUp, Award, Zap } from 'lucide-react'

export const Oportunidades = ({ ventas }) => {
  const oportunidades = ventas.map(v => {
    const tasaConversion = v.citas_realizadas > 0
      ? Math.round((v.ventas / v.citas_realizadas) * 100)
      : 0

    const tasaCancelacion = v.citas_agendadas > 0 
      ? Math.round((v.citas_canceladas / v.citas_agendadas) * 100) 
      : 0

    const areas = []

    // Oportunidad: Buenos recomendados pero pocas citas
    if (v.recomendados >= 3 && v.citas_agendadas < 5) {
      areas.push({
        titulo: 'Aprovechar Recomendaciones',
        detalle: `${v.recomendados} recomendados disponibles, pero solo ${v.citas_agendadas} citas agendadas`,
        accion: 'Contactar recomendados y agendar más citas',
        impacto: 'alto',
        icon: Zap
      })
    }

    // Oportunidad: Alta conversión
    if (tasaConversion >= 50 && v.citas_realizadas > 0) {
      areas.push({
        titulo: 'Equipo con Alta Conversión',
        detalle: `${tasaConversion}% de conversión - Mejor que el promedio`,
        accion: 'Aumentar volumen de citas para maximizar ventas',
        impacto: 'alto',
        icon: Award
      })
    }

    // Oportunidad: Baja cancelación
    if (tasaCancelacion < 15 && v.citas_agendadas >= 3) {
      areas.push({
        titulo: 'Excelente Retención',
        detalle: `Solo ${tasaCancelacion}% de cancelación`,
        accion: 'Compartir mejores prácticas con otros equipos',
        impacto: 'medio',
        icon: TrendingUp
      })
    }

    // Oportunidad: Muchas encuestas
    if (v.encuestas >= 60) {
      areas.push({
        titulo: 'Meta de Encuestas Cumplida',
        detalle: `${v.encuestas} encuestas completadas`,
        accion: 'Enfocarse en seguimiento y conversión',
        impacto: 'medio',
        icon: Target
      })
    }

    return {
      equipo: v.equipos?.numero_equipo,
      areas
    }
  }).filter(e => e.areas.length > 0)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Áreas de Oportunidad
        </h2>
        <p className="text-gray-600">
          Identificación de fortalezas y oportunidades de crecimiento
        </p>
      </div>

      {oportunidades.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Sin Oportunidades Destacadas
          </h3>
          <p className="text-blue-700">
            Los equipos están en un rango de desempeño estándar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {oportunidades.map((equipo) => (
            <div key={equipo.equipo} className="bg-white rounded-lg shadow-md border-2 border-green-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Equipo {equipo.equipo}
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {equipo.areas.length} oportunidad(es)
                </span>
              </div>

              <div className="space-y-3">
                {equipo.areas.map((area, idx) => {
                  const Icon = area.icon
                  const colorClass = {
                    alto: 'bg-green-50 border-green-300 text-green-800',
                    medio: 'bg-blue-50 border-blue-300 text-blue-800'
                  }[area.impacto]

                  return (
                    <div key={idx} className={`border-l-4 p-4 rounded ${colorClass}`}>
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{area.titulo}</h4>
                          <p className="text-sm mt-1">{area.detalle}</p>
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs font-medium">💡 Acción recomendada:</p>
                            <p className="text-xs mt-1">{area.accion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}