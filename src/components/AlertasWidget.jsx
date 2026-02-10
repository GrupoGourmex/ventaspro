import React, { useState, useEffect } from 'react'
import { AlertCircle, X, Bell } from 'lucide-react'
import clsx from 'clsx'

export const AlertasWidget = ({ vendedorId }) => {
  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: 'sin_actividad',
      nivel: 'warning',
      titulo: 'Sin encuestas registradas',
      mensaje: 'No has registrado encuestas hoy. Es importante mantener actividad diaria.',
      leida: false
    },
    {
      id: 2,
      tipo: 'baja_conversion',
      nivel: 'critical',
      titulo: 'Tasa de conversión baja',
      mensaje: 'Tu tasa de conversión está por debajo del 20%. Considera solicitar coaching.',
      leida: false
    }
  ])

  const [mostrarAlertas, setMostrarAlertas] = useState(false)

  const alertasNoLeidas = alertas.filter(a => !a.leida).length

  const marcarLeida = (id) => {
    setAlertas(prev => prev.map(a => 
      a.id === id ? { ...a, leida: true } : a
    ))
  }

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800'
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800'
      default: return 'bg-blue-100 border-blue-500 text-blue-800'
    }
  }

  return (
    <div className="relative">
      {/* Botón de campana */}
      <button
        onClick={() => setMostrarAlertas(!mostrarAlertas)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        {alertasNoLeidas > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {alertasNoLeidas}
          </span>
        )}
      </button>

      {/* Panel de alertas */}
      {mostrarAlertas && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
            <h3 className="font-bold text-gray-900">Notificaciones</h3>
            <button
              onClick={() => setMostrarAlertas(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {alertas.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No tienes alertas</p>
              </div>
            ) : (
              alertas.map(alerta => (
                <div
                  key={alerta.id}
                  className={clsx(
                    "p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                    !alerta.leida && "bg-blue-50"
                  )}
                  onClick={() => marcarLeida(alerta.id)}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={clsx(
                      "w-5 h-5 flex-shrink-0 mt-0.5",
                      alerta.nivel === 'critical' && "text-red-600",
                      alerta.nivel === 'warning' && "text-yellow-600",
                      alerta.nivel === 'info' && "text-blue-600"
                    )} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        {alerta.titulo}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {alerta.mensaje}
                      </p>
                      {!alerta.leida && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          Nueva
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}