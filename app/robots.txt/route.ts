import { getSiteUrl } from '@/lib/site'

export function GET() {
  const baseUrl = getSiteUrl()
  const body = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '#DaumWebMasterTool:cd00dc19f7d7b7914a4a50d2ffe2499efecb785acc56643df94bad74c0ee22a:KqMtrRaDniV96GOxiqaKXg=='
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
