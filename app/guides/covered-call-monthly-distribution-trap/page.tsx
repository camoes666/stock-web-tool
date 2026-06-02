import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '커버드콜 ETF는 월분배만 보면 안 되는 이유',
  description:
    '커버드콜 ETF는 월분배율만 높다고 좋은 투자가 아닙니다. 주가 하락, 세후 현금흐름, 계좌 차이까지 함께 봐야 하는 이유를 쉽게 정리했습니다.'
}

export default function CoveredCallMonthlyDistributionTrapGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          커버드콜 ETF는 월분배만 보면 안 되는 이유
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          커버드콜 ETF를 찾는 사람들은 먼저 월분배율을 보는 경우가 많습니다. 매달 현금이 들어온다는 점이
          직관적으로 보이기 때문입니다. 하지만 커버드콜 ETF는 월분배금만 보고 판단하면 실제 투자 결과를
          오해하기 쉽습니다. 겉으로는 분배율이 높아 보여도 주가 흐름과 세금까지 함께 보면 생각보다 남는 돈이
          다를 수 있습니다.
        </p>

        <figure className="mt-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-4">
          <Image
            src="/guides/covered-call-monthly-distribution-trap-preview.png"
            alt="커버드콜 월분배 계산기 결과 화면. 계좌별 세후 월분배 수령액과 하락, 보합, 상승 시나리오별 예상 총수익이 함께 보인다."
            width={336}
            height={879}
            className="mx-auto h-auto w-full max-w-[336px] rounded-[1.25rem] border border-slate-200 bg-white"
            priority
          />
          <figcaption className="mt-4 text-sm leading-6 text-slate-600">
            커버드콜 ETF는 월분배금만이 아니라 계좌별 세후 현금흐름과 주가 시나리오별 총수익까지 함께 봐야
            합니다.
          </figcaption>
        </figure>

        <div className="mt-8 rounded-[1.5rem] border border-brand-100 bg-brand-50/70 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">Calculator</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">직접 계산해보기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            일반계좌, ISA, 연금계좌별 세후 월분배와 하락 시나리오까지 직접 비교해보려면 계산기에서 바로
            확인해보세요.
          </p>
          <div className="mt-4">
            <Link
              href="/calculators/covered-call-distribution"
              className="inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              커버드콜 월분배 계산기 바로가기
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. 커버드콜 ETF가 인기 있는 이유</h2>
            <p className="mt-3">
              커버드콜 ETF는 일반적인 배당 ETF보다 눈에 띄는 분배금을 주는 경우가 많습니다. 매달 현금이
              들어온다는 점은 은퇴 준비, 생활비 보조, 월 현금흐름 관리 같은 목적을 가진 투자자에게 특히
              매력적으로 보일 수 있습니다. 숫자가 바로 보이기 때문에 심리적으로도 이해하기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. 월분배율만 보면 생기는 착시</h2>
            <p className="mt-3">
              문제는 월분배금이 곧 총수익을 의미하지 않는다는 점입니다. 투자자는 분배금만 받는 것이 아니라 ETF
              가격의 오르내림도 함께 겪습니다. 월분배금을 많이 받아도 주가가 그보다 더 크게 하락하면 전체
              결과는 기대보다 약할 수 있습니다. 반대로 분배금이 조금 낮아 보여도 가격 방어가 잘 되면 실제 체감
              결과는 더 나을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. 주가 하락이 총수익에 미치는 영향</h2>
            <p className="mt-3">
              그래서 커버드콜 ETF를 볼 때는 이번 달에 얼마 주는가보다 1년 뒤 실제로 얼마나 남는가를 같이 봐야
              합니다. 특히 하락 시나리오를 붙이면 더 현실적인 판단이 가능합니다. 월분배금이 꾸준히 들어와도
              기준 가격 대비 10% 하락하면 세후 분배금으로 손실이 얼마나 상쇄되는지 직접 계산해봐야 합니다.
              이 과정을 빼면 분배율만 보고 투자 매력을 과대평가하기 쉽습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. 계좌에 따라 실제 남는 돈이 달라진다</h2>
            <p className="mt-3">
              같은 커버드콜 ETF라도 일반계좌, ISA, 연금계좌 중 어디에 담느냐에 따라 실제 손에 남는 현금흐름은
              달라질 수 있습니다. 표면적인 분배금 숫자는 같아도 세후 기준으로 보면 결과가 꽤 다르게 보일 수
              있습니다. 그래서 커버드콜 ETF는 단순히 분배율이 높은 상품이 아니라 어떤 계좌에 넣고 어떤
              시나리오로 볼 것인가까지 같이 판단해야 하는 상품에 가깝습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. 계산기로 직접 확인하는 방법</h2>
            <p className="mt-3">
              투자 금액, 기준 가격, 주당 월분배금을 넣고 일반계좌, ISA, 연금계좌를 비교해보면 월 세후
              현금흐름이 어떻게 달라지는지 바로 확인할 수 있습니다. 여기에 주가 하락, 보합, 상승 시나리오까지
              같이 보면 월분배만 볼 때와 총수익까지 같이 볼 때 판단이 얼마나 달라지는지도 쉽게 보입니다.
            </p>
            <p className="mt-3">
              직접 비교해보려면{' '}
              <Link
                href="/calculators/covered-call-distribution"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                커버드콜 월분배 계산기
              </Link>
              에서 바로 확인해보세요.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">6. 결론</h2>
            <p className="mt-3">
              커버드콜 ETF는 월분배만 보면 안 됩니다. 분배금은 중요하지만 그것만으로는 부족합니다. 주가 변동,
              세후 현금흐름, 계좌 차이까지 같이 봐야 실제 투자 판단에 가까워집니다. 월분배율이 높다는 이유만으로
              접근하기보다, 실제로 얼마나 남는지 계산해보고 비교하는 습관이 더 중요합니다.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
