'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/utils/supabase/auth'
import { Button } from '@/components/ui/button'

export function SignOutButton(props: React.ComponentProps<typeof Button>) {
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
    <Button className='text-md' onClick={handleSignOut} {...props}>
      Sign Out
    </Button>
  )
}
