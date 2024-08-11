import { InitialState } from '.'

export const useHomeSelector = ({
  songs,
  isError,
  isLoading,
  loadSongs,
  favoriteSong,
  favoritedSongsIds,
  showOnlyFavorites,
}: InitialState) => ({
  songs,
  isError,
  loadSongs,
  isLoading,
  favoriteSong,
  favoritedSongsIds,
  showOnlyFavorites,
})

export const useToolbarSelector = ({
  showOnlyFavorites,
  toggleShowOnlyFavorites,
}: InitialState) => {
  return {
    showOnlyFavorites,
    toggleShowOnlyFavorites,
  }
}
