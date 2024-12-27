'use client'

import { Search } from 'lucide-react'
import { useExerciseStore } from '@/stores'
import { Input } from '@/components/ui/input'

export function SearchInput() {
  const { filters, setSearchQuery } = useExerciseStore()

  return (
    <div className='relative w-full md:max-w-sm'>
      <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Search exercises...'
        className='pl-8 lg:max-w-sm'
        value={filters.searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
