// app/members/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function MembersDashboard() {
  const supabase = await createClient()
  

  const { data: { user } } = await supabase.auth.getUser()  // Check kung naka-login ang user
  
  /*
  console.log('Full user object:', user)
  console.log('User email:', user?.email)
  console.log('User ID:', user?.id)
  console.log('User metadata:', user?.user_metadata)
  */

  if (!user) {
    redirect('/login')
  }

  // Kunin ang additional profile data mula sa profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    
    <>
      <h1 >testing</h1>
    </>



  )
}