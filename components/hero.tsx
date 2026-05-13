'use client'

import { Fragment } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './fade-in'

const metaItems = [
  { n: '30+', l: 'Sites launched' },
  { n: '6+',  l: 'Years with WP' },
  { n: '10+', l: 'Happy clients' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const blobY1 = useTransform(scrollY, [0, 600], [0, 200])
  const blobY2 = useTransform(scrollY, [0, 600], [0, -120])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="hero">
      <div className="hero-noise" />
      <motion.div className="hero-blob blob-1" style={{ y: blobY1 }} />
      <motion.div className="hero-blob blob-2" style={{ y: blobY2 }} />
      <motion.div className="hero-content" style={{ opacity: contentOpacity }}>
        {/* <FadeIn delay={0.3}>
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Available for new projects</span>
          </div>
        </FadeIn> */}
        <FadeIn delay={0.5}>
          <h1 className="hero-title">
            <span className="title-line">WordPress</span>
            <span className="title-line italic">Developer</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.7}>
          <p className="hero-desc">
            I build custom WordPress solutions — from pixel-perfect themes and
            Gutenberg blocks to powerful plugins that extend what&apos;s possible.
          </p>
        </FadeIn>
        <FadeIn delay={0.9}>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work" className="btn-ghost">View Work</a>
          </div>
        </FadeIn>
        <FadeIn delay={1.1}>
          <div className="hero-meta">
            {metaItems.map((m, i) => (
              <Fragment key={m.n}>
                {i > 0 && <div className="meta-divider" />}
                <div className="meta-item">
                  <span className="meta-num">{m.n}</span>
                  <span className="meta-label">{m.l}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </FadeIn>
      </motion.div>
      <div className="hero-scroll">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
