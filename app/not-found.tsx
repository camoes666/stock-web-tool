import Link from 'next/link'
import NotFoundTracker from '@/components/analytics/NotFoundTracker'

export default function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The page you tried to open does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Go home
          </Link>
          <Link
            href="/guides"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            Browse guides
          </Link>
        </div>
      </div>
    </>
  )
}
