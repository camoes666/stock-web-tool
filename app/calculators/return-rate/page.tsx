import type { Metadata } from 'next'
import ReturnRateCalculator from '@/components/calculators/ReturnRateCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '수익률 계산기 - 주식 수익 계산, 수수료·세금 포함 실손익',
  description:
    '매수가, 현재가, 보유 수량을 입력하면 주식 수익 계산, 수익률, 수수료와 세금 반영 실손익까지 확인할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">언제 쓰면 좋을까요?</h2>
    <p>
      수익률 계산기는 주식이나 ETF 투자에서 현재 수익이 얼마나 나는지, 그리고 수수료와 세금까지 반영하면 실제로 얼마가 남는지 확인하는 계산기입니다. 단순 평가손익보다 실손익 기준으로 보고 싶은 사용자에게 특히 유용합니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">어떻게 계산하나요?</h2>
    <p>
      매수가, 현재가, 보유 수량을 입력하면 평가금액, 손익, 수익률을 계산할 수 있고, 수수료와 거래세 같은 비용을 넣으면 비용 반영 후 실제 수익까지 함께 확인할 수 있습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">입력할 때 무엇을 주의하면 좋을까요?</h2>
    <p>
      겉으로 보이는 수익률과 실제 손에 남는 금액은 다를 수 있기 때문에, 주식 수익 계산은 비용 포함 기준으로 보는 습관이 중요합니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">어디에 활용하나요?</h2>
    <p>
      목표가 계산기와 함께 보면 현재 수익 상태와 다음 매매 기준을 같은 흐름에서 확인할 수 있습니다.
    </p>
  </div>
)

export default function ReturnRatePage() {
  return (
    <>
      <JsonLd
        name="수익률 계산기"
        description="평가금액, 손익, 수익률과 실손익을 계산하는 주식 도구"
        path="/calculators/return-rate"
      />
      <CalculatorLayout
        title="수익률 계산기"
        description="주식 수익 계산과 수익률, 수수료·세금 반영 실손익까지 빠르게 확인할 수 있습니다."
        currentSlug="return-rate"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('return-rate')}
      >
        <ReturnRateCalculator />
      </CalculatorLayout>
    </>
  )
}
