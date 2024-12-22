'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      })

      if (error) throw error

      setEmailSent(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      {emailSent ? (
        <div className='text-center max-w-sm w-full space-y-4'>
          <h2 className='text-2xl font-bold'>Check your email!</h2>
          <p className='text-muted-foreground'>
            We sent you a magic link to {email}
          </p>
          <div className='border rounded-lg p-4 bg-muted/50'>
            <p className='text-sm'>
              You can close this tab and click the magic link in your email to
              log in.
            </p>
          </div>
          <Button
            onClick={() => window.close()}
            variant='outline'
            className='w-full'
          >
            Close this tab
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className='flex flex-col gap-4 w-full max-w-sm'
        >
          <h1 className='text-2xl font-bold text-center'>Sign In</h1>
          <input
            type='email'
            placeholder='Your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='p-2 border rounded'
            required
          />
          <Button type='submit' disabled={loading}>
            {loading ? 'Sending magic link...' : 'Send magic link'}
          </Button>
        </form>
      )}
    </div>
  )
}
