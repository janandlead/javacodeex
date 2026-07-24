import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
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
    const description = route.data['description'] as string | undefined
      ?? (category ? `Learn ${pageTitle.replace(/ \| Java Codeex$/, '')} with practical examples and clear explanations on Java Codeex.` : 'Practical Java, Spring Boot, programming, database, design pattern, and AI tutorials with clear explanations and real-world examples.');
    const keywords = route.data['keywords'] as string | undefined
      ?? (category === 'Design Patterns' ? 'Java design patterns, Creational Design Patterns, Structural Design Patterns, Behavioral Design Patterns, Singleton Pattern Java, Factory Method Java, Abstract Factory Java, Builder Pattern Java, Prototype Pattern Java, Adapter Pattern Java, Bridge Pattern Java, Composite Pattern Java, Decorator Pattern Java, Facade Pattern Java, Flyweight Pattern Java, Proxy Pattern Java, Observer Pattern Java, Strategy Pattern Java' : 'Java tutorials, Spring Boot tutorials, Java programming, database tutorials, programming courses');
    const url = `${this.document.location?.origin ?? ''}${this.router.url.split('#')[0]}`;

    this.title.setTitle(title);
    this.setMeta('description', description);
    this.setMeta('keywords', keywords);
    this.setMeta('og:title', title, 'property');
    this.setMeta('og:description', description, 'property');
    this.setMeta('og:type', 'website', 'property');
    this.setMeta('og:url', url, 'property');
    this.setMeta('og:site_name', 'Java Codeex', 'property');
    this.setMeta('og:image', `${this.document.location?.origin ?? ''}/assets/images/javacodeex.jpg`, 'property');
    this.setMeta('twitter:card', 'summary_large_image');
    this.setMeta('twitter:title', title);
    this.setMeta('twitter:description', description);
    this.setMeta('twitter:image', `${this.document.location?.origin ?? ''}/assets/images/javacodeex.jpg`);

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    this.meta.updateTag({ [attribute]: name, content }, `${attribute}="${name}"`);
  }
}
