import { Toggle } from './Toggle'
import Combobox from './Combobox'
import { useSongsStore } from '@/stores'
import { FavoritesButton } from './FavoritesButton'
import { useToolbarSelector } from '@/stores/selectors'

export const SongsToolbar = () => {
  const {
    songsQuantity,
    showOnlyFavorites,
    toggleShowOnlyFavorites,
    toggleSortAlphabetically,
    showAlphabeticallyOrdered,
  } = useSongsStore(useToolbarSelector)
  const songsText = songsQuantity === 1 ? 'song' : 'songs'

  return (
    <section className="w-full flex flex-row justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 mb-3">
          <h2 className="text-[32px] text-white font-semibold leading-9 ">
            Your Library
          </h2>
          <FavoritesButton
            isFavorited={showOnlyFavorites}
            onClick={toggleShowOnlyFavorites}
          />
        </div>
        <p className="text-gray-50">
          You have {songsQuantity} {songsText} in your library
        </p>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-sm font-semibold text-white pr-3">Sort from A-Z</p>
        <div className="flex gap-6 items-center">
          <Toggle
            checked={showAlphabeticallyOrdered}
            onCheckChange={toggleSortAlphabetically}
          />
          <Combobox size="md" />
        </div>
      </div>
    </section>
  )
}
