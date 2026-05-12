import type { Metadata } from 'next'
import DividendReinvestCalculator from '@/components/calculators/DividendReinvestCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '배당 재투자 계산기 - 배당 복리 성장 계산',
  description:
    '주가와 배당금, 보유 수량, 투자 기간을 입력하면 배당 재투자 이후의 자산 증가를 계산할 수 있습니다. 배당 복리 효과를 가늠할 때 유용합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">무엇을 보여주나요?</h2>
    <p>배당금을 다시 같은 종목에 투자한다고 가정했을 때 누적 배당금, 보유 수량, 예상 자산의 변화를 확인할 수 있습니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">가정 조건</h2>
    <p>이 계산은 주가와 배당금이 일정하다고 가정한 단순 모델입니다. 실제 결과는 배당 정책과 주가 변동에 따라 달라집니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">활용 팁</h2>
    <p>배당 계산기와 함께 보면 현재 현금흐름과 장기 재투자 성장 효과를 나란히 비교하기 좋습니다.</p>
  </div>
)

export default function DividendReinvestPage() {
  return (
    <>
      <JsonLd
        name="배당 재투자 계산기"
        description="배당 재투자 이후의 보유 수량과 자산 증가를 계산하는 도구"
        path="/calculators/dividend-reinvest"
      />
      <CalculatorLayout
        title="배당 재투자 계산기"
        description="배당금을 다시 투자할 때 보유 수량과 자산이 어떻게 늘어나는지 계산합니다."
        currentSlug="dividend-reinvest"
        explainerContent={explainer}
      >
        <DividendReinvestCalculator />
      </CalculatorLayout>
    </>
  )
}
