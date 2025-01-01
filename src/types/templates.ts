import { Exercise } from './exercise'

export interface TemplateExercise {
  id: string
  order: number
  sets: number
  createdAt: Date | null
  templateId: string
  exerciseId: string
  exercise: Exercise
}

export interface Template {
  id: string
  name: string
  description: string | null
  userId: string
  createdAt: Date | null
  templateExercises: TemplateExercise[]
  workouts: {
    id: string
    completedAt: Date | null
  }[]
}

export interface TemplateWorkout {
  id: string
  userId: string
  templateId: string
  name: string
  notes: string | null
  startedAt: Date
  completedAt: Date | null
}

export interface TemplatesProps {
  templates: Template[] | null
}
