import { countries } from './countries';

// Counts supported by the brief and the user-approved country list.
export const stats = [
  { value: '6', suffix: '+', label: 'Years', detail: 'Professional experience' },
  { value: '5', suffix: '', label: 'Companies', detail: 'Across business & data' },
  { value: '3', suffix: '', label: 'Core industries', detail: 'E-commerce · FMCG · Supply chain / logistics' },
  { value: String(countries.length), suffix: '', label: 'Countries', detail: 'VN · UK · +3 more' },
  { value: '∞', suffix: '', label: 'Curiosity', detail: 'Still exploring' },
];
