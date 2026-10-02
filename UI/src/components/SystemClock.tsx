import { useEffect, useState } from 'react'

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
})

export function SystemClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <time className="system-clock" dateTime={now.toISOString()}>
      {timeFormatter.format(now)}
    </time>
  )
}
