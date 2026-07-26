import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { SeoConfig, StructuredDataConfig } from '../models/seo.model';
import { InterviewTopic } from '../../features/interview-questions/models/interview-topic.model';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteUrl = 'https://javacodeex.com';
  private readonly defaultImage = `${this.siteUrl}/assets/images/javacodeex.jpg`;
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.update(this.deepestRoute(this.router.routerState.snapshot.root), event.urlAfterRedirects);
    });
    this.update(this.deepestRoute(this.router.routerState.snapshot.root), this.router.url);
  }

  updateInterviewTopic(topic: InterviewTopic): void {
    const topicName = topic.name.replace(/\s+Interview Questions?$/i, '').trim();
    const title = `${topicName} Interview Questions | Java Codeex`;
    const description = `Prepare with ${topicName} interview questions covering core concepts, practical scenarios, and production topics for Java developers.`;
    const url = this.canonicalUrl(this.router.url);
    const keywords = [
      `${topicName} interview questions`,
      'Java interview questions',
      `${topicName} interview preparation`
    ];
    const seo: SeoConfig = {
      title,
      description,
      canonicalUrl: url,
      keywords,
      primaryKeyword: `${topicName} interview questions`,
      articleSection: 'Java Interview Preparation',
      type: 'article'
    };
    this.updatePageSeo(seo);
  }

  updatePageSeo(config: SeoConfig): void {
    const keywords = config.keywords?.length || config.keyword || config.primaryKeyword
      ? this.asKeywords(config.keywords, config.primaryKeyword ?? config.keyword)
      : [];
    const canonicalUrl = config.canonicalUrl || this.canonicalUrl(this.router.url);
    this.applyMetadata(
      { ...config, canonicalUrl, keywords },
      keywords,
      canonicalUrl,
      config.type ?? 'article',
      config.articleSection,
      config.primaryKeyword ?? config.keyword ?? keywords[0],
      config
    );
  }

  private deepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestRoute(route.firstChild) : route;
  }

  private update(route: ActivatedRouteSnapshot, navigationUrl: string): void {
    const data = this.routeData(route);
    const routeSeo = data['seo'] as SeoConfig | undefined;
    const pageTitle = routeSeo?.title ?? route.title ?? data['title'] as string | undefined ?? 'Programming Tutorials';
    const title = pageTitle.includes('Java Codeex') ? pageTitle : `${pageTitle} | Java Codeex`;
    const category = data['category'] as string | undefined;
    const primaryKeyword = routeSeo?.primaryKeyword ?? routeSeo?.keyword ?? data['primaryKeyword'] as string | undefined ?? data['keyword'] as string | undefined ?? this.inferPrimaryKeyword(title, category);
    const description = routeSeo?.description ?? data['description'] as string | undefined ?? 'Learn programming, web development, cloud, DevOps, databases, AI, system design, and popular frameworks through practical tutorials and projects.';
    const robots = routeSeo?.robots ?? data['robots'] as string | undefined ?? 'index, follow, max-image-preview:large';
    const routeKeywords = this.asKeywords(routeSeo?.keywords, primaryKeyword, data['keywords'] as string | undefined);
    const url = routeSeo?.canonicalUrl ?? this.canonicalUrl(navigationUrl);
    const socialImage = routeSeo?.imageUrl ?? this.defaultImage;
    const type = routeSeo?.type ?? (category ? 'article' : 'website');

    this.updatePageSeo({ title, description, canonicalUrl: url, keywords: routeKeywords, robots, imageUrl: socialImage, type, articleSection: routeSeo?.articleSection ?? category, publishedTime: routeSeo?.publishedTime, modifiedTime: routeSeo?.modifiedTime, primaryKeyword, breadcrumbs: routeSeo?.breadcrumbs ?? data['breadcrumbs'] as SeoConfig['breadcrumbs'] });
  }

  private routeData(route: ActivatedRouteSnapshot): Record<string, unknown> {
    const chain: ActivatedRouteSnapshot[] = [];
    let current: ActivatedRouteSnapshot | null = route;
    while (current) { chain.unshift(current); current = current.parent; }
    return chain.reduce((data, item) => ({ ...data, ...item.data }), {});
  }

  private applyMetadata(seo: SeoConfig, routeKeywords: readonly string[], url: string, type: 'website' | 'article' = seo.type ?? 'article', category = 'Java Interview Preparation', primaryKeyword = seo.primaryKeyword ?? routeKeywords[0], routeSeo?: SeoConfig): void {
    const title = seo.title.includes('Java Codeex') ? seo.title : `${seo.title} | Java Codeex`;
    const description = seo.description;
    const socialImage = seo.imageUrl ?? this.defaultImage;
    const robots = seo.robots ?? 'index, follow, max-image-preview:large';
    this.title.setTitle(title);
    this.setMeta('description', description);
    this.setMeta('keywords', routeKeywords.join(', '));
    this.setMeta('robots', robots);
    this.setMeta('googlebot', robots.replace(', max-image-preview:large', ''));
    this.setMeta('og:title', title, 'property');
    this.setMeta('og:description', description, 'property');
    this.setMeta('og:type', type, 'property');
    this.setMeta('og:locale', 'en_IN', 'property');
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
    this.setMeta('twitter:site', '@javacodeex');
    this.setMeta('article:section', seo.articleSection ?? category, 'property');
    this.setMeta('article:published_time', seo.publishedTime ?? '', 'property');
    this.setMeta('article:modified_time', seo.modifiedTime ?? '', 'property');

    let alternate = this.document.head.querySelector<HTMLLinkElement>('link[hreflang="en-in"]');
    if (!alternate) {
      alternate = this.document.createElement('link');
      alternate.rel = 'alternate';
      alternate.hreflang = 'en-in';
      this.document.head.appendChild(alternate);
    }
    alternate.href = url;

    const canonicals = Array.from(this.document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    let canonical = canonicals[0];
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
    canonicals.slice(1).forEach((link) => link.remove());
    this.updateStructuredData(title, description, url, category, routeKeywords.join(', '), primaryKeyword, type, routeSeo);
  }

  private canonicalUrl(navigationUrl: string): string {
    const path = navigationUrl.split(/[?#]/)[0] || '/';
    const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
    return `${this.siteUrl}${normalized}`;
  }

  private asKeywords(value?: readonly string[] | string, primaryKeyword?: string, fallback?: string): string[] {
    const keywordText = typeof value === 'string' ? value : fallback;
    const keywords = Array.isArray(value) ? [...value] : keywordText?.split(',').map((keyword: string) => keyword.trim()).filter(Boolean) ?? [];
    if (primaryKeyword && !keywords.includes(primaryKeyword)) keywords.unshift(primaryKeyword);
    return keywords.length ? keywords : ['programming tutorials', 'technology tutorials'];
  }

  private inferPrimaryKeyword(title: string, category?: string): string {
    const cleanTitle = title.replace(/\s*\|\s*Java Codeex\s*$/, '').replace(/\s+Course$/, '').trim();
    if (category === 'Design Patterns' && cleanTitle === 'Design Patterns in Java') return 'Java design patterns';
    if (cleanTitle === 'Java Codeex - Learn Programming') return 'programming tutorials';
    return cleanTitle;
  }

  private updateStructuredData(title: string, description: string, url: string, category?: string, keywords?: string, primaryKeyword?: string, type: 'website' | 'article' = 'website', seo?: SeoConfig, structuredData?: StructuredDataConfig): void {
    const scriptId = 'page-structured-data';
    let script = this.document.head.querySelector<HTMLScriptElement>(`#${scriptId}, #dynamic-page-structured-data`);
    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    const isArticle = type === 'article';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': isArticle ? 'TechArticle' : 'WebPage',
      headline: title,
      name: title,
      description,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      image: seo?.imageUrl ?? this.defaultImage,
      ...(isArticle ? { articleSection: seo?.articleSection ?? category, learningResourceType: 'Tutorial', keywords, about: { '@type': 'Thing', name: primaryKeyword }, ...(seo?.publishedTime ? { datePublished: seo.publishedTime } : {}), dateModified: seo?.modifiedTime ?? '2026-07-26' } : {}),
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'WebSite', name: 'Java Codeex', url: `${this.siteUrl}/` },
      author: { '@type': 'Organization', name: 'Java Codeex', url: `${this.siteUrl}/` },
      publisher: { '@type': 'Organization', name: 'Java Codeex', url: `${this.siteUrl}/` },
      ...((seo?.breadcrumbs ?? structuredData?.breadcrumbs)?.length ? { breadcrumb: { '@type': 'BreadcrumbList', itemListElement: (seo?.breadcrumbs ?? structuredData?.breadcrumbs)?.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) } } : {})
    });
  }

  private setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    if (!content) {
      this.meta.removeTag(`${attribute}="${name}"`);
      return;
    }
    this.meta.updateTag({ [attribute]: name, content }, `${attribute}="${name}"`);
  }
}
