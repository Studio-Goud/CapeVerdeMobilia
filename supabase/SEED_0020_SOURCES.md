# Seed 0020 — São Vicente business directory (sources & method)

Compiled **2026-07-22** from public online sources. Migration `0020_seed_sao_vicente.sql`
inserts these as **unclaimed** ("phone-book") listings — published, with the source shown
on each card, and claimable by the real owner (see migration `0019`).

## Verification bar
A business was **seeded** only if it cleared one of:
- **≥ 2 independent online sources** that agree on name + contact, **or**
- **1 authoritative source** (official register / government list / chamber of commerce /
  the business's own live site) **plus** evidence of recent activity.

Authoritative registers used:
- **Ordem dos Advogados de Cabo Verde** — official "Advogados com Inscrição em Vigor" roll (06-07-2026).
- **IGOTCI** — government list of valid construction *alvarás* (Feb 2025, valid to 31-01-2026).
- **Câmara de Comércio do Barlavento** (Mindelo) — member directory with activity status.
- Business-owned websites, cross-checked with Páginas Amarelas / U.S. Embassy attorney list / local press.

Everything is marked **"não reclamado / uit openbare bronnen"** in the UI and is **not legal advice**.
Phone numbers are transcribed as published; owners can correct them on claiming.

---

## Seeded — Professionals (20)

### Lawyers — all on the OACV in-force roll (06-07-2026)
| Business | Phone | Source |
|---|---|---|
| Vanda Évora & Onofre Lima, Soc. de Advogados | +238 232 32 78 | OACV roll + U.S. Embassy list |
| EGL – Advogados Associados | +238 232 34 21 | OACV roll + Páginas Amarelas |
| Cláudia Vasconcelos – Advocacia e Consultoria | +238 232 19 22 | OACV roll + U.S. Embassy list |
| José Pedro da Luz – Advogado | +238 232 84 85 | OACV roll + U.S. Embassy list |
| Armindo Santos Cruz – Advocacia | +238 232 44 65 | OACV roll + U.S. Embassy list |
| Silvestre Beneditino Évora – Advogado | +238 232 18 64 | OACV roll + Páginas Amarelas |
| Carla Mendes – Advogada | +238 988 87 62 | OACV roll + advogados.cv |

### Legal-adjacent
| Business | Phone | Source |
|---|---|---|
| Despachante Oficial Carlos Monteiro Fernandes | +238 232 58 89 | Own site (licence n.º 80) |

### Construction & architecture
| Business | Phone | Source |
|---|---|---|
| Armando Cunha, Cabo Verde, S.A. | +238 231 96 77 | IGOTCI alvará list + own site |
| SINA Construções, Lda | +238 230 05 50 | IGOTCI alvará list + own site |
| SCI – Spencer Construções (Mindelo branch) | +238 232 56 56 | IGOTCI alvará list + own site |
| Construções Metálicas de Cabo Verde (CMCV) | +238 232 44 00 | IGOTCI + Câmara + own site |
| Ramos Castellano Arquitectos | — (info@ramoscastellano.com) | Own site + Wikipedia + Designboom 2024 |
| Oficina de Utopias | +238 981 44 88 | Own site + ArchDaily 2024 |

### Trades, cleaning & gas
| Business | Phone | Source |
|---|---|---|
| Soteclima, Lda (air-conditioning / HVAC) | +238 353 22 07 | Own site *(content dated — phone-check advised)* |
| SOSSIR, Lda (cleaning, since 1996) | +238 232 78 28 | Câmara + own site |
| Boavista Limpeza (cleaning) | +238 231 76 77 | AfricaBizInfo + Cleaners10 |
| Enacol, S.A. — gás (Mindelo) | +238 430 60 60 | Own site (gas home-delivery line) |
| Vivo Energy / Shell — Mindelo | +238 230 76 00 | Vivo Energy site + Câmara |
| Estação Shell Rua da Praia | +238 232 30 04 | Own site |

## Seeded — Suppliers / materials (5)
| Business | Phone | Source |
|---|---|---|
| MJ – Materiais de Construção | +238 231 90 21 | Own site (mj.cv) |
| JBC – João Benoliel de Carvalho (since 1927) | +238 231 63 56 | Câmara + Mindel Insite |
| Prolar – Materiais, Soluções e Serviços | +238 232 35 50 | Câmara + own site |
| Bricodelo – Comércio (hardware/tools) | — (bricodelo.cv) | Own site |
| SITA – Tintas (São Vicente delegation) | +238 262 72 74 | Own site (sita.cv) |

---

## Held back on purpose

### Official government offices — verified, but **not** seeded (official ≠ commercial)
These are real and useful, but a government office is not a "business to claim". I suggest
surfacing them as an **official-contacts block on the Procedures page** instead:
- **1.º Cartório Notarial de São Vicente** — ex-TACV building, central Mindelo (since Mar 2026).
- **2.º Cartório Notarial de São Vicente** — Monte Sossego, Mindelo.
- **Conservatória dos Registos de São Vicente** (predial/comercial/automóvel) — ex-TACV building.
- **Casa do Cidadão – Mindelo** — Rua Senador Vera-Cruz, +238 231 79 17 (national line 800 2008).
- **OACV – Delegação de São Vicente** — Rua Senador Vera-Cruz, +238 232 27 72.
- **Electra** (public water/electricity utility) — Rua Baltazar Lopes da Silva, +238 232 30 30.

### Low-confidence — **need a quick local phone-check before adding** (you're on the island)
Single-source or currency unproven, so deliberately excluded from the live seed:
- **Trades / essentials:** WM Climatização (airco/electric), Purágua (bottled water — chamber shows *inactive*), Simili (recycling craft — website parked), SeteLima (cleaning — Praia HQ, no SV branch phone).
- **Construction / materials:** ALS (equipment rental), MATEC, VIAC, Alexandre Benoliel de Carvalho, Alufer (chamber *inactive*), Zen Arquitetura (site down on research day), Construções Anildo & Irmãos.
- **Legal:** Zuleica Cruz (on OACV roll but reachable only via Facebook — no phone), Dith Mar Lima (not on the in-force roll — confirm standing), plus 5 despachantes listed only in Páginas Amarelas (António Cruz Lima, António João da Cruz, Manuel Jesus Cabral, Alexandre Pacheco Novais, Silvestre Pinto Lopes da Silva).

### Honest gap
**Individual plumbers, electricians, painters, carpenters, appliance-repair and private
water-truck (auto-tanque) operators have almost no verifiable online presence** on São Vicente —
they work informally / by word-of-mouth. None were invented. The best way to fill these is
locally: collect names + numbers and add them (they can then claim their listing).
