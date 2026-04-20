# 주식 계산기 사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 기반 주식 계산기 8종(물타기/배당/적정가/수익률/목표가-손절가/추가 매수 필요 금액/복리 수익/배당 재투자) + 홈페이지를 포함한 SEO 최적화 사이트 구축 및 Vercel 배포

**Architecture:** 각 계산기를 독립 URL 페이지로 운영해 SEO 최적화. `CalculatorLayout` 공통 컴포넌트로 사이드바·광고 슬롯 재사용. `lib/tools.ts` 레지스트리로 홈 카드·사이트맵을 자동 생성하고, 새 도구 추가 시 수정 파일 수를 작게 유지한다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Jest + React Testing Library, Vercel

---

## Scope Guardrails

- MVP 범위는 계산기 8종, 홈 페이지, 공통 레이아웃, 기본 광고 슬롯까지로 한정
- 각 계산기 페이지에는 짧은 설명 섹션을 포함하되, 500~800자 SEO 확장 카피는 후속 단계에서 보강
- 뉴스 페이지, 배당주 정보 페이지, 외부 데이터 연동, DB 도입은 이번 구현 범위에서 제외
- 계산 로직은 모두 클라이언트에서 실행하며 수수료, 세금, 실시간 시세는 계산에 포함하지 않음

---

## File Map

| 파일 | 역할 |
|------|------|
| `lib/tools.ts` | 전체 도구 목록 레지스트리 |
| `lib/calculations.ts` | 순수 계산 함수 (서버/클라이언트 공용) |
| `lib/calculations.test.ts` | 계산 로직 단위 테스트 |
| `components/layout/Navbar.tsx` | 공통 네비게이션 |
| `components/layout/AdSlot.tsx` | 광고 슬롯 (위치별 props) |
| `components/layout/CalculatorLayout.tsx` | 계산기 페이지 공통 래퍼 (사이드바 포함) |
| `components/home/ToolCard.tsx` | 홈 도구 카드 |
| `components/JsonLd.tsx` | JSON-LD 구조화 데이터 |
| `components/calculators/MultaCalculator.tsx` | 물타기 계산기 UI |
| `components/calculators/DividendCalculator.tsx` | 배당 계산기 UI |
| `components/calculators/FairValueCalculator.tsx` | 적정가 계산기 UI |
| `components/calculators/ReturnRateCalculator.tsx` | 수익률 계산기 UI |
| `components/calculators/TargetPriceCalculator.tsx` | 목표가/손절가 계산기 UI |
| `components/calculators/AveragingDownTargetCalculator.tsx` | 추가 매수 필요 금액 계산기 UI |
| `components/calculators/CompoundReturnCalculator.tsx` | 복리 수익 계산기 UI |
| `components/calculators/DividendReinvestCalculator.tsx` | 배당 재투자 계산기 UI |
| `app/layout.tsx` | 루트 레이아웃 (AdSense 스크립트 자리) |
| `app/page.tsx` | 홈 페이지 |
| `app/calculators/multa/page.tsx` | 물타기 페이지 |
| `app/calculators/dividend/page.tsx` | 배당 페이지 |
| `app/calculators/fair-value/page.tsx` | 적정가 페이지 |
| `app/calculators/return-rate/page.tsx` | 수익률 페이지 |
| `app/calculators/target-price/page.tsx` | 목표가/손절가 페이지 |
| `app/calculators/averaging-down-target/page.tsx` | 추가 매수 필요 금액 페이지 |
| `app/calculators/compound-return/page.tsx` | 복리 수익 페이지 |
| `app/calculators/dividend-reinvest/page.tsx` | 배당 재투자 페이지 |
| `app/sitemap.ts` | 자동 사이트맵 생성 |
| `app/robots.ts` | robots.txt |

---

### Task 1: 프로젝트 초기 설정

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json` (create-next-app 자동 생성)
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Next.js 프로젝트 생성**

`C:\Users\USER\code\stock-web-tool` 폴더 안에서 실행. docs 폴더가 이미 있으므로 `.` 으로 현재 폴더에 생성.

```bash
cd C:\Users\USER\code\stock-web-tool
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Next.js 14 프로젝트가 현재 폴더에 생성됨 (docs 폴더는 유지됨).

- [ ] **Step 2: 테스트 도구 설치**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

- [ ] **Step 3: jest.config.ts 생성**

```ts
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 4: jest.setup.ts 생성**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: package.json scripts에 test 추가**

`package.json`의 `"scripts"` 블록에 아래 두 줄 추가:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: 기본 실행 확인**

```bash
npm run dev
```

Expected: `http://localhost:3000` 에서 Next.js 기본 페이지 확인 후 Ctrl+C 종료.

