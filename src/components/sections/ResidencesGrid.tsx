'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface Residence {
  id: string
  name: string
  type: string
  floor: string
  beds: number
  baths: number
  sqft: string
  price: string
  status: 'available' | 'reserved' | 'sold'
  image: string
  features: string[]
}

const residences: Residence[] = [
  {
    id: 'ph-01',
    name: 'Aura Penthouse',
    type: 'Penthouse',
    floor: '83–85',
    beds: 5,
    baths: 6,
    sqft: '8,200',
    price: '$42,000,000',
    status: 'available',
    image: '/images/penthouse.png',
    features: ['Private Elevator', 'Rooftop Terrace', 'Wine Vault'],
  },
  {
    id: 'ph-02',
    name: 'Horizon Duplex',
    type: 'Penthouse',
    floor: '78–79',
    beds: 4,
    baths: 5,
    sqft: '6,500',
    price: '$28,500,000',
    status: 'available',
    image: '/images/penthouse.png',
    features: ['Double-Height Ceiling', 'Private Pool'],
  },
  {
    id: 'sky-01',
    name: 'Meridian Suite',
    type: 'Sky Residence',
    floor: '65',
    beds: 3,
    baths: 3.5,
    sqft: '3,800',
    price: '$14,200,000',
    status: 'reserved',
    image: '/images/sky-residence.png',
    features: ['Corner Exposure', 'Italian Marble Baths'],
  },
  {
    id: 'sky-02',
    name: 'Celestial Panorama',
    type: 'Sky Residence',
    floor: '58',
    beds: 3,
    baths: 3,
    sqft: '3,200',
    price: '$11,800,000',
    status: 'available',
    image: '/images/sky-residence.png',
    features: ['Park Vistas', 'Library Nook'],
  },
  {
    id: 'exec-01',
    name: 'Metropolitan Suite',
    type: 'Executive Suite',
    floor: '42',
    beds: 2,
    baths: 2.5,
    sqft: '2,400',
    price: '$6,500,000',
    status: 'available',
    image: '/images/executive-suite.png',
    features: ['City Views', 'Heated Flooring'],
  },
  {
    id: 'exec-02',
    name: 'Skyline Terrace',
    type: 'Executive Suite',
    floor: '36',
    beds: 2,
    baths: 2,
    sqft: '2,100',
    price: '$5,800,000',
    status: 'available',
    image: '/images/executive-suite.png',
    features: ['Terrace Balcony', 'Concierge Service'],
  },
  {
    id: 'loft-01',
    name: 'Gramercy Loft',
    type: 'Urban Loft',
    floor: '18',
    beds: 1,
    baths: 1.5,
    sqft: '1,200',
    price: '$2,800,000',
    status: 'available',
    image: '/images/executive-suite.png',
    features: ['High Ceilings', 'Washer/Dryer'],
  },
  {
    id: 'loft-02',
    name: 'Tribeca Loft',
    type: 'Urban Loft',
    floor: '12',
    beds: 1,
    baths: 1,
    sqft: '1,050',
    price: '$2,400,000',
    status: 'available',
    image: '/images/executive-suite.png',
    features: ['Open Layout', 'Storage Unit'],
  },
]

const filterOptions = ['ALL', 'PENTHOUSE', 'SKY RESIDENCES', 'EXECUTIVE', 'URBAN LOFTS']

export default function ResidencesGrid() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const filtered =
    activeFilter === 'ALL'
      ? residences
      : residences.filter((r) => r.type.toUpperCase().includes(activeFilter.replace('S', '')))

  return (
    <section ref={sectionRef} id="residences" className="relative py-28 md:py-36 border-b border-[var(--slate-border)]/40 text-center">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold-metallic)] font-semibold">
              LUXURY UNITS
            </span>
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-light text-white tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Featured <span className="gold-text font-normal">Residences</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed text-justify md:text-center">
            Each unit is crafted with floor-to-ceiling glass, Italian marble finishings, and unmatched skyline vistas across Manhattan.
          </p>
        </motion.div>

        {/* Centered Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                activeFilter === option
                  ? 'bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold shadow-md'
                  : 'border border-[var(--slate-border)] text-[var(--text-secondary)] hover:border-[var(--gold-metallic)] hover:text-white bg-[var(--sky-midnight)]'
              }`}
            >
              {option}
            </button>
          ))}
        </motion.div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {filtered.map((res, i) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="glass-card border border-[var(--slate-border)] hover:border-[var(--gold-metallic)]/60 transition-all duration-300 flex flex-col justify-between p-6 bg-[#0d121c] group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--slate-border)]/50 mb-4">
                  <h3 className="text-lg font-light text-white group-hover:text-[var(--gold-metallic)] transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {res.name}
                  </h3>
                  <span className="text-[10px] tracking-wider uppercase text-[var(--gold-metallic)] font-semibold border border-[var(--gold-metallic)]/30 px-2 py-0.5 rounded">
                    F{res.floor}
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-2 text-xs text-[var(--text-secondary)] mb-6 font-light">
                  <div className="flex justify-between">
                    <span>Bedrooms:</span>
                    <span className="text-white font-medium">{res.beds} Beds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <span className="text-white font-medium">{res.baths} Baths</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Floor Area:</span>
                    <span className="text-white font-medium">{res.sqft} sq ft</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Link */}
              <div className="pt-4 border-t border-[var(--slate-border)]/50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider">Price</div>
                  <div className="text-sm font-bold gold-text">{res.price}</div>
                </div>
                <a
                  href="#contact"
                  className="text-xs tracking-widest uppercase text-[var(--gold-metallic)] hover:text-white flex items-center gap-1 group/btn font-semibold"
                >
                  INQUIRE
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
