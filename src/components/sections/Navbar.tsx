'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { label: 'Residences', href: '#residences' },
  { label: '3D Explorer', href: '#explorer' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass py-4 shadow-2xl'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-4 group">
            <div className="w-12 h-12 border-2 border-[var(--gold-metallic)] rounded-xl flex items-center justify-center group-hover:bg-[var(--amber-soft)] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="gold-text font-bold text-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>A</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-semibold tracking-[0.25em] uppercase text-[var(--text-primary)]">
                Apex Tower
              </div>
              <div className="text-xs tracking-[0.35em] uppercase text-[var(--gold-metallic)] font-medium">
                Manhattan
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-[var(--gold-metallic)] transition-colors duration-300 relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--gold-metallic)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2.5 px-7 py-3 text-sm font-semibold tracking-wider uppercase border-2 border-[var(--gold-metallic)] text-[var(--gold-metallic)] rounded-full hover:bg-[var(--gold-metallic)] hover:text-[var(--sky-obsidian)] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
            >
              Schedule Tour
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[var(--text-primary)] hover:text-[var(--gold-metallic)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-28 glass"
          >
            <nav className="flex flex-col items-center gap-8 py-16">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-medium tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--gold-metallic)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 px-10 py-4 text-base font-semibold tracking-wider uppercase border-2 border-[var(--gold-metallic)] text-[var(--gold-metallic)] rounded-full hover:bg-[var(--gold-metallic)] hover:text-[var(--sky-obsidian)] transition-all duration-300"
              >
                Schedule Private Tour
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
