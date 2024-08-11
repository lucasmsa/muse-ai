import React, { ComponentProps } from 'react'
import { motion } from 'framer-motion'

interface FadeAnimationWrapperProps extends ComponentProps<typeof motion.div> {
  children: React.ReactNode
}

export const FadeAnimationWrapper = ({
  children,
  ...props
}: FadeAnimationWrapperProps) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
