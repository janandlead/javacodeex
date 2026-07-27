import { Routes } from '@angular/router';
import { SPRINGBOOT_PAGES } from '../../core/constants/tutorial-content';
import { CourseDocumentComponent } from '../course-document/course-document.component';

const topics = [
  'introduction',
  'setup',
  'project-structure',
  'aop',
  'data-jpa',
  'security-comprehensive',
  'exception-handling',
  'profiles',
  'scheduler',
  'rest-api',
  'rest-api-design',
  'validation',
  'testing',
  'testing-comprehensive',
  'actuator',
  'deployment',
  'migration-2-to-3'
];
const routeNames: Record<string, string> = {
  introduction: 'spring-boot-core',
  'project-structure': 'project-structure',
  aop: 'spring-boot-aop',
  'data-jpa': 'spring-boot-data-jpa',
  'security-comprehensive': 'spring-boot-security',
  'exception-handling': 'spring-boot-global-exception-handling',
  profiles: 'spring-boot-profiles',
  scheduler: 'spring-boot-scheduler',
  'rest-api': 'spring-boot-rest-api',
  validation: 'spring-boot-validation',
  'rest-api-design': 'spring-boot-rest-api-design',
  testing: 'spring-boot-testing',
  actuator: 'spring-boot-actuator',
  deployment: 'spring-boot-deployment',
  'migration-2-to-3': 'spring-boot-2-to-3-migration'
};
const routeSlug = (slug: string): string => routeNames[slug] ?? slug;
const canonicalRoute = (slug: string): string => routeNames[slug] ? `/${routeNames[slug]}` : `/spring-boot/${slug}`;
const restApiDesignSeoDates = { modifiedTime: '2026-07-26' };
const restApiDesignRouteTitle = 'REST API Design Best Practices Tutorial | Java Codeex';
const springBootValidationSeoDates = { modifiedTime: '2026-07-26' };
const springBootValidationRouteTitle = 'Spring Boot Request Validation Tutorial | Java Codeex';
const springBootTestingSeoDates = { modifiedTime: '2026-07-26' };
const springBootTestingRouteTitle = 'Spring Boot Testing Tutorial | Java Codeex';
const springBootActuatorSeoDates = { modifiedTime: '2026-07-26' };
const springBootActuatorRouteTitle = 'Spring Boot Actuator Tutorial | Java Codeex';
const springBootDeploymentSeoDates = { modifiedTime: '2026-07-26' };
const springBootDeploymentRouteTitle = 'Spring Boot Deployment Tutorial | Java Codeex';
const springBootMigrationRouteTitle = 'Spring Boot 2 to 3 Migration Guide | Java Codeex';
const springBootSecurityRouteTitle = 'Spring Boot Security Tutorial | Java Codeex';
const springBootRestApiVideo = { name: 'Spring Boot REST API Tutorial', description: 'Learn Spring Boot REST API development with controllers, HTTP methods, CRUD operations, DTOs, validation, pagination, versioning, and practical Java examples.', thumbnailUrl: 'https://i.ytimg.com/vi/7MCAMleg8Mw/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/7MCAMleg8Mw', contentUrl: 'https://youtu.be/7MCAMleg8Mw?si=y6lE5F8fYeKUZa5y' };
const routeFor = (slug: string): Routes[number] => {
  const index = topics.indexOf(slug);
  const nextTopic = index < topics.length - 1 ? topics[index + 1] : '';
  return ({
  path: routeSlug(slug),
  title: slug === 'rest-api-design' ? restApiDesignRouteTitle : slug === 'validation' ? springBootValidationRouteTitle : slug === 'testing' ? springBootTestingRouteTitle : slug === 'actuator' ? springBootActuatorRouteTitle : slug === 'deployment' ? springBootDeploymentRouteTitle : slug === 'migration-2-to-3' ? springBootMigrationRouteTitle : slug === 'security-comprehensive' ? springBootSecurityRouteTitle : `${SPRINGBOOT_PAGES[slug].title} | Java Codeex`,
  data: { fileName: `${slug}.html`, title: SPRINGBOOT_PAGES[slug].title, category: 'Spring Boot', primaryKeyword: slug === 'migration-2-to-3' ? 'Spring Boot 2 to 3 migration' : slug === 'security-comprehensive' ? 'Spring Boot Security' : slug === 'introduction' ? 'Spring Boot tutorial' : SPRINGBOOT_PAGES[slug].title, description: SPRINGBOOT_PAGES[slug].description, keywords: `${SPRINGBOOT_PAGES[slug].title}, Spring Boot Security, authentication, authorization, JWT, Spring Boot tutorial`, seo: { title: slug === 'validation' ? springBootValidationRouteTitle : slug === 'testing' ? springBootTestingRouteTitle : slug === 'actuator' ? springBootActuatorRouteTitle : slug === 'migration-2-to-3' ? springBootMigrationRouteTitle : slug === 'security-comprehensive' ? springBootSecurityRouteTitle : `${SPRINGBOOT_PAGES[slug].title} Tutorial | Java Codeex`, description: SPRINGBOOT_PAGES[slug].description, keyword: slug === 'migration-2-to-3' ? 'Spring Boot 2 to 3 migration' : slug === 'security-comprehensive' ? 'Spring Boot Security' : slug === 'introduction' ? 'Spring Boot tutorial' : SPRINGBOOT_PAGES[slug].title, canonicalUrl: `https://javacodeex.com${canonicalRoute(slug)}`, keywords: `${SPRINGBOOT_PAGES[slug].title}, Spring Boot Security, authentication, authorization, JWT, Spring Boot tutorial`, ...(slug === 'rest-api-design' ? restApiDesignSeoDates : {}), ...(slug === 'validation' ? springBootValidationSeoDates : {}), ...(slug === 'testing' ? springBootTestingSeoDates : {}), ...(slug === 'actuator' ? springBootActuatorSeoDates : {}), ...(slug === 'migration-2-to-3' ? { modifiedTime: '2026-07-27' } : {}), ...(slug === 'rest-api' ? { video: springBootRestApiVideo } : {}), breadcrumbs: [{ name: 'Home', url: 'https://javacodeex.com/' }, { name: 'Spring Boot', url: 'https://javacodeex.com/spring-boot-overview' }, { name: SPRINGBOOT_PAGES[slug].title, url: `https://javacodeex.com${canonicalRoute(slug)}` }] }, backRoute: '/spring-boot-overview', assetFolder: 'springboot', previousRoute: index > 0 ? canonicalRoute(topics[index - 1]) : '/spring-boot-overview', previousLabel: index > 0 ? SPRINGBOOT_PAGES[topics[index - 1]].title : 'Spring Boot Tutorial', nextRoute: index < topics.length - 1 ? canonicalRoute(topics[index + 1]) : '', nextLabel: nextTopic ? SPRINGBOOT_PAGES[nextTopic].title : '' },
  loadComponent: () => Promise.resolve(CourseDocumentComponent)
  });
};

