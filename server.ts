import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

function legacyDocumentRoute(course: string, file: string): string | null {
  const name = file.replace(/\.html$/i, '');
  if (course === 'java') {
    if (name === 'index') return '/java-tutorial-overview';
    if (name === 'introduction') return '/introduction-to-java';
    if (name === 'download-and-install-java') return '/java-download-and-install-java';
    if (name === 'download-and-install-intellij-idea') return '/java-download-and-install-intellij-idea';
    return `/java-${name}`;
  }
  if (course === 'springboot') {
    if (name === 'index') return '/spring-boot-overview';
    if (name === 'introduction') return '/spring-boot-core';
    if (name === 'setup') return '/spring-boot/setup';
    if (name === 'project-structure') return '/project-structure';
    const springBootRoutes: Record<string, string> = {
      'security-comprehensive': 'spring-boot-security',
      'exception-handling': 'spring-boot-global-exception-handling',
      'testing-comprehensive': 'spring-boot/testing-comprehensive',
      'migration-2-to-3': 'spring-boot-2-to-3-migration'
    };
    return `/${springBootRoutes[name] ?? `spring-boot-${name}`}`;
  }
  if (course === 'mysql') return name === 'index' ? '/mysql' : `/mysql/${name}`;
  if (course === 'postgresql') return `/postgresql/${name}`;
  return null;
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('/docs/:course/:file', (req, res, next) => {
    const route = legacyDocumentRoute(req.params['course'], req.params['file']);
    if (route) return res.redirect(301, route);
    return next();
  });
  server.get('/docs/:course/', (req, res, next) => {
    const route = legacyDocumentRoute(req.params['course'], 'index.html');
    if (route) return res.redirect(301, route);
    return next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.get('/spring-boot-2-to-3-migration', (_req, res) => {
    res.sendFile(join(browserDistFolder, 'spring-boot-2-to-3-migration', 'index.html'));
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.status(html.includes('data-page-status="404"') ? 404 : 200).send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
