'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 border-b border-[var(--slate-border)]/40 text-center overflow-hidden">
      {/* Subtle Floating Ambient Shape */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 w-80 h-80 bg-[var(--amber-glow)]/5 rounded-full blur-[140px] animate-float-slow pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold-metallic)] font-semibold">
              THE CONCEPT
            </span>
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            A Sanctuary, <span className="gold-text font-normal">Elevated.</span>
          </h2>
        </motion.div>

        {/* Centered & Justified Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-6 text-center"
        >
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed text-justify md:text-center">
            Designed as an urban sanctuary high above Midtown Manhattan, Apex Tower blends organic architectural curves with cutting-edge engineering. Every line is crafted to maximize natural light, privacy, and panoramic views of the skyline and East River.
          </p>
          <p className="text-base text-[var(--text-muted)] font-light leading-relaxed text-justify md:text-center">
            Featuring only 140 bespoke residences across 85 stories, the building provides an unprecedented level of exclusivity, accompanied by 50,000 sq ft of private amenities and 24/7 white-glove concierge service.
          </p>
        </motion.div>

        <div className="divider-gold opacity-30 max-w-2xl mx-auto my-12" />

        {/* Centered Stats Row with Hover Lift & Float Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
        >
          {[
            { value: '85', label: 'Floors of Distinction' },
            { value: '140', label: 'Curated Residences' },
            { value: '100%', label: 'Panoramic Sky Views' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="glass p-7 rounded-xl border border-[var(--slate-border)]/50 hover:border-[var(--gold-metallic)] transition-all duration-300 shine-sweep-hover"
            >
              <div className="text-4xl lg:text-5xl font-light gold-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mt-2 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
