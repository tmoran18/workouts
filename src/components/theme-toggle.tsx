'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <span className='pt-2 pb-1 px-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 border border-black/30 rounded-sm flex items-center justify-center'>
            ☀️
          </span>
          <span className='pt-2 pb-1.5 px-2 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 border border-white/30 rounded-sm flex items-center justify-center p-2'>
            🌙
          </span>
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
