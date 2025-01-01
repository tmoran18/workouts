import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Stats({ weeklyStats }: { weeklyStats: any }) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
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
            {weeklyStats?.totalWeight ? `${weeklyStats.totalWeight}kg` : '0kg'}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
