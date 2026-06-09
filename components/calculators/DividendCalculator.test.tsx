import { fireEvent, render, screen } from '@testing-library/react'
import DividendCalculator from '@/components/calculators/DividendCalculator'

describe('DividendCalculator', () => {
  it('applies a quick example input for first-time visitors', () => {
    render(<DividendCalculator />)

    fireEvent.click(screen.getByRole('button', { name: '예시값 채우기' }))

    expect(screen.getByDisplayValue('50000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('100')).toBeInTheDocument()
    expect(screen.getByText('빠른 예시 입력')).toBeInTheDocument()
  })
})