- [ ] **Step 7: 커밋**

```bash
git add .
git commit -m "chore: initialize Next.js 14 project with Tailwind and Jest"
```

---

### Task 2: 도구 레지스트리 & 계산 로직 (TDD)

**Files:**
- Create: `lib/tools.ts`
- Create: `lib/calculations.ts`
- Create: `lib/calculations.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

```ts
// lib/calculations.test.ts
import { calcMulta, calcDividend, calcFairValue } from './calculations'

describe('calcMulta', () => {
  it('새 평단가를 계산한다', () => {
    const result = calcMulta({ avgPrice: 50000, qty: 100, addPrice: 40000, addQty: 50 })
    expect(result.newAvgPrice).toBeCloseTo(46666.67, 1)
  })
  it('총 투자금을 계산한다', () => {
    const result = calcMulta({ avgPrice: 50000, qty: 100, addPrice: 40000, addQty: 50 })
    expect(result.totalInvestment).toBe(7000000)
  })
  it('손익분기점은 새 평단가와 같다', () => {
    const result = calcMulta({ avgPrice: 50000, qty: 100, addPrice: 40000, addQty: 50 })
    expect(result.breakEven).toBeCloseTo(result.newAvgPrice, 5)
  })
})

describe('calcDividend', () => {
  it('배당수익률을 계산한다', () => {
    const result = calcDividend({ stockPrice: 50000, dividendPerShare: 2000, qty: 100 })
    expect(result.yieldPercent).toBe(4)
  })
  it('연간 수령액을 계산한다', () => {
    const result = calcDividend({ stockPrice: 50000, dividendPerShare: 2000, qty: 100 })
    expect(result.annualIncome).toBe(200000)
  })
  it('월 환산액을 계산한다', () => {
    const result = calcDividend({ stockPrice: 50000, dividendPerShare: 2000, qty: 100 })
    expect(result.monthlyIncome).toBeCloseTo(16666.67, 1)
  })
})

describe('calcFairValue', () => {
  it('PER 적정가를 계산한다', () => {
    const result = calcFairValue({ eps: 5000, targetPer: 15, bps: 30000, targetPbr: 1.5 })
    expect(result.perPrice).toBe(75000)
  })
  it('PBR 적정가를 계산한다', () => {
    const result = calcFairValue({ eps: 5000, targetPer: 15, bps: 30000, targetPbr: 1.5 })
    expect(result.pbrPrice).toBe(45000)
  })
  it('평균 적정가를 계산한다', () => {
    const result = calcFairValue({ eps: 5000, targetPer: 15, bps: 30000, targetPbr: 1.5 })
    expect(result.avgPrice).toBe(60000)
  })
})
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

```bash
npm test lib/calculations.test.ts
```

Expected: FAIL — "Cannot find module './calculations'"

- [ ] **Step 3: calculations.ts 구현**

```ts
// lib/calculations.ts

export interface MultaInput {
  avgPrice: number
  qty: number
  addPrice: number
  addQty: number
}
export interface MultaResult {
  newAvgPrice: number
  totalInvestment: number
  breakEven: number
}
export function calcMulta(input: MultaInput): MultaResult {
  const { avgPrice, qty, addPrice, addQty } = input
  const totalInvestment = avgPrice * qty + addPrice * addQty
  const newAvgPrice = totalInvestment / (qty + addQty)
  return { newAvgPrice, totalInvestment, breakEven: newAvgPrice }
}

export interface DividendInput {
  stockPrice: number
  dividendPerShare: number
  qty: number
}
export interface DividendResult {
  yieldPercent: number
  annualIncome: number
  monthlyIncome: number
}
export function calcDividend(input: DividendInput): DividendResult {
  const { stockPrice, dividendPerShare, qty } = input
  const yieldPercent = (dividendPerShare / stockPrice) * 100
  const annualIncome = dividendPerShare * qty
  return { yieldPercent, annualIncome, monthlyIncome: annualIncome / 12 }
}

export interface FairValueInput {
  eps: number
  targetPer: number
  bps: number
  targetPbr: number
}
export interface FairValueResult {
  perPrice: number
  pbrPrice: number
  avgPrice: number
}
export function calcFairValue(input: FairValueInput): FairValueResult {
  const { eps, targetPer, bps, targetPbr } = input
  const perPrice = eps * targetPer
  const pbrPrice = bps * targetPbr
  return { perPrice, pbrPrice, avgPrice: (perPrice + pbrPrice) / 2 }
}

export interface ReturnRateInput {
  buyPrice: number
  currentPrice: number
  qty: number
}

export interface TargetPriceInput {
  entryPrice: number
  profitPercent: number
  lossPercent: number
}

export interface AveragingDownTargetInput {
  avgPrice: number
  qty: number
  currentPrice: number
  targetAvgPrice: number
}

export interface CompoundReturnInput {
  principal: number
  monthlyContribution: number
  annualRate: number
  years: number
}

export interface DividendReinvestInput {
  stockPrice: number
  dividendPerShare: number
  qty: number
  years: number
}
```

