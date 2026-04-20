import type { Metadata } from 'next'
import Link from 'next/link'
import ToolCard from '@/components/home/ToolCard'
import AdSlot from '@/components/layout/AdSlot'
import { tools } from '@/lib/tools'

export const metadata: Metadata = {
  title: '주식 계산기 모음 - 로그인 없이 바로 사용',
  description:
    '물타기, 배당, 적정주가, 수익률, 손절가, 복리 계산기를 로그인 없이 바로 사용할 수 있는 주식 계산기 모음입니다.'
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="rounded-[2rem] border border-blue-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Stock Tools
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            로그인 없이 바로 쓰는 주식 계산기 모음
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            물타기 계산기, 배당 계산기, 적정주가 계산기부터 수익률 계산기, 목표가·손절가
            계산기, 복리 계산기까지 투자에 자주 쓰는 숫자를 빠르게 확인할 수 있게
            구성했습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="rounded-full bg-blue-50 px-3 py-1">평단가 계산</span>
            <span className="rounded-full bg-blue-50 px-3 py-1">배당수익률 계산</span>
            <span className="rounded-full bg-blue-50 px-3 py-1">평가손익 계산</span>
            <span className="rounded-full bg-blue-50 px-3 py-1">목표가·손절가 계산</span>
            <span className="rounded-full bg-blue-50 px-3 py-1">복리 수익 시뮬레이션</span>
          </div>
        </div>
      </section>

      <section className="mt-10 md:hidden">
        <ul className="space-y-3">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={tool.href}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500"
              >
                <span className="text-3xl">{tool.icon}</span>
                <div>
                  <div className="font-semibold text-slate-900">{tool.name}</div>
                  <div className="text-sm text-slate-500">{tool.description}</div>
                </div>
                <span className="ml-auto text-brand-600">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 hidden grid-cols-3 gap-6 md:grid">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">이 사이트에서 바로 할 수 있는 것</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">매수 판단 보조</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                물타기, 추가 매수 필요 금액, 적정주가 계산기로 평단가와 매수 전략을 빠르게
                검토할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">수익 관리</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                수익률 계산기와 목표가·손절가 계산기로 현재 손익과 매도 기준 가격을 바로
                확인할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">배당 전략 점검</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                배당 계산기와 배당 재투자 계산기로 배당수익률, 수령액, 재투자 효과를 함께
                비교할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">장기 투자 시뮬레이션</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                복리 수익 계산기로 초기금액과 월 적립액을 기준으로 미래 자산을 간단히
                추정할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">간단한 주식 정보</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
            <p>
              평단가 계산은 추가 매수 전략을 숫자로 검토할 때 유용하고, 수익률 계산은 현재
              보유 종목의 평가손익을 빠르게 파악하는 데 적합합니다.
            </p>
            <p>
              배당수익률은 주가 대비 배당금 비율을 의미하고, 적정주가는 PER과 PBR 같은
              지표를 활용해 참고 가격대를 추정하는 방식입니다.
            </p>
            <p>
              이 사이트의 계산 결과는 참고용이며 수수료, 세금, 실시간 시세, 기업별 특수
              상황은 반영하지 않습니다. 실제 투자 판단 전에는 재무 상태와 시장 상황을 함께
              확인하는 것이 좋습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <AdSlot position="home-bottom" />
      </section>
    </div>
  )
}
