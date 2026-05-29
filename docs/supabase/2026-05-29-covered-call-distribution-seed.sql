update public.etf_distribution_profiles
set is_latest = false
where is_latest = true;

insert into public.etf_distribution_profiles
(
  etf_product_id,
  reference_date,
  ex_dividend_date,
  payment_date,
  price_reference,
  monthly_distribution_per_share,
  annualized_distribution_yield,
  currency,
  note,
  source_label,
  source_url,
  is_latest
)
select
  id,
  '2026-05-29',
  '2026-05-29',
  '2026-06-03',
  10000,
  120,
  14.40,
  'KRW',
  '테스트용 seed 데이터',
  'manual seed',
  'https://stockwebtools.com',
  true
from public.etf_products
where symbol = '498400'
on conflict (etf_product_id, reference_date) do update
set
  ex_dividend_date = excluded.ex_dividend_date,
  payment_date = excluded.payment_date,
  price_reference = excluded.price_reference,
  monthly_distribution_per_share = excluded.monthly_distribution_per_share,
  annualized_distribution_yield = excluded.annualized_distribution_yield,
  currency = excluded.currency,
  note = excluded.note,
  source_label = excluded.source_label,
  source_url = excluded.source_url,
  is_latest = excluded.is_latest;

insert into public.etf_distribution_profiles
(
  etf_product_id,
  reference_date,
  ex_dividend_date,
  payment_date,
  price_reference,
  monthly_distribution_per_share,
  annualized_distribution_yield,
  currency,
  note,
  source_label,
  source_url,
  is_latest
)
select
  id,
  '2026-05-29',
  '2026-05-29',
  '2026-06-03',
  11250,
  95,
  10.13,
  'KRW',
  '테스트용 seed 데이터',
  'manual seed',
  'https://stockwebtools.com',
  true
from public.etf_products
where symbol = '491160'
on conflict (etf_product_id, reference_date) do update
set
  ex_dividend_date = excluded.ex_dividend_date,
  payment_date = excluded.payment_date,
  price_reference = excluded.price_reference,
  monthly_distribution_per_share = excluded.monthly_distribution_per_share,
  annualized_distribution_yield = excluded.annualized_distribution_yield,
  currency = excluded.currency,
  note = excluded.note,
  source_label = excluded.source_label,
  source_url = excluded.source_url,
  is_latest = excluded.is_latest;

insert into public.etf_distribution_profiles
(
  etf_product_id,
  reference_date,
  ex_dividend_date,
  payment_date,
  price_reference,
  monthly_distribution_per_share,
  annualized_distribution_yield,
  currency,
  note,
  source_label,
  source_url,
  is_latest
)
select
  id,
  '2026-05-29',
  '2026-05-29',
  '2026-06-03',
  10320,
  88,
  10.23,
  'KRW',
  '테스트용 seed 데이터',
  'manual seed',
  'https://stockwebtools.com',
  true
from public.etf_products
where symbol = '441640'
on conflict (etf_product_id, reference_date) do update
set
  ex_dividend_date = excluded.ex_dividend_date,
  payment_date = excluded.payment_date,
  price_reference = excluded.price_reference,
  monthly_distribution_per_share = excluded.monthly_distribution_per_share,
  annualized_distribution_yield = excluded.annualized_distribution_yield,
  currency = excluded.currency,
  note = excluded.note,
  source_label = excluded.source_label,
  source_url = excluded.source_url,
  is_latest = excluded.is_latest;
