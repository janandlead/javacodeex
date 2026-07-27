import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ComponentRef, ElementRef, EnvironmentInjector, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, createComponent, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { createTutorialFallback, normalizeTutorialHeadings } from '../shared/tutorial-fallback';
import { appendFurtherReading } from '../../shared/tutorial-further-reading';
import { YoutubeVideoComponent } from '../../shared/components/youtube-video/youtube-video.component';

const DOCUMENT_VIDEOS: Record<string, { url: string; title: string }> = {
  'migration-2-to-3.html': {
    url: 'https://youtu.be/0eKF-mkZYXo?si=8q1ltC9mliMGKA1I',
    title: 'Spring Boot 2 to Spring Boot 3 Migration Tutorial'
  },
  'exception-handling.html': {
    url: 'https://youtu.be/vz7blft_eik?si=MMMHz-lhYHuZGR8f',
    title: 'Spring Boot Global Exception Handling Tutorial'
  },
  'profiles.html': {
    url: 'https://youtu.be/RT9lzRBHxQ4?si=KI47dgfqfaiC9RVt',
    title: 'Spring Boot Profiles Tutorial'
  },
  'scheduler.html': {
    url: 'https://youtu.be/81Gd8-zaKIg?si=q55pdz-NBmZm94I0',
    title: 'Spring Boot Scheduler Tutorial'
  },
  'security-comprehensive.html': {
    url: 'https://youtu.be/4ZqgBb-ck2Y?si=r51DcJcgOvQftiBE',
    title: 'Spring Boot Security 6 Authentication and Authorization Tutorial'
  },
  'rest-api.html': {
    url: 'https://youtu.be/7MCAMleg8Mw?si=y6lE5F8fYeKUZa5y',
    title: 'Spring Boot REST API Tutorial'
  },
  'actuator.html': {
    url: 'https://youtu.be/HoOPYBcq7GQ?si=KDJHRL0bXRyqv8DV',
    title: 'Spring Boot Actuator Tutorial'
  },
  'aop.html': {
    url: 'https://youtu.be/ihwBZUYrHuU?si=URxOBqwwO5YvtCbw',
    title: 'Spring Boot AOP Tutorial'
  }
};

const SPRING_BOOT_LEGACY_ROUTES: Record<string, string> = {
  index: '/spring-boot-overview',
  introduction: '/spring-boot-core',
  setup: '/spring-boot/setup',
  'project-structure': '/project-structure',
  aop: '/spring-boot-aop',
  'data-jpa': '/spring-boot-data-jpa',
  'security-comprehensive': '/spring-boot-security',
  'exception-handling': '/spring-boot-global-exception-handling',
  profiles: '/spring-boot-profiles',
  scheduler: '/spring-boot-scheduler',
  'rest-api': '/spring-boot-rest-api',
  'rest-api-design': '/spring-boot-rest-api-design',
  validation: '/spring-boot-validation',
  testing: '/spring-boot-testing',
  'testing-comprehensive': '/spring-boot/testing-comprehensive',
  actuator: '/spring-boot-actuator',
  deployment: '/spring-boot-deployment',
  'migration-2-to-3': '/spring-boot-2-to-3-migration',
  'dependency-injection': '/spring-boot-core'
};

