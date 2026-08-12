'use client'

import { useState, useRef } from 'react'
import type { LucideProps } from 'lucide-react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Wine, Waves, Plane, Sparkles, Dumbbell,
  UtensilsCrossed, TreePine, Star, CheckCircle2
} from 'lucide-react'
import Image from 'next/image'

interface Amenity {
  id: string
  name: string
  description: string
  icon: React.ComponentType<LucideProps>
  floor: string
  image: string
  details: string[]
}

const amenities: Amenity[] = [
  {
    id: 'pool',
    name: 'Cloud Infinity Pool',
    description: 'A glass-edged infinity pool suspended on the 72nd floor, offering year-round swimming with temperature control and breathtaking skyline views across Manhattan.',
    icon: Waves,
    floor: '72nd Floor',
    image: '/images/amenity-pool.png',
    details: ['75ft temperature-controlled pool', 'Private luxury cabana seating', 'Hot & cold hydrotherapy plunge'],
  },
  {
    id: 'sky-club',
    name: '75th Floor Sky Lounge',
    description: 'A members-only sanctuary above the clouds, featuring curated mixology, panoramic sunset views, and intimate private seating areas.',
    icon: Star,
    floor: '75th Floor',
    image: '/images/penthouse.png',
    details: ['360° Sunset viewing deck', 'Private dining room', 'Outdoor cigar terrace'],
  },
  {
    id: 'helipad',
    name: 'Private Rooftop Helipad',
    description: 'Direct rooftop helicopter access for the ultimate in convenience, connecting you to all three NYC metro airports in under 10 minutes.',
    icon: Plane,
    floor: 'Rooftop Level',
    image: '/images/hero-skyline.jpg',
    details: ['FAA certified flight pad', 'Direct elevator access', 'VIP arrival lounge'],
  },
  {
    id: 'wine',
    name: 'Sommelier Wine Vault',
    description: 'A climate-controlled cellar curated by a master sommelier, with private lockers for personal rare collections.',
    icon: Wine,
    floor: 'Level B1',
    image: '/images/executive-suite.png',
    details: ['2,000+ bottle climate vault', 'Individual private lockers', 'Sommelier tasting room'],
  },
  {
    id: 'spa',
    name: 'Executive Wellness & Spa',
    description: 'A holistic wellness retreat spanning an entire floor, featuring custom treatment rooms, a traditional Turkish hammam, and private garden.',
    icon: Sparkles,
    floor: '70th Floor',
    image: '/images/sky-residence.png',
    details: ['8 private treatment suites', 'Custom Turkish hammam', 'Himalayan salt room'],
  },
]

export default function AmenitiesShowcase() {
  const [activeId, setActiveId] = useState(amenities[0].id)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const activeAmenity = amenities.find((a) => a.id === activeId) || amenities[0]

  return (
    <section ref={sectionRef} id="amenities" className="relative py-28 md:py-36 border-b border-[var(--slate-border)]/40 overflow-hidden text-center">
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
              WORLD-CLASS AMENITIES
            </span>
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-light text-white tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            An Elevated <span className="gold-text font-normal">Lifestyle</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed text-justify md:text-center">
            Over 50,000 sq ft of curated amenity spaces spanning five dedicated sky-floors.
          </p>
        </motion.div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Left Column: Amenity Item Selector List (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 glass-card p-6 border border-[var(--slate-border)] space-y-3 bg-[#0d121c]"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-metallic)] font-semibold block mb-4 text-center">
              SELECT AN AMENITY
            </span>
            <div className="space-y-2">
              {amenities.map((amenity) => {
                const Icon = amenity.icon
                const isActive = activeId === amenity.id
                return (
                  <button
                    key={amenity.id}
                    onClick={() => setActiveId(amenity.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center gap-4 ${
                      isActive
                        ? 'border-[var(--gold-metallic)] bg-[var(--amber-soft)] shadow-md'
                        : 'border-[var(--slate-border)] hover:border-[var(--gold-metallic)]/40 bg-[var(--glass-surface)]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[var(--gold-metallic)] text-[var(--sky-obsidian)]'
                          : 'bg-[var(--sky-midnight)] text-[var(--gold-metallic)] border border-[var(--slate-border)]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-base font-semibold truncate ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                        {amenity.name}
                      </div>
                      <div className="text-xs text-[var(--gold-metallic)] mt-0.5 font-medium">
                        {amenity.floor}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Featured Amenity Showcase Card (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAmenity.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="glass-card overflow-hidden relative h-[520px] lg:h-[580px] border border-[var(--gold-metallic)]/30 flex flex-col justify-end p-8 md:p-12 shadow-2xl"
              >
                {/* Photo Background */}
                <Image
                  src={activeAmenity.image}
                  alt={activeAmenity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky-obsidian)] via-[var(--sky-obsidian)]/60 to-black/30" />

                {/* Text Content Overlay */}
                <div className="relative z-10 space-y-4">
                  <div className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--gold-metallic)]">
                    {activeAmenity.floor} // FEATURED AMENITY
                  </div>
                  <h3
                    className="text-4xl md:text-5xl font-light text-white"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {activeAmenity.name}
                  </h3>
                  <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-xl">
                    {activeAmenity.description}
                  </p>

                  {/* Feature Checks List */}
                  <div className="flex flex-wrap gap-4 pt-3">
                    {activeAmenity.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 glass px-3.5 py-1.5 rounded text-xs font-medium text-white border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-[var(--gold-metallic)] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
