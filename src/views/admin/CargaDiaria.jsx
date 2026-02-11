import React, { useState } from 'react'
import { useVendedores } from '../../hooks/useVendedores'
import { registrosDiariosAPI } from '../../lib/supabase'
import { Upload, Save, Calendar, AlertCircle, CheckCircle } from 'lucide-react'

export const CargaDiaria = () => {
  const { vendedores } = useVendedores()
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [registros, setRegistros] = useState([])
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  // Inicializar registros cuando se carguen los vendedores
  React.useEffect(() => {
    if (vendedores.length > 0 && registros.length === 0) {
      const nuevosRegistros = vendedores.map(v => ({
        vendedor_id: v.id,
        equipo_id: v.equipos?.id,
        nombre: v.nombre_completo,
        equipo: v.numero_equipo,
        encuestas_realizadas: 0,
        llamadas_realizadas: 0,
        citas_agendadas: 0,
        citas_realizadas: 0,
        citas_canceladas: 0,
        ventas: 0,
        ingresos: 0,
        encuestas_validadas: 0,
        recomendados: 0,
        citas_directas: 0,
        entregas: 0
      }))
      setRegistros(nuevosRegistros)
    }
  }, [vendedores])

  const handleChange = (index, campo, valor) => {
    const nuevosRegistros = [...registros]
    nuevosRegistros[index][campo] = parseFloat(valor) || 0
    setRegistros(nuevosRegistros)
  }

  const handleGuardar = async () => {
    setGuardando(true)
    setMensaje(null)

    try {
      const registrosParaGuardar = registros.map(r => ({
        fecha,
        equipo_id: r.equipo_id,
        vendedor_id: r.vendedor_id,
        encuestas_realizadas: r.encuestas_realizadas,
        llamadas_realizadas: r.llamadas_realizadas,
        citas_agendadas: r.citas_agendadas,
        citas_realizadas: r.citas_realizadas,
        citas_canceladas: r.citas_canceladas,
        ventas: r.ventas,
        ingresos: r.ingresos,
        encuestas_validadas: r.encuestas_validadas,
        recomendados: r.recomendados,
        citas_directas: r.citas_directas,
        entregas: r.entregas
      }))

      await registrosDiariosAPI.crearMultiples(registrosParaGuardar)
      
      setMensaje({ tipo: 'success', texto: '✅ Datos guardados correctamente' })
      
      // Resetear formulario
      setTimeout(() => {
        const nuevosRegistros = vendedores.map(v => ({
          vendedor_id: v.id,
          equipo_id: v.equipos?.id,
          nombre: v.nombre_completo,
          equipo: v.numero_equipo,
          encuestas_realizadas: 0,
          llamadas_realizadas: 0,
          citas_agendadas: 0,
          citas_realizadas: 0,
          citas_canceladas: 0,
          ventas: 0,
          ingresos: 0,
          encuestas_validadas: 0,
          recomendados: 0,
          citas_directas: 0,
          entregas: 0
        }))
        setRegistros(nuevosRegistros)
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setMensaje({ tipo: 'error', texto: '❌ Error al guardar: ' + error.message })
    } finally {
      setGuardando(false)
    }
  }

  const totales = registros.reduce((acc, r) => ({
    encuestas: acc.encuestas + r.encuestas_realizadas,
    llamadas: acc.llamadas + r.llamadas_realizadas,
    citas_agendadas: acc.citas_agendadas + r.citas_agendadas,
    citas_realizadas: acc.citas_realizadas + r.citas_realizadas,
    citas_canceladas: acc.citas_canceladas + r.citas_canceladas,
    ventas: acc.ventas + r.ventas,
    ingresos: acc.ingresos + r.ingresos
  }), {
    encuestas: 0,
    llamadas: 0,
    citas_agendadas: 0,
    citas_realizadas: 0,
    citas_canceladas: 0,
    ventas: 0,
    ingresos: 0
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Carga Diaria de Datos</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Registra las métricas del día de todos los vendedores</p>
      </div>

      {/* Selector de Fecha y Totales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Fecha */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            Fecha del Registro
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg font-semibold"
          />
        </div>

        {/* Totales */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 mb-3">Totales del Día</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600">Encuestas</p>
              <p className="text-xl font-bold text-blue-600">{totales.encuestas}</p>
            </div>
            <div>
              <p className="text-gray-600">Citas Agendadas</p>
              <p className="text-xl font-bold text-green-600">{totales.citas_agendadas}</p>
            </div>
            <div>
              <p className="text-gray-600">Ventas</p>
              <p className="text-xl font-bold text-purple-600">{totales.ventas}</p>
            </div>
            <div>
              <p className="text-gray-600">Ingresos</p>
              <p className="text-xl font-bold text-yellow-600">${totales.ingresos.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div className={`p-4 rounded-lg border ${
          mensaje.tipo === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {mensaje.tipo === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="font-medium">{mensaje.texto}</p>
          </div>
        </div>
      )}

      {/* Tabla de Registro - Desktop */}
      <div className="bg-white rounded-xl shadow-sm border hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 z-10">Vendedor</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Equipo</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Encuestas</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Llamadas</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Agendadas</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Realizadas</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Canceladas</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ventas</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Recomendados</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {registros.map((registro, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 sticky left-0 bg-white">
                  <span className="font-semibold text-gray-900">{registro.nombre}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                    Eq {registro.equipo}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.encuestas_realizadas}
                    onChange={(e) => handleChange(index, 'encuestas_realizadas', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.llamadas_realizadas}
                    onChange={(e) => handleChange(index, 'llamadas_realizadas', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.citas_agendadas}
                    onChange={(e) => handleChange(index, 'citas_agendadas', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-green-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.citas_realizadas}
                    onChange={(e) => handleChange(index, 'citas_realizadas', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-green-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.citas_canceladas}
                    onChange={(e) => handleChange(index, 'citas_canceladas', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-red-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.ventas}
                    onChange={(e) => handleChange(index, 'ventas', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={registro.ingresos}
                    onChange={(e) => handleChange(index, 'ingresos', e.target.value)}
                    className="w-24 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-yellow-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={registro.recomendados}
                    onChange={(e) => handleChange(index, 'recomendados', e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para Mobile */}
      <div className="lg:hidden space-y-4">
        {registros.map((registro, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{registro.nombre}</h4>
                <span className="text-xs text-gray-500">Equipo {registro.equipo}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">Encuestas</label>
                <input
                  type="number"
                  min="0"
                  value={registro.encuestas_realizadas}
                  onChange={(e) => handleChange(index, 'encuestas_realizadas', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Citas Agendadas</label>
                <input
                  type="number"
                  min="0"
                  value={registro.citas_agendadas}
                  onChange={(e) => handleChange(index, 'citas_agendadas', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Citas Realizadas</label>
                <input
                  type="number"
                  min="0"
                  value={registro.citas_realizadas}
                  onChange={(e) => handleChange(index, 'citas_realizadas', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Ventas</label>
                <input
                  type="number"
                  min="0"
                  value={registro.ventas}
                  onChange={(e) => handleChange(index, 'ventas', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-600">Ingresos ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={registro.ingresos}
                  onChange={(e) => handleChange(index, 'ingresos', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center mt-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Guardar */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 rounded-t-xl">
        <button
          onClick={handleGuardar}
          disabled={guardando}
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold py-4 rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {guardando ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Guardar Datos del Día
            </>
          )}
        </button>
      </div>
    </div>
  )
}