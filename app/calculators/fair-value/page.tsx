import type { Metadata } from 'next'
import FairValueCalculator from '@/components/calculators/FairValueCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '적정가 계산기 - PER PBR 기반 적정가 추정',
  description: 'EPS, BPS와 목표 PER, PBR을 입력해 종목의 적정가 범위를 추정할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">어떤 용도로 쓰나요?</h2>
    <p>적정가 계산기는 밸류에이션 관점에서 현재 가격이 어느 수준인지 대략적으로 가늠할 때 유용합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산식</h2>
    <p>PER 기준 적정가는 EPS에 목표 PER을 곱해 계산하고, PBR 기준 적정가는 BPS에 목표 PBR을 곱해 계산합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">주의사항</h2>
    <p>목표 배수는 시장 환경과 업종 평균에 따라 크게 달라질 수 있으므로 단일 기준으로만 판단하지 않는 것이 좋습니다.</p>
  </div>
)

export default function FairValuePage() {
  return (
    <>
      <JsonLd name="적정가 계산기" description="PER과 PBR 기준으로 적정가를 추정하는 주식 도구" path="/calculators/fair-value" />
      <CalculatorLayout
        title="적정가 계산기"
        description="EPS와 BPS를 바탕으로 종목의 적정가 범위를 간단하게 추정합니다."
        currentSlug="fair-value"
        explainerContent={explainer}
      >
        <FairValueCalculator />
      </CalculatorLayout>
    </>
  )
}
