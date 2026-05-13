import type { Metadata } from 'next'
import Link from 'next/link'
import GuideCard from '@/components/guides/GuideCard'
import ToolCard from '@/components/home/ToolCard'
import AdSlot from '@/components/layout/AdSlot'
import { guides } from '@/lib/guides'
import { featuredTools, secondaryTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: '주식 계산기 모음 - 로그인 없이 바로 사용하는 투자 도구',
  description: '물타기, 배당, 수익률, 목표가 계산기를 로그인 없이 바로 사용할 수 있는 주식 계산기 허브입니다.'
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
              자주 찾는 계산기로 바로 들어가세요
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[540px] lg:grid-cols-3">
            {featuredTools.slice(0, 3).map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-brand-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{tool.purpose}</span>
                  <span className="text-brand-700">→</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{tool.shortName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Stock tools</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              지금 필요한 판단부터 빠르게 보는 주식 계산기 허브
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              계산기 이름보다 먼저 어떤 판단에 맞는지 보이도록 구성했습니다. 추가 매수, 수익 점검, 배당 흐름처럼
              바로 이해되는 이름으로 필요한 도구를 빠르게 찾을 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{featuredTools.length + secondaryTools.length}개</span>{' '}
            계산기를 같은 패턴으로 계속 확장하고 있습니다.
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
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">계속 늘어나는 계산기 목록</h3>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">같은 카드 구조로 확장</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {secondaryTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">{tool.purpose}</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">{tool.name}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Guide</p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">계산기를 더 잘 쓰는 설명 가이드</h3>
              <Link href="/guides" className="text-sm font-semibold text-brand-700 transition hover:text-brand-800">
                전체 가이드 보기
              </Link>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              계산 결과를 읽는 방법과 자주 쓰는 개념을 짧고 명확하게 정리했습니다.
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
