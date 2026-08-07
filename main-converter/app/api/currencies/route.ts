import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://economia.awesomeapi.com.br'

export async function GET() {
  try {
    const [uniqResponse, availableResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/json/available/uniq`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CurrencyCalculator/1.0)' },
        cache: 'no-store',
      }),
      fetch(`${API_BASE_URL}/json/available`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CurrencyCalculator/1.0)' },
        cache: 'no-store',
      }),
    ])

    if (!uniqResponse.ok || !availableResponse.ok) {
      console.error('AwesomeAPI falhou:', {
        uniqStatus: uniqResponse.status,
        uniqStatusText: uniqResponse.statusText,
        availableStatus: availableResponse.status,
        availableStatusText: availableResponse.statusText,
      })
      throw new Error(
        `Falha ao consultar a lista de moedas (uniq: ${uniqResponse.status}, available: ${availableResponse.status})`
      )
    }

    const uniqueCurrencies = await uniqResponse.json()
    const availablePairs = await availableResponse.json()

    if (!uniqueCurrencies || typeof uniqueCurrencies !== 'object' || !availablePairs || typeof availablePairs !== 'object') {
      return NextResponse.json(
        { error: 'Não foi possível encontrar as moedas na resposta da API.' },
        { status: 400 },
      )
    }

    return NextResponse.json({
      currencies: Object.keys(uniqueCurrencies),
      pairs: Object.keys(availablePairs),
    })
  } catch (error) {
    console.error('Erro na rota /api/currencies:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}