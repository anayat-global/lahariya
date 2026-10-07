import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LAHARIYA — Pre-Loved Indian Bridal Fashion',
    template: '%s | LAHARIYA',
  },
  description: 'Buy and sell pre-loved Indian bridal and festive lehengas. Every garment carries a story. Find your next chapter.',
  keywords: ['lehenga', 'bridal wear', 'pre-loved', 'Indian wedding', 'second hand designer'],
  openGraph: {
    title: 'LAHARIYA — Pre-Loved Indian Bridal Fashion',
    description: 'Where every lehenga carries two stories.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
