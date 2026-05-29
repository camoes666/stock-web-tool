describe('supabase env module', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('returns the configured public and server env values', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'public-key'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret-key'

    const envModule = await import('@/lib/supabase/env')

    expect(envModule.supabaseEnv).toEqual({
      anonKey: 'public-key',
      serviceRoleKey: 'secret-key',
      url: 'https://example.supabase.co'
    })
  })

  it('throws when a required public env var is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'public-key'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret-key'

    await expect(import('@/lib/supabase/env')).rejects.toThrow(
      'Missing required Supabase environment variable: NEXT_PUBLIC_SUPABASE_URL'
    )
  })
})
