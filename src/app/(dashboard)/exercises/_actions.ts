'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { Exercise } from '@/types'

export async function addExercise(exercise: Omit<Exercise, 'id'>) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data, error } = await supabase
    .from('exercises')
    .insert([
      {
        ...exercise,
        user_id: user.id,
        is_custom: true,
      },
    ])
    .select()
    .single()

  if (error) throw error

  revalidatePath('/exercises')
  return data
}