- [ ] **Step 3-1: 계산 규칙 명시**

구현 전에 아래 규칙을 `lib/calculations.ts` 주석 또는 별도 문서에 반영:

- 모든 입력값은 필수이며 `0` 초과
- 수량은 정수만 허용, 가격/EPS/BPS/PER/PBR은 소수 입력 허용
- 수수료, 세금, 실시간 시세는 MVP 계산에서 제외
- 금액은 표시 단계에서 정수 원 단위 반올림, 수익률은 소수점 둘째 자리까지 표시
- EPS/BPS가 음수인 경우는 MVP 범위 밖으로 보고 입력 오류 처리
- 추가 매수 필요 금액 계산기에서는 `targetAvgPrice > currentPrice` 조건을 만족해야 함

- [ ] **Step 3-2: 신규 계산기 5종 명세 추가**

이번 단계에서 아래 5개 계산 함수를 `lib/calculations.ts`와 테스트에 함께 추가:

- `calcReturnRate`
- `calcTargetPrice`
- `calcAveragingDownTarget`
- `calcCompoundReturn`
- `calcDividendReinvest`

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test lib/calculations.test.ts
```

Expected: PASS — 3 suites, 9 tests.

- [ ] **Step 5: tools.ts 작성**

```ts
// lib/tools.ts

export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  href: string
  category: 'calculator' | 'info'
}

export const tools: Tool[] = [
  {
    slug: 'multa',
    name: '물타기 계산기',
    description: '추가 매수 후 새로운 평단가를 즉시 계산',
    icon: '📉',
    href: '/calculators/multa',
    category: 'calculator',
  },
  {
    slug: 'dividend',
    name: '배당 계산기',
    description: '배당수익률과 연간 수령액을 바로 확인',
    icon: '💰',
    href: '/calculators/dividend',
    category: 'calculator',
  },
  {
    slug: 'fair-value',
    name: '적정주가 계산기',
    description: 'PER·PBR 기반으로 종목 적정가를 계산',
    icon: '📊',
    href: '/calculators/fair-value',
    category: 'calculator',
  },
  {
    slug: 'return-rate',
    name: '수익률 계산기',
    description: '평가손익과 수익률을 즉시 계산',
    icon: '📈',
    href: '/calculators/return-rate',
    category: 'calculator',
  },
  {
    slug: 'target-price',
    name: '목표가/손절가 계산기',
    description: '진입가 기준 목표가와 손절가를 계산',
    icon: '🎯',
    href: '/calculators/target-price',
    category: 'calculator',
  },
  {
    slug: 'averaging-down-target',
    name: '추가 매수 필요 금액 계산기',
    description: '목표 평단가까지 필요한 추가 매수를 계산',
    icon: '🧮',
    href: '/calculators/averaging-down-target',
    category: 'calculator',
  },
  {
    slug: 'compound-return',
    name: '복리 수익 계산기',
    description: '복리 기준 미래 자산을 계산',
    icon: '🌱',
    href: '/calculators/compound-return',
    category: 'calculator',
  },
  {
    slug: 'dividend-reinvest',
    name: '배당 재투자 계산기',
    description: '배당 재투자 시 자산 증가를 계산',
    icon: '♻️',
    href: '/calculators/dividend-reinvest',
    category: 'calculator',
  },
]
```

- [ ] **Step 6: 커밋**

```bash
git add lib/
git commit -m "feat: add tool registry and calculation logic with tests"
```

---

### Task 3: 공통 레이아웃 컴포넌트

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/AdSlot.tsx`
- Create: `components/layout/CalculatorLayout.tsx`
- Create: `components/JsonLd.tsx`

- [ ] **Step 1: Navbar.tsx 작성**

```tsx
// components/layout/Navbar.tsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-600 hover:text-blue-700">
          📈 주식 계산기
        </Link>
        <div className="flex gap-4 text-sm text-gray-600">
          <Link href="/calculators/multa" className="hover:text-blue-600">물타기</Link>
          <Link href="/calculators/dividend" className="hover:text-blue-600">배당</Link>
          <Link href="/calculators/fair-value" className="hover:text-blue-600">적정가</Link>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: AdSlot.tsx 작성**

```tsx
// components/layout/AdSlot.tsx
'use client'

