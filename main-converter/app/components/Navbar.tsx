import Image from 'next/image'

import Main from '../../public/Money.png'

const Navbar = () => {
  return (
    <nav className='border-b border-slate-200 bg-slate-950 text-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-3'>
          <Image src={Main} alt='Logo do conversor' width={40} height={40} className='h-10 w-10 rounded-full object-cover' />
          <div>
            <p className='text-lg font-bold'>Currency Quote</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
