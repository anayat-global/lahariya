'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { DESIGNERS, FABRICS, WORK_TYPES } from '@/lib/mock-data'
import type { WizardState, OccasionType, ListingCondition } from '@/types'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

const STEPS = [
  { n: 1, label: 'Category' },
  { n: 2, label: 'Condition' },
  { n: 3, label: 'Details' },
  { n: 4, label: 'Your Story' },
  { n: 5, label: 'Photos' },
  { n: 6, label: 'Sizing' },
  { n: 7, label: 'Pricing' },
  { n: 8, label: 'Title' },
  { n: 9, label: 'Review' },
  { n: 10, label: 'Publish' },
]

const OCCASIONS: { label: string; value: OccasionType; desc: string }[] = [
  { label: 'Bridal', value: 'bridal', desc: 'Main wedding / Shaadi' },
  { label: 'Reception', value: 'reception', desc: 'Reception / After-party' },
  { label: 'Sangeet', value: 'sangeet', desc: 'Sangeet / Garba' },
  { label: 'Mehendi', value: 'mehendi', desc: 'Mehendi / Haldi' },
  { label: 'Festive', value: 'festive', desc: 'Diwali / Eid / Puja' },
  { label: 'Party', value: 'party', desc: 'Cocktail / Reception' },
]

const CONDITIONS: { label: string; value: ListingCondition; desc: string }[] = [
  { label: 'Like New', value: 'like-new', desc: 'Never worn, tags may be attached' },
  { label: 'Worn Once', value: 'worn-once', desc: 'Worn on one occasion, pristine condition' },
  { label: 'Worn Twice', value: 'twice-worn', desc: 'Worn on two occasions, excellent condition' },
  { label: 'Altered', value: 'altered', desc: 'Custom alterations have been made' },
]

