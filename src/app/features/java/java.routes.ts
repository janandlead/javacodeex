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
const javaRoute = (slug: string): string => slug === 'introduction-to-java' || slug.startsWith('java-') ? slug : `java-${slug}`;
const routeFor = (slug: string, index: number): Routes[number] => {
  const page = JAVA_PAGES[slug];
  const isObjectClass = slug === 'object-class';
  const isMarkerInterface = slug === 'marker-interface';
  const isMemoryAllocation = slug === 'memory-allocation';
  const isExceptionHandling = slug === 'exception-handling';
  const isJavaInstall = slug === 'download-and-install-java';
  const isIntellijInstall = slug === 'download-and-install-intellij-idea';
  const isJava8Features = slug === 'java-8-features';
  const isJdbc = slug === 'jdbc';
  const title = isObjectClass
    ? 'Java Object Class Methods: equals(), hashCode() & toString() | Java Codeex'
    : isMarkerInterface
      ? 'Java Marker Interfaces: Serializable & Cloneable | Java Codeex'
      : isMemoryAllocation
        ? `${page.title} | Java Codeex`
        : isJavaInstall
          ? 'Install Java JDK on Windows, macOS, and Linux | Java Codeex'
          : isIntellijInstall
            ? 'Install IntelliJ IDEA for Java Development | Java Codeex'
            : isJava8Features
              ? 'Java 8 Features: Lambdas, Streams & Optional | Java Codeex'
              : isJdbc
                ? 'Java JDBC Database Connectivity Tutorial | Java Codeex'
        : `${page.title} Tutorial | Java Codeex`;
  const keywords = isObjectClass
    ? 'Java Object class, java.lang.Object methods, equals and hashCode, toString, getClass, clone, wait notify, Java tutorial'
    : isMarkerInterface
      ? 'Java marker interfaces, Serializable, Cloneable, Remote, Externalizable, serialVersionUID, transient, Java serialization'
    : isMemoryAllocation
      ? 'Java memory management, JVM memory areas, Java class loaders, stack vs heap, garbage collection, Java memory leaks'
      : `${page.title}, Java tutorials, Java programming, learn Java`;
  const socialImage = isExceptionHandling
    ? 'https://javacodeex.com/assets/images/java/java-exception-handling-guide.png'
    : undefined;
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
        ...(socialImage ? { imageUrl: socialImage, imageAlt: 'Java exception handling guide covering try-catch, exceptions, propagation, and resource management' } : {}),
        ...((isObjectClass || isMarkerInterface) ? { articleSection: 'Java Fundamentals', modifiedTime: '2026-07-27' } : {}),
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
