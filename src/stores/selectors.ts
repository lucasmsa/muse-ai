import { InitialState } from '.'

export const useHomeSelector = ({
  songs,
  search,
  isError,
  isLoading,
  loadSongs,
  favoriteSong,
  favoritedSongsIds,
  showOnlyFavorites,
  showAlphabeticallyOrdered,
}: InitialState) => ({
  songs,
  search,
  isError,
  loadSongs,
  isLoading,
  favoriteSong,
  favoritedSongsIds,
  showOnlyFavorites,
  showAlphabeticallyOrdered,
})

export const useToolbarSelector = ({
  songs,
  showOnlyFavorites,
  toggleShowOnlyFavorites,
  toggleSortAlphabetically,
  showAlphabeticallyOrdered,
}: InitialState) => {
  return {
    showOnlyFavorites,
    toggleShowOnlyFavorites,
    toggleSortAlphabetically,
    showAlphabeticallyOrdered,
    songsQuantity: songs.length,
  }
}

export const useComboboxSelector = ({
  songs,
  search,
  setSearch,
  favoritedSongsIds,
  showOnlyFavorites,
}: InitialState) => {
  return { songs, search, setSearch, favoritedSongsIds, showOnlyFavorites }
}
