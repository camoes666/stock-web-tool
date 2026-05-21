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
  },
  {
    slug: 'return-rate-with-fees',
    title: '수익률 계산할 때 수수료와 거래세를 같이 봐야 하는 이유',
    description: '주식 수익률을 계산할 때 수수료와 거래세를 왜 함께 봐야 하는지, 실손익이 달라지는 이유를 정리한 가이드입니다.',
    excerpt: '평가손익과 실손익이 왜 달라지는지, 비용을 반영한 수익률 계산 흐름과 입력 팁을 예시로 설명합니다.',
    href: '/guides/return-rate-with-fees',
    relatedToolSlugs: ['return-rate']
  },
  {
    slug: 'dividend-yield-vs-dividend-income',
    title: '배당수익률과 실제 배당금은 어떻게 다르게 봐야 할까',
    description: '배당수익률과 실제 배당금의 차이, 세전과 세후 현금흐름 해석법을 정리한 배당 가이드입니다.',
    excerpt: '배당주를 볼 때 수익률과 현금흐름을 함께 읽는 법, 배당 계산기와 재투자 계산기 활용 포인트를 설명합니다.',
    href: '/guides/dividend-yield-vs-dividend-income',
    relatedToolSlugs: ['dividend', 'dividend-reinvest']
  },
  {
    slug: 'target-price-and-stop-loss',
    title: '목표가만 보지 말고 손절가를 함께 계산해야 하는 이유',
    description: '목표가와 손절가를 같이 계산해야 하는 이유와 기대수익·기대손실을 함께 보는 기준을 정리한 가이드입니다.',
    excerpt: '익절 가격만 보는 실수를 줄이기 위해 손절가와 리스크 관리 기준을 함께 세우는 방법을 설명합니다.',
    href: '/guides/target-price-and-stop-loss',
    relatedToolSlugs: ['target-price']
  },
  {
    slug: 'compound-return-assumptions',
    title: '복리 계산기에서 기대수익률을 너무 높게 잡으면 안 되는 이유',
    description: '복리 계산기의 기대수익률 가정이 결과를 얼마나 크게 바꾸는지, 현실적인 범위를 어떻게 잡으면 좋은지 정리한 가이드입니다.',
    excerpt: '장기 투자 복리 계산에서 기대수익률을 해석하는 법과 과도한 가정이 왜 위험한지 예시와 함께 설명합니다.',
    href: '/guides/compound-return-assumptions',
    relatedToolSlugs: ['compound-return']
  },
  {
    slug: 'fair-value-per-pbr',
    title: 'PER과 PBR로 적정가를 볼 때 꼭 같이 생각해야 할 점',
    description: 'PER과 PBR의 차이, 적정가 계산에서 어떤 기준을 함께 봐야 하는지 정리한 밸류에이션 가이드입니다.',
    excerpt: '적정가 계산 결과를 하나의 정답처럼 보지 않고, 여러 가정을 비교하는 방법을 정리했습니다.',
    href: '/guides/fair-value-per-pbr',
    relatedToolSlugs: ['fair-value']
  }
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesForTool(toolSlug: string) {
  return guides.filter((guide) => guide.relatedToolSlugs.includes(toolSlug))
}
