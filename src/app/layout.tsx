import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ProvidersComponent from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoStop',
  description: 'AutoStop app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersComponent>
          {children}
        </ProvidersComponent>
      </body>
    </html>
  )
}
