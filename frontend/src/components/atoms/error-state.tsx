interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = 'Unable to connect to server',
  description = 'Please check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-16 h-16 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded bg-primary text-primary-fg h-10 px-6 text-sm font-semibold leading-6 cursor-pointer transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      )}
    </div>
  )
}
