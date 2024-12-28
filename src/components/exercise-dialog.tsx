'use client'

import { X } from 'lucide-react'
import { Exercise } from '@/types'
import { Button } from '@/components/ui/button'
import { exerciseIconsMap, defaultExerciseIcon } from '@/constants'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface ExerciseDialogProps {
  exercise: Exercise
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExerciseDialog({
  exercise,
  open,
  onOpenChange,
}: ExerciseDialogProps) {
  const IconComponent = exerciseIconsMap[exercise.name] || defaultExerciseIcon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl w-[calc(100%-2rem)] rounded-lg'>
        <DialogHeader className='flex flex-row justify-between items-center'>
          <DialogTitle className='!mt-0 text-md md:text-xl font-bold text-center'>
            {exercise.name}
          </DialogTitle>
          <DialogClose asChild>
            <Button size='icon' variant='outline' className='!mt-0'>
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>

        <Tabs defaultValue='about' className='mt-4'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='about'>About</TabsTrigger>
            <TabsTrigger value='history'>History</TabsTrigger>
            <TabsTrigger value='charts'>Charts</TabsTrigger>
          </TabsList>

          <TabsContent value='about' className='mt-6'>
            <div className='flex flex-col items-center gap-4'>
              <IconComponent className='h-24 w-24 text-primary' />
              <div className='text-center'>
                <p className='text-muted-foreground capitalize'>
                  {exercise.category} • {exercise.body_part}
                </p>
                {exercise.instructions && (
                  <p className='mt-4 text-sm'>{exercise.instructions}</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='history'>
            <div className='text-center text-muted-foreground'>
              Exercise history will be shown here
            </div>
          </TabsContent>

          <TabsContent value='charts'>
            <div className='text-center text-muted-foreground'>
              Exercise charts will be shown here
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
