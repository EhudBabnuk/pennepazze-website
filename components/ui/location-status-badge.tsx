import { cn } from '@/lib/utils'

const STATUS_LABELS: Record<string, string> = {
  'opening-soon': 'Opening Soon',
  'coming-soon': 'Coming Soon',
}

interface LocationStatusBadgeProps {
  status?: string
  className?: string
}

export function LocationStatusBadge({ status, className }: LocationStatusBadgeProps) {
  if (!status || status === 'open') return null
  const label = STATUS_LABELS[status]
  if (!label) return null

  return (
    <span
      className={cn(
        'inline-flex items-center shrink-0 px-2.5 py-0.5 rounded-full',
        'border border-[#D5B13A]/50 bg-[#D5B13A]/12 text-[#C1A561]',
        'font-bold uppercase',
        className
      )}
      style={{
        fontFamily: "var(--font-heading), 'Oswald', sans-serif",
        fontSize: '0.6875rem',
        letterSpacing: '0.07em',
        lineHeight: 1.6,
      }}
    >
      {label}
    </span>
  )
}
