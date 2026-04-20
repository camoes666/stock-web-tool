import type { Metadata } from 'next'
import ReturnRateCalculator from '@/components/calculators/ReturnRateCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '주식 수익률 계산기 - 평가손익 계산',
  description:
    '매수단가와 현재가, 보유 수량을 입력하면 평가금액, 평가손익, 수익률을 계산할 수 있는 주식 수익률 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">수익률 계산기 사용법</h2>
    <p>
      매수단가, 현재가, 보유 수량을 입력하면 현재 평가금액과 평가손익, 수익률을 한 번에
      확인할 수 있습니다. 손익 규모와 퍼센트를 같이 보는 데 유용합니다.
    </p>
    <p>
      이 계산기는 매매 수수료와 세금을 제외한 단순 수익률 기준입니다. 실제 실현 손익은
      증권사 체결 수수료와 세금에 따라 조금 달라질 수 있습니다.
    </p>
    <p>
      주식 수익률 계산은 보유 종목의 현재 상태를 빠르게 점검할 때 가장 많이 쓰는 기능 중
      하나입니다. 평가손익 금액과 퍼센트를 함께 보면 매도 판단이나 리밸런싱에도 도움이
      됩니다.
    </p>
  </div>
)

export default function ReturnRatePage() {
  return (
    <>
      <JsonLd
        name="주식 수익률 계산기"
        description="평가손익과 수익률을 즉시 계산합니다."
        path="/calculators/return-rate"
      />
      <CalculatorLayout
        title="수익률 계산기"
        description="평가금액, 평가손익, 수익률을 한 번에 계산합니다."
        currentSlug="return-rate"
        explainerContent={explainer}
      >
        <ReturnRateCalculator />
      </CalculatorLayout>
    </>
  )
}
