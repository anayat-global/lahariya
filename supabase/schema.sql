-- ─── LAHARIYA Database Schema ───────────────────────────────────────────────
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/*/sql

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles (extends Supabase auth.users) ──────────────────────────────────
CREATE TABLE profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name     TEXT NOT NULL,
  avatar_url    TEXT,
  role          TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'both')),
  location      TEXT,
  bio           TEXT,
  phone         TEXT,
  rating        NUMERIC(3,2),
  review_count  INT DEFAULT 0,
  total_sales   INT DEFAULT 0,
  total_listings INT DEFAULT 0,
  verified      BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Listings ─────────────────────────────────────────────────────────────────
CREATE TABLE listings (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug                  TEXT UNIQUE NOT NULL,
  title                 TEXT NOT NULL,
  description           TEXT,
  asking_price          INT NOT NULL,
  original_retail_price INT NOT NULL,
  designer              TEXT NOT NULL,
  fabric                TEXT,
  work                  TEXT,
  colour                TEXT,
  colour_hex            TEXT DEFAULT '#8b1a1a',
  occasion              TEXT NOT NULL CHECK (occasion IN ('bridal','reception','sangeet','mehendi','festive','party')),
  condition             TEXT NOT NULL CHECK (condition IN ('worn-once','twice-worn','altered','like-new')),
  alterations_allowed   BOOLEAN DEFAULT FALSE,
  images                TEXT[] DEFAULT '{}',
  wedding_photos        JSONB DEFAULT '[]',
  wearing_video_url     TEXT,
  seller_story          JSONB DEFAULT '{}',
  measurements          JSONB DEFAULT '{}',
  size_label            TEXT,
  seller_id             UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status                TEXT DEFAULT 'draft' CHECK (status IN ('draft','active','sold','archived')),
  views                 INT DEFAULT 0,
  saves                 INT DEFAULT 0,
  authenticity_verified BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  sold_at               TIMESTAMPTZ
);

CREATE INDEX listings_seller_idx ON listings(seller_id);
CREATE INDEX listings_occasion_idx ON listings(occasion);
CREATE INDEX listings_status_idx ON listings(status);
CREATE INDEX listings_price_idx ON listings(asking_price);

-- ─── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE orders (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id       UUID REFERENCES listings(id) NOT NULL,
  buyer_id         UUID REFERENCES profiles(id) NOT NULL,
  seller_id        UUID REFERENCES profiles(id) NOT NULL,
  amount           INT NOT NULL,
  payment_id       TEXT,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled','refunded')),
  shipping_address JSONB NOT NULL DEFAULT '{}',
  tracking_number  TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Messages / Threads ───────────────────────────────────────────────────────
CREATE TABLE threads (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id       UUID REFERENCES listings(id),
  participant_ids  UUID[] NOT NULL,
  unread_count     INT DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thread_id    UUID REFERENCES threads(id) ON DELETE CASCADE NOT NULL,
  sender_id    UUID REFERENCES profiles(id) NOT NULL,
  recipient_id UUID REFERENCES profiles(id) NOT NULL,
  listing_id   UUID REFERENCES listings(id),
  body         TEXT NOT NULL,
  read         BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX messages_thread_idx ON messages(thread_id);
CREATE INDEX messages_sender_idx ON messages(sender_id);

-- ─── Reviews ──────────────────────────────────────────────────────────────────
CREATE TABLE reviews (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id      UUID REFERENCES orders(id) NOT NULL,
  reviewer_id   UUID REFERENCES profiles(id) NOT NULL,
  seller_id     UUID REFERENCES profiles(id) NOT NULL,
  listing_id    UUID REFERENCES listings(id) NOT NULL,
  rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title         TEXT,
  body          TEXT,
  photos        TEXT[] DEFAULT '{}',
  helpful_count INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Saved Listings (Wishlist) ────────────────────────────────────────────────
CREATE TABLE saved_listings (
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- ─── Real Bride Stories ───────────────────────────────────────────────────────
CREATE TABLE bride_stories (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id          UUID REFERENCES profiles(id),
  bride_name       TEXT NOT NULL,
  wedding_date     DATE,
  wedding_location TEXT,
  venue_name       TEXT,
  story            TEXT NOT NULL,
  cover_image      TEXT,
  gallery          TEXT[] DEFAULT '{}',
  listing_id       UUID REFERENCES listings(id),
  tags             TEXT[] DEFAULT '{}',
  likes            INT DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bride_stories ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can update
CREATE POLICY "Public profiles readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Listings: active listings public, seller manages own
CREATE POLICY "Active listings readable" ON listings FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
CREATE POLICY "Seller inserts listings" ON listings FOR INSERT WITH CHECK (seller_id = auth.uid());
CREATE POLICY "Seller updates listings" ON listings FOR UPDATE USING (seller_id = auth.uid());

-- Orders: buyer and seller see their orders
CREATE POLICY "Order participants view" ON orders FOR SELECT USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- Messages: participants only
CREATE POLICY "Message participants view" ON messages FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());
CREATE POLICY "Authenticated users send messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Reviews: public read, only reviewer writes
CREATE POLICY "Reviews public" ON reviews FOR SELECT USING (true);
CREATE POLICY "Reviewer inserts" ON reviews FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- Saved Listings: private
CREATE POLICY "User views own saved" ON saved_listings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "User manages saved" ON saved_listings FOR ALL USING (user_id = auth.uid());

-- Bride stories: public read
CREATE POLICY "Bride stories public" ON bride_stories FOR SELECT USING (true);
CREATE POLICY "Authenticated submits story" ON bride_stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
