import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className='hidden md:flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6'>
      <div className='flex flex-1 items-center justify-between'>
        {/* TODO: Add user email on right */}
        <ThemeToggle />
        <p>moran.tim01@gmail.com</p>
      </div>
    </header>
  )
}
