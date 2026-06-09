'use client'

import { useEffect, useRef } from 'react'
import {
  trackCalculatorInputStart,
  trackCalculatorResultView,
  trackCalculatorView
} from '@/lib/analytics'

export function useCalculatorTracking({
  calculatorName,
  calculatorCategory,
  hasResult
}: {
  calculatorName: string
  calculatorCategory: string
  hasResult: boolean
}) {
  const hasTrackedInputStartRef = useRef(false)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: calculatorName,
      calculator_category: calculatorCategory
    })
  }, [calculatorCategory, calculatorName])

  useEffect(() => {
    if (!hasResult) {
      return
    }

    trackCalculatorResultView({
      calculator_name: calculatorName,
      calculator_category: calculatorCategory
    })
  }, [calculatorCategory, calculatorName, hasResult])

  function trackInputStart() {
    if (hasTrackedInputStartRef.current) {
      return
    }

    hasTrackedInputStartRef.current = true
    trackCalculatorInputStart({
      calculator_name: calculatorName,
      calculator_category: calculatorCategory
    })
  }

  return {
    trackInputStart
  }
}
