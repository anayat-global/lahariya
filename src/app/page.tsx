'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/marketplace/ListingCard'
import { MOCK_LISTINGS, DESIGNERS } from '@/lib/mock-data'
import { fmt } from '@/lib/utils'

export default function HomePage() {
  const featured = MOCK_LISTINGS.slice(0, 4)
  const hero = MOCK_LISTINGS[0]
  const floater = MOCK_LISTINGS[1]

  return (
    <>
      <Navbar />
      <main>

        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="hero-grid" style={{ minHeight: 'calc(100vh - 100px)' }}>

          {/* Left: Editorial copy */}
          <div style={{
            background: 'var(--cream)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 8vw, 96px) clamp(32px, 6vw, 80px)',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '11px',
              letterSpacing: '0.22em',
              fontWeight: 600,
              color: 'var(--crimson)',
              textTransform: 'uppercase',
              marginBottom: '36px',
            }}>
              <span style={{ width: '28px', height: '1px', background: 'var(--crimson)', flexShrink: 0 }} />
              Pre-Loved Indian Bridal Fashion
            </span>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(52px, 5.5vw, 86px)',
              fontWeight: 300,
              lineHeight: 1.06,
              marginBottom: '28px',
              letterSpacing: '-0.01em',
            }}>
              One Lehenga.<br />
              <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>Two Stories.</em>
            </h1>

            <p style={{
              fontSize: '17px',
              color: 'var(--warm-grey)',
              maxWidth: '420px',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}>
              Every bridal lehenga carries the story of its first owner.
              Find the one that will begin yours.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '60px' }}>
              <Link href="/marketplace" style={{
                background: 'var(--crimson)',
                color: '#fff',
                padding: '15px 38px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}>
                Shop Listings
              </Link>
              <Link href="/how-it-works" style={{
                background: 'transparent',
                color: 'var(--fg)',
                padding: '15px 38px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: 500,
                border: '1.5px solid var(--border)',
              }}>
                How It Works
              </Link>
            </div>

            {/* Trust stats */}
            <div style={{
              display: 'flex',
              gap: '40px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}>
              {[
                { to: 2400, prefix: '', suffix: '+', label: 'Lehengas Listed' },
                { to: 18,   prefix: '₹', suffix: 'Cr+', label: 'Saved by Brides' },
                { to: 99,   prefix: '', suffix: '%', label: 'Verified Sellers' },
              ].map(({ to, prefix, suffix, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '32px',
                    fontWeight: 600,
                    color: 'var(--crimson)',
                    lineHeight: 1,
                    marginBottom: '5px',
                  }}>
                    <CountUp to={to} prefix={prefix} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--warm-grey)', letterSpacing: '0.07em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual panel */}
          <div style={{
            background: 'linear-gradient(160deg, #3d1010 0%, #7a1a1a 45%, var(--crimson) 100%)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '480px',
          }}>
            {/* Watermark */}
            <span style={{
              position: 'absolute',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(90px, 15vw, 200px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.04)',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              transform: 'rotate(-18deg)',
              letterSpacing: '0.06em',
            }}>
              LAHARIYA
            </span>

            {/* Main listing card */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 'var(--radius-xl)',
              padding: '20px',
              width: 'min(300px, 80%)',
              transform: 'rotate(2.5deg)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                aspectRatio: '3/4',
                background: `linear-gradient(145deg, ${hero.colour_hex}30, ${hero.colour_hex}60)`,
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <HeroGarment colour={hero.colour_hex} />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(255,255,255,0.92)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  color: '#1c1c1c',
                  textTransform: 'uppercase',
                }}>New Arrival</span>
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'var(--crimson)',
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-full)',
                  color: '#fff',
                }}>-42%</span>
              </div>
              <p style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                {hero.designer}
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 500, color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>
                {hero.title.replace(`— ${hero.designer}`, '').trim()}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: 'var(--gold)' }}>
                  {fmt(hero.asking_price)}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>
                  {fmt(hero.original_retail_price)}
                </span>
              </div>
            </div>

            {/* Floating mini card */}
            <div style={{
              position: 'absolute',
              bottom: '12%',
              right: '6%',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 18px',
              transform: 'rotate(-2.5deg)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              zIndex: 2,
            }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px', letterSpacing: '0.06em' }}>Just listed</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: '#fff', fontWeight: 500, marginBottom: '2px' }}>{floater.designer}</p>
              <p style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600 }}>{fmt(floater.asking_price)}</p>
            </div>

            {/* Floating trust pill */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '6%',
              background: 'rgba(45,106,79,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 2,
            }}>
              <span style={{ fontSize: '12px' }}>✓</span>
              <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600, letterSpacing: '0.06em' }}>Authenticity Verified</span>
            </div>
          </div>
        </section>

        {/* ─── Marquee ───────────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--charcoal)',
          padding: '14px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'marquee 32s linear infinite',
          }}>
            {[0, 1].map(i => (
              <span key={i} style={{
                display: 'inline-block',
                fontSize: '11px',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: 'var(--gold)',
                textTransform: 'uppercase',
              }}>
                SABYASACHI &nbsp;·&nbsp; MANISH MALHOTRA &nbsp;·&nbsp; TARUN TAHILIANI &nbsp;·&nbsp; ANITA DONGRE &nbsp;·&nbsp; ABU JANI SANDEEP KHOSLA &nbsp;·&nbsp; RITU KUMAR &nbsp;·&nbsp; BRIDAL &nbsp;·&nbsp; RECEPTION &nbsp;·&nbsp; SANGEET &nbsp;·&nbsp; MEHENDI &nbsp;·&nbsp; FESTIVE &nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
          <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </div>

        {/* ─── Featured Listings ─────────────────────────────────────────── */}
        <section style={{ padding: '96px clamp(20px, 4vw, 48px)', maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '56px',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>New This Week</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, lineHeight: 1 }}>
                  The Edit
                </h2>
              </div>
              <Link href="/marketplace" style={{
                border: '1.5px solid var(--crimson)',
                color: 'var(--crimson)',
                padding: '12px 28px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}>
                View All Listings →
              </Link>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px',
          }}>
            {featured.map((listing, i) => (
              <Reveal key={listing.id} delay={i * 110}>
                <ListingCard listing={listing} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── Real Brides ───────────────────────────────────────────────── */}
        <section style={{
          background: 'var(--ivory)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '96px clamp(20px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Reveal>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '56px',
                flexWrap: 'wrap',
                gap: '16px',
              }}>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>From Our Community</p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, lineHeight: 1 }}>
                    Real Brides, Real Stories
                  </h2>
                </div>
                <Link href="/real-brides" style={{
                  border: '1.5px solid var(--crimson)',
                  color: 'var(--crimson)',
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}>
                  All Stories →
                </Link>
              </div>
            </Reveal>

            <div className="brides-grid">
              {[
                { name: 'Meera & Arjun', location: 'Udaipur, Rajasthan', venue: 'Taj Lake Palace', date: 'February 2024', story: 'A Valentine\'s Day wedding on the lake. Every moment was like a painting — the light, the water, the lehenga.',  tags: ['Sabyasachi', 'Bridal'], photo: 'https://picsum.photos/seed/meera-udaipur/800/500', colour: '#8b1a1a' },
                { name: 'Ishaan & Pooja', location: 'Jaipur, Rajasthan', venue: 'Jai Mahal Palace', date: 'November 2023', story: 'A royal Rajputana wedding with 400 guests and a night sky full of stars. The lehenga felt like it belonged there.', tags: ['Anita Dongre', 'Palace'], photo: 'https://picsum.photos/seed/pooja-jaipur/800/500', colour: '#c4952a' },
                { name: 'Rohan & Aanya', location: 'Mumbai, Maharashtra', venue: 'The Taj Mahal Palace', date: 'January 2024', story: 'An intimate gathering of 80 people, every detail thoughtfully chosen. This pre-loved piece was our something borrowed and something new.', tags: ['Manish Malhotra', 'Reception'], photo: 'https://picsum.photos/seed/aanya-mumbai/800/500', colour: '#1d4e89' },
              ].map(({ name, location, venue, date, story, tags, photo, colour }, i) => (
                <Reveal key={name} delay={i * 130}>
                  <Link
                    href="/real-brides"
                    className="bride-card"
                    style={{
                      display: 'block',
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius-xl)',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      height: '100%',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.boxShadow = 'var(--shadow-md)'
                      el.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.boxShadow = 'none'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      aspectRatio: '16/9',
                      position: 'relative',
                      overflow: 'hidden',
                      background: `linear-gradient(145deg, ${colour}18, ${colour}38)`,
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`${name} wedding`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}>
                        {tags.map(t => (
                          <span key={t} style={{
                            background: 'rgba(255,255,255,0.92)',
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                            color: '#1c1c1c',
                            letterSpacing: '0.04em',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: '24px' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--warm-grey)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                        {venue} · {date}
                      </p>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 500, marginBottom: '10px', color: 'var(--fg)' }}>
                        {name}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--warm-grey)', lineHeight: 1.75 }}>{story}</p>
                      <p style={{ fontSize: '12px', color: 'var(--crimson)', fontWeight: 600, marginTop: '16px', letterSpacing: '0.04em' }}>
                        {location} →
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ──────────────────────────────────────────────── */}
        <section style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: '96px clamp(20px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>The Process</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300 }}>
                  How LAHARIYA Works
                </h2>
              </div>
            </Reveal>

            <div className="how-grid">
              {[
                { step: '01', title: 'Browse Listings', desc: 'Filter by occasion, designer, condition, and budget to find your perfect lehenga.' },
                { step: '02', title: 'Read Her Story', desc: 'Every listing includes the original bride\'s wedding story and memories.' },
                { step: '03', title: 'Buy with Trust', desc: 'Authenticated, verified, and protected by our buyer guarantee.' },
                { step: '04', title: 'Begin Your Story', desc: 'Wear it, love it, and pass it on again someday. The story continues.' },
              ].map(({ step, title, desc }, i, arr) => (
                <Reveal key={step} delay={i * 100}>
                  <div style={{
                    padding: '40px 32px',
                    borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    height: '100%',
                    boxSizing: 'border-box',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '64px',
                      fontWeight: 700,
                      color: 'var(--light-grey)',
                      lineHeight: 1,
                      marginBottom: '20px',
                      letterSpacing: '-0.02em',
                    }}>{step}</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 500, marginBottom: '12px' }}>{title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--warm-grey)', lineHeight: 1.75 }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Designer Directory ─────────────────────────────────────────── */}
        <section style={{ padding: '80px clamp(20px, 4vw, 48px)', maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>Browse by House</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 300 }}>
                Top Designers
              </h2>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {DESIGNERS.map(d => (
                <Link
                  key={d}
                  href={`/marketplace?designer=${encodeURIComponent(d)}`}
                  className="designer-pill"
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--fg)',
                    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                    letterSpacing: '0.03em',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'var(--crimson)'
                    el.style.color = 'var(--crimson)'
                    el.style.background = 'rgba(139,26,26,0.04)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'var(--border)'
                    el.style.color = 'var(--fg)'
                    el.style.background = 'transparent'
                  }}
                >
                  {d}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── Shop by Occasion ──────────────────────────────────────────── */}
        <section style={{
          background: 'var(--cream)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '96px clamp(20px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>Curated For Every Moment</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300 }}>
                  Shop by Occasion
                </h2>
              </div>
            </Reveal>

            <div className="occasion-grid">
              {[
                { label: 'Bridal', slug: 'bridal', colour: '#8b1a1a', emoji: '♛', sub: 'The main day' },
                { label: 'Reception', slug: 'reception', colour: '#1d4e89', emoji: '✦', sub: 'Evening elegance' },
                { label: 'Sangeet', slug: 'sangeet', colour: '#6b2d8b', emoji: '♪', sub: 'Dance & joy' },
                { label: 'Mehendi', slug: 'mehendi', colour: '#2d6a4f', emoji: '✿', sub: 'Garden fresh' },
                { label: 'Festive', slug: 'festive', colour: '#b5820a', emoji: '◈', sub: 'Celebrations' },
                { label: 'Party', slug: 'party', colour: '#0d7377', emoji: '◉', sub: 'All occasions' },
              ].map(({ label, slug, colour, emoji, sub }, i) => (
                <Reveal key={slug} delay={i * 70}>
                  <Link href={`/marketplace?occasion=${slug}`} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '36px 16px',
                    background: `${colour}0c`,
                    border: `1px solid ${colour}28`,
                    borderRadius: 'var(--radius-xl)',
                    gap: '10px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    textDecoration: 'none',
                    height: '100%',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = 'var(--shadow-md)'
                    el.style.borderColor = `${colour}55`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                    el.style.borderColor = `${colour}28`
                  }}>
                    <span style={{ fontSize: '32px', color: colour, lineHeight: 1 }}>{emoji}</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600, color: 'var(--fg)' }}>{label}</span>
                    <span style={{ fontSize: '11px', color: 'var(--warm-grey)', letterSpacing: '0.06em' }}>{sub}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Pre-Loved ─────────────────────────────────────────────── */}
        <section style={{ background: 'var(--charcoal)', padding: '96px clamp(20px, 4vw, 48px)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>Our Philosophy</p>
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 300,
                  color: '#fff',
                  lineHeight: 1.15,
                }}>
                  Why Choose Pre-Loved?
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.45)',
                  marginTop: '20px',
                  maxWidth: '520px',
                  margin: '20px auto 0',
                  lineHeight: 1.8,
                }}>
                  A bridal lehenga worn once can find a second life instead of a wardrobe.
                  Better for your budget. Better for the planet. Better for the craft.
                </p>
              </div>
            </Reveal>

            <div className="impact-grid">
              {[
                { stat: '40–60%', countTo: null,  countPrefix: '',  countSuffix: '',       label: 'Below Retail Price', desc: 'Own a designer masterpiece at a fraction of its original cost — without compromising on beauty.', icon: '₹' },
                { stat: '600 hrs', countTo: 600,  countPrefix: '',  countSuffix: ' hrs',   label: 'Of Artisan Craft',   desc: 'Each lehenga carries hundreds of hours of hand embroidery, zardozi, and skilled artistry meant to last lifetimes.', icon: '✦' },
                { stat: '1 tonne', countTo: 1,    countPrefix: '',  countSuffix: ' tonne', label: 'CO₂ Avoided',        desc: 'Choosing a pre-loved lehenga sidesteps the full environmental cost of producing a new one from scratch.', icon: '♻' },
              ].map(({ stat, countTo, countPrefix, countSuffix, label, desc, icon }, i) => (
                <Reveal key={stat} delay={i * 130}>
                  <div style={{
                    textAlign: 'center',
                    padding: '0 32px',
                    borderRight: stat !== '1 tonne' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    height: '100%',
                    boxSizing: 'border-box',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '36px',
                      color: 'var(--gold)',
                      marginBottom: '16px',
                      lineHeight: 1,
                    }}>{icon}</div>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(38px, 4.5vw, 56px)',
                      fontWeight: 300,
                      color: '#fff',
                      lineHeight: 1,
                      marginBottom: '12px',
                    }}>
                      {countTo !== null
                        ? <CountUp to={countTo} prefix={countPrefix} suffix={countSuffix} duration={2200} />
                        : stat}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginBottom: '16px',
                    }}>{label}</div>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.8,
                      maxWidth: '240px',
                      margin: '0 auto',
                    }}>{desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Sell CTA ──────────────────────────────────────────────────── */}
        <section style={{ padding: '96px clamp(20px, 4vw, 48px)' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2d1010 0%, #6b1414 40%, var(--crimson) 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(48px, 8vw, 88px) clamp(32px, 6vw, 80px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <span style={{
              position: 'absolute',
              right: 'clamp(32px, 8vw, 120px)',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(160px, 24vw, 320px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.04)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}>♡</span>

            <Reveal>
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '20px' }}>For Sellers</p>
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(36px, 5vw, 68px)',
                  fontWeight: 300,
                  color: '#fff',
                  marginBottom: '20px',
                  lineHeight: 1.1,
                }}>
                  Your Lehenga Deserves<br />
                  <em>A Second Chapter</em>
                </h2>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px', lineHeight: 1.75, maxWidth: '480px' }}>
                  List your pre-loved lehenga in 10 minutes. Share your story, set your price,
                  and let another bride fall in love with it.
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/sell" style={{
                    background: '#fff',
                    color: 'var(--crimson)',
                    padding: '16px 44px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}>
                    Start Selling
                  </Link>
                  <Link href="/how-it-works" style={{
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.8)',
                    padding: '16px 44px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}>
                    Learn More
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Newsletter ──────────────────────────────────────────────────── */}
        <section style={{
          background: 'var(--cream)',
          borderTop: '1px solid var(--border)',
          padding: '80px clamp(20px, 4vw, 48px)',
        }}>
          <Reveal>
            <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>Stay in the Loop</p>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                marginBottom: '14px',
                lineHeight: 1.2,
              }}>
                New Listings, First.
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--warm-grey)', lineHeight: 1.75, marginBottom: '40px' }}>
                Join 4,000+ brides who get notified the moment new designer lehengas are listed.
                No spam, unsubscribe anytime.
              </p>
              <form
                style={{ display: 'flex', gap: '10px', maxWidth: '420px', margin: '0 auto', flexWrap: 'wrap' }}
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '14px 22px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border)',
                    fontSize: '14px',
                    background: '#fff',
                    color: 'var(--fg)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--crimson)',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Notify Me
                </button>
              </form>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
        }
        .how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .occasion-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }
        .brides-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .how-grid { grid-template-columns: repeat(2, 1fr); }
          .how-grid > div:nth-child(2) { border-right: none; }
          .occasion-grid { grid-template-columns: repeat(3, 1fr); }
          .brides-grid { grid-template-columns: repeat(2, 1fr); }
          .impact-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .brides-grid { grid-template-columns: 1fr; }
          .impact-grid { grid-template-columns: 1fr; gap: 40px; }
          .impact-grid > div { border-right: none !important; }
        }
        @media (max-width: 560px) {
          .how-grid { grid-template-columns: 1fr; }
          .how-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); }
          .occasion-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  )
}

