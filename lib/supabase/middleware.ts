import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Parse options to set cookie correctly
            const cookieOptions = {
              ...options,
              // Ensure these are set for security
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const,
              path: '/',
            }
            
            request.cookies.set(name, value)
            supabaseResponse = NextResponse.next({
              request,
            })
            
            // Set cookie in response
            supabaseResponse.cookies.set(name, value, cookieOptions)
          })
        },
      },
    }
  )

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  // This is what refreshes the session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes - kung walang user at nasa protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/protected')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')

  if (isProtectedRoute && !user) {
    // Redirect to login kung walang user
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && user) {
    // Redirect to home kung may user na at pumunta sa auth pages
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse
}