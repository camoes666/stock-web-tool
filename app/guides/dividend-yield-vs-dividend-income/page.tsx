import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '배당수익률과 실제 배당금은 어떻게 다르게 봐야 할까',
  description:
    '배당수익률과 실제 배당금의 차이, 세전과 세후 현금흐름을 어떻게 읽으면 좋은지 배당 계산기 예시와 함께 정리했습니다.'
}

export default function DividendYieldVsIncomeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          배당수익률과 실제 배당금은 어떻게 다르게 봐야 할까
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          배당주를 볼 때 많은 사람이 먼저 배당수익률을 확인합니다. 하지만 배당수익률이 높다고 해서
          실제로 받는 배당금이 바로 떠오르지는 않습니다. 배당수익률은 비율이고, 실제 배당금은 보유
          수량과 투자금에 따라 달라지는 현금흐름입니다. 이 글에서는 두 숫자를 어떻게 같이 읽으면
          좋은지, 그리고 계산기를 어떤 기준으로 활용하면 좋은지 설명합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 배당수익률은 비율이고 배당금은 현금흐름입니다</h2>
            <p className="mt-3">
              배당수익률은 보통 주당 배당금을 현재 주가로 나눈 비율입니다. 반면 실제 배당금은 내가
              몇 주를 보유하고 있는지에 따라 달라집니다. 같은 4% 배당수익률이라도 보유 금액과 보유
              수량이 다르면 실제로 받는 금액은 완전히 달라질 수 있습니다.
            </p>
            <p className="mt-3">
              그래서 배당주를 비교할 때는 수익률만 보기보다 연간 예상 배당금과 월평균 현금흐름까지 같이
              보는 편이 훨씬 실용적입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 같은 수익률이어도 배당금이 다르게 느껴지는 이유</h2>
            <p className="mt-3">
              투자금이 100만 원일 때와 1,000만 원일 때 같은 배당수익률이 주는 체감은 크게 다릅니다.
              또 주가가 오르거나 내리면 같은 주당 배당금이어도 배당수익률은 달라질 수 있습니다. 그래서
              배당수익률은 가격 기준 비교에 유용하고, 실제 배당금은 현금흐름 계획에 더 유용한 숫자라고
              볼 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 세전 배당금과 실제 수령액은 다를 수 있습니다</h2>
            <p className="mt-3">
              배당 계산에서 자주 놓치기 쉬운 부분은 세금입니다. 계산기에서 보이는 배당금이 세전 기준인지,
              실제 계좌로 들어오는 금액을 보려면 어떤 세금과 공제를 함께 봐야 하는지 구분할 필요가
              있습니다. 해외 배당주의 경우에는 원천징수나 환율 같은 요소도 함께 체크하는 편이 좋습니다.
            </p>
            <p className="mt-3">
              배당금 자체만 보는 것보다 세후 현금흐름까지 생각해 두면 장기 투자 계획을 더 현실적으로
              세울 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 배당 계산기와 배당 재투자 계산기는 어떻게 다를까</h2>
            <p className="mt-3">
              <Link href="/calculators/dividend" className="font-semibold text-brand-700 underline underline-offset-4">배당 계산기</Link>는
              현재 보유 기준에서 예상 배당수익률과 연간 배당금을 확인하는 데 적합합니다. 반면{' '}
              <Link href="/calculators/dividend-reinvest" className="font-semibold text-brand-700 underline underline-offset-4">배당 재투자 계산기</Link>는
              받은 배당금을 다시 투자했을 때 보유 수량과 자산 규모가 어떻게 커질 수 있는지 보는 데 더
              유용합니다.
            </p>
            <p className="mt-3">
              지금 내 현금흐름을 보고 싶다면 배당 계산기부터, 장기 누적 효과를 보고 싶다면 재투자 계산기까지
              함께 보는 흐름이 자연스럽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 배당주를 볼 때 같이 체크하면 좋은 기준</h2>
            <p className="mt-3">
              배당수익률만 높다고 해서 무조건 좋은 것은 아닙니다. 배당 지속 가능성, 기업 실적, 배당 성향,
              주가 변동성까지 함께 봐야 숫자의 의미가 더 또렷해집니다. 현금흐름을 원한다면 배당금 규모를,
              자산 증식을 원한다면 재투자 가능성을 같이 보는 식으로 목적을 나눠 생각하는 편이 좋습니다.
            </p>
            <p className="mt-3">
              장기 투자 계획을 세울 때는 <Link href="/guides/compound-return-assumptions" className="font-semibold text-brand-700 underline underline-offset-4">복리 가정 해석 가이드</Link>와
              함께 보면 배당을 재투자했을 때의 성장 흐름까지 더 잘 이해할 수 있습니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            배당수익률과 연간 예상 배당금, 재투자 이후 성장 흐름까지 계산기로 함께 확인해 보세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/calculators/dividend"
              className="inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              배당 계산기 바로 사용하기
            </Link>
            <Link
              href="/calculators/dividend-reinvest"
              className="inline-flex rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-white"
            >
              배당 재투자 계산기 보기
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
