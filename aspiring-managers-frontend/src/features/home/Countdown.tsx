import { useEffect, useMemo, useState } from "react"

type Props = { targetDate: Date }

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

export default function Countdown({ targetDate }: Props) {
  const target = useMemo(() => targetDate.getTime(), [targetDate])
  const [now, setNow] = useState<number>(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const delta = Math.max(0, target - now)

  const days = Math.floor(delta / (1000 * 60 * 60 * 24))
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((delta / (1000 * 60)) % 60)
  const seconds = Math.floor((delta / 1000) % 60)

  return (
    <span aria-live="polite">
      {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
    </span>
  )
}
