'use client'

import { Card } from '@/components/Card'
import { useSongsStore } from '@/stores'
import { Fragment, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useHomeSelector } from '@/stores/selectors'
import { SongsToolbar } from '@/components/SongsToolbar'
import { useFilteredSongs } from '@/hooks/useFilteredSongs'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { prependAssetsImagePath } from '@/utils/prependAssetsImagePath'
import { FadeAnimationWrapper } from '@/components/FadeAnimationWrapper'
import { ContentWrapper } from '@/components/ContentWrapper'

export default function HomePage() {
  const {
    songs,
    search,
    isError,
    isLoading,
    loadSongs,
    setSearch,
    setFavoriteSong,
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

    if (search.length) setSearch('')
  }, [])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )
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
        <div className="mt-10 h-full flex flex-row gap-[42px] flex-wrap max-mobile:justify-center">
          <AnimatePresence>
            {filteredSongs?.map(({ id, song }) => (
              <FadeAnimationWrapper
                layout
                key={id}
                style={{ position: 'relative' }}
              >
                <Card
                  id={id}
                  title={song.title}
                  artist={song.artist}
                  albumTitle={song.album.title}
                  coverArtPath={prependAssetsImagePath(song.files.coverArt)}
                  favorite={{
                    onClick: () => setFavoriteSong(id),
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
    <ContentWrapper>
      <FadeAnimationWrapper>{renderContent()}</FadeAnimationWrapper>
    </ContentWrapper>
  )
}
