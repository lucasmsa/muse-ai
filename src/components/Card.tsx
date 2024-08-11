import Link from 'next/link'
import Image from 'next/image'
import { getFavoriteIconSource } from '@/utils/getFavoriteIconSource'

interface CardProps {
  title: string
  artist: string
  coverArt: string
  albumTitle: string
  favorite?: {
    isFavorited: boolean
    onClick: () => void
  }
}

export const Card = ({
  title,
  artist,
  favorite,
  coverArt,
  albumTitle,
}: CardProps) => {
  const renderFavoriteButton = () => {
    if (favorite) {
      const favoriteIconSource = getFavoriteIconSource(favorite.isFavorited)

      return (
        <Image
          width={20}
          height={20}
          src={favoriteIconSource}
          onClick={favorite.onClick}
          alt="Favorite card button"
          aria-label="Favorite button"
          className="hover:scale-[1.1] transition-all duration-200"
        />
      )
    }
  }

  return (
    <Link href={''}>
      <div className="h-[282px] w-[204px] bg-gray-300 rounded cursor-pointer hover:brightness-110 transition-all duration-200">
        <Image
          width={204}
          height={204}
          src={coverArt}
          alt={`${albumTitle} cover art`}
        />
        <div className="p-4">
          <h3 className="text-white font-semibold truncate">{title}</h3>
          <div className="flex w-full mt-3 justify-between">
            <p className="text-xs text-gray-100 font-semibold">{artist}</p>
            {renderFavoriteButton()}
          </div>
        </div>
      </div>
    </Link>
  )
}
