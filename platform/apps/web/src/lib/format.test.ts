import { describe, expect, it } from 'vitest';
import { formatPrice, documentStatusLabel } from './format';

describe('formatPrice', () => {
  it('renders "price on request" when flagged', () => {
    expect(formatPrice(1000, 'CVE', true)).toMatch(/consulta/i);
    expect(formatPrice(null, 'CVE', false)).toMatch(/consulta/i);
  });

  it('shows CVE with an EUR reference at the peg', () => {
    const out = formatPrice(1_102_650, 'CVE', false);
    expect(out).toContain('CVE');
    expect(out).toContain('€');
  });
});

describe('documentStatusLabel', () => {
  it('maps known statuses and falls back for unknown', () => {
    expect(documentStatusLabel('VERIFIED')).toMatch(/verificados/i);
    expect(documentStatusLabel('SOMETHING_ELSE')).toMatch(/confirmar/i);
  });
});
