// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'
  const supabase = createClient()


  console.log('=== AUTH CALLBACK STARTED ===')
  console.log('📍 URL:', request.url)
  console.log('🔑 Code received:', code ? 'Yes (hidden for security)' : 'No')
  console.log('🎯 Redirect target:', redirectTo)


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


          const fullName = session.user.user_metadata?.full_name || ''
          const nameParts = fullName.split(' ')
          const firstName = fullName.split(' ')[0]
          const lastName = nameParts.slice(1).join(' ')
          
          const userData = {
              id: session.user.id,
              email: session.user.email,
              firstName: firstName,
              lastName: lastName,
              avatar: session.user.user_metadata?.avatar_url
          }
        
        
              // Check if user profile exists
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

              //console.log('📋 Profile Data:', profile || 'No profile yet')
             await updateProfile(supabase, userData.id, userData.firstName, userData.lastName);


              /*
              console.log('=== SESSION DATA ===')       
              console.log('👤 User:', {
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.full_name,
                avatar: session.user.user_metadata?.avatar_url
              })

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


      console.log(`✅ Redirecting to: ${origin}${redirectTo}`)
      return NextResponse.redirect(`${origin}${redirectTo}`)
      
    } catch (error) {
      console.error('❌ Callback error:', error)
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }
  }

  console.log('❌ No code provided, redirecting to login')
  return NextResponse.redirect(`${origin}/login?error=no_code`)
}