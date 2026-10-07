'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/marketplace/ListingCard'
import { MOCK_LISTINGS, DESIGNERS, FABRICS } from '@/lib/mock-data'
import type { MarketplaceFilters, OccasionType, ListingCondition } from '@/types'

const OCCASIONS: { label: string; value: OccasionType }[] = [
  { label: 'Bridal', value: 'bridal' },
  { label: 'Reception', value: 'reception' },
  { label: 'Sangeet', value: 'sangeet' },
  { label: 'Mehendi', value: 'mehendi' },
  { label: 'Festive', value: 'festive' },
  { label: 'Party', value: 'party' },
]

const CONDITIONS: { label: string; value: ListingCondition }[] = [
  { label: 'Like New', value: 'like-new' },
  { label: 'Worn Once', value: 'worn-once' },
  { label: 'Worn Twice', value: 'twice-worn' },
  { label: 'Altered', value: 'altered' },
]

export default function MarketplacePage() {
  const [filters, setFilters] = useState<MarketplaceFilters>({ sort: 'newest' })
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [filterOpen, setFilterOpen] = useState(false)

  const listings = useMemo(() => {
    let result = [...MOCK_LISTINGS]

    if (filters.occasion?.length) {
      result = result.filter(l => filters.occasion!.includes(l.occasion))
    }
    if (filters.condition?.length) {
      result = result.filter(l => filters.condition!.includes(l.condition))
    }
    if (filters.designer?.length) {
      result = result.filter(l => filters.designer!.includes(l.designer))
    }
    if (filters.price_min != null) {
      result = result.filter(l => l.asking_price >= filters.price_min!)
    }
    if (filters.price_max != null) {
      result = result.filter(l => l.asking_price <= filters.price_max!)
    }

    if (filters.sort === 'price-asc') result.sort((a, b) => a.asking_price - b.asking_price)
    else if (filters.sort === 'price-desc') result.sort((a, b) => b.asking_price - a.asking_price)
    else if (filters.sort === 'popular') result.sort((a, b) => b.saves - a.saves)
    else if (filters.sort === 'discount') result.sort((a, b) => (b.discount_percent ?? 0) - (a.discount_percent ?? 0))
    else result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return result
  }, [filters])

  function toggleOccasion(v: OccasionType) {
    setFilters(f => {
      const cur = f.occasion ?? []
      return { ...f, occasion: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] }
    })
  }

  function toggleCondition(v: ListingCondition) {
    setFilters(f => {
      const cur = f.condition ?? []
      return { ...f, condition: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] }
    })
  }

  function toggleDesigner(v: string) {
    setFilters(f => {
      const cur = f.designer ?? []
      return { ...f, designer: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] }
    })
  }

  const activeFilterCount = [
    filters.occasion?.length ?? 0,
    filters.condition?.length ?? 0,
    filters.designer?.length ?? 0,
    filters.price_min ? 1 : 0,
    filters.price_max ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        {/* Header */}
        <div style={{
          background: 'var(--ivory)',
          borderBottom: '1px solid var(--border)',
          padding: '32px 32px 24px',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400,
              marginBottom: '8px',
            }}>
              Browse Listings
            </h1>
            <p style={{ color: 'var(--warm-grey)', fontSize: '15px' }}>
              {listings.length} pre-loved lehengas · Find your next chapter
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 32px' }}>
          {/* Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: activeFilterCount > 0 ? 'var(--crimson)' : 'var(--bg)',
                color: activeFilterCount > 0 ? '#fff' : 'var(--fg)',
                border: '1px solid var(--border)',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={15} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>Sort:</span>
              <select
                value={filters.sort}
                onChange={e => setFilters(f => ({ ...f, sort: e.target.value as MarketplaceFilters['sort'] }))}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  fontSize: '14px',
                  color: 'var(--fg)',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Saved</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div style={{
              background: 'var(--ivory)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              marginBottom: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}>
              {/* Occasion */}
              <div>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: '12px' }}>Occasion</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {OCCASIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => toggleOccasion(value)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)',
                        background: filters.occasion?.includes(value) ? 'var(--crimson)' : 'var(--bg)',
                        color: filters.occasion?.includes(value) ? '#fff' : 'var(--fg)',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: '12px' }}>Condition</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CONDITIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => toggleCondition(value)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)',
                        background: filters.condition?.includes(value) ? 'var(--crimson)' : 'var(--bg)',
                        color: filters.condition?.includes(value) ? '#fff' : 'var(--fg)',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Designer */}
              <div>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: '12px' }}>Designer</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {DESIGNERS.slice(0, 8).map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDesigner(d)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)',
                        background: filters.designer?.includes(d) ? 'var(--crimson)' : 'var(--bg)',
                        color: filters.designer?.includes(d) ? '#fff' : 'var(--fg)',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: '12px' }}>Price Range</h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={filters.price_min ?? ''}
                    onChange={e => setFilters(f => ({ ...f, price_min: e.target.value ? +e.target.value : undefined }))}
                    style={{
                      width: '100px',
                      padding: '8px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)',
                      color: 'var(--fg)',
                      fontSize: '13px',
                    }}
                  />
                  <span style={{ color: 'var(--warm-grey)' }}>–</span>
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={filters.price_max ?? ''}
                    onChange={e => setFilters(f => ({ ...f, price_max: e.target.value ? +e.target.value : undefined }))}
                    style={{
                      width: '100px',
                      padding: '8px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)',
                      color: 'var(--fg)',
                      fontSize: '13px',
                    }}
                  />
                </div>
              </div>

              {/* Clear */}
              {activeFilterCount > 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    onClick={() => setFilters({ sort: 'newest' })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--crimson)',
                      background: 'none',
                      border: 'none',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    <X size={14} /> Clear All
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Listings Grid */}
          {listings.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '28px',
            }}>
              {listings.map(listing => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  saved={saved.has(listing.id)}
                  onSave={id => setSaved(s => {
                    const next = new Set(s)
                    next.has(id) ? next.delete(id) : next.add(id)
                    return next
                  })}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-grey)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '8px' }}>No listings match your filters</p>
              <p style={{ fontSize: '15px' }}>Try adjusting your filters or <button onClick={() => setFilters({ sort: 'newest' })} style={{ color: 'var(--crimson)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>clear all</button></p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
