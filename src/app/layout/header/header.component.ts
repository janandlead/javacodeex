import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectSearchComponent } from '../../features/home/project-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ProjectSearchComponent],
  template: `<header class="site-header"><div class="container-xl header-inner">
      <a class="brand" routerLink="/" aria-label="Java Codeex home"><span class="brand-mark-wrap"><img src="/assets/images/javacodeex.jpg" alt="" /></span><span class="brand-copy"><span class="brand-name">Java Codeex</span><span class="brand-subtitle">Practical programming, made clear</span></span></a>
      <app-project-search />
      <a class="workshops-link" routerLink="/workshops"><i class="bi bi-calendar2-week" aria-hidden="true"></i><span>Workshops</span></a><a class="corporate-training-link" routerLink="/corporate-training"><i class="bi bi-building" aria-hidden="true"></i><span>Corporate Training</span></a><a class="start-learning" routerLink="/java-tutorial-overview"><i class="bi bi-rocket-takeoff" aria-hidden="true"></i><span>Start Learning</span></a>
    </div></header>`,
  styles: [`
    .site-header{position:relative;z-index:1100;overflow:visible;color:#fff;background:radial-gradient(circle at 82% 15%,rgba(34,211,238,.22),transparent 28%),linear-gradient(135deg,#081226,#172554 62%,#164e63);box-shadow:0 .35rem 1rem rgba(15,23,42,.16)}
    .header-inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:1.25rem;padding-top:1.15rem;padding-bottom:1.15rem}.header-inner app-project-search{flex:1 1 28rem;max-width:42rem;min-width:0}
    .brand{display:inline-flex;align-items:center;gap:.8rem;color:#fff;text-decoration:none}.brand:hover .brand-mark-wrap{transform:rotate(-4deg) scale(1.04);border-color:#67e8f9}.brand-mark-wrap{display:grid;width:3.5rem;height:3.5rem;flex:0 0 3.5rem;place-items:center;overflow:hidden;border:2px solid rgba(165,243,252,.75);border-radius:1rem;background:#fff;box-shadow:0 .5rem 1.25rem rgba(2,8,23,.25)}.brand-mark-wrap img{display:block;width:100%;height:100%;object-fit:cover}.brand-copy{display:flex;flex-direction:column;gap:.2rem}.brand-name{font-size:clamp(1.5rem,3vw,2rem);font-weight:850;letter-spacing:-.035em;line-height:1}.brand-subtitle{color:#bae6fd;font-size:.78rem;font-weight:650;letter-spacing:.035em}
    .start-learning{display:inline-flex;align-items:center;gap:.45rem;flex:0 0 auto;padding:.7rem 1rem;border:1px solid #fbbf24;border-radius:999px;color:#172554;background:#fbbf24;font-size:.85rem;font-weight:800;text-decoration:none;box-shadow:0 .35rem 1rem rgba(2,8,23,.18)}.start-learning:hover{transform:translateY(-2px);color:#172554;background:#fcd34d;box-shadow:0 .6rem 1.25rem rgba(2,8,23,.28)}
    .corporate-training-link{display:inline-flex;align-items:center;gap:.45rem;flex:0 0 auto;padding:.7rem 1rem;border:1px solid rgba(103,232,249,.8);border-radius:999px;color:#cffafe;background:rgba(8,47,73,.45);font-size:.85rem;font-weight:800;text-decoration:none}.corporate-training-link:hover{transform:translateY(-2px);color:#fff;background:rgba(8,145,178,.55);box-shadow:0 .6rem 1.25rem rgba(2,8,23,.22)}
    @media(max-width:991.98px){.header-inner{flex-wrap:wrap}.header-inner app-project-search{order:3;flex-basis:100%;max-width:none}.header-inner>.start-learning{display:inline-flex;margin-left:auto}}
    @media(max-width:575.98px){.header-inner{gap:.75rem;padding-top:.85rem;padding-bottom:.85rem}.brand{gap:.55rem}.brand-mark-wrap{width:2.9rem;height:2.9rem;flex-basis:2.9rem;border-radius:.8rem}.brand-subtitle{font-size:.64rem}.corporate-training-link,.start-learning{padding:.6rem;width:2.7rem;height:2.7rem;justify-content:center}.corporate-training-link span,.start-learning span{display:none}}
  `]
})
export class HeaderComponent {
}
