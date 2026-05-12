import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description:
    'Stock Web Tools에서 어떤 정보를 최소한으로 확인하고 어떻게 사용하는지 쉽게 안내하는 개인정보처리방침 페이지입니다.'
}

const policySections = [
  {
    label: '기본 원칙',
    title: '필요한 정보만 최소한으로 봅니다',
    body: '이 서비스는 회원가입 없이 계산기를 바로 사용할 수 있게 만드는 것을 우선으로 합니다. 그래서 이름, 생년월일, 주소처럼 사용자를 직접 식별하는 정보를 기본적으로 받지 않습니다.'
  },
  {
    label: '분석 도구',
    title: '방문 흐름과 사용 패턴은 분석할 수 있습니다',
    body: '서비스 개선을 위해 Google Analytics 같은 분석 도구를 사용할 수 있습니다. 이 과정에서 방문한 페이지, 접속 기기 종류, 대략적인 이용 시간대처럼 사용 흐름을 이해하는 데 필요한 정보가 수집될 수 있습니다.'
  },
  {
    label: '광고와 외부 서비스',
    title: '앞으로 외부 플랫폼이 추가될 수 있습니다',
    body: '현재 또는 앞으로 광고 플랫폼이나 다른 외부 서비스가 붙을 수 있습니다. 이런 도구가 연결되면 각 서비스에서 제공하는 방식에 따라 이용 데이터가 함께 처리될 수 있습니다.'
  },
  {
    label: '이메일 문의',
    title: '직접 보내주신 내용만 확인합니다',
    body: '문의 메일을 보내주시면 답변을 위해 이메일 주소와 메일 본문에 적어주신 내용을 확인할 수 있습니다. 이 정보는 문의 대응과 서비스 개선 참고 외의 용도로 넓게 사용하지 않습니다.'
  }
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">개인정보</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          개인정보처리방침
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Stock Web Tools는 복잡한 안내보다, 어떤 정보를 왜 보는지 쉽게 이해할 수 있는 설명을 목표로 합니다.
          아래 내용은 현재 서비스 기준이며 기능이나 운영 방식이 바뀌면 함께 업데이트될 수 있습니다.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">수집과 이용</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            지금 안내드리는 처리 기준
          </h2>
          <div className="mt-6 space-y-4">
            {policySections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5"
              >
                <p className="text-sm font-semibold tracking-[0.14em] text-brand-700">{section.label}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">쿠키 안내</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              쿠키와 비슷한 정보
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              방문 통계나 서비스 안정성 확인을 위해 쿠키 또는 비슷한 기술이 사용될 수 있습니다. 이런 정보는
              주로 어떤 페이지가 자주 쓰이는지, 어떤 환경에서 접속하는지 살피는 데 활용됩니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">변경 안내</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              정책은 바뀔 수 있습니다
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              새로운 분석 도구, 광고 기능, 문의 방식이 추가되면 이 페이지도 그에 맞춰 고쳐질 수 있습니다.
              큰 방향은 필요한 정보만 최소한으로 다루는 원칙을 유지하는 것입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
