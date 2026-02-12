import { useState, useEffect } from 'react'
import { resumenSemanalAPI, getSemanaActual } from '../lib/supabase'

export const useResumenSemanal = (semana = null, año = null) => {
  const [resumen, setResumen] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarResumen()
  }, [semana, año])

  const cargarResumen = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const semanaActual = semana && año 
        ? { semana, año } 
        : getSemanaActual()
      
      const data = await resumenSemanalAPI.getPorEquipos(
        semanaActual.semana, 
        semanaActual.año
      )
      
      setResumen(data)
    } catch (err) {
      console.error('Error cargando resumen:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { resumen, loading, error, refetch: cargarResumen }
}