const POSTGRESQL_LESSONS = [
  ['/postgresql/introduction', 'PostgreSQL Introduction'],
  ['/postgresql/installation', 'PostgreSQL Installation'],
  ['/postgresql/pgadmin4', 'PostgreSQL pgAdmin 4'],
  ['/postgresql/create-table', 'PostgreSQL Create Table'],
  ['/postgresql/insert-data', 'PostgreSQL Insert Data'],
  ['/postgresql/fetch-data', 'PostgreSQL Select Data'],
  ['/postgresql/add-column', 'PostgreSQL ADD COLUMN'],
  ['/postgresql/update-data', 'PostgreSQL UPDATE'],
  ['/postgresql/alter-column', 'PostgreSQL ALTER COLUMN'],
  ['/postgresql/drop-column', 'PostgreSQL DROP COLUMN'],
  ['/postgresql/delete-data', 'PostgreSQL DELETE'],
  ['/postgresql/drop-table', 'PostgreSQL DROP TABLE'],
  ['/postgresql/operators', 'PostgreSQL Operators'],
  ['/postgresql/select', 'PostgreSQL SELECT'],
  ['/postgresql/select-distinct', 'PostgreSQL SELECT DISTINCT'],
  ['/postgresql/where', 'PostgreSQL WHERE'],
  ['/postgresql/order-by', 'PostgreSQL ORDER BY'],
  ['/postgresql/limit', 'PostgreSQL LIMIT'],
  ['/postgresql/min-max', 'PostgreSQL MIN and MAX'],
  ['/postgresql/count', 'PostgreSQL COUNT'],
  ['/postgresql/sum', 'PostgreSQL SUM'],
  ['/postgresql/avg', 'PostgreSQL AVG'],
  ['/postgresql/like', 'PostgreSQL LIKE'],
  ['/postgresql/in', 'PostgreSQL IN'],
  ['/postgresql/between', 'PostgreSQL BETWEEN'],
  ['/postgresql/as', 'PostgreSQL AS'],
  ['/postgresql/joins', 'PostgreSQL Joins'],
  ['/postgresql/inner-join', 'PostgreSQL INNER JOIN'],
  ['/postgresql/left-join', 'PostgreSQL LEFT JOIN'],
  ['/postgresql/right-join', 'PostgreSQL RIGHT JOIN'],
  ['/postgresql/full-join', 'PostgreSQL FULL JOIN'],
  ['/postgresql/cross-join', 'PostgreSQL CROSS JOIN'],
  ['/postgresql/union', 'PostgreSQL UNION'],
  ['/postgresql/group-by', 'PostgreSQL GROUP BY'],
  ['/postgresql/having', 'PostgreSQL HAVING'],
  ['/postgresql/exists', 'PostgreSQL EXISTS'],
  ['/postgresql/any', 'PostgreSQL ANY'],
  ['/postgresql/all', 'PostgreSQL ALL'],
  ['/postgresql/case', 'PostgreSQL CASE']
] as const;

const MYSQL_LESSONS = [
  ['/mysql/sql', 'MySQL SQL'], ['/mysql/select', 'MySQL SELECT'], ['/mysql/select-distinct', 'MySQL SELECT DISTINCT'], ['/mysql/where', 'MySQL WHERE'], ['/mysql/order-by', 'MySQL ORDER BY'], ['/mysql/and', 'MySQL AND'], ['/mysql/or', 'MySQL OR'], ['/mysql/not', 'MySQL NOT'], ['/mysql/insert-into', 'MySQL INSERT INTO'], ['/mysql/null-values', 'MySQL NULL Values'], ['/mysql/update', 'MySQL UPDATE'], ['/mysql/delete', 'MySQL DELETE'], ['/mysql/limit', 'MySQL LIMIT'], ['/mysql/aggregate-functions', 'MySQL Aggregate Functions'], ['/mysql/min', 'MySQL MIN()'], ['/mysql/max', 'MySQL MAX()'], ['/mysql/count', 'MySQL COUNT()'], ['/mysql/sum', 'MySQL SUM()'], ['/mysql/avg', 'MySQL AVG()'], ['/mysql/like', 'MySQL LIKE'], ['/mysql/wildcards', 'MySQL Wildcards'], ['/mysql/in', 'MySQL IN'], ['/mysql/between', 'MySQL BETWEEN'], ['/mysql/aliases', 'MySQL Aliases'], ['/mysql/joins', 'MySQL Joins'], ['/mysql/inner-join', 'MySQL INNER JOIN'], ['/mysql/left-join', 'MySQL LEFT JOIN'], ['/mysql/right-join', 'MySQL RIGHT JOIN'], ['/mysql/cross-join', 'MySQL CROSS JOIN'], ['/mysql/self-join', 'MySQL Self Join'], ['/mysql/union', 'MySQL UNION'], ['/mysql/union-all', 'MySQL UNION ALL'], ['/mysql/group-by', 'MySQL GROUP BY'], ['/mysql/having', 'MySQL HAVING'], ['/mysql/exists', 'MySQL EXISTS'], ['/mysql/any', 'MySQL ANY'], ['/mysql/all', 'MySQL ALL'], ['/mysql/insert-select', 'MySQL INSERT SELECT'], ['/mysql/case', 'MySQL CASE'], ['/mysql/null-functions', 'MySQL Null Functions'], ['/mysql/stored-procedures', 'MySQL Stored Procedures'], ['/mysql/comments', 'MySQL Comments'], ['/mysql/operators', 'MySQL Operators'], ['/mysql/create-db', 'MySQL Create DB'], ['/mysql/drop-db', 'MySQL Drop DB'], ['/mysql/create-table', 'MySQL Create Table'], ['/mysql/drop-table', 'MySQL Drop Table'], ['/mysql/alter-table', 'MySQL Alter Table'], ['/mysql/constraints', 'MySQL Constraints'], ['/mysql/not-null', 'MySQL Not Null'], ['/mysql/unique', 'MySQL Unique'], ['/mysql/primary-key', 'MySQL Primary Key'], ['/mysql/foreign-key', 'MySQL Foreign Key'], ['/mysql/check', 'MySQL Check'], ['/mysql/default', 'MySQL Default'], ['/mysql/create-index', 'MySQL Create Index'], ['/mysql/auto-increment', 'MySQL Auto Increment'], ['/mysql/dates', 'MySQL Dates'], ['/mysql/views', 'MySQL Views'], ['/mysql/injection', 'MySQL Injection'], ['/mysql/prepared-statements', 'MySQL Prepared Statements']
] as const;

