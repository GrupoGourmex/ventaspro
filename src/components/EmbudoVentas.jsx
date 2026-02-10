import React from 'react'
import { Users, Calendar, Presentation, DollarSign } from 'lucide-react'

export const EmbudoVentas = ({ data }) => {
  const etapas = [
    { 
      nombre: 'Encuestas', 
      valor: data.encuestas || 0, 
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      nombre: 'Citas Agendadas', 
      valor: data.citasAgendadas || 0, 
      icon: Calendar,
      color: 'from-green-500 to-green-600'
    },
    { 
      nombre: 'Presentaciones', 
      valor: data.presentaciones || 0, 
      icon: Presentation,
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      nombre: 'Ventas', 
      valor: data.ventas || 0, 
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600'
    },
  ]

  const maxValor = Math.max(...etapas.map(e => e.valor))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Embudo de Ventas</h3>
      
      <div className="space-y-3 sm:space-y-4">
        {etapas.map((etapa, index) => {
          const Icon = etapa.icon
          const porcentaje = maxValor > 0 ? (etapa.valor / maxValor) * 100 : 0
          const conversion = index > 0 && etapas[index - 1].valor > 0
            ? Math.round((etapa.valor / etapas[index - 1].valor) * 100)
            : 100

          return (
            <div key={etapa.nombre} className="relative">
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${etapa.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 text-xs sm:text-sm truncate">{etapa.nombre}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-bold text-gray-900 text-sm sm:text-lg">{etapa.valor}</span>
                  {index > 0 && (
                    <span className="text-xs text-gray-500 ml-1 sm:ml-2">({conversion}%)</span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${etapa.color} transition-all duration-500 rounded-full`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}