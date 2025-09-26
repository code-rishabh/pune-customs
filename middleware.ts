import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

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

export const config = {
  matcher: ['/admin/:path*']
}