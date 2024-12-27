'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BodyPart, ExerciseCategory } from '@/types'
import { bodyParts, categories } from '@/constants/exercises'
import { addExercise } from '@/app/(dashboard)/exercises/_actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AddExerciseDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      await addExercise({
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='h-4 w-4' />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name' required />
          </div>
          <div>
            <Label htmlFor='bodyPart'>Body Part</Label>
            <Select name='bodyPart' required>
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
            <Select name='category' required>
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
            <Textarea id='instructions' name='instructions' />
          </div>
          <Button type='submit' disabled={loading}>
            {loading ? 'Adding...' : 'Add Exercise'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
