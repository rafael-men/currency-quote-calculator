import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as chartjs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import type { ChartDataPoint } from '../types/currency'

chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type CurrencyChartProps = {
  chartData: ChartDataPoint | null
}

export const CurrencyChart = ({ chartData }: CurrencyChartProps) => {
  if (!chartData) {
    return null
  }

  return (
    <div className='glass-subtle mb-2 overflow-hidden rounded-2xl p-3 sm:mb-6 sm:rounded-[28px] sm:p-4'>
      <div className='mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3'>
        <div className='min-w-0'>
          <p className='text-sm font-semibold text-white sm:text-base'>Cotação recente</p>
          <p className='text-xs text-slate-300 sm:text-sm'>Atualização automática da taxa atual</p>
        </div>
        <span className='w-fit shrink-0 rounded-full border border-blue-300/40 bg-blue-400/20 px-3 py-1 text-xs font-semibold text-blue-100'>
          Ao vivo
        </span>
      </div>

      <div className='h-[200px] w-full min-w-0 sm:h-[260px] lg:h-[300px]'>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                titleColor: '#e2e8f0',
                bodyColor: '#bfdbfe',
                borderColor: 'rgba(96, 165, 250, 0.45)',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                  label: (context) => `Cotação: ${context.parsed.y.toFixed(4)}`,
                },
              },
            },
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#cbd5e1',
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 6,
                },
              },
              y: {
                border: {
                  display: false,
                },
                grid: {
                  color: 'rgba(148, 163, 184, 0.16)',
                },
                ticks: {
                  color: '#cbd5e1',
                  callback: (value) => Number(value).toFixed(4),
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}
