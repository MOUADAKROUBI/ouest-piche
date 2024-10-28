'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="main error">
          <h2>Something went wrong!</h2>
          <button className="main-button" onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}