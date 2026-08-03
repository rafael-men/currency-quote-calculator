import './globals.css'

export const metadata = {
  title: 'Exchange Converter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR'>
      <head>
        <link rel='icon' href='/Money.png' />
        <link href='https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap' rel='stylesheet' />
      </head>
      <body className='min-h-screen bg-slate-100 text-slate-900'>
        {children}
      </body>
    </html>
  )
}
