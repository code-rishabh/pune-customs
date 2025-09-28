export type NewsItemsResponse = {
  items: string[]
}

// Server-side helper; could be replaced by DB call later
export async function getNewsItemsServer(): Promise<string[]> {
  // In real implementation, fetch from database or CMS
  // For now, call the same in-memory endpoint to keep a single source
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/news`, {
      // Ensure this never caches on server between requests during dev
      cache: "no-store",
    })
    if (!res.ok) return []
    const data = (await res.json()) as NewsItemsResponse
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}

// Client-side helper; use relative path
export async function getNewsItemsClient(): Promise<string[]> {
  try {
    const res = await fetch("/api/news?public=true&active=true", { cache: "no-store" })
    if (!res.ok) return []
    const data = (await res.json()) as NewsItemsResponse
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}

// Client-side helper to fetch news data for What's New panel
export async function getNewsForHomepage(): Promise<News[]> {
  try {
    const res = await fetch("/api/news?active=true&limit=3", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.news) ? data.news : []
  } catch {
    return []
  }
}

// News interface for homepage
export interface News {
  _id: string
  text: string
  link?: string
  ranking: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Notice interface for homepage
export interface Notice {
  _id: string
  heading: string
  subheading: string
  publishedDate: string
  validUntil: string
  documentUrl?: string
  isActive: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

// Slider interface for homepage
export interface Slider {
  _id: string
  heading: string
  description: string
  imageUrl: string
  link?: string
  priority: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Achievement interface for homepage
export interface Achievement {
  _id: string
  heading: string
  description: string
  imageUrl: string
  priority: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Client-side helper to fetch notices for homepage
export async function getNoticesForHomepage(): Promise<Notice[]> {
  try {
    const res = await fetch("/api/public/notices?limit=4", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.notices) ? data.notices : []
  } catch {
    return []
  }
}

// Client-side helper to fetch sliders for homepage
export async function getSlidersForHomepage(): Promise<Slider[]> {
  try {
    const res = await fetch("/api/public/sliders?limit=5", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.sliders) ? data.sliders : []
  } catch {
    return []
  }
}

// Client-side helper to fetch achievements for homepage
export async function getAchievementsForHomepage(): Promise<Achievement[]> {
  try {
    const res = await fetch("/api/public/achievements?limit=6", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.achievements) ? data.achievements : []
  } catch {
    return []
  }
}

// Tender interface
export interface Tender {
  _id?: string
  heading: string
  description: string
  publishedDate: string
  lastDate: string
  openingDate: string
  estimatedValue: number
  tenderNumber: string
  documentUrl?: string
  isActive: boolean
  featured: boolean
  uploadedBy?: string
  createdAt: string
  updatedAt: string
}

// Recruitment interface
export interface Recruitment {
  _id?: string
  heading: string
  subheading: string
  publishedDate: string
  validUntil: string
  documentUrl?: string
  isActive: boolean
  featured: boolean
  uploadedBy?: string
  createdAt: string
  updatedAt: string
}

// Client-side helper for tenders
export async function getTendersForHomepage(): Promise<Tender[]> {
  try {
    const res = await fetch("/api/public/tenders", { cache: "no-store" })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

// Client-side helper for recruitments
export async function getRecruitmentsForHomepage(): Promise<Recruitment[]> {
  try {
    const res = await fetch("/api/public/recruitments", { cache: "no-store" })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

// Media interface
export interface MediaItem {
  _id?: string
  type: 'photo' | 'video' | 'document' | 'press'
  heading: string
  description: string
  date: string
  link: string
  featured?: boolean
  category?: string
  uploadedBy?: string
  createdAt: string
  updatedAt: string
}

// Client-side helper for media by type
export async function getMediaByType(type: 'photo' | 'video' | 'document' | 'press', limit?: number): Promise<MediaItem[]> {
  try {
    const url = limit ? `/api/public/media?type=${type}&limit=${limit}` : `/api/public/media?type=${type}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}


