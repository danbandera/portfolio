'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/fade-in'

const socialLinks = ['GitHub', 'LinkedIn']

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <FadeIn>
          <span className="section-label">Contact</span>
          <h2 className="contact-heading">
            Let&apos;s build something<br />
            <em>remarkable</em>
          </h2>
          <p className="contact-desc">
            Have a WordPress project in mind? Tell me about it.
            I respond within 24 hours.
          </p>
          <motion.a
            href="mailto:hello@danbandera.com"
            className="contact-email"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            danmtzbandera@gmail.com
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
          <div className="contact-social">
            <a key="GitHub" href="https://github.com/danbandera" className="social-link">GitHub</a>
            <a key="LinkedIn" href="https://www.linkedin.com/in/danmtzbandera/" className="social-link">LinkedIn</a>
          </div>
        </FadeIn>
      </div>
      <div className="contact-bg-text" aria-hidden="true">WORDPRESS</div>
    </section>
  )
}
