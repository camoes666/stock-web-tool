import type { MetadataRoute } from 'next'
import { guides } from '@/lib/guides'
import { getSiteUrl } from '@/lib/site'
import { tools } from '@/lib/tools'

const BASE_URL = getSiteUrl()
const staticPages = ['/about', '/contact', '/privacy', '/guides'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: path === '/guides' ? 0.6 : 0.5,
    url: `${BASE_URL}${path}`
  }))

  const toolPages = tools.map((tool) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: 0.8,
    url: `${BASE_URL}${tool.href}`
  }))

  const guidePages = guides.map((guide) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: 0.7,
    url: `${BASE_URL}${guide.href}`
  }))

  return [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1,
      url: BASE_URL
    },
    ...staticEntries,
    ...toolPages,
    ...guidePages
  ]
}
