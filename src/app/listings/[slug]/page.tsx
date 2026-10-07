import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Heart, MessageSquare, Share2, ChevronDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_LISTINGS } from '@/lib/mock-data'
import { fmt, conditionLabel, timeAgo } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = MOCK_LISTINGS.find(l => l.slug === slug)
  if (!listing) return { title: 'Listing Not Found' }
  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
  }
}

export async function generateStaticParams() {
  return MOCK_LISTINGS.map(l => ({ slug: l.slug }))
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params
  const listing = MOCK_LISTINGS.find(l => l.slug === slug)
  if (!listing) notFound()

  const { seller } = listing

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: 'var(--warm-grey)', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/marketplace">Shop</Link>
          <span>›</span>
          <Link href={`/marketplace?occasion=${listing.occasion}`} style={{ textTransform: 'capitalize' }}>{listing.occasion}</Link>
          <span>›</span>
          <span style={{ color: 'var(--fg)' }}>{listing.designer}</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }} className="listing-grid">

          {/* Gallery Column */}
          <div style={{ position: 'sticky', top: '88px' }}>
            {/* Main Visual */}
            <div style={{
              aspectRatio: '3/4',
              background: `linear-gradient(135deg, ${listing.colour_hex}22, ${listing.colour_hex}55)`,
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* CSS Garment */}
              <svg width="200" height="280" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.75 }}>
                <path d="M40 30 Q60 20 80 30 L85 60 Q60 50 35 60 Z" fill={listing.colour_hex} opacity="0.9"/>
                <path d="M80 30 Q100 40 95 80" stroke={listing.colour_hex} strokeWidth="3" fill="none" opacity="0.5" strokeDasharray="4 4"/>
                <path d="M30 62 Q60 52 90 62 L105 155 Q60 165 15 155 Z" fill={listing.colour_hex} opacity="0.95"/>
                <path d="M22 100 Q60 90 98 100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                <path d="M17 125 Q60 115 103 125" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                {[0,1,2,3,4].map(i => (
                  <circle key={i} cx={35 + i * 12} cy={82} r="2" fill="rgba(196,149,42,0.9)"/>
                ))}
              </svg>

              {/* Condition Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: '#fff',
                color: 'var(--charcoal)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
              }}>
                {conditionLabel(listing.condition)}
              </div>
            </div>

            {/* See Her Wear It Tabs */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}>
              <div style={{
                background: 'var(--ivory)',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '4px' }}>
                  See Her Wear It
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>
                  Photos from {seller?.full_name}&apos;s wedding day
                </p>
              </div>
              <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {listing.wedding_photos.map((photo, i) => (
                  <div key={i} style={{
                    aspectRatio: '4/5',
                    background: `${listing.colour_hex}22`,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'var(--warm-grey)',
                    flexDirection: 'column',
                    gap: '8px',
                    border: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '28px' }}>♡</span>
                    <span>{photo.caption}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div>
            {/* Designer + Authentication */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}>
                {listing.designer}
              </span>
              {listing.authenticity_verified && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#e8f5e9',
                  color: '#2d6a4f',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                }}>
                  <CheckCircle size={12} /> Verified Authentic
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              lineHeight: 1.2,
              marginBottom: '16px',
            }}>
              {listing.title}
            </h1>

            {/* Pricing */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 600 }}>
                {fmt(listing.asking_price)}
              </span>
              <span style={{ fontSize: '18px', color: 'var(--warm-grey)', textDecoration: 'line-through' }}>
                {fmt(listing.original_retail_price)}
              </span>
              <span style={{
                background: 'var(--crimson)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
              }}>
                -{listing.discount_percent}% off retail
              </span>
            </div>

            {/* Spec Tiles */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '28px',
            }}>
              {[
                { label: 'Fabric', value: listing.fabric },
                { label: 'Work', value: listing.work },
                { label: 'Size', value: listing.size_label },
                { label: 'Colour', value: listing.colour },
                { label: 'Occasion', value: listing.occasion },
                { label: 'Listed', value: timeAgo(listing.created_at) },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: 'var(--ivory)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--warm-grey)', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <Link href="/checkout" style={{
                display: 'block',
                background: 'var(--crimson)',
                color: '#fff',
                padding: '18px',
                borderRadius: 'var(--radius-full)',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}>
                Buy Now — {fmt(listing.asking_price)}
              </Link>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>
                  <Heart size={16} /> Save
                </button>
                <Link href={`/messages?listing=${listing.id}`} style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}>
                  <MessageSquare size={16} /> Ask Seller
                </Link>
              </div>
            </div>

            {/* THE CORE FEATURE: One Lehenga. Two Stories. */}
            <div style={{
              background: 'linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              color: '#fff',
              marginBottom: '24px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}>
                <div style={{
                  width: '2px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                }} />
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--gold)', marginBottom: '2px' }}>SIGNATURE FEATURE</p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 500 }}>
                    One Lehenga. Two Stories.
                  </h2>
                </div>
              </div>

              {/* First Story */}
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    {seller?.full_name[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{seller?.full_name}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                      {listing.seller_story.wedding_venue} · {listing.seller_story.wedding_location}
                    </p>
                  </div>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  marginBottom: '10px',
                  lineHeight: 1.4,
                }}>
                  &ldquo;{listing.seller_story.title}&rdquo;
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                  {listing.seller_story.body.slice(0, 280)}…
                </p>
              </div>

              {/* Second Story — Your Story */}
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                textAlign: 'center',
                border: '1px dashed rgba(255,255,255,0.25)',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '20px',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  ?
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', marginBottom: '6px', fontStyle: 'italic' }}>
                  Your Story, Waiting to Begin
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  When you purchase this lehenga, you&apos;ll be invited to write the second chapter of its story.
                </p>
              </div>
            </div>

            {/* Measurements */}
            <details style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '12px',
            }}>
              <summary style={{
                padding: '16px 20px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 500,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                listStyle: 'none',
                background: 'var(--ivory)',
              }}>
                Measurements <ChevronDown size={16} />
              </summary>
              <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {Object.entries(listing.measurements).map(([key, val]) => (
                  <div key={key} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--warm-grey)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>{val}&quot;</div>
                  </div>
                ))}
              </div>
            </details>

            {/* Seller Card */}
            {seller && (
              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--ivory)',
                flexWrap: 'wrap',
                gap: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--crimson)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 600,
                  }}>
                    {seller.full_name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '2px' }}>{seller.full_name}</p>
                    <p style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>
                      ★ {seller.rating} · {seller.review_count} reviews · {seller.total_sales} sold
                    </p>
                  </div>
                </div>
                <Link href={`/sellers/${seller.id}`} style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 500,
                }}>
                  View Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .listing-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  )
}
