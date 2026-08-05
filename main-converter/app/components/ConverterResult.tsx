type ConverterResultProps = {
  amount: number
  fromCurrency: string
  toCurrency: string
  convertedValue: number
}

export const ConverterResult = ({ amount, fromCurrency, toCurrency, convertedValue }: ConverterResultProps) => {
  return (
    <div className='mt-6 rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:rounded-3xl sm:px-4 sm:py-5'>
      <h2 className='text-base font-semibold text-slate-100 sm:text-lg lg:text-xl'>Valor final convertido</h2>
      <p className='mt-2 break-words text-sm tabular-nums leading-relaxed text-slate-200 sm:text-base lg:text-lg'>
        {amount} {fromCurrency} = {convertedValue.toFixed(2)} {toCurrency}
      </p>
    </div>
  )
}
