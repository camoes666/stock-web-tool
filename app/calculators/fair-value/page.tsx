import type { Metadata } from 'next'
import FairValueCalculator from '@/components/calculators/FairValueCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '적정주가 계산기 - PER PBR 기반',
  description:
    'EPS, BPS, 목표 PER, 목표 PBR을 기반으로 PER 적정가와 PBR 적정가를 계산하는 적정주가 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">적정주가 계산기 사용법</h2>
    <p>
      EPS와 목표 PER, BPS와 목표 PBR을 입력하면 PER 기준 적정가와 PBR 기준 적정가를 각각
      계산하고 평균 적정가를 함께 보여줍니다.
    </p>
    <p>
      이 계산기는 투자 판단을 돕는 참고 도구입니다. 성장주와 자산주처럼 업종별로 중요
      지표가 다르기 때문에 다른 지표와 함께 해석하는 것이 안전합니다.
    </p>
    <p>
      적정주가 계산은 기업의 이익과 자산 가치를 기준으로 참고 가격대를 보는 방법입니다.
      PER과 PBR은 서로 다른 관점을 제공하므로 두 값을 함께 비교하면 해석에 도움이 됩니다.
    </p>
  </div>
)

export default function FairValuePage() {
  return (
    <>
      <JsonLd
        name="적정주가 계산기"
        description="PER, PBR 방식으로 종목의 적정주가를 계산합니다."
        path="/calculators/fair-value"
      />
      <CalculatorLayout
        title="적정주가 계산기"
        description="PER과 PBR 기준 적정주가를 나란히 비교합니다."
        currentSlug="fair-value"
        explainerContent={explainer}
      >
        <FairValueCalculator />
      </CalculatorLayout>
    </>
  )
}
