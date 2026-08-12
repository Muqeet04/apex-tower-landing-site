'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, Send,
  CheckCircle, ArrowRight
} from 'lucide-react'

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => setFormState('sent'), 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-36 overflow-hidden text-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--sky-deep)] to-[var(--sky-obsidian)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--gold-metallic)] rounded-full blur-[320px] opacity-[0.04]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16">
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
              PRIVATE INQUIRY
            </span>
            <span className="w-8 h-[2px] bg-[var(--gold-metallic)]" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-light text-white tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Begin Your <span className="gold-text font-normal">Journey</span>
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)] font-light leading-relaxed text-justify md:text-center">
            Experience Apex Tower firsthand. Our dedicated executive sales team will curate a bespoke viewing tailored precisely to your schedule.
          </p>
        </motion.div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Sales Gallery Details — Left 5 Columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-8 space-y-6 border border-[var(--slate-border)] bg-[#0d121c]">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-metallic)] font-semibold block text-center">
                SALES GALLERY & OFFICE
              </span>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[var(--gold-metallic)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">405 East 42nd Street</div>
                    <div className="text-xs text-[var(--text-secondary)]">Midtown Manhattan, NY 10017</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[var(--gold-metallic)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">+1 (212) 555-APEX</div>
                    <div className="text-xs text-[var(--text-secondary)]">Direct executive sales line</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[var(--gold-metallic)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">sales@apextower.com</div>
                    <div className="text-xs text-[var(--text-secondary)]">Response within 2 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[var(--gold-metallic)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Appointment Hours</div>
                    <div className="text-xs text-[var(--text-secondary)]">Monday – Saturday, 10am – 7pm EST</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form — Right 7 Columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 sm:p-10 border border-[var(--slate-border)] bg-[#0d121c]">
              {formState === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-[var(--gold-metallic)] mx-auto mb-4" />
                  <h3
                    className="text-3xl font-light text-white mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                    A sales advisor will contact you within 2 hours to confirm your private viewing.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-6 text-xs text-[var(--gold-metallic)] font-bold tracking-widest uppercase"
                  >
                    ← SUBMIT ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="James Harrison"
                        className="w-full px-4 py-3 bg-[var(--sky-midnight)] border border-[var(--slate-border)] rounded text-sm text-white placeholder-[var(--text-muted)] focus:border-[var(--gold-metallic)] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="james@example.com"
                        className="w-full px-4 py-3 bg-[var(--sky-midnight)] border border-[var(--slate-border)] rounded text-sm text-white placeholder-[var(--text-muted)] focus:border-[var(--gold-metallic)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (212) 555-0000"
                        className="w-full px-4 py-3 bg-[var(--sky-midnight)] border border-[var(--slate-border)] rounded text-sm text-white placeholder-[var(--text-muted)] focus:border-[var(--gold-metallic)] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Residence tier */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
                        Residence Tier Interest
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--sky-midnight)] border border-[var(--slate-border)] rounded text-sm text-white focus:border-[var(--gold-metallic)] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select Tier...</option>
                        <option value="penthouse">Penthouse Collection ($18M – $45M)</option>
                        <option value="sky">Sky Residences ($8M – $17M)</option>
                        <option value="executive">Executive Suites ($4M – $7.5M)</option>
                        <option value="loft">Urban Lofts ($2M – $3.8M)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
                      Message / Preferences
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your timing or floor preferences..."
                      className="w-full px-4 py-3 bg-[var(--sky-midnight)] border border-[var(--slate-border)] rounded text-sm text-white placeholder-[var(--text-muted)] focus:border-[var(--gold-metallic)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center justify-center gap-2.5 text-xs text-[var(--text-secondary)] pt-1">
                    <input type="checkbox" id="privacy" required className="accent-[var(--gold-metallic)] w-4 h-4" />
                    <label htmlFor="privacy">I agree to receive communications regarding Apex Tower.</label>
                  </div>

                  {/* Gold Button */}
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[var(--gold-metallic)] text-[var(--sky-obsidian)] font-bold text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[var(--amber-glow)] transition-all duration-300 disabled:opacity-60"
                  >
                    {formState === 'sending' ? (
                      'SUBMITTING...'
                    ) : (
                      <>
                        REQUEST PRIVATE TOUR
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
