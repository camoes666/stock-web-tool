import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의',
  description:
    'Stock Web Tools에 오류 제보, 계산기 제안, 운영 관련 문의를 보낼 수 있는 연락처 안내 페이지입니다.'
}

const inquiryTopics = [
  '계산 결과가 예상과 다르게 보이거나 화면에서 오류가 발생한 경우',
  '새로운 주식 계산기 아이디어나 기존 도구 개선 제안을 보내고 싶은 경우',
  '사이트 운영, 협업, 기타 일반 문의처럼 계산기 외의 내용을 전달하고 싶은 경우'
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          문의 안내
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Stock Web Tools 사용 중 궁금한 점이나 전달하고 싶은 내용이 있다면 아래 이메일로 보내주세요.
          계산기 사용 흐름을 더 분명하게 만들 수 있는 의견도 함께 받고 있습니다.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">What to send</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            이런 내용을 보내주실 수 있습니다
          </h2>
          <ul className="mt-6 space-y-4">
            {inquiryTopics.map((topic) => (
              <li
                key={topic}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 px-5 py-4 text-sm leading-6 text-slate-600"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Email</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              연락처
            </h2>
            <a
              href="mailto:stockwebtools.help@gmail.com"
              className="mt-4 inline-flex text-base font-semibold text-brand-700 underline underline-offset-4 transition hover:text-brand-800"
            >
              stockwebtools.help@gmail.com
            </a>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              문의 내용을 가능한 한 구체적으로 적어주시면 확인과 답변에 도움이 됩니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Response</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              답변 안내
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              모든 문의에 바로 답변드리기는 어려울 수 있습니다. 확인 순서와 운영 상황에 따라 답변이
              다소 늦어질 수 있는 점을 양해 부탁드립니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
