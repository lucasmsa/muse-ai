import { NextResponse } from 'next/server'
import payload from '@/data/server-payload.json' // Adjust the path accordingly

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const artist = payload.songs.find((artist) => Number(artist.id) == Number(id))

  if (!artist) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(artist)
}
