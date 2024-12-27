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
import { categories } from '@/constants/exercises'

export function CategoryFilter() {
  const { filters, setCategory } = useExerciseStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='justify-between'>
          {filters.category || 'Category'}
          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setCategory(null)}>
          All
        </DropdownMenuItem>
        {categories.map(category => (
          <DropdownMenuItem
            key={category}
            onClick={() => setCategory(category)}
          >
            {category
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
