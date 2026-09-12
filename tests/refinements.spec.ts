import { expect, test } from '@playwright/test';

test('color portraits, external destinations, and ordered experience', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('font-variation-settings', '"opsz" 12');
  const portraitSources = await page.locator('img[src*="portrait-"]').evaluateAll(images => images.map(image => image.getAttribute('src')));
  expect(portraitSources).toHaveLength(4);
  expect(new Set(portraitSources).size).toBe(4);
  expect(await page.locator('img').evaluateAll(images => images.every(image => !getComputedStyle(image).filter.includes('grayscale')))).toBe(true);
  expect(await page.locator('a[href^="https:"], a[href^="mailto:"]').evaluateAll(links => links.every(link => link.getAttribute('target') === '_blank' && link.getAttribute('rel')?.includes('noopener')))).toBe(true);
  await expect(page.locator('nav a[href="/#about"]')).not.toHaveAttribute('target', '_blank');
  const employers = await page.locator('#experience button[aria-expanded]').allTextContents();
  expect(employers.map(text => text.replace(/^\d+/, '').split('Senior')[0])).toHaveLength(6);
  for (const [index, company] of ['Shopee', 'Unilever', 'CoderSchool', 'CJ Foods', 'Avery Dennison', 'ITL'].entries()) expect(employers[index]).toContain(company);
  await page.locator('#coderschool-trigger').click();
  await expect(page.locator('#coderschool-panel')).toContainText('Vietnam');
  await expect(page.locator('#about')).toContainText('VN · UK · MORE →');
  await expect(page.locator('#about')).toContainText('Still exploring');
});

test('project-specific galleries load and preserve image proportions', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [id, count] of [['think-with-ai', 4], ['oee-manufacturing', 5], ['fitness-health', 1], ['mrp', 1]] as const) {
    await page.goto(`/projects/${id}/`);
    if (id !== 'think-with-ai') {
      const github = page.getByRole('link', { name: 'View GitHub repository' });
      await expect(github).toHaveAttribute('target', '_blank');
      await expect(github).toHaveAttribute('href', id === 'mrp'
        ? 'https://github.com/LeNgocPhuongTrinh/python/tree/d80c5a6387380d7ec6ffe036a684d9f324bd0680/Supply%20Planning'
        : `https://github.com/LeNgocPhuongTrinh/dashboard-visualization/tree/7a2c1d8808f39043f4e89bb051f2d37d8f507f27/${id === 'fitness-health' ? 'Fitness%20Tracker%20in%20Indian%20market' : 'OEE%20Manufacturing'}`);
      await expect(github.locator('..').getByRole('link', { name: 'View original project' })).toHaveCount(1);
    }
    const previews = page.getByLabel('Project image previews').locator('img');
    await expect(previews).toHaveCount(count);
    for (const preview of await previews.all()) {
      await preview.scrollIntoViewIfNeeded();
      await expect.poll(() => preview.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await expect(preview).toHaveCSS('object-fit', 'contain');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    if (id === 'oee-manufacturing') await page.screenshot({ path: `.qa/${testInfo.project.name}-gallery.png`, fullPage: true });
  }
  await page.goto('/');
  const supplier = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Supplier Quality', exact: true }) });
  await supplier.locator('summary').click();
  await expect(supplier.getByLabel('Project image previews').locator('img')).toHaveCount(3);
  for (const preview of await supplier.getByLabel('Project image previews').locator('img').all()) {
    await preview.scrollIntoViewIfNeeded();
    await expect.poll(() => preview.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});
