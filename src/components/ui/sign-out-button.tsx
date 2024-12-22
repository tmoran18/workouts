'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/utils/supabase/auth'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.refresh()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button onClick={handleSignOut} size='sm'>
      Sign Out
    </Button>
  )
}
