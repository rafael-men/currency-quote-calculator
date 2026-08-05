'use client'

import { AmountInput } from './AmountInput'
import { ConverterResult } from './ConverterResult'
import { CurrencyChart } from './CurrencyChart'
import { CurrencyField } from './CurrencyField'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter'

export const CurrencyConverter = () => {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
    convertedValue,
    loading,
    loadingRate,
    errorMessage,
    chartData,
  } = useCurrencyConverter()

  return (
    <main className='flex-1 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='glass-shell mx-auto max-w-5xl rounded-[32px] p-4 sm:p-6 lg:p-8'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold text-white sm:text-3xl'>Conversão de Moedas</h1>
          <p className='mt-2 text-sm text-slate-300 sm:text-base'>Compare taxas e visualize a cotação em um gráfico simples.</p>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='flex items-end'>
            <AmountInput amount={amount} currency={fromCurrency} onChange={setAmount} />
          </div>

          <CurrencyField
            label='Moeda atual'
            id='fromCurrency'
            value={fromCurrency}
            onChange={setFromCurrency}
            options={currencies}
            loading={loading}
          />

          <CurrencyField
            label='Moeda final'
            id='toCurrency'
            value={toCurrency}
            onChange={setToCurrency}
            options={currencies}
            loading={loading}
          />
        </div>

        {loadingRate && (
          <div className='mt-6 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm text-blue-700'>
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
