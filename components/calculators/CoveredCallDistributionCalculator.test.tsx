import { fireEvent, render, screen } from '@testing-library/react'
import CoveredCallDistributionCalculator from '@/components/calculators/CoveredCallDistributionCalculator'

describe('CoveredCallDistributionCalculator', () => {
  const etfOptions = [
    {
      symbol: '498400',
      name: 'KODEX 200타겟위클리커버드콜',
      priceReference: 10000,
      monthlyDistributionPerShare: 120
    }
  ]

  const accountDefaults = {
    general: { taxRatePercent: 15.4 },
    isa: { exemptionLimit: 2000000, separateTaxRatePercent: 9 },
    pension: {}
  }

  it('shows clearer tax output and pension tax-deferral guidance after calculation', () => {
    render(
      <CoveredCallDistributionCalculator
        etfOptions={etfOptions}
        accountDefaults={accountDefaults}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '계좌별 세후 월분배 비교하기' }))

    expect(screen.getAllByText('연간 예상 세금')).toHaveLength(3)
    expect(
      screen.getByText('연금계좌는 과세이연 기준으로 비교하며, 실제 수령 시점 과세는 별도로 확인하세요.')
    ).toBeInTheDocument()
    expect(screen.getByText('이 계산기는 주가 변동을 제외한 월분배 현금흐름 비교용입니다.')).toBeInTheDocument()
    expect(screen.getAllByText('월별 현금흐름')).toHaveLength(3)
  })

  it('renders fixed total return scenarios with a caution note after calculation', () => {
    render(
      <CoveredCallDistributionCalculator
        etfOptions={etfOptions}
        accountDefaults={accountDefaults}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '계좌별 세후 월분배 비교하기' }))

    expect(screen.getAllByText('주가 시나리오별 예상 총수익')).toHaveLength(3)
    expect(screen.getAllByText('하락 -10%')).toHaveLength(3)
    expect(screen.getAllByText('보합 0%')).toHaveLength(3)
    expect(screen.getAllByText('상승 +10%')).toHaveLength(3)
    expect(
      screen.getAllByText(
        '이 결과는 기준 가격 대비 단순 시나리오 계산이며, 실제 분배금 변동과 시장가격 변동은 다를 수 있습니다.'
      )
    ).toHaveLength(3)
  })
})
