import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { getRecentWorkouts, getUserTemplates, getWeeklyStats } from './_action'
import { Plus } from 'lucide-react'
import { Stats } from './_components/stats'
import { Templates } from './_components/templates'
import { Workouts } from './_components/workouts'

export default async function Dashboard() {
  const supabase = await createClient()

  // Get current user first as we need this for other queries
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Fetch all data in parallel
  const [recentWorkouts, templates, weeklyStats] = await Promise.all([
    getRecentWorkouts(user.id),
    getUserTemplates(user.id),
    getWeeklyStats(user.id),
  ])

  return (
    <main>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
        <h1 className='text-4xl font-extrabold font-heading'>
          Workout Dashboard
        </h1>
        <Button className='w-full md:w-auto'>
          <Plus className='!w-4 !h-4' />
          Start Empty Workout
        </Button>
      </div>

      <Stats weeklyStats={weeklyStats} />
      <Templates templates={templates} />
      <Workouts workouts={recentWorkouts} />
    </main>
  )
}
