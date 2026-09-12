export interface Country {
  code?: string;
  name: string;
  flag: string | null;
  countAsCountry?: boolean;
  regions?: readonly Country[];
}

// Approved country list. UK is the display code; the flag asset uses ISO code GB.
export const countries: readonly Country[] = [
  { code: 'VN', name: 'Vietnam', flag: '/images/flags/vn.svg' },
  { code: 'SG', name: 'Singapore', flag: '/images/flags/sg.svg' },
  { code: 'MY', name: 'Malaysia', flag: '/images/flags/my.svg' },
  { code: 'TR', name: 'Turkey', flag: '/images/flags/tr.svg' },
  {
    code: 'UK', name: 'United Kingdom', flag: '/images/flags/gb.svg', countAsCountry: false,
    regions: [
      { name: 'England', flag: '/images/flags/gb-eng.svg', countAsCountry: true },
      { name: 'Scotland', flag: '/images/flags/gb-sct.svg', countAsCountry: true },
      { name: 'Wales', flag: '/images/flags/gb-wls.svg', countAsCountry: true },
      { name: 'Northern Ireland', flag: null, countAsCountry: true },
    ],
  },
];

export function countCountries(entries: readonly Country[]): number {
  return entries.reduce((total, entry) => total + (entry.countAsCountry === false ? 0 : 1) + countCountries(entry.regions ?? []), 0);
}

export const countryCount = countCountries(countries);
