export interface Guide {
  slug: string
  title: string
  description: string
  excerpt: string
  href: string
  relatedToolSlugs: string[]
}

export const guides: Guide[] = [
  {
    slug: 'averaging-down',
    title: '물타기 계산법',
    description: '평균단가가 어떻게 바뀌는지 이해하고, 추가 매수 전에 숫자를 정리해 보는 가이드입니다.',
    excerpt: '물타기 계산이 필요한 순간, 평균단가 계산 원리, 간단한 예시와 주의사항을 짚어드립니다.',
    href: '/guides/averaging-down',
    relatedToolSlugs: ['multa']
  },
  {
    slug: 'overseas-capital-gains-tax',
    title: '해외주식 양도세 계산법',
    description: '미국주식 등 해외주식 세금을 환율, 필요경비, 기본공제, 세후 차익 기준으로 정리한 가이드입니다.',
    excerpt: '매수·매도 환율을 어떻게 넣는지, 예상 양도세와 세후 차익을 어떻게 읽는지 빠르게 확인할 수 있습니다.',
    href: '/guides/overseas-capital-gains-tax',
    relatedToolSlugs: ['overseas-capital-gains']
  }
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesForTool(toolSlug: string) {
  return guides.filter((guide) => guide.relatedToolSlugs.includes(toolSlug))
}
