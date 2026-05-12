import { ImageResponse } from 'next/og'

export const alt = 'Stock Web Tools 공유 이미지'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background:
            'linear-gradient(135deg, #eef6ff 0%, #f7fbff 55%, #ffffff 100%)',
          color: '#0f172a',
          display: 'flex',
          height: '100%',
          padding: '56px',
          width: '100%'
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(148,163,184,0.18)',
            borderRadius: '36px',
            boxShadow: '0 24px 70px rgba(15,23,42,0.08)',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{
                color: '#2563eb',
                display: 'flex',
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase'
              }}
            >
              Stock Web Tools
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '68px',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                maxWidth: '780px'
              }}
            >
              로그인 없이 바로 쓰는 주식 계산기 허브
            </div>
            <div
              style={{
                color: '#475569',
                display: 'flex',
                fontSize: '28px',
                lineHeight: 1.4,
                maxWidth: '840px'
              }}
            >
              물타기 · 수익률 · 배당 · 목표가 · 적정가 계산기를 한곳에서 빠르게 확인하세요.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            {['Averaging Down', 'Return Rate', 'Dividend', 'Target Price'].map((label) => (
              <div
                key={label}
                style={{
                  background: '#dbeafe',
                  borderRadius: '999px',
                  color: '#1d4ed8',
                  display: 'flex',
                  fontSize: '22px',
                  fontWeight: 600,
                  padding: '14px 22px'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
