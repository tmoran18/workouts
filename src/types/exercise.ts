export interface Exercise {
  id: string
  name: string
  body_part: string
  category: string
}

export interface Exercise {
  id: string
  name: string
  body_part: string
  category: string
  instructions?: string
  is_custom?: boolean
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
