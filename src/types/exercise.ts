export interface Exercise {
  id: string
  name: string
  body_part: string
  category: string
  instructions: string | null
  is_custom: boolean | null
  userId: string
  createdAt: Date | null
}

export type ExerciseCategory =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'kettlebell'
  | 'resistance_band'
  | 'smith_machine'

export type BodyPart =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'cardio'

export interface ExerciseListProps {
  exercises: Exercise[]
}
