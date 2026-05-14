'use client'

import Link, { type LinkProps } from 'next/link'
import type { MouseEventHandler, PropsWithChildren } from 'react'
import { trackCtaClick } from '@/lib/analytics'

type AnalyticsLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string
    ctaName: string
    ctaLocation: string
  }
>

export default function AnalyticsLink({
  children,
  ctaName,
  ctaLocation,
  onClick,
  ...props
}: AnalyticsLinkProps & {
  onClick?: MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCtaClick({
          cta_name: ctaName,
          cta_location: ctaLocation
        })
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
