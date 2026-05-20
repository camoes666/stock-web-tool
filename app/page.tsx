import type { Metadata } from 'next'
import GuideCard from '@/components/guides/GuideCard'
import ToolCard from '@/components/home/ToolCard'
import AnalyticsLink from '@/components/analytics/AnalyticsLink'
import AdSlot from '@/components/layout/AdSlot'
import { guides } from '@/lib/guides'
import { featuredTools, secondaryTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: '주식 계산기 모음 - 수수료와 세금까지 보는 실손익 계산기',
  description:
    '물타기, 수익률, 해외주식 양도세, 배당, 목표가까지 수수료와 세금을 고려해 실제로 남는 돈을 확인하는 주식 계산기 허브입니다.'
}

export default function HomePage() {
  const featuredGuide = guides[0]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Recently used</p>
            <h1 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              자주 찾는 계산기로 바로 들어가 보세요
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[540px] lg:grid-cols-3">
            {featuredTools.slice(0, 3).map((tool) => (
              <AnalyticsLink
                key={tool.slug}
                href={tool.href}
                ctaName={`tool-${tool.slug}`}
                ctaLocation="home-recent"
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-brand-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{tool.purpose}</span>
                  <span className="text-brand-700">→</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{tool.shortName}</p>
              </AnalyticsLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Stock tools</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              수익률 말고, 실제로 남는 돈을 계산하세요
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              수수료, 거래세, 환율, 해외주식 양도세처럼 체감 수익을 바꾸는 비용을 함께 봅니다. 추가 매수,
              수익률, 배당 흐름부터 세후 차익까지 실제 판단에 필요한 숫자를 빠르게 확인하세요.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{featuredTools.length + secondaryTools.length}개</span> 계산기를
            실손익 관점으로 계속 다듬고 있습니다.
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">All tools</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">실전 판단에 맞춘 계산기 목록</h3>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">비용 반영 흐름 강화</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {secondaryTools.map((tool) => (
              <AnalyticsLink
                key={tool.slug}
                href={tool.href}
                ctaName={`tool-${tool.slug}`}
                ctaLocation="home-secondary"
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">{tool.purpose}</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">{tool.name}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              </AnalyticsLink>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Guide</p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">세금과 비용까지 이해하는 설명 가이드</h3>
              <AnalyticsLink
                href="/guides"
                ctaName="guide-index"
                ctaLocation="home-guides-link"
                className="text-sm font-semibold text-brand-700 transition hover:text-brand-800"
              >
                전체 가이드 보기
              </AnalyticsLink>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              수익률과 실손익이 달라지는 이유, 해외주식 세금처럼 자주 헷갈리는 개념을 짧고 명확하게 정리했습니다.
            </p>
            {featuredGuide ? (
              <div className="mt-5">
                <GuideCard guide={featuredGuide} />
              </div>
            ) : null}
          </div>

          <AdSlot position="home-bottom" />
        </div>
      </section>
    </div>
  )
}
