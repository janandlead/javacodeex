import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { createTutorialFallback, normalizeTutorialHeadings } from '../shared/tutorial-fallback';
import { appendFurtherReading } from '../../shared/tutorial-further-reading';

@Component({
  selector: 'app-java-document', standalone: true, imports: [RouterLink],
  encapsulation: ViewEncapsulation.None,
  template: `<article class="container-xl legacy-document">@if (loading) { <div class="document-state">Loading documentation…</div> } @if (error) { <div class="document-state error">Unable to load this Java document.</div> } <div class="document-body" [innerHTML]="html"></div><p class="pager-heading">Continue learning</p><nav class="course-pager" aria-label="Java tutorial navigation">@if (previousRoute) { <a class="pager-link previous" [routerLink]="previousRoute"><span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span><strong>{{ previousLabel }}</strong></a> } @else { <span></span> } @if (nextRoute) { <a class="pager-link next" [routerLink]="nextRoute"><span class="pager-direction">Next <i class="bi bi-arrow-right"></i></span><strong>{{ nextLabel }}</strong></a> }</nav></article>`,
  styles: [`.legacy-document{width:min(100% - 2rem,82.5rem);max-width:82.5rem;padding:1.5rem 0 4rem}.document-body{width:100%;max-width:none;margin:1rem auto 0}.document-body :where(.page-hero,.hero){width:min(100%,68.75rem);margin:0 auto 1.5rem;padding:2rem 2.5rem;background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.18),transparent 28%),linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff;border-radius:1rem;box-shadow:0 .75rem 2rem rgba(15,23,42,.12)}.document-body :where(.page-hero,.hero) .container-xl{width:100%;max-width:none;padding:0}.document-body :where(.page-hero,.hero) h1{margin-bottom:.5rem;color:#fff;font-size:clamp(1.75rem,3.5vw,2.75rem)}.document-body :where(.page-hero,.hero) p{color:#dbeafe!important;font-size:.95rem;line-height:1.6}.document-body :where(.content-wrapper,.container-xl){width:100%;max-width:none;margin-inline:auto}.document-body > .container-xl{padding-inline:0}.document-body .row{--bs-gutter-x:1.5rem}.document-body .row > [class*="col-lg-8"]{flex:0 0 100%;max-width:100%}.document-body .content-wrapper{flex:0 0 100%;max-width:100%;padding:2rem clamp(1rem,3vw,3rem);border:1px solid #e2e8f0;border-radius:1.25rem;background:#fff;box-shadow:0 .75rem 2rem rgba(15,23,42,.06)}.document-body h2{margin-top:2.75rem;margin-bottom:1rem;color:#1e3a8a;font-size:clamp(1.5rem,2.5vw,2.15rem);border-left:4px solid #06b6d4;padding-left:.85rem}.document-body h2:first-child{margin-top:0}.document-body h3{margin-top:2rem;margin-bottom:.75rem;color:#1e3a8a;font-size:1.3rem}.document-body p,.document-body li{color:#334155;line-height:1.8}.document-body .topic-guide{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:0 auto 2rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:linear-gradient(135deg,#eff6ff,#ecfeff)}.document-body .topic-guide-step{display:grid;grid-template-columns:auto 1fr;column-gap:.65rem;align-items:center}.document-body .topic-guide-step span{grid-row:span 2;color:#0891b2;font-size:1.5rem;font-weight:800}.document-body .topic-guide-step strong{color:#1e3a8a}.document-body .topic-guide-step small{color:#64748b}.document-body .topic-guide-summary{grid-column:1/-1;margin:.75rem 0 0;padding-top:.75rem;border-top:1px solid #bae6fd;color:#475569}.document-body .note-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #f59e0b;border-radius:.5rem;background:#fffbeb}.document-body .note-box p{margin:0}.document-body .table-responsive{margin:1.5rem 0}.document-body table{font-size:.95rem}.document-body th{color:#1e3a8a;background:#eff6ff}.document-body pre{margin:1.5rem 0;overflow:auto;padding:1.25rem;border:1px solid #1e293b;border-radius:.75rem;background:#0f172a;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9rem;line-height:1.7}.document-body code.inline{padding:.15rem .35rem;border-radius:.3rem;color:#be123c;background:#fff1f2;font-size:.9em}.document-body .output-box{margin:1rem 0;padding:1rem 1.25rem;border-left:4px solid #22c55e;border-radius:.5rem;background:#f0fdf4;color:#166534;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.document-body .feature-card{height:100%;padding:1.25rem;border:1px solid #e2e8f0;border-radius:.9rem;background:#f8fafc}.document-body .feature-icon{margin-bottom:.5rem;font-size:1.75rem}.document-body .concept-diagram,.document-body .learning-flow{padding:1.25rem;border:1px solid #dbeafe;border-radius:1rem;background:#f8fbff}.document-body .diagram-row,.document-body .learning-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.75rem}.document-body .diagram-node,.document-body .flow-step{min-width:8rem;padding:.8rem;border:1px solid #bae6fd;border-radius:.65rem;text-align:center;background:#fff}.document-body .diagram-node small,.document-body .flow-step small{display:block;color:#64748b;font-size:.8rem}.document-body .diagram-arrow,.document-body .flow-arrow{color:#0891b2;font-size:1.5rem;font-weight:800}.document-body img{max-width:100%;height:auto}.document-body a{color:#1d4ed8}.document-state{padding:4rem 0;text-align:center;color:#64748b}.error{color:#b91c1c}@media(max-width:767.98px){.legacy-document{width:min(100% - 1rem,82.5rem)}.document-body :where(.page-hero,.hero){padding:1.5rem}.document-body .content-wrapper{padding:1.25rem}.document-body .topic-guide{grid-template-columns:1fr}.document-body .topic-guide-summary{grid-column:auto}.document-body .diagram-arrow,.document-body .flow-arrow{transform:rotate(90deg)}}`]
})
export class JavaDocumentComponent implements OnInit, OnChanges {
  @Input({ required: true }) fileName = '';
  @Input() title = 'Java Documentation';
  @Input() description = '';
  @Input() primaryKeyword = '';
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
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    const documentFile = this.topic ? `${this.topic}.html` : this.fileName;
    this.html = createTutorialFallback(this.title, this.description, 'Java', this.primaryKeyword);
    this.http.get(`/docs/java/${documentFile}`, { responseType: 'text' }).subscribe({
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
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('.document-body a[href]');
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

  private extractDocument(source: string): string {
    const document = this.document.implementation.createHTMLDocument('java-document');
    document.documentElement.innerHTML = source.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
    const pageHero = document.querySelector('.page-hero');
    const contentContainer = document.querySelector('.container-xl.py-5');
    if (pageHero) {
      const heading = pageHero.querySelector('h1');
      const description = pageHero.querySelector('p');
      if (this.fileName === 'index.html') {
        const titleBlock = document.createElement('header');
        titleBlock.className = 'document-title mb-4';
        if (heading?.textContent?.trim()) {
          const pageHeading = document.createElement('h1');
          pageHeading.textContent = heading.textContent.trim();
          titleBlock.appendChild(pageHeading);
        }
        const heroParagraphs = Array.from(pageHero.querySelectorAll('p'))
          .map((paragraph) => paragraph.textContent?.trim())
          .filter((text): text is string => Boolean(text));
        if (heroParagraphs.length) {
          const summary = document.createElement('p');
          summary.textContent = heroParagraphs.join(' ');
          titleBlock.appendChild(summary);
        }
        contentContainer?.prepend(titleBlock);
      } else {
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
      }
      pageHero.remove();
    }
    document.querySelectorAll('.topic-guide').forEach((guide) => guide.remove());
    document.querySelectorAll('title, script, style, link, header, nav, footer, .java-subnav, .site-footer, .d-flex.justify-content-between').forEach((element) => element.remove());
    document.querySelectorAll('.toc').forEach((toc) => toc.closest('[class*="col-lg-4"]')?.remove() ?? toc.remove());
    normalizeTutorialHeadings(document);
    if (this.fileName === 'index.html') {
      document.querySelectorAll('.section-card[id] ul.list-group').forEach((list) => list.remove());
    } else if (contentContainer) {
      const contentWrapper = contentContainer.querySelector<HTMLElement>('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.classList.add('java-article-wrapper');
        let sectionCard: HTMLElement | undefined;
        Array.from(contentWrapper.children).forEach((child) => {
          if (child.tagName === 'H2') {
            sectionCard = document.createElement('section');
            sectionCard.className = 'section-card';
            contentWrapper.insertBefore(sectionCard, child);
          }
          sectionCard?.appendChild(child);
        });
      }
    }
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href') ?? '';
      const target = href.split('#')[0].split('?')[0];
      const section = href.includes('#') ? href.split('#')[1].split('?')[0] : '';
      if (target.endsWith('.html')) {
        const route = target.replace(/^https?:\/\/(?:www\.)?javacodeex\.(?:com|in)/i, '').replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/\.html$/, '').replace(/^\/java\//, '');
        const routePath = route === 'index' ? '/java-tutorial-overview' : `/java-${route}`;
        anchor.setAttribute('href', `${routePath}${section ? `/${section}` : ''}`);
      } else if (target === '../index.html' || target === './index.html') {
        anchor.setAttribute('href', `/java-tutorial-overview${section ? `/${section}` : ''}`);
      } else if (href.startsWith('#')) {
        const currentPath = this.router.url.split(/[?#]/)[0].replace(/\/$/, '');
        anchor.setAttribute('href', `${currentPath}/${section}`);
      }
    });
    document.querySelectorAll('img[src]').forEach((image) => {
      const sourcePath = image.getAttribute('src') ?? '';
      if (sourcePath.includes('javacodeex')) image.setAttribute('src', '/favicon.ico');
      if (!image.getAttribute('alt')?.trim()) image.setAttribute('alt', 'Java tutorial illustration');
      if (!image.getAttribute('width')) image.setAttribute('width', '900');
      if (!image.getAttribute('height')) image.setAttribute('height', '500');
      if (!image.getAttribute('loading')) image.setAttribute('loading', sourcePath.includes('javacodeex') ? 'eager' : 'lazy');
    });
    appendFurtherReading(
      document,
      this.fileName === 'index.html' ? 'java-index' : this.topic || this.fileName.replace(/\.html$/, ''),
      [
        ...(this.previousRoute ? [{ label: this.previousLabel, href: this.previousRoute }] : []),
        ...(this.nextRoute ? [{ label: this.nextLabel, href: this.nextRoute }] : [])
      ],
      { label: 'Java Tutorial Overview', href: '/java-tutorial-overview' },
      this.router.url.split(/[?#]/)[0].replace(/\/$/, '')
    );
    return document.body.innerHTML;
  }
}
