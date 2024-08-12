import Image from 'next/image'
import { Album } from '@/types'
import { useRef, useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import AudioPlayer from 'react-h5-audio-player'
import { getFavoriteIconSource } from '@/utils/getFavoriteIconSource'

interface SongPlayerCardProps {
  album: Album
  title: string
  artist: string
  songPath: string
  favorite: {
    isFavorited: boolean
    onClick: () => void
  }
  coverArtPath: string
}

export const SongPlayerCard = ({
  album,
  title,
  artist,
  songPath,
  coverArtPath,
  favorite: { isFavorited, onClick },
}: SongPlayerCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioPlayerRef = useRef<AudioPlayer>(null)

  const handlePlayPause = () => {
    if (isPlaying) {
      audioPlayerRef.current?.audio.current?.pause()
    } else {
      audioPlayerRef.current?.audio.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      className="flex flex-row max-tablet:flex-col gap-8 text-white w-[720px] max-tablet:w-[400px] max-tablet:justify-center max-tablet:items-center
                    max-tablet:mx-auto max-mobile:w-[240px]"
    >
      <Image
        width={200}
        height={200}
        src={coverArtPath}
        alt="Album cover art"
        className="rounded outline-2 outline"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-9 max-tablet:h-32 items-center">
          <Image
            width={64}
            height={64}
            alt={`${isPlaying ? 'Play' : 'Pause'} button icon`}
            className="cursor-pointer"
            onClick={handlePlayPause}
            src={
              isPlaying ? '/assets/icons/pause.svg' : '/assets/icons/play.svg'
            }
          />
          <div className="flex flex-col gap-3 w-[414px] max-tablet:w-[200px]">
            <div className="flex flex-row gap-5">
              <h1 className="text-[32px] leading-8">{title}</h1>
              <Image
                width={20}
                height={20}
                onClick={onClick}
                alt="Favorite icon"
                aria-label="Favorite button"
                src={getFavoriteIconSource(isFavorited)}
                className="hover:scale-125 transition-all duration-200 cursor-pointer"
              />
            </div>
            <p>
              {artist}&nbsp;&nbsp;|&nbsp;&nbsp;{album.title}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              {album.year}
            </p>
          </div>
        </div>
        <AudioPlayer
          ref={audioPlayerRef}
          src={songPath}
          showSkipControls={false}
          showJumpControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
          customIcons={{
            play: <></>,
            pause: <></>,
            rewind: <></>,
            forward: <></>,
            loop: <></>,
          }}
          className="custom-audio-player w-[400px] mt-10 self-start max-tablet:w-[200px]"
          style={{
            background: 'transparent',
          }}
        />
      </div>
    </div>
  )
}
