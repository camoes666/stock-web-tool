import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '해외주식 양도세 계산법 - 환율과 기본공제를 어떻게 반영할까',
  description:
    '해외주식 양도세 계산기에 넣어야 할 값, 환율 적용 방식, 기본공제와 예상 세액 계산 흐름을 쉽게 정리한 가이드입니다.'
}

export default function OverseasCapitalGainsTaxGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          해외주식 양도세 계산법
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          해외주식은 현지통화 기준으로 사고팔더라도, 세금은 보통 원화 기준 차익으로 생각해야 흐름을 이해하기 쉽습니다. 이 가이드는 어떤 숫자를 준비해야 하는지와 계산기가 어디까지 다루는지 간단하게 정리합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 먼저 준비할 값</h2>
            <p className="mt-3">
              총 매수금액, 총 매도금액, 매수 시 환율, 매도 시 환율, 그리고 필요경비를 준비하면 됩니다. 여기서 매수와 매도 금액은 현지통화 기준으로 입력하고, 환율은 각각의 시점에 적용할 값을 별도로 넣어야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 왜 환율이 중요한가</h2>
            <p className="mt-3">
              같은 달러 금액이라도 환율이 달라지면 원화 기준 손익이 크게 달라질 수 있습니다. 그래서 계산기는 매수금액과 매도금액을 각각 따로 원화로 환산한 뒤 차익을 계산합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 기본공제와 예상 세액</h2>
            <p className="mt-3">
              기본공제와 세율은 기본값을 미리 넣어두고, 필요하면 사용자가 직접 수정할 수 있게 하는 것이 가장 실용적입니다. 이렇게 하면 처음 쓰는 사람은 바로 계산할 수 있고, 이미 기준을 아는 사람은 숫자를 조정해 더 현실적인 추정을 해볼 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 이 계산기가 다루지 않는 것</h2>
            <p className="mt-3">
              이 계산기는 단일 거래 또는 단순 합산 기준 참고용입니다. 여러 종목 손익통산, 실제 신고 자료 정리, 필요경비 인정 범위 판단까지 대체하는 용도는 아닙니다. 신고 전에는 실제 거래내역과 최신 세법 기준을 다시 확인하는 것이 안전합니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            매수·매도 금액과 환율을 넣어 원화 기준 양도차익과 예상 세액을 바로 확인해 보세요.
          </p>
          <Link
            href="/calculators/overseas-capital-gains"
            className="mt-4 inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            해외주식 양도세 계산기 바로 사용하기
          </Link>
        </div>
      </article>
    </div>
  )
}
