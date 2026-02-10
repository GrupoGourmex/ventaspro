import React, { useState } from 'react'
import { Target, Plus, Calendar, TrendingUp, Award } from 'lucide-react'

export const Metas = () => {
  const [metas] = useState([
    {
      id: 1,
      titulo: 'Meta Mensual de Ventas',
      tipo: 'ventas',
      objetivo: 15,
      progreso: 8,
      periodo: 'Mensual',
      fechaFin: '2026-02-28',
      recompensa: '$2,000 MXN bono'
    },
    {
      id: 2,
      titulo: 'Encuestas Semanales',
      tipo: 'encuestas',
      objetivo: 60,
      progreso: 45,
      periodo: 'Semanal',
      fechaFin: '2026-02-09',
      recompensa: 'Reconocimiento en grupo'
    },
    {
      id: 3,
      titulo: 'Tasa de Conversión 30%',
      tipo: 'conversion',
      objetivo: 30,
      progreso: 25,
      periodo: 'Mensual',
      fechaFin: '2026-02-28',
      recompensa: 'Premio especial'
    }
  ])

  const getProgresoColor = (progreso, objetivo) => {
    const porcentaje = (progreso / objetivo) * 100
    if (porcentaje >= 100) return 'from-green-500 to-green-600'
    if (porcentaje >= 70) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  const getProgresoTexto = (progreso, objetivo) => {
    const porcentaje = Math.round((progreso / objetivo) * 100)
    if (porcentaje >= 100) return '¡Meta Cumplida! 🎉'
    if (porcentaje >= 70) return 'Cerca de la meta'
    return 'En progreso'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Metas</h1>
          <p className="text-gray-600 mt-1">Sigue tu progreso y alcanza tus objetivos</p>
        </div>
        <button className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-600/50 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Meta
        </button>
      </div>

      {/* Resumen Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Metas Activas</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Metas Completadas</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Progreso Promedio</p>
              <p className="text-3xl font-bold text-yellow-600">59%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metas.map(meta => {
          const porcentaje = Math.round((meta.progreso / meta.objetivo) * 100)
          
          return (
            <div key={meta.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{meta.titulo}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {meta.periodo} - Termina {new Date(meta.fechaFin).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  porcentaje >= 100 ? 'bg-green-100 text-green-800' :
                  porcentaje >= 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {meta.periodo}
                </span>
              </div>

              {/* Progreso */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {getProgresoTexto(meta.progreso, meta.objetivo)}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {meta.progreso} / {meta.objetivo}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgresoColor(meta.progreso, meta.objetivo)} transition-all duration-500`}
                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{porcentaje}% completado</p>
              </div>

              {/* Recompensa */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">🏆 Recompensa:</p>
                <p className="text-sm font-semibold text-gray-900">{meta.recompensa}</p>
              </div>

              {/* Falta */}
              {meta.progreso < meta.objetivo && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-600">
                    Faltan <span className="font-bold text-red-600">{meta.objetivo - meta.progreso}</span> para completar
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}