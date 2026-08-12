'use client'

import { useState, useRef } from 'react'
import type { LucideProps } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Clock, Car, Train, ShoppingBag,
  TreePine, GraduationCap, UtensilsCrossed, Building, Star, Navigation, ArrowRight
} from 'lucide-react'

interface POI {
  id: string
  name: string
  category: string
  icon: React.ComponentType<LucideProps>
  walkTime: string
  driveTime: string
  distance: string
  description: string
  position: { top: string; left: string }
}

const pois: POI[] = [
  {
    id: 'grand-central',
    name: 'Grand Central Terminal',
    category: 'Transit',
    icon: Train,
    walkTime: '4 min',
    driveTime: '2 min',
    distance: '0.3 mi',
    description: 'Major transit hub with Metro-North and subway lines.',
    position: { top: '48%', left: '42%' },
  },
  {
    id: 'chrysler',
    name: 'Chrysler Building',
    category: 'Landmarks',
    icon: Star,
    walkTime: '3 min',
    driveTime: '1 min',
    distance: '0.2 mi',
    description: 'Iconic Art Deco landmark directly adjacent.',
    position: { top: '42%', left: '56%' },
  },
  {
    id: '5th-avenue',
    name: '5th Avenue Shopping',
    category: 'Shopping',
    icon: ShoppingBag,
    walkTime: '6 min',
    driveTime: '3 min',
    distance: '0.4 mi',
    description: 'World-renowned luxury fashion retail corridor.',
    position: { top: '34%', left: '32%' },
  },
  {
    id: 'central-park',
    name: 'Central Park',
    category: 'Parks',
    icon: TreePine,
    walkTime: '12 min',
    driveTime: '5 min',
    distance: '0.7 mi',
    description: 'NYC\'s iconic 843-acre urban park sanctuary.',
    position: { top: '18%', left: '26%' },
  },
  {
    id: 'un-plaza',
    name: 'United Nations Plaza',
    category: 'Landmarks',
    icon: Building,
    walkTime: '8 min',
    driveTime: '4 min',
    distance: '0.5 mi',
    description: 'International diplomatic center and waterfront park.',
    position: { top: '54%', left: '78%' },
  },
  {
    id: 'michelin',
    name: 'Le Bernardin Dining',
    category: 'Dining',
    icon: UtensilsCrossed,
    walkTime: '10 min',
    driveTime: '5 min',
    distance: '0.6 mi',
    description: 'Three-Michelin-star fine dining district.',
    position: { top: '68%', left: '36%' },
  },
]

const categories = ['ALL', 'TRANSIT', 'PARKS', 'SHOPPING', 'DINING']

export default function InteractiveMapSection() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [activePOI, setActivePOI] = useState<POI | null>(pois[0])
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const filtered =
    activeCategory === 'ALL'
      ? pois
      : pois.filter((p) => p.category.toUpperCase() === activeCategory)

  return (
    <section ref={sectionRef} id="location" className="relative py-28 md:py-36 border-b border-[var(--slate-border)]/40 overflow-hidden text-center">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold-metallic)] font-semibold">
              LOCATION & NEIGHBORHOOD
            </span>
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-light text-white tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The Epicenter <span className="gold-text font-normal">of Elegance</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed text-justify md:text-center">
            Situated at 405 East 42nd Street, surrounded by world-famous landmarks, Michelin dining, and luxury retail.
          </p>
        </motion.div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Left Column: POI Selector List (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 glass-card p-6 border border-[var(--slate-border)] flex flex-col justify-between space-y-6 bg-[#0d121c]"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat) }}
                  className={`px-3.5 py-1.5 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold'
                      : 'border border-[var(--slate-border)] text-[var(--text-secondary)] hover:border-[var(--gold-metallic)] bg-[var(--sky-midnight)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* POI Items List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 flex-1" style={{ scrollbarWidth: 'thin' }}>
              {filtered.map((poi) => {
                const Icon = poi.icon
                const isActive = activePOI?.id === poi.id
                return (
                  <motion.button
                    whileHover={{ x: 4 }}
                    key={poi.id}
                    onClick={() => setActivePOI(poi)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? 'border-[var(--gold-metallic)] bg-[var(--amber-soft)] shadow-md'
                        : 'border-[var(--slate-border)] hover:border-[var(--gold-metallic)]/40 bg-[var(--glass-surface)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-[var(--gold-metallic)] text-[var(--sky-obsidian)]' : 'bg-[var(--sky-midnight)] text-[var(--gold-metallic)] border border-[var(--slate-border)]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{poi.name}</div>
                          <div className="text-xs text-[var(--text-secondary)]">{poi.description}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[var(--gold-metallic)] shrink-0 ml-2">
                        {poi.walkTime}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Gold Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[var(--amber-glow)] transition-all duration-300"
            >
              EXPLORE NEIGHBORHOOD
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Right Column: Interactive Map Canvas (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 glass-card overflow-hidden relative min-h-[550px] border border-[var(--slate-border)] shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--sky-obsidian)] via-[#0e141f] to-[var(--sky-midnight)] overflow-hidden">
              {/* Radar Grid Lines */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(var(--gold-metallic) 1px, transparent 1px),
                    linear-gradient(90deg, var(--gold-metallic) 1px, transparent 1px)
                  `,
                  backgroundSize: '70px 70px',
                }}
              />

              {/* Continuous Rotating Radar Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-[var(--gold-metallic)]/25 rounded-full pointer-events-none animate-rotate-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] border border-[var(--gold-metallic)]/15 rounded-full pointer-events-none animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '60s' }} />

              {/* Central Landmark Pin — Apex Tower with Rippling Pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-3 bg-[var(--gold-metallic)]/30 rounded-full animate-ping pointer-events-none" />
                  <div className="w-10 h-10 bg-[var(--gold-metallic)] rounded-full shadow-[0_0_30px_rgba(212,175,55,0.8)] flex items-center justify-center border-2 border-white pulse-glow">
                    <Navigation className="w-5 h-5 text-[var(--sky-obsidian)] fill-current" />
                  </div>
                  <div className="mt-2 glass px-3 py-1 rounded border border-[var(--gold-metallic)]/50 shadow-2xl backdrop-blur-md">
                    <span className="text-xs font-bold text-white tracking-widest uppercase">Apex Tower</span>
                  </div>
                </div>
              </div>

              {/* POI Markers */}
              {filtered.map((poi) => {
                const Icon = poi.icon
                const isActive = activePOI?.id === poi.id

                return (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    key={poi.id}
                    onClick={() => setActivePOI(poi)}
                    className={`absolute z-20 group -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isActive ? 'scale-125 z-40' : 'hover:scale-110'
                    }`}
                    style={{ top: poi.position.top, left: poi.position.left }}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[var(--amber-glow)] text-[var(--sky-obsidian)] shadow-[0_0_25px_rgba(245,158,11,0.85)] border-2 border-white'
                          : 'bg-[var(--sky-midnight)] text-[var(--gold-metallic)] border border-[var(--gold-metallic)]/40 hover:border-[var(--gold-metallic)] shadow-lg'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap glass px-2.5 py-1 rounded text-[10px] font-medium text-white transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {poi.name}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
