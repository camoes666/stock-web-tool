import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '목표가만 보지 말고 손절가를 함께 계산해야 하는 이유',
  description:
    '목표가와 손절가를 함께 계산해야 하는 이유, 기대수익과 기대손실을 같이 보는 방법을 예시와 함께 정리했습니다.'
}

export default function TargetPriceAndStopLossGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          목표가만 보지 말고 손절가를 함께 계산해야 하는 이유
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          매수 전에 목표가를 정하는 습관은 중요하지만, 목표가만 보고 들어가면 리스크 관리가 빠지기 쉽습니다.
          목표 수익이 얼마인지뿐 아니라, 어느 지점에서 손실을 제한할 것인지도 함께 정해 두어야 실제
          대응 기준이 생깁니다. 이 글에서는 목표가와 손절가를 같이 계산해야 하는 이유를 정리합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 목표가만 보면 생기는 착시</h2>
            <p className="mt-3">
              목표가만 정하면 기대수익은 보이지만, 그 거래에서 감수해야 하는 손실 범위는 보이지 않습니다.
              같은 10% 목표수익을 노리는 거래라도 손절 기준이 -3%인지 -10%인지에 따라 성격이 완전히
              달라집니다. 그래서 목표가만으로는 거래의 균형을 판단하기 어렵습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 손절가를 같이 정해야 대응 기준이 생깁니다</h2>
            <p className="mt-3">
              손절가는 손실을 줄이기 위한 장치이면서, 계획 없이 흔들리는 매매를 줄이는 기준이기도 합니다.
              미리 손절가를 정해 두면 하락 구간에서 감정적으로 대응할 가능성을 줄일 수 있습니다. 반대로
              손절 기준이 없으면 물타기나 추가 매수 판단도 더 혼란스러워질 수 있습니다.
            </p>
            <p className="mt-3">
              이 부분은 <Link href="/guides/averaging-down" className="font-semibold text-brand-700 underline underline-offset-4">물타기 계산법 가이드</Link>와
              함께 보면 추가 매수 판단을 더 차분하게 정리하는 데 도움이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 기대수익과 기대손실을 같이 비교하는 방법</h2>
            <p className="mt-3">
              진입가가 10,000원이고 목표가를 11,000원, 손절가를 9,500원으로 잡았다면 기대수익은 10%,
              기대손실은 5%입니다. 이런 식으로 같은 거래 안에서 상승 여력과 하락 리스크를 함께 보면
              계획의 균형이 더 잘 보입니다. 수익 기회만 보는 것보다 손실 폭까지 숫자로 확인하는 편이
              훨씬 실전적입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 목표가 계산기에는 무엇을 넣으면 좋을까</h2>
            <p className="mt-3">
              보통 진입가, 목표 수익률, 손절 비율을 넣으면 목표가와 손절가를 같이 확인할 수 있습니다.
              여기서 중요한 점은 숫자를 단순히 크게 잡는 것이 아니라, 내 투자 기간과 변동성 감내 수준에
              맞는 기준을 넣는 것입니다. 너무 높은 목표가와 너무 넓은 손절가는 계획을 흐리게 만들 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 실제 매매에서는 비용과 손익도 함께 확인해야 합니다</h2>
            <p className="mt-3">
              목표가와 손절가를 정했다면, 그다음에는 비용을 반영한 실손익도 같이 보는 편이 좋습니다.
              수수료와 거래세를 반영하면 기대수익 폭이 생각보다 줄어들 수 있기 때문입니다. 이때는{' '}
              <Link href="/guides/return-rate-with-fees" className="font-semibold text-brand-700 underline underline-offset-4">수익률과 비용 가이드</Link>를
              같이 보면 더 자연스럽게 이어집니다.
            </p>
            <p className="mt-3">
              계산 결과는 매매를 대신 결정해 주는 정답이 아니라, 대응 기준을 사전에 정리하는 참고값으로
              활용하는 것이 좋습니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            진입가 기준 목표가와 손절가를 함께 계산해서 매매 기준을 미리 정리해 보세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/calculators/target-price"
              className="inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              목표가 계산기 바로 사용하기
            </Link>
            <Link
              href="/guides/return-rate-with-fees"
              className="inline-flex rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-white"
            >
              실손익 가이드 이어서 보기
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
