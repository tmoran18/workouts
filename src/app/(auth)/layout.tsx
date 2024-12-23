export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mx-auto container flex min-h-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
        {children}
      </div>
    </div>
  )
}
