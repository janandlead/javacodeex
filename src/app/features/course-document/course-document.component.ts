import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { createTutorialFallback, normalizeTutorialHeadings } from '../shared/tutorial-fallback';

@Component({
  selector: 'app-course-document', standalone: true, imports: [BreadcrumbComponent, RouterLink],
  encapsulation: ViewEncapsulation.None,
  template: `<article class="container-xl course-document"><app-breadcrumb [items]="[{ label: category, route: backRoute }, { label: title }]" />@if (loading) { <div class="document-state">Loading documentation…</div> } @if (error) { <div class="document-state error">Unable to load this document.</div> } <div class="document-body" [innerHTML]="html"></div><p class="pager-heading">Continue learning</p><nav class="course-pager" aria-label="Course tutorial navigation">@if (previousRoute) { <a class="pager-link previous" [routerLink]="previousRoute"><span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span><strong>{{ previousLabel }}</strong></a> } @else { <span></span> } @if (nextRoute) { <a class="pager-link next" [routerLink]="nextRoute"><span class="pager-direction">Next <i class="bi bi-arrow-right"></i></span><strong>{{ nextLabel }}</strong></a> }</nav></article>`,
  styles: [`.course-document{width:min(100% - 2rem,82.5rem);max-width:82.5rem;padding:1.5rem 0 4rem}.document-body{width:100%;max-width:none;margin:1rem auto 0}.document-body > .container-xl{width:100%;max-width:none;padding:2rem clamp(1rem,3vw,3rem);border:1px solid #e2e8f0;border-radius:1.25rem;background:#fff;box-shadow:0 .75rem 2rem rgba(15,23,42,.06)}.document-body :where(.page-hero,.hero){margin:0 0 2rem;padding:clamp(2.5rem,6vw,5rem) clamp(1.25rem,4vw,4rem);background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.18),transparent 28%),linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff;border-radius:1.25rem;box-shadow:0 1rem 2.5rem rgba(15,23,42,.14)}.document-body :where(.page-hero,.hero) h1,.document-body > .container-xl > h1{color:#fff}.document-body > .container-xl > h1{margin:0 0 2rem;padding:clamp(2.5rem,6vw,3.5rem) clamp(1.25rem,4vw,4rem);border-radius:1.25rem;background:linear-gradient(135deg,#0b1220,#172554 62%,#164e63);font-size:clamp(2rem,4vw,3.5rem)}.document-body h2{margin-top:2.75rem;margin-bottom:1rem;color:#1e3a8a;font-size:clamp(1.5rem,2.5vw,2.15rem);border-left:4px solid #06b6d4;padding-left:.85rem}.document-body h2:first-child{margin-top:0}.document-body h3{margin-top:2rem;color:#1e3a8a;font-size:1.3rem}.document-body p,.document-body li{color:#334155;line-height:1.8}.document-body .spring-callout,.document-body .note-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#eff6ff}.document-body .table-responsive{margin:1.5rem 0}.document-body table{font-size:.95rem}.document-body th{color:#1e3a8a;background:#eff6ff}.document-body pre,.document-body pre.spring-code{margin:1.5rem 0;overflow:auto;padding:1.25rem;border:1px solid #1e293b;border-radius:.75rem;background:#0f172a;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9rem;line-height:1.7}.document-body code{color:#be123c}.document-body pre code{color:inherit}.document-body .concept-diagram,.document-body .learning-flow{margin:1.5rem 0;padding:1.25rem;border:1px solid #dbeafe;border-radius:1rem;background:#f8fbff}.document-body .diagram-row,.document-body .learning-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.75rem}.document-body .diagram-node,.document-body .flowchart-node,.document-body .flow-step{min-width:8rem;padding:.8rem;border:1px solid #bae6fd;border-radius:.65rem;text-align:center;background:#fff}.document-body .diagram-node small,.document-body .flow-step small{display:block;color:#64748b;font-size:.8rem}.document-body .diagram-arrow,.document-body .flow-arrow{color:#0891b2;font-size:1.5rem;font-weight:800}.document-body img{max-width:100%;height:auto}.document-body a{color:#1d4ed8}.document-state{padding:4rem 0;text-align:center;color:#64748b}.error{color:#b91c1c}@media(max-width:767.98px){.course-document{width:min(100% - 1rem,82.5rem)}.document-body > .container-xl{padding:1.25rem}.document-body .diagram-arrow,.document-body .flow-arrow{transform:rotate(90deg)}}`]
})
export class CourseDocumentComponent implements OnInit, OnChanges {
  @Input({ required: true }) fileName = '';
  @Input() title = 'Course Documentation';
  @Input() category = 'Course';
  @Input() description = '';
  @Input() primaryKeyword = '';
  @Input() backRoute = '/';
  @Input() assetFolder = 'springboot';
  @Input() previousRoute = '';
  @Input() previousLabel = '';
  @Input() nextRoute = '';
  @Input() nextLabel = '';
  @Input() topic = '';
  @Input() section = '';
  html = '';
  loading = true;
  error = false;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    const documentFile = this.topic ? `${this.topic}.html` : this.fileName;
    this.html = createTutorialFallback(this.title, this.description, this.category, this.primaryKeyword);
    this.http.get(`/docs/${this.assetFolder}/${documentFile}`, { responseType: 'text' }).subscribe({
      next: (source) => { this.html = this.extractDocument(source); this.loading = false; setTimeout(() => this.scrollToSection(), 0); },
      error: () => { this.loading = false; this.error = false; }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['section'] && !changes['section'].firstChange && !this.loading) {
      setTimeout(() => this.scrollToSection(), 0);
    }
  }

