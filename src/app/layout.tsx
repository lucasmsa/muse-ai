import Head from 'next/head'
import '../styles/globals.css'
import { Fragment } from 'react'
import type { Metadata } from 'next'
import { Nokora } from 'next/font/google'
import { CounterStoreProvider } from '@/providers/counter-store-provider'

export const metadata: Metadata = {
  title: 'MUSIC.ai coding test',
  description: 'Songs management application',
}

const nokora = Nokora({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-nokora',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CounterStoreProvider>
          <div className={`h-screen ${nokora.variable}`}>{children}</div>
        </CounterStoreProvider>
      </body>
    </html>
  )
}
