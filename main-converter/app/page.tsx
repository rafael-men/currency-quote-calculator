import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Main from './pages/Main'

export default function Home() {
  return (
    <div className='flex min-h-screen min-h-[100dvh] flex-col bg-transparent text-slate-100'>
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}
