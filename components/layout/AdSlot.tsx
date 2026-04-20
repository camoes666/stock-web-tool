'use client'

interface AdSlotProps {
  position: 'home-bottom' | 'sidebar-top' | 'sidebar-bottom' | 'footer'
  slotId?: string
}

const sizeMap: Record<AdSlotProps['position'], string> = {
  'home-bottom': 'min-h-28',
  'sidebar-top': 'min-h-40',
  'sidebar-bottom': 'min-h-40',
  footer: 'min-h-28'
}

export default function AdSlot({ position, slotId }: AdSlotProps) {
  if (slotId) {
    return (
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-format="auto"
        data-ad-slot={slotId}
        data-full-width-responsive="true"
      />
    )
  }

  return (
    <div
      className={`${sizeMap[position]} flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-xs text-slate-400`}
    >
      광고 슬롯 ({position})
    </div>
  )
}
