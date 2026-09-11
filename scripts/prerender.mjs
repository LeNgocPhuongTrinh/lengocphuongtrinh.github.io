import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { caseStudies } = await server.ssrLoadModule('/src/data/projects.ts');
  const template = await readFile('dist/index.html', 'utf8');
  const pages = [{ path: '/', file: 'dist/index.html' }, { path: '/404', file: 'dist/404.html' }, ...caseStudies.map(project => ({ path: `/projects/${project.id}/`, file: `dist/projects/${project.id}/index.html`, project }))];
  for (const page of pages) {
    let html = template.replace('<div id="root"></div>', `<div id="root">${renderToString(createElement(App, { path: page.path }))}</div>`);
    if (page.project) {
      const title = `${page.project.title} — Trinh Le`;
      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/(<meta name="description" content=")[^"]+/, `$1${page.project.description}`)
        .replace(/(<meta property="og:title" content=")[^"]+/, `$1${title}`)
        .replace(/(<meta property="og:description" content=")[^"]+/, `$1${page.project.description}`)
        .replace(/(<link rel="canonical" href=")[^"]+/, `$1https://lengocphuongtrinh.github.io${page.path}`)
        .replace(/(<meta property="og:url" content=")[^"]+/, `$1https://lengocphuongtrinh.github.io${page.path}`);
      if (page.project.image) html = html.replace(/(<meta property="og:image" content=")[^"]+/, `$1https://lengocphuongtrinh.github.io${page.project.image}`);
      else html = html.replace(/<meta property="og:image"[^>]+>/, '');
    }
    if (page.path === '/404') html = html.replace('</head>', '<meta name="robots" content="noindex" /></head>');
    await mkdir(page.file.substring(0, page.file.lastIndexOf('/')), { recursive: true });
    await writeFile(page.file, html);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(page => page.path !== '/404').map(page => `<url><loc>https://lengocphuongtrinh.github.io${page.path}</loc></url>`).join('')}</urlset>`);
  console.log(`Pre-rendered ${pages.length} pages with readable HTML.`);
} finally { await server.close(); }
