-- 0016 — tighten tender-bid policies (patch for anyone who already ran 0014).
-- (a) bids may only be placed while the tender is 'open';
-- (b) a bidder may withdraw their own bid.
-- Idempotent. Safe to run even if 0014 already had these (it now does).

drop policy if exists "bids insert own" on public.tender_bids;
create policy "bids insert own" on public.tender_bids
  for insert to authenticated with check (
    bidder_id = auth.uid()
    and exists (select 1 from public.tenders t where t.id = tender_id and t.status = 'open')
  );

drop policy if exists "bids delete own" on public.tender_bids;
create policy "bids delete own" on public.tender_bids
  for delete to authenticated using (bidder_id = auth.uid());
