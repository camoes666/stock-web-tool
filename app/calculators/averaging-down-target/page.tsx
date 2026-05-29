import type { Metadata } from 'next'
import AveragingDownTargetCalculator from '@/components/calculators/AveragingDownTargetCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '평단가 계산기 - 원하는 평균단가까지 추가 매수 금액 계산',
  description:
    '목표 평균단가를 입력하면 원하는 평단가까지 맞추기 위해 필요한 추가 매수 수량과 금액을 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">무엇을 계산하나요?</h2>
    <p>평단가 계산기는 원하는 평균단가까지 낮추기 위해 얼마나 더 매수해야 하는지 계산하는 도구입니다. 단순히 물타기 후 결과를 보는 것이 아니라, 목표 평단가를 기준으로 필요한 금액을 역산할 때 유용합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산 조건</h2>
    <p>현재 보유 수량, 현재 평균단가, 목표 평균단가, 추가 매수 가격을 입력하면 필요한 추가 수량과 예상 투자금을 계산할 수 있습니다. 추가 매수 계획을 세울 때 보다 구체적인 기준을 잡는 데 도움이 됩니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">활용 팁</h2>
    <p>다만 목표 평단가를 낮추기 위해 필요한 자금이 지나치게 커질 수 있으므로, 실제 투자 판단에서는 자금 관리와 리스크를 함께 고려해야 합니다.</p>
  </div>
)

export default function AveragingDownTargetPage() {
  return (
    <>
      <JsonLd
        name="평단가 계산기"
        description="원하는 평균단가에 필요한 추가 매수 수량과 금액을 계산하는 도구"
        path="/calculators/averaging-down-target"
      />
      <CalculatorLayout
        title="평단가 계산기"
        description="원하는 평균단가까지 맞추기 위해 필요한 추가 매수 수량과 금액을 계산합니다."
        currentSlug="averaging-down-target"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('multa')}
      >
        <AveragingDownTargetCalculator />
      </CalculatorLayout>
    </>
  )
}
