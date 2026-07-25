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
const routeFor = (slug: string, index: number): Routes[number] => ({
  path: slug,
  title: `${SPRINGBOOT_PAGES[slug].title} | Java Codeex`,
  data: { fileName: `${slug}.html`, title: SPRINGBOOT_PAGES[slug].title, category: 'Spring Boot', primaryKeyword: slug === 'introduction' ? 'Spring Boot tutorial' : SPRINGBOOT_PAGES[slug].title, description: SPRINGBOOT_PAGES[slug].description, keywords: `${SPRINGBOOT_PAGES[slug].title}, Spring Boot tutorial, Spring Boot, Java backend`, seo: { title: `${SPRINGBOOT_PAGES[slug].title} Tutorial | Java Codeex`, description: SPRINGBOOT_PAGES[slug].description, keyword: slug === 'introduction' ? 'Spring Boot tutorial' : SPRINGBOOT_PAGES[slug].title, canonicalUrl: `https://javacodeex.in/spring-boot/${slug}`, keywords: `${SPRINGBOOT_PAGES[slug].title}, Spring Boot tutorial, Java backend` }, backRoute: '/spring-boot', assetFolder: 'springboot', previousRoute: index > 0 ? `/spring-boot/${topics[index - 1]}` : '/spring-boot', previousLabel: index > 0 ? SPRINGBOOT_PAGES[topics[index - 1]].title : 'Spring Boot Tutorial', nextRoute: index < topics.length - 1 ? `/spring-boot/${topics[index + 1]}` : '', nextLabel: index < topics.length - 1 ? SPRINGBOOT_PAGES[topics[index + 1]].title : '' },
  loadComponent: () => Promise.resolve(CourseDocumentComponent)
});

export const SPRINGBOOT_ROUTES: Routes = [
  {
    path: '',
    title: 'Spring Boot Tutorial | Java Codeex',
    data: { fileName: 'index.html', title: 'Spring Boot Tutorial', category: 'Spring Boot', primaryKeyword: 'Spring Boot tutorials', description: 'Learn Spring Boot through practical tutorials covering auto-configuration, REST APIs, databases, security, testing, and deployment.', keywords: 'Spring Boot tutorials, Spring Boot tutorial, learn Spring Boot, Java backend', seo: { title: 'Spring Boot Tutorial | Java Codeex', description: 'Learn Spring Boot through practical tutorials covering auto-configuration, REST APIs, databases, security, testing, and deployment.', keyword: 'Spring Boot tutorial', canonicalUrl: 'https://javacodeex.in/spring-boot', keywords: 'Spring Boot tutorials, Spring Boot tutorial, learn Spring Boot, Java backend' }, backRoute: '/spring-boot', assetFolder: 'springboot', nextRoute: `/spring-boot/${topics[0]}`, nextLabel: SPRINGBOOT_PAGES[topics[0]].title },
    loadComponent: () => Promise.resolve(CourseDocumentComponent)
  },
  ...topics.map(routeFor),
  { path: ':topic/:section', title: 'Spring Boot Tutorial | Java Codeex', data: { category: 'Spring Boot', assetFolder: 'springboot' }, loadComponent: () => Promise.resolve(CourseDocumentComponent) }
];
