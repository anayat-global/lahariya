'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { Eye, EyeOff, Check } from 'lucide-react'

type Role = 'buyer' | 'seller' | 'both'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<Role>('buyer')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const passwordStrength = getPasswordStrength(password)

  function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setStep(2)
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Mock auth — redirect to dashboard for demo
    setTimeout(() => router.push('/account/dashboard'), 800)
  }

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'var(--ivory)',
      }}>
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px',
          width: '100%',
          maxWidth: '480px',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'var(--crimson)',
              marginBottom: '8px',
            }}>
              LAHARIYA
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400 }}>
              {step === 1 ? 'Create Your Account' : 'How will you use LAHARIYA?'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--warm-grey)', marginTop: '6px' }}>
              {step === 1 ? 'Join thousands of brides on LAHARIYA' : 'You can always change this later'}
            </p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[1, 2].map(s => (
              <div key={s} style={{
                flex: 1,
                height: '3px',
                borderRadius: '2px',
                background: s <= step ? 'var(--crimson)' : 'var(--border)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>

          {/* Step 1 — Account Details */}
          {step === 1 && (
            <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Priya Mehta"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    style={{ ...inputStyle, paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--warm-grey)',
                      padding: 0,
                      display: 'flex',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength */}
                {password.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} style={{
                          flex: 1, height: '3px', borderRadius: '2px',
                          background: n <= passwordStrength.score ? passwordStrength.colour : 'var(--border)',
                          transition: 'background 0.2s',
                        }} />
                      ))}
                    </div>
                    <p style={{ fontSize: '11px', color: passwordStrength.colour }}>{passwordStrength.label}</p>
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    style={{
                      ...inputStyle,
                      paddingRight: '44px',
                      borderColor: confirmPassword && confirmPassword !== password ? '#c0392b' : 'var(--border)',
                    }}
                  />
                  {confirmPassword && confirmPassword === password && (
                    <span style={{
                      position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                      color: '#2d6a4f',
                    }}>
                      <Check size={16} />
                    </span>
                  )}
                </div>
              </div>

              {error && (
                <p style={{ fontSize: '13px', color: 'var(--crimson)', background: '#fdf0f0', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                  {error}
                </p>
              )}

              <button type="submit" style={primaryBtnStyle}>
                Continue
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                <span style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>

              <button type="button" style={googleBtnStyle}>
                <GoogleIcon />
                Continue with Google
              </button>

              <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--warm-grey)' }}>
                Already have an account?{' '}
                <Link href="/auth/login" style={{ color: 'var(--crimson)', fontWeight: 600 }}>
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {/* Step 2 — Role Selection */}
          {step === 2 && (
            <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(
                [
                  {
                    value: 'buyer' as Role,
                    icon: '♡',
                    title: 'I want to buy',
                    desc: 'Browse pre-loved lehengas, save favourites, and find your next chapter.',
                    colour: '#1d4e89',
                  },
                  {
                    value: 'seller' as Role,
                    icon: '✦',
                    title: 'I want to sell',
                    desc: 'List my pre-loved lehenga and help another bride find their dream.',
                    colour: 'var(--crimson)',
                  },
                  {
                    value: 'both' as Role,
                    icon: '◈',
                    title: 'Both — buy & sell',
                    desc: 'The full LAHARIYA experience. Browse and list at the same time.',
                    colour: '#2d6a4f',
                  },
                ] as const
              ).map(({ value, icon, title, desc, colour }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  style={{
                    padding: '20px 20px',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${role === value ? colour : 'var(--border)'}`,
                    background: role === value ? `${colour}10` : 'var(--bg)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    background: role === value ? `${colour}20` : 'var(--ivory)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                    color: colour,
                  }}>
                    {icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: role === value ? colour : 'var(--fg)',
                      marginBottom: '2px',
                    }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--warm-grey)', lineHeight: 1.4 }}>{desc}</div>
                  </div>
                  {role === value && <Check size={18} color={colour} style={{ flexShrink: 0 }} />}
                </button>
              ))}

              {/* Terms */}
              <p style={{ fontSize: '12px', color: 'var(--warm-grey)', textAlign: 'center', lineHeight: 1.6, marginTop: '4px' }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" style={{ color: 'var(--crimson)' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" style={{ color: 'var(--crimson)' }}>Privacy Policy</Link>
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg)',
                    color: 'var(--fg)',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ ...primaryBtnStyle, flex: 2, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function getPasswordStrength(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map = [
    { label: 'Too weak', colour: '#c0392b' },
    { label: 'Weak', colour: '#e67e22' },
    { label: 'Fair', colour: '#c4952a' },
    { label: 'Strong', colour: '#2d6a4f' },
    { label: 'Very strong', colour: '#1d4e89' },
  ]
  return { score, ...map[score] }
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

/* ─── Shared Styles ───────────────────────────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  display: 'block',
  marginBottom: '6px',
  letterSpacing: '0.02em',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  fontSize: '15px',
  background: 'var(--bg)',
  color: 'var(--fg)',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

const primaryBtnStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--crimson)',
  color: '#fff',
  padding: '14px',
  borderRadius: 'var(--radius-full)',
  fontSize: '15px',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  marginTop: '4px',
}

const googleBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-full)',
  background: 'var(--bg)',
  color: 'var(--fg)',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontFamily: 'inherit',
}
