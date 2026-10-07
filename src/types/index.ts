// ─── Core Domain Types ───────────────────────────────────────────────────────

export type UserRole = 'buyer' | 'seller' | 'both'

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: UserRole
  location?: string
  bio?: string
  phone?: string
  created_at: string
  // Seller stats
  total_sales?: number
  total_listings?: number
  rating?: number
  review_count?: number
  verified?: boolean
}

export type ListingCondition = 'worn-once' | 'twice-worn' | 'altered' | 'like-new'
export type ListingStatus = 'draft' | 'active' | 'sold' | 'archived'
export type OccasionType = 'bridal' | 'reception' | 'sangeet' | 'mehendi' | 'festive' | 'party'

export interface Measurement {
  bust: number
  waist: number
  hip: number
  length: number   // lehenga length
  blouse_length: number
}

export interface WeddingPhoto {
  url: string
  caption?: string
  is_cover: boolean
}

export interface SellerStory {
  title: string       // "My Virasat Bridal Lehenga"
  body: string        // "I wore this on the most magical night…"
  wedding_date?: string
  wedding_venue?: string
  wedding_location?: string
}

export interface Listing {
  id: string
  slug: string
  title: string
  description: string
  // Pricing
  asking_price: number
  original_retail_price: number
  // Classification
  designer: string
  fabric: string
  work: string       // "Zardozi", "Gota Patti", etc.
  colour: string
  colour_hex: string
  occasion: OccasionType
  condition: ListingCondition
  alterations_allowed: boolean
  // Media
  images: string[]
  wedding_photos: WeddingPhoto[]
  wearing_video_url?: string
  // Story
  seller_story: SellerStory
  // Sizing
  measurements: Measurement
  size_label: string  // "XS" | "S" | "M" | "L" | "XL" | "Custom"
  // Relations
  seller_id: string
  seller?: User
  // State
  status: ListingStatus
  views: number
  saves: number
  // Timestamps
  created_at: string
  updated_at: string
  sold_at?: string
  // Computed
  discount_percent?: number
  authenticity_verified?: boolean
}

export interface Order {
  id: string
  listing_id: string
  listing?: Listing
  buyer_id: string
  buyer?: User
  seller_id: string
  seller?: User
  amount: number
  payment_id?: string     // Razorpay payment ID
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  shipping_address: Address
  tracking_number?: string
  created_at: string
  updated_at: string
}

export interface Address {
  full_name: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface Message {
  id: string
  thread_id: string
  sender_id: string
  sender?: User
  recipient_id: string
  recipient?: User
  listing_id?: string
  listing?: Listing
  body: string
  read: boolean
  created_at: string
}

export interface Thread {
  id: string
  listing_id?: string
  listing?: Listing
  participant_ids: string[]
  participants?: User[]
  last_message?: Message
  unread_count: number
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  order_id: string
  reviewer_id: string
  reviewer?: User
  seller_id: string
  listing_id: string
  rating: number         // 1–5
  title: string
  body: string
  photos?: string[]
  helpful_count: number
  created_at: string
}

export interface RealBrideStory {
  id: string
  user_id?: string
  bride_name: string
  wedding_date: string
  wedding_location: string
  venue_name?: string
  story: string
  cover_image: string
  gallery: string[]
  listing_id?: string    // if lehenga is listed on LAHARIYA
  listing?: Listing
  tags: string[]
  likes: number
  created_at: string
}

// ─── Sell Wizard State ───────────────────────────────────────────────────────

export interface WizardState {
  step: number
  // Step 1: Category & Occasion
  occasion?: OccasionType
  designer?: string
  // Step 2: Condition
  condition?: ListingCondition
  alterations_allowed?: boolean
  // Step 3: Details
  fabric?: string
  work?: string
  colour?: string
  colour_hex?: string
  // Step 4: Story
  seller_story?: Partial<SellerStory>
  // Step 5: Photos
  images?: File[]
  wedding_photos?: File[]
  wearing_video?: File
  // Step 6: Measurements
  measurements?: Partial<Measurement>
  size_label?: string
  // Step 7: Pricing
  asking_price?: number
  original_retail_price?: number
  // Step 8: Title & Description
  title?: string
  description?: string
  // Step 9: Review
  // Step 10: Publish
}

// ─── Filter / Sort ──────────────────────────────────────────────────────────

export interface MarketplaceFilters {
  occasion?: OccasionType[]
  designer?: string[]
  condition?: ListingCondition[]
  colour?: string[]
  price_min?: number
  price_max?: number
  size?: string[]
  fabric?: string[]
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'discount'
}
