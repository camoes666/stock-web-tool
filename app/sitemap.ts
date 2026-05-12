import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'
import { tools } from '@/lib/tools'

const BASE_URL = getSiteUrl()
const staticPages = ['/about', '/contact', '/privacy'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: 0.5,
    url: `${BASE_URL}${path}`
  }))

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
    ...staticEntries,
    ...toolPages
  ]
}
