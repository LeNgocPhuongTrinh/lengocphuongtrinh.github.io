import { expect, test } from '@playwright/test';
import { countries, countryCount, countCountries, type Country } from '../src/data/countries';
import { stats } from '../src/data/stats';

test('counting follows nested data and explicit counting flags', () => {
  const normal: Country = { name: 'Example', flag: null };
  const group: Country = { name: 'Group', flag: null, countAsCountry: false, regions: [normal, normal] };
  expect(countCountries([])).toBe(0);
  expect(countCountries([normal])).toBe(1);
  expect(countCountries([group])).toBe(2);
  expect(countCountries([normal, group])).toBe(3);
  expect(countCountries([{ ...group, regions: [normal] }])).toBe(1);
  expect(countCountries([{ ...group, regions: [group, normal] }])).toBe(3);
  expect(countCountries([{ ...group, regions: [] }])).toBe(0);
  expect(countCountries([{ ...group, countAsCountry: true }])).toBe(3);
  expect(countryCount).toBe(8);
  expect(stats.find(stat => stat.label === 'Countries')).toMatchObject({ value: String(countryCount), detail: 'VN · UK · MORE →' });
});

test('country group, flags and shared metric remain readable', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('#countries');
  await expect(section).toContainText(`${countryCount} COUNTRIES · STILL EXPLORING`);
  await expect(page.locator('#about')).toContainText('VN · UK · MORE →');
  const group = section.getByRole('listitem').filter({ has: page.getByText('United Kingdom', { exact: true }) });
  await expect(group.getByRole('listitem')).toHaveCount(4);
  await expect(group.locator('img')).toHaveCount(4);
  await expect(group).toContainText('Northern Ireland');
  await expect(group.getByText('NI', { exact: true })).toHaveCount(0);
  await section.scrollIntoViewIfNeeded();
  for (const image of await section.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  const outerItems = section.locator(':scope > div > ul > li');
  await expect(outerItems).toHaveCount(countries.length);
  expect(await section.evaluate(element => [...element.querySelectorAll('li')].every(item => item.scrollWidth <= item.clientWidth + 1))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await section.screenshot({ path: `.qa/countries-group-${testInfo.project.name}.png` });
});
