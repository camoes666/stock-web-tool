import type { Metadata } from 'next'
import CompoundReturnCalculator from '@/components/calculators/CompoundReturnCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '복리 계산기 - 투자 수익 시뮬레이션',
  description:
    '초기금액, 월 적립액, 연 수익률, 투자 기간을 기준으로 미래 자산과 예상 수익을 계산하는 복리 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">복리 수익 계산기 사용법</h2>
    <p>
      초기 투자금과 월 적립액, 기대 수익률, 투자 기간을 입력하면 복리 기준 미래 자산을
      추정할 수 있습니다. 장기 투자와 적립식 투자 계획을 세울 때 특히 유용합니다.
    </p>
    <p>
      계산은 연 수익률을 월 복리 기준으로 환산해 진행합니다. 실제 수익률은 매년 일정하지
      않기 때문에 결과는 참고용 시뮬레이션으로 활용하는 것이 좋습니다.
    </p>
    <p>
      복리 계산은 장기 투자 계획을 세울 때 특히 유용합니다. 초기 투자금뿐 아니라 월 적립액을
      함께 반영하면 적립식 투자에서 시간이 주는 효과를 더 현실적으로 볼 수 있습니다.
    </p>
  </div>
)

export default function CompoundReturnPage() {
  return (
    <>
      <JsonLd
        name="복리 수익 계산기"
        description="복리 기준 미래 자산을 시뮬레이션합니다."
        path="/calculators/compound-return"
      />
      <CalculatorLayout
        title="복리 수익 계산기"
        description="복리 기준 미래 자산과 예상 수익을 계산합니다."
        currentSlug="compound-return"
        explainerContent={explainer}
      >
        <CompoundReturnCalculator />
      </CalculatorLayout>
    </>
  )
}
