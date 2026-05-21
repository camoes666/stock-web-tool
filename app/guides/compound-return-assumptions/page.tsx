import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '복리 계산기에서 기대수익률을 너무 높게 잡으면 안 되는 이유',
  description:
    '복리 계산기의 기대수익률 가정이 결과를 얼마나 크게 바꾸는지, 현실적인 범위를 어떻게 해석하면 좋은지 정리했습니다.'
}

export default function CompoundReturnAssumptionsGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          복리 계산기에서 기대수익률을 너무 높게 잡으면 안 되는 이유
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          복리 계산기는 장기 투자 계획을 세울 때 매우 직관적인 도구입니다. 다만 기대수익률을 어떻게
          넣느냐에 따라 결과가 크게 달라지기 때문에, 숫자를 해석하는 기준이 필요합니다. 이 글에서는 왜
          과도하게 높은 기대수익률이 위험할 수 있는지, 그리고 현실적인 가정을 어떻게 잡으면 좋은지
          정리합니다.
        </p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 복리 계산기가 인기 많은 이유</h2>
            <p className="mt-3">
              복리 계산기는 초기 투자금, 월 적립금, 투자 기간이 시간이 지나며 얼마나 커질 수 있는지 한눈에
              보여줍니다. 특히 적립식 투자자는 긴 시간 동안 작은 차이가 얼마나 큰 결과로 이어지는지
              체감하기 어려운데, 복리 계산은 그 흐름을 숫자로 정리해 줍니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 기대수익률이 결과를 크게 바꾸는 이유</h2>
            <p className="mt-3">
              복리는 기간이 길수록 작은 수익률 차이도 크게 벌어지게 만듭니다. 연 5%와 연 10%는 당장
              1년 결과만 보면 차이가 작아 보여도, 10년 이상 누적되면 최종 자산 규모 차이가 매우 커질 수
              있습니다. 그래서 기대수익률을 조금 높게 잡는 것만으로도 계산 결과는 훨씬 낙관적으로
              보일 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 너무 높은 수익률 가정이 위험한 이유</h2>
            <p className="mt-3">
              실제 시장 수익률은 매년 일정하지 않습니다. 어떤 해에는 큰 수익이 나더라도, 다른 해에는
              하락하거나 횡보할 수 있습니다. 그런데 계산기에서 높은 기대수익률을 고정값으로 넣으면 마치
              미래가 안정적으로 보장되는 것처럼 느껴질 수 있습니다.
            </p>
            <p className="mt-3">
              이 착시는 투자 계획을 과도하게 낙관적으로 만들 수 있습니다. 목표 자산 규모, 은퇴 계획,
              월 적립 목표를 잡을 때 실제보다 쉬워 보이게 만들 수 있기 때문입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 현실적인 기대수익률은 어떻게 잡으면 좋을까</h2>
            <p className="mt-3">
              한 가지 숫자만 정답처럼 넣기보다, 보수적·중립적·낙관적 시나리오를 나눠 보는 방식이 더
              현실적입니다. 예를 들어 같은 적립 계획을 두고 수익률을 다르게 넣어 비교해 보면, 내 계획이
              어느 정도 변동성까지 버틸 수 있는지 가늠하기 쉬워집니다.
            </p>
            <p className="mt-3">
              배당을 함께 고려하는 투자자라면 <Link href="/guides/dividend-yield-vs-dividend-income" className="font-semibold text-brand-700 underline underline-offset-4">배당수익률과 현금흐름 가이드</Link>를
              같이 보며 재투자 가능성을 연결해 생각하는 것도 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 복리 계산기는 계획 점검 도구로 쓰는 편이 좋습니다</h2>
            <p className="mt-3">
              복리 계산기의 강점은 미래를 맞히는 것이 아니라, 가정이 바뀌면 결과가 어떻게 달라지는지
              보여준다는 점입니다. 기대수익률, 적립금, 기간 중 어떤 요소가 가장 큰 영향을 주는지 파악하면
              장기 계획을 더 현실적으로 조정할 수 있습니다.
            </p>
            <p className="mt-3">
              계산 결과는 확정 수익이 아니라 시뮬레이션이라는 점을 항상 기억해 두는 것이 좋습니다.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <h2 className="text-lg font-semibold text-slate-950">직접 계산해 보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            복리 계산기에서 수익률 가정을 바꿔 보며 장기 투자 계획이 어떻게 달라지는지 확인해 보세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/calculators/compound-return"
              className="inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              복리 계산기 바로 사용하기
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