export default function SellPage() {
  const [state, setState] = useState<WizardState>({ step: 1 })
  const [published, setPublished] = useState(false)

  function update(patch: Partial<WizardState>) {
    setState(s => ({ ...s, ...patch }))
  }

  function next() { setState(s => ({ ...s, step: Math.min(s.step + 1, 10) })) }
  function prev() { setState(s => ({ ...s, step: Math.max(s.step - 1, 1) })) }

  if (published) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: '480px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: '36px',
            }}>✓</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', marginBottom: '16px', color: '#2d6a4f' }}>
              You&apos;re Live!
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--warm-grey)', marginBottom: '32px', lineHeight: 1.7 }}>
              Your listing for <strong>{state.title || 'your lehenga'}</strong> is now live on LAHARIYA. Another bride is about to discover her next chapter.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/account/dashboard" style={{
                background: 'var(--crimson)', color: '#fff', padding: '14px 32px',
                borderRadius: 'var(--radius-full)', fontSize: '15px', fontWeight: 600,
              }}>Go to Dashboard</Link>
              <Link href="/marketplace" style={{
                border: '1.5px solid var(--border)', color: 'var(--fg)', padding: '14px 32px',
                borderRadius: 'var(--radius-full)', fontSize: '15px', fontWeight: 500,
              }}>Browse Marketplace</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 32px 80px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>Sell Your Lehenga</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400 }}>
              Share Her Story
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--warm-grey)', marginTop: '8px' }}>
              10 steps to find your lehenga its next chapter
            </p>
          </div>

          {/* Step Progress */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>Step {state.step} of 10</span>
              <span style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>{STEPS[state.step - 1].label}</span>
            </div>
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(state.step / 10) * 100}%`,
                background: 'var(--crimson)',
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
            {/* Step dots */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              {STEPS.map(s => (
                <div key={s.n} style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: s.n < state.step ? 'var(--crimson)' : s.n === state.step ? 'var(--crimson)' : 'var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: s.n <= state.step ? '#fff' : 'var(--warm-grey)',
                  fontWeight: 700, flexShrink: 0,
                  transition: 'background 0.3s ease',
                }}>
                  {s.n < state.step ? <Check size={12} /> : s.n}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            minHeight: '360px',
          }}>
            {state.step === 1 && (
              <StepOccasion value={state.occasion} onChange={v => update({ occasion: v })} />
            )}
            {state.step === 2 && (
              <StepCondition value={state.condition} onChange={v => update({ condition: v })} />
            )}
            {state.step === 3 && (
              <StepDetails state={state} update={update} />
            )}
            {state.step === 4 && (
              <StepStory state={state} update={update} />
            )}
            {state.step === 5 && (
              <StepPhotos />
            )}
            {state.step === 6 && (
              <StepMeasurements state={state} update={update} />
            )}
            {state.step === 7 && (
              <StepPricing state={state} update={update} />
            )}
            {state.step === 8 && (
              <StepTitle state={state} update={update} />
            )}
            {state.step === 9 && (
              <StepReview state={state} />
            )}
            {state.step === 10 && (
              <StepPublish onPublish={() => setPublished(true)} />
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button
              onClick={prev}
              disabled={state.step === 1}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--bg)', border: '1px solid var(--border)',
                padding: '12px 24px', borderRadius: 'var(--radius-full)',
                fontSize: '14px', fontWeight: 500, cursor: state.step === 1 ? 'not-allowed' : 'pointer',
                opacity: state.step === 1 ? 0.4 : 1,
                color: 'var(--fg)',
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>
            {state.step < 10 ? (
              <button
                onClick={next}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'var(--crimson)', border: 'none',
                  padding: '12px 32px', borderRadius: 'var(--radius-full)',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  color: '#fff',
                }}
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* ─── Step Components ─────────────────────────────────────────────────────── */

function StepOccasion({ value, onChange }: { value?: OccasionType; onChange: (v: OccasionType) => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>What&apos;s the occasion?</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Choose the primary occasion this lehenga was worn for.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
        {OCCASIONS.map(({ label, value: v, desc }) => (
          <button key={v} onClick={() => onChange(v)} style={{
            padding: '20px 16px', borderRadius: 'var(--radius-lg)',
            border: `2px solid ${value === v ? 'var(--crimson)' : 'var(--border)'}`,
            background: value === v ? '#fdf0f0' : 'var(--bg)',
            textAlign: 'left', cursor: 'pointer',
          }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: value === v ? 'var(--crimson)' : 'var(--fg)', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '12px', color: 'var(--warm-grey)' }}>{desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepCondition({ value, onChange }: { value?: ListingCondition; onChange: (v: ListingCondition) => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>What&apos;s the condition?</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Be honest — buyers trust sellers who are transparent.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CONDITIONS.map(({ label, value: v, desc }) => (
          <button key={v} onClick={() => onChange(v)} style={{
            padding: '20px 24px', borderRadius: 'var(--radius-lg)',
            border: `2px solid ${value === v ? 'var(--crimson)' : 'var(--border)'}`,
            background: value === v ? '#fdf0f0' : 'var(--bg)',
            textAlign: 'left', cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: value === v ? 'var(--crimson)' : 'var(--fg)' }}>{label}</div>
              <div style={{ fontSize: '13px', color: 'var(--warm-grey)', marginTop: '2px' }}>{desc}</div>
            </div>
            {value === v && <Check size={20} color="var(--crimson)" />}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepDetails({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Tell us about the lehenga</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>These details help buyers find and trust your listing.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>Designer *</label>
          <select value={state.designer ?? ''} onChange={e => update({ designer: e.target.value })} style={inputStyle}>
            <option value="">Select designer</option>
            {DESIGNERS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>Fabric *</label>
          <select value={state.fabric ?? ''} onChange={e => update({ fabric: e.target.value })} style={inputStyle}>
            <option value="">Select fabric</option>
            {FABRICS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>Embroidery / Work *</label>
          <select value={state.work ?? ''} onChange={e => update({ work: e.target.value })} style={inputStyle}>
            <option value="">Select work type</option>
            {WORK_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>Colour *</label>
          <input
            type="text"
            placeholder="e.g. Crimson & Gold"
            value={state.colour ?? ''}
            onChange={e => update({ colour: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  )
}

function StepStory({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  const story = state.seller_story ?? {}
  function updateStory(patch: object) { update({ seller_story: { ...story, ...patch } }) }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Your Wedding Story</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px', lineHeight: 1.6 }}>
        This is the heart of LAHARIYA. Your story is what will make a buyer fall in love with your lehenga.
        Be honest, be real, be you.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Story Title *</label>
          <input
            type="text"
            placeholder="e.g. The Night I Felt Like Royalty"
            value={story.title ?? ''}
            onChange={e => updateStory({ title: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Wedding Date</label>
            <input type="date" value={story.wedding_date ?? ''} onChange={e => updateStory({ wedding_date: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Wedding Location</label>
            <input type="text" placeholder="e.g. Udaipur, Rajasthan" value={story.wedding_location ?? ''} onChange={e => updateStory({ wedding_location: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Venue Name</label>
            <input type="text" placeholder="e.g. Taj Lake Palace" value={story.wedding_venue ?? ''} onChange={e => updateStory({ wedding_venue: e.target.value })} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Your Story *</label>
          <textarea
            rows={6}
            placeholder="Tell the next bride about your lehenga — how it felt to wear it, what the day was like, why you chose it..."
            value={story.body ?? ''}
            onChange={e => updateStory({ body: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-sans)', lineHeight: 1.7 }}
          />
          <p style={{ fontSize: '12px', color: 'var(--warm-grey)', marginTop: '6px' }}>
            Listings with detailed stories sell 3× faster. Aim for at least 150 words.
          </p>
        </div>
      </div>
    </div>
  )
}

function StepPhotos() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Add Photos</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Good photos are the most important part of your listing. Include both garment close-ups and your wedding day photos.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {[...Array(6)].map((_, i) => (
          <label key={i} style={{
            aspectRatio: '3/4',
            border: '2px dashed var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: 'var(--ivory)',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--warm-grey)',
          }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} />
            <span style={{ fontSize: '28px' }}>+</span>
            <span>{i === 0 ? 'Cover Photo' : `Photo ${i + 1}`}</span>
          </label>
        ))}
      </div>
      <p style={{ fontSize: '13px', color: 'var(--warm-grey)', marginTop: '16px' }}>
        You can also upload wedding day photos after publishing to activate the &ldquo;See Her Wear It&rdquo; feature.
      </p>
    </div>
  )
}

function StepMeasurements({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  const m = state.measurements ?? {}
  function updateM(key: string, val: number) { update({ measurements: { ...m, [key]: val } as WizardState['measurements'] }) }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Measurements</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Accurate measurements reduce returns and build buyer trust.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {[
          { key: 'bust', label: 'Bust (inches)' },
          { key: 'waist', label: 'Waist (inches)' },
          { key: 'hip', label: 'Hip (inches)' },
          { key: 'length', label: 'Lehenga Length (inches)' },
          { key: 'blouse_length', label: 'Blouse Length (inches)' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>{label}</label>
            <input
              type="number"
              min="10"
              max="80"
              placeholder="inches"
              value={(m as Record<string, number>)[key] ?? ''}
              onChange={e => updateM(key, +e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}
      </div>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Size Label</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['XS', 'S', 'M', 'L', 'XL', 'Custom'].map(s => (
            <button key={s} onClick={() => update({ size_label: s })} style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: `2px solid ${state.size_label === s ? 'var(--crimson)' : 'var(--border)'}`,
              background: state.size_label === s ? '#fdf0f0' : 'var(--bg)',
              color: state.size_label === s ? 'var(--crimson)' : 'var(--fg)',
              fontWeight: 600, cursor: 'pointer', fontSize: '14px',
            }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepPricing({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  const disc = state.asking_price && state.original_retail_price
    ? Math.round(((state.original_retail_price - state.asking_price) / state.original_retail_price) * 100)
    : 0

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Set Your Price</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Lehengas priced at 40–60% of retail tend to sell fastest.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Original Retail Price (₹) *</label>
          <input
            type="number"
            placeholder="e.g. 485000"
            value={state.original_retail_price ?? ''}
            onChange={e => update({ original_retail_price: +e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Your Asking Price (₹) *</label>
          <input
            type="number"
            placeholder="e.g. 285000"
            value={state.asking_price ?? ''}
            onChange={e => update({ asking_price: +e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>
      {disc > 0 && (
        <div style={{
          background: disc >= 40 ? '#e8f5e9' : '#fff8e1',
          border: `1px solid ${disc >= 40 ? '#2d6a4f' : '#c4952a'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: disc >= 40 ? '#2d6a4f' : '#8b6914' }}>
              {disc >= 40 ? '✓ Great price — you\'ll sell quickly!' : 'Consider pricing at 40%+ off for faster sales'}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--warm-grey)', marginTop: '2px' }}>
              That&apos;s {disc}% off the original retail price
            </p>
          </div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 600, color: disc >= 40 ? '#2d6a4f' : '#c4952a' }}>
            -{disc}%
          </span>
        </div>
      )}
    </div>
  )
}

