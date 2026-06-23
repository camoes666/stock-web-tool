import { getSiteUrl } from '@/lib/site'

export function GET() {
  const baseUrl = getSiteUrl()
  const body = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '#DaumWebMasterTool:b197faf4f49361368d61ea56b5de32fc0245ec0cdd94e83cc1d406e65c8bb965:KqMtrRaDniV96GOxiqaKXg=='
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
