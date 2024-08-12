import { songLinearGradientBackgroundStylization } from '@/styles/utils/songLinearGradientBackgroundStylization'

export default function SongLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="relative w-full h-full flex flex-grow bg-gradient-to-tr from-[#12313b] to-[#071418]"
      {...songLinearGradientBackgroundStylization}
    >
      {children}
    </div>
  )
}
