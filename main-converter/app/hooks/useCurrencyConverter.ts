import { useEffect, useMemo, useState } from 'react'

import { fetchCurrencies, fetchExchangeRate } from '../services/currencyService'
import type { ChartDataPoint } from '../types/currency'

const INITIAL_FROM_CURRENCY = 'BRL'
const INITIAL_TO_CURRENCY = 'USD'

export const useCurrencyConverter = () => {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState(INITIAL_FROM_CURRENCY)
  const [toCurrency, setToCurrency] = useState(INITIAL_TO_CURRENCY)
  const [currencies, setCurrencies] = useState<string[]>([])
  const [pairs, setPairs] = useState<string[]>([])
  const [convertedValue, setConvertedValue] = useState<number | null>(null)
  const [currentRate, setCurrentRate] = useState<number | null>(null)
  const [rateHistory, setRateHistory] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingRate, setLoadingRate] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isPairSupported = (source: string, target: string) => pairs.includes(`${source}-${target}`)

  const fromCurrencyOptions = useMemo(() => {
    if (currencies.length === 0) {
      return []
    }

    if (!toCurrency) {
      return currencies
    }

    return currencies.filter((currency) => currency !== toCurrency && isPairSupported(currency, toCurrency))
  }, [currencies, pairs, toCurrency])

  const toCurrencyOptions = useMemo(() => {
    if (currencies.length === 0) {
      return []
    }

    if (!fromCurrency) {
      return currencies
    }

    return currencies.filter((currency) => currency !== fromCurrency && isPairSupported(fromCurrency, currency))
  }, [currencies, fromCurrency, pairs])

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const catalog = await fetchCurrencies()
        setCurrencies(catalog.currencies)
        setPairs(catalog.pairs)
        setErrorMessage(null)
      } catch (error) {
        console.error('Erro ao carregar as moedas: ', error)
        setErrorMessage('Não foi possível carregar as moedas disponíveis.')
      } finally {
        setLoading(false)
      }
    }

    loadCurrencies()
  }, [])

  useEffect(() => {
    if (loading || currencies.length === 0) {
      return
    }

    if (!isPairSupported(fromCurrency, toCurrency)) {
      const fallbackToCurrency = toCurrencyOptions[0] ?? currencies.find((currency) => currency !== fromCurrency)

      if (fallbackToCurrency) {
        setToCurrency(fallbackToCurrency)
      }
    }
  }, [currencies, fromCurrency, loading, toCurrency, toCurrencyOptions])

  useEffect(() => {
    const loadExchangeRate = async () => {
      if (loading || !fromCurrency || !toCurrency || currencies.length === 0) {
        setConvertedValue(null)
        setCurrentRate(null)
        setRateHistory([])
        return
      }

      if (!isPairSupported(fromCurrency, toCurrency)) {
        setConvertedValue(null)
        setCurrentRate(null)
        setRateHistory([])
        setErrorMessage(`A conversão de ${fromCurrency} para ${toCurrency} não está disponível.`)
        return
      }

      try {
        setLoadingRate(true)
        setErrorMessage(null)
        const { convertedValue, rate, history } = await fetchExchangeRate(fromCurrency, toCurrency, amount)

        setConvertedValue(convertedValue)
        setCurrentRate(rate)
        setRateHistory(history.length > 0 ? history : [rate])
      } catch (error) {
        console.error('Erro ao carregar dados: ', error)
        setConvertedValue(null)
        setCurrentRate(null)
        setRateHistory([])
        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar a taxa de câmbio.')
      } finally {
        setLoadingRate(false)
      }
    }

    loadExchangeRate()

    const refreshInterval = window.setInterval(() => {
      loadExchangeRate()
    }, 30000)

    return () => {
      window.clearInterval(refreshInterval)
    }
  }, [amount, currencies.length, fromCurrency, loading, toCurrency, pairs])

  const chartData = useMemo<ChartDataPoint | null>(() => {
    if (currentRate === null || convertedValue === null) {
      return null
    }

    const normalizedRate = 1 / currentRate
    const chartSeries = rateHistory.length > 0 ? rateHistory.map((value) => 1 / value) : [normalizedRate]
    const labels = chartSeries.map((_, index) => {
      const daysAgo = chartSeries.length - index - 1
      return daysAgo === 0 ? 'Hoje' : `${daysAgo}d`
    })

    return {
      labels,
      datasets: [
        {
          label: `${toCurrency} / ${fromCurrency} Exchange Rate`,
          data: chartSeries,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.16)',
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 5,
          pointBackgroundColor: '#1d4ed8',
          pointBorderColor: '#ffffff',
        },
      ],
    }
  }, [convertedValue, currentRate, fromCurrency, rateHistory, toCurrency])

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
    fromCurrencyOptions,
    toCurrencyOptions,
    convertedValue,
    loading,
    loadingRate,
    errorMessage,
    chartData,
  }
}
