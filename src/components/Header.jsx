import React from 'react'
import { Calendar, RefreshCw } from 'lucide-react'
import { AlertasWidget } from './AlertasWidget'

export const Header = ({ semana, setSemana, año, setAño, onRefresh }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Análisis Semanal
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Rendimiento detallado por equipo
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Alertas */}
            <AlertasWidget />

            {/* Selector de período */}
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Semana:</span>
              <input
                type="number"
                value={semana}
                onChange={(e) => setSemana(parseInt(e.target.value))}
                min="1"
                max="53"
                className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-600">Año:</span>
              <input
                type="number"
                value={año}
                onChange={(e) => setAño(parseInt(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Botón refresh */}
            <button
              onClick={onRefresh}
              className="p-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-lg hover:shadow-lg hover:shadow-yellow-600/50 transition-all"
              title="Actualizar datos"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}