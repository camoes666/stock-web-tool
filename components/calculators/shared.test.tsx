import { fireEvent, render, screen } from '@testing-library/react'
import {
  CurrencySelector,
  TradingCostFields,
  formatCurrency,
  useStoredCurrency
} from '@/components/calculators/shared'

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

    expect(screen.getByRole('button', { name: '원화 KRW' })).toBeInTheDocument()
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

    fireEvent.click(screen.getByRole('button', { name: '원화 KRW' }))

    expect(window.localStorage.getItem('stock-tool:preferred-currency')).toBe('KRW')
  })
})

describe('TradingCostFields', () => {
  it('renders fee and tax inputs and forwards updates', () => {
    const handleFeeChange = jest.fn()
    const handleTaxChange = jest.fn()
    const handleExtraCostChange = jest.fn()

    render(
      <TradingCostFields
        brokerFeePercent="0.015"
        transactionTaxPercent="0.20"
        extraCost="0"
        onBrokerFeePercentChange={handleFeeChange}
        onTransactionTaxPercentChange={handleTaxChange}
        onExtraCostChange={handleExtraCostChange}
      />
    )

    const feeInput = screen.getByPlaceholderText('0.015')
    const taxInput = screen.getByPlaceholderText('0.20')
    const extraCostInput = screen.getByPlaceholderText('0')

    fireEvent.change(feeInput, { target: { value: '0.03' } })
    fireEvent.change(taxInput, { target: { value: '0.25' } })
    fireEvent.change(extraCostInput, { target: { value: '5000' } })

    expect(handleFeeChange).toHaveBeenCalledWith('0.03')
    expect(handleTaxChange).toHaveBeenCalledWith('0.25')
    expect(handleExtraCostChange).toHaveBeenCalledWith('5000')
  })
})
