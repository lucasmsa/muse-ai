import { create } from 'zustand'
import { AxiosError } from 'axios'
import { api } from '@/service/api'

interface Song {
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
  favoriteSong: (id: number) => void
  toggleShowOnlyFavorites: () => void
}

const initialState = {
  songs: [],
  isError: null,
  isLoading: false,
  showOnlyFavorites: false,
  favoritedSongsIds: new Set<number>(),
}

export const useSongsStore = create<InitialState>((set) => ({
  ...initialState,
  loadSongs: async () => {
    set({
      isLoading: true,
    })

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
      set({
        isLoading: false,
      })
    }
  },
  favoriteSong: (id) => {
    set((state) => {
      const newfavoritedSongsIds = state.favoritedSongsIds

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
}))
