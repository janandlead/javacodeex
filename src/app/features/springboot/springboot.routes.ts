import { Routes } from '@angular/router';
import { SPRINGBOOT_PAGES } from '../../core/constants/tutorial-content';
import { CourseDocumentComponent } from '../course-document/course-document.component';

const topics = [
  'introduction',
  'setup',
  'project-structure',
  'dependency-injection',
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
  data: { fileName: `${slug}.html`, title: SPRINGBOOT_PAGES[slug].title, category: 'Spring Boot', backRoute: '/springboot', assetFolder: 'springboot', previousRoute: index > 0 ? `/springboot/${topics[index - 1]}` : '/springboot', previousLabel: index > 0 ? SPRINGBOOT_PAGES[topics[index - 1]].title : 'Spring Boot Tutorial', nextRoute: index < topics.length - 1 ? `/springboot/${topics[index + 1]}` : '', nextLabel: index < topics.length - 1 ? SPRINGBOOT_PAGES[topics[index + 1]].title : '' },
  loadComponent: () => Promise.resolve(CourseDocumentComponent)
});

export const SPRINGBOOT_ROUTES: Routes = [
  {
    path: '',
    title: 'Spring Boot Tutorial | Java Codeex',
    data: { fileName: 'index.html', title: 'Spring Boot Tutorial', category: 'Spring Boot', backRoute: '/springboot', assetFolder: 'springboot', nextRoute: `/springboot/${topics[0]}`, nextLabel: SPRINGBOOT_PAGES[topics[0]].title },
    loadComponent: () => Promise.resolve(CourseDocumentComponent)
  },
  ...topics.map(routeFor)
];
