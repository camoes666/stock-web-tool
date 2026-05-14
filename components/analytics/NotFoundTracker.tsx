'use client'

import { useEffect } from 'react'
import { track404View } from '@/lib/analytics'

export default function NotFoundTracker() {
  useEffect(() => {
    track404View()
  }, [])

  return null
}
