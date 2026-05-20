import type { Metadata } from 'next'
import OverseasCapitalGainsCalculator from '@/components/calculators/OverseasCapitalGainsCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '해외주식 양도세 계산기 - 미국주식 세금과 세후 차익 계산',
  description:
    '미국주식 등 해외주식 매수·매도 금액, 환율, 필요경비, 기본공제를 입력해 원화 기준 양도차익과 예상 양도세, 세후 차익을 계산합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">누가 보면 좋을까요?</h2>
    <p>
      미국주식이나 해외 ETF를 매도한 뒤 원화 기준으로 실제 차익이 얼마나 남는지, 그리고 대략 어느 정도 양도세를 고려해야 하는지 빠르게 확인하고 싶은 투자자에게 맞는 계산기입니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">무엇을 입력하나요?</h2>
    <p>
      현지통화 기준 매수·매도 금액, 각각의 환율, 필요경비, 기본공제와 세율을 입력하면 계산기가 원화 환산부터 양도차익, 과세표준, 예상 세액까지 순서대로 계산합니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">왜 일반 수익률 계산기와 다를까요?</h2>
    <p>
      해외주식은 달러 기준 수익률이 같아도 환율과 공제 기준에 따라 원화 기준 세후 차익이 달라질 수 있습니다. 그래서 이 계산기는 수익률보다 실제로 남는 금액을 먼저 확인하도록 구성했습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">어디까지 계산하나요?</h2>
    <p>
      단일 거래 또는 단순 합산 기준의 참고용 계산입니다. 손익통산, 복수 계좌 정산, 실제 신고 서류 작성까지 대체하는 용도는 아닙니다.
    </p>
  </div>
)

export default function OverseasCapitalGainsPage() {
  return (
    <>
      <JsonLd
        name="해외주식 양도세 계산기"
        description="미국주식 등 해외주식의 원화 환산 차익, 기본공제, 예상 양도세와 세후 차익을 계산하는 도구"
        path="/calculators/overseas-capital-gains"
      />
      <CalculatorLayout
        title="해외주식 양도세 계산기"
        description="미국주식 등 해외주식 매도 후 환율과 필요경비, 기본공제를 반영해 원화 기준 양도차익과 예상 세액, 세후 차익을 단계별로 계산합니다."
        currentSlug="overseas-capital-gains"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('overseas-capital-gains')}
      >
        <OverseasCapitalGainsCalculator />
      </CalculatorLayout>
    </>
  )
}
