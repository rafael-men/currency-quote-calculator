const Footer = () => {
  return (
    <footer className='mt-6 bg-slate-950 py-6 text-white'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 text-center text-sm sm:flex-row sm:justify-between sm:text-left'>
        <p>
          Desenvolvido por
          <a
            href='https://github.com/seu-rafael-men'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-1 text-blue-400 hover:underline'
          >
            Rafael
          </a>
        </p>
        <p className='text-slate-400'>© 2026 Currency Quote</p>
      </div>
    </footer>
  )
}

export default Footer
