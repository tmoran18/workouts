import { useState } from 'react'
import { Trash } from 'lucide-react'
import { Exercise } from '@/types/exercise'
import { Button } from '@/components/ui/button'
import { deleteExercise } from '@/app/(dashboard)/exercises/_actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function DeleteExerciseDialog({ exercise }: { exercise: Exercise }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await deleteExercise(exercise)
      setOpen(false)
    } catch (err) {
      if (err instanceof Error && err.message.includes('existing logs')) {
        setError(
          'Cannot delete this exercise because it has existing workout logs'
        )
      } else {
        setError('An error occurred while deleting the exercise')
      }
    }
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setError(null)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          onClick={e => e.stopPropagation()}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[calc(100%-2rem)] rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Exercise</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <b>{exercise.name}</b>? This action
            cannot be undone.
          </AlertDialogDescription>
          <AlertDialogDescription>
            {error && (
              <span className='text-destructive dark:text-red-500 mt-2'>
                {error}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-destructive dark:bg-red-500 hover:bg-destructive/90'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
