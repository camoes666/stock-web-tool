export function CalculatorField({
  label,
  value,
  onChange,
  placeholder,
  step = 'any'
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  step?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
      />
    </label>
  )
}

export function ResultCard({
  label,
  value,
  tone
}: {
  label: string
  value: string
  tone: 'blue' | 'green' | 'orange' | 'rose' | 'slate'
}) {
  const toneClass = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    orange: 'bg-orange-50 text-orange-700',
    rose: 'bg-rose-50 text-rose-700',
    slate: 'bg-slate-100 text-slate-800'
  }[tone]

  return (
    <div className={`rounded-2xl p-4 text-center ${toneClass}`}>
      <div className="text-xs font-medium uppercase tracking-[0.16em] opacity-70">{label}</div>
      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  )
}
