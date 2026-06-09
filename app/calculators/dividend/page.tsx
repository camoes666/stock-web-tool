import type { Metadata } from 'next'
import DividendCalculator from '@/components/calculators/DividendCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '배당 계산기 - 배당수익률, 월배당, 예상 배당금 계산',
  description:
    '주가, 보유 수량, 주당 배당금을 입력하면 배당수익률과 연간 예상 배당금, 월 환산 현금흐름을 바로 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">무엇을 볼 수 있나요?</h2>
    <p>배당 계산기는 보유 중인 종목이나 ETF에서 예상 배당금이 얼마나 나오는지, 현재 가격 기준 배당수익률이 어느 정도인지 빠르게 확인하는 도구입니다. 특히 월배당 ETF, 분기배당 주식, 고배당 종목을 비교할 때 유용합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산식</h2>
    <p>이 계산기에서는 주가, 보유 수량, 주당 배당금을 바탕으로 연간 예상 배당금과 배당수익률을 계산합니다. 월배당 기준으로 현금흐름을 가늠하고 싶은 경우에도 참고용으로 활용할 수 있습니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">왜 배당금도 같이 봐야 하나요?</h2>
    <p>배당수익률이 높아 보여도 실제 수령액은 보유 금액과 세금, 배당 주기에 따라 달라질 수 있습니다. 따라서 배당률만 보기보다 예상 배당금과 실제 현금흐름을 함께 확인하는 편이 좋습니다.</p>
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
        description="주가와 배당금, 보유 수량만 넣으면 배당수익률과 연간 예상 배당금을 빠르게 계산할 수 있습니다."
        currentSlug="dividend"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('dividend')}
      >
        <DividendCalculator />
      </CalculatorLayout>
    </>
  )
}
