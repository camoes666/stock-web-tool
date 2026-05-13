# stock-web-tool

로그인 없이 바로 쓰는 주식 계산기 사이트입니다. 현재 포함된 도구는 물타기 계산기, 배당 계산기, 적정주가 계산기, 수익률 계산기, 목표가/손절가 계산기, 추가 매수 필요 금액 계산기, 복리 수익 계산기, 배당 재투자 계산기입니다.
다음 단계로 계산기와 직접 연결되는 설명형 콘텐츠 섹션 `/guides`를 추가할 계획입니다.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Jest

## Local Setup

```bash
copy .env.example .env.local
npm install
npm run dev
```

개발 서버 기본 주소는 `http://localhost:3000` 입니다.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: 사이트의 절대 URL입니다. JSON-LD, sitemap, robots 생성에 사용합니다.

로컬 예시:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

배포 예시:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Scripts

```bash
npm run dev
npm test -- --runInBand
npm run build
```

## Routes

- `/`
- `/calculators/multa`
- `/calculators/dividend`
- `/calculators/fair-value`
- `/calculators/return-rate`
- `/calculators/target-price`
- `/calculators/averaging-down-target`
- `/calculators/compound-return`
- `/calculators/dividend-reinvest`
- `/guides` (planned)
- `/guides/averaging-down` (planned)
- `/sitemap.xml`
- `/robots.txt`
