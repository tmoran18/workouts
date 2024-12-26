import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { exerciseIconsMap, defaultExerciseIcon } from '@/constants'

export default async function ExercisesPage() {
  const supabase = await createClient()

  const { data: exercises } = await supabase.from('exercises').select('*')

  return (
    <section className=''>
      <header className='flex justify-between items-center gap-4'>
        <h1 className='text-xl font-bold font-heading'>Exercises</h1>
        <div className='flex flex-col gap-4'>
          <Button>Add Exercise</Button>
        </div>
      </header>
      <div className='flex flex-col mt-8'>
        {exercises?.map(exercise => {
          const IconComponent =
            exerciseIconsMap[exercise.name] || defaultExerciseIcon

          return (
            <div key={exercise.id} className='border-b px-4 py-2 rounded'>
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
    </section>
  )
}
