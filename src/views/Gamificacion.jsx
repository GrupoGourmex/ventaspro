import React from 'react'
import { useVendedores } from '../hooks/useVendedores'
import { Trophy, Medal, Award, Star, TrendingUp, Flame } from 'lucide-react'
import clsx from 'clsx'

export const Gamificacion = () => {
  const { vendedores, loading } = useVendedores()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  // Ordenar vendedores por puntos (simulados basados en ventas)
  const rankingVendedores = [...vendedores]
    .sort((a, b) => (b.ventas_total || 0) - (a.ventas_total || 0))
    .map((v, index) => ({
      ...v,
      posicion: index + 1,
      puntos: (v.ventas_total || 0) * 100 + (v.ingresos_total || 0) / 100,
      racha: Math.floor(Math.random() * 10) + 1 // Simulado
    }))

  const getPosicionIcon = (posicion) => {
    if (posicion === 1) return Trophy
    if (posicion === 2) return Award
    if (posicion === 3) return Medal
    return Star
  }

  const getPosicionColor = (posicion) => {
    if (posicion === 1) return 'from-yellow-400 to-yellow-500'
    if (posicion === 2) return 'from-gray-300 to-gray-400'
    if (posicion === 3) return 'from-orange-400 to-orange-500'
    return 'from-blue-400 to-blue-500'
  }

  const getInsignias = (vendedor) => {
    const insignias = []
    
    if (vendedor.ventas_total >= 10) {
      insignias.push({ nombre: 'Vendedor Estrella', icon: '⭐', color: 'bg-yellow-100 text-yellow-800' })
    }
    if ((vendedor.tasa_conversion || 0) >= 30) {
      insignias.push({ nombre: 'Cerrador Pro', icon: '🎯', color: 'bg-green-100 text-green-800' })
    }
    if ((vendedor.show_rate || 0) >= 80) {
      insignias.push({ nombre: 'Asistencia Perfecta', icon: '✅', color: 'bg-blue-100 text-blue-800' })
    }
    if (vendedor.racha >= 7) {
      insignias.push({ nombre: 'Racha de Fuego', icon: '🔥', color: 'bg-red-100 text-red-800' })
    }
    
    return insignias
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🏆 Ranking y Gamificación</h1>
        <p className="text-gray-600 mt-1">Compite con tu equipo y gana recompensas</p>
      </div>

      {/* Podium Top 3 */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Podium de la Semana</h2>
        
        <div className="flex items-end justify-center gap-4 mb-6">
          {/* Segundo Lugar */}
          {rankingVendedores[1] && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mb-3 border-4 border-white shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <div className="bg-white rounded-lg p-4 text-center min-w-[140px] shadow-xl">
                <p className="font-bold text-gray-900 mb-1">{rankingVendedores[1].nombre_completo}</p>
                <p className="text-sm text-gray-600 mb-2">Equipo {rankingVendedores[1].numero_equipo}</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-lg text-gray-900">
                    {Math.round(rankingVendedores[1].puntos)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{rankingVendedores[1].ventas_total} ventas</p>
              </div>
              <div className="w-full bg-gradient-to-br from-gray-300 to-gray-400 h-24 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
            </div>
          )}

          {/* Primer Lugar */}
          {rankingVendedores[0] && (
            <div className="flex flex-col items-center -mt-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mb-3 border-4 border-white shadow-2xl animate-pulse">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              <div className="bg-white rounded-lg p-4 text-center min-w-[160px] shadow-2xl">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-2xl">👑</span>
                  <p className="font-bold text-gray-900">{rankingVendedores[0].nombre_completo}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">Equipo {rankingVendedores[0].numero_equipo}</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-2xl text-gray-900">
                    {Math.round(rankingVendedores[0].puntos)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{rankingVendedores[0].ventas_total} ventas</p>
              </div>
              <div className="w-full bg-gradient-to-br from-yellow-400 to-yellow-500 h-32 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-white">1</span>
              </div>
            </div>
          )}

          {/* Tercer Lugar */}
          {rankingVendedores[2] && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-3 border-4 border-white shadow-lg">
                <Medal className="w-12 h-12 text-white" />
              </div>
              <div className="bg-white rounded-lg p-4 text-center min-w-[140px] shadow-xl">
                <p className="font-bold text-gray-900 mb-1">{rankingVendedores[2].nombre_completo}</p>
                <p className="text-sm text-gray-600 mb-2">Equipo {rankingVendedores[2].numero_equipo}</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-lg text-gray-900">
                    {Math.round(rankingVendedores[2].puntos)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{rankingVendedores[2].ventas_total} ventas</p>
              </div>
              <div className="w-full bg-gradient-to-br from-orange-400 to-orange-500 h-20 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ranking Completo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Ranking General</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {rankingVendedores.map((vendedor) => {
            const Icon = getPosicionIcon(vendedor.posicion)
            const colorGradient = getPosicionColor(vendedor.posicion)
            const insignias = getInsignias(vendedor)

            return (
              <div 
                key={vendedor.id}
                className={clsx(
                  "p-6 hover:bg-gray-50 transition-colors",
                  vendedor.posicion <= 3 && "bg-yellow-50/30"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Posición */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center flex-shrink-0`}>
                    {vendedor.posicion <= 3 ? (
                      <Icon className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold text-lg">{vendedor.posicion}</span>
                    )}
                  </div>

                  {/* Info Vendedor */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {vendedor.nombre_completo}
                      </h4>
                      {vendedor.racha >= 7 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-full">
                          <Flame className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-semibold text-red-800">{vendedor.racha} días</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Equipo {vendedor.numero_equipo}</p>
                    
                    {/* Insignias */}
                    {insignias.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {insignias.map((insignia, idx) => (
                          <span 
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full font-medium ${insignia.color}`}
                          >
                            {insignia.icon} {insignia.nombre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Métricas */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{vendedor.ventas_total}</p>
                      <p className="text-xs text-gray-500">Ventas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${Math.round(vendedor.ingresos_total || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Ingresos</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <p className="text-2xl font-bold text-yellow-600">
                          {Math.round(vendedor.puntos)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">Puntos</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Premios y Recompensas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">1er Lugar</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">$5,000 MXN</p>
          <p className="text-sm text-gray-600">Bono mensual + Reconocimiento</p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">2do Lugar</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">$3,000 MXN</p>
          <p className="text-sm text-gray-600">Bono mensual</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Medal className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">3er Lugar</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">$1,500 MXN</p>
          <p className="text-sm text-gray-600">Bono mensual</p>
        </div>
      </div>
    </div>
  )
}