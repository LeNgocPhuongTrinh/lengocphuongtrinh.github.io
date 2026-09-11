import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
await mkdir('.qa', { recursive: true });
await sharp('.docs/_local/Portrait/292A1104.jpg').rotate().resize(900).jpeg({ quality: 80 }).toFile('.qa/portrait-review.jpg');
for (const [source, name] of [['IMG_3974.JPG', 'hero'], ['A_83.jpg', 'profile'], ['IMG_3993.JPG', 'contact']]) {
  for (const width of [640, 1200]) {
    await sharp(`.docs/_local/Portrait/${source}`).rotate().resize(width).webp({ quality: 84 }).toFile(`public/images/${name}-${width}.webp`);
  }
}
await sharp('.docs/_local/UI Projects/Think-With-AI.png').resize(1600).webp({ quality: 88 }).toFile('public/images/think-with-ai.webp');
await copyFile('../think-with-ai/dist/media/think-with-ai-preview.jpg', 'public/images/think-with-ai-preview.jpg');
