import type { MetadataRoute } from 'next'
import { tools } from '@/lib/tools'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: 0.8,
    url: `${BASE_URL}${tool.href}`
  }))

  return [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1,
      url: BASE_URL
    },
    ...toolPages
  ]
}
