'use client' // Error boundaries must be Client Components
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
 
  return (
    <div className='main error'>
      <h2>Something went wrong!</h2>
      <button
        className='main-button'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}