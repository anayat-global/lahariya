'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, Heart, User } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll when drawer or search open
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, searchOpen])

  // ESC closes search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    if (searchOpen) {
      window.addEventListener('keydown', onKey)
      setTimeout(() => inputRef.current?.focus(), 80)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  const suggestions = ['Sabyasachi', 'Bridal Lehenga', 'Worn Once', 'Under ₹1,00,000', 'Ivory & Silver', 'Sangeet']

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(250,247,242,0.88)' : 'var(--cream)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(28,28,28,0.07)' : '0 1px 0 var(--border)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}>

        {/* Announcement bar */}
        <div style={{
          background: 'var(--charcoal)',
          color: 'var(--gold)',
          textAlign: 'center',
          padding: '9px 16px',
          fontSize: '11px',
          letterSpacing: '0.16em',
          fontWeight: 600,
          textTransform: 'uppercase',
          overflow: 'hidden',
          maxHeight: scrolled ? '0' : '40px',
          opacity: scrolled ? 0 : 1,
          transition: 'max-height 0.35s ease, opacity 0.25s ease',
        }}>
          Free authentication on all listings above ₹50,000
          <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 10px' }}>·</span>
          <Link href="/how-it-works" style={{
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(255,255,255,0.3)',
            fontWeight: 400,
            textTransform: 'none',
            letterSpacing: '0',
            fontSize: '11px',
          }}>
            Learn how it works
          </Link>
        </div>

        {/* Main nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 48px)',
          height: '68px',
          maxWidth: '1400px',
          margin: '0 auto',
          gap: '24px',
        }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '21px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: 'var(--crimson)',
            flexShrink: 0,
          }}>
            LAHARIYA
          </Link>

          <div className="desktop-nav" style={{
            display: 'flex',
            gap: '36px',
            fontSize: '13px',
            letterSpacing: '0.05em',
            fontWeight: 500,
          }}>
            {[
              { href: '/marketplace', label: 'Shop' },
              { href: '/marketplace?occasion=bridal', label: 'Bridal' },
              { href: '/marketplace?occasion=festive', label: 'Festive' },
              { href: '/real-brides', label: 'Real Brides' },
              { href: '/how-it-works', label: 'How It Works' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="nav-link">{label}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Search — opens overlay instead of navigating */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="icon-btn desktop-nav"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Search size={17} strokeWidth={1.75} />
            </button>

            {[
              { href: '/account/wishlist', icon: <Heart size={17} strokeWidth={1.75} />, label: 'Wishlist' },
              { href: '/account/dashboard', icon: <User size={17} strokeWidth={1.75} />, label: 'Account' },
            ].map(({ href, icon, label }) => (
              <Link key={href} href={href} aria-label={label} className="icon-btn desktop-nav">
                {icon}
              </Link>
            ))}

            <div className="desktop-nav" style={{
              width: '1px', height: '18px',
              background: 'var(--border)', margin: '0 10px',
            }} />

            <Link href="/sell" className="sell-btn desktop-nav">
              Sell Your Lehenga
            </Link>

            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(v => !v)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--fg)',
                padding: '8px',
                marginLeft: '4px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Search Overlay ─────────────────────────────────────────────── */}
      {searchOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSearchOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(20,10,10,0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Search panel slides down from top */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 201,
            background: 'var(--cream)',
            padding: '28px clamp(20px, 6vw, 80px) 36px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
            animation: 'searchSlideDown 0.28s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Panel header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px',
            }}>
              <Link
                href="/"
                onClick={() => setSearchOpen(false)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: 'var(--crimson)',
                }}
              >
                LAHARIYA
              </Link>
              <button
                onClick={() => setSearchOpen(false)}
                style={{
                  background: 'var(--ivory)',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--warm-grey)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Input */}
            <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
              <Search
                size={20}
                strokeWidth={1.75}
                style={{
                  position: 'absolute',
                  left: '22px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--warm-grey)',
                  pointerEvents: 'none',
                }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search designers, occasions, styles…"
                style={{
                  width: '100%',
                  padding: '18px 22px 18px 56px',
                  fontSize: '18px',
                  background: 'var(--ivory)',
                  border: '2px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--fg)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--crimson)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
            </div>

            {/* Quick suggestions */}
            <div style={{
              maxWidth: '720px',
              margin: '20px auto 0',
            }}>
              <p style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                fontWeight: 600,
                color: 'var(--warm-grey)',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Popular searches
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); inputRef.current?.focus() }}
                    style={{
                      padding: '8px 18px',
                      border: '1.5px solid var(--border)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--fg)',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--crimson)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--crimson)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile backdrop */}
      <div
        className={`mobile-backdrop ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '28px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '12px',
        }}>
          <Link href="/" onClick={() => setMobileOpen(false)} style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--crimson)',
          }}>
            LAHARIYA
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'var(--ivory)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--warm-grey)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Mobile search bar */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search size={15} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--warm-grey)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search…"
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border)',
              fontSize: '14px',
              background: 'var(--ivory)',
              color: 'var(--fg)',
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {[
            { href: '/marketplace', label: 'Shop All' },
            { href: '/marketplace?occasion=bridal', label: 'Bridal' },
            { href: '/marketplace?occasion=sangeet', label: 'Sangeet' },
            { href: '/marketplace?occasion=festive', label: 'Festive' },
            { href: '/real-brides', label: 'Real Brides' },
            { href: '/how-it-works', label: 'How It Works' },
            { href: '/account/dashboard', label: 'My Account' },
            { href: '/account/wishlist', label: 'Wishlist' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                fontWeight: 400,
                color: 'var(--fg)',
                padding: '16px 0',
                borderBottom: '1px solid var(--border)',
                lineHeight: 1,
                transition: 'color 0.15s',
              }}
              className="drawer-link"
            >
              {label}
            </Link>
          ))}
        </div>

        <div style={{ paddingTop: '28px' }}>
          <Link href="/sell" onClick={() => setMobileOpen(false)} style={{
            display: 'block',
            background: 'var(--crimson)',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: 'var(--radius-full)',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: '20px',
          }}>
            Sell Your Lehenga
          </Link>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {[
              { href: '/account/wishlist', icon: <Heart size={16} />, label: 'Wishlist' },
              { href: '/account/dashboard', icon: <User size={16} />, label: 'Account' },
            ].map(({ href, icon, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--warm-grey)',
                fontSize: '10px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 24px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--ivory)',
              }}>
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }

        .nav-link {
          position: relative;
          color: var(--warm-grey);
          transition: color 0.2s;
          padding-bottom: 3px;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--crimson);
          transition: width 0.24s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-link:hover::after { width: 100%; }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: var(--warm-grey);
          transition: background 0.18s, color 0.18s;
          flex-shrink: 0;
        }
        .icon-btn:hover {
          background: var(--ivory);
          color: var(--fg);
        }

        .sell-btn {
          display: inline-flex;
          align-items: center;
          background: var(--crimson);
          color: #fff !important;
          padding: 9px 22px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.15s;
        }
        .sell-btn:hover {
          background: var(--crimson-lt);
          transform: translateY(-1px);
        }

        .mobile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 149;
          background: rgba(28,28,28,0.45);
          backdrop-filter: blur(3px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .mobile-backdrop.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(360px, 100vw);
          background: var(--bg);
          z-index: 150;
          padding: 24px 28px 36px;
          display: flex;
          flex-direction: column;
          transform: translateX(105%);
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -12px 0 40px rgba(0,0,0,0.14);
          overflow-y: auto;
        }
        .mobile-drawer.open {
          transform: translateX(0);
        }

        .drawer-link:hover { color: var(--crimson) !important; }

        @keyframes searchSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
      `}</style>
    </>
  )
}
