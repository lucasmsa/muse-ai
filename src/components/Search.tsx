import Image from 'next/image'

interface SearchProps {
  value: string
  size: 'md' | 'lg'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({ value, size = 'md', onChange }: SearchProps) => {
  return (
    <div
      data-size={size}
      aria-label="Search input container"
      className="flex flex-row w-64 h-9 p-2 bg-gray-250 data-[size=lg]:w-[364px]  focus-within:bg-gray-150 rounded-[4px] transition-all duration-200"
    >
      <Image
        width={20}
        height={20}
        alt="Magnifying glass icon"
        src={'/assets/icons/magnifying-glass.svg'}
      />
      <input
        type="text"
        className="text-[16px] text-white font-semibold bg-transparent pl-2 outline-none"
      />
    </div>
  )
}
