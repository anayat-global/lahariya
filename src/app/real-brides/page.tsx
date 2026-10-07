import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_BRIDE_STORIES, MOCK_LISTINGS } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Real Brides' }

export default function RealBridesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #2d1810 0%, #5a2d0c 100%)',
          padding: '80px 32px',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <span style={{
            position: 'absolute',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.03)',
            userSelect: 'none',
            letterSpacing: '0.1em',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
          }}>
            BRIDES
          </span>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '16px', fontWeight: 600, position: 'relative' }}>
            COMMUNITY
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 300, marginBottom: '20px', position: 'relative' }}>
            Real Brides
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
            Weddings, stories, and the lehengas that made those moments unforgettable.
          </p>
        </section>

        {/* Submit Story CTA */}
        <div style={{
          background: 'var(--ivory)',
          borderBottom: '1px solid var(--border)',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '15px', color: 'var(--warm-grey)' }}>
            Were you a LAHARIYA bride? Share your story with the community.
          </p>
          <Link href="/real-brides/submit" style={{
            background: 'var(--crimson)', color: '#fff',
            padding: '10px 24px', borderRadius: 'var(--radius-full)',
            fontSize: '13px', fontWeight: 600,
          }}>
            Share Your Story
          </Link>
        </div>

        {/* Stories Grid */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px',
          }}>
            {MOCK_BRIDE_STORIES.map((story, i) => (
              <article key={story.id} style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}>
                {/* Cover Image Placeholder */}
                <div style={{
                  aspectRatio: '16/9',
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? '#8b1a1a22' : '#c4952a22'}, ${i % 2 === 0 ? '#8b1a1a55' : '#c4952a55'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  position: 'relative',
                }}>
                  ♡
                  {/* Tags */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                  }}>
                    {story.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        fontSize: '10px',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        backdropFilter: 'blur(4px)',
                        letterSpacing: '0.06em',
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 500, marginBottom: '6px' }}>
                    {story.bride_name}
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--gold)', marginBottom: '12px', fontWeight: 500 }}>
                    {new Date(story.wedding_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {story.venue_name}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--warm-grey)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {story.story}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>
                      ♡ {story.likes} loves
                    </span>
                    <Link href={`/real-brides/${story.id}`} style={{
                      color: 'var(--crimson)', fontSize: '13px', fontWeight: 600,
                    }}>
                      Read Story →
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Placeholder cards */}
            {[3, 4, 5].map(n => (
              <article key={n} style={{
                background: 'var(--ivory)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 32px',
                textAlign: 'center',
                aspectRatio: n === 3 ? 'auto' : undefined,
                minHeight: '300px',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px', color: 'var(--border)' }}>+</div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--warm-grey)', marginBottom: '8px' }}>
                  Your Story Here
                </p>
                <p style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>
                  Share your wedding day
                </p>
                <Link href="/real-brides/submit" style={{
                  marginTop: '20px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--fg)',
                }}>
                  Submit Story
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Listing tie-in */}
        <section style={{ background: 'var(--ivory)', padding: '64px 32px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, marginBottom: '12px' }}>
              Shop the Stories
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--warm-grey)', marginBottom: '40px' }}>
              Some of these lehengas are available on the marketplace. Find yours.
            </p>
            <Link href="/marketplace" style={{
              display: 'inline-block',
              background: 'var(--crimson)',
              color: '#fff',
              padding: '14px 48px',
              borderRadius: 'var(--radius-full)',
              fontSize: '15px',
              fontWeight: 700,
            }}>
              Browse All Listings
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
