import type { Metadata } from 'next'
import DividendCalculator from '@/components/calculators/DividendCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '배당 계산기 - 배당수익률과 예상 현금흐름 계산',
  description:
    '현재 주가와 주당 배당금, 보유 수량을 입력하면 배당수익률과 예상 배당 현금흐름을 계산할 수 있습니다. 배당주 투자 흐름을 점검할 때 유용합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">무엇을 볼 수 있나요?</h2>
    <p>배당수익률과 함께 연간, 월간 기준의 예상 현금흐름을 나눠 볼 수 있어 배당 중심 투자 계획을 세우기 좋습니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산식</h2>
    <p>배당수익률은 주당 배당금을 현재 주가로 나눠 계산하고, 연간 배당금은 보유 수량을 곱해 산출합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">왜 배당금도 같이 봐야 하나요?</h2>
    <p>같은 배당수익률이라도 보유 금액과 수량에 따라 실제 받는 배당금은 크게 달라질 수 있습니다. 그래서 비율과 현금흐름을 함께 보는 편이 더 실용적입니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">활용 팁</h2>
    <p>배당 재투자 계산기와 함께 보면 현금흐름뿐 아니라 장기 복리 효과까지 한 번에 비교할 수 있습니다.</p>
  </div>
)

export default function DividendPage() {
  return (
    <>
      <JsonLd name="배당 계산기" description="배당수익률과 예상 배당금을 계산하는 주식 도구" path="/calculators/dividend" />
      <CalculatorLayout
        title="배당 계산기"
        description="배당수익률과 예상 배당 현금흐름을 빠르게 계산합니다."
        currentSlug="dividend"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('dividend')}
      >
        <DividendCalculator />
      </CalculatorLayout>
    </>
  )
}
