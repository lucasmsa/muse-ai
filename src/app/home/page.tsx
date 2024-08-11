'use client'

import { Card } from '@/components/Card'
import { useSongsStore } from '@/stores'
import { Fragment, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { SongsToolbar } from '@/components/SongsToolbar'
import { prependAssetsImagePath } from '@/utils/prependAssetsImagePath'
import { useHomeSelector } from '@/stores/selectors'
import { AnimatePresence, motion } from 'framer-motion'

export default function HomePage() {
  const {
    songs,
    isError,
    isLoading,
    loadSongs,
    favoriteSong,
    favoritedSongsIds,
    showOnlyFavorites,
  } = useSongsStore(useHomeSelector)

  useEffect(() => {
    loadSongs()
  }, [])

  const renderContent = () => {
    const filteredSongs = showOnlyFavorites
      ? songs.filter((song) => favoritedSongsIds.has(song.id))
      : songs

    if (songs.length === 0) {
      return <h3 className="font-semibold text-lg">No songs found</h3>
    }

    if (isLoading) {
      // Use a spinner component here
      return <div>Loading...</div>
    }

    if (isError) {
      return (
        <h3 className="text-white font-semibold text-lg">
          Error: {isError.message}
        </h3>
      )
    }

    return (
      <Fragment>
        <SongsToolbar />
        <div className="mt-10 h-full flex flex-row gap-[42px] flex-wrap">
          <AnimatePresence>
            {filteredSongs?.map(({ id, song }) => (
              <motion.div
                layout
                key={id}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'relative' }}
              >
                <Card
                  title={song.title}
                  artist={song.artist}
                  albumTitle={song.album.title}
                  coverArt={prependAssetsImagePath(song.files.coverArt)}
                  favorite={{
                    isFavorited: favoritedSongsIds.has(id),
                    onClick: () => favoriteSong(id),
                  }}
                />
              </motion.div>
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
        {renderContent()}
      </section>
    </main>
  )
}
