'use client'

import { useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { Layers, DollarSign, Users, ChevronRight, Maximize2, RotateCcw } from 'lucide-react'
import { FLOOR_ZONES, type FloorZone } from '@/components/3d/BuildingViewer'

const BuildingViewer = dynamic(() => import('@/components/3d/BuildingViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center min-h-[600px]">
      <div className="text-center">
        <div className="w-14 h-14 border-2 border-[var(--gold-metallic)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--gold-metallic)] uppercase">Loading 3D Skyscraper</p>
      </div>
    </div>
  ),
})

function getZoneForFloor(floor: number): FloorZone {
  for (const zone of FLOOR_ZONES) {
    if (floor >= zone.floors[0] && floor <= zone.floors[1]) return zone
  }
  return FLOOR_ZONES[3]
}

export default function BuildingExplorerSection() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [activeZone, setActiveZone] = useState<FloorZone>(FLOOR_ZONES[0])
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleFloorSelect = useCallback((floor: number) => {
    setSelectedFloor(floor)
    setActiveZone(getZoneForFloor(floor))
  }, [])

  const handleFloorHover = useCallback((floor: number | null) => {
    setHoveredFloor(floor)
  }, [])

  const handleZoneClick = useCallback((zone: FloorZone) => {
    setActiveZone(zone)
    setSelectedFloor(zone.floors[0])
  }, [])

  const currentInfo = selectedFloor ? getZoneForFloor(selectedFloor) : activeZone

  return (
    <section ref={sectionRef} id="explorer" className="relative py-28 md:py-36 border-b border-[var(--slate-border)]/40 overflow-hidden text-center">
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
              3D BUILDING EXPLORER
            </span>
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Select Your <span className="gold-text font-normal">Perspective</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed text-justify md:text-center">
            Position the 3D tower to explore floor zones, view floor plan specs, pricing, and availability in real time.
          </p>
        </motion.div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Left: Large 3D Building Viewer Frame (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-card overflow-hidden relative h-[600px] lg:h-[680px] border border-[var(--slate-border)] flex items-center justify-center bg-[#0d121c]"
          >
            <BuildingViewer
              onFloorSelect={handleFloorSelect}
              onFloorHover={handleFloorHover}
              hoveredFloor={hoveredFloor}
              selectedFloor={selectedFloor}
            />

            {/* Instruction overlay */}
            <div className="absolute top-5 left-5 glass px-4 py-2 rounded-md flex items-center gap-2 border border-[var(--slate-border)] text-xs text-[var(--text-secondary)]">
              <RotateCcw className="w-3.5 h-3.5 text-[var(--gold-metallic)]" />
              <span>360° Drag & Scroll Zoom</span>
            </div>

            {/* Active Floor Tooltip */}
            {hoveredFloor && (
              <div className="absolute bottom-5 left-5 glass px-4 py-2 rounded-md border border-[var(--gold-metallic)]/50 backdrop-blur-md">
                <span className="text-sm font-bold text-[var(--gold-metallic)]">Floor {hoveredFloor}</span>
                <span className="text-xs text-[var(--text-secondary)] ml-3 font-medium">{getZoneForFloor(hoveredFloor).name}</span>
              </div>
            )}
          </motion.div>

          {/* Right: Floor Zone Selector & Specs Card (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Zone Selector Buttons */}
            <div className="glass-card p-6 border border-[var(--slate-border)] space-y-3">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-metallic)] font-semibold block mb-3 text-center">
                SELECT ZONE
              </span>
              <div className="grid grid-cols-2 gap-3">
                {FLOOR_ZONES.map((zone) => (
                  <button
                    key={zone.name}
                    onClick={() => handleZoneClick(zone)}
                    className={`text-left p-3.5 rounded-lg border transition-all duration-300 ${
                      activeZone.name === zone.name
                        ? 'border-[var(--gold-metallic)] bg-[var(--amber-soft)] shadow-md'
                        : 'border-[var(--slate-border)] hover:border-[var(--gold-metallic)]/40 bg-[var(--glass-surface)]'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{zone.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Floors {zone.floors[0]}–{zone.floors[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Zone Card Details */}
            <div className="glass-card p-7 border border-[var(--gold-metallic)]/30 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold-metallic)] font-semibold block mb-2">
                  ZONE DETAILS
                </span>
                <h3
                  className="text-3xl font-light text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {currentInfo.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] tracking-widest uppercase mt-1">
                  Floors {currentInfo.floors[0]} through {currentInfo.floors[1]}
                </p>
              </div>

              <div className="divider-gold opacity-40" />

              {/* Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[var(--slate-border)]/50">
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Starting Price</span>
                  <span className="text-xl font-bold gold-text">{currentInfo.price}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--slate-border)]/50">
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Available Residences</span>
                  <span className="text-base font-semibold text-white">{currentInfo.units} Units</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--slate-border)]/50">
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Floor Area</span>
                  <span className="text-base font-semibold text-white">{currentInfo.avgSqFt}</span>
                </div>
              </div>

              {/* Gold Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[var(--amber-glow)] transition-all duration-300"
              >
                VIEW FLOOR PLAN
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
