import {
  BenchPressIcon,
  DeadliftIcon,
  SquatIcon,
} from '@/components/exercise-icons'
import type { ComponentType } from 'react'

// Type for our exercise icons
type ExerciseIcon = ComponentType<{ className?: string }>

export const exerciseIconsMap: Record<string, ExerciseIcon> = {
  // Chest
  'Bench Press (Barbell)': BenchPressIcon,
  // 'Incline Bench Press (Dumbbell)': BenchPressIcon,

  // Legs
  Deadlift: DeadliftIcon,
  'Squat (Barbell)': SquatIcon,
  // 'Romanian Deadlift': SquatIcon,
  // 'Leg Extension': SquatIcon,

  // Shoulders
  // 'Overhead Press': OverheadPressIcon,
  // 'Lateral Raise': OverheadPressIcon,
  // 'Face Pull': OverheadPressIcon,
} as const

export const defaultExerciseIcon = BenchPressIcon
