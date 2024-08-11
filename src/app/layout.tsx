import '../styles/globals.css'
import type { Metadata } from 'next'
import { Nokora } from 'next/font/google'
// import { CounterStoreProvider } from '@/providers/counter-store-provider'

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
        <div className={`min-h-screen ${nokora.variable}`}>{children}</div>
      </body>
    </html>
  )
}
