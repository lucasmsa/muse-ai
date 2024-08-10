import { linearGradientStylization } from '@/styles/utils/linearGradientStylization'

export const Navbar = () => {
  return (
    <div className="w-full bg-dark-gray pb-7 pt-7 pl-36 flex flex-1">
      <h3 className="text-xl font-black" {...linearGradientStylization}>
        MUSE.ai
      </h3>
    </div>
  )
}
