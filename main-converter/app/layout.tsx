import type { Viewport } from 'next'

import './globals.css'

export const metadata = {
  title: 'Exchange Converter',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
      <body className='min-h-screen min-h-[100dvh] overflow-x-hidden bg-transparent text-slate-100 antialiased'>
        {children}
      </body>
    </html>
  )
}
