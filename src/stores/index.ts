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

interface FavoritedSongs {
  [key: number]: boolean
}

interface InitialState {
  songs: Song[]
  isLoading: boolean
  isError: null | AxiosError
  favoritedSongs: Set<number>
  loadSongs: () => Promise<void>
  favoriteSong: (id: number) => void
}

const initialState = {
  songs: [],
  isError: null,
  isLoading: false,
  favoritedSongs: new Set<number>(),
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
      const newFavoritedSongs = state.favoritedSongs

      if (newFavoritedSongs.has(id)) {
        newFavoritedSongs.delete(id)
      } else {
        newFavoritedSongs.add(id)
      }

      return {
        favoritedSongs: newFavoritedSongs,
      }
    })
  },
}))
