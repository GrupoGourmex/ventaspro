import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

export const ChartSection = ({ ventas }) => {
  // Preparar datos para gráfica de barras
  const chartData = ventas.map(v => ({
    equipo: `Eq ${v.equipos?.numero_equipo}`,
    Agendadas: v.citas_agendadas,
    Realizadas: v.citas_realizadas,
    Canceladas: v.citas_canceladas,
    Ventas: v.ventas,
  }))

  // Preparar datos para gráfica de pastel (distribución de encuestas)
  const pieData = ventas.map(v => ({
    name: `Equipo ${v.equipos?.numero_equipo}`,
    value: v.encuestas
  })).filter(d => d.value > 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Gráfica de barras */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold mb-4">Citas por Equipo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="equipo" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Agendadas" fill="#3b82f6" />
            <Bar dataKey="Realizadas" fill="#10b981" />
            <Bar dataKey="Canceladas" fill="#ef4444" />
            <Bar dataKey="Ventas" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de pastel */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold mb-4">Distribución de Encuestas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}