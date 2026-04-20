import Link from 'next/link'
import type { Tool } from '@/lib/tools'

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group flex min-h-[240px] flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.16)]"
    >
      <span className="text-4xl">{tool.icon}</span>
      <h2 className="mt-5 text-xl font-bold text-slate-900">{tool.name}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{tool.description}</p>
      <span className="mt-auto pt-8 text-sm font-semibold text-brand-600 transition group-hover:text-brand-700">
        바로 계산하기 →
      </span>
    </Link>
  )
}