interface AdSlotProps {
  position: 'home-bottom' | 'sidebar-top' | 'sidebar-bottom' | 'footer'
  slotId?: string
}

const sizeMap: Record<AdSlotProps['position'], string> = {
  'home-bottom': 'h-24',
  'sidebar-top': 'h-40',
  'sidebar-bottom': 'h-40',
  'footer': 'h-24',
}

export default function AdSlot({ position, slotId }: AdSlotProps) {
  if (slotId) {
    return (
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    )
  }

  return (
    <div className={`${sizeMap[position]} w-full rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-300`}>
      광고 슬롯 ({position})
    </div>
  )
}
```

- [ ] **Step 3: CalculatorLayout.tsx 작성**

```tsx
// components/layout/CalculatorLayout.tsx
import Link from 'next/link'
import { tools } from '@/lib/tools'
import AdSlot from './AdSlot'

interface CalculatorLayoutProps {
  title: string
  description: string
  currentSlug: string
  explainerContent: React.ReactNode
  children: React.ReactNode
}

export default function CalculatorLayout({
  title,
  description,
  currentSlug,
  explainerContent,
  children,
}: CalculatorLayoutProps) {
  const otherTools = tools.filter(t => t.slug !== currentSlug)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mb-8 text-gray-500">{description}</p>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">{children}</div>

        <aside className="flex flex-col gap-4 lg:w-72">
          <AdSlot position="sidebar-top" />
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">다른 계산기</h3>
            <ul className="flex flex-col gap-2">
              {otherTools.map(tool => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <span>{tool.icon}</span>
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <AdSlot position="sidebar-bottom" />
        </aside>
      </div>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <div className="prose prose-sm max-w-none text-gray-700">{explainerContent}</div>
      </div>

      <div className="mt-8">
        <AdSlot position="footer" />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: JsonLd.tsx 작성**

```tsx
// components/JsonLd.tsx
interface JsonLdProps {
  name: string
  description: string
  path: string
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function JsonLd({ name, description, path }: JsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${BASE_URL}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 5: 커밋**

```bash
git add components/layout/ components/JsonLd.tsx
git commit -m "feat: add Navbar, AdSlot, CalculatorLayout, JsonLd components"
```

---

### Task 4: 홈 페이지

**Files:**
- Create: `components/home/ToolCard.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: ToolCard.tsx 작성**

```tsx
// components/home/ToolCard.tsx
import Link from 'next/link'
import { Tool } from '@/lib/tools'

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="flex flex-col gap-3 rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all"
    >
      <span className="text-3xl">{tool.icon}</span>
      <div>
        <h2 className="font-semibold text-gray-900">{tool.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{tool.description}</p>
      </div>
      <span className="mt-auto text-sm font-medium text-blue-600">바로 계산하기 →</span>
    </Link>
  )
}
```

- [ ] **Step 2: app/layout.tsx 교체**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '주식 계산기 모음 - 로그인 없이 바로 사용',
    template: '%s | 주식 계산기',
  },
  description: '물타기, 배당, 적정가 계산기를 무료로 제공합니다. 로그인 없이 바로 사용하세요.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 애드센스 승인 후 ca-pub-XXXX 교체 후 주석 해제 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: app/page.tsx 교체**

```tsx
// app/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { tools } from '@/lib/tools'
import ToolCard from '@/components/home/ToolCard'
import AdSlot from '@/components/layout/AdSlot'

export const metadata: Metadata = {
  title: '주식 계산기 모음 - 로그인 없이 바로 사용',
  description: '물타기, 배당, 적정가 계산기를 무료로 제공합니다.',
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* 모바일: 히어로 + 리스트 */}
      <div className="md:hidden">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white text-center">
          <h1 className="text-2xl font-bold">주식 계산기 모음</h1>
          <p className="mt-2 text-blue-100 text-sm">로그인 없이 바로 쓰는 투자 도구</p>
        </div>
        <ul className="flex flex-col gap-3">
          {tools.map(tool => (
            <li key={tool.slug}>
              <Link
                href={tool.href}
                className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{tool.name}</div>
                  <div className="text-sm text-gray-500">{tool.description}</div>
                </div>
                <span className="ml-auto text-blue-600">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 데스크탑: 카드 그리드 */}
      <div className="hidden md:block">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">주식 계산기 모음</h1>
          <p className="mt-2 text-gray-500">로그인 없이 바로 쓰는 투자 도구</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <AdSlot position="home-bottom" />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 실행 확인**

```bash
npm run dev
```

`http://localhost:3000` 접속. 데스크탑에서 카드 3개, DevTools에서 375px로 모바일 전환 시 히어로+리스트 확인.

- [ ] **Step 5: 커밋**

```bash
git add app/page.tsx app/layout.tsx components/home/
git commit -m "feat: add home page with responsive card grid and hero layout"
```

---

### Task 5: 물타기 계산기 페이지

**Files:**
- Create: `components/calculators/MultaCalculator.tsx`
- Create: `app/calculators/multa/page.tsx`

- [ ] **Step 1: MultaCalculator.tsx 작성**

```tsx
// components/calculators/MultaCalculator.tsx
'use client'

import { useState } from 'react'
import { calcMulta } from '@/lib/calculations'

export default function MultaCalculator() {
  const [avgPrice, setAvgPrice] = useState('')
  const [qty, setQty] = useState('')
  const [addPrice, setAddPrice] = useState('')
  const [addQty, setAddQty] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcMulta> | null>(null)

  function handleCalc() {
    const input = {
      avgPrice: Number(avgPrice),
      qty: Number(qty),
      addPrice: Number(addPrice),
      addQty: Number(addQty),
    }
    if (Object.values(input).some(v => isNaN(v) || v <= 0)) return
    setResult(calcMulta(input))
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">현재 평단가 (원)</label>
          <input type="number" value={avgPrice} onChange={e => setAvgPrice(e.target.value)} placeholder="50000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">보유 수량 (주)</label>
          <input type="number" value={qty} onChange={e => setQty(e.target.value)} placeholder="100"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">추가 매수가 (원)</label>
          <input type="number" value={addPrice} onChange={e => setAddPrice(e.target.value)} placeholder="40000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">추가 수량 (주)</label>
          <input type="number" value={addQty} onChange={e => setAddQty(e.target.value)} placeholder="50"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <button onClick={handleCalc}
        className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
        계산하기
      </button>

      {result && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">새 평단가</div>
            <div className="text-lg font-bold text-blue-700">{Math.round(result.newAvgPrice).toLocaleString()}원</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">총 투자금</div>
            <div className="text-lg font-bold text-gray-800">{result.totalInvestment.toLocaleString()}원</div>
          </div>
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">손익분기점</div>
            <div className="text-lg font-bold text-green-700">{Math.round(result.breakEven).toLocaleString()}원</div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 물타기 페이지 작성**

```tsx
// app/calculators/multa/page.tsx
import type { Metadata } from 'next'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import MultaCalculator from '@/components/calculators/MultaCalculator'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: '물타기 계산기 - 주식 평단가 계산',
  description: '현재 평단가와 추가 매수 수량 입력 시 새 평단가를 즉시 계산합니다. 로그인 없이 무료로 사용하세요.',
}

const explainer = (
  <div>
    <h2 className="text-lg font-bold mb-3">물타기란?</h2>
    <p className="mb-3">물타기(평균단가 낮추기)란 보유 중인 주식의 주가가 하락했을 때 추가로 매수하여 평균 매입 단가를 낮추는 투자 전략입니다. 평단가가 낮아지면 주가가 원래 매수가까지 회복하지 않아도 수익을 낼 수 있는 구간이 넓어집니다.</p>
    <h3 className="font-semibold mb-2">계산 방법</h3>
    <p className="mb-3">새 평단가 = (기존 평단가 × 보유 수량 + 추가 매수가 × 추가 수량) ÷ (보유 수량 + 추가 수량)</p>
    <h3 className="font-semibold mb-2">주의사항</h3>
    <p>물타기는 주가가 장기적으로 회복한다는 전제 하에 유효한 전략입니다. 회사의 펀더멘털이 훼손된 경우엔 오히려 손실을 키울 수 있으므로, 추가 매수 전 기업 상황을 반드시 재검토하세요.</p>
  </div>
)

export default function MultaPage() {
  return (
    <>
      <JsonLd
        name="물타기 계산기"
        description="주식 추가 매수 후 새로운 평단가를 즉시 계산합니다"
        path="/calculators/multa"
      />
      <CalculatorLayout title="물타기 계산기" description="추가 매수 후 새로운 평단가를 즉시 계산합니다" currentSlug="multa" explainerContent={explainer}>
        <MultaCalculator />
      </CalculatorLayout>
    </>
  )
}
```

- [ ] **Step 3: 실행 확인**

```bash
npm run dev
```

`http://localhost:3000/calculators/multa` 접속. 값 입력 후 계산하기 클릭 시 새 평단가·총 투자금·손익분기점 표시 확인.

- [ ] **Step 4: 커밋**

```bash
git add components/calculators/MultaCalculator.tsx app/calculators/multa/
git commit -m "feat: add 물타기 calculator page"
```

---

### Task 6: 배당 계산기 페이지

**Files:**
- Create: `components/calculators/DividendCalculator.tsx`
- Create: `app/calculators/dividend/page.tsx`

- [ ] **Step 1: DividendCalculator.tsx 작성**

```tsx
// components/calculators/DividendCalculator.tsx
'use client'

import { useState } from 'react'
import { calcDividend } from '@/lib/calculations'

export default function DividendCalculator() {
  const [stockPrice, setStockPrice] = useState('')
  const [dividendPerShare, setDividendPerShare] = useState('')
  const [qty, setQty] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcDividend> | null>(null)

  function handleCalc() {
    const input = {
      stockPrice: Number(stockPrice),
      dividendPerShare: Number(dividendPerShare),
      qty: Number(qty),
    }
    if (Object.values(input).some(v => isNaN(v) || v <= 0)) return
    setResult(calcDividend(input))
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">현재 주가 (원)</label>
          <input type="number" value={stockPrice} onChange={e => setStockPrice(e.target.value)} placeholder="50000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주당 배당금 (원)</label>
          <input type="number" value={dividendPerShare} onChange={e => setDividendPerShare(e.target.value)} placeholder="2000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">보유 수량 (주)</label>
          <input type="number" value={qty} onChange={e => setQty(e.target.value)} placeholder="100"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <button onClick={handleCalc}
        className="w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors">
        계산하기
      </button>

      {result && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">배당수익률</div>
            <div className="text-lg font-bold text-green-700">{result.yieldPercent.toFixed(2)}%</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">연간 수령액</div>
            <div className="text-lg font-bold text-gray-800">{result.annualIncome.toLocaleString()}원</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">월 환산액</div>
            <div className="text-lg font-bold text-blue-700">{Math.round(result.monthlyIncome).toLocaleString()}원</div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 배당 페이지 작성**

```tsx
// app/calculators/dividend/page.tsx
import type { Metadata } from 'next'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import DividendCalculator from '@/components/calculators/DividendCalculator'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: '배당 계산기 - 배당수익률 & 연간 수령액',
  description: '보유 주식의 배당수익률과 연간 배당금을 바로 계산합니다. 로그인 없이 무료로 사용하세요.',
}

