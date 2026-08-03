type AmountInputProps = {
  amount: number
  onChange: (value: number) => void
}

export const AmountInput = ({ amount, onChange }: AmountInputProps) => {
  return (
    <div className='w-full min-w-0'>
      <label htmlFor='amount' className='mb-2 block text-sm font-medium text-slate-700'>
        Valor a ser convertido
      </label>
      <input
        id='amount'
        type='number'
        min='0'
        value={amount}
        onChange={(event) => onChange(Number(event.target.value))}
        className='w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base'
      />
    </div>
  )
}
