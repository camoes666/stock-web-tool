import { render, screen } from '@testing-library/react'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

describe('CalculatorLayout', () => {
  it('renders related guides when provided', () => {
    render(
      <CalculatorLayout
        title="물타기 계산기"
        description="설명"
        currentSlug="multa"
        explainerContent={<div>가이드 본문</div>}
        relatedGuides={[
          {
            slug: 'averaging-down',
            title: '물타기 계산법',
            description: '평단가가 어떻게 바뀌는지 설명합니다.',
            excerpt: '추가 매수 전 알아둘 핵심 계산 흐름을 짧게 정리했습니다.',
            href: '/guides/averaging-down',
            relatedToolSlugs: ['multa']
          }
        ]}
      >
        <div>calculator</div>
      </CalculatorLayout>
    )

    expect(screen.getByRole('heading', { name: '관련 가이드' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /물타기 계산법/i })).toHaveAttribute(
      'href',
      '/guides/averaging-down'
    )
  })
})
