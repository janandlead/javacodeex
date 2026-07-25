import { readFile } from 'node:fs/promises';
import { publicRoutes, siteUrl } from './public-routes.mjs';

const sitemap = await readFile('public/sitemap.xml', 'utf8');
const robots = await readFile('public/robots.txt', 'utf8');
const source = await readFile('src/index.html', 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
const checks = [
  ['robots allows crawling', /User-agent:\s*\*/.test(robots) && /Allow:\s*\//.test(robots)],
  ['robots references sitemap', robots.includes(`${siteUrl}/sitemap.xml`)],
  ['sitemap contains every manifest route', publicRoutes.every((route) => sitemapUrls.includes(`${siteUrl}${route}`))],
  ['sitemap has no duplicate URLs', duplicateUrls.length === 0],
  ['fallback HTML has a title', /<title>[^<]+<\/title>/.test(source)],
  ['fallback HTML has a description', /name="description" content="[^"]+"/.test(source)],
  ['fallback HTML has one H1', (source.match(/<h1\b/g) ?? []).length === 1],
  ['fallback HTML has canonical', /rel="canonical"/.test(source)],
  ['fallback HTML has structured data', /application\/ld\+json/.test(source)]
];

console.log('SEO audit');
for (const [label, passed] of checks) console.log(`${passed ? 'PASS' : 'FAIL'}  ${label}`);
if (checks.some(([, passed]) => !passed)) process.exitCode = 1;
