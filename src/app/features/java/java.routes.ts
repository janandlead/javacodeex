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
  'object-class',
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
const markerInterfaceVideoSeo = { name: 'Java Marker Interfaces Tutorial', description: 'Learn Java marker interfaces including Serializable, Cloneable, Remote, and object serialization.', thumbnailUrl: 'https://i.ytimg.com/vi/smMODFC5Ewk/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/smMODFC5Ewk', contentUrl: 'https://youtu.be/smMODFC5Ewk?si=eFtMoSgop4gyogqI' };
const javaRoute = (slug: string): string => slug === 'introduction-to-java' || slug.startsWith('java-') ? slug : `java-${slug}`;
const routeFor = (slug: string, index: number): Routes[number] => {
  const page = JAVA_PAGES[slug];
  const isObjectClass = slug === 'object-class';
  const isMarkerInterface = slug === 'marker-interface';
  const title = isObjectClass
    ? 'Java Object Class: equals() and hashCode() | Java Codeex'
    : isMarkerInterface
      ? 'Java Marker Interfaces: Serializable, Cloneable & Remote'
      : `${page.title} Tutorial | Java Codeex`;
  const keywords = isObjectClass
    ? 'Java Object class, java.lang.Object methods, equals and hashCode, toString, getClass, clone, wait notify, Java tutorial'
    : isMarkerInterface
      ? 'Java marker interfaces, Serializable, Cloneable, Remote, Externalizable, serialVersionUID, transient, Java serialization'
      : `${page.title}, Java tutorials, Java programming, learn Java`;
  return {
    path: javaRoute(slug),
    title,
    data: {
      fileName: `${slug}.html`, title: page.title, category: 'Java', primaryKeyword: isObjectClass ? 'Java Object class' : isMarkerInterface ? 'Java marker interfaces' : page.title,
      description: page.description, keywords,
      seo: {
        title, description: page.description, keyword: isObjectClass ? 'Java Object class' : isMarkerInterface ? 'Java marker interfaces' : page.title,
        canonicalUrl: `https://javacodeex.com/${javaRoute(slug)}`, keywords,
        breadcrumbs: [{ name: 'Home', url: 'https://javacodeex.com/' }, { name: 'Java', url: 'https://javacodeex.com/java-tutorial-overview' }, { name: page.title, url: `https://javacodeex.com/${javaRoute(slug)}` }],
        ...((isObjectClass || isMarkerInterface) ? { articleSection: 'Java Fundamentals', modifiedTime: '2026-07-27' } : {}),
        ...(isMarkerInterface ? { video: markerInterfaceVideoSeo } : {})
      },
      previousRoute: index > 0 ? `/${javaRoute(topics[index - 1])}` : '/java-tutorial-overview', previousLabel: index > 0 ? JAVA_PAGES[topics[index - 1]].title : 'Java Tutorial Overview',
      nextRoute: index < topics.length - 1 ? `/${javaRoute(topics[index + 1])}` : '', nextLabel: index < topics.length - 1 ? JAVA_PAGES[topics[index + 1]].title : ''
    },
    loadComponent: () => Promise.resolve(JavaDocumentComponent)
  };
};

export const JAVA_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/java-tutorial-overview' },
  { path: '404', title: 'Java Page Not Found | Java Codeex', data: { fileName: '404.html', title: 'Java Page Not Found', robots: 'noindex, nofollow' }, loadComponent: () => Promise.resolve(JavaDocumentComponent) },
  ...topics.map(routeFor),
  { path: ':topic/:section', title: 'Java Tutorial | Java Codeex', data: { category: 'Java' }, loadComponent: () => Promise.resolve(JavaDocumentComponent) }
];
