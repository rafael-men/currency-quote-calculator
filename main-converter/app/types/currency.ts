export type CurrencyQuoteResponse = {
  quotes?: Record<string, number>
}

export type CurrencyListResponse = {
  currencies?: string[]
  pairs?: string[]
}

export type ChartDataPoint = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}
