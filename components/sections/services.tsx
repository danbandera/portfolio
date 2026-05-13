'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/fade-in'
// import { Props } from 'next/dist/client/script'
// import type { WPService } from '@/lib/wordpress'

// const FALLBACK: WPService[] = [
//   {
//     id: 1,
//     title: { rendered: 'Custom Themes' },
//     content: { rendered: 'Pixel-perfect, performance-optimized WordPress themes built from scratch — no bloat, no page builders required.' },
//     meta: { dmb_icon: '⬡', dmb_tags: ['PHP', 'HTML/CSS', 'JavaScript', 'WP API'] },
//   },
//   {
//     id: 2,
//     title: { rendered: 'Page Builder Mastery' },
//     content: { rendered: 'Advanced Elementor, Divi, and BeaverBuilder implementations with custom widgets, modules, and extensions.' },
//     meta: { dmb_icon: '◈', dmb_tags: ['Elementor', 'Divi', 'BeaverBuilder'] },
//   },
//   {
//     id: 3,
//     title: { rendered: 'Custom Gutenberg Blocks' },
//     content: { rendered: 'Modern block development using @wordpress/blocks API — interactive, accessible, reusable, and editor-friendly.' },
//     meta: { dmb_icon: '⬟', dmb_tags: ['Block API', 'React', 'InnerBlocks', 'ACF Blocks'] },
//   },
//   {
//     id: 4,
//     title: { rendered: 'Custom Plugins' },
//     content: { rendered: 'Extending WordPress with well-architected OOP plugins: CPTs, REST endpoints, third-party integrations.' },
//     meta: { dmb_icon: '⬠', dmb_tags: ['PHP OOP', 'REST API', 'WP Hooks', 'WP-CLI'] },
//   },
// ]

// interface Props {
//   services: WPService[]
// }

export default function Services({ services }: { services: any[] }) {
  // const items = services.length > 0 ? services : FALLBACK
  const items = services.length > 0 ? services : []
  console.log("Rendering Services section with items:", items)

  return (
    <section id="services" className="services-section">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-label">What I do</span>
            <h2 className="section-title">
              WordPress expertise,<br />
              <em>end to end</em>
            </h2>
          </div>
        </FadeIn>
        <div className="services-grid">
          {items.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <motion.div className="service-card" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="service-top">
                  <span className="service-icon">{s.meta.dmb_icon}</span>
                  <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="service-name">{s.title.rendered}</h3>
                <div
                  className="service-desc"
                  dangerouslySetInnerHTML={{ __html: s.content.rendered }}
                />
                {s.meta.dmb_tags && (
                  <div className="service-tags">
                    {s.meta.dmb_tags.map((t: string) => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
