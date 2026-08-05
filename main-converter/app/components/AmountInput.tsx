'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import {
  formatAmountNumber,
  getCurrencyPrefix,
  normalizeAmountForCurrency,
  parseCurrencyInput,
  sanitizeCurrencyTyping,
} from '../utils/currencyFormat'

type AmountInputProps = {
  amount: number
  currency: string
  onChange: (value: number) => void
}

export const AmountInput = ({ amount, currency, onChange }: AmountInputProps) => {
  const prefix = useMemo(() => getCurrencyPrefix(currency), [currency])
  const previousCurrency = useRef(currency)
  const [displayValue, setDisplayValue] = useState(() => formatAmountNumber(amount, currency))
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (previousCurrency.current !== currency) {
      previousCurrency.current = currency
      const normalized = normalizeAmountForCurrency(amount, currency)

      if (normalized !== amount) {
        onChange(normalized)
      }

      setDisplayValue(formatAmountNumber(normalized, currency))
      return
    }

    if (!isFocused) {
      setDisplayValue(formatAmountNumber(amount, currency))
    }
  }, [amount, currency, isFocused, onChange])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeCurrencyTyping(event.target.value)
    const parsed = parseCurrencyInput(sanitized, currency)

    setDisplayValue(sanitized)
    onChange(parsed)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setDisplayValue(formatAmountNumber(amount, currency))
  }

  return (
    <div className='w-full min-w-0'>
      <label htmlFor='amount' className='mb-2 block text-sm font-medium text-slate-300'>
        Valor a ser convertido
      </label>
      <div className='flex min-h-[44px] w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/40 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/40'>
        <span className='shrink-0 text-base font-medium tabular-nums text-slate-300' aria-hidden='true'>
          {prefix}
        </span>
        <input
          id='amount'
          type='text'
          inputMode='decimal'
          autoComplete='off'
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          aria-label={`Valor em ${currency}`}
          className='min-w-0 flex-1 bg-transparent py-3 text-base tabular-nums text-white outline-none'
        />
      </div>
    </div>
  )
}
