import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--charcoal)',
      color: 'rgba(255,255,255,0.7)',
      padding: '64px 32px 32px',
      marginTop: '80px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'var(--gold)',
              marginBottom: '16px',
            }}>
              LAHARIYA
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.7, maxWidth: '240px' }}>
              A marketplace where pre-loved Indian bridal fashion finds its next story.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              {[
                { href: '/marketplace', label: 'All Listings' },
                { href: '/marketplace?occasion=bridal', label: 'Bridal' },
                { href: '/marketplace?occasion=festive', label: 'Festive' },
                { href: '/marketplace?occasion=sangeet', label: 'Sangeet' },
                { href: '/marketplace?sort=newest', label: 'New Arrivals' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Sell */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>Sell</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              {[
                { href: '/sell', label: 'List Your Lehenga' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/how-it-works#authentication', label: 'Authentication' },
                { href: '/account/dashboard', label: 'Seller Dashboard' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              {[
                { href: '/real-brides', label: 'Real Brides' },
                { href: '/about', label: 'About Us' },
                { href: '/sustainability', label: 'Sustainability' },
                { href: '/careers', label: 'Careers' },
                { href: '/press', label: 'Press' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
        }}>
          <p>© 2026 LAHARIYA. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy</Link>
            <Link href="/terms" style={{ color: 'rgba(255,255,255,0.5)' }}>Terms</Link>
            <Link href="/faq" style={{ color: 'rgba(255,255,255,0.5)' }}>FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
