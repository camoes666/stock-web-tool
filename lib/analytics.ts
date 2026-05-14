export type DataLayerEvent = {
  event: string
  page_path?: string
  page_title?: string
  calculator_name?: string
  calculator_category?: string
  input_count?: number
  cta_name?: string
  cta_location?: string
  copy_type?: string
  share_type?: string
  referrer?: string
}

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[]
  }
}

function getPageMetadata() {
  if (typeof window === 'undefined') {
    return {}
  }

  return {
    page_path: window.location.pathname,
    page_title: document.title
  }
}

export function pushEvent(event: DataLayerEvent) {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    ...getPageMetadata(),
    ...event
  })
}

export function trackCalculatorView(event: Pick<DataLayerEvent, 'calculator_name' | 'calculator_category'>) {
  pushEvent({
    event: 'calculator_view',
    ...event
  })
}

export function trackCalculatorRun(
  event: Pick<DataLayerEvent, 'calculator_name' | 'calculator_category'> & Pick<DataLayerEvent, 'input_count'>
) {
  pushEvent({
    event: 'calculator_run',
    ...event
  })
}

export function trackCalculatorResultCopy(
  event: Pick<DataLayerEvent, 'calculator_name' | 'calculator_category' | 'copy_type'>
) {
  pushEvent({
    event: 'calculator_result_copy',
    ...event
  })
}

export function trackCtaClick(event: Pick<DataLayerEvent, 'cta_name' | 'cta_location'>) {
  pushEvent({
    event: 'cta_click',
    ...event
  })
}

export function track404View() {
  pushEvent({
    event: 'error_view_404',
    referrer: typeof document === 'undefined' ? undefined : document.referrer
  })
}
