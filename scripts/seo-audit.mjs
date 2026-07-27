import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { publicRoutes, siteUrl } from './public-routes.mjs';

const sitemap = await readFile('public/sitemap.xml', 'utf8');
const robots = await readFile('public/robots.txt', 'utf8');
const source = await readFile('src/index.html', 'utf8');
const prerenderRoutes = (await readFile('prerender-routes.txt', 'utf8')).split(/\r?\n/).map((route) => route.trim()).filter(Boolean);
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
const prerenderPages = await Promise.all(prerenderRoutes.map(async (route) => {
  const relativePath = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`;
  try {
    const html = await readFile(join('dist/javacodeex/browser', relativePath), 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
    return {
      route,
      html,
      hasMetadata: /<title>[^<]+<\/title>/.test(html)
        && /<meta name="description" content="[^"]+"/.test(html)
        && (html.match(/<h1\b/g) ?? []).length === 1
        && Boolean(canonical),
      canonicalMatches: canonical === `${siteUrl}${route === '/' ? '/' : route}`,
      hasFallback: /This Java tutorial explains|This Spring Boot tutorial explains|Learn .*with practical examples and clear explanations/i.test(html)
    };
  } catch {
    return { route, html: '', hasMetadata: false, canonicalMatches: false, hasFallback: false };
  }
}));
const expectedSitemapUrls = prerenderRoutes.map((route) => `${siteUrl}${route === '/' ? '/' : route}`);
const prerenderRouteSet = new Set(prerenderRoutes.map((route) => route.replace(/\/$/, '') || '/'));
const brokenInternalLinks = prerenderPages.flatMap((page) => [...page.html.matchAll(/href="(\/[^\"]*)"/g)]
  .map((match) => match[1].split(/[?#]/)[0].replace(/\/$/, '') || '/')
  .filter((path) => !/^\/(assets|docs|media|favicon\.ico|robots\.txt|sitemap\.xml)(\/|$)/.test(path) && !prerenderRouteSet.has(path)));
const checks = [
  ['robots allows crawling', /User-agent:\s*\*/.test(robots) && /Allow:\s*\//.test(robots)],
  ['robots references sitemap', robots.includes(`${siteUrl}/sitemap.xml`)],
  ['sitemap contains every manifest route', publicRoutes.every((route) => sitemapUrls.includes(`${siteUrl}${route}`))],
  ['sitemap has no duplicate URLs', duplicateUrls.length === 0],
  ['sitemap matches prerender routes', expectedSitemapUrls.length === sitemapUrls.length && expectedSitemapUrls.every((url) => sitemapUrls.includes(url))],
  ['all prerender routes have SEO metadata', prerenderPages.every((page) => page.hasMetadata)],
  ['all prerender canonical URLs match routes', prerenderPages.every((page) => page.canonicalMatches)],
  ['prerendered pages contain real tutorial content', prerenderPages.every((page) => !page.hasFallback)],
  ['prerendered internal links resolve', brokenInternalLinks.length === 0],
  ['fallback HTML has a title', /<title>[^<]+<\/title>/.test(source)],
  ['fallback HTML has a description', /name="description" content="[^"]+"/.test(source)],
  ['fallback HTML has one H1', (source.match(/<h1\b/g) ?? []).length === 1],
  ['fallback HTML has canonical', /rel="canonical"/.test(source)],
  ['fallback HTML has structured data', /application\/ld\+json/.test(source)]
];

console.log('SEO audit');
for (const [label, passed] of checks) console.log(`${passed ? 'PASS' : 'FAIL'}  ${label}`);
if (checks.some(([, passed]) => !passed)) process.exitCode = 1;
