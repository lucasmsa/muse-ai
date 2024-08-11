import { create } from 'zustand'
import { AxiosError } from 'axios'
import { api } from '@/service/api'
import { persist, devtools, StorageValue } from 'zustand/middleware'

const FAVORITED_SONGS_STORAGE_KEY = 'favorited-songs-storage'

export interface Song {
  id: number
  song: {
    album: {
      title: string
      year: number
    }
    artist: string
    title: string
    files: {
      coverArt: string
      poster: string
      audio: string
    }
  }
  related: string[]
}

export interface InitialState {
  songs: Song[]
  isLoading: boolean
  isError: null | AxiosError
  showOnlyFavorites: boolean
  favoritedSongsIds: Set<number>
  loadSongs: () => Promise<void>
  showAlphabeticallyOrdered: boolean
  favoriteSong: (id: number) => void
  toggleShowOnlyFavorites: () => void
  toggleSortAlphabetically: () => void
}

const initialState: Omit<
  InitialState,
  | 'loadSongs'
  | 'favoriteSong'
  | 'toggleShowOnlyFavorites'
  | 'toggleSortAlphabetically'
> = {
  songs: [],
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
      (set) => ({
        ...initialState,
        loadSongs: async () => {
          set({ isLoading: true })

          try {
            const response = await api.get('/songs')

            set({
              songs: response.data.songs,
            })
          } catch (error) {
            set({
              isError: error as AxiosError,
            })
          } finally {
            set({ isLoading: false })
          }
        },
        favoriteSong: (id) => {
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
