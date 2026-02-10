import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useVentas = (semana, año) => {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVentas()
  }, [semana, año])

  const fetchVentas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('ventas_semanales')
        .select(`
          *,
          equipos (
            numero_equipo,
            nombre_equipo
          )
        `)
        .eq('semana', semana)
        .eq('año', año)
        .order('equipos(numero_equipo)')

      if (error) throw error
      setVentas(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching ventas:', err)
    } finally {
      setLoading(false)
    }
  }

  return { ventas, loading, error, refetch: fetchVentas }
}