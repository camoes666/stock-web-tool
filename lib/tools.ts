export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  href: string
  category: 'calculator' | 'info'
}

export const tools: Tool[] = [
  {
    slug: 'multa',
    name: '물타기 계산기',
    description: '추가 매수 후 새로운 평단가를 계산합니다.',
    icon: '📉',
    href: '/calculators/multa',
    category: 'calculator'
  },
  {
    slug: 'dividend',
    name: '배당 계산기',
    description: '배당수익률과 수령액을 빠르게 확인합니다.',
    icon: '💰',
    href: '/calculators/dividend',
    category: 'calculator'
  },
  {
    slug: 'fair-value',
    name: '적정주가 계산기',
    description: 'PER과 PBR 기준 적정주가를 계산합니다.',
    icon: '📊',
    href: '/calculators/fair-value',
    category: 'calculator'
  },
  {
    slug: 'return-rate',
    name: '수익률 계산기',
    description: '평가손익과 수익률을 즉시 계산합니다.',
    icon: '📈',
    href: '/calculators/return-rate',
    category: 'calculator'
  },
  {
    slug: 'target-price',
    name: '목표가/손절가 계산기',
    description: '진입가 기준 목표가와 손절가를 계산합니다.',
    icon: '🎯',
    href: '/calculators/target-price',
    category: 'calculator'
  },
  {
    slug: 'averaging-down-target',
    name: '추가 매수 필요 금액 계산기',
    description: '목표 평단가에 필요한 추가 매수를 계산합니다.',
    icon: '🧮',
    href: '/calculators/averaging-down-target',
    category: 'calculator'
  },
  {
    slug: 'compound-return',
    name: '복리 수익 계산기',
    description: '복리 기준 미래 자산을 시뮬레이션합니다.',
    icon: '🌱',
    href: '/calculators/compound-return',
    category: 'calculator'
  },
  {
    slug: 'dividend-reinvest',
    name: '배당 재투자 계산기',
    description: '배당 재투자 시 자산 증가를 계산합니다.',
    icon: '♻️',
    href: '/calculators/dividend-reinvest',
    category: 'calculator'
  }
]
