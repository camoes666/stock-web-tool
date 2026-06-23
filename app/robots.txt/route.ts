import { getSiteUrl } from '@/lib/site'

export function GET() {
  const baseUrl = getSiteUrl()
  const body = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '#DaumWebMasterTool:8f0168781c5ff4c120f356b0f258d75a835c2dc5ebfac4bfd9b68b4ce99f8638:KqMtrRaDniV96GOxiqaKXg=='
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
