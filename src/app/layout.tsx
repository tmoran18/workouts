import type { Metadata } from 'next'
import { Outfit, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
})

export const metadata: Metadata = {
  title: 'Workouts | Your Workout Tracker',
  description: 'Track your workouts and progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${outfit.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
