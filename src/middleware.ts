import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  
  // If no session and trying to access app routes, redirect to login
  if (!sessionCookie && !request.nextUrl.pathname.startsWith('/api/auth') && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If there's a session, verify it
  if (sessionCookie) {
    const session = await decrypt(sessionCookie)
    
    // Invalid session -> back to login
    if (!session && request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // If logged in and on the login page, go to dashboard
    if (session && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Basic RBAC Example (Optional enforcement)
    if (session) {
      const role = session.role
      const path = request.nextUrl.pathname

      // Dispatcher cannot access Maintenance or Reports
      if (role === 'Dispatcher' && (path.startsWith('/maintenance') || path.startsWith('/reports'))) {
         return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // Safety Officer cannot access Dispatcher or Fuel
      if (role === 'SafetyOfficer' && (path.startsWith('/dispatcher') || path.startsWith('/fuel'))) {
         return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      // Financial Analyst cannot access Dispatcher or Vehicles/Drivers edit
      if (role === 'FinancialAnalyst' && (path.startsWith('/dispatcher') || path.startsWith('/maintenance'))) {
         return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
