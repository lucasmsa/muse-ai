import { linearGradientStylization } from '@/styles/utils/linearGradientStylization'

export const Navbar = () => {
  return (
    <header className="w-full h-20 bg-gray-300 pb-7 pt-7 pl-36 flex flex-1">
      <h3
        className="text-xl font-black font-nokora"
        {...linearGradientStylization}
      >
        MUSE.ai
      </h3>
    </header>
  )
}
