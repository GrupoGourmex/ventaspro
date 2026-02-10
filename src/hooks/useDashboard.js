import { useState, useEffect } from 'react'
import { dashboardAPI } from '../lib/supabase'

export const useDashboard = () => {
  const [resumen, setResumen] = useState(null)
  const [topVendedores, setTopVendedores] = useState([])
  const [bottomVendedores, setBottomVendedores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const [resumenData, topData, bottomData] = await Promise.all([
        dashboardAPI.getResumen(),
        dashboardAPI.getTopVendedores(5),
        dashboardAPI.getBottomVendedores(5)
      ])

      setResumen(resumenData)
      setTopVendedores(topData)
      setBottomVendedores(bottomData)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return { 
    resumen, 
    topVendedores, 
    bottomVendedores, 
    loading, 
    error, 
    refetch: fetchDashboard 
  }
}