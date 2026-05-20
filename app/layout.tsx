import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import SiteFooter from '@/components/layout/SiteFooter'
import { getSiteUrl } from '@/lib/site'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const BASE_URL = getSiteUrl()
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-JVF3BC2W1H'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const HOME_META_DESCRIPTION =
  '수수료, 거래세, 환율, 해외주식 양도세까지 반영해 실제로 남는 돈을 계산하는 주식 계산기 허브'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '주식 계산기 모음',
    template: '%s | 주식 계산기'
  },
  description: HOME_META_DESCRIPTION,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Stock Web Tools',
    title: '실손익까지 보는 주식 계산기 모음',
    description: HOME_META_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '주식 계산기 공유 이미지'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '실손익까지 보는 주식 계산기 모음',
    description: HOME_META_DESCRIPTION,
    images: ['/opengraph-image']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="103859e91915ff64b87f9496cb9fe2188d86d8d8" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6731103569114139"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="analytics-datalayer" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        {GTM_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
              `}
            </Script>
          </>
        ) : (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${notoSansKr.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
