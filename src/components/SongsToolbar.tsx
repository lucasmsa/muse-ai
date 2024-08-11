import { useState } from 'react'
import { FavoritesButton } from './FavoritesButton'
import { Toggle } from './Toggle'
import { Search } from './Search'

export const SongsToolbar = () => {
  const [checked, setChecked] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <section className="w-full flex flex-row justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 mb-3">
          <h2 className="text-[32px] text-white font-semibold leading-9 ">
            Your Library
          </h2>
          <FavoritesButton
            isFavorited={favorite}
            onClick={() => setFavorite(!favorite)}
          />
        </div>
        <p className="text-gray-50">You have {10} songs in your library</p>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-sm font-semibold text-white pr-3">Sort from A-Z</p>
        <div className="flex gap-6">
          <Toggle
            checked={checked}
            onCheckChange={() => setChecked(!checked)}
          />
          <Search
            size="md"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
