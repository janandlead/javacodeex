import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface HibernateLesson {
  route: string;
  label: string;
}

const HIBERNATE_LESSONS: readonly HibernateLesson[] = [
  { route: '/hibernate-tutorial', label: 'Hibernate Tutorial' },
  { route: '/hibernate-architecture', label: 'Hibernate Architecture' },
  { route: '/hibernate-first-example', label: 'First Hibernate Example' },
  { route: '/hibernate-example', label: 'Hibernate Example' },
  { route: '/hibernate-generator-classes', label: 'Generator Classes in Hibernate' },
  { route: '/hibernate/dialects', label: 'Dialects in Hibernate' },
  { route: '/hibernate/collection-mapping', label: 'Collection Mapping Hibernate' },
  { route: '/hibernate/mapping-list', label: 'Mapping List in Collection Mapping' },
  { route: '/hibernate/mapping-bag', label: 'Mapping Bag in Collection Mapping' },
  { route: '/hibernate-one-to-many-mapping-using-annotation-example', label: 'One to Many' },
  { route: '/hibernate-many-to-many-example-using-annotation', label: 'Many to Many' },
  { route: '/hibernate-one-to-one-example-using-annotation', label: 'One to One' },
  { route: '/hibernate-many-to-one-example-using-annotation', label: 'Many to One' },
  { route: '/hibernate/bidirectional-association', label: 'Bidirectional Association' },
  { route: '/hibernate-transaction-management-example', label: 'Hibernate Transaction Management' },
  { route: '/hibernate-first-level-cache', label: 'First Level Cache in Hibernate' },
  { route: '/hibernate-second-level-cache', label: 'Second Level Cache Hibernate' }
];

@Component({
  selector: 'app-hibernate-pager',
  standalone: true,
  imports: [RouterLink],
  template: `@if (navigation; as links) { <nav class="hibernate-pager container-xl" aria-label="Hibernate tutorial navigation"><a class="pager-link previous" [class.disabled]="!links.previous" [routerLink]="links.previous?.route ?? null"><span><i class="bi bi-arrow-left"></i> Previous</span><strong>{{ links.previous?.label ?? 'Start of tutorial' }}</strong></a><a class="pager-link next" [class.disabled]="!links.next" [routerLink]="links.next?.route ?? null"><span>Next <i class="bi bi-arrow-right"></i></span><strong>{{ links.next?.label ?? 'End of tutorial' }}</strong></a></nav> }`,
  styles: [`
    .hibernate-pager{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;max-width:82.5rem;padding:0 1rem 3rem}.pager-link{display:flex;min-height:5.5rem;flex-direction:column;justify-content:center;gap:.35rem;padding:1rem 1.25rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff;color:#1e3a8a;text-decoration:none;transition:transform .2s,box-shadow .2s}.pager-link.next{text-align:right}.pager-link:not(.disabled):hover{transform:translateY(-2px);box-shadow:0 .5rem 1.2rem #0f17201a}.pager-link span{color:#0891b2;font-size:.82rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}.pager-link strong{font-size:1rem}.pager-link.disabled{visibility:hidden;pointer-events:none}@media(max-width:700px){.hibernate-pager{grid-template-columns:1fr}.pager-link.next{text-align:left}}
  `]
})
export class HibernatePagerComponent {
  private readonly router = inject(Router);

  get navigation(): { previous?: HibernateLesson; next?: HibernateLesson } | null {
    const currentPath = this.router.url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    const index = HIBERNATE_LESSONS.findIndex((lesson) => lesson.route === currentPath);
    if (index < 0) return null;
    return { previous: HIBERNATE_LESSONS[index - 1], next: HIBERNATE_LESSONS[index + 1] };
  }
}
