import type { Metadata } from 'next'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import '../globals.css'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'

export const metadata: Metadata = {
  title: 'Dashboard | Workouts',
  description: 'Track your workouts and progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
      </SidebarInset>
      <MobileNav />
    </SidebarProvider>
  )
}
