import { fireEvent, render, screen } from '@testing-library/react'
import CompoundReturnCalculator from '@/components/calculators/CompoundReturnCalculator'

describe('CompoundReturnCalculator', () => {
  it('applies a quick example scenario for first-time visitors', () => {
    render(<CompoundReturnCalculator />)

    fireEvent.click(screen.getByRole('button', { name: '월 50만원 10년' }))

    expect(screen.getByDisplayValue('0')).toBeInTheDocument()
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('8')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
    expect(screen.getByText('빠른 예시 입력')).toBeInTheDocument()
  })
})