function StepTitle({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Title & Description</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Give your listing a beautiful name and describe what makes it special.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Listing Title *</label>
          <input
            type="text"
            placeholder="e.g. Gulnaar — Sabyasachi Crimson Bridal Lehenga"
            value={state.title ?? ''}
            onChange={e => update({ title: e.target.value })}
            style={inputStyle}
          />
          <p style={{ fontSize: '12px', color: 'var(--warm-grey)', marginTop: '6px' }}>
            Format: [Name] — [Designer] [Colour] [Occasion]
          </p>
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Description *</label>
          <textarea
            rows={5}
            placeholder="Describe the lehenga — its fabric, work, fit, and what makes it special to you..."
            value={state.description ?? ''}
            onChange={e => update({ description: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-sans)', lineHeight: 1.7 }}
          />
        </div>
      </div>
    </div>
  )
}

function StepReview({ state }: { state: WizardState }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px' }}>Review Your Listing</h2>
      <p style={{ color: 'var(--warm-grey)', marginBottom: '28px', fontSize: '15px' }}>Almost there! Check everything looks right before publishing.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { label: 'Occasion', value: state.occasion },
          { label: 'Condition', value: state.condition },
          { label: 'Designer', value: state.designer },
          { label: 'Fabric', value: state.fabric },
          { label: 'Size', value: state.size_label },
          { label: 'Asking Price', value: state.asking_price ? `₹${state.asking_price.toLocaleString('en-IN')}` : '' },
          { label: 'Original Price', value: state.original_retail_price ? `₹${state.original_retail_price.toLocaleString('en-IN')}` : '' },
          { label: 'Title', value: state.title },
          { label: 'Story', value: state.seller_story?.title },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '14px', color: 'var(--warm-grey)' }}>{label}</span>
            <span style={{
              fontSize: '14px',
              fontWeight: 500,
              color: value ? 'var(--fg)' : 'var(--crimson)',
              textTransform: 'capitalize',
            }}>
              {value || 'Not filled'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepPublish({ onPublish }: { onPublish: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✦</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', marginBottom: '12px' }}>
        Ready to Share Her Story?
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--warm-grey)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.7 }}>
        Your listing will be visible to thousands of brides looking for their next chapter.
        Once published, you can edit or deactivate it anytime from your dashboard.
      </p>
      <button onClick={onPublish} style={{
        background: 'var(--crimson)',
        color: '#fff',
        padding: '18px 56px',
        borderRadius: 'var(--radius-full)',
        fontSize: '16px',
        fontWeight: 700,
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '0.04em',
      }}>
        Publish Listing
      </button>
      <p style={{ fontSize: '12px', color: 'var(--warm-grey)', marginTop: '16px' }}>
        LAHARIYA takes a 12% commission on successful sales only
      </p>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--bg)',
  color: 'var(--fg)',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit',
}
