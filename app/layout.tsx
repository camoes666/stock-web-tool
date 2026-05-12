import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import { getSiteUrl } from '@/lib/site'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const BASE_URL = getSiteUrl()
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-JVF3BC2W1H'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '주식 계산기 모음 - 로그인 없이 바로 사용하는 투자 도구',
    template: '%s | 주식 계산기'
  },
  description: '물타기, 수익률, 배당, 적정가 계산기를 로그인 없이 바로 사용할 수 있는 투자 도구 모음입니다.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* AdSense client script can be re-enabled after production configuration. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={notoSansKr.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
