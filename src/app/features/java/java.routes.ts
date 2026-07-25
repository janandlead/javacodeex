import { Routes } from '@angular/router';
import { JAVA_PAGES } from '../../core/constants/tutorial-content';
import { JavaDocumentComponent } from './java-document.component';

const topics = [
  'introduction-to-java',
  'download-and-install-java',
  'download-and-install-intellij-idea',
  'methods',
  'arrays',
  'strings',
  'oop-concepts',
  'interfaces',
  'exception-handling',
  'regex',
  'memory-allocation',
  'generics',
  'collections',
  'java-8-features',
  'date-and-time-api',
  'multithreading',
  'file-handling',
  'networking',
  'jdbc',
  'marker-interface'
];
const routeFor = (slug: string, index: number): Routes[number] => ({
  path: slug,
  title: `${JAVA_PAGES[slug].title} | Java Codeex`,
  data: { fileName: `${slug}.html`, title: JAVA_PAGES[slug].title, category: 'Java', primaryKeyword: JAVA_PAGES[slug].title, description: JAVA_PAGES[slug].description, keywords: `${JAVA_PAGES[slug].title}, Java tutorials, Java programming, learn Java`, seo: { title: `${JAVA_PAGES[slug].title} Tutorial | Java Codeex`, description: JAVA_PAGES[slug].description, keyword: JAVA_PAGES[slug].title, canonicalUrl: `https://javacodeex.in/java/${slug}`, keywords: `${JAVA_PAGES[slug].title}, Java tutorials, Java programming` }, previousRoute: index > 0 ? `/java/${topics[index - 1]}` : '/java', previousLabel: index > 0 ? JAVA_PAGES[topics[index - 1]].title : 'Java Tutorial', nextRoute: index < topics.length - 1 ? `/java/${topics[index + 1]}` : '', nextLabel: index < topics.length - 1 ? JAVA_PAGES[topics[index + 1]].title : '' },
  loadComponent: () => Promise.resolve(JavaDocumentComponent)
});

export const JAVA_ROUTES: Routes = [
  {
    path: '',
    title: 'Java Tutorial | Java Codeex',
    data: { fileName: 'index.html', title: 'Java Tutorial', category: 'Java', primaryKeyword: 'Java tutorials', description: 'Learn Java programming from fundamentals to advanced topics with practical examples and clear explanations.', keywords: 'Java tutorials, Java programming tutorial, learn Java, core Java', seo: { title: 'Java Tutorial | Java Codeex', description: 'Learn Java programming from fundamentals to advanced topics with practical examples and clear explanations.', keyword: 'Java tutorials', canonicalUrl: 'https://javacodeex.in/java', keywords: 'Java tutorials, Java programming tutorial, learn Java' }, nextRoute: `/java/${topics[0]}`, nextLabel: JAVA_PAGES[topics[0]].title },
    loadComponent: () => Promise.resolve(JavaDocumentComponent)
  },
  { path: '404', title: 'Java Page Not Found | Java Codeex', data: { fileName: '404.html', title: 'Java Page Not Found', robots: 'noindex, nofollow' }, loadComponent: () => Promise.resolve(JavaDocumentComponent) },
  ...topics.map(routeFor),
  { path: ':topic/:section', title: 'Java Tutorial | Java Codeex', data: { category: 'Java' }, loadComponent: () => Promise.resolve(JavaDocumentComponent) }
];
