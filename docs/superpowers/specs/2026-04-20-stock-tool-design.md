# 주식 계산기 & 정보 허브 — 개발 스펙

## 개요

로그인 없이 바로 사용하는 주식 투자 계산기 모음 사이트.
Google AdSense 광고 수익을 목표로 SEO 최적화된 계산기 독립 페이지 구조로 운영.
계산기와 정보 페이지를 지속적으로 추가할 수 있는 확장형 구조.

---

## 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 14 (App Router) | SSG로 SEO 최적화 |
| 스타일 | Tailwind CSS | |
| 배포 | Vercel 무료 티어 | 월 100GB 대역폭, 서버리스 10초 제한 |
| 광고 | Google AdSense | 심사 전엔 빈 슬롯으로 렌더링 |

### Vercel 무료 티어 제약
- 서버리스 함수 실행 10초 제한 → 계산기는 순수 클라이언트 계산이므로 무관
- 월 100GB 대역폭 → 초기 트래픽엔 충분, 월 30만 PV 초과 시 재검토

### MVP 범위 명시
- 이번 버전은 물타기/배당/적정가/수익률/목표가-손절가/추가 매수 필요 금액/복리 수익/배당 재투자 계산기, 홈 페이지, 공통 레이아웃, 기본 광고 슬롯까지 포함
- 각 계산기 페이지에는 짧은 개념 설명 섹션을 포함
- 500~800자 수준의 SEO 확장 카피, 뉴스 페이지, 배당주 정보 페이지는 Should 단계에서 보강

### MVP 이후 확장 후보
- Supabase 무료 티어: 뉴스/정보 페이지나 외부 데이터 저장이 필요해질 때 도입 검토
- 무료 티어 기준 DB 500MB, 월 2GB 전송이므로 뉴스 연동 시 응답 캐싱 전략 필요

---

## 프로젝트 구조

```
app/
  page.tsx                        ← 홈 (도구 목록)
  layout.tsx                      ← 루트 레이아웃 (애드센스 스크립트 포함)
  calculators/
    multa/page.tsx                 ← 물타기 계산기
    dividend/page.tsx              ← 배당 계산기
    fair-value/page.tsx            ← 적정가 계산기
    return-rate/page.tsx           ← 수익률 계산기
    target-price/page.tsx          ← 목표가/손절가 계산기
    averaging-down-target/page.tsx ← 추가 매수 필요 금액 계산기
    compound-return/page.tsx       ← 복리 수익 계산기
    dividend-reinvest/page.tsx     ← 배당 재투자 계산기
  info/                            ← Should 단계 확장
    news/page.tsx
  sitemap.ts                       ← 자동 사이트맵 생성
  robots.ts                        ← robots.txt
components/
  layout/
    CalculatorLayout.tsx           ← 계산기 페이지 공통 래퍼
    AdSlot.tsx                     ← 광고 슬롯 (위치별 props)
    Navbar.tsx
  calculators/
    MultaCalculator.tsx
    DividendCalculator.tsx
    FairValueCalculator.tsx
    ReturnRateCalculator.tsx
    TargetPriceCalculator.tsx
    AveragingDownTargetCalculator.tsx
    CompoundReturnCalculator.tsx
    DividendReinvestCalculator.tsx
  home/
    ToolCard.tsx                   ← 홈 카드 컴포넌트
lib/
  tools.ts                         ← 전체 도구 목록 (홈 카드 자동 생성)
```

---

## 페이지 설계

### 홈 페이지 (`/`)

- **데스크탑:** 도구 카드 3열 그리드. `lib/tools.ts`에 항목 추가 시 카드 자동 생성
- **모바일:** 히어로 배너(사이트명 + 한줄 설명) + 세로 리스트
- 카드 구성: 아이콘 + 도구명 + 한줄 설명 + 이동 링크
- 하단 애드센스 슬롯 1개

### 계산기 페이지 (`/calculators/*`)

`CalculatorLayout`이 모든 계산기를 동일한 틀로 감쌈:

```
[Navbar]
[페이지 제목 + 설명]

데스크탑: [계산기 영역 (좌 2/3)] | [사이드바 (우 1/3)]
모바일:   [계산기 영역]
          [사이드바 내용 세로 배치]

사이드바:
  - AdSlot (sidebar-top)
  - 다른 계산기 링크 목록
  - AdSlot (sidebar-bottom)

[하단: 개념 설명 섹션 (MVP는 짧은 설명, SEO 확장 카피는 추후 보강)]
[하단: AdSlot (footer)]
```

### 계산기별 입출력

