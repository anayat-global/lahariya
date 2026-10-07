import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_LISTINGS, MOCK_SELLERS } from '@/lib/mock-data'
import { fmt, conditionLabel, timeAgo } from '@/lib/utils'
import { Package, MessageSquare, Heart, BarChart2, Plus, Eye } from 'lucide-react'

export default function DashboardPage() {
  const seller = MOCK_SELLERS[0]
  const myListings = MOCK_LISTINGS.filter(l => l.seller_id === seller.id)

  const totalEarnings = 0
  const activeListings = myListings.filter(l => l.status === 'active').length
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0)
  const totalSaves = myListings.reduce((sum, l) => sum + l.saves, 0)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px 80px' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600,
              }}>
                {seller.full_name[0]}
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 500 }}>
                  Hello, {seller.full_name.split(' ')[0]}
                </h1>
                <p style={{ color: 'var(--warm-grey)', fontSize: '14px' }}>{seller.location}</p>
              </div>
            </div>
            <Link href="/sell" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'var(--crimson)', color: '#fff',
              padding: '12px 24px', borderRadius: 'var(--radius-full)',
              fontSize: '14px', fontWeight: 600,
            }}>
              <Plus size={16} /> New Listing
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {[
              { icon: <Package size={20} />, label: 'Active Listings', value: activeListings, color: 'var(--crimson)' },
              { icon: <BarChart2 size={20} />, label: 'Total Views', value: totalViews.toLocaleString('en-IN'), color: 'var(--gold)' },
              { icon: <Heart size={20} />, label: 'Total Saves', value: totalSaves, color: '#6b2d8b' },
              { icon: <MessageSquare size={20} />, label: 'Messages', value: 3, color: '#1d4e89' },
            ].map(({ icon, label, value, color }) => (
              <div key={label} style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 600, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--warm-grey)', marginTop: '4px' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
            {[
              { href: '/account/dashboard', label: 'My Listings' },
              { href: '/account/orders', label: 'Orders' },
              { href: '/account/messages', label: 'Messages' },
              { href: '/account/wishlist', label: 'Wishlist' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 500,
                color: href === '/account/dashboard' ? 'var(--crimson)' : 'var(--warm-grey)',
                borderBottom: href === '/account/dashboard' ? '2px solid var(--crimson)' : '2px solid transparent',
                marginBottom: '-1px',
              }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Listings Table */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {myListings.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: 'var(--warm-grey)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '8px' }}>No listings yet</p>
                <p style={{ fontSize: '14px', marginBottom: '24px' }}>Create your first listing to start selling</p>
                <Link href="/sell" style={{
                  background: 'var(--crimson)', color: '#fff',
                  padding: '12px 32px', borderRadius: 'var(--radius-full)', fontSize: '14px', fontWeight: 600,
                }}>Create Listing</Link>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--border)' }}>
                    {['Listing', 'Condition', 'Price', 'Views', 'Saves', 'Status', ''].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px', textAlign: 'left',
                        fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'var(--warm-grey)', fontWeight: 600,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myListings.map((listing, i) => (
                    <tr key={listing.id} style={{
                      borderBottom: i < myListings.length - 1 ? '1px solid var(--border)' : 'none',
                    }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px', height: '52px', borderRadius: 'var(--radius-sm)',
                            background: `${listing.colour_hex}22`,
                            flexShrink: 0,
                          }} />
                          <div>
                            <div style={{ fontWeight: 600, marginBottom: '2px', lineHeight: 1.3 }}>
                              {listing.title.split(' — ')[0]}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--gold)' }}>{listing.designer}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--warm-grey)' }}>
                        {conditionLabel(listing.condition)}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 600 }}>{fmt(listing.asking_price)}</div>
                        <div style={{ fontSize: '11px', color: 'var(--warm-grey)', textDecoration: 'line-through' }}>{fmt(listing.original_retail_price)}</div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--warm-grey)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={14} /> {listing.views}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--warm-grey)' }}>{listing.saves}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          background: listing.status === 'active' ? '#e8f5e9' : '#f5f5f5',
                          color: listing.status === 'active' ? '#2d6a4f' : '#666',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '12px',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}>
                          {listing.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Link href={`/listings/${listing.slug}`} style={{
                          color: 'var(--crimson)', fontSize: '13px', fontWeight: 500,
                        }}>View →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
