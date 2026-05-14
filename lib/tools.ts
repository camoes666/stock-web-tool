export interface Tool {
  slug: string
  name: string
  shortName: string
  purpose: string
  description: string
  summary: string
  icon: string
  href: string
  category: 'calculator' | 'info'
  featured: boolean
  relatedSlugs: string[]
}

export const tools: Tool[] = [
  {
    slug: 'multa',
    name: '물타기 계산기',
    shortName: '물타기',
    purpose: '추가 매수 판단',
    description: '추가 매수 뒤 평균단가와 총투자금 변화를 빠르게 계산합니다.',
    summary: '평균단가를 낮추는 추가 매수 계산기',
    icon: '➕',
    href: '/calculators/multa',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['averaging-down-target', 'return-rate', 'target-price']
  },
  {
    slug: 'return-rate',
    name: '수익률 계산기',
    shortName: '수익률',
    purpose: '수익 상태 확인',
    description: '평가금액, 손익, 수익률을 한 번에 계산합니다.',
    summary: '평가손익과 수익률 계산기',
    icon: '📈',
    href: '/calculators/return-rate',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['target-price', 'multa', 'fair-value']
  },
  {
    slug: 'dividend',
    name: '배당 계산기',
    shortName: '배당',
    purpose: '배당 수익 확인',
    description: '배당수익률과 연간 예상 배당금을 빠르게 계산합니다.',
    summary: '배당수익률과 현금흐름 계산기',
    icon: '💵',
    href: '/calculators/dividend',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['dividend-reinvest', 'compound-return', 'fair-value']
  },
  {
    slug: 'target-price',
    name: '목표가 계산기',
    shortName: '목표가',
    purpose: '목표가 확인',
    description: '진입가 기준 목표가와 손절가를 함께 계산합니다.',
    summary: '목표 수익률 기준 목표가 계산기',
    icon: '🎯',
    href: '/calculators/target-price',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['return-rate', 'multa', 'fair-value']
  },
  {
    slug: 'fair-value',
    name: '적정가 계산기',
    shortName: '적정가',
    purpose: '적정가 추정',
    description: 'EPS와 BPS를 바탕으로 적정가 범위를 계산합니다.',
    summary: 'PER · PBR 기반 적정가 계산기',
    icon: '🧮',
    href: '/calculators/fair-value',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['target-price', 'return-rate', 'dividend']
  },
  {
    slug: 'compound-return',
    name: '복리 계산기',
    shortName: '복리',
    purpose: '복리 성장 확인',
    description: '초기 투자금과 월 적립금으로 미래 자산을 시뮬레이션합니다.',
    summary: '장기 적립식 복리 계산기',
    icon: '📊',
    href: '/calculators/compound-return',
    category: 'calculator',
    featured: true,
    relatedSlugs: ['dividend-reinvest', 'dividend', 'return-rate']
  },
  {
    slug: 'averaging-down-target',
    name: '추가 매수 계산기',
    shortName: '추가 매수',
    purpose: '목표 단가 맞추기',
    description: '원하는 평균단가까지 필요한 추가 수량과 금액을 계산합니다.',
    summary: '목표 평균단가 맞춤 계산기',
    icon: '🪜',
    href: '/calculators/averaging-down-target',
    category: 'calculator',
    featured: false,
    relatedSlugs: ['multa', 'target-price', 'return-rate']
  },
  {
    slug: 'dividend-reinvest',
    name: '배당 재투자 계산기',
    shortName: '배당 재투자',
    purpose: '재투자 성장 확인',
    description: '배당 재투자 이후 보유 수량과 자산 증가를 계산합니다.',
    summary: '배당 복리 · 재투자 성장 계산기',
    icon: '🔁',
    href: '/calculators/dividend-reinvest',
    category: 'calculator',
    featured: false,
    relatedSlugs: ['dividend', 'compound-return', 'fair-value']
  },
  {
    slug: 'overseas-capital-gains',
    name: '해외주식 양도세 계산기',
    shortName: '해외주식 세금',
    purpose: '양도세 예상',
    description: '해외주식 매수·매도 금액과 환율을 기준으로 예상 양도세를 계산합니다.',
    summary: '해외주식 양도세 · 세후 차익 계산기',
    icon: '🌍',
    href: '/calculators/overseas-capital-gains',
    category: 'calculator',
    featured: false,
    relatedSlugs: ['return-rate', 'multa', 'target-price']
  }
]

export const featuredTools = tools.filter((tool) => tool.featured)
export const secondaryTools = tools.filter((tool) => !tool.featured)

export function findToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug)
}

export function getRelatedTools(slug: string) {
  const currentTool = findToolBySlug(slug)

  if (!currentTool) {
    return []
  }

  return currentTool.relatedSlugs
    .map((relatedSlug) => findToolBySlug(relatedSlug))
    .filter((tool): tool is Tool => tool !== undefined)
    .filter((tool) => tool.slug !== slug)
}
