import Image from 'next/image'

import Main from '../../public/Money.png'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 pt-[env(safe-area-inset-top)] text-white backdrop-blur-xl'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8'>
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-300/40 sm:h-10 sm:w-10'>
            <Image src={Main} alt='Logo do conversor' width={40} height={40} className='h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8' />
          </div>
          <p className='truncate text-base font-bold text-slate-100 sm:text-lg'>Currency Quote</p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