@Component({
  selector: 'app-course-document', standalone: true, imports: [RouterLink, YoutubeVideoComponent],
  encapsulation: ViewEncapsulation.None,
  template: `<article class="container-xl course-document">@if (loading) { <div class="document-state">Loading documentation…</div> } @if (error) { <div class="document-state error">Unable to load this document.</div> } @if (video) { <app-youtube-video [videoUrl]="video.url" [title]="video.title" /> } <div class="document-body" [innerHTML]="html"></div><p class="pager-heading">Continue learning</p><nav class="course-pager" aria-label="Course tutorial navigation">@if (previousRoute) { <a class="pager-link previous" [routerLink]="previousRoute"><span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span><strong>{{ previousLabel }}</strong></a> } @else { <span></span> } @if (nextRoute) { <a class="pager-link next" [routerLink]="nextRoute"><span class="pager-direction">Next <i class="bi bi-arrow-right"></i></span><strong>{{ nextLabel }}</strong></a> }</nav></article>`,
  styles: [`.course-document{width:min(100% - 2rem,82.5rem);max-width:82.5rem;padding:1.5rem 0 4rem}.document-body{width:100%;max-width:none;margin:1rem auto 0}.document-body > .container-xl{width:100%;max-width:none;padding:2rem clamp(1rem,3vw,3rem);border:1px solid #e2e8f0;border-radius:1.25rem;background:#fff;box-shadow:0 .75rem 2rem rgba(15,23,42,.06)}.document-body :where(.page-hero,.hero){margin:0 0 2rem;padding:clamp(2.5rem,6vw,5rem) clamp(1.25rem,4vw,4rem);background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.18),transparent 28%),linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff;border-radius:1.25rem;box-shadow:0 1rem 2.5rem rgba(15,23,42,.14)}.document-body :where(.page-hero,.hero) h1,.document-body > .container-xl > h1{color:#fff}.document-body > .container-xl > h1{margin:0 0 2rem;padding:clamp(2.5rem,6vw,3.5rem) clamp(1.25rem,4vw,4rem);border-radius:1.25rem;background:linear-gradient(135deg,#0b1220,#172554 62%,#164e63);font-size:clamp(2rem,4vw,3.5rem)}.document-body h2{margin-top:2.75rem;margin-bottom:1rem;color:#1e3a8a;font-size:clamp(1.5rem,2.5vw,2.15rem);border-left:4px solid #06b6d4;padding-left:.85rem}.document-body h2:first-child{margin-top:0}.document-body h3{margin-top:2rem;color:#1e3a8a;font-size:1.3rem}.document-body p,.document-body li{color:#334155;line-height:1.8}.document-body .spring-callout,.document-body .note-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#eff6ff}.document-body .table-responsive{margin:1.5rem 0}.document-body table{font-size:.95rem}.document-body th{color:#1e3a8a;background:#eff6ff}.document-body pre,.document-body pre.spring-code{margin:1.5rem 0;overflow:auto;padding:1.25rem;border:1px solid #1e293b;border-radius:.75rem;background:#0f172a;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9rem;line-height:1.7}.document-body code{color:#be123c}.document-body pre code{color:inherit}.document-body .concept-diagram,.document-body .learning-flow{margin:1.5rem 0;padding:1.25rem;border:1px solid #dbeafe;border-radius:1rem;background:#f8fbff}.document-body .diagram-row,.document-body .learning-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.75rem}.document-body .diagram-node,.document-body .flowchart-node,.document-body .flow-step{min-width:8rem;padding:.8rem;border:1px solid #bae6fd;border-radius:.65rem;text-align:center;background:#fff}.document-body .diagram-node small,.document-body .flow-step small{display:block;color:#64748b;font-size:.8rem}.document-body .diagram-arrow,.document-body .flow-arrow{color:#0891b2;font-size:1.5rem;font-weight:800}.document-body img{max-width:100%;height:auto}.document-body .migration-visual-wide{width:100%;margin:1.5rem 0}.document-body .migration-visual-wide img{display:block;width:100%;max-width:none;height:auto}.document-body .migration-visual figcaption{margin-top:.6rem;color:#64748b;font-size:.9rem;text-align:center}.document-body a{color:#1d4ed8}.document-state{padding:4rem 0;text-align:center;color:#64748b}.error{color:#b91c1c}@media(max-width:767.98px){.course-document{width:min(100% - 1rem,82.5rem)}.document-body > .container-xl{padding:1.25rem}.document-body .diagram-arrow,.document-body .flow-arrow{transform:rotate(90deg)}}`]
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
  get video(): { url: string; title: string } | undefined {
    return DOCUMENT_VIDEOS[this.topic ? `${this.topic}.html` : this.fileName];
  }
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private videoRef?: ComponentRef<YoutubeVideoComponent>;

  ngOnInit(): void {
    if (this.assetFolder === 'springboot' && this.fileName === 'index.html' && !this.nextRoute) {
      this.nextRoute = '/spring-boot-core';
      this.nextLabel = 'Spring Boot Core';
    }
    this.setPostgreSqlNavigation();
    this.setMySqlNavigation();
    this.loadDocument();
  }

  private loadDocument(): void {
    const documentFile = this.topic ? `${this.topic}.html` : this.fileName;
    this.html = createTutorialFallback(this.title, this.description, this.category, this.primaryKeyword);
    this.loading = true;
    this.error = false;
    this.http.get(`/docs/${this.assetFolder}/${documentFile}`, { responseType: 'text' }).subscribe({
      next: (source) => { this.html = this.extractDocument(source); this.loading = false; setTimeout(() => { this.renderVideoComponent(); this.scrollToSection(); }, 0); },
      error: () => { this.loading = false; this.error = false; }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['fileName'] || changes['topic'] || changes['assetFolder']) && !changes['fileName']?.firstChange && !changes['topic']?.firstChange) {
      this.setPostgreSqlNavigation();
      this.setMySqlNavigation();
      this.resetVideoComponent();
      this.loadDocument();
      return;
    }
    if (changes['section'] && !changes['section'].firstChange && !this.loading) {
      setTimeout(() => this.scrollToSection(), 0);
    }
  }

  private setPostgreSqlNavigation(): void {
    if (this.assetFolder !== 'postgresql') return;
    const path = this.router.url.split(/[?#]/)[0].replace(/\/$/, '');
    const index = POSTGRESQL_LESSONS.findIndex(([route]) => route === path);
    if (index < 0) return;
    const previous = POSTGRESQL_LESSONS[index - 1];
    const next = POSTGRESQL_LESSONS[index + 1];
    this.backRoute = '/postgresql/introduction';
    this.previousRoute = previous?.[0] ?? '';
    this.previousLabel = previous?.[1] ?? 'PostgreSQL Tutorials';
    this.nextRoute = next?.[0] ?? '';
    this.nextLabel = next?.[1] ?? '';
  }

  private setMySqlNavigation(): void {
    if (this.assetFolder !== 'mysql') return;
    const path = this.router.url.split(/[?#]/)[0].replace(/\/$/, '');
    const index = MYSQL_LESSONS.findIndex(([route]) => route === path);
    if (index < 0) return;
    const previous = MYSQL_LESSONS[index - 1];
    const next = MYSQL_LESSONS[index + 1];
    this.backRoute = '/mysql';
    this.previousRoute = previous?.[0] ?? '/mysql';
    this.previousLabel = previous?.[1] ?? 'MySQL';
    this.nextRoute = next?.[0] ?? '';
    this.nextLabel = next?.[1] ?? '';
  }

  private resetVideoComponent(): void {
    if (this.videoRef) {
      this.applicationRef.detachView(this.videoRef.hostView);
      this.videoRef.destroy();
      this.videoRef = undefined;
    }
    this.host.nativeElement.querySelector('.course-document-video')?.remove();
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

  private renderVideoComponent(): void {
    const video = this.video;
    if (!video || this.videoRef) return;
    const root = this.host.nativeElement;
    const body = root.querySelector('.document-body') as HTMLElement | null;
    if (!body) return;
    root.querySelector('app-youtube-video')?.remove();
    const host = this.document.createElement('div');
    host.className = 'course-document-video';
    const titleBlock = body.querySelector('.document-title') as HTMLElement | null;
    if (titleBlock) titleBlock.insertAdjacentElement('afterend', host);
    else body.prepend(host);
    this.videoRef = createComponent(YoutubeVideoComponent, { environmentInjector: this.environmentInjector, hostElement: host });
    this.applicationRef.attachView(this.videoRef.hostView);
    this.videoRef.setInput('videoUrl', video.url);
    this.videoRef.setInput('title', video.title);
    this.videoRef.changeDetectorRef.detectChanges();
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
      link.href = `${basePath}#${id}`;
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
    if (this.assetFolder === 'springboot' && this.fileName === 'index.html') {
      document.querySelectorAll('.section-card ul.list-group, .spring-topic-nav, .spring-subtopic-nav').forEach((element) => element.remove());
    }
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href') ?? '';
      let target = href.split('#')[0].split('?')[0];
      let section = href.includes('#') ? href.split('#')[1].split('?')[0] : '';
      const isSameSiteAbsolute = target.startsWith('https://javacodeex.com/') || target.startsWith('http://localhost:4200/');
      if (isSameSiteAbsolute) target = target.replace(/^https?:\/\/[^/]+/, '');
      if (target.endsWith('.html')) {
        const route = target.split('/').pop()!.replace(/\.html$/, '');
        const isSpringBootDocument = this.assetFolder === 'springboot' && (target.startsWith('/springboot/') || target.startsWith('./'));
        const routePath = isSpringBootDocument
          ? SPRING_BOOT_LEGACY_ROUTES[route] ?? `${this.backRoute}${route === 'index' ? '' : `/${route}`}`
          : route === 'testing' ? '/spring-boot-testing' : `${this.backRoute}${route === 'index' ? '' : `/${route}`}`;
        if (isSpringBootDocument && route === 'dependency-injection' && !section) section = 'dependency-injection';
        anchor.setAttribute('href', `${routePath}${section ? `#${section}` : ''}`);
      } else if (href.startsWith('#')) {
        const currentPath = this.router.url.split(/[?#]/)[0].replace(/\/$/, '');
        anchor.setAttribute('href', `${currentPath}#${section}`);
      }
    });
    const readingPageKey = this.assetFolder === 'postgresql'
      ? `postgresql-${this.topic || this.fileName.replace(/\.html$/, '')}`
      : this.assetFolder === 'mysql'
        ? `mysql-${this.topic || this.fileName.replace(/\.html$/, '')}`
      : this.assetFolder === 'springboot' && this.fileName === 'index.html' ? 'springboot-index' : this.topic || this.fileName.replace(/\.html$/, '');
    appendFurtherReading(
      document,
      readingPageKey,
      [
        ...(this.previousRoute ? [{ label: this.previousLabel, href: this.previousRoute }] : []),
        ...(this.nextRoute ? [{ label: this.nextLabel, href: this.nextRoute }] : [])
      ],
      this.assetFolder === 'postgresql'
        ? { label: 'PostgreSQL Introduction', href: '/postgresql/introduction' }
        : this.assetFolder === 'mysql'
          ? { label: 'MySQL Tutorials', href: '/mysql' }
          : { label: 'Spring Boot Tutorial Overview', href: '/spring-boot-overview' }
    );
    return document.body.innerHTML;
  }
}
