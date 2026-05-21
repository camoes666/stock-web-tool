import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PER과 PBR로 적정가를 볼 때 꼭 같이 생각해야 할 점',
  description:
    'PER과 PBR의 차이, 적정가 계산 결과를 어떻게 해석하면 좋은지, 한 가지 숫자로 판단하면 안 되는 이유를 정리했습니다.'
}

export default function FairValuePerPbrGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          PER과 PBR로 적정가를 볼 때 꼭 같이 생각해야 할 점
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          적정가 계산기는 현재 주가를 밸류에이션 관점에서 가늠해 볼 때 유용합니다. 다만 적정가는 하나의
          정답처럼 딱 떨어지는 숫자가 아니라, 어떤 기준을 넣느냐에 따라 달라지는 추정치에 가깝습니다.
          이 글에서는 PER과 PBR을 같이 볼 때 무엇을 생각해야 하는지 정리합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 적정가 계산은 왜 하나의 숫자가 아닌가</h2>
            <p className="mt-3">
              적정가는 기업의 이익, 자산, 성장성, 업종 평균, 시장 분위기 같은 여러 요소에 따라 달라질 수
              있습니다. 그래서 같은 종목을 두고도 투자자마다 다른 적정가를 생각할 수 있습니다. 계산기는
              이런 가정을 숫자로 비교하는 데 도움을 주지만, 그 자체가 정답을 보장해 주지는 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. PER과 PBR은 무엇을 다르게 보나</h2>
            <p className="mt-3">
              PER은 기업의 이익 기준에서 현재 가격이 어느 정도인지 보는 지표이고, PBR은 순자산 기준에서
              가격 수준을 보는 지표입니다. 같은 기업이라도 이익 흐름이 중요할 때와 자산 안정성이 중요할
              때 해석 포인트가 달라질 수 있습니다.
            </p>
            <p className="mt-3">
              그래서 적정가를 볼 때는 한 지표만 고집하기보다, 두 지표가 각각 어떤 관점을 보여주는지
              나눠서 생각하는 편이 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 같은 종목도 적정가가 다르게 나오는 이유</h2>
            <p className="mt-3">
              목표 PER과 목표 PBR을 어떻게 넣느냐에 따라 결과는 크게 달라집니다. 업종 평균이 높은 구간과
              낮은 구간도 다르고, 성장주와 가치주도 기준이 다를 수 있습니다. 시장 금리나 투자 심리가
              바뀌면 적정하다고 보는 배수 자체가 변할 수 있다는 점도 중요합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 적정가 계산기 입력값은 어떻게 해석하면 좋을까</h2>
            <p className="mt-3">
              EPS와 BPS는 기업 실적과 재무 상태를 압축해서 보는 출발점입니다. 여기에 목표 PER과 목표 PBR을
              넣는다는 것은, 내가 그 기업에 어느 정도 평가 배수를 적용할지 가정하는 과정입니다. 따라서
              계산 결과를 볼 때는 숫자 하나보다 어떤 가정에서 나온 값인지 함께 보는 것이 중요합니다.
            </p>
            <p className="mt-3">
              실제 매매 판단에서는 <Link href="/guides/target-price-and-stop-loss" className="font-semibold text-brand-700 underline underline-offset-4">목표가와 손절가를 함께 보는 기준</Link>도
              같이 두면 해석이 더 균형 잡히게 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 계산 결과를 맹신하지 않으려면</h2>
            <p className="mt-3">
              적정가 계산 결과는 참고 기준으로 활용하는 편이 좋습니다. 업황 악화, 실적 둔화, 성장률 변화,
              금리 환경처럼 배수를 흔드는 요소는 계속 달라질 수 있기 때문입니다. 여러 시나리오를 두고
              비교하면 한 가지 숫자에 과하게 기대지 않는 데 도움이 됩니다.
            </p>
            <p className="mt-3">
              또 현재 수익 상태를 같이 보고 싶다면 <Link href="/guides/return-rate-with-fees" className="font-semibold text-brand-700 underline underline-offset-4">실손익 가이드</Link>도
              이어서 확인해 보는 것을 추천합니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            EPS와 BPS, 목표 PER·PBR을 넣어 여러 가정에서 적정가 범위를 비교해 보세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/calculators/fair-value"
              className="inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              적정가 계산기 바로 사용하기
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
