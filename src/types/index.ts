export interface Song {
  id: number
  album: Album
  artist: string
  title: string
  files: {
    coverArt: string
    poster: string
    audio: string
  }
  related: number[]
}

export interface SongCollection {
  id: number
  song: Song
}

export interface Album {
  title: string
  year: number
}