export const SPRINGBOOT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/spring-boot-overview' },
  { path: 'project-structure', pathMatch: 'full', redirectTo: '/project-structure' },
  { path: 'introduction', pathMatch: 'full', redirectTo: 'spring-boot-core' },
  { path: 'aop', pathMatch: 'full', redirectTo: 'spring-boot-aop' },
  { path: 'data-jpa', pathMatch: 'full', redirectTo: 'spring-boot-data-jpa' },
  { path: 'security-comprehensive', pathMatch: 'full', redirectTo: 'spring-boot-security' },
  { path: 'exception-handling', pathMatch: 'full', redirectTo: 'spring-boot-global-exception-handling' },
  { path: 'rest-api', pathMatch: 'full', redirectTo: 'spring-boot-rest-api' },
  { path: 'validation', pathMatch: 'full', redirectTo: 'spring-boot-validation' },
  { path: 'testing', pathMatch: 'full', redirectTo: '/spring-boot-testing' },
  ...topics.filter((slug) => !routeNames[slug]).map(routeFor),
  { path: 'spring-boot-core', pathMatch: 'full', redirectTo: '/spring-boot-core' },
  { path: 'spring-boot-aop', pathMatch: 'full', redirectTo: '/spring-boot-aop' },
  { path: 'spring-boot-data-jpa', pathMatch: 'full', redirectTo: '/spring-boot-data-jpa' },
  { path: 'spring-boot-security', pathMatch: 'full', redirectTo: '/spring-boot-security' },
  { path: 'spring-boot-global-exception-handling', pathMatch: 'full', redirectTo: '/spring-boot-global-exception-handling' },
  { path: 'spring-boot-rest-api', pathMatch: 'full', redirectTo: '/spring-boot-rest-api' },
  { path: 'spring-boot-validation', pathMatch: 'full', redirectTo: '/spring-boot-validation' },
  { path: 'spring-boot-testing', pathMatch: 'full', redirectTo: '/spring-boot-testing' },
  { path: 'spring-boot-rest-api-design', pathMatch: 'full', redirectTo: '/spring-boot-rest-api-design' },
  { path: 'spring-boot-actuator', pathMatch: 'full', redirectTo: '/spring-boot-actuator' },
  { path: 'spring-boot-deployment', pathMatch: 'full', redirectTo: '/spring-boot-deployment' },
  { path: ':topic/:section', title: 'Spring Boot Tutorial | Java Codeex', data: { category: 'Spring Boot', assetFolder: 'springboot' }, loadComponent: () => Promise.resolve(CourseDocumentComponent) }
];
