import type { Metadata } from 'next'
import DividendCalculator from '@/components/calculators/DividendCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '배당 계산기 - 배당수익률 및 연간 수령액',
  description:
    '주가, 주당 배당금, 보유 수량을 입력하면 배당수익률, 연간 수령액, 월 환산액을 계산할 수 있는 배당 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">배당 계산기 사용법</h2>
    <p>
      주당 배당금과 현재 주가를 기준으로 배당수익률을 계산하고, 보유 수량에 따른 연간
      수령액과 월 환산액을 함께 보여줍니다.
    </p>
    <p>
      월 환산액은 연간 수령액을 12로 나눈 참고 수치입니다. 실제 배당 지급 시점과 횟수는
      종목마다 다를 수 있으니 일정 확인이 필요합니다.
    </p>
    <p>
      배당수익률 계산은 현재 주가 대비 배당 매력을 빠르게 비교할 때 유용합니다. 다만 높은
      배당수익률이 항상 좋은 투자 기회를 의미하는 것은 아니므로 배당 지속 가능성과 실적도
      함께 살펴보는 것이 좋습니다.
    </p>
  </div>
)

export default function DividendPage() {
  return (
    <>
      <JsonLd
        name="배당 계산기"
        description="배당수익률과 연간 수령액을 바로 계산합니다."
        path="/calculators/dividend"
      />
      <CalculatorLayout
        title="배당 계산기"
        description="배당수익률, 연간 수령액, 월 환산액을 빠르게 확인합니다."
        currentSlug="dividend"
        explainerContent={explainer}
      >
        <DividendCalculator />
      </CalculatorLayout>
    </>
  )
}
