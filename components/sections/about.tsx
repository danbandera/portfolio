'use client'

import FadeIn from '@/components/fade-in'

const statsItems = [
  { n: '30+',  l: 'WordPress sites launched' },
  { n: '6+',   l: 'Years of WP experience' },
  { n: '10+',  l: 'Satisfied clients' },
  { n: '100%', l: 'Project success rate' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <FadeIn direction="left">
            <div className="about-text-col">
              <span className="section-label">About me</span>
              <h2 className="section-title">
                I build WordPress<br />
                <em>the right way</em>
              </h2>
              <p className="about-bio">
                With over 8 years specializing in WordPress, I&apos;ve helped businesses
                of all sizes — from local boutiques to enterprise brands — build
                digital presences that perform and convert.
              </p>
              <p className="about-bio">
                I care deeply about clean code, semantic HTML, accessibility, and
                performance. Every site I deliver scores 90+ on PageSpeed Insights,
                because slow sites lose customers.
              </p>
              <div className="about-cta">
                <a href="#contact" className="btn-primary">
                  Work with me
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#" className="btn-ghost">Download CV</a>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <div className="about-stats-col">
              <div className="stats-list">
                {statsItems.map((s) => (
                  <div key={s.n} className="stat-row">
                    <span className="stat-big">{s.n}</span>
                    <span className="stat-label">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
