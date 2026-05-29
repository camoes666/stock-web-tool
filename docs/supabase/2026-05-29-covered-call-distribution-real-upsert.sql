with payload as (
  select *
  from (
    values
      (
        '498400',
        date '2026-05-15',
        date '2026-05-14',
        date '2026-05-19',
        24166.67::numeric(18, 4),
        348::numeric(18, 4),
        17.28::numeric(10, 4),
        '2026-05-13 KODEX 월중배당 공시. 기준가격은 공시 분배율(1.44%)과 분배금으로 역산.',
        'KODEX 2026년 5월 월중배당 공지',
        'https://www.samsungfund.com/etf/lounge/notice-view.do?no=75873'
      ),
      (
        'KR70190G0006',
        date '2026-05-29',
        date '2026-05-28',
        date '2026-06-02',
        11527.78::numeric(18, 4),
        83::numeric(18, 4),
        8.64::numeric(10, 4),
        '2026-05-27 KODEX 월말배당 공시. 기준가격은 공시 분배율(0.72%)과 분배금으로 역산.',
        'KODEX 2026년 5월 월말배당 공지',
        'https://www.samsungfund.com/etf/lounge/notice-view.do?no=76313'
      ),
      (
        '486290',
        date '2025-03-31',
        date '2025-03-28',
        date '2025-04-02',
        9758.06::numeric(18, 4),
        121::numeric(18, 4),
        14.88::numeric(10, 4),
        'TIGER 2025년 3월말 분배금 공시. 기준가격은 공시 분배율(1.24%)과 분배금으로 역산.',
        'TIGER 2025년 3월말 분배금 지급 안내',
        'https://www.tigeretf.com/ko/customer/notice/view.do?detailsKey=599'
      ),
      (
        '441680',
        date '2025-03-31',
        date '2025-03-28',
        date '2025-04-02',
        10900.00::numeric(18, 4),
        109::numeric(18, 4),
        12.00::numeric(10, 4),
        'TIGER 2025년 3월말 분배금 공시. 기준가격은 공시 분배율(1.00%)과 분배금으로 역산.',
        'TIGER 2025년 3월말 분배금 지급 안내',
        'https://www.tigeretf.com/ko/customer/notice/view.do?detailsKey=599'
      ),
      (
        '472150',
        date '2025-03-31',
        date '2025-03-28',
        date '2025-04-02',
        10638.30::numeric(18, 4),
        100::numeric(18, 4),
        11.28::numeric(10, 4),
        'TIGER 2025년 3월말 분배금 공시. 기준가격은 공시 분배율(0.94%)과 분배금으로 역산.',
        'TIGER 2025년 3월말 분배금 지급 안내',
        'https://www.tigeretf.com/ko/customer/notice/view.do?detailsKey=599'
      ),
      (
        '289480',
        date '2025-03-31',
        date '2025-03-28',
        date '2025-04-02',
        8591.55::numeric(18, 4),
        61::numeric(18, 4),
        8.52::numeric(10, 4),
        'TIGER 2025년 3월말 분배금 공시. 기준가격은 공시 분배율(0.71%)과 분배금으로 역산.',
        'TIGER 2025년 3월말 분배금 지급 안내',
        'https://www.tigeretf.com/ko/customer/notice/view.do?detailsKey=599'
      ),
      (
        '166400',
        date '2025-03-31',
        date '2025-03-28',
        date '2025-04-02',
        13125.00::numeric(18, 4),
        42::numeric(18, 4),
        3.84::numeric(10, 4),
        'TIGER 2025년 3월말 분배금 공시. 기준가격은 공시 분배율(0.32%)과 분배금으로 역산.',
        'TIGER 2025년 3월말 분배금 지급 안내',
        'https://www.tigeretf.com/ko/customer/notice/view.do?detailsKey=599'
      ),
      (
        '489030',
        date '2026-05-29',
        date '2026-05-28',
        date '2026-06-02',
        7068.04::numeric(18, 4),
        113::numeric(18, 4),
        19.19::numeric(10, 4),
        'PLUS 상품 상세페이지 기준값.',
        'PLUS 고배당주위클리커버드콜 상세페이지',
        'https://www.plusetf.co.kr/product/detail?n=006370'
      ),
      (
        '494420',
        date '2026-05-15',
        date '2026-05-14',
        date '2026-05-19',
        9770.64::numeric(18, 4),
        106::numeric(18, 4),
        13.02::numeric(10, 4),
        'PLUS 상품 상세페이지 기준값.',
        'PLUS 미국배당증가성장주데일리커버드콜 상세페이지',
        'https://www.plusetf.co.kr/product/detail?n=006376'
      ),
      (
        'KR70104P0000',
        date '2026-04-30',
        date '2026-04-29',
        date '2026-05-06',
        13145.00::numeric(18, 4),
        114::numeric(18, 4),
        10.40::numeric(10, 4),
        '분배금은 2026-04-30 공시, 기준가격은 2026-02-26 분배락 기준가격 공시 기준.',
        'KIND 분배금 공시 및 분배락 기준가격 공시',
        'https://kind.krx.co.kr/external/2026/04/28/001484/20260428003174/68659.htm'
      )
  ) as rows (
    symbol,
    reference_date,
    ex_dividend_date,
    payment_date,
    price_reference,
    monthly_distribution_per_share,
    annualized_distribution_yield,
    note,
    source_label,
    source_url
  )
),
target_products as (
  select p.id, p.symbol
  from public.etf_products p
  inner join payload on payload.symbol = p.symbol
),
reset_latest as (
  update public.etf_distribution_profiles profiles
  set is_latest = false
  where profiles.etf_product_id in (select id from target_products)
  returning profiles.etf_product_id
)
insert into public.etf_distribution_profiles (
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
  products.id,
  payload.reference_date,
  payload.ex_dividend_date,
  payload.payment_date,
  payload.price_reference,
  payload.monthly_distribution_per_share,
  payload.annualized_distribution_yield,
  'KRW',
  payload.note,
  payload.source_label,
  payload.source_url,
  true
from payload
inner join target_products products
  on products.symbol = payload.symbol
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
