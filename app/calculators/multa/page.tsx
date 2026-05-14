import type { Metadata } from 'next'
import MultaCalculator from '@/components/calculators/MultaCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '물타기 계산기 - 추가 매수 후 평균단가 계산',
  description:
    '현재 평균단가, 보유 수량, 추가 매수가를 입력하면 새 평균단가와 총투자금, 체감 단가를 바로 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">언제 보면 좋을까요?</h2>
    <p>
      하락 구간에서 추가 매수를 고민할 때, 평균단가가 얼마나 내려가는지와 실제로 얼마를 더 넣게 되는지 빠르게 확인할 수 있습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">계산 방식</h2>
    <p>
      기존 보유 금액과 추가 매수 금액을 합산한 뒤 전체 수량으로 나눠 새 평균단가를 계산합니다. 필요하면 수수료와 기타 비용까지 반영해 체감 단가를 같이 볼 수 있습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">주의할 점</h2>
    <p>
      계산기는 숫자를 정리하는 도구이고, 실제 투자 판단에서는 종목의 하락 이유와 전체 자금 관리도 함께 확인해야 합니다.
    </p>
  </div>
)

export default function MultaPage() {
  return (
    <>
      <JsonLd
        name="물타기 계산기"
        description="추가 매수 뒤 평균단가와 총투자금을 계산하는 주식 도구"
        path="/calculators/multa"
      />
      <CalculatorLayout
        title="물타기 계산기"
        description="추가 매수 뒤 평균단가와 총투자금, 체감 단가가 어떻게 달라지는지 바로 계산합니다."
        currentSlug="multa"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('multa')}
      >
        <MultaCalculator />
      </CalculatorLayout>
    </>
  )
}
