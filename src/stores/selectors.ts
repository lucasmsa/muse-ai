import { InitialState } from '.'

export const useHomeSelector = ({
  songs,
  search,
  isError,
  isLoading,
  setSearch,
  loadSongs,
  setFavoriteSong,
  favoritedSongsIds,
  showOnlyFavorites,
  showAlphabeticallyOrdered,
}: InitialState) => ({
  songs,
  search,
  isError,
  loadSongs,
  isLoading,
  setSearch,
  setFavoriteSong,
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

export const useSongSelector = ({
  song,
  songs,
  isError,
  loadSong,
  loadSongs,
  isLoading,
  getRelatedSongs,
  setFavoriteSong,
  favoritedSongsIds,
}: InitialState) => {
  return {
    song,
    songs,
    isError,
    loadSong,
    loadSongs,
    isLoading,
    getRelatedSongs,
    setFavoriteSong,
    favoritedSongsIds,
  }
}
