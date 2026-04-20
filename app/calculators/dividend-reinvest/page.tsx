import type { Metadata } from 'next'
import DividendReinvestCalculator from '@/components/calculators/DividendReinvestCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '배당 재투자 계산기 - 배당 복리 효과',
  description:
    '배당 재투자 시 예상 보유 수량 증가와 자산 변화를 계산할 수 있는 배당 재투자 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">배당 재투자 계산기 사용법</h2>
    <p>
      현재 주가와 주당 배당금, 보유 수량, 투자 기간을 입력하면 배당을 재투자했을 때
      보유 수량과 자산이 얼마나 늘어날지 추정할 수 있습니다.
    </p>
    <p>
      계산은 매년 동일한 배당금과 동일한 주가에 재투자한다는 단순 가정으로 진행합니다.
      실제 배당 정책과 주가 변동에 따라 결과는 달라질 수 있습니다.
    </p>
    <p>
      배당 재투자 계산은 배당금을 소비하지 않고 다시 투자했을 때의 복리 효과를 보는 데
      적합합니다. 장기 배당 투자 전략을 생각할 때 누적 배당과 보유 수량 증가를 함께 보는 데
      도움이 됩니다.
    </p>
  </div>
)

export default function DividendReinvestPage() {
  return (
    <>
      <JsonLd
        name="배당 재투자 계산기"
        description="배당 재투자 시 보유 수량과 자산 증가를 계산합니다."
        path="/calculators/dividend-reinvest"
      />
      <CalculatorLayout
        title="배당 재투자 계산기"
        description="배당 재투자 시 예상 보유 수량과 자산 증가를 계산합니다."
        currentSlug="dividend-reinvest"
        explainerContent={explainer}
      >
        <DividendReinvestCalculator />
      </CalculatorLayout>
    </>
  )
}
