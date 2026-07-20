# 15 — Five-Year Financial Model (Kavíla)

> **Nature of this document.** This is an **illustrative, assumption-driven**
> model, not a forecast. Every operational input is **ASSUMPTION** or
> **HYPOTHESIS** and requires **market validation** against pilot data. No
> official statistic is invented; the only external anchors are the Canon KEY
> RESEARCHED FACTS (connectivity, digital-government targets) used as sanity
> checks, not as demand guarantees.
>
> **Currency & peg.** Primary currency **CVE**; EUR at the fixed peg
> **110.265 CVE = 1 EUR** (Canon — FACT/high, verify). EUR figures rounded.
>
> **Scenarios.** Three columns of the world: **Conservative**, **Base**,
> **Growth**. Base is the planning case. Values are period figures for years
> **Y1–Y5** (Y1 = pilot year on São Vicente).
>
> **Machine-readable export.** The base-scenario tables plus key
> conservative/growth rows are mirrored in `15-financial-model.csv`.

---

## 1. Assumptions (single source for every number below)

### 1.1 Pricing (from Canon / `05-business-model.md`)

| Input | Value | Label |
|---|---|---|
| Peg | 110.265 CVE = 1 EUR | FACT |
| Pro subscription | 2.500 CVE/mo (€23) | CANON |
| Business subscription | 7.500 CVE/mo (€68) | CANON |
| Blended paid-pro price (70% Pro / 30% Business) | 4.000 CVE/mo (€36) | ASSUMPTION |
| Premium listing (30d) | 5.000 CVE (€45) | CANON |
| Lead fee (avg charged) | 300–450 CVE (€3–4) | ASSUMPTION |
| Verification fee (blended L2/L3) | ~2.000–2.600 CVE | ASSUMPTION |
| Facilitated-job take rate | 6% (Y3) → 8% (Y5) | CANON range 5–10% |
| Gov SLA licence (avg) | ~1.500.000–2.200.000 CVE/yr | RECOMMENDATION |

### 1.2 Behavioural / funnel assumptions (base case)

| Input | Value | Label |
|---|---|---|
| Active users / registered users | ~40–45% | ASSUMPTION |
| Free → paid professional conversion | 8% (Y1) → 15% (Y5) | ASSUMPTION |
| Subscription-mix stable | 70% Pro / 30% Business | ASSUMPTION |
| Annual logo churn (paid pros) | 35% (nascent market) | ASSUMPTION |
| Gross revenue retention | ~75% | ASSUMPTION |
| Net revenue retention (with upgrades) | ~100–105% | HYPOTHESIS |
| Marketing attributable to pro acquisition | ~40% of marketing | ASSUMPTION |
| COGS = hosting + payments + verification + support | — | Definition |
| Cash raised at start of Y1 (base) | 44.000.000 CVE (~€400k) | RECOMMENDATION |
| Model excludes | capex, working-capital timing, tax, FX movement (peg fixed) | Simplification |

### 1.3 Timing of streams

Lead fees from **Y2**; government SLA licences from **Y2**; facilitated-job take
rate and escrow-linked revenue from **Y3** (Canon: take rate introduced later,
once escrow exists). White-label/PPP not modelled as revenue before Y5.

---

## 2. Base scenario

### 2.1 Operational metrics (Y1–Y5)

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Registered users | 3.000 | 12.000 | 35.000 | 70.000 | 120.000 |
| Active users (MAU) | 1.200 | 5.000 | 15.000 | 30.000 | 54.000 |
| Professionals (registered) | 300 | 1.000 | 2.500 | 4.500 | 7.000 |
| Paid professionals (avg paying) | 20 | 90 | 260 | 550 | 950 |
| Paid professionals (end of year) | 24 | 100 | 300 | 600 | 1.050 |
| Property listings (active) | 800 | 3.000 | 8.000 | 16.000 | 28.000 |
| Paid/premium listings (per year) | 120 | 600 | 1.800 | 4.000 | 7.500 |
| Leads | 1.500 | 8.000 | 25.000 | 55.000 | 95.000 |
| Charged leads | 0 | 2.000 | 8.000 | 20.000 | 38.000 |
| Quote requests | 400 | 2.500 | 8.000 | 18.000 | 32.000 |
| Projects | 20 | 150 | 600 | 1.500 | 3.000 |
| Facilitated GMV (CVE) | 0 | 0 | 30.000.000 | 90.000.000 | 200.000.000 |

