import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/layout/AdSlot'
import ToolCard from '@/components/home/ToolCard'
import { featuredTools, secondaryTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: '주식 계산기 모음 - 로그인 없이 바로 사용하는 투자 도구',
  description:
    '물타기, 수익률, 배당, 목표가, 적정가, 복리 계산기를 한곳에서 빠르게 사용할 수 있는 주식 계산기 허브입니다. 로그인 없이 바로 계산하고 투자 판단에 필요한 핵심 수치를 확인할 수 있습니다.'
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Recently used
            </p>
            <h1 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              자주 찾는 계산기로 바로 돌아가세요
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
              지금 필요한 판단부터 고르는 주식 계산기 허브
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              계산기 이름보다 먼저 해야 할 판단에 맞춰 구성했습니다. 추가 매수, 수익 점검, 배당 예측처럼
              바로 이해되는 흐름으로 원하는 도구를 빠르게 찾을 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{featuredTools.length + secondaryTools.length}개</span>의
            계산기를 같은 패턴으로 계속 확장할 수 있습니다.
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
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
              같은 카드 구조로 확장
            </span>
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
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">빠르게 계산하고, 짧게 해석합니다</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>입력값을 넣고 바로 결과를 확인할 수 있도록 계산기 화면을 단순하게 유지합니다.</li>
              <li>결과는 핵심 수치와 짧은 해석 중심으로 보여줘서 다음 판단으로 이어가기 쉽습니다.</li>
              <li>계산식과 주의사항은 아래에서 짧게 확인하는 구조로 두어 흐름을 방해하지 않습니다.</li>
            </ul>
          </div>

          <AdSlot position="home-bottom" />
        </div>
      </section>
    </div>
  )
}
