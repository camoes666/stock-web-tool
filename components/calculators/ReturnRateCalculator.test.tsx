import { fireEvent, render, screen } from '@testing-library/react'
import ReturnRateCalculator from '@/components/calculators/ReturnRateCalculator'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

describe('ReturnRateCalculator analytics tracking', () => {
  beforeEach(() => {
    window.dataLayer = []
    window.history.replaceState({}, '', '/calculators/return-rate')
    document.title = 'Return Rate Calculator'
  })

  it('tracks view, input start, run, and result view events in order', () => {
    render(<ReturnRateCalculator />)

    const inputs = screen.getAllByRole('spinbutton')

    fireEvent.change(inputs[0], { target: { value: '100' } })
    fireEvent.change(inputs[1], { target: { value: '110' } })
    fireEvent.change(inputs[2], { target: { value: '3' } })
    fireEvent.click(screen.getAllByRole('button').at(-1)!)

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'calculator_view',
        calculator_name: 'return-rate',
        calculator_category: 'stock'
      }),
      expect.objectContaining({
        event: 'calculator_input_start',
        calculator_name: 'return-rate',
        calculator_category: 'stock'
      }),
      expect.objectContaining({
        event: 'calculator_run',
        calculator_name: 'return-rate',
        calculator_category: 'stock',
        input_count: 6,
        fee_enabled: true,
        tax_enabled: true
      }),
      expect.objectContaining({
        event: 'calculator_result_view',
        calculator_name: 'return-rate',
        calculator_category: 'stock'
      })
    ])
  })

  it('keeps advanced trading cost options collapsed until the user opens them', () => {
    render(<ReturnRateCalculator />)

    expect(screen.queryByText('증권사 수수료(%)')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '고급 옵션 열기' }))

    expect(screen.getByText('증권사 수수료(%)')).toBeInTheDocument()
    expect(screen.getByText('거래세(%)')).toBeInTheDocument()
    expect(screen.getByText('기타 비용')).toBeInTheDocument()
  })
})
