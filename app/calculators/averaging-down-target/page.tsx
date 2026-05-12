import type { Metadata } from 'next'
import AveragingDownTargetCalculator from '@/components/calculators/AveragingDownTargetCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '추가 매수 계산기 - 목표 평단가 맞추기',
  description:
    '현재 평단가와 현재가, 목표 평단가를 입력하면 필요한 추가 수량과 금액을 계산할 수 있습니다. 원하는 평균단가까지 얼마나 더 매수해야 하는지 확인할 때 유용합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">무엇을 계산하나요?</h2>
    <p>원하는 목표 평단가에 도달하기 위해 현재 가격에서 얼마나 더 매수해야 하는지 수량과 금액 기준으로 계산합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산 조건</h2>
    <p>목표 평단가는 현재가보다 높고 현재 평단가보다는 낮은 구간이어야 현실적인 물타기 시나리오가 됩니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">활용 팁</h2>
    <p>물타기 계산기와 함께 보면 추가 매수 전후의 평단 변화와 필요한 자금을 한 흐름에서 비교할 수 있습니다.</p>
  </div>
)

export default function AveragingDownTargetPage() {
  return (
    <>
      <JsonLd
        name="추가 매수 계산기"
        description="목표 평단가에 필요한 추가 매수 수량과 금액을 계산하는 도구"
        path="/calculators/averaging-down-target"
      />
      <CalculatorLayout
        title="추가 매수 계산기"
        description="목표 평단가까지 낮추기 위해 필요한 추가 수량과 금액을 계산합니다."
        currentSlug="averaging-down-target"
        explainerContent={explainer}
      >
        <AveragingDownTargetCalculator />
      </CalculatorLayout>
    </>
  )
}
