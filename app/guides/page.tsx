import type { Metadata } from 'next'
import GuideCard from '@/components/guides/GuideCard'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: '투자 계산 가이드 모음',
  description: '주식 계산기를 더 쉽게 이해하고 활용할 수 있도록 정리한 설명형 가이드 모음입니다.'
}

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guides</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">투자 계산 가이드</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          계산기를 더 쉽게 이해하고 활용할 수 있도록 실제 사용 맥락, 계산 기준, 간단한 예시, 주의사항을
          함께 정리한 설명형 콘텐츠입니다. 수익률, 배당, 목표가, 복리, 세금처럼 자주 헷갈리는 숫자를
          도구 사용법과 함께 읽을 수 있게 구성했습니다.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
          현재 {guides.length}개의 가이드를 운영 중이며, 각 글에서 관련 계산기로 바로 이어질 수 있도록
          내부 링크를 함께 제공합니다.
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
