import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'How It Works' }

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          background: 'var(--charcoal)',
          color: '#fff',
          padding: '80px 32px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '16px', fontWeight: 600 }}>THE LAHARIYA WAY</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, marginBottom: '20px' }}>
            How It Works
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            A marketplace built on trust, stories, and the belief that every beautiful lehenga deserves to be worn again.
          </p>
        </section>

        {/* For Buyers */}
        <section style={{ padding: '80px 32px', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '48px', fontWeight: 400 }}>
            For Buyers
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                n: '01',
                title: 'Browse & Discover',
                desc: 'Filter by occasion, designer, condition, size, and budget. Every listing is a real lehenga with a real story. No replicas, no mass-market pieces.',
              },
              {
                n: '02',
                title: 'Read Her Story',
                desc: 'Every seller writes their wedding story as part of listing. You\'ll know where it was worn, what the day felt like, and why she loved it. This is what makes LAHARIYA different.',
              },
              {
                n: '03',
                title: 'Verify & Trust',
                desc: 'All listings above ₹50,000 go through our free authentication process. We verify designer labels, craftsmanship, and condition before marking a listing "Verified Authentic."',
              },
              {
                n: '04',
                title: 'Connect with the Seller',
                desc: 'Message the seller directly to ask questions about fit, condition, alterations, or shipping. Real conversations, not chatbots.',
              },
              {
                n: '05',
                title: 'Buy with Protection',
                desc: 'Pay securely via Razorpay. Your payment is held in escrow until you receive and approve the lehenga. If it\'s not as described, we make it right.',
              },
              {
                n: '06',
                title: 'Write Your Story',
                desc: 'Once it\'s yours, you\'re invited to write the second chapter of its story. "One Lehenga. Two Stories." — your words will be seen by the next bride who falls in love with it.',
              },
            ].map(({ n, title, desc }, i) => (
              <div key={n} style={{
                display: 'flex',
                gap: '32px',
                padding: '40px 0',
                borderBottom: i < 5 ? '1px solid var(--border)' : 'none',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '56px',
                  fontWeight: 300,
                  color: 'var(--border)',
                  lineHeight: 1,
                  flexShrink: 0,
                  width: '80px',
                }}>
                  {n}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '10px', fontWeight: 500 }}>{title}</h3>
                  <p style={{ fontSize: '16px', color: 'var(--warm-grey)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Authentication Section */}
        <section id="authentication" style={{ background: 'var(--ivory)', padding: '80px 32px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--gold)', fontWeight: 600, marginBottom: '12px' }}>AUTHENTICATION</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, marginBottom: '20px' }}>
                  Every Verified Listing Is Checked by Experts
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--warm-grey)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Our team of textile experts verifies designer labels, zardozi quality, fabric weight, and overall condition. We provide a digital authentication certificate for every verified piece.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Designer label verification',
                    'Fabric and embroidery quality check',
                    'Condition assessment',
                    'Digital certificate issued',
                    'Covered by Buyer Protection',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px' }}>
                      <span style={{ color: '#2d6a4f', fontWeight: 700 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: 'var(--charcoal)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px',
                color: '#fff',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>✦</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px', color: 'var(--gold)' }}>
                  Verified Authentic
                </div>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  Free for all listings above ₹50,000. Results in 3–5 business days. Valid for 12 months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Sellers */}
        <section style={{ padding: '80px 32px', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '12px', fontWeight: 400 }}>
            For Sellers
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--warm-grey)', marginBottom: '48px' }}>
            List in 10 minutes. Sell with confidence.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { icon: '⏱', title: '10-Minute Listing', desc: 'Our wizard guides you through everything: photos, story, sizing, pricing.' },
              { icon: '✦', title: 'Storytelling First', desc: 'Your wedding story is the heart of your listing. Detailed stories sell 3× faster.' },
              { icon: '₹', title: 'Fair Pricing', desc: 'We recommend pricing at 40–60% off retail. You set the price; we show the savings.' },
              { icon: '🛡', title: '12% Commission', desc: 'We only earn when you sell. No listing fees, no subscriptions.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: 'var(--ivory)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--warm-grey)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--crimson)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', fontWeight: 400, marginBottom: '20px' }}>
            Ready to Begin?
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/marketplace" style={{
              background: '#fff', color: 'var(--crimson)',
              padding: '14px 40px', borderRadius: 'var(--radius-full)',
              fontSize: '15px', fontWeight: 700,
            }}>Browse Listings</Link>
            <Link href="/sell" style={{
              background: 'transparent', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.6)',
              padding: '14px 40px', borderRadius: 'var(--radius-full)',
              fontSize: '15px', fontWeight: 600,
            }}>Start Selling</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
