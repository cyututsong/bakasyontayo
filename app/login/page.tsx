'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './login.module.css'
import  GoogleLoginButton from './GoogleLoginButton'


export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      
      //console.log('🚀 Starting Google login process...')
      console.log('Redirect URL:', `${window.location.origin}/auth/callback`)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) {
        console.error('❌ OAuth Error:', error)
        throw error
      }

      console.log('✅ OAuth initiated successfully!')
      console.log('📤 OAuth Data:', data)
      console.log('🔗 Provider URL:', data.url)
      
      // Note: Hindi pa naka-login dito, nire-redirect pa lang sa Google
      console.log('🔄 Redirecting to Google login page...')
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google login')
      console.error('❌ Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.loginContainer} min-h-screen flex items-center justify-center bg-gray-50 `}>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-8">
          Sign In
        </h1>

        {/* Display error message kung may error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}


        <GoogleLoginButton onClick={handleGoogleLogin}  disabled={loading}/>

        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

    </div>
  )
}