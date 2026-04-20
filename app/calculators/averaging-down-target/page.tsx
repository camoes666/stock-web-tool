import type { Metadata } from 'next'
import AveragingDownTargetCalculator from '@/components/calculators/AveragingDownTargetCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '추가매수 계산기 - 목표 평단가 맞추기',
  description:
    '목표 평단가까지 낮추기 위해 필요한 추가 수량과 매수 금액을 계산할 수 있는 추가매수 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">추가 매수 필요 금액 계산기 사용법</h2>
    <p>
      현재 평단가와 보유 수량, 현재가, 목표 평단가를 입력하면 목표 평단가까지 낮추기 위해
      필요한 추가 수량과 금액을 계산합니다. 물타기 전략을 더 구체적으로 계획할 때
      유용합니다.
    </p>
    <p>
      목표 평단가는 현재가보다 높고 현재 평단가보다 낮아야 계산할 수 있습니다. 실제 매수
      전에는 종목의 하락 이유가 일시적인지 반드시 다시 확인하는 것이 좋습니다.
    </p>
    <p>
      추가 매수 필요 금액 계산은 “얼마를 더 사야 평단가가 내려가는지”를 구체적으로 보는
      용도입니다. 단순히 평단가를 낮추는 것보다 총 투자금이 얼마나 늘어나는지도 함께 보는
      것이 중요합니다.
    </p>
  </div>
)

export default function AveragingDownTargetPage() {
  return (
    <>
      <JsonLd
        name="추가 매수 필요 금액 계산기"
        description="목표 평단가까지 필요한 추가 매수를 계산합니다."
        path="/calculators/averaging-down-target"
      />
      <CalculatorLayout
        title="추가 매수 필요 금액 계산기"
        description="목표 평단가까지 필요한 추가 수량과 금액을 계산합니다."
        currentSlug="averaging-down-target"
        explainerContent={explainer}
      >
        <AveragingDownTargetCalculator />
      </CalculatorLayout>
    </>
  )
}
