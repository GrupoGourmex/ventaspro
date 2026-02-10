import React, { useState } from 'react'
import { 
  FileSpreadsheet, 
  Upload, 
  Users, 
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  AlertCircle
} from 'lucide-react'

export const DashboardTelemarketing = () => {
  const [stats] = useState({
    encuestasCargadasHoy: 45,
    encuestasAsignadas: 38,
    encuestasPendientes: 7,
    tasaValidez: 92,
    encuestasSemana: 312,
    metaSemanal: 350
  })

  const progresoSemanal = Math.round((stats.encuestasSemana / stats.metaSemanal) * 100)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Telemarketing</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Gestión de encuestas y asignación a ejecutivos</p>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              HOY
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.encuestasCargadasHoy}</p>
          <p className="text-xs sm:text-sm text-gray-600">Encuestas Cargadas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{stats.encuestasAsignadas}</p>
          <p className="text-xs sm:text-sm text-gray-600">Asignadas a Ejecutivos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{stats.encuestasPendientes}</p>
          <p className="text-xs sm:text-sm text-gray-600">Pendientes de Asignar</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{stats.tasaValidez}%</p>
          <p className="text-xs sm:text-sm text-gray-600">Tasa de Validez</p>
        </div>
      </div>

      {/* Meta Semanal */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Meta Semanal de Encuestas</h3>
              <p className="text-xs sm:text-sm text-gray-600">Semana 6 - 2026</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.encuestasSemana}/{stats.metaSemanal}</p>
            <p className="text-xs sm:text-sm text-gray-600">{progresoSemanal}% completado</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
          <div
            className={`h-full rounded-full transition-all ${
              progresoSemanal >= 100 ? 'bg-green-500' :
              progresoSemanal >= 70 ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${Math.min(progresoSemanal, 100)}%` }}
          />
        </div>
        {stats.encuestasSemana < stats.metaSemanal && (
          <p className="text-xs sm:text-sm text-orange-600 mt-2">
            Faltan {stats.metaSemanal - stats.encuestasSemana} encuestas para cumplir la meta
          </p>
        )}
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 sm:p-8 rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Upload className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg sm:text-xl font-bold mb-1">Cargar Encuestas</h3>
            <p className="text-xs sm:text-sm text-blue-100">Subir archivo Excel o CSV</p>
          </div>
        </button>

        <button className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 sm:p-8 rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg sm:text-xl font-bold mb-1">Asignar Automáticamente</h3>
            <p className="text-xs sm:text-sm text-green-100">Distribuir {stats.encuestasPendientes} encuestas pendientes</p>
          </div>
        </button>
      </div>

      {/* Tabla de Encuestas Recientes - Desktop */}
      <div className="bg-white rounded-xl shadow-sm border hidden md:block">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Encuestas Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ciudad</th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Asignado a</th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { nombre: 'Ana García', telefono: '3312345678', ciudad: 'Guadalajara', asignado: 'Paloma', estado: 'asignada' },
                { nombre: 'Carlos Ruiz', telefono: '3398765432', ciudad: 'Zapopan', asignado: 'Martín', estado: 'asignada' },
                { nombre: 'Laura Méndez', telefono: '3311223344', ciudad: 'Tlaquepaque', asignado: null, estado: 'pendiente' },
                { nombre: 'Jorge Soto', telefono: '3322334455', ciudad: 'Tonalá', asignado: 'Israel', estado: 'tipificada' },
                { nombre: 'María Torres', telefono: '3355667788', ciudad: 'Guadalajara', asignado: 'Miguel', estado: 'asignada' },
              ].map((encuesta, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <p className="font-semibold text-gray-900 text-sm">{encuesta.nombre}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                    {encuesta.telefono}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                    {encuesta.ciudad}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                    {encuesta.asignado ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {encuesta.asignado}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      encuesta.estado === 'tipificada' ? 'bg-green-100 text-green-800' :
                      encuesta.estado === 'asignada' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {encuesta.estado === 'tipificada' ? 'Tipificada' :
                       encuesta.estado === 'asignada' ? 'Asignada' :
                       'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm text-gray-600">
                    Hoy 10:30 AM
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards de Encuestas - Mobile */}
      <div className="md:hidden space-y-3">
        <h3 className="text-base font-bold text-gray-900 px-1">Encuestas Recientes</h3>
        {[
          { nombre: 'Ana García', telefono: '3312345678', ciudad: 'Guadalajara', asignado: 'Paloma', estado: 'asignada' },
          { nombre: 'Carlos Ruiz', telefono: '3398765432', ciudad: 'Zapopan', asignado: 'Martín', estado: 'asignada' },
          { nombre: 'Laura Méndez', telefono: '3311223344', ciudad: 'Tlaquepaque', asignado: null, estado: 'pendiente' },
        ].map((encuesta, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{encuesta.nombre}</h4>
                <p className="text-sm text-gray-600">{encuesta.telefono}</p>
                <p className="text-xs text-gray-500">📍 {encuesta.ciudad}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                encuesta.estado === 'tipificada' ? 'bg-green-100 text-green-800' :
                encuesta.estado === 'asignada' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {encuesta.estado === 'tipificada' ? 'Tipificada' :
                 encuesta.estado === 'asignada' ? 'Asignada' :
                 'Pendiente'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 border-t pt-3">
              <span>
                {encuesta.asignado ? (
                  <span className="text-blue-600 font-medium">Asignado a {encuesta.asignado}</span>
                ) : (
                  <span className="text-orange-600">Sin asignar</span>
                )}
              </span>
              <span>Hoy 10:30 AM</span>
            </div>
          </div>
        ))}
      </div>

      {/* Productividad del Equipo */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Productividad del Equipo</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { nombre: 'Rosa López', encuestas: 52, validez: 96, asignadas: 50 },
            { nombre: 'Pedro Gómez', encuestas: 48, validez: 94, asignadas: 46 },
            { nombre: 'Sofia Ramírez', encuestas: 45, validez: 89, asignadas: 42 },
          ].map((persona, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-base">{persona.nombre.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{persona.nombre}</p>
                <div className="flex flex-wrap gap-2 sm:gap-6 mt-1 text-xs sm:text-sm">
                  <span className="text-gray-600">
                    <strong className="text-blue-600">{persona.encuestas}</strong> encuestas
                  </span>
                  <span className="text-gray-600">
                    <strong className="text-green-600">{persona.validez}%</strong> validez
                  </span>
                  <span className="text-gray-600 hidden sm:inline">
                    <strong className="text-purple-600">{persona.asignadas}</strong> asignadas
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}