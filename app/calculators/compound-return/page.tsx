import type { Metadata } from 'next'
import CompoundReturnCalculator from '@/components/calculators/CompoundReturnCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '복리 계산기 - 장기 적립식 투자 시뮬레이션',
  description: '초기 투자금과 월 적립금, 기대 수익률을 입력해 장기 복리 성장 결과를 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">왜 필요한가요?</h2>
    <p>복리 계산기는 장기 적립식 투자에서 시간이 얼마나 큰 차이를 만드는지 가늠할 때 가장 직관적인 도구입니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산 방식</h2>
    <p>초기 투자금과 월 적립금에 연 수익률을 월 단위로 반영해 기간이 끝날 때의 자산을 계산합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">주의사항</h2>
    <p>실제 투자 수익률은 매년 달라질 수 있으므로 이 결과는 일정한 기대 수익률을 가정한 단순 시뮬레이션으로 보세요.</p>
  </div>
)

export default function CompoundReturnPage() {
  return (
    <>
      <JsonLd name="복리 계산기" description="장기 적립식 투자와 복리 성장을 계산하는 도구" path="/calculators/compound-return" />
      <CalculatorLayout
        title="복리 계산기"
        description="초기 투자금과 월 적립금을 바탕으로 장기 복리 성장 결과를 시뮬레이션합니다."
        currentSlug="compound-return"
        explainerContent={explainer}
      >
        <CompoundReturnCalculator />
      </CalculatorLayout>
    </>
  )
}
