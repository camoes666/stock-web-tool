import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '물타기 계산법 - 평균단가가 어떻게 바뀌는지 이해하기',
  description:
    '물타기 계산의 원리와 평균단가 변화, 간단한 예시와 주의사항을 정리한 초보자용 가이드입니다.'
}

export default function AveragingDownGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">물타기 계산법</h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          물타기는 보유 중인 종목이 하락했을 때 더 낮은 가격에 추가 매수해 평균 매입 단가를 낮추는 계산입니다. 실제로 평균단가가 얼마나 내려가는지 감으로 보기 어렵기 때문에, 추가 매수 전에 숫자를 먼저 확인하는 용도로 많이 씁니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">언제 계산이 필요할까</h2>
            <p className="mt-3">
              보유 종목의 가격이 내려간 상태에서 추가 매수를 고민할 때 가장 먼저 보는 숫자가 평균단가입니다. 같은 금액을 넣더라도 추가 매수 가격과 수량에 따라 결과가 크게 달라지기 때문에, 계산기로 먼저 확인하는 편이 안전합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">평균단가는 어떻게 바뀔까</h2>
            <p className="mt-3">
              기존 투자금과 추가 투자금을 합친 뒤 전체 보유 수량으로 나누면 됩니다. 단순히 기존 단가와 새 매수가를 평균 내는 것이 아니라, 수량이 반영된 가중 평균으로 계산해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">간단한 예시</h2>
            <p className="mt-3">
              예를 들어 10주를 10,000원에 보유 중이고 5주를 8,000원에 추가 매수한다고 가정해 보겠습니다. 기존 투자금은 100,000원, 추가 투자금은 40,000원이므로 총투자금은 140,000원입니다. 이를 15주로 나누면 새 평균단가는 약 9,333원이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">주의할 점</h2>
            <p className="mt-3">
              평균단가가 내려간다고 해서 위험이 사라지는 것은 아닙니다. 물타기 계산은 숫자를 정리하는 도구일 뿐이고, 실제 매수 판단에서는 종목이 하락한 이유와 자금 관리, 거래 비용도 함께 봐야 합니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            현재 평균단가, 보유 수량, 추가 매수가를 넣어 새 평균단가가 어떻게 바뀌는지 바로 확인할 수 있습니다.
          </p>
          <Link
            href="/calculators/multa"
            className="mt-4 inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            물타기 계산기 바로 사용하기
          </Link>
        </div>
      </article>
    </div>
  )
}
