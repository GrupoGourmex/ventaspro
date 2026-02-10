import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),

  // Cargar perfil completo del usuario
  loadUserProfile: async (userId) => {
    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select(`
          *,
          roles (nombre, permisos),
          vendedores (
            id,
            codigo_vendedor,
            equipo_id,
            equipos (numero_equipo, nombre_equipo)
          )
        `)
        .eq('id', userId)
        .single()

      if (error) throw error

      set({ 
        profile: usuario,
        role: usuario.roles?.nombre || null
      })

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

  // Registro - CORREGIDO
  signUp: async (email, password, userData) => {
    try {
      // 1. Crear usuario en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre_completo: userData.nombre_completo
          }
        }
      })

      if (authError) throw authError

      // 2. Obtener el ID del rol
      const { data: rolData, error: rolError } = await supabase
        .from('roles')
        .select('id')
        .eq('nombre', userData.rol)
        .single()

      if (rolError) {
        console.error('Error obteniendo rol:', rolError)
        throw new Error('Rol no encontrado')
      }

      // 3. Crear perfil de usuario
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert({
            id: authData.user.id,
            email: email,
            nombre_completo: userData.nombre_completo,
            telefono: userData.telefono,
            rol_id: rolData.id, // Usar el ID del rol
            activo: true
          })

        if (profileError) {
          console.error('Error creando perfil:', profileError)
          throw profileError
        }
      }

      return authData
    } catch (error) {
      console.error('Error en signUp:', error)
      throw error
    }
  },

  // Logout
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null, role: null })
  },
}))