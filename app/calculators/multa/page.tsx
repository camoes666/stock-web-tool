import type { Metadata } from 'next'
import MultaCalculator from '@/components/calculators/MultaCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '물타기 계산기 - 추가 매수 뒤 평단가 계산',
  description: '현재 평단가와 보유 수량, 추가 매수 가격을 입력하면 새 평단가와 총 투자금을 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">언제 쓰면 좋을까요?</h2>
    <p>물타기 계산기는 하락 구간에서 추가 매수를 고민할 때 새 평단가가 얼마나 달라지는지 빠르게 확인하는 데 적합합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산식</h2>
    <p>새 평단가는 기존 총 매입금액과 추가 매수 금액을 합한 뒤 전체 수량으로 나눠 계산합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">주의사항</h2>
    <p>이 계산은 수수료와 세금을 제외한 단순 기준입니다. 실제 매매 판단 전에는 거래 비용과 종목 변동성을 함께 확인하세요.</p>
  </div>
)

export default function MultaPage() {
  return (
    <>
      <JsonLd name="물타기 계산기" description="추가 매수 뒤 새 평단가와 총 투자금을 계산하는 도구" path="/calculators/multa" />
      <CalculatorLayout
        title="물타기 계산기"
        description="추가 매수 뒤 새 평단가와 총 투자금이 어떻게 달라지는지 바로 계산합니다."
        currentSlug="multa"
        explainerContent={explainer}
      >
        <MultaCalculator />
      </CalculatorLayout>
    </>
  )
}