### 2.2 Revenue by stream (CVE)

| Stream | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Professional subscriptions | 960.000 | 4.320.000 | 12.480.000 | 26.400.000 | 45.600.000 |
| Premium listings | 600.000 | 3.000.000 | 9.000.000 | 20.000.000 | 37.500.000 |
| Lead fees | 0 | 600.000 | 2.800.000 | 8.000.000 | 17.100.000 |
| Verification fees | 80.000 | 440.000 | 1.200.000 | 2.500.000 | 4.680.000 |
| Transaction (take rate) | 0 | 0 | 1.800.000 | 6.300.000 | 16.000.000 |
| Government licences | 0 | 1.500.000 | 5.400.000 | 10.000.000 | 17.600.000 |
| Ancillary (profiles/insights/API/ads/referrals) | 100.000 | 600.000 | 2.000.000 | 5.000.000 | 11.000.000 |
| **Total revenue (CVE)** | **1.740.000** | **10.460.000** | **34.680.000** | **78.200.000** | **149.480.000** |
| **Total revenue (EUR)** | **€15.780** | **€94.862** | **€314.514** | **€709.199** | **€1.355.644** |

### 2.3 Recurring-revenue metrics

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| MRR end of year (CVE) | 96.000 | 525.000 | 1.650.000 | 3.233.000 | 5.667.000 |
| ARR end of year (CVE) | 1.152.000 | 6.300.000 | 19.800.000 | 38.800.000 | 68.000.000 |
| ARR end of year (EUR) | €10.448 | €57.135 | €179.567 | €351.834 | €616.696 |
| ARPU (per active user, CVE) | 1.450 | 2.092 | 2.312 | 2.607 | 2.768 |
| ARPPU (per paid pro, CVE) | 48.000 | 48.000 | 48.000 | 48.000 | 48.000 |

### 2.4 Cost structure (CVE)

| Cost | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Staff | 8.000.000 | 14.000.000 | 24.000.000 | 38.000.000 | 55.000.000 |
| Marketing | 1.500.000 | 4.000.000 | 8.000.000 | 14.000.000 | 20.000.000 |
| Technology (non-staff) | 800.000 | 1.500.000 | 2.500.000 | 3.500.000 | 5.000.000 |
| Customer service / concierge | 400.000 | 1.200.000 | 2.500.000 | 4.500.000 | 7.000.000 |
| Verification (checks/tools) | 300.000 | 800.000 | 1.600.000 | 2.800.000 | 4.200.000 |
| Legal | 600.000 | 800.000 | 1.200.000 | 1.800.000 | 2.500.000 |
| Local operations | 700.000 | 1.200.000 | 2.000.000 | 3.200.000 | 4.500.000 |
| Hosting / infrastructure | 400.000 | 700.000 | 1.400.000 | 2.400.000 | 3.800.000 |
| Payment providers | 50.000 | 300.000 | 900.000 | 2.200.000 | 4.500.000 |
| **Total costs (CVE)** | **12.750.000** | **24.500.000** | **44.100.000** | **72.400.000** | **106.500.000** |
| **Total costs (EUR)** | **€115.631** | **€222.192** | **€399.946** | **€656.600** | **€965.855** |

