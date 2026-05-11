import { fireEvent, render, screen } from '@testing-library/react'
import { CurrencySelector, formatCurrency, useStoredCurrency } from '@/components/calculators/shared'

describe('formatCurrency', () => {
  it('formats KRW values without decimals', () => {
    expect(formatCurrency(1200000, 'KRW')).toBe('₩1,200,000')
  })

  it('formats USD values with decimals', () => {
    expect(formatCurrency(1200000.5, 'USD')).toBe('$1,200,000.50')
  })
})

describe('CurrencySelector', () => {
  it('renders both currency options and notifies on change', () => {
    const handleChange = jest.fn()

    render(<CurrencySelector value="KRW" onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: '달러 USD' }))

    expect(screen.getByRole('button', { name: '원 KRW' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '달러 USD' })).toBeInTheDocument()
    expect(handleChange).toHaveBeenCalledWith('USD')
  })
})

function CurrencyStorageHarness() {
  const [currency, setCurrency] = useStoredCurrency()

  return (
    <div>
      <span data-testid="currency-value">{currency}</span>
      <CurrencySelector value={currency} onChange={setCurrency} />
    </div>
  )
}

describe('useStoredCurrency', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('uses the stored default currency and persists updates', () => {
    window.localStorage.setItem('stock-tool:preferred-currency', 'USD')

    render(<CurrencyStorageHarness />)

    expect(screen.getByTestId('currency-value')).toHaveTextContent('USD')

    fireEvent.click(screen.getByRole('button', { name: '원 KRW' }))

    expect(window.localStorage.getItem('stock-tool:preferred-currency')).toBe('KRW')
  })
})
