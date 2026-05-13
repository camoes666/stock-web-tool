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
    description: '평단가가 어떻게 바뀌는지 이해하고, 추가 매수 전에 숫자를 정리할 때 보는 가이드입니다.',
    excerpt: '물타기 계산이 필요한 순간, 평단가 계산 원리, 간단한 예시와 주의사항을 짧게 정리했습니다.',
    href: '/guides/averaging-down',
    relatedToolSlugs: ['multa']
  }
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesForTool(toolSlug: string) {
  return guides.filter((guide) => guide.relatedToolSlugs.includes(toolSlug))
}
