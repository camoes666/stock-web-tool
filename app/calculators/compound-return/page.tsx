import type { Metadata } from 'next'
import CompoundReturnCalculator from '@/components/calculators/CompoundReturnCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '복리 계산기 - 장기 적립식 투자 시뮬레이션',
  description:
    '초기 투자금과 월 적립금, 기대 수익률, 투자 기간을 입력하면 미래 자산과 예상 이익을 계산할 수 있습니다. 적립식 투자 시나리오를 빠르게 점검할 때 유용합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">왜 필요한가요?</h2>
    <p>복리 계산기는 장기 적립식 투자에서 시간이 얼마나 큰 차이를 만드는지 가늠할 때 가장 직관적인 도구입니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산 방식</h2>
    <p>초기 투자금과 월 적립금에 연 수익률을 월 단위로 반영해 기간이 끝날 때의 자산을 계산합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">기대수익률은 어떻게 잡아야 하나요?</h2>
    <p>한 가지 높은 숫자보다 보수적·중립적·낙관적 시나리오를 나눠 보는 편이 더 현실적입니다. 수익률 가정이 결과를 크게 바꾸기 때문입니다.</p>
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
        description="초기 투자금과 월 적립금, 기대 수익률을 바탕으로 미래 자산과 예상 이익을 시뮬레이션합니다."
        currentSlug="compound-return"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('compound-return')}
      >
        <CompoundReturnCalculator />
      </CalculatorLayout>
    </>
  )
}
