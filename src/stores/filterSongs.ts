import { Song } from '.'

interface FilterSongsProps {
  songs: Song[]
  showOnlyFavorites: boolean
  favoritedSongsIds: Set<number>
  showAlphabeticallyOrdered: boolean
}

export const filterSongs = ({
  songs,
  favoritedSongsIds,
  showOnlyFavorites,
  showAlphabeticallyOrdered,
}: FilterSongsProps): Song[] => {
  let filteredSongs = songs

  if (showOnlyFavorites) {
    filteredSongs = filteredSongs.filter(({ id }) => favoritedSongsIds.has(id))
  }

  if (showAlphabeticallyOrdered) {
    filteredSongs = [...filteredSongs].sort((a, b) =>
      a.song.title.localeCompare(b.song.title),
    )
  }

  return filteredSongs
}
