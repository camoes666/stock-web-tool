import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용안내',
  description:
    'Stock Web Tools의 계산기와 가이드를 어떤 기준으로 참고하면 좋은지, 서비스 이용과 면책 범위를 안내하는 페이지입니다.'
}

const sections = [
  {
    label: '참고용 정보',
    title: '계산기와 가이드는 참고 자료입니다',
    body: '이 사이트의 계산기와 설명형 가이드는 투자자가 숫자를 직접 점검하고 이해하는 데 도움을 주기 위한 참고 자료입니다. 특정 종목의 매수, 매도, 보유를 권유하는 투자 자문이나 법률, 세무 조언을 제공하지 않습니다.'
  },
  {
    label: '결과 해석',
    title: '계산 결과는 입력값과 가정에 따라 달라질 수 있습니다',
    body: '수수료, 세율, 환율, 배당 정책, 기업 실적, 시장 환경처럼 결과에 영향을 주는 요소는 계속 달라질 수 있습니다. 따라서 계산 결과는 확정값보다 점검 기준으로 활용하는 것이 적절하며, 실제 거래나 신고 전에는 최신 정보와 공식 자료를 다시 확인하는 것이 좋습니다.'
  },
  {
    label: '외부 서비스',
    title: '광고와 분석 도구가 함께 사용될 수 있습니다',
    body: '서비스 운영과 개선을 위해 광고 플랫폼, 방문 분석 도구, 기타 외부 서비스가 연결될 수 있습니다. 이런 도구의 데이터 처리 방식은 각 서비스의 정책을 따르며, 관련 내용은 개인정보처리방침과 함께 안내합니다.'
  },
  {
    label: '운영 범위',
    title: '기능과 콘텐츠는 계속 바뀔 수 있습니다',
    body: '계산기, 가이드, 안내 문구는 운영 과정에서 수정되거나 추가될 수 있습니다. 더 정확하고 이해하기 쉬운 흐름을 만들기 위해 내용이 업데이트될 수 있으며, 중요한 변경이 있으면 관련 페이지에도 반영합니다.'
  }
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">이용안내</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Stock Web Tools는 주식 계산기와 설명형 가이드를 함께 제공하는 정보형 사이트입니다. 아래 내용은
          이 사이트의 계산 결과와 콘텐츠를 어떤 기준으로 참고하면 좋은지, 그리고 서비스 운영 범위를
          어떻게 이해하면 좋은지 안내합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{section.label}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{section.title}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">{section.body}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
