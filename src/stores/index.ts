import { create } from 'zustand'
import { Song, SongCollection } from '@/types'
import { persist, devtools, StorageValue } from 'zustand/middleware'

const FAVORITED_SONGS_STORAGE_KEY = 'favorited-songs-storage'

export interface InitialState {
  search: string
  song: Song | null
  isLoading: boolean
  isError: null | Error
  songs: SongCollection[]
  showOnlyFavorites: boolean
  favoritedSongsIds: Set<number>
  loadSongs: () => Promise<void>
  showAlphabeticallyOrdered: boolean
  setSearch: (search: string) => void
  toggleShowOnlyFavorites: () => void
  toggleSortAlphabetically: () => void
  setFavoriteSong: (id: number) => void
  loadSong: (id: string) => Promise<void>
  getRelatedSongs: (songId: number | undefined) => SongCollection[]
}

const initialState: Omit<
  InitialState,
  | 'setSong'
  | 'loadSong'
  | 'loadSongs'
  | 'setSearch'
  | 'getRelatedSongs'
  | 'setFavoriteSong'
  | 'toggleShowOnlyFavorites'
  | 'toggleSortAlphabetically'
> = {
  songs: [],
  song: null,
  search: '',
  isError: null,
  isLoading: false,
  showOnlyFavorites: false,
  showAlphabeticallyOrdered: false,
  favoritedSongsIds: new Set<number>(),
}

export const useSongsStore = create<
  InitialState,
  [
    ['zustand/devtools', never],
    ['zustand/persist', Pick<InitialState, 'favoritedSongsIds'>],
  ]
>(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        loadSongs: async () => {
          set({ isLoading: true })

          try {
            const response = await fetch('/api/songs')
            const data = await response.json()

            set({
              songs: data.songs,
            })
          } catch (error) {
            set({
              isError: error as Error,
            })
          } finally {
            set({ isLoading: false })
          }
        },
        loadSong: async (id: string) => {
          set({ isLoading: true })

          try {
            const response = await fetch(`/api/song/${id}`)
            const data = await response.json()

            if (!data.song) throw new Error('Song not found')

            set({
              song: {
                ...data.song,
                id: Number(id),
              },
            })
          } catch (error) {
            set({
              isError: error as Error,
            })
          } finally {
            set({ isLoading: false })
          }
        },
        setFavoriteSong: (id) => {
          set((state) => {
            const newfavoritedSongsIds = new Set(state.favoritedSongsIds)

            if (newfavoritedSongsIds.has(id)) {
              newfavoritedSongsIds.delete(id)
            } else {
              newfavoritedSongsIds.add(id)
            }

            return {
              favoritedSongsIds: newfavoritedSongsIds,
            }
          })
        },
        toggleShowOnlyFavorites: () => {
          set((state) => ({
            showOnlyFavorites: !state.showOnlyFavorites,
          }))
        },
        toggleSortAlphabetically: () => {
          set((state) => ({
            showAlphabeticallyOrdered: !state.showAlphabeticallyOrdered,
          }))
        },
        setSearch: (search) => {
          set({ search })
        },
        getRelatedSongs: (songId) => {
          if (!songId) return []

          const { songs, song } = get()

          if (!song) return []

          const relatedSongs = new Set(song.related)

          return songs?.filter((s) => relatedSongs?.has(s.id))
        },
      }),
      {
        name: FAVORITED_SONGS_STORAGE_KEY,
        partialize: (state) => ({ favoritedSongsIds: state.favoritedSongsIds }),
        storage: {
          getItem: (name) => {
            const string = localStorage.getItem(name)
            if (!string) return null

            const { state } = JSON.parse(string)

            return {
              state: {
                favoritedSongsIds: new Set(state.favoritedSongsIds),
              },
            }
          },
          setItem: (
            name,
            newValue: StorageValue<Pick<InitialState, 'favoritedSongsIds'>>,
          ) => {
            const string = JSON.stringify({
              state: {
                favoritedSongsIds: Array.from(newValue.state.favoritedSongsIds),
              },
            })

            localStorage.setItem(name, string)
          },
          removeItem: (name) => {
            localStorage.removeItem(name)
          },
        },
      },
    ),
  ),
)
