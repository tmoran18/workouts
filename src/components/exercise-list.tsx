'use client'

import { useExerciseStore } from '@/stores'
import { exerciseIconsMap, defaultExerciseIcon } from '@/constants'

interface Exercise {
  id: string
  name: string
  body_part: string
  category: string
}

interface ExerciseListProps {
  exercises: Exercise[]
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  const { filters } = useExerciseStore() // Get the filters object
  const { searchQuery, bodyPart, category } = filters // Destructure searchQuery from filters

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesBodyPart = !bodyPart || exercise.body_part === bodyPart
    const matchesCategory = !category || exercise.category === category
    return matchesSearch && matchesBodyPart && matchesCategory
  })

  return (
    <div className='flex flex-col mt-8 gap-2'>
      {filteredExercises.map(exercise => {
        const IconComponent =
          exerciseIconsMap[exercise.name] || defaultExerciseIcon

        return (
          <div key={exercise.id} className='border px-4 py-2 rounded'>
            <div className='flex items-center gap-6'>
              <IconComponent className='text-primary w-10 h-10' />
              <div className='flex flex-col gap-1'>
                <h3 className='font-bold'>{exercise.name}</h3>
                <p>{exercise.body_part}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
