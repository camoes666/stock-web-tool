import type { Metadata } from 'next'
import Link from 'next/link'
import { tools } from '@/lib/tools'

export const metadata: Metadata = {
  title: '소개',
  description:
    'Stock Web Tools가 어떤 주식 계산기를 제공하는지, 어떤 목적의 정보 지원 사이트인지 소개합니다.'
}

const calculatorTools = tools.filter((tool) => tool.category === 'calculator')

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">About</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Stock Web Tools 소개
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Stock Web Tools는 주식 투자 과정에서 자주 필요한 숫자를 빠르게 확인할 수 있도록 만든 계산기
          중심의 정보 지원 사이트입니다. 복잡한 회원가입이나 긴 설정 없이 바로 계산하고, 현재 판단에
          필요한 핵심 수치만 짧게 확인할 수 있도록 구성했습니다.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">What we offer</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            현재 제공하는 계산기
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            물타기, 수익률, 배당, 목표가, 적정가처럼 투자 중 자주 확인하는 흐름을 중심으로 계산기를
            구성하고 있습니다.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {calculatorTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">{tool.purpose}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{tool.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Principle</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              정보 지원을 위한 도구입니다
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              이 사이트의 계산 결과와 설명은 투자 판단을 돕기 위한 참고 정보입니다. 특정 종목의 매수,
              매도, 보유를 권유하는 투자 자문이나 법적 조언을 제공하지 않으며, 최종 판단과 책임은
              사용자에게 있습니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Roadmap</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              사이트는 계속 확장될 수 있습니다
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              앞으로도 투자자가 자주 찾는 계산 흐름과 설명형 콘텐츠를 바탕으로 계산기와 안내 페이지를
              조금씩 넓혀갈 예정입니다. 새로운 도구가 추가되더라도 지금과 같은 단순한 입력 구조와 짧은
              해석 중심의 경험은 유지하려고 합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
