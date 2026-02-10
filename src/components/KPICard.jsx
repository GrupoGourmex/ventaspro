import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import clsx from 'clsx'

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  format = 'number'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  }

  const formatValue = (val) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
      }).format(val)
    }
    if (format === 'percentage') {
      return `${val}%`
    }
    return val.toLocaleString('es-MX')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {formatValue(value)}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={clsx(
              "flex items-center gap-1 mt-2 text-sm font-medium",
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx(
            "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
            colorClasses[color]
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}