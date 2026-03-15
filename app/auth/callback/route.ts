// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'


//Updating Database Table Profiles Function After Successfull session
const updateProfile = async (supabase: any, userId: string, firstName: string, lastName: string,) => {
  const {data, error } = await supabase
    .from("profiles")
    .update({
      first_name:firstName,
      last_name:lastName
    })
    .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error)
    } else {
      console.log("Profile updated:", data);
    }
}

// Helper function to extract name parts
const extractNameParts = (fullName: string = '') => {
  const parts = fullName.split(' ')
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ')
  }
}

// Helper to prepare user data
const prepareUserData = (session: any) => {
  const { firstName, lastName } = extractNameParts(session.user.user_metadata?.full_name)
  return {
    id: session.user.id,
    email: session.user.email,
    firstName,
    lastName,
    avatar: session.user.user_metadata?.avatar_url
  }
}


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'
  const supabase = createClient()


  console.log('=== AUTH CALLBACK STARTED ===')
  console.log('📍 URL:', request.url)
  console.log('🔑 Code received:', code ? 'Yes (hidden for security)' : 'No')
  console.log('🎯 Redirect target:', redirectTo)


  if (code) {
    try {
      const supabase = await createClient()
      
      console.log('🔄 Exchanging code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('❌ Session exchange error:', error)
        throw error
      }

      console.log('✅ Session exchange successful!')
      
      // Get the session data
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) { // if session is success

          // Then in your main code:
          const userData = prepareUserData(session)

          // Check if profile exists and update
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          await updateProfile(supabase, userData.id, userData.firstName, userData.lastName)


              /*
              console.log('=== SESSION DATA ===')       
              console.log('👤 User:', {
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.full_name,
                avatar: session.user.user_metadata?.avatar_url
              })
              */
              /*
              console.log('=== TOKENS ===')
              console.log('🔐 Access Token:', session.access_token ? `${session.access_token.substring(0, 20)}...` : 'None')
              console.log('🔄 Refresh Token:', session.refresh_token ? `${session.refresh_token.substring(0, 20)}...` : 'None')
              console.log('⏰ Expires At:', new Date(session.expires_at! * 1000).toLocaleString())
              console.log('📦 Provider Token:', session.provider_token ? 'Yes (hidden)' : 'None')
              // Optional: I-store ang token sa console for debugging
              console.log('=== FULL TOKEN (for debugging) ===')
              console.log('Full Access Token:', session.access_token)
              */
      }
      return NextResponse.redirect(`${origin}${redirectTo}`) // happen the redirection to dashboard

    } catch (error) {
      console.error('❌ Callback error:', error)
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }
    
  }

  return NextResponse.redirect(`${origin}/login?error=no_code`)
}