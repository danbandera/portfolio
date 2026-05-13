'use client'

import { useRef, useEffect, useState } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    setHasMouse(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!hasMouse) return

    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      if (ring.current) ring.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`
      raf.current = requestAnimationFrame(animate)
    }
    const onTouch = () => {
      cancelAnimationFrame(raf.current)
      if (dot.current) dot.current.style.opacity = '0'
      if (ring.current) ring.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true, once: true } as AddEventListenerOptions)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouch)
      cancelAnimationFrame(raf.current)
    }
  }, [hasMouse])

  if (!hasMouse) return null

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
