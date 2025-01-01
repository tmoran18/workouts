'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { BodyPart, Exercise, ExerciseCategory } from '@/types'

// Create a type for updates that only includes editable fields
type ExerciseUpdate = {
  id: string
  name: string
  body_part: BodyPart
  category: ExerciseCategory
  instructions: string | null
}

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

export async function updateExercise(exercise: ExerciseUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('exercises')
    .update({
      name: exercise.name,
      body_part: exercise.body_part,
      category: exercise.category,
      instructions: exercise.instructions,
    })
    .eq('id', exercise.id)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/exercises')
  return data
}

export async function deleteExercise(exercise: Exercise) {
  const supabase = await createClient()

  const { count } = await supabase
    .from('exercise_logs')
    .select('*', { count: 'exact' })
    .eq('exercise_id', exercise.id)

  // If exercise has logs, prevent deletion
  if (count && count > 0) {
    throw new Error('Cannot delete exercise with existing logs')
  }

  const { data, error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', exercise.id)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/exercises')
  return data
}
