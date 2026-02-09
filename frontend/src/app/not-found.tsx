import Link from 'next/link'
import ErrorState from '@/components/atoms/error-state'

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      description="The page you are looking for does not exist or has been moved."
    >
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded bg-primary text-primary-fg h-10 px-6 text-sm font-semibold leading-6 transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </ErrorState>
  )
}
