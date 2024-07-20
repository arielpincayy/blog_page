import Link from "next/link"

export default function NoRegister() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60dvh] bg-background px-4 md:px-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">You must be registered</h1>
        <p className="text-muted-foreground md:text-xl">
          Register now to unlock all the features mmhvo.
        </p>
        <Link
          href="login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Register
        </Link>
      </div>
    </div>
  )
}