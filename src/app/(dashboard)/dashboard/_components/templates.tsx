import { Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplatesProps } from '@/types/templates'

export function Templates({ templates }: TemplatesProps) {
  return (
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
                      {te.exercise.body_part}
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
  )
}
