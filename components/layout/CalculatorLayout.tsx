import AnalyticsLink from '@/components/analytics/AnalyticsLink'
import type { Guide } from '@/lib/guides'
import AdSlot from '@/components/layout/AdSlot'
import { getRelatedTools } from '@/lib/tools'

interface CalculatorLayoutProps {
  title: string
  description: string
  currentSlug: string
  explainerContent: React.ReactNode
  relatedGuides?: Guide[]
  children: React.ReactNode
}

export default function CalculatorLayout({
  title,
  description,
  currentSlug,
  explainerContent,
  relatedGuides = [],
  children
}: CalculatorLayoutProps) {
  const relatedTools = getRelatedTools(currentSlug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        <section className="space-y-6 xl:pr-6">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/82 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Calculator</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
          </div>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Guide</p>
            <div className="prose prose-slate mt-4 max-w-none text-sm leading-7">{explainerContent}</div>
          </section>

          {relatedGuides.length > 0 ? (
            <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Related guides</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">함께 읽으면 좋은 가이드</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedGuides.map((guide) => (
                  <AnalyticsLink
                    key={guide.slug}
                    href={guide.href}
                    ctaName={`guide-${guide.slug}`}
                    ctaLocation="calculator-related-guides"
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
                  >
                    <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">Guide</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
                  </AnalyticsLink>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Related tools</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">같이 보면 좋은 계산기</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <AnalyticsLink
                  key={tool.slug}
                  href={tool.href}
                  ctaName={`tool-${tool.slug}`}
                  ctaLocation="calculator-related-tools"
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
                >
                  <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">{tool.purpose}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
                </AnalyticsLink>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-5">
          {children}
          <AdSlot position="sidebar-top" />
          <AdSlot position="sidebar-bottom" />
        </aside>
      </div>

      <section className="mt-8">
        <AdSlot position="footer" />
      </section>
    </div>
  )
}
