const navLinks = ['#services', '#work', '#about', '#contact']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">Daniel Martinez Bandera</span>
            <p className="footer-tagline">WordPress Developer</p>
          </div>
          <nav className="footer-nav">
            {navLinks.map((href) => (
              <a key={href} href={href}>
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </nav>
          <div className="footer-social">
            <a href="https://github.com/danbandera">GH</a>
            <a href="https://www.linkedin.com/in/danmtzbandera/">LI</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Daniel Martinez Bandera.</span>
          <span>WordPress Developer</span>
        </div>
      </div>
    </footer>
  )
}
