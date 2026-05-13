'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/fade-in'
import Link from 'next/link'
// import type { WPWork } from '@/lib/wordpress'

// const FALLBACK: WPWork[] = [
//   {
//     id: 1,
//     title: { rendered: 'Luxe Interiors' },
//     content: { rendered: 'Bespoke theme for a high-end design studio. Custom post types for portfolio, ACF-powered layouts, 98 PageSpeed score.' },
//     meta: { dmb_year: '2024', dmb_type: 'Custom Theme', dmb_color: '#182A18', dmb_accent: '#7BC87A' },
//   },
//   {
//     id: 2,
//     title: { rendered: 'FitTrack Pro' },
//     content: { rendered: 'Fitness platform with custom membership plugin, booking system integration, and Elementor Pro templates.' },
//     meta: { dmb_year: '2024', dmb_type: 'Elementor + Custom Plugin', dmb_color: '#101A2C', dmb_accent: '#5B9BD5' },
//   },
//   {
//     id: 3,
//     title: { rendered: 'Artisan Market' },
//     content: { rendered: 'Full e-commerce solution with custom Divi modules, product filters, and WooCommerce payment extensions.' },
//     meta: { dmb_year: '2023', dmb_type: 'WooCommerce + Divi', dmb_color: '#281408', dmb_accent: '#D4884A' },
//   },
//   {
//     id: 4,
//     title: { rendered: 'Block Suite Pro' },
//     content: { rendered: 'A library of 14 custom Gutenberg blocks: animated counters, timelines, testimonials, tabs, and accordions.' },
//     meta: { dmb_year: '2023', dmb_type: 'Gutenberg Plugin', dmb_color: '#1C1028', dmb_accent: '#A875D4' },
//   },
// ]

// interface Props {
//   works: WPWork[]
// }

export default function Work({ works }: { works: any[] }) {
  const items = works.length > 0 ? works : []

  return (
    <section id="work" className="work-section">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">
              Selected work,<br />
              <em>built with intent</em>
            </h2>
          </div>
        </FadeIn>
        <div className="projects-list">
          {items.map((p, i) => (
            <Link key={p.id} href={p.meta.dmb_url} className="project-link-wrapper" target="_blank" rel="noopener noreferrer nofollow">
            <FadeIn key={p.id} delay={i * 0.1}>
              <motion.div
                className="project-item"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="project-visual"
                  style={
                    {
                      '--proj-bg': p.meta.dmb_color,
                      '--proj-acc': p.meta.dmb_accent,
                    } as React.CSSProperties
                  }
                >
                  <div className="project-shape-1" />
                  <div className="project-shape-2" />
                  <span className="project-type-badge">{p.meta.dmb_type}</span>
                </div>
                <div className="project-body">
                  <div className="project-top">
                    <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="project-year">{p.meta.dmb_year}</span>
                  </div>
                  <h3 className="project-name">{p.title.rendered}</h3>
                  <div
                    className="project-desc"
                    dangerouslySetInnerHTML={{ __html: p.content.rendered }}
                  />
                  <div className="project-link">
                    <span>View case study</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
