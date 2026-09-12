export interface Country {
  code: string;
  name: string;
  flag: string;
}

// Approved country list. UK is the display code; the flag asset uses ISO code GB.
export const countries: readonly Country[] = [
  { code: 'VN', name: 'Vietnam', flag: '/images/flags/vn.svg' },
  { code: 'SG', name: 'Singapore', flag: '/images/flags/sg.svg' },
  { code: 'MY', name: 'Malaysia', flag: '/images/flags/my.svg' },
  { code: 'TR', name: 'Turkey', flag: '/images/flags/tr.svg' },
  { code: 'UK', name: 'United Kingdom', flag: '/images/flags/gb.svg' },
];
