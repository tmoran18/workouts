'use client'

import { useState } from 'react'
import { Edit, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Exercise, BodyPart, ExerciseCategory } from '@/types'
import { bodyParts, categories } from '@/constants/exercises'
import { updateExercise } from '@/app/(dashboard)/exercises/_actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface EditExerciseDialogProps {
  exercise: Exercise
  onOpenChange?: (open: boolean) => void
}

export function EditExerciseDialog({
  exercise,
  onOpenChange,
}: EditExerciseDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      await updateExercise({
        id: exercise.id,
        name: formData.get('name') as string,
        body_part: formData.get('bodyPart') as BodyPart,
        category: formData.get('category') as ExerciseCategory,
        instructions: formData.get('instructions') as string,
      })

      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        setOpen(isOpen)
        onOpenChange?.(isOpen)
      }}
    >
      <DialogTrigger asChild onClick={e => e.stopPropagation()}>
        <Button size='icon' variant='outline'>
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[calc(100%-2rem)] rounded-lg'>
        <DialogHeader className='flex flex-row justify-between items-center'>
          <DialogTitle>Edit Exercise</DialogTitle>
          <DialogClose asChild>
            <Button size='icon' variant='ghost' className='!mt-0'>
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              defaultValue={exercise.name}
              required
            />
          </div>
          <div>
            <Label htmlFor='bodyPart'>Body Part</Label>
            <Select name='bodyPart' defaultValue={exercise.body_part} required>
              <SelectTrigger>
                <SelectValue placeholder='Select body part' />
              </SelectTrigger>
              <SelectContent>
                {bodyParts.map(bodyPart => (
                  <SelectItem key={bodyPart} value={bodyPart}>
                    {bodyPart}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='category'>Category</Label>
            <Select name='category' defaultValue={exercise.category} required>
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='instructions'>Instructions</Label>
            <Textarea
              id='instructions'
              name='instructions'
              defaultValue={exercise.instructions || ''}
            />
          </div>
          <Button type='submit' disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
