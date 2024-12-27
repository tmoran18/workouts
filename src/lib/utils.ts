import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'
import { Exercise } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isActiveRoute(pathname: string, href: string) {
  return pathname.startsWith(href)
}

export function groupExercisesByLetter(exercises: Exercise[]) {
  // Sort exercises alphabetically
  const sorted = [...exercises].sort((a, b) => a.name.localeCompare(b.name))

  // Group by first letter
  const grouped = sorted.reduce((acc, exercise) => {
    const firstLetter = exercise.name[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(exercise)
    return acc
  }, {} as Record<string, Exercise[]>)

  return grouped
}
