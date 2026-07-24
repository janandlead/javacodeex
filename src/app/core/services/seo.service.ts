import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteUrl = 'https://javacodeex.in';
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.update(this.deepestRoute(this.router.routerState.snapshot.root));
    });
  }

  private deepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestRoute(route.firstChild) : route;
  }

  private update(route: ActivatedRouteSnapshot): void {
    const pageTitle = route.title ?? route.data['title'] ?? 'Java Codeex';
    const title = pageTitle.includes('Java Codeex') ? pageTitle : `${pageTitle} | Java Codeex`;
    const category = route.data['category'] as string | undefined;
    const robots = route.data['robots'] as string | undefined ?? 'index, follow, max-image-preview:large';
    const description = route.data['description'] as string | undefined
      ?? (category ? `Learn ${pageTitle.replace(/ \| Java Codeex$/, '')} with practical examples and clear explanations on Java Codeex.` : 'Practical Java, Spring Boot, programming, database, design pattern, and AI tutorials with clear explanations and real-world examples.');
    const keywords = route.data['keywords'] as string | undefined
      ?? (category === 'Design Patterns' ? 'Java design patterns, Creational Design Patterns, Structural Design Patterns, Behavioral Design Patterns, Singleton Pattern Java, Factory Method Java, Abstract Factory Java, Builder Pattern Java, Prototype Pattern Java, Adapter Pattern Java, Bridge Pattern Java, Composite Pattern Java, Decorator Pattern Java, Facade Pattern Java, Flyweight Pattern Java, Proxy Pattern Java, Observer Pattern Java, Strategy Pattern Java' : 'Java tutorials, Spring Boot tutorials, Java programming, database tutorials, programming courses');
    const path = this.router.url.split(/[?#]/)[0] || '/';
    const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
    const url = `${this.siteUrl}${normalizedPath}`;
    const socialImage = `${this.siteUrl}/assets/images/javacodeex.jpg`;

    this.title.setTitle(title);
    this.setMeta('description', description);
    this.setMeta('keywords', keywords);
    this.setMeta('robots', robots);
    this.setMeta('googlebot', robots.replace(', max-image-preview:large', ''));
    this.setMeta('og:title', title, 'property');
    this.setMeta('og:description', description, 'property');
    this.setMeta('og:type', 'website', 'property');
    this.setMeta('og:url', url, 'property');
    this.setMeta('og:site_name', 'Java Codeex', 'property');
    this.setMeta('og:image', socialImage, 'property');
    this.setMeta('og:image:alt', 'Java Codeex programming tutorial logo', 'property');
    this.setMeta('twitter:card', 'summary_large_image');
    this.setMeta('twitter:title', title);
    this.setMeta('twitter:description', description);
    this.setMeta('twitter:image', socialImage);
    this.setMeta('twitter:image:alt', 'Java Codeex programming tutorial logo');
    this.setMeta('twitter:url', url);

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
    this.updateStructuredData(title, description, url, category);
  }

  private updateStructuredData(title: string, description: string, url: string, category?: string): void {
    const scriptId = 'dynamic-page-structured-data';
    let script = this.document.head.querySelector<HTMLScriptElement>(`#${scriptId}`);
    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': category === 'Design Patterns' || category === 'Java' || category === 'Spring Boot' ? 'TechArticle' : 'WebPage',
      headline: title,
      name: title,
      description,
      url,
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'WebSite', name: 'Java Codeex', url: `${this.siteUrl}/` },
      author: { '@type': 'Organization', name: 'Java Codeex', url: `${this.siteUrl}/` },
      publisher: { '@type': 'Organization', name: 'Java Codeex', url: `${this.siteUrl}/` }
    });
  }

  private setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    this.meta.updateTag({ [attribute]: name, content }, `${attribute}="${name}"`);
  }
}
