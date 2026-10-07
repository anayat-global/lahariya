'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, CheckCircle, ShoppingBag } from 'lucide-react'
import type { Listing } from '@/types'
import { fmt, conditionLabel, discount } from '@/lib/utils'

interface Props {
  listing: Listing
  onSave?: (id: string) => void
  saved?: boolean
}

export default function ListingCard({ listing, onSave, saved }: Props) {
  const disc = listing.discount_percent ?? discount(listing.original_retail_price, listing.asking_price)
  const [hovered, setHovered] = useState(false)

  // Use real listing image if available, fall back to picsum keyed on listing id
  const photoUrl = listing.images?.[0] || `https://picsum.photos/seed/${listing.id}/400/533`

  return (
    <div
      style={{
        background: 'var(--bg)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div style={{ position: 'relative' }}>
        <Link href={`/listings/${listing.slug}`}>
          <div style={{
            aspectRatio: '3/4',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${listing.colour_hex}22 0%, ${listing.colour_hex}44 100%)`,
          }}>
            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt={listing.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />

            {/* Condition + Verified badges */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <span style={{
                background: 'rgba(255,255,255,0.95)',
                color: 'var(--charcoal)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
              }}>
                {conditionLabel(listing.condition)}
              </span>
              {listing.authenticity_verified && (
                <span style={{
                  background: '#2d6a4f',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <CheckCircle size={10} /> Verified
                </span>
              )}
            </div>

            {/* Discount badge */}
            {disc > 0 && (
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'var(--crimson)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: 'var(--radius-full)',
              }}>
                -{disc}%
              </span>
            )}

            {/* Add to Cart — pill with spacing, slides up from bottom */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                background: 'rgba(20,10,10,0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 'var(--radius-full)',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transform: hovered ? 'translateY(0)' : 'translateY(calc(100% + 12px))',
                transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <ShoppingBag size={15} color="#fff" strokeWidth={1.75} />
              <span style={{
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}>
                Add to Cart
              </span>
            </div>
          </div>
        </Link>

        {/* Save / Wishlist */}
        <button
          onClick={() => onSave?.(listing.id)}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            transition: 'opacity 0.2s',
            opacity: hovered ? 0 : 1,
            zIndex: 2,
          }}
        >
          <Heart
            size={15}
            fill={saved ? 'var(--crimson)' : 'none'}
            stroke={saved ? 'var(--crimson)' : 'var(--warm-grey)'}
          />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '4px',
        }}>
          {listing.designer}
        </p>

        <Link href={`/listings/${listing.slug}`}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--fg)',
            marginBottom: '4px',
            lineHeight: 1.3,
          }}>
            {listing.title.replace(`— ${listing.designer}`, '').trim()}
          </h3>
        </Link>

        {listing.seller && (
          <p style={{ fontSize: '12px', color: 'var(--warm-grey)', marginBottom: '12px' }}>
            by {listing.seller.full_name} · {listing.seller.location?.split(',')[0]}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--fg)',
          }}>
            {fmt(listing.asking_price)}
          </span>
          <span style={{
            fontSize: '13px',
            color: 'var(--warm-grey)',
            textDecoration: 'line-through',
          }}>
            {fmt(listing.original_retail_price)}
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '10px',
          flexWrap: 'wrap',
        }}>
          {[listing.fabric, listing.size_label && `Size ${listing.size_label}`].filter(Boolean).map((tag) => (
            <span key={tag} style={{
              background: 'var(--ivory)',
              color: 'var(--warm-grey)',
              fontSize: '11px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
