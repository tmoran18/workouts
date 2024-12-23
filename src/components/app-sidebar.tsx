'use client'

import Link from 'next/link'
import { isActiveRoute } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@/components/sign-out-button'
import { Home, Dumbbell, FolderClosed, History, User } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar'

const data = {
  navItems: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Exercises',
      url: '/exercises',
      icon: Dumbbell,
    },
    {
      title: 'Programs',
      url: '/programs',
      icon: FolderClosed,
    },
    {
      title: 'History',
      url: '/history',
      icon: History,
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: User,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant='sidebar' {...props}>
      <SidebarHeader className='px-6 py-4'>
        <h1 className='text-2xl font-bold'>Workouts</h1>
      </SidebarHeader>
      <SidebarContent className='px-6 py-4 mt-4'>
        <SidebarMenu className='mt-3'>
          {data.navItems.map(({ title, url, icon: Icon }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton
                asChild
                isActive={isActiveRoute(pathname, url)}
              >
                <Link
                  href={url}
                  className='flex items-center text-lg gap-6 p-0'
                >
                  <Icon className='!w-5 !h-5' />
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton className='w-full' />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
