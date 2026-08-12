'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 text-center"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-skyline.jpg"
          alt="Apex Tower Manhattan at Sunset"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky-obsidian)] via-[var(--sky-obsidian)]/60 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--sky-obsidian)]/80 via-transparent to-[var(--sky-obsidian)]/80" />
      </div>

      {/* Floating Decorative Ambient Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[var(--amber-glow)]/10 rounded-full blur-[120px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[var(--gold-metallic)]/10 rounded-full blur-[140px] animate-float pointer-events-none" />

      {/* Content — Centered */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-8 md:px-16 flex flex-col justify-center items-center text-center">
        {/* Floating Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center justify-center gap-3 animate-float"
        >
          <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-[var(--gold-metallic)] font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--amber-glow)] animate-spin" style={{ animationDuration: '8s' }} />
            LUXURY RESIDENCES IN MANHATTAN
          </span>
          <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Elevated Living, <br />
            <span className="gold-text font-normal">Naturally Refined.</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-2xl text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed text-center"
        >
          An 85-story architectural landmark redefining ultra-luxury living in Midtown Manhattan with panoramic 360° skyline vistas.
        </motion.p>

        {/* CTA Buttons — Centered with Floating & Hover Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#residences"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold text-xs tracking-[0.2em] uppercase rounded-sm pulse-glow transition-all duration-300 shine-sweep-hover"
          >
            EXPLORE RESIDENCES
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#explorer"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 glass border border-white/20 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-sm hover:border-[var(--gold-metallic)] hover:text-[var(--gold-metallic)] transition-all duration-300"
          >
            VIEW 3D TOWER
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Animated Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--text-muted)] animate-float"
      >
        <span>SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--gold-metallic)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
