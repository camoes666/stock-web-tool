import {
  track404View,
  trackCalculatorInputStart,
  trackCalculatorResultView,
  trackCalculatorRun,
  trackCalculatorView,
  trackCtaClick
} from '@/lib/analytics'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

describe('analytics helpers', () => {
  beforeEach(() => {
    window.dataLayer = []
    window.history.replaceState({}, '', '/calculators/multa')
    document.title = 'Multa Calculator'
  })

  it('pushes calculator view events with page metadata', () => {
    trackCalculatorView({
      calculator_name: 'multa',
      calculator_category: 'stock'
    })

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'calculator_view',
        calculator_name: 'multa',
        calculator_category: 'stock',
        page_path: '/calculators/multa',
        page_title: 'Multa Calculator'
      })
    ])
  })

  it('pushes calculator run events', () => {
    trackCalculatorRun({
      calculator_name: 'multa',
      calculator_category: 'stock',
      input_count: 4,
      fee_enabled: true,
      tax_enabled: true
    })

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'calculator_run',
        calculator_name: 'multa',
        calculator_category: 'stock',
        input_count: 4,
        fee_enabled: true,
        tax_enabled: true
      })
    ])
  })

  it('pushes calculator input start events', () => {
    trackCalculatorInputStart({
      calculator_name: 'multa',
      calculator_category: 'stock'
    })

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'calculator_input_start',
        calculator_name: 'multa',
        calculator_category: 'stock'
      })
    ])
  })

  it('pushes calculator result view events', () => {
    trackCalculatorResultView({
      calculator_name: 'multa',
      calculator_category: 'stock'
    })

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'calculator_result_view',
        calculator_name: 'multa',
        calculator_category: 'stock'
      })
    ])
  })

  it('pushes CTA click events', () => {
    trackCtaClick({
      cta_name: 'tool-multa',
      cta_location: 'home-featured'
    })

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'cta_click',
        cta_name: 'tool-multa',
        cta_location: 'home-featured'
      })
    ])
  })

  it('pushes 404 events with referrer', () => {
    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: 'https://example.com/bad-link'
    })

    track404View()

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'error_view_404',
        page_path: '/calculators/multa',
        referrer: 'https://example.com/bad-link'
      })
    ])
  })
})
