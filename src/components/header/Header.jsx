import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dumbbell, Menu, X, Zap } from 'lucide-react'
import './Header.css'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">

        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <Dumbbell size={20} />
          </div>
          <span>Get<strong>Fit</strong></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header__nav">
          <a href="#features" className="header__link">Features</a>
          <a href="#how" className="header__link">How It Works</a>
          <a href="#ai" className="header__link">AI Coach</a>
        </nav>

        {/* Buttons */}
        <div className="header__actions">
          <Link to="/login">
            <button className="header__btn-ghost">Login</button>
          </Link>
          <Link to="/signup">
            <button className="header__btn-primary">
              <Zap size={16} />
              Start Free
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="header__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="header__mobile-menu">
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#ai" onClick={() => setMenuOpen(false)}>AI Coach</a>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button className="header__btn-ghost w-full">Login</button>
          </Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)}>
            <button className="header__btn-primary w-full">Start Free</button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header