import React from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export const EquipoCard = ({ equipo }) => {
  const {
    equipos,
    citas_agendadas,
    citas_realizadas,
    citas_canceladas,
    ventas,
    encuestas,
    recomendados,
    cita_directa,
    entregas
  } = equipo

  // Calcular métricas
  const tasaCancelacion = citas_agendadas > 0 
    ? Math.round((citas_canceladas / citas_agendadas) * 100) 
    : 0
  
  const tasaConversion = citas_realizadas > 0
    ? Math.round((ventas / citas_realizadas) * 100)
    : 0

  const metaEncuestas = 60
  const progresoEncuestas = Math.round((encuestas / metaEncuestas) * 100)

  // Alertas
  const cancelacionAlta = tasaCancelacion > 30
  const encuestasBajas = encuestas < metaEncuestas
  const sinVentas = ventas === 0 && citas_realizadas > 0

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Equipo {equipos?.numero_equipo}
        </h3>
        <div className="flex gap-2">
          {cancelacionAlta && (
            <AlertTriangle className="w-5 h-5 text-red-500" title="Cancelación alta" />
          )}
          {encuestasBajas && (
            <AlertTriangle className="w-5 h-5 text-yellow-500" title="Encuestas bajas" />
          )}
          {sinVentas && (
            <XCircle className="w-5 h-5 text-orange-500" title="Sin ventas" />
          )}
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Agendadas</p>
          <p className="text-2xl font-bold">{citas_agendadas}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Realizadas</p>
          <p className="text-2xl font-bold text-blue-600">{citas_realizadas}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Canceladas</p>
          <p className={`text-2xl font-bold ${cancelacionAlta ? 'text-red-600' : 'text-gray-900'}`}>
            {citas_canceladas}
          </p>
          <p className="text-xs text-gray-500">({tasaCancelacion}%)</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Ventas</p>
          <p className="text-2xl font-bold text-green-600">{ventas}</p>
          <p className="text-xs text-gray-500">({tasaConversion}% conv.)</p>
        </div>
      </div>

      {/* Encuestas - Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-medium text-gray-600">Encuestas</p>
          <p className="text-xs text-gray-500">
            {encuestas} / {metaEncuestas} ({progresoEncuestas}%)
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              progresoEncuestas >= 100 ? 'bg-green-500' :
              progresoEncuestas >= 70 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${Math.min(progresoEncuestas, 100)}%` }}
          />
        </div>
        {encuestas < metaEncuestas && (
          <p className="text-xs text-red-600 mt-1">
            Faltan {metaEncuestas - encuestas} encuestas
          </p>
        )}
      </div>

      {/* Otras métricas */}
      <div className="grid grid-cols-3 gap-2 text-center border-t pt-3">
        <div>
          <p className="text-xs text-gray-500">Recomendados</p>
          <p className="text-lg font-semibold">{recomendados}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Cita Directa</p>
          <p className="text-lg font-semibold">{cita_directa}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Entregas</p>
          <p className="text-lg font-semibold">{entregas}</p>
        </div>
      </div>
    </div>
  )
}