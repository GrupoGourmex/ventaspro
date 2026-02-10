import React from 'react'
import { Trophy, Award, Medal, TrendingUp } from 'lucide-react'

export const TopVendedores = ({ vendedores, tipo = 'top' }) => {
  const iconos = [Trophy, Award, Medal]
  const colores = [
    'from-yellow-400 to-yellow-500',
    'from-gray-300 to-gray-400',
    'from-orange-400 to-orange-500'
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          {tipo === 'top' ? '🏆 Top Vendedores' : '⚠️ Necesitan Apoyo'}
        </h3>
        <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${tipo === 'top' ? 'text-green-600' : 'text-red-600'}`} />
      </div>

      <div className="space-y-2 sm:space-y-3">
        {vendedores.slice(0, 5).map((vendedor, index) => {
          const Icon = iconos[index] || Medal
          const colorGradient = colores[index] || 'from-gray-400 to-gray-500'

          return (
            <div 
              key={vendedor.id}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center flex-shrink-0`}>
                {index < 3 ? (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                  {vendedor.nombre_completo}
                </p>
                <p className="text-xs text-gray-500">
                  Equipo {vendedor.numero_equipo}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  {vendedor.ventas_total}
                </p>
                <p className="text-xs text-gray-500">ventas</p>
              </div>

              <div className="text-right hidden sm:block flex-shrink-0">
                <p className="font-bold text-green-600 text-sm">
                  ${(vendedor.ingresos_total || 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">ingresos</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}