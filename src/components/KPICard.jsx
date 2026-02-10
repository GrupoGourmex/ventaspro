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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-all">
            {formatValue(value)}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 truncate">{subtitle}</p>
          )}
          {trend && (
            <div className={clsx(
              "flex items-center gap-1 mt-2 text-xs sm:text-sm font-medium",
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              )}
              <span className="truncate">{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
            colorClasses[color]
          )}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}