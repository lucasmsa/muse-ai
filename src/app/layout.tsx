import '../styles/globals.css'
import type { Metadata } from 'next'
import { Nokora } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

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
        <div className={`min-h-screen ${nokora.variable}`}>
          <main className="w-full h-full flex min-h-screen flex-col bg-black">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
