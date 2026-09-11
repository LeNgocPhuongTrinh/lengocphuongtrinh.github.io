import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Originals stay in the user's local folders. Only optimized copies are public.
const root = '.docs/_local/';
const output = 'public/images';
await mkdir(output, { recursive: true });
const sources = {
  'portrait-hero': '2. Portrait - Remove BG/IMG_3974.png',
  'portrait-about': '2. Portrait - Remove BG/A_83.png',
  'portrait-portfolio': '2. Portrait - Remove BG/292A1104.png',
  'portrait-contact': '2. Portrait - Remove BG/IMG_3993.png',
  'capabilities-editorial': 'Supporting Photos/2. Capabilities/Main.png',
  'experience-editorial': 'Supporting Photos/3. Experience/Main.jpg',
  'learning-editorial': 'Supporting Photos/5. Hero/Learn.Build.Contribute.png',
  'stirling-campus': 'Supporting Photos/1. My Journey/3. Stirling.png',
  'stirling-architecture': 'Supporting Photos/4. Education/1. UK.jpg',
  'journey-ftu': 'Supporting Photos/1. My Journey/1. FTU.jpg',
  'journey-shopee-unilever': 'Supporting Photos/1. My Journey/2. Shopee x Unilever.png',
  'education-vietnam': 'Supporting Photos/4. Education/2. VN.jpg',
  'education-sage-recognition': 'Supporting Photos/4. Education/3. ASEAN UK SAGE WIS.png',
  'shopee-logo': 'Supporting Photos/3. Experience/1. Shopee.png',
  'unilever-logo': 'Supporting Photos/3. Experience/2. Unilever.png',
  'cj-foods-logo': 'Supporting Photos/3. Experience/3. CJ Foods.png',
  'coderschool-logo': 'Supporting Photos/3. Experience/4. CoderSchool.png',
  'think-learning': '3. UI Projects/Think-With-AI/Screenshot 2026-09-10 171807.png',
  'think-practice': '3. UI Projects/Think-With-AI/Screenshot 2026-09-10 171949.png',
  'think-progress': '3. UI Projects/Think-With-AI/Screenshot 2026-09-10 172018.png',
  'think-overview': '3. UI Projects/Think-With-AI/Screenshot 2026-09-10 173253.png',
};
const manifest = {};
for (const [name, source] of Object.entries(sources)) {
  const width = name.endsWith('-logo') ? 400 : 1400;
  const result = await sharp(root + source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`${output}/${name}.webp`);
  manifest[name] = { src: `/images/${name}.webp`, width: result.width, height: result.height };
  if (name.startsWith('portrait-')) {
    await sharp(root + source).rotate().resize({ width: 640 }).webp({ quality: 88 }).toFile(`${output}/${name}-640.webp`);
  }
}
await writeFile('src/data/images.ts', `// Optimized, original-color assets. Source mapping: scripts/prepare-refinement-images.mjs.\nexport const images = ${JSON.stringify(manifest, null, 2)} as const;\n`);
