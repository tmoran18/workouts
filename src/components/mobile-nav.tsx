'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActiveRoute, cn } from '@/lib/utils'
import { Home, Dumbbell, FolderClosed, History, User } from 'lucide-react'

const navItems = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Exercises',
    href: '/exercises',
    icon: Dumbbell,
  },
  {
    label: 'Programs',
    href: '/programs',
    icon: FolderClosed,
  },
  {
    label: 'History',
    href: '/history',
    icon: History,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className='md:hidden fixed bottom-0 left-0 right-0 border-t bg-background'>
      <div className='flex justify-around items-center h-16'>
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full text-xs gap-1',
              isActiveRoute(pathname, href) &&
                'bg-primary text-primary-foreground'
            )}
          >
            <Icon className='h-5 w-5' />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
