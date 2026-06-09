import { fireEvent, render, screen } from '@testing-library/react'
import OverseasCapitalGainsCalculator from '@/components/calculators/OverseasCapitalGainsCalculator'

describe('OverseasCapitalGainsCalculator', () => {
  it('applies a quick example input for overseas tax calculation', () => {
    render(<OverseasCapitalGainsCalculator />)

    fireEvent.click(screen.getByRole('button', { name: '미국주식 예시' }))

    expect(screen.getByDisplayValue('10000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('15000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1350')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1380')).toBeInTheDocument()
    expect(screen.getByText('빠른 예시 입력')).toBeInTheDocument()
  })
})
