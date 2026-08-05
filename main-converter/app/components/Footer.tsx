import packageJson from '../../package.json'

const Footer = () => {
  return (
    <footer className='mt-auto border-t border-white/10 bg-slate-950/80 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-white backdrop-blur-xl'>
      <div className='mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-3 text-center text-sm sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8'>
        <p className='text-slate-300'>
          Desenvolvido por
          <a
            href='https://github.com/seu-rafael-men'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-1 text-blue-300 hover:underline'
          >
            Rafael
          </a>
        </p>
        <p className='text-slate-400'>©2023 v{packageJson.version}</p>
      </div>
    </footer>
  )
}

export default Footer
