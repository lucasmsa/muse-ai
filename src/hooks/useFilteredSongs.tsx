import { useMemo } from 'react'
import { SongCollection } from '@/types'
import { matchSorter } from 'match-sorter'
import { useDebounce } from './useDebounce'

interface FilterSongsProps {
  search: string
  ignoreFilters?: boolean
  songs: SongCollection[]
  showOnlyFavorites: boolean
  favoritedSongsIds: Set<number>
  showAlphabeticallyOrdered?: boolean
}

export const useFilteredSongs = ({
  songs,
  search,
  ignoreFilters,
  favoritedSongsIds,
  showOnlyFavorites,
  showAlphabeticallyOrdered,
}: FilterSongsProps): {
  debouncedSearch: string
  filteredSongs: SongCollection[]
} => {
  const debouncedSearch = useDebounce(search, 200)

  const filteredSongs = useMemo(() => {
    let filtered = songs

    if (!ignoreFilters && showOnlyFavorites) {
      filtered = filtered.filter(({ id }) => favoritedSongsIds.has(id))
    }

    if (debouncedSearch) {
      filtered = matchSorter(filtered, debouncedSearch, {
        keys: ['song.title'],
      })
    }

    if (showAlphabeticallyOrdered) {
      filtered = [...filtered].sort((a, b) =>
        a.song.title.localeCompare(b.song.title),
      )
    }

    return filtered
  }, [
    songs,
    debouncedSearch,
    favoritedSongsIds,
    showOnlyFavorites,
    showAlphabeticallyOrdered,
  ])

  return { filteredSongs, debouncedSearch }
}