| 계산기 | 입력 | 출력 |
|--------|------|------|
| 물타기 (`/calculators/multa`) | 현재 평단가, 보유 수량, 추가 매수가, 추가 수량 | 새 평단가, 총 투자금, 손익분기점 |
| 배당 (`/calculators/dividend`) | 주가, 주당 배당금, 보유 수량 | 배당수익률, 연간 수령액, 월 환산액 |
| 적정가 (`/calculators/fair-value`) | EPS, 목표 PER, BPS, 목표 PBR | PER 적정가, PBR 적정가, 평균 적정가 |
| 수익률 (`/calculators/return-rate`) | 매수단가, 현재가, 보유 수량 | 평가금액, 평가손익, 수익률 |
| 목표가/손절가 (`/calculators/target-price`) | 진입가, 목표 수익률, 손절률 | 목표가, 손절가 |
| 추가 매수 필요 금액 (`/calculators/averaging-down-target`) | 현재 평단가, 보유 수량, 현재가, 목표 평단가 | 필요한 추가 수량, 추가 매수 금액 |
| 복리 수익 (`/calculators/compound-return`) | 초기 투자금, 월 적립액, 연 수익률, 투자 기간 | 만기 자산, 투자원금, 예상 수익 |
| 배당 재투자 (`/calculators/dividend-reinvest`) | 현재 주가, 주당 배당금, 보유 수량, 투자 기간 | 누적 배당금, 예상 보유 수량, 예상 자산 |

모든 계산은 클라이언트에서 즉시 처리 (서버 요청 없음).

### 계산 규칙 및 입력 검증 기준

| 항목 | 공통 규칙 |
|------|-----------|
| 입력 허용 범위 | 모든 입력값은 필수이며 0보다 커야 함 |
| 소수 입력 | 가격, EPS, BPS, 배당금, PER, PBR은 소수 입력 허용. 수량은 정수만 허용 |
| 빈값/문자 입력 | 계산하지 않고 입력 오류 메시지 표시 |
| 음수/0 입력 | 계산하지 않고 입력 오류 메시지 표시 |
| 반올림 규칙 | 원화 금액 결과는 화면 표시 시 소수점 첫째 자리에서 반올림해 정수 원 단위로 표시 |
| 퍼센트 표시 | 배당수익률은 소수점 둘째 자리까지 표시 |
| 포맷 | 금액은 `toLocaleString('ko-KR')` 기준 천 단위 구분기호 적용 |
| 수수료/세금 | MVP에서는 매매 수수료, 거래세, 배당소득세를 포함하지 않음 |
| 기간 단위 | 별도 표기가 없는 기간 입력은 연 단위 기준으로 처리 |

#### 물타기 계산기
- 새 평단가 = `(현재 평단가 × 보유 수량 + 추가 매수가 × 추가 수량) / (보유 수량 + 추가 수량)`
- 총 투자금 = `현재 평단가 × 보유 수량 + 추가 매수가 × 추가 수량`
- 손익분기점은 수수료/세금을 제외한 기준으로 새 평단가와 동일하게 표시

#### 배당 계산기
- 배당수익률 = `(주당 배당금 / 현재 주가) × 100`
- 연간 수령액 = `주당 배당금 × 보유 수량`
- 월 환산액 = `연간 수령액 / 12`
- 월 환산액은 단순 참고값이며 실제 지급 주기와 무관함을 안내

#### 적정가 계산기
- PER 적정가 = `EPS × 목표 PER`
- PBR 적정가 = `BPS × 목표 PBR`
- 평균 적정가 = `(PER 적정가 + PBR 적정가) / 2`
- 음수 EPS/BPS 기업은 본 계산기의 기본 범위에서 제외하고 MVP에서는 입력 제한으로 처리

#### 수익률 계산기
- 평가금액 = `현재가 × 보유 수량`
- 평가손익 = `(현재가 - 매수단가) × 보유 수량`
- 수익률 = `((현재가 - 매수단가) / 매수단가) × 100`

#### 목표가/손절가 계산기
- 목표가 = `진입가 × (1 + 목표 수익률 / 100)`
- 손절가 = `진입가 × (1 - 손절률 / 100)`
- 손절률은 양수 입력만 받고 계산 시 차감 방식으로 표시

#### 추가 매수 필요 금액 계산기
- 목표 평단가는 현재 주가보다 낮고 현재 평단가보다 낮은 경우를 기본 시나리오로 처리
- 필요한 추가 수량 = `((현재 평단가 - 목표 평단가) × 보유 수량) / (목표 평단가 - 현재가)`
- 추가 매수 금액 = `필요한 추가 수량 × 현재가`
- 목표 평단가가 현재가 이하가 아닌 경우 계산 불가 메시지 표시

