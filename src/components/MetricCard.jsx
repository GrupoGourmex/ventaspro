import React from 'react'
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

export const MetricCard = ({ title, value, target, suffix = '', type = 'normal' }) => {
  const percentage = target ? Math.round((value / target) * 100) : null
  const isGood = percentage >= 100
  const isWarning = percentage < 70 && percentage >= 50
  const isDanger = percentage < 50

  let bgColor = 'bg-white'
  let textColor = 'text-gray-900'
  let borderColor = 'border-gray-200'

  if (type === 'danger') {
    bgColor = 'bg-red-50'
    borderColor = 'border-red-300'
  } else if (type === 'warning') {
    bgColor = 'bg-yellow-50'
    borderColor = 'border-yellow-300'
  } else if (type === 'success') {
    bgColor = 'bg-green-50'
    borderColor = 'border-green-300'
  }

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-6 shadow-sm`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900">
          {value}{suffix}
        </p>
        {target && (
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">Meta: {target}</span>
            <div className="flex items-center gap-1 mt-1">
              {isGood && <TrendingUp className="w-4 h-4 text-green-600" />}
              {(isWarning || isDanger) && <TrendingDown className="w-4 h-4 text-red-600" />}
              <span className={`text-sm font-semibold ${
                isGood ? 'text-green-600' : 
                isWarning ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {percentage}%
              </span>
            </div>
          </div>
        )}
      </div>
      {target && value < target && (
        <p className="text-xs text-gray-500 mt-2">
          Faltan: <span className="font-semibold">{target - value}</span>
        </p>
      )}
    </div>
  )
}