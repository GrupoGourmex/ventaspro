import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// VENDEDORES
// ============================================
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
  },

  // Obtener todos los vendedores con su información de equipo
  getAllWithTeams: async () => {
    const { data, error } = await supabase
      .from('vendedores')
      .select(`
        id,
        codigo_vendedor,
        equipo_id,
        activo,
        usuarios (
          id,
          nombre_completo,
          email
        ),
        equipos (
          id,
          numero_equipo,
          nombre_equipo
        )
      `)
      .eq('activo', true)
      .order('equipo_id')
    
    if (error) throw error
    
    // Formatear la respuesta
    return data.map(v => ({
      id: v.id,
      vendedor_id: v.id,
      codigo_vendedor: v.codigo_vendedor,
      nombre_completo: v.usuarios?.nombre_completo || 'Sin nombre',
      email: v.usuarios?.email,
      equipo_id: v.equipos?.id,
      numero_equipo: v.equipos?.numero_equipo,
      nombre_equipo: v.equipos?.nombre_equipo
    }))
  }
}

// ============================================
// ACTIVIDADES
// ============================================
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

// ============================================
// CITAS
// ============================================
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

// ============================================
// VENTAS
// ============================================
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
  }
}

// ============================================
// ALERTAS
// ============================================
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

// ============================================
// DASHBOARD EJECUTIVO
// ============================================
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

// ============================================
// RANKINGS
// ============================================
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

// ============================================
// METAS
// ============================================
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

// ============================================
// REGISTROS DIARIOS
// ============================================
export const registrosDiariosAPI = {
  // Crear registro diario único
  crear: async (registro) => {
    const { data, error } = await supabase
      .from('registros_diarios')
      .insert(registro)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Crear múltiples registros (carga masiva)
  crearMultiples: async (registros) => {
    const { data, error } = await supabase
      .from('registros_diarios')
      .upsert(registros, { 
        onConflict: 'fecha,equipo_id,vendedor_id',
        ignoreDuplicates: false 
      })
      .select()
    
    if (error) throw error
    return data
  },

  // Obtener registros por fecha específica
  getPorFecha: async (fecha) => {
    const { data, error } = await supabase
      .from('registros_diarios')
      .select(`
        *,
        equipos (
          numero_equipo, 
          nombre_equipo
        ),
        vendedores (
          codigo_vendedor,
          usuarios (nombre_completo)
        )
      `)
      .eq('fecha', fecha)
      .order('equipo_id')
    
    if (error) throw error
    return data
  },

  // Obtener registros por rango de fechas
  getPorRango: async (fechaInicio, fechaFin) => {
    const { data, error } = await supabase
      .from('registros_diarios')
      .select(`
        *,
        equipos (
          numero_equipo, 
          nombre_equipo
        ),
        vendedores (
          codigo_vendedor,
          usuarios (nombre_completo)
        )
      `)
      .gte('fecha', fechaInicio)
      .lte('fecha', fechaFin)
      .order('fecha', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Obtener últimos 7 días
  getUltimos7Dias: async () => {
    const hoy = new Date()
    const hace7Dias = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const { data, error } = await supabase
      .from('registros_diarios')
      .select(`
        fecha,
        equipo_id,
        equipos (numero_equipo, nombre_equipo),
        encuestas_realizadas,
        citas_agendadas,
        citas_realizadas,
        ventas,
        ingresos
      `)
      .gte('fecha', hace7Dias.toISOString().split('T')[0])
      .lte('fecha', hoy.toISOString().split('T')[0])
      .order('fecha', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// ============================================
// RESÚMENES SEMANALES
// ============================================
export const resumenSemanalAPI = {
  // Obtener resumen semanal por equipos
  getPorEquipos: async (semana, año) => {
    const { data, error } = await supabase
      .from('vista_resumen_semanal')
      .select('*')
      .eq('numero_semana', semana)
      .eq('año', año)
      .order('numero_equipo')
    
    if (error) throw error
    return data
  },

  // Obtener últimas 4 semanas
  getUltimas4Semanas: async () => {
    const { data, error } = await supabase
      .from('vista_resumen_semanal')
      .select('*')
      .order('semana_inicio', { ascending: false })
      .limit(32) // 8 equipos * 4 semanas
    
    if (error) throw error
    return data
  },

  // Obtener resumen por vendedor
  getPorVendedores: async (semana, año) => {
    const { data, error } = await supabase
      .from('vista_resumen_vendedor_semanal')
      .select('*')
      .eq('numero_semana', semana)
      .eq('año', año)
      .order('total_ventas', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Obtener semana actual
  getSemanaActual: async () => {
    const hoy = new Date()
    const semana = getWeekNumber(hoy)
    const año = hoy.getFullYear()
    
    const { data, error } = await supabase
      .from('vista_resumen_semanal')
      .select('*')
      .eq('numero_semana', semana)
      .eq('año', año)
      .order('numero_equipo')
    
    if (error) throw error
    return data
  },

  // Obtener comparativa de semanas
  getComparativa: async (semana1, año1, semana2, año2) => {
    const { data: semana1Data, error: error1 } = await supabase
      .from('vista_resumen_semanal')
      .select('*')
      .eq('numero_semana', semana1)
      .eq('año', año1)
    
    const { data: semana2Data, error: error2 } = await supabase
      .from('vista_resumen_semanal')
      .select('*')
      .eq('numero_semana', semana2)
      .eq('año', año2)
    
    if (error1) throw error1
    if (error2) throw error2
    
    return {
      semana1: semana1Data,
      semana2: semana2Data
    }
  }
}

// ============================================
// EQUIPOS
// ============================================
export const equiposAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .order('numero_equipo')
    
    if (error) throw error
    return data
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('equipos')
      .select(`
        *,
        vendedores (
          id,
          codigo_vendedor,
          usuarios (nombre_completo)
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Calcular número de semana del año
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

// Obtener rango de fechas de una semana específica
export function getRangoSemana(semana, año) {
  const simple = new Date(año, 0, 1 + (semana - 1) * 7)
  const dow = simple.getDay()
  const ISOweekStart = simple
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
  
  const ISOweekEnd = new Date(ISOweekStart)
  ISOweekEnd.setDate(ISOweekStart.getDate() + 6)
  
  return {
    inicio: ISOweekStart.toISOString().split('T')[0],
    fin: ISOweekEnd.toISOString().split('T')[0]
  }
}

// Exportar función para obtener semana actual
export function getSemanaActual() {
  const hoy = new Date()
  return {
    semana: getWeekNumber(hoy),
    año: hoy.getFullYear()
  }
}