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
        return
      }

      if (!isPairSupported(fromCurrency, toCurrency)) {
        setConvertedValue(null)
        setErrorMessage(`A conversão de ${fromCurrency} para ${toCurrency} não está disponível.`)
        return
      }

      try {
        setLoadingRate(true)
        setErrorMessage(null)
        const { convertedValue } = await fetchExchangeRate(fromCurrency, toCurrency, amount)

        setConvertedValue(convertedValue)
      } catch (error) {
        console.error('Erro ao carregar dados: ', error)
        setConvertedValue(null)
        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar a taxa de câmbio.')
      } finally {
        setLoadingRate(false)
      }
    }

    loadExchangeRate()
  }, [amount, currencies.length, fromCurrency, loading, toCurrency, pairs])

  const chartData = useMemo<ChartDataPoint | null>(() => {
    if (convertedValue === null) {
      return null
    }

    const estimatedRate = convertedValue / Math.max(amount, 1)

    return {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
          data: [estimatedRate, estimatedRate + 0.1, estimatedRate + 0.2, estimatedRate + 0.3, estimatedRate + 0.4],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
        },
      ],
    }
  }, [amount, convertedValue, fromCurrency, toCurrency])

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
