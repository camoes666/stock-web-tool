import { metadata as averagingDownTargetMetadata } from '@/app/calculators/averaging-down-target/page'
import { metadata as dividendMetadata } from '@/app/calculators/dividend/page'
import { metadata as multaMetadata } from '@/app/calculators/multa/page'
import { metadata as returnRateMetadata } from '@/app/calculators/return-rate/page'

describe('calculator SEO copy', () => {
  it('keeps the dividend calculator aligned with dividend intent keywords', () => {
    expect(dividendMetadata).toMatchObject({
      title: '배당 계산기 - 배당수익률, 월배당, 예상 배당금 계산',
      description:
        '주가, 보유수량, 주당 배당금을 입력하면 배당수익률과 예상 배당금, 월배당 기준 현금흐름을 바로 계산할 수 있습니다.'
    })
  })

  it('keeps the averaging-down calculator aligned with 추가 매수 intent keywords', () => {
    expect(multaMetadata).toMatchObject({
      title: '물타기 계산기 - 추가 매수 후 평균단가 계산',
      description:
        '보유 수량, 현재 평균단가, 추가 매수가를 입력하면 물타기 후 평균단가와 체감 매입단가를 계산할 수 있습니다.'
    })
  })

  it('keeps the target average calculator aligned with 평단가 intent keywords', () => {
    expect(averagingDownTargetMetadata).toMatchObject({
      title: '평단가 계산기 - 원하는 평균단가까지 추가 매수 금액 계산',
      description:
        '목표 평균단가를 입력하면 원하는 평단가까지 맞추기 위해 필요한 추가 매수 수량과 금액을 계산할 수 있습니다.'
    })
  })

  it('keeps the return-rate calculator aligned with 실손익 intent keywords', () => {
    expect(returnRateMetadata).toMatchObject({
      title: '수익률 계산기 - 주식 수익 계산, 수수료·세금 포함 실손익',
      description:
        '매수가, 현재가, 보유 수량을 입력하면 주식 수익 계산, 수익률, 수수료와 세금 반영 실손익까지 확인할 수 있습니다.'
    })
  })
})
