import { NextResponse } from 'next/server'
import payload from '@/data/server-payload.json' // Adjust the path accordingly

export async function GET() {
  const songs = payload.songs.map((i) => ({
    id: i.id,
    song: i.song,
  }))

  return NextResponse.json({ songs })
}
