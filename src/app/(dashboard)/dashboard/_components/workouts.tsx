export function Workouts({ workouts }: { workouts: any }) {
  return (
    <section className='mb-8'>
      <h2 className='text-xl font-semibold mb-4 font-heading'>
        Completed Workouts
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {workouts?.map(workout => (
          <div key={workout.id} className='border p-4 rounded'>
            <h3 className='font-bold'>{workout.name}</h3>
            <p>{workout.notes}</p>
            <p>By: {workout.userId}</p>
            <p>Started: {new Date(workout.startedAt).toLocaleString()}</p>
            {workout.completedAt && (
              <p>Completed: {new Date(workout.completedAt).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
