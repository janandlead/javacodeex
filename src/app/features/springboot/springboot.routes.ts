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
  'rest-api',
  'rest-api-design',
  'validation',
  'testing',
  'testing-comprehensive',
  'actuator',
  'deployment'
];
const routeNames: Record<string, string> = {
  introduction: 'spring-boot-core',
  aop: 'spring-boot-aop',
  'data-jpa': 'spring-boot-data-jpa',
  'security-comprehensive': 'spring-boot-security',
  'exception-handling': 'spring-boot-global-exception-handling',
  'rest-api': 'spring-boot-rest-api',
  validation: 'spring-boot-validation',
  'rest-api-design': 'spring-boot-rest-api-design',
  testing: 'spring-boot-testing',
  actuator: 'spring-boot-actuator',
  deployment: 'spring-boot-deployment'
};
const routeSlug = (slug: string): string => routeNames[slug] ?? slug;
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
const routeFor = (slug: string, index: number): Routes[number] => {
  const nextTopic = index < topics.length - 1 ? topics[index + 1] : '';
  return ({
  path: routeSlug(slug),
  title: slug === 'rest-api-design' ? restApiDesignRouteTitle : slug === 'validation' ? springBootValidationRouteTitle : slug === 'testing' ? springBootTestingRouteTitle : slug === 'actuator' ? springBootActuatorRouteTitle : slug === 'deployment' ? springBootDeploymentRouteTitle : `${SPRINGBOOT_PAGES[slug].title} | Java Codeex`,
  data: { fileName: `${slug}.html`, title: SPRINGBOOT_PAGES[slug].title, category: 'Spring Boot', primaryKeyword: slug === 'introduction' ? 'Spring Boot tutorial' : SPRINGBOOT_PAGES[slug].title, description: SPRINGBOOT_PAGES[slug].description, keywords: `${SPRINGBOOT_PAGES[slug].title}, Spring Boot tutorial, Spring Boot, Java backend`, seo: { title: slug === 'validation' ? springBootValidationRouteTitle : slug === 'testing' ? springBootTestingRouteTitle : slug === 'actuator' ? springBootActuatorRouteTitle : `${SPRINGBOOT_PAGES[slug].title} Tutorial | Java Codeex`, description: SPRINGBOOT_PAGES[slug].description, keyword: slug === 'introduction' ? 'Spring Boot tutorial' : SPRINGBOOT_PAGES[slug].title, canonicalUrl: `https://javacodeex.com/spring-boot/${routeSlug(slug)}`, keywords: `${SPRINGBOOT_PAGES[slug].title}, Spring Boot tutorial, Spring Boot, Java backend`, ...(slug === 'rest-api-design' ? restApiDesignSeoDates : {}), ...(slug === 'validation' ? springBootValidationSeoDates : {}), ...(slug === 'testing' ? springBootTestingSeoDates : {}), ...(slug === 'actuator' ? springBootActuatorSeoDates : {}), breadcrumbs: [{ name: 'Home', url: 'https://javacodeex.com/' }, { name: 'Spring Boot', url: 'https://javacodeex.com/spring-boot-overview' }, { name: SPRINGBOOT_PAGES[slug].title, url: `https://javacodeex.com/spring-boot/${routeSlug(slug)}` }] }, backRoute: '/spring-boot', assetFolder: 'springboot', previousRoute: index > 0 ? `/spring-boot/${routeSlug(topics[index - 1])}` : '/spring-boot', previousLabel: index > 0 ? SPRINGBOOT_PAGES[topics[index - 1]].title : 'Spring Boot Tutorial', nextRoute: index < topics.length - 1 ? `/spring-boot/${routeSlug(topics[index + 1])}` : '', nextLabel: nextTopic ? SPRINGBOOT_PAGES[nextTopic].title : '' },
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
