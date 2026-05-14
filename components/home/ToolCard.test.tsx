import { fireEvent, render, screen } from '@testing-library/react'
import ToolCard from '@/components/home/ToolCard'
import type { Tool } from '@/lib/tools'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

describe('ToolCard', () => {
  const tool = {
    slug: 'multa',
    name: 'Multa calculator',
    shortName: 'Multa',
    purpose: 'Average down check',
    description: 'Quickly calculate updated average price after an additional buy.',
    summary: 'Average down calculator',
    icon: 'M',
    href: '/calculators/multa',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['averaging-down-target', 'return-rate', 'target-price']
  } satisfies Tool

  beforeEach(() => {
    window.dataLayer = []
  })

  it('renders the purpose-first homepage presentation', () => {
    render(<ToolCard tool={tool} />)

    expect(screen.getByText('Average down check')).toBeInTheDocument()
    expect(screen.getByText('Average down calculator')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /average down check/i })).toBeInTheDocument()
  })

  it('tracks featured card clicks as CTA events', () => {
    render(<ToolCard tool={tool} />)

    fireEvent.click(screen.getByRole('link', { name: /average down check/i }))

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: 'cta_click',
        cta_name: 'tool-multa',
        cta_location: 'home-featured'
      })
    ])
  })
})
