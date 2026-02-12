import React, { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { AppRouter } from './router'

function App() {
  const { initAuth } = useAuthStore()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <AppRouter />
}

export default App