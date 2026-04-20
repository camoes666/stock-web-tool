import type { Metadata } from 'next'
import TargetPriceCalculator from '@/components/calculators/TargetPriceCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '목표가 손절가 계산기 - 퍼센트 기준',
  description:
    '진입가와 목표 수익률, 손절률을 입력하면 목표가와 손절가를 계산할 수 있는 목표가 손절가 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">목표가/손절가 계산기 사용법</h2>
    <p>
      진입 가격 기준으로 원하는 목표 수익률과 손절률을 입력하면 미리 기준 가격을 정할 수
      있습니다. 매매 원칙을 숫자로 명확하게 잡고 싶을 때 유용합니다.
    </p>
    <p>
      수익 목표와 손절 기준을 사전에 정해 두면 감정적인 매매를 줄이는 데 도움이 됩니다.
      다만 급격한 변동성이나 갭 하락 상황에서는 계획한 가격에 체결되지 않을 수 있습니다.
    </p>
    <p>
      손절가 계산과 목표가 계산은 매매 원칙을 수치로 고정할 때 유용합니다. 특히 단기 매매나
      스윙 매매에서는 진입 전에 리스크 대비 기대 수익을 먼저 확인하는 습관이 중요합니다.
    </p>
  </div>
)

export default function TargetPricePage() {
  return (
    <>
      <JsonLd
        name="목표가 손절가 계산기"
        description="진입가 기준 목표가와 손절가를 계산합니다."
        path="/calculators/target-price"
      />
      <CalculatorLayout
        title="목표가/손절가 계산기"
        description="진입가 기준 목표가와 손절가를 빠르게 계산합니다."
        currentSlug="target-price"
        explainerContent={explainer}
      >
        <TargetPriceCalculator />
      </CalculatorLayout>
    </>
  )
}
