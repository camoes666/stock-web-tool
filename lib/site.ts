const DEFAULT_SITE_URL = 'https://stockwebtools.com'

export function getSiteUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  return rawUrl.replace(/\/+$/, '')
}