### 2.5 Profitability, cash & margin

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Revenue (CVE) | 1.740.000 | 10.460.000 | 34.680.000 | 78.200.000 | 149.480.000 |
| COGS (CVE) | 1.150.000 | 3.000.000 | 6.400.000 | 11.900.000 | 19.500.000 |
| Gross profit (CVE) | 590.000 | 7.460.000 | 28.280.000 | 66.300.000 | 129.980.000 |
| **Gross margin** | **34%** | **71%** | **82%** | **85%** | **87%** |
| **EBITDA (CVE)** | **−11.010.000** | **−14.040.000** | **−9.420.000** | **+5.800.000** | **+42.980.000** |
| **EBITDA (EUR)** | **−€99.851** | **−€127.330** | **−€85.430** | **+€52.600** | **+€389.788** |
| Cash burn / (build) (CVE) | 11.010.000 | 14.040.000 | 9.420.000 | (5.800.000) | (42.980.000) |
| Cash end of year (CVE)¹ | 32.990.000 | 18.950.000 | 9.530.000 | 15.330.000 | 58.310.000 |
| Runway | >Y5 | >Y5 | ~13 mo at trough | positive | positive |

¹ Opening cash Y1 = 44.000.000 CVE (~€400k) raised at start. **Break-even
(EBITDA ≥ 0) occurs in Y4.** Trough cash ~9.5M CVE at end of Y3; a modest bridge
or the seed being sized to ~50M CVE (~€450k) gives comfortable cushion
(RECOMMENDATION).

### 2.6 Unit economics (base)

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| New paid pros | 24 | 76 | 200 | 300 | 450 |
| CAC per paid pro (CVE) | 25.000 | 21.053 | 16.000 | 18.667 | 17.778 |
| CAC (EUR) | €227 | €191 | €145 | €169 | €161 |
| ARPPU (CVE/yr) | 48.000 | 48.000 | 48.000 | 48.000 | 48.000 |
| Gross-margin contribution / pro (CVE/yr)² | 16.320 | 34.080 | 39.360 | 40.800 | 41.760 |
| Annual churn | 35% | 35% | 33% | 32% | 30% |
| Avg lifetime (yrs) | 2.9 | 2.9 | 3.0 | 3.1 | 3.3 |
| **LTV (CVE)** | 47.000 | 98.000 | 118.000 | 128.000 | 139.000 |
| **LTV (EUR)** | €426 | €889 | €1.070 | €1.161 | €1.261 |
| **LTV / CAC** | 1.9× | 4.7× | 7.4× | 6.9× | 7.8× |
| Payback (months) | ~18 | ~9 | ~6 | ~6 | ~6 |
| Conversion (paid/registered pros) | 8% | 10% | 12% | 13% | 15% |
| Gross revenue retention | 72% | 74% | 75% | 76% | 77% |
| Net revenue retention | 98% | 100% | 102% | 104% | 105% |
| Take rate (facilitated) | — | — | 6% | 7% | 8% |
| Lead value (CVE/charged lead) | — | 300 | 350 | 400 | 450 |

² Uses the year's blended gross margin. LTV/CAC exceeds the 3× target from Y2
onward — this is **optimistic** and driven by low CAC in a small, word-of-mouth
market; treat as HYPOTHESIS until pilot cohorts confirm churn and CAC.

---

## 3. Conservative scenario (slower adoption)

Break-even slips to **Y5**; requires larger/longer funding. Key rows:

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Registered users | 2.000 | 7.000 | 18.000 | 38.000 | 65.000 |
| Active users | 800 | 2.900 | 7.700 | 16.500 | 29.000 |
| Paid professionals (avg) | 12 | 50 | 140 | 300 | 520 |
| Revenue (CVE) | 1.000.000 | 5.500.000 | 18.000.000 | 42.000.000 | 82.000.000 |
| Revenue (EUR) | €9.069 | €49.880 | €163.243 | €380.900 | €743.663 |
| Total costs (CVE) | 11.500.000 | 21.000.000 | 36.000.000 | 55.000.000 | 78.000.000 |
| Gross margin | ~30% | ~66% | ~78% | ~83% | ~85% |
| **EBITDA (CVE)** | −10.500.000 | −15.500.000 | −18.000.000 | −13.000.000 | +4.000.000 |
| **EBITDA (EUR)** | −€95.225 | −€140.570 | −€163.243 | −€117.899 | +€36.276 |
| Cumulative funding need (CVE) | — | — | — | — | ~57.000.000 (~€517k) |
| LTV/CAC | 1.4× | 3.5× | 5.0× | 5.5× | 6.0× |
| Break-even | — | — | — | — | **Y5** |

