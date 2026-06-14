import type { Metadata } from 'next'
import OverseasCapitalGainsCalculator from '@/components/calculators/OverseasCapitalGainsCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { getGuidesForTool } from '@/lib/guides'

export const metadata: Metadata = {
  title: '미국주식 양도세 계산기 | 해외주식 세금 계산, 기본공제 반영',
  description:
    '미국주식과 해외주식 매매 차익에 대한 예상 양도세를 계산해보세요. 기본공제, 필요경비, 세후 실수령 금액까지 한 번에 확인할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">미국주식 양도세 계산이 왜 필요한가요?</h2>
    <p>
      미국주식을 매도할 때는 수익률만 보는 것보다 원화 기준 양도차익, 기본공제, 예상 세액까지 함께 봐야 실제로 얼마가 남는지 판단하기 쉽습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">이 계산기로 무엇을 확인할 수 있나요?</h2>
    <p>
      매수금액, 매도금액, 환율, 필요경비를 입력하면 예상 양도차익, 기본공제 반영 후 과세 대상 금액, 예상 세액, 세후 실수령 금액을 빠르게 확인할 수 있습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">어떤 경우에 특히 유용한가요?</h2>
    <p>
      미국주식을 매도하기 전에 세금을 감안한 실제 수익을 보고 싶을 때, 기본공제를 적용했을 때 세금이 얼마나 달라지는지 비교하고 싶을 때 특히 유용합니다.
    </p>
  </div>
)

const examples = (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-slate-900">미국주식 양도세 계산 예시</h2>
    <ul className="space-y-3 text-sm leading-6 text-slate-700">
      <li>미국주식 차익이 500만원일 때 세금이 얼마나 나오는지 바로 계산해볼 수 있습니다.</li>
      <li>기본공제를 적용했을 때 과세 대상 금액이 얼마나 줄어드는지 비교할 수 있습니다.</li>
      <li>필요경비를 반영해 세후 실수령 금액이 얼마인지 빠르게 확인할 수 있습니다.</li>
    </ul>
  </section>
)

const faq = (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-slate-900">자주 묻는 질문</h2>
    <div className="space-y-4 text-sm leading-6 text-slate-700">
      <div>
        <h3 className="font-semibold text-slate-900">미국주식 양도세는 얼마부터 내나요?</h3>
        <p>기본공제를 반영한 뒤에도 과세 대상 금액이 남는지 먼저 확인하는 것이 좋습니다.</p>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">수수료와 환전 비용도 반영해야 하나요?</h3>
        <p>실제 수익에 가까운 결과를 보려면 필요경비에 포함해 함께 계산하는 편이 좋습니다.</p>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">실제 신고 금액과 계산기 결과가 다를 수 있나요?</h3>
        <p>이 계산기는 참고용이며 거래내역, 비용 인정 범위, 손익 합산 여부에 따라 실제 신고 금액은 달라질 수 있습니다.</p>
      </div>
    </div>
  </section>
)

export default function OverseasCapitalGainsPage() {
  return (
    <>
      <JsonLd
        name="미국주식 양도세 계산기"
        description="미국주식 매매 차익 기준 예상 양도세와 세후 금액을 계산하는 주식 도구"
        path="/calculators/overseas-capital-gains"
      />
      <CalculatorLayout
        title="미국주식 양도세 계산기"
        description="미국주식과 해외주식 매매 차익을 원화 기준으로 계산하고 기본공제, 예상 세액, 세후 실수령 금액까지 한 번에 확인해보세요."
        currentSlug="overseas-capital-gains"
        explainerContent={
          <div className="space-y-8">
            {explainer}
            {examples}
            {faq}
          </div>
        }
        relatedGuides={getGuidesForTool('overseas-capital-gains')}
      >
        <OverseasCapitalGainsCalculator />
      </CalculatorLayout>
    </>
  )
}
