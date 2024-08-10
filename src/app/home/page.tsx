'use client'

import { Card } from '@/components/Card'
import { Navbar } from '@/components/Navbar'
import { SongsToolbar } from '@/components/SongsToolbar'
import { useCounterStore } from '@/providers/counter-store-provider'

export default function HomePage() {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state,
  )

  return (
    <main className="w-full h-full flex flex-col">
      <Navbar />
      <section className="bg-black flex-grow w-full h-full flex flex-col pt-12 pl-36 pr-36">
        <SongsToolbar />
        <div className="mt-10">
          <Card
            title="Nice band"
            artist="Great artist"
            albumTitle="Album title"
            coverArt="/assets/images/amy-poster.jpeg"
            isFavorited
          />
        </div>
      </section>
    </main>
  )
}