#### 복리 수익 계산기
- 연 수익률 입력값은 월 복리로 환산해 계산
- 미래 자산은 초기 투자금 복리 성장분과 월 적립금 적립분을 합산해 계산
- 투자 기간은 연 단위 입력을 기본으로 하며 표시 시 월 수로 함께 환산 가능

#### 배당 재투자 계산기
- 배당금은 매년 동일하다고 가정
- 재투자 시점의 주가도 입력한 현재 주가와 동일하다고 가정
- 누적 배당금 = 각 기간 배당금 합계
- 예상 보유 수량은 배당금으로 매년 동일 가격에 재매수한다고 가정해 계산

---

## 컴포넌트 설계

### `CalculatorLayout`

```tsx
// props
interface CalculatorLayoutProps {
  title: string
  description: string
  explainerContent: React.ReactNode  // 하단 개념 설명
  children: React.ReactNode           // 계산기 본체
}
```

### `AdSlot`

```tsx
// props
interface AdSlotProps {
  position: 'home-bottom' | 'sidebar-top' | 'sidebar-bottom' | 'footer'
  slotId?: string  // 애드센스 슬롯 ID (미입력 시 빈 박스 렌더링)
}
```

### `lib/tools.ts`

```ts
export const tools = [
  {
    slug: 'multa',
    name: '물타기 계산기',
    description: '평단가를 낮추는 추가 매수 계산',
    icon: '🔢',
    href: '/calculators/multa',
    category: 'calculator',
  },
  // 새 도구 추가 시 tools.ts, page.tsx, calculator component를 함께 추가
]
```

---

## SEO 전략

### 페이지별 메타태그 (`generateMetadata`)

| 페이지 | title | description |
|--------|-------|-------------|
| 홈 | `주식 계산기 모음 - 로그인 없이 바로 사용` | `물타기, 배당, 적정가 계산기를 무료로 제공합니다` |
| 물타기 | `물타기 계산기 - 주식 평단가 계산` | `현재 평단가와 추가 매수 수량 입력 시 새 평단가를 즉시 계산` |
| 배당 | `배당 계산기 - 배당수익률 & 연간 수령액` | `보유 주식의 배당수익률과 연간 배당금을 바로 계산` |
| 적정가 | `적정주가 계산기 - PER PBR 기반` | `PER, PBR 방식으로 종목의 적정주가를 계산` |
| 수익률 | `주식 수익률 계산기 - 평가손익 계산` | `매수단가와 현재가 기준으로 평가손익과 수익률을 계산` |
| 목표가/손절가 | `목표가 손절가 계산기 - 퍼센트 기준` | `진입가 기준 목표가와 손절가를 즉시 계산` |
| 추가 매수 필요 금액 | `추가매수 계산기 - 목표 평단가 맞추기` | `목표 평단가까지 낮추기 위해 필요한 추가 매수 금액을 계산` |
| 복리 수익 | `복리 계산기 - 투자 수익 시뮬레이션` | `초기금액과 월 적립액 기준 미래 자산을 계산` |
| 배당 재투자 | `배당 재투자 계산기 - 배당 복리 효과` | `배당 재투자 시 보유 수량과 예상 자산 증가를 계산` |

### 구조화 데이터 (JSON-LD)

각 계산기 페이지에 `WebApplication` 타입 Schema.org 삽입 → 구글 리치 결과 노출.

### 사이트맵 & robots.txt

- `app/sitemap.ts`: `lib/tools.ts` 기반 자동 생성 → 구글 서치 콘솔 등록
- `app/robots.ts`: 전체 크롤 허용

---

## 확장 계획

| 단계 | 추가 내용 |
|------|-----------|
| Should | 각 계산기 하단 개념 설명 섹션 보강, 최신 뉴스 페이지, 배당주 정보 페이지 |
| Could | 배당 캘린더, 종목 재무 요약, 환율·금리 계산기 |
| Won't (이번 버전) | 로그인, 포트폴리오 저장, 실시간 시세 API |

### 이번 단계 추가 계산기 우선순위

1. 수익률 계산기
2. 목표가/손절가 계산기
3. 추가 매수 필요 금액 계산기
4. 복리 수익 계산기
5. 배당 재투자 계산기

새 계산기 추가 시 작업: `lib/tools.ts` 항목 추가 + `app/calculators/<slug>/page.tsx` 파일 생성 + `components/calculators/<Name>Calculator.tsx` 생성.

---

## 참고 문서

- [제품 기획서](../../product/2026-04-20-주식툴-기획서.md)
- [Lean Canvas](../../product/2026-04-20-주식툴-lean-canvas.md)
