import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('editorial page, assets, and responsive layout', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TRINHLE.');
  const headings = await page.locator('main h2').allTextContents();
  expect(headings.findIndex(text => text.includes('Capabilities'))).toBeLessThan(headings.findIndex(text => text.includes('portfolio')));
  for (const section of await page.locator('main > section').all()) await section.scrollIntoViewIfNeeded();
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `.qa/${testInfo.project.name}-full.png`, fullPage: true });
});

test('keyboard accordions, exploration, and marquee', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const programming = page.locator('#programming-trigger');
  await expect(programming).toHaveAttribute('aria-expanded', 'true');
  const analytics = page.locator('#analytics-trigger');
  await analytics.focus();
  await page.keyboard.press('Enter');
  await expect(analytics).toHaveAttribute('aria-expanded', 'true');
  await expect(programming).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#programming-panel')).toHaveAttribute('inert', '');
  const human = page.getByRole('button', { name: /Human × AI/ });
  await human.click();
  await expect(human).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Pause identity marquee' }).click();
  await expect(page.getByRole('button', { name: 'Resume identity marquee' })).toBeVisible();
});

test('navigation and direct case-study routes', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Menu +' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Menu +' })).toBeFocused();
    await page.getByRole('button', { name: 'Menu +' }).click();
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Portfolio' }).click();
  await expect(page).toHaveURL(/#portfolio/);
  await page.getByRole('link', { name: /View case study/ }).first().click();
  await expect(page).toHaveURL(/projects\/think-with-ai/);
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(4);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Think With AI.');
  await page.goto('/projects/mrp/');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(4);
  await page.goto('/missing-page');
  await expect(page.getByRole('link', { name: /Return to Trinh Le/ })).toBeVisible();
});

test('accessible homepage and case studies', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
  await page.goto('/projects/oee-manufacturing/');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(4);
  await page.goto('/projects/fitness-health/');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(4);
});

test('motion is progressive and production hydration is clean', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.locator('#portfolio').scrollIntoViewIfNeeded();
  await expect(page.locator('#portfolio-title')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#portfolio-title')).toHaveCSS('opacity', '1');
  await page.goto('/projects/think-with-ai/');
  expect(errors).toEqual([]);
});
