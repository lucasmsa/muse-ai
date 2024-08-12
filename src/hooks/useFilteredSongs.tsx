import { useMemo } from 'react'
import { matchSorter } from 'match-sorter'
import { useDebounce } from './useDebounce'
import { SongCollection } from '@/types'

interface FilterSongsProps {
  search: string
  songs: SongCollection[]
  showOnlyFavorites: boolean
  favoritedSongsIds: Set<number>
  showAlphabeticallyOrdered?: boolean
}

export const useFilteredSongs = ({
  songs,
  search,
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

    if (showOnlyFavorites) {
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
  }, [songs, showOnlyFavorites, showAlphabeticallyOrdered, debouncedSearch])

  return { filteredSongs, debouncedSearch }
}