  @HostListener('click', ['$event'])
  handleDocumentLink(event: MouseEvent): void {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('.document-body a[href], .document-toc a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href') ?? '';
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    let url: URL;
    try {
      url = new URL(href, window.location.origin);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    const targetUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (targetUrl === currentUrl || (url.pathname === window.location.pathname && url.search === window.location.search)) {
      window.history.pushState({}, '', targetUrl);
      this.scrollToSection();
      return;
    }
    void this.router.navigateByUrl(targetUrl).then(() => setTimeout(() => this.scrollToSection(), 0));
  }

  private scrollToSection(): void {
    const fragment = window.location.hash.slice(1).split('?')[0];
    const section = this.section || fragment;
    if (!section) return;
    const target = document.getElementById(decodeURIComponent(section));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private renderPageToc(): void {
    if (this.assetFolder !== 'springboot') return;
    const root = this.host.nativeElement as HTMLElement;
    const body = root.querySelector('.document-body') as HTMLElement | null;
    if (!body || body.parentElement?.classList.contains('document-layout')) return;

    const pageTopic = this.topic || this.fileName.replace(/\.html$/, '');
    const sidebarSectionsByPage: Record<string, readonly string[]> = {
      introduction: ['What is Spring Boot?', 'Spring vs Spring Boot', 'Auto-Configuration', 'Starters', 'Dependency Injection', 'Component Scanning', 'Autowiring', 'Bean Scopes', 'Bean Life Cycle', 'Configuration Properties', 'Profiles', 'Conditional Beans', 'Common Spring Boot Annotations Explained'],
      setup: ['Create a project with Spring Initializr', 'Creating Your First Project - Step by Step', 'Project Structure Explained', 'Development Tips', 'Troubleshooting']
    };
    const sidebarSections = new Set(sidebarSectionsByPage[pageTopic] ?? []);
    const headings = (Array.from(body.querySelectorAll('h2')) as HTMLElement[])
      .filter((heading) => sidebarSections.has(heading.textContent?.trim() ?? ''));
    if (!headings.length) return;
    const basePath = this.topic ? `/spring-boot/${this.topic}` : this.router.url.split(/[?#]/)[0].replace(/\/$/, '');
    const toc = document.createElement('aside');
    toc.className = 'document-toc';
    toc.setAttribute('aria-label', 'On this page');
    const label = document.createElement('p');
    label.textContent = 'On this page';
    toc.appendChild(label);

    const usedIds = new Set<string>();
    headings.forEach((heading) => {
      const id = heading.id || this.createHeadingId(heading.textContent ?? '', usedIds);
      heading.id = id;
      usedIds.add(id);
      const link = document.createElement('a');
      link.href = `${basePath}/${id}`;
      link.textContent = heading.textContent?.trim() ?? '';
      toc.appendChild(link);
    });

    const layout = document.createElement('div');
    layout.className = 'document-layout';
    body.replaceWith(layout);
    layout.append(toc, body);
  }

  private createHeadingId(text: string, usedIds: Set<string>): string {
    const base = text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) id = `${base}-${suffix++}`;
    return id;
  }

  private extractDocument(source: string): string {
    const document = this.document.implementation.createHTMLDocument('course-document');
    document.documentElement.innerHTML = source;
    if (this.fileName !== 'index.html') {
      const pageHero = document.querySelector('.spring-hero');
      const contentContainer = document.querySelector('.container-xl.py-5');
      if (pageHero) {
        const heading = pageHero.querySelector('h1');
        const description = pageHero.querySelector('p');
        const titleBlock = document.createElement('div');
        titleBlock.className = 'document-title mb-4';
        if (heading?.textContent?.trim()) {
          const title = document.createElement('h1');
          title.textContent = heading.textContent.trim();
          titleBlock.appendChild(title);
        }
        if (description?.textContent?.trim()) {
          const summary = document.createElement('p');
          summary.textContent = description.textContent.trim();
          titleBlock.appendChild(summary);
        }
        contentContainer?.prepend(titleBlock);
        pageHero.remove();
      }
    }
    document.querySelectorAll('script, style, link, header, nav, footer, .java-subnav, .site-footer, .spring-pill, .toc, .d-flex.justify-content-between, a.btn-success').forEach((element) => element.remove());
    normalizeTutorialHeadings(document);
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href') ?? '';
      const target = href.split('#')[0].split('?')[0];
      const section = href.includes('#') ? href.split('#')[1].split('?')[0] : '';
      if (target.endsWith('.html')) {
        const route = target.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/\.html$/, '');
        const routePath = `${this.backRoute}${route === 'index' ? '' : `/${route}`}`;
        anchor.setAttribute('href', `${routePath}${section ? `/${section}` : ''}`);
      } else if (href.startsWith('#')) {
        const currentPath = this.router.url.split(/[?#]/)[0].replace(/\/$/, '');
        anchor.setAttribute('href', `${currentPath}/${section}`);
      }
    });
    return document.body.innerHTML;
  }
}
