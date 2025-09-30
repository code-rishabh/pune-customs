import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname === '/admin/login'
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login'

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      return null
    }

    if (isAdminPage && !isAuth) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => {
        // Always return true here, let the middleware function handle the logic
        return true
      },
    },
  }
)

export async function middleware(request: NextRequest) {
  const protectedApiRoutes = [
    '/api/admin',
    '/api/achievements', 
    '/api/media',
    '/api/news',
    '/api/notices',
    '/api/recruitments',
    '/api/slider',
    '/api/sliders',
    '/api/tenders',
    '/api/upload',
    '/api/website-update'
  ]

  const publicGetRoutes = [
    '/api/featured',
    '/api/news',
    '/api/notices',
    '/api/tenders',
    '/api/recruitments',
    '/api/achievements'
  ]

  // Check if the request is for protected API routes
  const isProtectedRoute = protectedApiRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  const isPublicGetRoute = publicGetRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Allow public GET requests for certain routes
    if (request.method === 'GET' && isPublicGetRoute) {
      return NextResponse.next()
    }

    const token = await getToken({ req: request })
    
    // Check if user is authenticated
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Allow GET requests for all authenticated users (for reading data)
    if (request.method === 'GET') {
      return NextResponse.next()
    }

    // For non-GET requests (POST, PUT, DELETE), check admin or editor role
    if (token.role !== 'admin' && token.role !== 'editor') {
      return NextResponse.json(
        { error: 'Forbidden - Admin or Editor access required' },
        { status: 403 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/admin/:path*',
    '/api/achievements/:path*',
    '/api/featured/:path*',
    '/api/media/:path*',
    '/api/news/:path*',
    '/api/notices/:path*',
    '/api/recruitments/:path*',
    '/api/slider/:path*',
    '/api/sliders/:path*',
    '/api/tenders/:path*',
    '/api/upload/:path*',
    '/api/website-update/:path*'
  ]
}