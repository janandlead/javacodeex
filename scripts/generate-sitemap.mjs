import { writeFile } from 'node:fs/promises';
import { publicRoutes, siteUrl } from './public-routes.mjs';

const today = new Date().toISOString().slice(0, 10);
const urls = [...new Set(publicRoutes)].map((route) => `  <url>\n    <loc>${siteUrl}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n');
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile('prerender-routes.txt', `${[...new Set(publicRoutes)].join('\n')}\n`);
console.log(`Generated sitemap with ${new Set(publicRoutes).size} public routes.`);
