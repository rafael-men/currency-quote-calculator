import type { CurrencyListResponse, CurrencyQuoteResponse } from '../types/currency'

const API_BASE_URL = '/api'

export const fetchCurrencies = async (): Promise<{ currencies: string[]; pairs: string[] }> => {
  const response = await fetch(`${API_BASE_URL}/currencies`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar a lista de moedas.')
  }

  const data = (await response.json()) as CurrencyListResponse

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
): Promise<{ convertedValue: number; rate: number }> => {
  const params = new URLSearchParams({
    fromCurrency,
    toCurrency,
    amount: String(amount),
  })

  const response = await fetch(`${API_BASE_URL}/exchange-rate?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar a taxa de câmbio.')
  }

  const data = (await response.json()) as CurrencyQuoteResponse & { convertedValue: number; rate: number }

  if (typeof data.rate !== 'number' || typeof data.convertedValue !== 'number') {
    throw new Error(`Não foi possível encontrar a taxa de câmbio para ${fromCurrency}${toCurrency}`)
  }

  return {
    rate: data.rate,
    convertedValue: data.convertedValue,
  }
}
