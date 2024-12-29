import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { getRecentWorkouts, getUserTemplates, getWeeklyStats } from './_action'
import { Ellipsis, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {weeklyStats?.totalWorkouts ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Exercises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {weeklyStats?.totalExercises ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Sets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {weeklyStats?.totalSets ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Total Reps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {weeklyStats?.totalReps ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Weight Lifted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {weeklyStats?.totalWeight
                ? `${weeklyStats.totalWeight}kg`
                : '0kg'}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Templates Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4 font-heading'>My Programs</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {templates?.map(template => (
            <div
              key={template.id}
              className='border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h3 className='font-bold text-lg'>{template.name}</h3>
                  {template.description && (
                    <p className='text-muted-foreground text-sm'>
                      {template.description}
                    </p>
                  )}
                </div>
                <Button
                  variant='outline'
                  className='text-primary hover:text-primary/80 p-2'
                >
                  <Ellipsis className='!w-5 !h-5' />
                </Button>
              </div>
              <div>
                {template.templateExercises
                  .sort((a, b) => a.order - b.order)
                  .map(te => (
                    <div key={te.id} className='flex flex-col text-sm pb-2'>
                      <span className='font-mono'>
                        {te.sets} x {te.exercise.name}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {te.exercise.bodyPart}
                      </span>
                    </div>
                  ))}
                <div className='text-sm text-muted-foreground'>
                  {template.workouts?.[0] && (
                    <div className='text-xs text-muted-foreground py-4'>
                      Last Performed:{' '}
                      {new Date(
                        template.workouts[0].completedAt!
                      ).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  )}
                </div>
                <Button className='w-full'>Start Workout</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workouts Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4 font-heading'>
          Completed Workouts
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {recentWorkouts?.map(workout => (
            <div key={workout.id} className='border p-4 rounded'>
              <h3 className='font-bold'>{workout.name}</h3>
              <p>{workout.notes}</p>
              <p>By: {workout.userId}</p>
              <p>Started: {new Date(workout.startedAt).toLocaleString()}</p>
              {workout.completedAt && (
                <p>
                  Completed: {new Date(workout.completedAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Exercise Logs Section */}
      {/* <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4 font-heading'>
          Exercise Logs
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {exerciseLogs?.map(log => (
            <div key={log.id} className='border p-4 rounded'>
              <h3 className='font-bold'>Set {log.order}</h3>
              <p>Weight: {log.weight}kg</p>
              <p>Reps: {log.reps}</p>
              {log.rpe && <p>RPE: {log.rpe}</p>}
              {log.notes && <p>Notes: {log.notes}</p>}
              <p>Workout ID: {log.workout_id}</p>
              <p>Exercise ID: {log.exercise_id}</p>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  )
}
