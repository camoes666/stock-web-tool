import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '수익률 계산할 때 수수료와 거래세를 같이 봐야 하는 이유',
  description:
    '주식 수익률을 계산할 때 수수료와 거래세를 왜 함께 봐야 하는지, 실손익이 달라지는 이유와 계산기 활용법을 예시와 함께 정리했습니다.'
}

export default function ReturnRateWithFeesGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          수익률 계산할 때 수수료와 거래세를 같이 봐야 하는 이유
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          주식 수익률을 볼 때 먼저 눈에 들어오는 숫자는 평가손익과 수익률입니다. 하지만 화면에 보이는
          수익률이 곧 실제로 남는 돈과 같지는 않습니다. 매수와 매도 과정에서 빠지는 수수료, 거래세,
          기타 비용을 함께 반영해야 비로소 실손익에 가까운 숫자를 볼 수 있습니다. 이 글에서는 비용을
          같이 봐야 하는 이유와 계산기 입력값을 어떻게 읽으면 좋은지 정리합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 수익률이 플러스인데 실제 남는 돈이 다른 이유</h2>
            <p className="mt-3">
              주가가 올랐다고 해서 그 상승분이 그대로 내 수익이 되지는 않습니다. 실제 거래에서는 매수할
              때 한 번, 매도할 때 또 한 번 비용이 붙고, 시장과 상품에 따라 거래세 같은 추가 비용도
              생깁니다. 그래서 겉으로 보이는 평가손익과 계좌에서 체감하는 결과 사이에 차이가 생길 수
              있습니다.
            </p>
            <p className="mt-3">
              특히 단기 매매처럼 거래 횟수가 많거나 수익폭이 크지 않은 경우에는 비용 비중이 더 크게
              느껴집니다. 같은 2% 수익처럼 보여도 실제로 남는 돈은 매매 조건에 따라 꽤 달라질 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 수수료와 거래세는 어떤 식으로 손익을 바꿀까</h2>
            <p className="mt-3">
              수수료는 보통 거래 금액을 기준으로 붙기 때문에 매수 금액이 크거나 매도 금액이 클수록
              영향이 커집니다. 거래세 역시 매도 금액에 따라 반영되는 경우가 많아서, 단순히 매수가와
              현재가만 비교해서는 실손익을 정확하게 보기 어렵습니다.
            </p>
            <p className="mt-3">
              흐름을 단순하게 정리하면, 매수 금액에는 매수 비용을 더하고 매도 금액에서는 매도 비용을
              뺀 뒤 그 차이를 계산한다고 보면 됩니다. 이 과정을 거치면 같은 가격 차이여도 실제 손익은
              더 작아질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 간단한 예시로 보는 실손익 차이</h2>
            <p className="mt-3">
              예를 들어 100만 원어치 주식을 샀다가 105만 원에 매도했다고 가정해 보겠습니다. 겉으로 보면
              5만 원 수익입니다. 하지만 매수 수수료와 매도 수수료, 거래세를 모두 반영하면 실제로 손에
              남는 금액은 5만 원보다 줄어듭니다. 수익폭이 작은 거래일수록 이 차이는 체감상 더 크게
              느껴집니다.
            </p>
            <p className="mt-3">
              그래서 매매를 복기할 때는 단순 수익률보다 비용 반영 후 실손익을 같이 보는 편이 훨씬
              현실적입니다. 이 관점은 <Link href="/guides/target-price-and-stop-loss" className="font-semibold text-brand-700 underline underline-offset-4">목표가와 손절가를 같이 세우는 기준</Link>을
              잡을 때도 도움이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 수익률 계산기에는 어떤 값을 넣어야 할까</h2>
            <p className="mt-3">
              수익률 계산기를 사용할 때는 매수가, 현재가 또는 매도가, 보유 수량, 그리고 매수·매도
              수수료와 거래세를 가능한 한 실제 조건에 맞게 넣는 것이 좋습니다. 증권사별로 수수료율이
              다를 수 있으므로 자주 사용하는 거래 조건에 맞춰 보는 습관이 중요합니다.
            </p>
            <p className="mt-3">
              계산 결과를 볼 때는 평가손익, 비용 반영 전 손익, 비용 반영 후 실손익, 최종 수익률을
              함께 확인해 보세요. 숫자를 나눠 보면 어떤 요소가 체감 수익을 줄였는지 더 쉽게 파악할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 비용을 같이 봐야 하는 상황</h2>
            <p className="mt-3">
              짧게 자주 매매하는 경우, 목표 수익폭이 작게 잡혀 있는 경우, 보유 금액이 큰 경우에는
              비용의 영향이 특히 커집니다. 또 여러 번 나눠 사고파는 거래는 수수료 누적 효과를 더 크게
              체감할 수 있습니다.
            </p>
            <p className="mt-3">
              계산기는 판단을 대신 내려주는 도구가 아니라 손익 구조를 정리하는 참고 도구입니다. 실제
              체결 가격과 세부 수수료 정책은 달라질 수 있으므로, 최종 판단 전에는 증권사 거래내역과
              조건을 다시 확인하는 것이 안전합니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            평가손익과 수수료 반영 실손익을 함께 확인하고 싶다면 수익률 계산기를 바로 사용해 보세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/calculators/return-rate"
              className="inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              수익률 계산기 바로 사용하기
            </Link>
            <Link
              href="/guides/target-price-and-stop-loss"
              className="inline-flex rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-white"
            >
              목표가·손절가 가이드 이어서 보기
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
