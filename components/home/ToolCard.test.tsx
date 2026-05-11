import { render, screen } from '@testing-library/react'
import ToolCard from '@/components/home/ToolCard'
import type { Tool } from '@/lib/tools'

describe('ToolCard', () => {
  it('renders the purpose-first homepage presentation', () => {
    const tool = {
      slug: 'multa',
      name: '물타기 계산기',
      shortName: '물타기',
      purpose: '추가 매수 판단',
      description: '추가 매수 뒤 평단 변화를 바로 계산합니다.',
      summary: '평단 낮추기 · 물타기 계산기',
      icon: '◎',
      href: '/calculators/multa',
      category: 'calculator',
      featured: true,
      relatedSlugs: ['averaging-down-target', 'return-rate', 'target-price']
    } satisfies Tool

    render(<ToolCard tool={tool} />)

    expect(screen.getByText('추가 매수 판단')).toBeInTheDocument()
    expect(screen.getByText('평단 낮추기 · 물타기 계산기')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /추가 매수 판단/i })).toBeInTheDocument()
  })
})
