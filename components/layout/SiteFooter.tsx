import Link from 'next/link'

const footerLinks = [
  { href: '/about', label: '소개' },
  { href: '/contact', label: '문의' },
  { href: '/privacy', label: '개인정보처리방침' }
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-500">Copyright Stock Web Tools. 빠르게 확인하고 차분하게 판단하는 투자 계산 도구.</p>
      </div>
    </footer>
  )
}
