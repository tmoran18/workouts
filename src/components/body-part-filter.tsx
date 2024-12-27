'use client'

import { ChevronDown } from 'lucide-react'
import { useExerciseStore } from '@/stores'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const bodyParts = [
  'chest',
  'back',
  'legs',
  'shoulders',
  'arms',
  'core',
  'cardio',
] as const

export function BodyPartFilter() {
  const { filters, setBodyPart } = useExerciseStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='justify-between'>
          {filters.bodyPart || 'Body Part'}
          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setBodyPart(null)}>
          All
        </DropdownMenuItem>
        {bodyParts.map(bodyPart => (
          <DropdownMenuItem
            key={bodyPart}
            onClick={() => setBodyPart(bodyPart)}
          >
            {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
