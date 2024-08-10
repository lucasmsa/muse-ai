import Image from 'next/image'
import { ComponentProps } from 'react'
import { getFavoriteIconSource } from '@/utils/getFavoriteIconSource'

type FavoritesButtonProps = ComponentProps<'button'> & {
  isFavorited: boolean
  onClick: () => void
}

export const FavoritesButton = ({
  onClick,
  isFavorited,
  ...props
}: FavoritesButtonProps) => {
  const favoriteIconSource = getFavoriteIconSource(isFavorited)

  return (
    <button
      {...props}
      onClick={onClick}
      data-favorite={isFavorited}
      aria-label={'Favorite songs button'}
      className="w-32 h-9 text-[14px] font-semibold rounded-[100px]
      flex items-center gap-2 text-white hover:scale-[1.02] pt-0 pb-0
      pl-6 pr-6 transition-all duration-200 data-[favorite=false]:bg-gray-250
      data-[favorite=true]:bg-gray-150"
    >
      <Image
        width={20}
        height={20}
        alt={'Favorite icon'}
        src={favoriteIconSource}
      />
      Favorites
    </button>
  )
}
