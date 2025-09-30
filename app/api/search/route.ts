import { NextRequest, NextResponse } from "next/server"
import { newsModel, noticeModel, tenderModel, recruitmentModel, sliderModel, achievementModel } from "@/models/notices-tenders"
import { mediaModel } from "@/models/media"

export interface SearchResult {
  id: string
  type: 'news' | 'notice' | 'tender' | 'recruitment' | 'media' | 'slider' | 'achievement' | 'page'
  title: string
  description: string
  url: string
  date?: string
  category?: string
  featured?: boolean
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') as string | null
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: true,
        results: [],
        total: 0,
        query: query || ''
      })
    }

    const searchQuery = query.trim()
    const results: SearchResult[] = []

    // Search News
    if (!type || type === 'news') {
      try {
        const news = await newsModel.search(searchQuery, true)
        news.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'news',
            title: item.text,
            description: 'Latest news update',
            url: item.link || '/notices',
            date: item.createdAt?.toString(),
            featured: false
          })
        })
      } catch (error) {
        console.error('Error searching news:', error)
      }
    }

    // Search Notices
    if (!type || type === 'notice') {
      try {
        const notices = await noticeModel.search(searchQuery, true)
        notices.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'notice',
            title: item.heading,
            description: item.subheading,
            url: item.documentUrl || '/notices?tab=notices',
            date: item.publishedDate?.toString(),
            featured: item.featured
          })
        })
      } catch (error) {
        console.error('Error searching notices:', error)
      }
    }

    // Search Tenders
    if (!type || type === 'tender') {
      try {
        const tenders = await tenderModel.search(searchQuery, true)
        tenders.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'tender',
            title: item.heading,
            description: item.description,
            url: item.documentUrl || '/notices?tab=tenders',
            date: item.publishedDate?.toString(),
            featured: item.featured
          })
        })
      } catch (error) {
        console.error('Error searching tenders:', error)
      }
    }

    // Search Recruitments
    if (!type || type === 'recruitment') {
      try {
        const recruitments = await recruitmentModel.search(searchQuery, true)
        recruitments.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'recruitment',
            title: item.heading,
            description: item.subheading,
            url: item.documentUrl || '/notices?tab=recruitments',
            date: item.publishedDate?.toString(),
            featured: item.featured
          })
        })
      } catch (error) {
        console.error('Error searching recruitments:', error)
      }
    }

    // Search Media
    if (!type || type === 'media') {
      try {
        const media = await mediaModel.searchMedia(searchQuery)
        media.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'media',
            title: item.heading,
            description: item.description,
            url: item.link || '/gallery',
            date: item.date?.toString(),
            category: item.type,
            featured: item.featured
          })
        })
      } catch (error) {
        console.error('Error searching media:', error)
      }
    }

    // Search Sliders
    if (!type || type === 'slider') {
      try {
        const sliders = await sliderModel.search(searchQuery, true)
        sliders.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'slider',
            title: item.heading,
            description: item.description,
            url: item.link || '/',
            date: item.createdAt?.toString(),
            featured: false
          })
        })
      } catch (error) {
        console.error('Error searching sliders:', error)
      }
    }

    // Search Achievements
    if (!type || type === 'achievement') {
      try {
        const achievements = await achievementModel.search(searchQuery, true)
        achievements.forEach(item => {
          results.push({
            id: item._id?.toString() || '',
            type: 'achievement',
            title: item.heading,
            description: item.description,
            url: '/',
            date: item.createdAt?.toString(),
            featured: false
          })
        })
      } catch (error) {
        console.error('Error searching achievements:', error)
      }
    }

    // Search Static Pages
    if (!type || type === 'page') {
      const staticPages = [
        {
          id: 'about',
          type: 'page' as const,
          title: 'About Us',
          description: 'Learn about Pune Customs Commissionerate, our mission, and organizational structure',
          url: '/about',
          category: 'Information'
        },
        {
          id: 'services',
          type: 'page' as const,
          title: 'Services & Forms',
          description: 'Access customs services, forms, and online tools for import/export procedures',
          url: '/services',
          category: 'Services'
        },
        {
          id: 'gallery',
          type: 'page' as const,
          title: 'Photo Gallery',
          description: 'View photos and media from Pune Customs events and activities',
          url: '/gallery',
          category: 'Media'
        },
        {
          id: 'faqs',
          type: 'page' as const,
          title: 'Frequently Asked Questions',
          description: 'Find answers to common questions about customs procedures and services',
          url: '/faqs',
          category: 'Information'
        },
        {
          id: 'contact',
          type: 'page' as const,
          title: 'Contact Us',
          description: 'Get in touch with Pune Customs for assistance and support',
          url: '/contact',
          category: 'Contact'
        },
        {
          id: 'calculator',
          type: 'page' as const,
          title: 'Duty Calculator',
          description: 'Calculate customs duty for your goods and shipments',
          url: '/calculator',
          category: 'Tools'
        },
        {
          id: 'vessel-search',
          type: 'page' as const,
          title: 'Vessel Search',
          description: 'Search for vessel arrival and departure information',
          url: '/vessel-search',
          category: 'Tools'
        },
        {
          id: 'track',
          type: 'page' as const,
          title: 'Track Application',
          description: 'Track the status of your customs applications',
          url: '/track',
          category: 'Services'
        }
      ]

      const filteredPages = staticPages.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.category.toLowerCase().includes(searchQuery.toLowerCase())
      )

      results.push(...filteredPages)
    }

    // Sort results by relevance and date
    results.sort((a, b) => {
      // Prioritize featured items
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then by date (newest first)
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      
      return 0
    })

    // Limit results
    const limitedResults = results.slice(0, limit)

    return NextResponse.json({
      success: true,
      results: limitedResults,
      total: results.length,
      query: searchQuery,
      types: {
        news: results.filter(r => r.type === 'news').length,
        notices: results.filter(r => r.type === 'notice').length,
        tenders: results.filter(r => r.type === 'tender').length,
        recruitments: results.filter(r => r.type === 'recruitment').length,
        media: results.filter(r => r.type === 'media').length,
        pages: results.filter(r => r.type === 'page').length
      }
    })

  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to perform search",
        results: [],
        total: 0
      },
      { status: 500 }
    )
  }
}
