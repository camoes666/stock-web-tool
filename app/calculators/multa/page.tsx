import type { Metadata } from 'next'
import MultaCalculator from '@/components/calculators/MultaCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '물타기 계산기 - 추가 매수 후 평균단가 계산',
  description:
    '보유 수량, 현재 평균단가, 추가 매수가를 입력하면 물타기 후 평균단가와 체감 매입단가를 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">언제 보면 좋을까요?</h2>
    <p>
      물타기 계산기는 보유 중인 종목을 추가 매수했을 때 평균단가가 어떻게 바뀌는지 확인하는 계산기입니다. 주가가 하락한 구간에서 추가 매수를 고민할 때 가장 많이 찾는 계산기 중 하나입니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">계산 방식</h2>
    <p>
      현재 보유 수량, 평균단가, 추가 매수 가격과 수량을 입력하면 새 평균단가를 바로 확인할 수 있습니다. 단순 평균이 아니라 전체 보유 수량을 반영한 가중 평균 기준으로 계산해야 실제 투자금 흐름을 더 정확히 볼 수 있습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">주의할 점</h2>
    <p>
      평균단가가 내려가더라도 손실 위험이 사라지는 것은 아니므로, 물타기 계산은 추가 매수 판단을 위한 참고 숫자로 활용하는 것이 좋습니다.
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
        description="추가 매수 뒤 평균단가와 체감 매입단가가 어떻게 달라지는지 바로 계산합니다."
        currentSlug="multa"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('multa')}
      >
        <MultaCalculator />
      </CalculatorLayout>
    </>
  )
}
