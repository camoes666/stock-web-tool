import type { Metadata } from 'next'
import MultaCalculator from '@/components/calculators/MultaCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '물타기 계산기 - 주식 평단가 계산',
  description:
    '현재 평단가, 보유 수량, 추가 매수가를 입력하면 새 평단가와 총 투자금을 계산할 수 있는 물타기 계산기입니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-slate-900">물타기 계산기 사용법</h2>
    <p>
      보유 중인 주식의 평균 매입 단가를 낮추고 싶을 때 현재 평단가, 보유 수량, 추가 매수
      가격과 수량을 입력하면 새 평단가를 바로 확인할 수 있습니다.
    </p>
    <p>
      손익분기점은 수수료와 세금을 제외한 기준으로 새 평단가와 동일하게 계산합니다. 실제
      투자 판단 전에는 기업의 펀더멘털 악화 여부도 함께 확인하는 것이 좋습니다.
    </p>
    <p>
      주식 평단가 계산은 하락 구간에서 추가 매수 전략을 세울 때 많이 쓰입니다. 물타기
      계산기를 활용하면 감으로 판단하지 않고 목표 평단가와 필요한 자금을 수치로 확인할 수
      있습니다.
    </p>
  </div>
)

export default function MultaPage() {
  return (
    <>
      <JsonLd
        name="물타기 계산기"
        description="주식 추가 매수 후 새로운 평단가를 즉시 계산합니다."
        path="/calculators/multa"
      />
      <CalculatorLayout
        title="물타기 계산기"
        description="추가 매수 후 새로운 평단가와 총 투자금을 계산합니다."
        currentSlug="multa"
        explainerContent={explainer}
      >
        <MultaCalculator />
      </CalculatorLayout>
    </>
  )
}