const explainer = (
  <div>
    <h2 className="text-lg font-bold mb-3">배당수익률이란?</h2>
    <p className="mb-3">배당수익률은 주가 대비 주당 배당금의 비율로, 배당만으로 얼마의 수익을 얻을 수 있는지 나타냅니다. 배당수익률(%) = (주당 배당금 ÷ 현재 주가) × 100</p>
    <h3 className="font-semibold mb-2">배당주 투자 기초</h3>
    <p className="mb-3">국내 주식의 배당은 보통 연 1~4회 지급되며, 배당기준일(보통 12월 말)까지 주식을 보유해야 배당을 받을 수 있습니다. 연간 수령액을 12로 나누면 월 환산 수령액을 파악할 수 있습니다.</p>
    <h3 className="font-semibold mb-2">주의사항</h3>
    <p>배당수익률이 높다고 무조건 좋은 것은 아닙니다. 주가 급락으로 수익률이 높아 보이는 경우도 있으므로 기업의 배당 지속 가능성과 재무 건전성을 함께 확인하세요.</p>
  </div>
)

export default function DividendPage() {
  return (
    <>
      <JsonLd
        name="배당 계산기"
        description="보유 주식의 배당수익률과 연간 배당금을 바로 계산합니다"
        path="/calculators/dividend"
      />
      <CalculatorLayout title="배당 계산기" description="배당수익률과 연간·월간 수령액을 즉시 계산합니다" currentSlug="dividend" explainerContent={explainer}>
        <DividendCalculator />
      </CalculatorLayout>
    </>
  )
}
```

- [ ] **Step 3: 실행 확인**

```bash
npm run dev
```

`http://localhost:3000/calculators/dividend` 접속. 값 입력 후 배당수익률·연간 수령액·월 환산액 확인.

