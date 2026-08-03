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
    <div className='mb-6 h-[240px] w-full sm:h-[300px]'>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  )
}
