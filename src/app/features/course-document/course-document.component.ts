import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-course-document', standalone: true, imports: [BreadcrumbComponent, RouterLink],
  encapsulation: ViewEncapsulation.None,
  template: `<article class="container-xl course-document"><app-breadcrumb [items]="[{ label: category, route: backRoute }, { label: title }]" />@if (loading) { <div class="document-state">Loading documentation…</div> } @if (error) { <div class="document-state error">Unable to load this document.</div> } <div class="document-body" [innerHTML]="html"></div><p class="pager-heading">Continue learning</p><nav class="course-pager" aria-label="Course tutorial navigation">@if (previousRoute) { <a class="pager-link previous" [routerLink]="previousRoute"><span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span><strong>{{ previousLabel }}</strong></a> } @else { <span></span> } @if (nextRoute) { <a class="pager-link next" [routerLink]="nextRoute"><span class="pager-direction">Next <i class="bi bi-arrow-right"></i></span><strong>{{ nextLabel }}</strong></a> }</nav></article>`,
  styles: [`.course-document{width:min(100% - 2rem,82.5rem);max-width:82.5rem;padding:1.5rem 0 4rem}.document-body{width:100%;max-width:none;margin:1rem auto 0}.document-body > .container-xl{width:100%;max-width:none;padding:2rem clamp(1rem,3vw,3rem);border:1px solid #e2e8f0;border-radius:1.25rem;background:#fff;box-shadow:0 .75rem 2rem rgba(15,23,42,.06)}.document-body :where(.page-hero,.hero){margin:0 0 2rem;padding:clamp(2.5rem,6vw,5rem) clamp(1.25rem,4vw,4rem);background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.18),transparent 28%),linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff;border-radius:1.25rem;box-shadow:0 1rem 2.5rem rgba(15,23,42,.14)}.document-body :where(.page-hero,.hero) h1,.document-body > .container-xl > h1{color:#fff}.document-body > .container-xl > h1{margin:0 0 2rem;padding:clamp(2.5rem,6vw,3.5rem) clamp(1.25rem,4vw,4rem);border-radius:1.25rem;background:linear-gradient(135deg,#0b1220,#172554 62%,#164e63);font-size:clamp(2rem,4vw,3.5rem)}.document-body h2{margin-top:2.75rem;margin-bottom:1rem;color:#1e3a8a;font-size:clamp(1.5rem,2.5vw,2.15rem);border-left:4px solid #06b6d4;padding-left:.85rem}.document-body h2:first-child{margin-top:0}.document-body h3{margin-top:2rem;color:#1e3a8a;font-size:1.3rem}.document-body p,.document-body li{color:#334155;line-height:1.8}.document-body .spring-callout,.document-body .note-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#eff6ff}.document-body .table-responsive{margin:1.5rem 0}.document-body table{font-size:.95rem}.document-body th{color:#1e3a8a;background:#eff6ff}.document-body pre,.document-body pre.spring-code{margin:1.5rem 0;overflow:auto;padding:1.25rem;border:1px solid #1e293b;border-radius:.75rem;background:#0f172a;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9rem;line-height:1.7}.document-body code{color:#be123c}.document-body pre code{color:inherit}.document-body .concept-diagram,.document-body .learning-flow{margin:1.5rem 0;padding:1.25rem;border:1px solid #dbeafe;border-radius:1rem;background:#f8fbff}.document-body .diagram-row,.document-body .learning-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.75rem}.document-body .diagram-node,.document-body .flowchart-node,.document-body .flow-step{min-width:8rem;padding:.8rem;border:1px solid #bae6fd;border-radius:.65rem;text-align:center;background:#fff}.document-body .diagram-node small,.document-body .flow-step small{display:block;color:#64748b;font-size:.8rem}.document-body .diagram-arrow,.document-body .flow-arrow{color:#0891b2;font-size:1.5rem;font-weight:800}.document-body img{max-width:100%;height:auto}.document-body a{color:#1d4ed8}.document-state{padding:4rem 0;text-align:center;color:#64748b}.error{color:#b91c1c}@media(max-width:767.98px){.course-document{width:min(100% - 1rem,82.5rem)}.document-body > .container-xl{padding:1.25rem}.document-body .diagram-arrow,.document-body .flow-arrow{transform:rotate(90deg)}}`]
})
export class CourseDocumentComponent implements OnInit {
  @Input({ required: true }) fileName = '';
  @Input() title = 'Course Documentation';
  @Input() category = 'Course';
  @Input() backRoute = '/';
  @Input() assetFolder = 'springboot';
  @Input() previousRoute = '';
  @Input() previousLabel = '';
  @Input() nextRoute = '';
  @Input() nextLabel = '';
  html = '';
  loading = true;
  error = false;
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get(`/docs/${this.assetFolder}/${this.fileName}`, { responseType: 'text' }).subscribe({
      next: (source) => { this.html = this.extractDocument(source); this.loading = false; },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  private extractDocument(source: string): string {
    const document = new DOMParser().parseFromString(source, 'text/html');
    document.querySelectorAll('script, style, link, header, nav, footer, .java-subnav, .site-footer, .spring-pill, .toc, .d-flex.justify-content-between, a.btn-success').forEach((element) => element.remove());
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href') ?? '';
      const target = href.split('#')[0].split('?')[0];
      const hash = href.includes('#') ? `#${href.split('#')[1]}` : '';
      if (target.endsWith('.html')) {
        const route = target.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/\.html$/, '');
        anchor.setAttribute('href', `${this.backRoute}${route === 'index' ? '' : `/${route}`}${hash}`);
      }
    });
    return document.body.innerHTML;
  }
}
