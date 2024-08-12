import Link from 'next/link'
import Image from 'next/image'
import { getFavoriteIconSource } from '@/utils/getFavoriteIconSource'
import { usePathname } from 'next/navigation'

interface CardProps {
  id: number
  title: string
  artist: string
  coverArtPath: string
  albumTitle: string
  favorite?: {
    isFavorited: boolean
    onClick: () => void
  }
}

export const Card = ({
  id,
  title,
  artist,
  favorite,
  albumTitle,
  coverArtPath,
}: CardProps) => {
  const pathname = usePathname()
  const isSongPage = pathname.startsWith('/song/')
  const songLinkPath = isSongPage ? `${id}` : `/song/${id}`

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
          className="hover:scale-125 transition-all duration-200 cursor-pointer"
        />
      )
    }
  }

  return (
    <div className="h-[282px] w-[204px] bg-gray-300 rounded hover:brightness-110 transition-all duration-200">
      <Link href={songLinkPath}>
        <Image
          width={204}
          height={204}
          src={coverArtPath}
          alt={`${albumTitle} cover art`}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-white font-semibold truncate">{title}</h3>
        <div className="flex w-full mt-3 justify-between">
          <p className="text-xs text-gray-100 font-semibold">{artist}</p>
          {renderFavoriteButton()}
        </div>
      </div>
    </div>
  )
}
