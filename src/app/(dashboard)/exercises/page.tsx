import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { SearchInput } from '@/components/search-input-exercise'
import { ExerciseList } from '@/components/exercise-list'
import { BodyPartFilter } from '@/components/body-part-filter'
import { CategoryFilter } from '@/components/category-filter'
import { AddExerciseDialog } from '@/components/add-exercise-dialog'

// Cache this route for 1 hour and revalidate on-demand
export const revalidate = 3600

async function ExerciseData() {
  const supabase = await createClient()
  const { data: exercises } = await supabase.from('exercises').select('*')
  return <ExerciseList exercises={exercises ?? []} />
}

export default async function ExercisesPage() {
  return (
    <section className=''>
      <header className='flex justify-between items-center gap-4'>
        <h1 className='text-2xl font-bold font-heading'>Exercises</h1>
        <div className='flex flex-col gap-4'>
          <AddExerciseDialog />
        </div>
      </header>
      <div className='mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full'>
        <SearchInput />
        <div className='flex gap-2'>
          <BodyPartFilter />
          <CategoryFilter />
        </div>
      </div>
      <Suspense fallback={<div>Loading exercises...</div>}>
        <ExerciseData />
      </Suspense>
    </section>
  )
}
