import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { CalculatorField } from '@/components/calculators/shared'
import { useCalculatorTracking } from '@/components/calculators/useCalculatorTracking'

function TrackingHarness() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const { trackInputStart } = useCalculatorTracking({
    calculatorName: 'tracking-harness',
    calculatorCategory: 'stock',
    hasResult: result !== null
  })

  return (
    <div>
      <CalculatorField
        label="Amount"
        value={value}
        onChange={setValue}
        onFirstInteraction={trackInputStart}
        placeholder="100"
      />
      <button type="button" onClick={() => setResult(1)}>
        Show result
      </button>
    </div>
  )
}

describe('useCalculatorTracking', () => {
  beforeEach(() => {
    window.dataLayer = []
    window.history.replaceState({}, '', '/calculators/tracking-harness')
    document.title = 'Tracking Harness'
  })

  it('tracks view, input start once, and result view', () => {
    render(<TrackingHarness />)

    const input = screen.getByPlaceholderText('100')

    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.change(input, { target: { value: '12' } })
    fireEvent.click(screen.getByRole('button', { name: 'Show result' }))

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'calculator_view',
        calculator_name: 'tracking-harness',
        calculator_category: 'stock'
      }),
      expect.objectContaining({
        event: 'calculator_input_start',
        calculator_name: 'tracking-harness',
        calculator_category: 'stock'
      }),
      expect.objectContaining({
        event: 'calculator_result_view',
        calculator_name: 'tracking-harness',
        calculator_category: 'stock'
      })
    ])
  })
})
