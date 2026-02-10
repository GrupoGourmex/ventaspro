import React, { useState } from 'react'
import { actividadesAPI } from '../lib/supabase'
import { 
  ClipboardList, 
  Phone, 
  MessageCircle, 
  Clock,
  Save,
  CheckCircle
} from 'lucide-react'

export const Actividades = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [actividad, setActividad] = useState({
    encuestas_realizadas: 0,
    llamadas_realizadas: 0,
    whatsapp_enviados: 0,
    horas_trabajadas: 0,
    notas: ''
  })
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  // Por ahora usaremos un vendedor fijo - luego lo tomaremos del contexto de autenticación
  const vendedorId = 'temp-vendedor-id' 

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGuardando(true)
    setMensaje(null)

    try {
      await actividadesAPI.registrar({
        vendedor_id: vendedorId,
        fecha: fecha,
        ...actividad
      })
      
      setMensaje({ tipo: 'success', texto: '✅ Actividad registrada correctamente' })
      
      // Resetear formulario
      setActividad({
        encuestas_realizadas: 0,
        llamadas_realizadas: 0,
        whatsapp_enviados: 0,
        horas_trabajadas: 0,
        notas: ''
      })
    } catch (error) {
      setMensaje({ tipo: 'error', texto: '❌ Error al guardar la actividad' })
      console.error('Error:', error)
    } finally {
      setGuardando(false)
    }
  }

  const handleChange = (campo, valor) => {
    setActividad(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Registro de Actividades</h1>
        <p className="text-gray-600 mt-1">Registra tu actividad diaria para tracking de productividad</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Actividad
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Encuestas */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                    Encuestas Realizadas
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={actividad.encuestas_realizadas}
                    onChange={(e) => handleChange('encuestas_realizadas', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Meta diaria: 10 encuestas</p>
                </div>

                {/* Llamadas */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Llamadas Realizadas
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={actividad.llamadas_realizadas}
                    onChange={(e) => handleChange('llamadas_realizadas', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    Mensajes WhatsApp
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={actividad.whatsapp_enviados}
                    onChange={(e) => handleChange('whatsapp_enviados', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Horas Trabajadas */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Horas Trabajadas
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={actividad.horas_trabajadas}
                    onChange={(e) => handleChange('horas_trabajadas', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas del Día (Opcional)
                </label>
                <textarea
                  value={actividad.notas}
                  onChange={(e) => handleChange('notas', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  placeholder="Describe tus actividades, logros, retos del día..."
                />
              </div>

              {/* Mensaje de éxito/error */}
              {mensaje && (
                <div className={`p-4 rounded-lg ${
                  mensaje.tipo === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {mensaje.texto}
                </div>
              )}

              {/* Botón de guardar */}
              <button
                type="submit"
                disabled={guardando}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {guardando ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Registrar Actividad
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Panel de Metas y Progreso */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progreso del Día */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Progreso del Día</h3>
            
            <div className="space-y-4">
              {/* Encuestas */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Encuestas</span>
                  <span className="font-semibold text-gray-900">
                    {actividad.encuestas_realizadas}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((actividad.encuestas_realizadas / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Llamadas */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Llamadas</span>
                  <span className="font-semibold text-gray-900">
                    {actividad.llamadas_realizadas}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((actividad.llamadas_realizadas / 20) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Horas */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Horas Trabajadas</span>
                  <span className="font-semibold text-gray-900">
                    {actividad.horas_trabajadas}/8
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((actividad.horas_trabajadas / 8) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Consejos */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Consejos del Día</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Registra tus actividades diariamente</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mantén tu meta de 10 encuestas al día</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Documenta tus logros y aprendizajes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}