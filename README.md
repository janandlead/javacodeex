# Java Codeex

Java Codeex is a responsive Angular 17 tutorial website for learning Java, Spring Boot, databases, Design Patterns, and Spring AI. The application uses standalone components, Angular Router, lazy-loaded feature routes, Bootstrap 5, and reusable layout components.

## Features

- Angular 17 standalone application with strict TypeScript.
- Responsive Bootstrap 5 layout with reusable header, navbar, footer, breadcrumbs, and content cards.
- Angular Router navigation without `.html` extensions or full-page reloads.
- Lazy-loaded Java and Spring Boot tutorial routes.
- Java and Spring Boot course content imported from the original HTML website.
- Design Patterns learning paths for Creational, Structural, and Behavioral patterns.
- SEO metadata with route-aware titles, descriptions, canonical URLs, Open Graph, Twitter cards, and JSON-LD.
- Mobile-friendly navigation and accessible focus states.
- SPA fallback configuration for direct refreshes on nested routes.

## Technology stack

- Angular `17.3.x`
- TypeScript `5.4.x`
- Bootstrap `5.3.x`
- Bootstrap Icons `1.11.x`
- RxJS `7.8.x`
- SCSS

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open [http://localhost:4200/](http://localhost:4200/).

## Production build

```bash
npm run build
```

The optimized output is generated in `dist/javacodeex`.

## Tests

Run the Angular unit-test command with:

```bash
npm test
```

## Main routes

| Area | Route |
| --- | --- |
| Home | `/` |
| Java tutorials | `/java` |
| Spring Boot tutorials | `/springboot` |
| Python | `/python` |
| Design Patterns overview | `/design-patterns` |
| Singleton | `/design-patterns/singleton` |
| Factory Method | `/design-patterns/factory-method` |
| Abstract Factory, Builder, Prototype | `/design-patterns/abstract-factory`, `/design-patterns/builder`, `/design-patterns/prototype` |
| Structural patterns | `/design-patterns/adapter` through `/design-patterns/proxy` |
| Behavioral patterns | `/design-patterns/chain-of-responsibility` through `/design-patterns/visitor` |
| Hibernate, MySQL, PostgreSQL | `/hibernate`, `/mysql`, `/postgresql` |
| Spring AI | `/spring-ai` |

## Project structure

```text
src/
└── app/
    ├── core/             # Models, constants, services, and SEO logic
    ├── layout/           # Header, navbar, footer, breadcrumbs, and layouts
    ├── shared/           # Reusable components and utilities
    ├── features/         # Home, Java, Spring Boot, and Design Patterns pages
    ├── app.component.ts
    ├── app.config.ts
    └── app.routes.ts

public/
├── assets/               # Public images and static assets
├── docs/java/            # Imported Java HTML documentation
├── docs/springboot/      # Imported Spring Boot HTML documentation
└── _redirects            # SPA fallback for Netlify-style hosting
```

## Tutorial content migration

The original Java and Spring Boot HTML files are stored under `public/docs`. The document components load those files, remove legacy headers, navigation, scripts, and duplicate footers, then display the content inside the Angular layout. Internal `.html` links are rewritten to Angular routes.

New application pages, including Design Patterns, are implemented as standalone Angular components with typed route data and lazy-loaded content where appropriate.

## Deployment

For static hosting, configure all unknown routes to serve `index.html`. The included `public/_redirects` file contains the SPA fallback used by Netlify-compatible hosts:

```text
/*    /index.html   200
```

For other hosts, configure an equivalent fallback rule in the hosting server. This is required for direct refreshes on routes such as `/java/strings` or `/design-patterns/observer`.

## SEO notes

The application updates metadata when Angular navigation changes routes. Each page can provide route title, description, category, and keyword data. The homepage also includes static metadata and structured data in `src/index.html`.

When deploying to production, verify the canonical origin, sitemap, robots policy, social preview image, and hosting fallback configuration for the final domain.

## Development guidelines

- Use standalone components and typed route data.
- Keep shared layout code in `src/app/layout`.
- Keep reusable UI in `src/app/shared`.
- Add new tutorial pages under the appropriate feature folder.
- Use `routerLink` for internal navigation.
- Keep static course assets under `public/assets` or `public/docs`.
- Run `npm run build` before publishing changes.
