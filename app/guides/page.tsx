import type { Metadata } from 'next'
import GuideCard from '@/components/guides/GuideCard'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: '투자 계산 가이드 모음',
  description: '물타기, 배당, 수익률 계산기를 더 잘 이해하기 위한 설명형 가이드 모음입니다.'
}

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guides</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          투자 계산 가이드
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          계산기를 더 잘 이해하고 활용할 수 있도록, 실제 사용 맥락과 간단한 예시를 함께 정리한 설명형 콘텐츠입니다.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </section>
    </div>
  )
}
