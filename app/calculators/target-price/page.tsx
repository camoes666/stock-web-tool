import type { Metadata } from 'next'
import TargetPriceCalculator from '@/components/calculators/TargetPriceCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '목표가 계산기 - 목표 수익률과 손절가 계산',
  description:
    '진입가와 목표 수익률, 손절 비율을 입력하면 목표가와 손절가를 함께 계산할 수 있습니다. 익절과 손절 기준을 미리 정할 때 유용합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">왜 같이 계산하나요?</h2>
    <p>목표가와 손절가를 함께 잡아두면 매수 이후의 대응 기준을 더 분명하게 세울 수 있습니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산식</h2>
    <p>목표가는 진입가에 목표 수익률을 더해 계산하고, 손절가는 진입가에서 손실 비율만큼 차감해 계산합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">주의사항</h2>
    <p>손절 비율은 100% 미만이어야 하며, 실제 매매에서는 수수료와 슬리피지까지 함께 고려하는 것이 좋습니다.</p>
  </div>
)

export default function TargetPricePage() {
  return (
    <>
      <JsonLd name="목표가 계산기" description="목표가와 손절가를 함께 계산하는 매매 기준 도구" path="/calculators/target-price" />
      <CalculatorLayout
        title="목표가 계산기"
        description="진입가 기준 목표가와 손절가를 함께 계산해 매도 기준을 미리 정리합니다."
        currentSlug="target-price"
        explainerContent={explainer}
      >
        <TargetPriceCalculator />
      </CalculatorLayout>
    </>
  )
}
