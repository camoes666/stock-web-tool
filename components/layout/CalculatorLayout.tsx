import Link from 'next/link'
import AdSlot from '@/components/layout/AdSlot'
import { tools } from '@/lib/tools'

interface CalculatorLayoutProps {
  title: string
  description: string
  currentSlug: string
  explainerContent: React.ReactNode
  children: React.ReactNode
}

export default function CalculatorLayout({
  title,
  description,
  currentSlug,
  explainerContent,
  children
}: CalculatorLayoutProps) {
  const otherTools = tools.filter((tool) => tool.slug !== currentSlug)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">{children}</div>
        <aside className="flex w-full flex-col gap-4 lg:w-80">
          <AdSlot position="sidebar-top" />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              다른 계산기
            </h2>
            <ul className="mt-4 space-y-3">
              {otherTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3 transition hover:border-brand-500 hover:bg-brand-50"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="font-medium text-slate-800">{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <AdSlot position="sidebar-bottom" />
        </aside>
      </div>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="prose prose-slate max-w-none text-sm leading-7">{explainerContent}</div>
      </section>

      <section className="mt-8">
        <AdSlot position="footer" />
      </section>
    </div>
  )
}
