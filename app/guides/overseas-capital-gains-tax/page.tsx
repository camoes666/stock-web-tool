import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '해외주식 양도세 계산법 - 미국주식 세금, 환율, 기본공제 정리',
  description:
    '미국주식 등 해외주식 양도세를 계산할 때 필요한 매수·매도 금액, 환율, 필요경비, 기본공제, 세후 차익 계산 흐름을 정리했습니다.'
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
          미국주식이나 해외 ETF는 달러 기준으로 수익이 나도, 실제 세금과 세후 차익은 원화 환산 금액을 기준으로 봐야 흐름을 이해하기 쉽습니다. 이 가이드는 해외주식 양도세 계산기에 어떤 값을 넣어야 하는지와 결과를 어떻게 읽으면 좋은지 정리합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 해외주식 양도세 계산 전에 준비할 값</h2>
            <p className="mt-3">
              총 매수금액, 총 매도금액, 매수 시 환율, 매도 시 환율, 그리고 필요경비를 준비하면 됩니다. 여기서 매수와 매도 금액은 달러 같은 현지통화 기준으로 입력하고, 환율은 각각의 시점에 적용할 값을 별도로 넣어야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 왜 환율이 중요한가</h2>
            <p className="mt-3">
              같은 달러 수익이라도 매수 시점과 매도 시점의 환율이 다르면 원화 기준 손익이 달라질 수 있습니다. 그래서 계산기는 매수금액과 매도금액을 각각 따로 원화로 환산한 뒤 양도차익을 계산합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 기본공제와 예상 세액</h2>
            <p className="mt-3">
              기본공제와 세율은 기본값을 미리 넣어두되, 필요하면 직접 수정할 수 있게 해두는 것이 실용적입니다. 처음 쓰는 사람은 바로 예상 세액을 볼 수 있고, 기준을 알고 있는 사람은 숫자를 조정해 더 현실적인 세후 차익을 추정할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 간단한 계산 흐름</h2>
            <p className="mt-3">
              계산 흐름은 원화 매도금액에서 원화 매수금액과 필요경비를 뺀 뒤, 기본공제를 반영해 과세표준을 구하는 방식입니다. 마지막으로 과세표준에 세율을 곱하면 예상 양도세가 나오고, 양도차익에서 예상 세액을 빼면 세후 차익을 확인할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 이 계산기가 다루지 않는 것</h2>
            <p className="mt-3">
              이 계산기는 단일 거래 또는 단순 합산 기준 참고용입니다. 여러 종목 손익통산, 실제 신고 자료 정리, 필요경비 인정 범위 판단까지 대체하는 용도는 아닙니다. 신고 전에는 실제 거래내역과 최신 세법 기준을 다시 확인하는 것이 안전합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">자주 묻는 질문</h2>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">환율은 어떤 값을 넣어야 하나요?</h3>
                <p className="mt-1">
                  매수와 매도 시점에 적용할 원화 환산 기준을 각각 입력하면 됩니다. 실제 신고 기준과 다를 수 있으므로 최종 신고 전에는 증권사 거래내역과 세무 기준을 함께 확인하는 것이 좋습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">여러 종목도 계산할 수 있나요?</h3>
                <p className="mt-1">
                  현재 계산기는 단일 거래 또는 단순 합산 금액을 넣는 방식입니다. 여러 종목을 한 번에 자동 합산하는 기능은 아직 제공하지 않지만, 총 매수금액과 총 매도금액을 합산해 참고용으로 계산할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">계산 결과를 신고 금액으로 써도 되나요?</h3>
                <p className="mt-1">
                  계산 결과는 의사결정을 돕는 참고값입니다. 실제 신고 금액은 거래내역, 환율 적용 기준, 필요경비 인정 여부, 손익통산 여부에 따라 달라질 수 있습니다.
                </p>
              </div>
            </div>
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
