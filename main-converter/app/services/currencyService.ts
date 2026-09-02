import type { CurrencyListResponse, CurrencyQuoteResponse } from '../types/currency'

const API_BASE_URL = 'https://economia.awesomeapi.com.br'

export const fetchCurrencies = async (): Promise<{ currencies: string[]; pairs: string[] }> => {
  const [uniqueCurrenciesResponse, availablePairsResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/json/available/uniq`, { cache: 'no-store' }),
    fetch(`${API_BASE_URL}/json/available`, { cache: 'no-store' }),
  ])

  if (!uniqueCurrenciesResponse.ok || !availablePairsResponse.ok) {
    throw new Error('Não foi possível carregar a lista de moedas.')
  }

  const uniqueCurrencies = (await uniqueCurrenciesResponse.json()) as Record<string, string>
  const availablePairs = (await availablePairsResponse.json()) as Record<string, string>
  const data: CurrencyListResponse = {
    currencies: Object.keys(uniqueCurrencies ?? {}),
    pairs: Object.keys(availablePairs ?? {}),
  }

  if (!Array.isArray(data.currencies) || data.currencies.length === 0) {
    throw new Error('Não foi possível encontrar as moedas na resposta da API.')
  }

  return {
    currencies: data.currencies,
    pairs: Array.isArray(data.pairs) ? data.pairs : [],
  }
}

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number,
): Promise<{ convertedValue: number; rate: number; history: number[] }> => {
  const params = new URLSearchParams({
    fromCurrency: fromCurrency.toUpperCase(),
    toCurrency: toCurrency.toUpperCase(),
    amount: String(Number.isFinite(amount) ? amount : 0),
  })
  const pair = `${params.get('fromCurrency')}-${params.get('toCurrency')}`
  const historyDays = 6
  const [quoteResponse, historyResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/json/last/${pair}`, { cache: 'no-store' }),
    fetch(`${API_BASE_URL}/json/daily/${pair}/${historyDays}`, { cache: 'no-store' }),
  ])

  if (!quoteResponse.ok || !historyResponse.ok) {
    throw new Error('Não foi possível carregar a taxa de câmbio.')
  }

  const quoteData = (await quoteResponse.json()) as Record<string, { bid?: string }>
  const historyData = (await historyResponse.json()) as Array<{ bid?: string }>
  const rateKey = `${params.get('fromCurrency')}${params.get('toCurrency')}`
  const rate = Number(quoteData?.[rateKey]?.bid)
  const history = Array.isArray(historyData)
    ? historyData
      .map((entry) => Number(entry?.bid))
      .filter((value) => Number.isFinite(value))
      .reverse()
    : []
  const data = {
    rate,
    convertedValue: Number(params.get('amount')) * rate,
    history,
  } satisfies CurrencyQuoteResponse & { convertedValue: number; rate: number; history?: number[] }

  if (!Number.isFinite(data.rate) || !Number.isFinite(data.convertedValue)) {
    throw new Error(`Não foi possível encontrar a taxa de câmbio para ${fromCurrency}${toCurrency}`)
  }

  return {
    rate: data.rate,
    convertedValue: data.convertedValue,
    history: Array.isArray(data.history) ? data.history : [],
  }
}
