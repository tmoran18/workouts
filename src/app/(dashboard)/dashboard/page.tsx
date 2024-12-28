import { createClient } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()

  // Get current user first as we need this for other queries
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Fetch all data in parallel
  const [exercisesData, templatesData, workoutsData, exerciseLogsData] =
    await Promise.all([
      supabase.from('exercises').select('*'),
      supabase.from('workout_templates').select('*'),
      supabase.from('workouts').select('*'),
      supabase.from('exercise_logs').select('*'),
    ])

  // Destructure the data
  const { data: exercises } = exercisesData
  const { data: templates } = templatesData
  const { data: workouts } = workoutsData
  const { data: exerciseLogs } = exerciseLogsData

  return (
    <main className='p-8'>
      <h1 className='text-4xl font-extrabold mb-6 font-heading'>
        Workout Dashboard
      </h1>
      <div className='py-4 flex items-center justify-between items-center gap-4'>
        <p>Logged in as: {user?.email}</p>
      </div>
      {/* Exercises Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4 font-heading'>Exercises</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {exercises?.map(exercise => (
            <div key={exercise.id} className='border p-4 rounded'>
              <h3 className='font-bold'>{exercise.name}</h3>
              <p>Category: {exercise.category}</p>
              <p>Created by: {exercise.user_id}</p>
              <p>Custom: {exercise.is_custom ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4 font-heading'>
          Workout Templates
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {templates?.map(template => (
            <div key={template.id} className='border p-4 rounded'>
              <h3 className='font-bold'>{template.name}</h3>
              <p>{template.description}</p>
              <p>Created by: {template.user_id}</p>
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
          {workouts?.map(workout => (
            <div key={workout.id} className='border p-4 rounded'>
              <h3 className='font-bold'>{workout.name}</h3>
              <p>{workout.notes}</p>
              <p>By: {workout.user_id}</p>
              <p>Started: {new Date(workout.started_at).toLocaleString()}</p>
              {workout.completed_at && (
                <p>
                  Completed: {new Date(workout.completed_at).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Exercise Logs Section */}
      <section className='mb-8'>
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
      </section>
    </main>
  )
}
