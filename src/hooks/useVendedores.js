import { useState, useEffect } from 'react'
import { vendedoresAPI } from '../lib/supabase'

export const useVendedores = () => {
  const [vendedores, setVendedores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVendedores = async () => {
    try {
      setLoading(true)
      const data = await vendedoresAPI.getAll()
      setVendedores(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching vendedores:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendedores()
  }, [])

  return { vendedores, loading, error, refetch: fetchVendedores }
}