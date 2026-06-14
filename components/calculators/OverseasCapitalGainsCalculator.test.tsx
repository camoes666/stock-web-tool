import { fireEvent, render, screen } from '@testing-library/react'
import OverseasCapitalGainsCalculator from '@/components/calculators/OverseasCapitalGainsCalculator'

describe('OverseasCapitalGainsCalculator', () => {
  it('applies a quick example input for US stock tax calculation', () => {
    render(<OverseasCapitalGainsCalculator />)

    fireEvent.click(screen.getByRole('button', { name: '미국주식 예시 적용' }))

    expect(screen.getByDisplayValue('10000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('15000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1350')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1380')).toBeInTheDocument()
    expect(screen.getByDisplayValue('50000')).toBeInTheDocument()
    expect(screen.getByText('미국주식 예시 입력')).toBeInTheDocument()
  })

  it('shows expected tax and after-tax proceeds messaging after calculation', () => {
    render(<OverseasCapitalGainsCalculator />)

    fireEvent.click(screen.getByRole('button', { name: '미국주식 예시 적용' }))
    fireEvent.click(screen.getByRole('button', { name: '양도세 계산하기' }))

    expect(screen.getByText(/예상 세액은 약/i)).toBeInTheDocument()
    expect(screen.getByText('세후 실수령 금액')).toBeInTheDocument()
  })
})
