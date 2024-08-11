'use client'

import { Card } from '@/components/Card'
import { useSongsStore } from '@/stores'
import { Fragment, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { AnimatePresence } from 'framer-motion'
import { useHomeSelector } from '@/stores/selectors'
import { SongsToolbar } from '@/components/SongsToolbar'
import { useFilteredSongs } from '@/hooks/useFilteredSongs'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { prependAssetsImagePath } from '@/utils/prependAssetsImagePath'
import { FadeAnimationWrapper } from '@/components/FadeAnimationWrapper'

export default function HomePage() {
  const {
    songs,
    search,
    isError,
    isLoading,
    loadSongs,
    favoriteSong,
    favoritedSongsIds,
    showOnlyFavorites,
    showAlphabeticallyOrdered,
  } = useSongsStore(useHomeSelector)

  const { filteredSongs } = useFilteredSongs({
    songs,
    search,
    favoritedSongsIds,
    showOnlyFavorites,
    showAlphabeticallyOrdered,
  })

  useEffect(() => {
    loadSongs()
  }, [])

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />
    }

    if (isError) {
      return (
        <h3 className="text-white font-semibold text-lg self-center">
          Error: {isError?.message || 'Something went wrong'}
        </h3>
      )
    }

    return (
      <Fragment>
        <SongsToolbar />
        <div className="mt-10 h-full flex flex-row gap-[42px] flex-wrap">
          <AnimatePresence>
            {filteredSongs?.map(({ id, song }) => (
              <FadeAnimationWrapper
                layout
                key={id}
                style={{ position: 'relative' }}
              >
                <Card
                  title={song.title}
                  artist={song.artist}
                  albumTitle={song.album.title}
                  coverArt={prependAssetsImagePath(song.files.coverArt)}
                  favorite={{
                    onClick: () => favoriteSong(id),
                    isFavorited: favoritedSongsIds.has(id),
                  }}
                />
              </FadeAnimationWrapper>
            ))}
          </AnimatePresence>
        </div>
      </Fragment>
    )
  }

  return (
    <main className="w-full h-full flex min-h-screen flex-col bg-black">
      <Navbar />
      <section className="pb-16 max-w-[1240px] flex-grow w-full h-full flex flex-col pt-12 mx-auto px-6">
        <FadeAnimationWrapper>{renderContent()}</FadeAnimationWrapper>
      </section>
    </main>
  )
}
