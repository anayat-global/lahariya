import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ListingCondition } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmt(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function discount(original: number, asking: number): number {
  return Math.round(((original - asking) / original) * 100)
}

export function conditionLabel(condition: ListingCondition): string {
  const map: Record<ListingCondition, string> = {
    'worn-once': 'Worn Once',
    'twice-worn': 'Worn Twice',
    'altered': 'Altered',
    'like-new': 'Like New',
  }
  return map[condition]
}

export function conditionColor(condition: ListingCondition): string {
  const map: Record<ListingCondition, string> = {
    'worn-once': '#2d6a4f',
    'twice-worn': '#c4952a',
    'altered': '#8b6914',
    'like-new': '#1d4e89',
  }
  return map[condition]
}

export function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
