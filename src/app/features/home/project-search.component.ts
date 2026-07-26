import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MAIN_NAVIGATION } from '../../core/constants/navigation.config';
import { JAVA_PAGES, SPRINGBOOT_PAGES } from '../../core/constants/tutorial-content';

type SearchResultType = 'Tutorial' | 'Interview topic' | 'Interview question';
interface SearchResult { readonly title: string; readonly route: string; readonly category: string; readonly type: SearchResultType; readonly searchableText: string; }

const navigationResults = MAIN_NAVIGATION.flatMap((item) => [
  { title: item.label, route: item.route === '/interviews' ? '/interviews' : item.route ?? '/', category: item.label, type: 'Tutorial' as const },
  ...(item.children ?? []).map((child) => ({ title: child.label, route: child.route ?? '/', category: item.label, type: 'Tutorial' as const }))
]);
const tutorialResults = [
  ...Object.entries(JAVA_PAGES).map(([slug, page]) => ({ title: page.title, route: `/java-${slug}`, category: 'Java', type: 'Tutorial' as const, text: `${page.title} ${page.description}` })),
  ...Object.entries(SPRINGBOOT_PAGES).map(([slug, page]) => ({ title: page.title, route: `/spring-boot/${slug}`, category: 'Spring Boot', type: 'Tutorial' as const, text: `${page.title} ${page.description}` }))
];
const BASE_SEARCH_INDEX: readonly SearchResult[] = [...navigationResults, ...tutorialResults]
  .filter((item, index, items) => items.findIndex((candidate) => candidate.route === item.route && candidate.title === item.title) === index)
  .map((item) => ({ title: item.title, route: item.route, category: item.category, type: item.type, searchableText: `${item.title} ${item.category} ${'text' in item ? item.text : ''}`.toLowerCase() }));

