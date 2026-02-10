import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// FUNCIONES HELPER PARA LA API
// ============================================

// Vendedores
export const vendedoresAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('vista_rendimiento_vendedores')
      .select('*')
      .order('ventas_total', { ascending: false })
    
    if (error) throw error
    return data
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('vendedores')
      .select(`
        *,
        usuarios (*),
        equipos (*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  getMetricas: async (vendedorId, dias = 30) => {
    const { data, error } = await supabase
      .from('metricas_diarias')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .gte('fecha', new Date(Date.now() - dias * 24 * 60 * 60 * 1000).toISOString())
      .order('fecha', { ascending: true })
    
    if (error) throw error
    return data
  }
}

// Actividades
export const actividadesAPI = {
  registrar: async (actividad) => {
    const { data, error } = await supabase
      .from('actividades_diarias')
      .upsert(actividad, { onConflict: 'vendedor_id,fecha' })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  getByVendedor: async (vendedorId, fecha) => {
    const { data, error } = await supabase
      .from('actividades_diarias')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .eq('fecha', fecha)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}

// Citas
export const citasAPI = {
  crear: async (cita) => {
    const { data, error } = await supabase
      .from('citas')
      .insert(cita)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  actualizar: async (id, updates) => {
    const { data, error } = await supabase
      .from('citas')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  getByVendedor: async (vendedorId) => {
    const { data, error } = await supabase
      .from('citas')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .order('fecha_agendada', { ascending: false })
    
    if (error) throw error
    return data
  },

  getPendientes: async (vendedorId) => {
    const { data, error } = await supabase
      .from('citas')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .eq('estado', 'agendada')
      .gte('fecha_agendada', new Date().toISOString())
      .order('fecha_agendada', { ascending: true })
    
    if (error) throw error
    return data
  }
}

// Ventas
export const ventasAPI = {
  crear: async (venta) => {
    const { data, error } = await supabase
      .from('ventas')
      .insert(venta)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  getByVendedor: async (vendedorId, mes = null) => {
    let query = supabase
      .from('ventas')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .order('fecha_venta', { ascending: false })
    
    if (mes) {
      const inicioMes = new Date(mes.getFullYear(), mes.getMonth(), 1)
      const finMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0)
      query = query.gte('fecha_venta', inicioMes.toISOString())
                   .lte('fecha_venta', finMes.toISOString())
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  getEstadisticas: async (vendedorId, periodo = 'mes') => {
    const { data, error } = await supabase
      .rpc('calcular_estadisticas_ventas', {
        vendedor_id: vendedorId,
        periodo: periodo
      })
    
    if (error) throw error
    return data
  }
}

// Alertas
export const alertasAPI = {
  getByVendedor: async (vendedorId) => {
    const { data, error } = await supabase
      .from('alertas')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .eq('leida', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  marcarLeida: async (id) => {
    const { error } = await supabase
      .from('alertas')
      .update({ leida: true })
      .eq('id', id)
    
    if (error) throw error
  }
}

// Dashboard Ejecutivo
export const dashboardAPI = {
  getResumen: async () => {
    const { data, error } = await supabase
      .from('vista_dashboard_ejecutivo')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  getTopVendedores: async (limit = 5) => {
    const { data, error } = await supabase
      .from('vista_rendimiento_vendedores')
      .select('*')
      .order('ventas_total', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  getBottomVendedores: async (limit = 5) => {
    const { data, error } = await supabase
      .from('vista_rendimiento_vendedores')
      .select('*')
      .order('ventas_total', { ascending: true })
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

// Rankings
export const rankingsAPI = {
  getSemanal: async () => {
    const { data, error } = await supabase
      .from('rankings')
      .select(`
        *,
        vendedores (
          codigo_vendedor,
          usuarios (nombre_completo)
        )
      `)
      .eq('periodo', 'semanal')
      .order('posicion', { ascending: true })
    
    if (error) throw error
    return data
  }
}

// Metas
export const metasAPI = {
  getByVendedor: async (vendedorId) => {
    const { data, error } = await supabase
      .from('metas')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .eq('completada', false)
      .order('fecha_fin', { ascending: true })
    
    if (error) throw error
    return data
  },

  crear: async (meta) => {
    const { data, error } = await supabase
      .from('metas')
      .insert(meta)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  actualizar: async (id, updates) => {
    const { data, error } = await supabase
      .from('metas')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}