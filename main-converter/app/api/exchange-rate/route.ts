import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://economia.awesomeapi.com.br'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fromCurrency = searchParams.get('fromCurrency')?.toUpperCase()
  const toCurrency = searchParams.get('toCurrency')?.toUpperCase()
  const amount = searchParams.get('amount')

  if (!fromCurrency || !toCurrency || !amount) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  try {
    const response = await fetch(`${API_BASE_URL}/json/last/${fromCurrency}-${toCurrency}`)

    if (!response.ok) {
      throw new Error('Falha ao consultar a taxa de câmbio')
    }

    const data = await response.json()
    const rateKey = `${fromCurrency}${toCurrency}`
    const quote = data?.[rateKey]

    if (!quote?.bid) {
      return NextResponse.json(
        { error: `Não foi possível encontrar a taxa de câmbio para ${fromCurrency}-${toCurrency}` },
        { status: 404 },
      )
    }

    const rate = Number(quote.bid)

    return NextResponse.json({
      rate,
      convertedValue: Number(amount) * rate,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
