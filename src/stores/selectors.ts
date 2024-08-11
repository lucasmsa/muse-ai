import { InitialState } from '.'

export const useHomeSelector = ({
  songs,
  isError,
  isLoading,
  loadSongs,
  favoriteSong,
  favoritedSongsIds,
  showOnlyFavorites,
  showAlphabeticallyOrdered,
}: InitialState) => ({
  songs,
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
