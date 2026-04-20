import Link from 'next/link'
import { tools } from '@/lib/tools'

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-brand-600 transition hover:text-brand-700">
          주식 계산기
        </Link>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          {tools.map((tool) => (
            <Link key={tool.slug} href={tool.href} className="transition hover:text-brand-600">
              {tool.name.replace(' 계산기', '')}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