- [ ] **Step 4: 커밋**

```bash
git add components/calculators/DividendCalculator.tsx app/calculators/dividend/
git commit -m "feat: add 배당 calculator page"
```

---

### Task 7: 적정가 계산기 페이지

**Files:**
- Create: `components/calculators/FairValueCalculator.tsx`
- Create: `app/calculators/fair-value/page.tsx`

- [ ] **Step 1: FairValueCalculator.tsx 작성**

```tsx
// components/calculators/FairValueCalculator.tsx
'use client'

import { useState } from 'react'
import { calcFairValue } from '@/lib/calculations'

export default function FairValueCalculator() {
  const [eps, setEps] = useState('')
  const [targetPer, setTargetPer] = useState('')
  const [bps, setBps] = useState('')
  const [targetPbr, setTargetPbr] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcFairValue> | null>(null)

  function handleCalc() {
    const input = {
      eps: Number(eps),
      targetPer: Number(targetPer),
      bps: Number(bps),
      targetPbr: Number(targetPbr),
    }
    if (Object.values(input).some(v => isNaN(v) || v <= 0)) return
    setResult(calcFairValue(input))
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주당순이익 EPS (원)</label>
          <input type="number" value={eps} onChange={e => setEps(e.target.value)} placeholder="5000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 PER (배)</label>
          <input type="number" value={targetPer} onChange={e => setTargetPer(e.target.value)} placeholder="15"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주당순자산 BPS (원)</label>
          <input type="number" value={bps} onChange={e => setBps(e.target.value)} placeholder="30000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 PBR (배)</label>
          <input type="number" value={targetPbr} onChange={e => setTargetPbr(e.target.value)} placeholder="1.5"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <button onClick={handleCalc}
        className="w-full rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
        계산하기
      </button>

      {result && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-orange-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">PER 적정가</div>
            <div className="text-lg font-bold text-orange-700">{result.perPrice.toLocaleString()}원</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">PBR 적정가</div>
            <div className="text-lg font-bold text-gray-800">{result.pbrPrice.toLocaleString()}원</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">평균 적정가</div>
            <div className="text-lg font-bold text-blue-700">{result.avgPrice.toLocaleString()}원</div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 적정가 페이지 작성**

```tsx
// app/calculators/fair-value/page.tsx
import type { Metadata } from 'next'
import CalculatorLayout from '@/components/layout/CalculatorLayout'
import FairValueCalculator from '@/components/calculators/FairValueCalculator'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: '적정주가 계산기 - PER PBR 기반',
  description: 'PER, PBR 방식으로 종목의 적정주가를 계산합니다. 로그인 없이 무료로 사용하세요.',
}

