# Java Codeex Angular Migration

This project is now an Angular 17 standalone application using Bootstrap 5 and Bootstrap Icons.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Build for production

```bash
npm run build
```

The production output is written to `dist/javacodeex`.

## Application structure

- `src/app/core` contains typed navigation and tutorial models/content.
- `src/app/layout` contains the reusable header, navbar, footer, sidebar, breadcrumbs, and main layout.
- `src/app/shared` contains reusable page-header, code-block, and 404 components.
- `src/app/features` contains home, Java, Spring Boot, Python, and tutorial pages.
- Java and Spring Boot are lazy-loaded route trees.
- `public/docs/java` contains the complete inspected Java source documents from `C:\javatutorial\java`. `JavaDocumentComponent` loads these documents, removes legacy page chrome and scripts, and rewrites internal Java links to Angular routes.
- `public/docs/springboot` contains the complete inspected Spring Boot source documents from `C:\javatutorial\springboot`. `CourseDocumentComponent` loads these documents, removes legacy page chrome and scripts, and rewrites internal Spring Boot links to Angular routes.

Internal links use Angular Router routes without `.html` extensions. The old clean URL families are preserved under `/java`, `/springboot`, and `/python`.

For Netlify, `public/_redirects` sends unknown paths to `index.html` so direct refreshes on nested routes work.
