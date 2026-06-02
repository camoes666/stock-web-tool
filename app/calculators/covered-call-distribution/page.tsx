import type { Metadata } from 'next'
import CoveredCallDistributionCalculator from '@/components/calculators/CoveredCallDistributionCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import { buildCoveredCallCalculatorSeed } from '@/lib/etf-income/view-model'
import { getGuidesForTool } from '@/lib/guides'
import {
  listDistributionTaxRules,
  listEtfProducts,
  listLatestDistributionProfiles
} from '@/lib/supabase/etf-income-repo'

export const metadata: Metadata = {
  title: '커버드콜 월분배 계산기 - 일반계좌, ISA, 연금계좌 세후 비교',
  description:
    '커버드콜 ETF의 투자 금액, 기준 가격, 주당 월분배금을 입력하면 일반계좌, ISA, 연금계좌 기준 세후 월분배 현금흐름을 비교할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">무엇을 계산하나요?</h2>
    <p>
      이 계산기는 커버드콜 ETF의 월분배금을 기준으로 일반계좌, ISA, 연금계좌에서 실제로 얼마가 남는지
      비교하는 도구입니다. 분배율이 높아 보여도 계좌에 따라 세후 현금흐름이 달라질 수 있기 때문에, 같은
      ETF라도 담는 계좌를 함께 비교하는 데 초점을 둡니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">입력값은 어떻게 쓰나요?</h2>
    <p>
      투자 금액, 기준 가격, 주당 월분배금을 입력하면 매수 가능한 수량과 월 세전 분배금, 세후 수령액을
      계산합니다. 기준 가격과 분배금은 최신 공시 또는 사용자가 가정한 값을 넣어 시나리오별로 비교할 수
      있습니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">주의할 점</h2>
    <p>
      이 계산기는 월분배 현금흐름 중심의 1차 버전입니다. 주가 상승이나 하락에 따른 평가손익, 재투자 효과,
      계좌별 세부 과세 예외까지 모두 반영하는 것은 아니므로 참고용 비교값으로 활용하는 것이 좋습니다.
    </p>
  </div>
)

export default async function CoveredCallDistributionPage() {
  let seed = buildCoveredCallCalculatorSeed([], [], [])

  try {
    const [products, distributionProfiles, taxRules] = await Promise.all([
      listEtfProducts(),
      listLatestDistributionProfiles(),
      listDistributionTaxRules(new Date().toISOString().slice(0, 10))
    ])
    seed = buildCoveredCallCalculatorSeed(products, distributionProfiles, taxRules)
  } catch (error) {
    console.error('Failed to load covered-call calculator seed from Supabase:', error)
  }

  return (
    <>
      <JsonLd
        name="커버드콜 월분배 계산기"
        description="커버드콜 ETF의 계좌별 세후 월분배 현금흐름을 비교하는 도구"
        path="/calculators/covered-call-distribution"
      />
      <CalculatorLayout
        title="커버드콜 월분배 계산기"
        description="커버드콜 ETF의 월분배금과 계좌별 세후 현금흐름을 비교합니다."
        currentSlug="covered-call-distribution"
        explainerContent={explainer}
        relatedGuides={getGuidesForTool('covered-call-distribution')}
      >
        <CoveredCallDistributionCalculator
          etfOptions={seed.etfOptions}
          accountDefaults={seed.accountDefaults}
        />
      </CalculatorLayout>
    </>
  )
}
