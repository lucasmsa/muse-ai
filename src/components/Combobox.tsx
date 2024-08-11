import Image from 'next/image'
import { startTransition } from 'react'
import { useSongsStore } from '@/stores'
import * as Ariakit from '@ariakit/react'
import { AnimatePresence } from 'framer-motion'
import { useComboboxSelector } from '@/stores/selectors'
import { useFilteredSongs } from '@/hooks/useFilteredSongs'
import { FadeAnimationWrapper } from './FadeAnimationWrapper'

interface ComboboxProps {
  size: 'md' | 'lg'
  onClick?: () => void
}

export default function Combobox({ size, onClick }: ComboboxProps) {
  const { songs, search, setSearch, favoritedSongsIds, showOnlyFavorites } =
    useSongsStore(useComboboxSelector)
  const onClickProperty = onClick ? { onClick } : {}
  const { filteredSongs, debouncedSearch } = useFilteredSongs({
    songs,
    search,
    favoritedSongsIds,
    showOnlyFavorites,
  })

  return (
    <Ariakit.ComboboxProvider
      setValue={(value) => {
        startTransition(() => setSearch(value))
      }}
    >
      <Ariakit.Combobox
        data-size={size}
        aria-label="Search input container"
        placeholder="Search in your library"
        className="h-10 w-64 rounded-md bg-gray-300
                    pl-8 pr-4 text-base leading-6 text-white
                    data-[size=lg]:w-[364px] !border-none !outline-none focus-within:bg-gray-150
                    shadow-inner placeholder:text-[rgb(0 0 0 / 0.6)] transition-all duration-200"
      />
      <Image
        width={20}
        height={20}
        alt="Magnifying glass icon"
        className="absolute translate-x-[86px]"
        src={'/assets/icons/magnifying-glass.svg'}
      />

      {debouncedSearch.length && filteredSongs.length ? (
        <Ariakit.ComboboxPopover
          gutter={8}
          sameWidth
          className="relative z-50 flex max-h-[300px] min-h-0 flex-col overflow-auto overscroll-contain rounded-lg
                    bg-gray-250 p-2 text-gray shadow-lg"
        >
          <AnimatePresence>
            <FadeAnimationWrapper>
              {filteredSongs?.map(({ id, song: { title } }, index) => (
                <Ariakit.ComboboxItem
                  key={id}
                  value={title}
                  {...onClickProperty}
                  className={`flex cursor-default scroll-m-2 py-3 align-center gap-2 w-52 mx-auto data-[size=lg]:w-[364px] hover:bg-[hsl(204 100% 80% / 0.4)]
                          data-[active-item]:bg-[hsl(204 100% 40%)] data-[onematch=true]:border-none border-b-2 border-slate data-[active-item]:text-white
                          ${index === filteredSongs.length - 1 ? 'border-none' : ''}`}
                />
              ))}
            </FadeAnimationWrapper>
          </AnimatePresence>
        </Ariakit.ComboboxPopover>
      ) : null}
    </Ariakit.ComboboxProvider>
  )
}
