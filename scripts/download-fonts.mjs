import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('public/fonts', { recursive: true });
const families = [
  ['Bodoni+Moda:opsz,wght@6..96,400..900', 'bodoni'],
  ['Inter:wght@100..900', 'inter'],
  ['Barlow+Condensed:wght@600', 'barlow'],
  ['Caveat:wght@400', 'caveat'],
];
for (const [family, name] of families) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' },
  });
  if (!response.ok) throw new Error(`Font stylesheet failed: ${name} ${response.status}`);
  const css = await response.text();
  const latin = css.split('/* latin */').at(-1);
  const url = latin.match(/url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`No Latin font URL: ${name}`);
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font download failed: ${name}`);
  await writeFile(`public/fonts/${name}-latin.woff2`, Buffer.from(await font.arrayBuffer()));
  console.log(`Downloaded ${name}`);
}
for (const family of ['bodonimoda', 'inter', 'barlowcondensed', 'caveat']) {
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if (!license.ok) throw new Error(`Font license download failed: ${family}`);
  await writeFile(`public/fonts/${family}-OFL.txt`, await license.text());
}
