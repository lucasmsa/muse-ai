'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { useSongsStore } from '@/stores'
import { Card } from '@/components/Card'
import { useSongSelector } from '@/stores/selectors'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ContentWrapper } from '@/components/ContentWrapper'
import { SongPlayerCard } from '@/components/SongPlayerCard'
import { prependAssetsImagePath } from '@/utils/prependAssetsImagePath'
import { prependAssetsAudioPath } from '@/utils/prependAssetsAudioPath'
import { FadeAnimationWrapper } from '@/components/FadeAnimationWrapper'
import { radialGradientStylization } from '@/styles/utils/radialGradientStylization'

interface SongPageProps {
  params: {
    id: string
  }
}

export default function SongPage({ params: { id } }: SongPageProps) {
  const {
    song,
    songs,
    isError,
    loadSong,
    isLoading,
    loadSongs,
    getRelatedSongs,
    setFavoriteSong,
    favoritedSongsIds,
  } = useSongsStore(useSongSelector)

  useEffect(() => {
    loadSong(id)

    if (songs.length === 0) {
      loadSongs()
    }
  }, [id, loadSongs, loadSong])

  const relatedSongs = getRelatedSongs(song?.id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    return (
      <h3 className="text-white font-semibold text-lg self-center text-center mx-auto">
        Error: {isError?.message || 'Something went wrong'}
      </h3>
    )
  }

  if (!song) return

  return (
    <>
      <Image
        width={512}
        height={512}
        {...radialGradientStylization}
        src={prependAssetsImagePath(song?.files.coverArt)}
        alt="Song album cover image faded in the background"
        className="absolute right-0 mix-blend-overlay ml-auto max-tablet:max-w-0 max-tablet:max-h-0"
      />
      <ContentWrapper>
        <FadeAnimationWrapper>
          <SongPlayerCard
            title={song.title}
            album={song.album}
            artist={song.artist}
            songPath={prependAssetsAudioPath(song.files.audio)}
            favorite={{
              onClick: () => setFavoriteSong(Number(song.id)),
              isFavorited: favoritedSongsIds.has(Number(song.id)),
            }}
            coverArtPath={prependAssetsImagePath(song.files.coverArt)}
          />
          {relatedSongs?.length && (
            <div className="mt-24 flex flex-col max-tablet:mx-auto max-tablet:items-center">
              <p className="text-fade-white text-base">Other albums</p>
              <div className="flex flex-row w-full gap-8 flex-wrap mt-5 max-tablet:items-center max-tablet:justify-center">
                {relatedSongs?.map((relatedSong) => (
                  <Card
                    id={relatedSong.id}
                    key={relatedSong.id}
                    title={relatedSong.song.title}
                    artist={relatedSong.song.artist}
                    albumTitle={relatedSong.song.album.title}
                    coverArtPath={prependAssetsImagePath(
                      relatedSong.song.files.coverArt,
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </FadeAnimationWrapper>
      </ContentWrapper>
    </>
  )
}
