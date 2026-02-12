import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),

  // Cargar perfil del usuario
  loadUserProfile: async (userId) => {
    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      set({ profile: usuario })
      return usuario
    } catch (error) {
      console.error('Error loading profile:', error)
      return null
    }
  },

  // Inicializar sesión
  initAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        set({ user: session.user })
        await get().loadUserProfile(session.user.id)
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
    } finally {
      set({ loading: false })
    }
  },

  // Login
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    set({ user: data.user })
    await get().loadUserProfile(data.user.id)
    
    return data
  },

  // Logout
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },
}))