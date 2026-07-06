import { expect, test } from '@playwright/test';

// Seed spec — skipped until Phase 2 gives the shell real pages/navigation to walk
// (ROADMAP 2.3). It exists now so the Playwright pipeline is wired from the first commit.
test.skip('app shell renders a heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