/* ─── Scroll reveal ──────────────────────────────────────────────────────── */

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: `opacity 0.72s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.72s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Animated stat counter ─────────────────────────────────────────────── */

function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el) } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, to, duration])

  const formatted = to >= 1000 ? value.toLocaleString('en-IN') : String(value)

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

/* ─── Hero garment illustration ─────────────────────────────────────────── */
function HeroGarment({ colour }: { colour: string }) {
  return (
    <svg width="160" height="210" viewBox="0 0 160 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.75 }}>
      <path d="M52 38 Q80 24 108 38 L114 76 Q80 64 46 76 Z" fill={colour} opacity="0.85"/>
      <path d="M68 38 Q80 30 92 38" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
      <path d="M52 38 L28 62 L36 72 L54 52" fill={colour} opacity="0.6"/>
      <path d="M108 38 L132 62 L124 72 L106 52" fill={colour} opacity="0.6"/>
      <path d="M108 38 Q132 52 128 104" stroke={colour} strokeWidth="4" fill="none" opacity="0.4" strokeDasharray="6 5"/>
      <path d="M42 78 Q80 66 118 78 L122 92 Q80 82 38 92 Z" fill={colour} opacity="0.95"/>
      <path d="M38 92 Q80 82 122 92 L138 200 Q80 214 22 200 Z" fill={colour} opacity="0.88"/>
      <path d="M30 130 Q80 118 130 130" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none"/>
      <path d="M25 158 Q80 146 135 158" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      <path d="M22 184 Q80 172 138 184" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
      {[0,1,2,3,4,5].map(i => (
        <circle key={`e1-${i}`} cx={44 + i * 14} cy={106} r="2.5" fill="rgba(196,149,42,0.9)"/>
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <circle key={`e2-${i}`} cx={36 + i * 14} cy={142} r="2" fill="rgba(196,149,42,0.7)"/>
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <circle key={`e3-${i}`} cx={28 + i * 13} cy={172} r="1.5" fill="rgba(196,149,42,0.5)"/>
      ))}
      {[0,1,2].map(i => (
        <circle key={`b-${i}`} cx={62 + i * 18} cy={58} r="2" fill="rgba(196,149,42,0.8)"/>
      ))}
    </svg>
  )
}
