import Link from 'next/link'
import { featuredTools } from '@/lib/tools'

export default function Navbar() {
  return (
    <nav className="border-b border-white/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-700 text-sm font-bold text-white">
            ST
          </span>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-950">주식 계산기</div>
            <div className="text-sm text-slate-500">빠르게 판단하는 투자 도구 모음</div>
          </div>
        </Link>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {featuredTools.map((tool) => (
            <Link key={tool.slug} href={tool.href} className="transition hover:text-brand-700">
              {tool.shortName}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