const explainer = (
  <div>
    <h2 className="text-lg font-bold mb-3">적정주가란?</h2>
    <p className="mb-3">적정주가는 기업의 실적과 자산 가치를 기준으로 산출한 이론적인 주가입니다. 현재 주가가 적정주가보다 낮으면 저평가, 높으면 고평가 상태로 볼 수 있습니다.</p>
    <h3 className="font-semibold mb-2">PER 방식</h3>
    <p className="mb-3">PER 적정가 = EPS(주당순이익) × 목표 PER. 동일 업종의 평균 PER 또는 해당 기업의 과거 평균 PER을 목표값으로 사용합니다.</p>
    <h3 className="font-semibold mb-2">PBR 방식</h3>
    <p className="mb-3">PBR 적정가 = BPS(주당순자산) × 목표 PBR. PBR 1배는 청산 가치와 동일하며, 업종별로 적정 기준이 다릅니다.</p>
    <h3 className="font-semibold mb-2">주의사항</h3>
    <p>두 방식의 평균값을 참고치로만 활용하세요. 성장주는 PER이 높게 거래되고, 자산 집약 업종은 PBR이 중요합니다. 다양한 지표를 종합적으로 분석하세요.</p>
  </div>
)

export default function FairValuePage() {
  return (
    <>
      <JsonLd
        name="적정주가 계산기"
        description="PER, PBR 방식으로 종목의 적정주가를 계산합니다"
        path="/calculators/fair-value"
      />
      <CalculatorLayout title="적정주가 계산기" description="PER·PBR 기반으로 종목의 적정주가를 계산합니다" currentSlug="fair-value" explainerContent={explainer}>
        <FairValueCalculator />
      </CalculatorLayout>
    </>
  )
}
```

- [ ] **Step 3: 실행 확인**

```bash
npm run dev
```

`http://localhost:3000/calculators/fair-value` 접속. 값 입력 후 PER·PBR·평균 적정가 표시 확인.

- [ ] **Step 4: 커밋**

```bash
git add components/calculators/FairValueCalculator.tsx app/calculators/fair-value/
git commit -m "feat: add 적정가 calculator page"
```

---

