interface ContentWrapperProps {
  children: React.ReactNode
}

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <section className="pb-16 max-w-[1240px] flex-grow w-full h-full flex flex-col pt-12 mx-auto px-6">
      {children}
    </section>
  )
}
