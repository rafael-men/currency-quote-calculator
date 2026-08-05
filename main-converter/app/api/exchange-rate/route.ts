import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://economia.awesomeapi.com.br'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fromCurrency = searchParams.get('fromCurrency')?.toUpperCase()
  const toCurrency = searchParams.get('toCurrency')?.toUpperCase()
  const amount = searchParams.get('amount')
  const historyDays = Number(searchParams.get('history') ?? 6)

  if (!fromCurrency || !toCurrency || !amount) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  try {
    const [quoteResponse, historyResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/json/last/${fromCurrency}-${toCurrency}`),
      fetch(`${API_BASE_URL}/json/daily/${fromCurrency}-${toCurrency}/${Math.max(1, historyDays)}`),
    ])

    if (!quoteResponse.ok || !historyResponse.ok) {
      throw new Error('Falha ao consultar a taxa de câmbio')
    }

    const quoteData = await quoteResponse.json()
    const historyData = await historyResponse.json()
    const rateKey = `${fromCurrency}${toCurrency}`
    const quote = quoteData?.[rateKey]

    if (!quote?.bid) {
      return NextResponse.json(
        { error: `Não foi possível encontrar a taxa de câmbio para ${fromCurrency}-${toCurrency}` },
        { status: 404 },
      )
    }

    const rate = Number(quote.bid)
    const history = Array.isArray(historyData)
      ? historyData
        .map((entry) => Number(entry?.bid))
        .filter((value) => Number.isFinite(value))
        .reverse()
      : []

    return NextResponse.json({
      rate,
      convertedValue: Number(amount) * rate,
      history,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
