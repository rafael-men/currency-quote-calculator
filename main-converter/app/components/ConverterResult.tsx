type ConverterResultProps = {
  amount: number
  fromCurrency: string
  toCurrency: string
  convertedValue: number
}

export const ConverterResult = ({ amount, fromCurrency, toCurrency, convertedValue }: ConverterResultProps) => {
  return (
    <div className='mt-6 rounded-2xl bg-slate-50 px-4 py-5 text-center shadow-sm'>
      <h2 className='text-lg font-semibold text-slate-800 sm:text-xl'>Valor final convertido</h2>
      <p className='mt-2 text-base text-slate-700 sm:text-lg'>
        {amount} {fromCurrency} = {convertedValue.toFixed(2)} {toCurrency}
      </p>
    </div>
  )
}
