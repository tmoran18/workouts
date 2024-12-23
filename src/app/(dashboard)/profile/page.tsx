import { ThemeToggle } from '@/components/theme-toggle'

export default function ProfilePage() {
  return (
    <section>
      <h1 className='text-4xl font-bold font-heading'>Profile</h1>
      <div className='block md:hidden'>
        <ThemeToggle />
      </div>
    </section>
  )
}
