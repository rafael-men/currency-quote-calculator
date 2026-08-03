type CurrencyFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  options: string[]
  loading: boolean
}

const getCountryFlagUrl = (currencyCode: string) => {
  const countryCode = currencyCode.slice(0, 2)
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
}

export const CurrencyField = ({ label, id, value, onChange, options, loading }: CurrencyFieldProps) => {
  return (
    <div className='flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center'>
      <div className='flex items-center gap-2 sm:min-w-[160px]'>
        <img
          src={getCountryFlagUrl(value)}
          alt={`Bandeira de ${value}`}
          className='h-8 w-8 rounded-full shadow-md'
        />
        <label htmlFor={id} className='block text-sm font-medium text-slate-700'>
          {label}
        </label>
      </div>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className='w-full min-w-0 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base'
      >
        {loading ? (
          <option>Carregando...</option>
        ) : (
          options.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))
        )}
      </select>
    </div>
  )
}
