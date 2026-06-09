'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

export type CurrencyCode = 'KRW' | 'USD'

export interface TradingCostFieldValues {
  brokerFeePercent: string
  transactionTaxPercent: string
  extraCost: string
}

const currencyMeta: Record<
  CurrencyCode,
  { label: string; locale: string; currency: string; minimumFractionDigits: number; example: string }
> = {
  KRW: {
    label: '원화',
    locale: 'ko-KR',
    currency: 'KRW',
    minimumFractionDigits: 0,
    example: '10,000,000원'
  },
  USD: {
    label: '달러',
    locale: 'en-US',
    currency: 'USD',
    minimumFractionDigits: 2,
    example: '$10,000.00'
  }
}

const PREFERRED_CURRENCY_KEY = 'stock-tool:preferred-currency'

export function useStoredCurrency(defaultCurrency: CurrencyCode = 'KRW') {
  const [currency, setCurrency] = useState<CurrencyCode>(defaultCurrency)

  useEffect(() => {
    const stored = window.localStorage.getItem(PREFERRED_CURRENCY_KEY)
    if (stored === 'KRW' || stored === 'USD') {
      setCurrency(stored)
    }
  }, [])

  function updateCurrency(nextCurrency: CurrencyCode) {
    setCurrency(nextCurrency)
    window.localStorage.setItem(PREFERRED_CURRENCY_KEY, nextCurrency)
  }

  return [currency, updateCurrency] as const
}

export function formatCurrency(value: number, code: CurrencyCode) {
  if (code === 'KRW') {
    const sign = value < 0 ? '-' : ''
    const absoluteValue = Math.abs(value)
    const formattedNumber = new Intl.NumberFormat(currencyMeta[code].locale, {
      minimumFractionDigits: currencyMeta[code].minimumFractionDigits,
      maximumFractionDigits: currencyMeta[code].minimumFractionDigits
    }).format(absoluteValue)

    return `${sign}${formattedNumber}원`
  }

  return new Intl.NumberFormat(currencyMeta[code].locale, {
    style: 'currency',
    currency: currencyMeta[code].currency,
    minimumFractionDigits: currencyMeta[code].minimumFractionDigits,
    maximumFractionDigits: currencyMeta[code].minimumFractionDigits
  }).format(value)
}

export function getCurrencyLabel(code: CurrencyCode) {
  return currencyMeta[code].label
}

export function getCurrencyExample(code: CurrencyCode) {
  return currencyMeta[code].example
}

export function CurrencySelector({
  value,
  onChange
}: {
  value: CurrencyCode
  onChange: (value: CurrencyCode) => void
}) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-sm">
      {(['KRW', 'USD'] as const).map((code) => {
        const isActive = value === code

        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-white text-brand-700 shadow-sm ring-1 ring-brand-100'
                : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
            }`}
          >
            {code === 'KRW' ? '원화 KRW' : '달러 USD'}
          </button>
        )
      })}
    </div>
  )
}

export function CalculatorSection({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function CalculatorField({
  label,
  value,
  onChange,
  onFirstInteraction,
  placeholder,
  step = 'any',
  helpText
}: {
  label: string
  value: string
  onChange: (value: string) => void
  onFirstInteraction?: () => void
  placeholder: string
  step?: string
  helpText?: string
}) {
  const inputId = useId()
  const hasInteractedRef = useRef(false)

  return (
    <label htmlFor={inputId} className="block">
      <span className="mb-2 block text-sm font-medium text-slate-800">{label}</span>
      {helpText ? <span className="mb-3 block text-xs leading-5 text-slate-500">{helpText}</span> : null}
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        step={step}
        value={value}
        onChange={(event) => {
          if (!hasInteractedRef.current) {
            hasInteractedRef.current = true
            onFirstInteraction?.()
          }

          onChange(event.target.value)
        }}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
      />
    </label>
  )
}

export function TradingCostFields({
  brokerFeePercent,
  transactionTaxPercent,
  extraCost,
  onBrokerFeePercentChange,
  onTransactionTaxPercentChange,
  onExtraCostChange
}: TradingCostFieldValues & {
  onBrokerFeePercentChange: (value: string) => void
  onTransactionTaxPercentChange: (value: string) => void
  onExtraCostChange: (value: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <CalculatorField
        label="증권사 수수료(%)"
        value={brokerFeePercent}
        onChange={onBrokerFeePercentChange}
        placeholder="0.015"
        helpText="기본값은 0.015%, 필요하면 직접 수정해 주세요."
      />
      <CalculatorField
        label="거래세(%)"
        value={transactionTaxPercent}
        onChange={onTransactionTaxPercentChange}
        placeholder="0.20"
        helpText="매도 시 반영할 거래세 비율입니다."
      />
      <CalculatorField
        label="기타 비용"
        value={extraCost}
        onChange={onExtraCostChange}
        placeholder="0"
        helpText="세전 비용이나 별도 고정 비용을 입력해 주세요."
      />
    </div>
  )
}

export function CalculatorActionButton({
  children,
  onClick
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.99]"
    >
      {children}
    </button>
  )
}

export function CalculatorError({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{children}</div>
}

export function ResultCard({
  label,
  value,
  tone = 'default',
  detail
}: {
  label: string
  value: string
  tone?: 'default' | 'positive' | 'negative' | 'muted'
  detail?: string
}) {
  const toneClass = {
    default: 'border-slate-200 bg-slate-50 text-slate-900',
    positive: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    negative: 'border-rose-200 bg-rose-50 text-rose-900',
    muted: 'border-brand-100 bg-brand-50 text-brand-900'
  }[tone]

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      {detail ? <p className="mt-2 text-xs leading-5 opacity-80">{detail}</p> : null}
    </div>
  )
}

export function EmptyResult({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-5 py-6 text-sm text-slate-500">
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="mt-2 leading-6">{description}</p>
    </div>
  )
}
