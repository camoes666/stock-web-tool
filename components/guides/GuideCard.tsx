import Link from 'next/link'
import type { Guide } from '@/lib/guides'

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={guide.href}
      className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
    >
      <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">Guide</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{guide.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{guide.excerpt}</p>
    </Link>
  )
}
