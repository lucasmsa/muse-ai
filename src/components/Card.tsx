import Image from 'next/image'

interface CardProps {
  title: string
  artist: string
  coverArt: string
  albumTitle: string
  isFavorited: boolean
}

export const Card = ({
  title,
  artist,
  coverArt,
  albumTitle,
  isFavorited,
}: CardProps) => {
  return (
    <div className="h-[282px] w-[204px] bg-gray-250 rounded cursor-pointer hover:scale-[1.02] transition-all duration-200">
      <Image
        width={204}
        height={204}
        src={coverArt}
        alt={`${albumTitle} cover art`}
      />
      <div className="p-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <div className="flex w-full mt-3 justify-between ">
          <p className="text-xs text-gray-100 font-semibold">{artist}</p>
          <button>🩷</button>
        </div>
      </div>
    </div>
  )
}