@Component({
  selector: 'app-project-search', standalone: true, imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="project-search" role="search"><label class="visually-hidden" for="project-search-input">Search tutorials and interview questions</label><div class="search-input-wrap"><i class="bi bi-search" aria-hidden="true"></i><input id="project-search-input" type="search" [value]="query()" (input)="updateQuery($event)" (keydown.enter)="openFirstResult()" placeholder="Search tutorials and interview questions" autocomplete="off" />@if (query()) { <button type="button" class="clear-search" aria-label="Clear search" (click)="clearQuery()"><i class="bi bi-x-lg" aria-hidden="true"></i></button> }</div>@if (query()) {<div class="search-results" role="listbox" aria-label="Search results">@for (result of results(); track result.route + result.title) {<a class="search-result" [routerLink]="result.route" (click)="clearQuery()" role="option"><span class="result-icon"><i [class]="result.type === 'Tutorial' ? 'bi bi-journal-code' : result.type === 'Interview topic' ? 'bi bi-person-workspace' : 'bi bi-patch-question'" aria-hidden="true"></i></span><span class="result-content"><small>{{ result.type }} · {{ result.category }}</small><strong>{{ result.title }}</strong></span><i class="bi bi-arrow-up-right result-arrow" aria-hidden="true"></i></a>}@if (!results().length) { <span class="search-empty">No matching resources found</span> }</div>}</div>`,
  styles: [`:host{display:block;width:100%}.project-search{position:relative;width:100%;max-width:42rem}.search-input-wrap{display:flex;align-items:center;gap:.65rem;width:100%;padding:.2rem .85rem;border:1px solid rgba(186,230,253,.75);border-radius:999px;background:rgba(255,255,255,.97);box-shadow:0 .35rem 1rem rgba(2,8,23,.16)}.search-input-wrap>i{color:#0284c7;font-size:.95rem}.search-input-wrap input{width:100%;min-height:2.65rem;border:0;outline:0;color:#172554;background:transparent;font-size:1rem}.search-input-wrap input::placeholder{color:#64748b}.clear-search{display:grid;width:1.7rem;height:1.7rem;flex:0 0 1.7rem;place-items:center;border:0;border-radius:50%;color:#475569;background:#e0f2fe;font-size:.7rem}.search-results{position:absolute;z-index:20;top:calc(100% + .55rem);right:0;left:0;display:grid;max-height:min(65vh,28rem);overflow-y:auto;padding:.4rem;border:1px solid #bae6fd;border-radius:.85rem;background:#fff;box-shadow:0 1rem 2rem rgba(15,23,42,.22)}.search-result{display:flex;align-items:center;gap:.65rem;padding:.65rem;border-radius:.6rem;color:#334155;text-decoration:none}.search-result:hover,.search-result:focus{background:#eff6ff}.result-icon{display:grid;width:2rem;height:2rem;flex:0 0 2rem;place-items:center;border-radius:.5rem;color:#0369a1;background:#e0f2fe}.result-content{display:flex;min-width:0;flex:1;flex-direction:column;gap:.15rem}.result-content small{overflow:hidden;color:#0891b2;font-size:.65rem;font-weight:800;letter-spacing:.03em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.result-content strong{overflow:hidden;color:#1e3a8a;font-size:.86rem;text-overflow:ellipsis;white-space:nowrap}.result-arrow{color:#0891b2;font-size:.8rem}.search-empty{padding:.8rem;color:#64748b;font-size:.85rem;text-align:center}@media(max-width:1199.98px){.project-search{max-width:none}}@media(max-width:991.98px){.project-search{margin:0 auto 1rem}.search-results{right:0;left:0}}@media(max-width:575.98px){.search-input-wrap{padding-inline:.7rem}.search-input-wrap input{min-height:2.65rem;font-size:1rem}}`]
})
export class ProjectSearchComponent {
  private readonly router = inject(Router);
  private readonly searchIndex = signal<readonly SearchResult[]>(BASE_SEARCH_INDEX);
  readonly query = signal('');
  readonly results = computed(() => { const query = this.query().trim().toLowerCase(); if (!query) return []; return this.searchIndex().map((result) => ({ result, score: this.score(result, query) })).filter((item) => item.score > 0).sort((first, second) => second.score - first.score || first.result.title.localeCompare(second.result.title)).slice(0, 8).map((item) => item.result); });
  constructor() { void this.loadInterviewIndex(); }
  updateQuery(event: Event): void { this.query.set((event.target as HTMLInputElement).value); }
  clearQuery(): void { this.query.set(''); }
  openFirstResult(): void { const first = this.results()[0]; if (first) void this.router.navigateByUrl(first.route); }
  private score(result: SearchResult, query: string): number { return query.split(/\s+/).filter(Boolean).reduce((score, term) => result.title.toLowerCase().includes(term) ? score + 5 : result.category.toLowerCase().includes(term) ? score + 3 : result.searchableText.includes(term) ? score + 1 : score, 0); }
  private async loadInterviewIndex(): Promise<void> {
    const { INTERVIEW_QUESTIONS, INTERVIEW_TOPICS } = await import('../interview-questions/data/interview-question.data');
    const topicResults = INTERVIEW_TOPICS.map((topic) => ({ title: `${topic.name} Interview Questions`, route: `/interview-questions/${topic.id}`, category: 'Interview preparation', type: 'Interview topic' as const, text: `${topic.name} ${topic.description}` }));
    const questionResults = INTERVIEW_QUESTIONS.map((question) => { const topic = INTERVIEW_TOPICS.find((item) => item.id === question.topicId); return { title: question.question, route: `/interview-questions/${topic?.id ?? question.topicId}#question-${question.id}`, category: topic?.name ?? 'Interview preparation', type: 'Interview question' as const, text: `${question.question} ${question.answer} ${(question.tags ?? []).join(' ')}` }; });
    const interviewIndex = [...topicResults, ...questionResults].map((item) => ({ title: item.title, route: item.route, category: item.category, type: item.type, searchableText: `${item.title} ${item.category} ${item.text}`.toLowerCase() }));
    this.searchIndex.update((current) => [...current, ...interviewIndex]);
  }
}
