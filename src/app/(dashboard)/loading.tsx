import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingExercises() {
  return (
    <section className=''>
      <header className='flex justify-between items-center gap-4'>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='h-10 w-10' />
      </header>

      <div className='mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full'>
        <Skeleton className='h-10 w-full md:w-[384px]' />
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>

      <div className='flex flex-col mt-8 gap-8'>
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-8' />
            <div className='flex flex-col gap-2'>
              {[...Array(4)].map((_, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  className='flex justify-between border px-4 py-2 rounded'
                >
                  <div className='flex items-center gap-6'>
                    <Skeleton className='h-10 w-10 rounded' />
                    <div className='flex flex-col gap-1'>
                      <Skeleton className='h-5 w-32' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
