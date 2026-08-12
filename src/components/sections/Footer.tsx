'use client'

import { motion } from 'framer-motion'
import { Globe, Share2, Hash, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  residences: [
    { label: 'Penthouse Collection', href: '#residences' },
    { label: 'Sky Residences', href: '#residences' },
    { label: 'Executive Suites', href: '#residences' },
    { label: 'Urban Lofts', href: '#residences' },
  ],
  experience: [
    { label: '3D Explorer', href: '#explorer' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'Gallery', href: '#' },
  ],
  info: [
    { label: 'About the Developer', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Broker Portal', href: '#' },
    { label: 'Legal Disclaimer', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--slate-border)]">
      {/* Main footer */}
      <div className="max-w-[1700px] mx-auto px-8 md:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border-2 border-[var(--gold-metallic)] rounded-xl flex items-center justify-center">
                <span className="gold-text font-bold text-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>A</span>
              </div>
              <div>
                <div className="text-base font-semibold tracking-[0.25em] uppercase text-[var(--text-primary)]">
                  Apex Tower
                </div>
                <div className="text-xs tracking-[0.35em] uppercase text-[var(--gold-metallic)] font-semibold">
                  Manhattan
                </div>
              </div>
            </div>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md mb-8 font-light">
              Rising 85 stories above Midtown Manhattan, Apex Tower represents the pinnacle of modern luxury — where visionary architecture meets uncompromising craftsmanship.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Share2, href: '#' },
                { icon: Hash, href: '#' },
                { icon: Globe, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-[var(--sky-midnight)] border border-[var(--slate-border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold-metallic)] hover:text-[var(--gold-metallic)] transition-all duration-300 shadow-md"
                  aria-label={`Social media link ${i + 1}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Residences */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[var(--gold-metallic)] font-bold mb-6">
              Residences
            </h4>
            <ul className="space-y-4">
              {footerLinks.residences.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[var(--gold-metallic)] font-bold mb-6">
              Experience
            </h4>
            <ul className="space-y-4">
              {footerLinks.experience.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[var(--gold-metallic)] font-bold mb-6">
              Information
            </h4>
            <ul className="space-y-4">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--slate-border)]">
        <div className="max-w-[1700px] mx-auto px-8 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[var(--text-muted)] font-medium">
            © {new Date().getFullYear()} Apex Tower Manhattan. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Terms of Use
            </a>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Fair Housing
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 z-40 text-lg"
        aria-label="Back to top"
      >
        ↑
      </motion.button>
    </footer>
  )
}
