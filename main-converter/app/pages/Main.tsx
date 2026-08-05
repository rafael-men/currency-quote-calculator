'use client'

import { AmountInput } from '../components/AmountInput'
import { ConverterResult } from '../components/ConverterResult'
import { CurrencyChart } from '../components/CurrencyChart'
import { CurrencyField } from '../components/CurrencyField'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter'

const Main = () => {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    fromCurrencyOptions,
    toCurrencyOptions,
    convertedValue,
    loading,
    loadingRate,
    errorMessage,
    chartData,
  } = useCurrencyConverter()

  return (
    <main className='mx-auto w-full max-w-5xl flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8'>
      <div className='glass-shell w-full overflow-hidden rounded-2xl p-4 sm:rounded-[32px] sm:p-6 lg:rounded-[36px] lg:p-8'>
        <div className='mb-5 text-center sm:mb-6'>
          <h1 className='text-xl font-bold text-white sm:text-2xl lg:text-3xl'>Conversão de Moedas</h1>
          <p className='mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base'>
            Compare taxas e visualize a cotação em um gráfico simples.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <AmountInput amount={amount} currency={fromCurrency} onChange={setAmount} />
          </div>

          <CurrencyField
            label='Moeda atual'
            id='fromCurrency'
            value={fromCurrency}
            onChange={setFromCurrency}
            options={fromCurrencyOptions}
            loading={loading}
          />

          <CurrencyField
            label='Moeda final'
            id='toCurrency'
            value={toCurrency}
            onChange={setToCurrency}
            options={toCurrencyOptions}
            loading={loading}
          />
        </div>

        {loadingRate && (
          <div className='mt-6 rounded-xl border border-blue-300/30 bg-blue-400/15 px-4 py-3 text-center text-sm text-blue-100'>
            Carregando taxa de câmbio...
          </div>
        )}

        {errorMessage && (
          <div className='mt-6 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white shadow-lg'>
            {errorMessage}
          </div>
        )}

        {convertedValue !== null && (
          <ConverterResult
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            convertedValue={convertedValue}
          />
        )}

        <div className='mt-6'>
          <CurrencyChart chartData={chartData} />
        </div>
      </div>
    </main>
  )
}

export default Main