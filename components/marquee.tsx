'use client'

import { useRef, useEffect } from 'react'

const ITEMS = [
  'WordPress', 'Elementor', 'Divi', 'BeaverBuilder', 'Gutenberg',
  'Custom Themes', 'Custom Plugins', 'ACF', 'WooCommerce', 'PHP',
  'JavaScript', 'CSS / SASS', 'React', 'REST API', 'MySQL', 'WP Hooks',
]

const SPEED = 60

export default function Marquee() {
  const innerRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const pausedRef = useRef(false)
  const lastRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const tick = (now: number) => {
      if (lastRef.current !== null && !pausedRef.current) {
        xRef.current -= SPEED * ((now - lastRef.current) / 1000)
        const half = el.scrollWidth / 2
        if (Math.abs(xRef.current) >= half) xRef.current += half
        el.style.transform = `translateX(${xRef.current}px)`
      }
      lastRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        <div
          ref={innerRef}
          className="marquee-inner"
          onMouseEnter={() => { pausedRef.current = true; lastRef.current = null }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
