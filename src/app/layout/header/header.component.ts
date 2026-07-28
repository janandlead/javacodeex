import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectSearchComponent } from '../../features/home/project-search.component';

const COURSE_LINKS = [
  ['Java', '/java-tutorial-overview', 'bi bi-cup-hot'], ['Spring Boot', '/spring-boot-overview', 'bi bi-leaf'],
  ['Python', '/python-tutorial', 'bi bi-code-slash'], ['Angular', '/angular', 'bi bi-braces'],
  ['Hibernate', '/hibernate-tutorial', 'bi bi-database-gear'], ['MySQL', '/mysql', 'bi bi-database'],
  ['PostgreSQL', '/postgresql/introduction', 'bi bi-server'], ['Design Patterns', '/design-patterns', 'bi bi-diagram-3'],
  ['Spring AI', '/spring-ai', 'bi bi-stars'], ['Interviews', '/interviews', 'bi bi-person-workspace']
] as const;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProjectSearchComponent],
  template: `<header class="site-header"><div class="container-xl header-inner">
      <a class="brand" routerLink="/" aria-label="Java Codeex home"><span class="brand-mark-wrap"><img src="/assets/images/javacodeex.jpg" alt="" /></span><span class="brand-copy"><span class="brand-name">Java Codeex</span><span class="brand-subtitle">Practical programming, made clear</span></span></a>
      <app-project-search />
      <details class="header-courses"><summary><i class="bi bi-grid-3x3-gap" aria-hidden="true"></i><span>Courses</span></summary><div class="course-menu">@for (item of courseLinks; track item[0]) { <a [routerLink]="item[1]" (click)="closeCourses($event)"><i [class]="item[2]" aria-hidden="true"></i><span>{{ item[0] }}</span><i class="bi bi-arrow-up-right course-arrow" aria-hidden="true"></i></a> }</div></details>
      <a class="start-learning" routerLink="/java-tutorial-overview"><i class="bi bi-rocket-takeoff" aria-hidden="true"></i><span>Start Learning</span></a>
    </div></header>`,
  styles: [`
    .site-header{position:relative;z-index:1100;overflow:visible;color:#fff;background:radial-gradient(circle at 82% 15%,rgba(34,211,238,.22),transparent 28%),linear-gradient(135deg,#081226,#172554 62%,#164e63);box-shadow:0 .35rem 1rem rgba(15,23,42,.16)}
    .header-inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:1.25rem;padding-top:1.15rem;padding-bottom:1.15rem}.header-inner app-project-search{flex:1 1 28rem;max-width:42rem;min-width:0}
    .brand{display:inline-flex;align-items:center;gap:.8rem;color:#fff;text-decoration:none}.brand:hover .brand-mark-wrap{transform:rotate(-4deg) scale(1.04);border-color:#67e8f9}.brand-mark-wrap{display:grid;width:3.5rem;height:3.5rem;flex:0 0 3.5rem;place-items:center;overflow:hidden;border:2px solid rgba(165,243,252,.75);border-radius:1rem;background:#fff;box-shadow:0 .5rem 1.25rem rgba(2,8,23,.25)}.brand-mark-wrap img{display:block;width:100%;height:100%;object-fit:cover}.brand-copy{display:flex;flex-direction:column;gap:.2rem}.brand-name{font-size:clamp(1.5rem,3vw,2rem);font-weight:850;letter-spacing:-.035em;line-height:1}.brand-subtitle{color:#bae6fd;font-size:.78rem;font-weight:650;letter-spacing:.035em}
    .header-courses{position:relative;flex:0 0 auto}.header-courses summary{display:inline-flex;align-items:center;gap:.45rem;padding:.7rem .9rem;border:1px solid rgba(186,230,253,.65);border-radius:999px;color:#e0f2fe;background:rgba(255,255,255,.08);cursor:pointer;font-size:.85rem;font-weight:800;list-style:none}.header-courses summary::-webkit-details-marker{display:none}.header-courses summary:hover,.header-courses[open] summary{border-color:#67e8f9;color:#fff;background:rgba(103,232,249,.16)}.course-menu{position:absolute;z-index:30;top:calc(100% + .65rem);right:0;display:grid;min-width:15rem;padding:.45rem;border:1px solid #bae6fd;border-radius:.9rem;background:#fff;box-shadow:0 1rem 2rem rgba(15,23,42,.22)}.course-menu a{display:flex;align-items:center;gap:.65rem;padding:.65rem .7rem;border-radius:.55rem;color:#334155;text-decoration:none;font-size:.86rem;font-weight:700}.course-menu a:hover{color:#1e3a8a;background:#eff6ff}.course-menu a>i:first-child{width:1.25rem;color:#0891b2;text-align:center}.course-arrow{margin-left:auto;color:#94a3b8;font-size:.75rem}.start-learning{display:inline-flex;align-items:center;gap:.45rem;flex:0 0 auto;padding:.7rem 1rem;border:1px solid #fbbf24;border-radius:999px;color:#172554;background:#fbbf24;font-size:.85rem;font-weight:800;text-decoration:none;box-shadow:0 .35rem 1rem rgba(2,8,23,.18)}.start-learning:hover{transform:translateY(-2px);color:#172554;background:#fcd34d;box-shadow:0 .6rem 1.25rem rgba(2,8,23,.28)}
    @media(max-width:991.98px){.header-inner{flex-wrap:wrap}.header-inner app-project-search{order:3;flex-basis:100%;max-width:none}.header-courses{display:none}.header-inner>.start-learning{display:inline-flex;margin-left:auto}}
    .header-courses{display:none!important}@media(max-width:575.98px){.header-inner{gap:.75rem;padding-top:.85rem;padding-bottom:.85rem}.brand{gap:.55rem}.brand-mark-wrap{width:2.9rem;height:2.9rem;flex-basis:2.9rem;border-radius:.8rem}.brand-subtitle{font-size:.64rem}.start-learning{padding:.6rem;width:2.7rem;height:2.7rem;justify-content:center}.start-learning span{display:none}}
  `]
})
export class HeaderComponent {
  readonly courseLinks = COURSE_LINKS;

  closeCourses(event: Event): void {
    (event.currentTarget as HTMLElement)?.closest('details')?.removeAttribute('open');
  }
}
