import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Main from './pages/Main'

export default function Home() {
  return (
    <div className='min-h-screen bg-slate-100 text-slate-900'>
      <Navbar />
      <main className='mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
        <Main />
      </main>
      <Footer />
    </div>
  )
}
