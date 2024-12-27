'use client'
import { useState } from 'react'
import { Exercise } from '@/types'
import { useExerciseStore } from '@/stores'
import { ExerciseListProps } from '@/types'
import { groupExercisesByLetter } from '@/lib/utils'
import { ExerciseDialog } from '@/components/exercise-dialog'
import { exerciseIconsMap, defaultExerciseIcon } from '@/constants'
export function ExerciseList({ exercises }: ExerciseListProps) {
  const { filters } = useExerciseStore() // Get the filters object
  const { searchQuery, bodyPart, category } = filters // Destructure searchQuery from filters
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  )

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesBodyPart = !bodyPart || exercise.body_part === bodyPart
    const matchesCategory = !category || exercise.category === category
    return matchesSearch && matchesBodyPart && matchesCategory
  })

  const groupedExercises = groupExercisesByLetter(filteredExercises)

  return (
    <>
      <div className='flex flex-col mt-8 gap-8'>
        {Object.entries(groupedExercises).map(([letter, exercises]) => (
          <div key={letter} className='flex flex-col gap-2'>
            <h2 className='text-lg font-light text-primary'>{letter}</h2>
            <div className='flex flex-col gap-2'>
              {exercises.map(exercise => {
                const IconComponent =
                  exerciseIconsMap[exercise.name] || defaultExerciseIcon

                return (
                  <button
                    key={exercise.id}
                    onClick={() => setSelectedExercise(exercise)}
                    className='border px-4 py-2 rounded'
                  >
                    <div className='flex items-center gap-6'>
                      <IconComponent className='text-primary w-10 h-10' />
                      <div className='flex flex-col gap-1 items-start'>
                        <h3 className='font-bold'>{exercise.name}</h3>
                        <p>{exercise.body_part}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedExercise && (
        <ExerciseDialog
          exercise={selectedExercise}
          open={!!selectedExercise}
          onOpenChange={open => !open && setSelectedExercise(null)}
        />
      )}
    </>
  )
}
