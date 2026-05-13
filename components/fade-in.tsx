'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const dirs = {
  up:    { y: 40, x: 0 },
  down:  { y: -40, x: 0 },
  left:  { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none:  { x: 0, y: 0 },
}

type Direction = keyof typeof dirs

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  className?: string
}

export default function FadeIn({ children, delay = 0, direction = 'up', className = '' }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
