import { useEffect, useMemo, useState } from "react"

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

function getParts(targetMs: number, nowMs: number) {
  const diff = Math.max(0, targetMs - nowMs)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function CountdownPretty({ targetDate }: { targetDate: Date }) {
  const targetMs = useMemo(() => targetDate.getTime(), [targetDate])
  const [now, setNow] = useState<number>(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const { days, hours, minutes, seconds } = getParts(targetMs, now)

  const Cell = ({
    value,
    label,
  }: {
    value: string | number
    label: string
  }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#284B63]/5 rounded-xl px-3 md:px-4 py-2 md:py-3 min-w-[60px] md:min-w-[70px]">
        <span className="block text-2xl md:text-3xl font-bold text-[#284B63]">
          {value}
        </span>
      </div>
      <span className="mt-1 text-[10px] md:text-xs uppercase tracking-wider text-[#353535]/70">
        {label}
      </span>
    </div>
  )

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <Cell value={pad(days)} label="Zile" />
      <Cell value={pad(hours)} label="Ore" />
      <Cell value={pad(minutes)} label="Min" />
      <Cell value={pad(seconds)} label="Sec" />
    </div>
  )
}
