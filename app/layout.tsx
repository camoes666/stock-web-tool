import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '주식 계산기 모음 - 로그인 없이 바로 사용',
    template: '%s | 주식 계산기'
  },
  description: '물타기, 배당, 적정주가 계산기를 무료로 제공합니다. 로그인 없이 바로 사용하세요.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 애드센스 승인 후 ca-pub-XXXX 값을 채우고 주석 해제 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className={notoSansKr.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
