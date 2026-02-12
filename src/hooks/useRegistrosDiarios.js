import { useState, useEffect } from 'react'
import { registrosDiariosAPI } from '../lib/supabase'

export const useRegistrosDiarios = (fecha = null) => {
  const [registros, setRegistros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (fecha) {
      cargarRegistros()
    }
  }, [fecha])

  const cargarRegistros = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await registrosDiariosAPI.getPorFecha(fecha)
      setRegistros(data)
    } catch (err) {
      console.error('Error cargando registros:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const guardarRegistros = async (nuevosRegistros) => {
    try {
      const data = await registrosDiariosAPI.crearMultiples(nuevosRegistros)
      return data
    } catch (err) {
      console.error('Error guardando registros:', err)
      throw err
    }
  }

  return { 
    registros, 
    loading, 
    error, 
    refetch: cargarRegistros,
    guardarRegistros
  }
}