---

## 4. Growth scenario (fast multi-island)

Faster island expansion and take-rate ramp; break-even in **Y3**. Key rows:

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Registered users | 5.000 | 22.000 | 60.000 | 120.000 | 210.000 |
| Active users | 2.200 | 9.500 | 26.000 | 54.000 | 95.000 |
| Paid professionals (avg) | 35 | 170 | 480 | 950 | 1.650 |
| Revenue (CVE) | 2.900.000 | 19.000.000 | 62.000.000 | 135.000.000 | 255.000.000 |
| Revenue (EUR) | €26.301 | €172.313 | €562.281 | €1.224.323 | €2.312.610 |
| Total costs (CVE) | 14.500.000 | 30.000.000 | 55.000.000 | 92.000.000 | 150.000.000 |
| Gross margin | ~45% | ~75% | ~84% | ~86% | ~88% |
| **EBITDA (CVE)** | −11.600.000 | −11.000.000 | +7.000.000 | +43.000.000 | +105.000.000 |
| **EBITDA (EUR)** | −€105.201 | −€99.759 | +€63.483 | +€389.969 | +€952.251 |
| Cumulative funding need (CVE) | — | ~22.600.000 (~€205k) trough | — | — | — |
| LTV/CAC | 2.5× | 5.5× | 8.0× | 8.5× | 9.0× |
| Break-even | — | — | **Y3** | — | — |

---

## 5. Scenario comparison (Y5 snapshot)

| Metric (Y5) | Conservative | Base | Growth |
|---|---:|---:|---:|
| Registered users | 65.000 | 120.000 | 210.000 |
| Revenue (CVE) | 82.000.000 | 149.480.000 | 255.000.000 |
| Revenue (EUR) | €743.663 | €1.355.644 | €2.312.610 |
| EBITDA (CVE) | +4.000.000 | +42.980.000 | +105.000.000 |
| Gross margin | ~85% | ~87% | ~88% |
| Break-even year | Y5 | Y4 | Y3 |

---

## 6. Sensitivities & risks (HYPOTHESIS)

- **Conversion & churn dominate.** A 2pp lower conversion or 10pp higher churn
  pushes base break-even from Y4 toward Y5 (conservative-like).
- **Take-rate timing.** Take-rate revenue depends on escrow shipping in Y3
  (Canon: WON'T-yet in MVP). Delay removes ~5–15% of Y3–Y5 revenue.
- **Government licences** are credibility-accretive but slow; base assumes only
  1 partner in Y2. Zero gov revenue removes ~5–12% of revenue but does not by
  itself change the break-even year in base.
- **Market size** is not modelled from any official statistic. Connectivity is
  supportive (Canon KEY FACT 1: 73.5% internet penetration, 262k social users),
  but demand is **market-validation-required**.
- **FX** risk is low while the EUR peg holds (Canon — FACT/high).

---

## 7. Notes on method

Revenue, cost and cash figures are internally consistent and arithmetically
reconciled: EBITDA = revenue − total costs; gross profit = revenue − COGS
(hosting + payments + verification + support); cash roll-forward uses EBITDA as
the burn proxy (capex, tax and working-capital timing excluded for clarity).
The base-scenario tables and selected conservative/growth rows are exported to
`15-financial-model.csv`. See `05-business-model.md` for revenue-stream design,
pricing rationale and unit-economics definitions.
