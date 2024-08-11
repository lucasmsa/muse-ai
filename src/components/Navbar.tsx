'use client'

import { linearGradientStylization } from '@/styles/utils/linearGradientStylization'
import Combobox from './Combobox'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Navbar = () => {
  const pathname = usePathname()

  const isSongPage = pathname.startsWith('/song/')

  const renderCombobox = () => {
    if (isSongPage) return <Combobox size="lg" />
  }

  return (
    <header className="w-full h-20 bg-gray-350 pb-7 pt-7 flex items-center mx-auto">
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
