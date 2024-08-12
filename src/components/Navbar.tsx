'use client'

import Link from 'next/link'
import Combobox from './Combobox'
import { usePathname } from 'next/navigation'
import { linearGradientStylization } from '@/styles/utils/linearGradientStylization'

export const Navbar = () => {
  const pathname = usePathname()

  const isSongPage = pathname.startsWith('/song/')

  const renderCombobox = () => {
    if (isSongPage) return <Combobox size="lg" linksToSongPage />
  }

  return (
    <header
      aria-label="Navbar component"
      className="w-full h-20 bg-gray-350 pb-7 pt-7 flex items-center mx-auto z-50"
    >
      <section
        className="max-w-[1240px] w-full mx-auto px-6 flex flex-row items-center gap-14
                          max-mobile:gap-5"
      >
        <div>
          <Link href={'/home'}>
            <h3
              className="text-xl font-black font-nokora cursor-pointer"
              {...linearGradientStylization}
            >
              MUSE.ai
            </h3>
          </Link>
        </div>
        {renderCombobox()}
      </section>
    </header>
  )
}
