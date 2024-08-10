export const SongsToolbar = () => {
  return (
    <section className="w-full flex-row justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 mb-3">
          <h2 className="text-[32px] text-white font-semibold">Your Library</h2>
          <button>Favorites</button>
        </div>
        <p className="text-gray-50">You have {10} songs in your library</p>
      </div>
    </section>
  )
}
