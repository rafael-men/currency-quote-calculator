'use client'

import { useMemo, useState } from 'react'

type CurrencyFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  options: string[]
  loading: boolean
}

const currencyNames: Record<string, string> = {
  AED: 'Dirham dos Emirados',
  AFN: 'Afegane Afegão',
  ALL: 'Lek Albanês',
  AMD: 'Dram Armênio',
  ANG: 'Guilder das Antilhas',
  AOA: 'Kwanza Angolano',
  ARS: 'Peso Argentino',
  AUD: 'Dólar Australiano',
  AZN: 'Manat Azeri',
  BBD: 'Dólar Barbadense',
  BDT: 'Taka Bangladeshi',
  BGN: 'Lev Búlgaro',
  BHD: 'Dinar Bahraini',
  BIF: 'Franco Burundinense',
  BND: 'Dólar Bruneano',
  BOB: 'Boliviano',
  BRL: 'Real Brasileiro',
  BNB: 'Binance Coin',
  BRETT: 'Brett',
  BSD: 'Dólar Bahamense',
  BWP: 'Pula Botsuano',
  BYN: 'Rublo Bielorrusso',
  BZD: 'Dólar Belize',
  CAD: 'Dólar Canadense',
  CHF: 'Franco Suíço',
  CLP: 'Peso Chileno',
  CNY: 'Yuan Chinês',
  COP: 'Peso Colombiano',
  CRC: 'Colón Costarriquenho',
  CZK: 'Coroa Tcheca',
  DKK: 'Coroa Dinamarquesa',
  DOGE: 'Dogecoin',
  DOP: 'Peso Dominicano',
  EGP: 'Libra Egípcia',
  ETH: 'Ethereum',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  GEL: 'Lari Georgiano',
  GHS: 'Cedi Ganês',
  HKD: 'Dólar de Hong Kong',
  HNL: 'Lempira Hondurenha',
  HUF: 'Forint Húngaro',
  IDR: 'Rupia Indonésia',
  ILS: 'Novo Shekel Israelense',
  INR: 'Rúpia Indiana',
  JMD: 'Dólar Jamaicano',
  JOD: 'Dinar Jordaniano',
  JPY: 'Iene Japonês',
  KES: 'Shilling Queniano',
  KRW: 'Won Sul-Coreano',
  LTC: 'Litecoin',
  MAD: 'Dirham Marroquino',
  MXN: 'Peso Mexicano',
  MYR: 'Ringgit Malaio',
  NOK: 'Coroa Norueguesa',
  NZD: 'Dólar Neozelandês',
  PEN: 'Sol Peruano',
  PHP: 'Peso Filipino',
  PLN: 'Złoty Polonês',
  PYG: 'Guarani Paraguaio',
  QAR: 'Rial Catariano',
  RON: 'Leu Romeno',
  RSD: 'Dinar Sérvio',
  RUB: 'Rublo Russo',
  SAR: 'Rial Saudita',
  SEK: 'Coroa Sueca',
  SGD: 'Dólar Singapuriano',
  SOL: 'Solana',
  THB: 'Baht Tailandês',
  TRY: 'Lira Turca',
  TWD: 'Dólar Taiwanês',
  UAH: 'Hryvnia Ucraniana',
  USD: 'Dólar Americano',
  UYU: 'Peso Uruguaio',
  VEF: 'Bolívar Venezuelano',
  XAG: 'Prata',
  XAU: 'Ouro',
  XCD: 'Dólar do Caribe Oriental',
  XOF: 'Franco CFA BCEAO',
  XPF: 'Franco CFP',
  XRP: 'Ripple',
  ZAR: 'Rand Sul-Africano',
  BTC: 'Bitcoin',
}

const displayNames =
  typeof Intl !== 'undefined' && 'DisplayNames' in Intl
    ? new Intl.DisplayNames(['pt-BR'], { type: 'currency' })
    : null

const getCountryFlagUrl = (currencyCode: string) => {
  const countryCode = currencyCode.slice(0, 2)
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
}

const getCurrencyLabel = (currencyCode: string) => {
  const normalizedCode = currencyCode.toUpperCase()
  const mappedName = currencyNames[normalizedCode]

  let browserName: string | undefined

  try {
    browserName = displayNames?.of(normalizedCode)
  } catch {
    browserName = undefined
  }

  const name = mappedName ?? browserName ?? normalizedCode

  return `${normalizedCode} - ${name}`
}

export const CurrencyField = ({ label, id, value, onChange, options, loading }: CurrencyFieldProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedLabel = useMemo(() => getCurrencyLabel(value), [value])

  return (
    <div className='flex w-full min-w-0 flex-col gap-2 lg:flex-row lg:items-center'>
      <div className='flex shrink-0 items-center gap-2 lg:min-w-[160px]'>
        <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.22)]'>
          <img
            src={getCountryFlagUrl(value)}
            alt={`Bandeira de ${value}`}
            className='h-full w-full object-cover object-center'
            loading='lazy'
          />
        </div>
        <label htmlFor={id} className='block text-sm font-medium text-slate-300'>
          {label}
        </label>
      </div>

      <div className='relative w-full min-w-0'>
        <button
          id={id}
          type='button'
          onClick={() => setIsOpen((open) => !open)}
          className='flex min-h-[44px] w-full items-center justify-between rounded-2xl border border-white/15 bg-slate-950/50 px-4 py-3 text-left text-base text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] outline-none transition hover:border-blue-400/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40'
        >
          <span className='min-w-0 truncate pr-2'>{loading ? 'Carregando...' : selectedLabel}</span>
          <span className='shrink-0 text-slate-300'>▼</span>
        </button>

        {isOpen && !loading && (
          <div className='absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl'>
            <ul className='max-h-[min(18rem,calc(100dvh-10rem))] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600'>
              {options.map((currency) => {
                const active = currency === value

                return (
                  <li key={currency}>
                    <button
                      type='button'
                      onClick={() => {
                        onChange(currency)
                        setIsOpen(false)
                      }}
                      className={`flex min-h-[44px] w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm transition sm:text-base ${active ? 'bg-blue-400/80 text-slate-950' : 'text-slate-100 hover:bg-white/10'
                        }`}
                    >
                      <span className='min-w-0 truncate'>{getCurrencyLabel(currency)}</span>
                      {active && <span className='font-semibold'>✓</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
