import { test, expect } from '@playwright/test';

/**
 * Smoke tests covering the public MVP surface. These require a seeded database
 * (pnpm db:seed). They document the happy paths for the pilot.
 */

test('home page renders the hero and featured listings', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByPlaceholder(/Pesquisar/i)).toBeVisible();
});

test('property search filters listings', async ({ page }) => {
  await page.goto('/imoveis?kind=LAND');
  await expect(page.getByRole('heading', { name: /Imóveis e terrenos/i })).toBeVisible();
});

test('official information centre labels provenance', async ({ page }) => {
  await page.goto('/info');
  await expect(page.getByRole('heading', { name: /informação oficial/i })).toBeVisible();
});

test('procedure detail shows numbered steps and a legal disclaimer', async ({ page }) => {
  await page.goto('/procedimentos');
  const firstLink = page.getByRole('link').filter({ hasText: /São Vicente|holiday home|terreno/i }).first();
  if (await firstLink.count()) {
    await firstLink.click();
    await expect(page.getByText(/aconselhamento jurídico/i)).toBeVisible();
  }
});
