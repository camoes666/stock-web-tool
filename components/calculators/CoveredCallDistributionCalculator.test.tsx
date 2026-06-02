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
    expect(
      screen.getByText('처음이면 대표 예시값으로 먼저 계산해본 뒤, 투자 금액과 분배금을 바꿔 보는 흐름이 가장 이해하기 쉽습니다.')
    ).toBeInTheDocument()
    expect(screen.getAllByText('월별 현금흐름')).toHaveLength(3)
  })

  it('renders fixed total return scenarios with clearer guidance after calculation', () => {
    render(
      <CoveredCallDistributionCalculator
        etfOptions={etfOptions}
        accountDefaults={accountDefaults}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '계좌별 세후 월분배 비교하기' }))

    expect(screen.getAllByText('주가 시나리오 읽는 법')).toHaveLength(3)
    expect(screen.getAllByText('하락 -10%')).toHaveLength(3)
    expect(screen.getAllByText('보합 0%')).toHaveLength(3)
    expect(screen.getAllByText('상승 +10%')).toHaveLength(3)
    expect(
      screen.getAllByText(
        '이 결과는 기준 가격 대비 단순 시나리오 참고값이며, 실제 분배금 변동과 시장가격 변동은 다를 수 있습니다.'
      )
    ).toHaveLength(3)
    expect(screen.getAllByText('하락 시 손실 방어 확인')).toHaveLength(3)
  })

  it('applies quick example investment amounts for faster first calculation', () => {
    render(
      <CoveredCallDistributionCalculator
        etfOptions={etfOptions}
        accountDefaults={accountDefaults}
      />
    )

    const investmentInput = screen.getByDisplayValue('10000000')

    fireEvent.change(investmentInput, { target: { value: '1234567' } })
    fireEvent.click(screen.getByRole('button', { name: '500만원 예시' }))

    expect(screen.getByDisplayValue('5000000')).toBeInTheDocument()
    expect(screen.getByText('빠른 예시 입력')).toBeInTheDocument()
  })
})
