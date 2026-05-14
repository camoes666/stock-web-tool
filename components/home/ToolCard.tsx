import AnalyticsLink from '@/components/analytics/AnalyticsLink'
import type { Tool } from '@/lib/tools'

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <AnalyticsLink
      href={tool.href}
      ctaName={`tool-${tool.slug}`}
      ctaLocation={tool.featured ? 'home-featured' : 'home-secondary'}
      className="group flex min-h-[220px] flex-col rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_24px_48px_rgba(15,23,42,0.10)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl text-brand-700">
          {tool.icon}
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
          {tool.shortName}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">{tool.purpose}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">{tool.summary}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
      </div>

      <span className="mt-auto pt-8 text-sm font-semibold text-slate-900 transition group-hover:text-brand-700">
        계산기 열기 →
      </span>
    </AnalyticsLink>
  )
}