### Task 8: SEO — 사이트맵, robots.txt

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: sitemap.ts 작성**

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { tools } from '@/lib/tools'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map(tool => ({
    url: `${BASE_URL}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    ...toolPages,
  ]
}
```

- [ ] **Step 3: robots.ts 작성**

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

- [ ] **Step 4: 전체 빌드 확인**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. 출력에서 `/sitemap.xml`, `/robots.txt` 경로 확인.

- [ ] **Step 5: 커밋**

```bash
git add components/JsonLd.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: add JSON-LD structured data, sitemap, and robots.txt"
```

---

### Task 9: 신규 계산기 5종 추가

**Files:**
- Create: `components/calculators/ReturnRateCalculator.tsx`
- Create: `components/calculators/TargetPriceCalculator.tsx`
- Create: `components/calculators/AveragingDownTargetCalculator.tsx`
- Create: `components/calculators/CompoundReturnCalculator.tsx`
- Create: `components/calculators/DividendReinvestCalculator.tsx`
- Create: `app/calculators/return-rate/page.tsx`
- Create: `app/calculators/target-price/page.tsx`
- Create: `app/calculators/averaging-down-target/page.tsx`
- Create: `app/calculators/compound-return/page.tsx`
- Create: `app/calculators/dividend-reinvest/page.tsx`
- Modify: `lib/tools.ts`
- Modify: `lib/calculations.ts`
- Modify: `lib/calculations.test.ts`

- [ ] **Step 1: 수익률 계산기 추가**

입력: 매수단가, 현재가, 보유 수량
출력: 평가금액, 평가손익, 수익률

- [ ] **Step 2: 목표가/손절가 계산기 추가**

입력: 진입가, 목표 수익률, 손절률
출력: 목표가, 손절가

- [ ] **Step 3: 추가 매수 필요 금액 계산기 추가**

입력: 현재 평단가, 보유 수량, 현재가, 목표 평단가
출력: 필요한 추가 수량, 추가 매수 금액

- [ ] **Step 4: 복리 수익 계산기 추가**

입력: 초기 투자금, 월 적립액, 연 수익률, 투자 기간
출력: 만기 자산, 투자원금, 예상 수익

- [ ] **Step 5: 배당 재투자 계산기 추가**

입력: 현재 주가, 주당 배당금, 보유 수량, 투자 기간
출력: 누적 배당금, 예상 보유 수량, 예상 자산

- [ ] **Step 6: 홈 카드, 사이드바, 사이트맵 자동 반영 확인**

`lib/tools.ts`만 수정해 홈/사이드바/사이트맵에 모두 반영되는지 확인

- [ ] **Step 7: 전체 테스트 및 빌드 확인**

```bash
npm test -- --runInBand
npm run build
```

- [ ] **Step 8: 커밋**

```bash
git add lib/ app/calculators/ components/calculators/
git commit -m "feat: add five more stock calculators"
```

---

### Task 10: Vercel 배포

- [ ] **Step 1: .gitignore에 .superpowers 추가**

`.gitignore` 파일 맨 아래에 추가:

```
.superpowers/
```

- [ ] **Step 2: 전체 테스트 + 빌드 최종 확인**

```bash
npm test
npm run build
```

Expected: 테스트 9개 PASS, 빌드 성공.

- [ ] **Step 3: GitHub push**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers directory"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

- [ ] **Step 4: Vercel 배포**

1. https://vercel.com 로그인 → "Add New Project"
2. GitHub 저장소 선택
3. Framework Preset: **Next.js** (자동 감지됨)
4. 환경변수에 `NEXT_PUBLIC_SITE_URL=https://<실제-도메인>` 추가
5. "Deploy" 클릭

Expected: `https://<project-name>.vercel.app` URL 발급.

- [ ] **Step 5: 도메인 확정 후 환경변수 값만 업데이트**

실제 도메인 확정 후 Vercel 프로젝트와 로컬 `.env`에서 `NEXT_PUBLIC_SITE_URL` 값만 맞춘다.

```bash
npm run build
```

- [ ] **Step 6: 구글 서치 콘솔 등록**

1. https://search.google.com/search-console 접속
2. URL prefix 방식으로 도메인 등록 및 소유권 인증
3. Sitemaps 메뉴 → `https://<실제-도메인>/sitemap.xml` 제출

---

## 새 계산기 추가 방법 (참고)

나중에 계산기를 추가할 때는 3가지 작업:

1. `lib/tools.ts`에 항목 추가
2. `app/calculators/<slug>/page.tsx` 생성
3. `components/calculators/<Name>Calculator.tsx` 생성

홈 카드·사이드바 링크·사이트맵은 자동 반영됨.
