import React, { useState } from 'react'
import { 
  Target, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Trophy,
  Phone,
  MessageCircle
} from 'lucide-react'

export const DashboardEjecutivo = () => {
  const [stats] = useState({
    encuestasPendientes: 12,
    citasHoy: 3,
    ventasSemana: 2,
    metaSemanal: 3,
    tasaConversion: 28,
    ranking: 3,
    totalVendedores: 14,
    puntos: 850
  })

  const progresoMeta = Math.round((stats.ventasSemana / stats.metaSemanal) * 100)

  return (
    <div className="space-y-6">
      {/* Header Personalizado */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta! 👋</h1>
            <p className="text-yellow-100">Aquí está tu resumen del día</p>
          </div>
          <div className="text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <Trophy className="w-8 h-8 mx-auto mb-1" />
            <p className="text-2xl font-bold">#{stats.ranking}</p>
            <p className="text-xs text-yellow-100">Tu Posición</p>
          </div>
        </div>
      </div>

      {/* Alertas del Día */}
      {stats.citasHoy > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Tienes {stats.citasHoy} citas programadas hoy</h3>
              <p className="text-sm text-blue-700 mt-1">Revisa tu agenda para prepararte</p>
            </div>
          </div>
        </div>
      )}

      {stats.encuestasPendientes > 5 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900">
                Tienes {stats.encuestasPendientes} encuestas sin tipificar
              </h3>
              <p className="text-sm text-orange-700 mt-1">
                Mantén tus leads actualizados para mejorar tu conversión
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KPIs Personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              PENDIENTE
            </span>
          </div>
          <p className="text-3xl font-bold text-orange-600 mb-1">{stats.encuestasPendientes}</p>
          <p className="text-sm text-gray-600">Encuestas por Tipificar</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              HOY
            </span>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-1">{stats.citasHoy}</p>
          <p className="text-sm text-gray-600">Citas Programadas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-1">{stats.ventasSemana}</p>
          <p className="text-sm text-gray-600">Ventas Esta Semana</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-1">{stats.tasaConversion}%</p>
          <p className="text-sm text-gray-600">Tasa de Conversión</p>
        </div>
      </div>

      {/* Meta Semanal */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="font-bold text-gray-900">Mi Meta Semanal</h3>
              <p className="text-sm text-gray-600">Semana 6 - 2026</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{stats.ventasSemana}/{stats.metaSemanal}</p>
            <p className="text-sm text-gray-600">{progresoMeta}% completado</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              progresoMeta >= 100 ? 'bg-green-500' :
              progresoMeta >= 70 ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${Math.min(progresoMeta, 100)}%` }}
          />
        </div>
        {stats.ventasSemana < stats.metaSemanal && (
          <p className="text-sm text-blue-600 mt-2 font-medium">
            ¡Faltan solo {stats.metaSemanal - stats.ventasSemana} venta(s) para cumplir tu meta! 💪
          </p>
        )}
      </div>

      {/* Mis Citas de Hoy */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900">Mis Citas de Hoy</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { hora: '10:00 AM', nombre: 'María González', telefono: '3312345678', tipo: 'Prospecto Nuevo', lead: 'caliente' },
            { hora: '2:00 PM', nombre: 'Carlos Ramírez', telefono: '3398765432', tipo: 'Seguimiento', lead: 'tibio' },
            { hora: '5:00 PM', nombre: 'Laura Sánchez', telefono: '3311223344', tipo: 'Cierre', lead: 'caliente' },
          ].map((cita, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-16 text-center flex-shrink-0">
                  <p className="text-2xl font-bold text-gray-900">{cita.hora.split(':')[0]}</p>
                  <p className="text-sm text-gray-600">{cita.hora.split(' ')[1]}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{cita.nombre}</h4>
                      <p className="text-sm text-gray-600">{cita.tipo}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cita.lead === 'caliente' ? 'bg-red-100 text-red-800' :
                      cita.lead === 'tibio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {cita.lead === 'caliente' ? '🔥 Caliente' :
                       cita.lead === 'tibio' ? '☀️ Tibio' :
                       '❄️ Frío'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{cita.telefono}</span>
                    </div>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mis Encuestas Pendientes */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Encuestas Pendientes de Tipificar</h3>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
            {stats.encuestasPendientes} pendientes
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { nombre: 'Roberto Díaz', telefono: '3322334455', ciudad: 'Guadalajara', asignada: 'Hace 2 horas' },
            { nombre: 'Patricia Ruiz', telefono: '3355667788', ciudad: 'Zapopan', asignada: 'Hace 3 horas' },
            { nombre: 'Fernando Castro', telefono: '3344556677', ciudad: 'Tlaquepaque', asignada: 'Hace 5 horas' },
          ].map((encuesta, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{encuesta.nombre}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {encuesta.telefono}
                    </span>
                    <span>📍 {encuesta.ciudad}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-xs text-gray-500 mb-2">{encuesta.asignada}</p>
                  <button className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                    Tipificar Ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            Ver todas las encuestas ({stats.encuestasPendientes})
          </button>
        </div>
      </div>

      {/* Mi Ranking y Gamificación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ranking */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold">Mi Ranking</h3>
              <p className="text-purple-200 text-sm">Semana 6</p>
            </div>
          </div>
          <div className="text-center py-6">
            <p className="text-6xl font-bold mb-2">#{stats.ranking}</p>
            <p className="text-purple-200">de {stats.totalVendedores} vendedores</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-purple-700">
            <div>
              <p className="text-purple-200 text-sm">Puntos</p>
              <p className="text-2xl font-bold">{stats.puntos}</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              Ver Ranking
            </button>
          </div>
        </div>

        {/* Insignias */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Mis Logros</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Vendedor del Mes</p>
                <p className="text-xs text-gray-600">Enero 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Meta Cumplida</p>
                <p className="text-xs text-gray-600">5 semanas consecutivas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg opacity-50">
              <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Top 3</p>
                <p className="text-xs text-gray-600">Próximo objetivo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all">
          <Calendar className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">Agendar Cita</h4>
          <p className="text-sm text-blue-100">Programar nueva cita</p>
        </button>

        <button className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all">
          <CheckCircle className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">Registrar Venta</h4>
          <p className="text-sm text-green-100">Cerrar una venta</p>
        </button>

        <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-2xl transition-all">
          <Target className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">Mis Actividades</h4>
          <p className="text-sm text-purple-100">Registrar actividades</p>
        </button>
      </div>
    </div>
  )
}