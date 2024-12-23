export function Header() {
  return (
    <header className='hidden md:flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6'>
      <div className='flex flex-1 items-center justify-between'>
        {/* TODO: Add something on left and user email on right */}
        <p>Something</p>
        <p>moran.tim01@gmail.com</p>
      </div>
    </header>
  )
}
