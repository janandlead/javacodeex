import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb', standalone: true, imports: [RouterLink],
  template: `<nav class="modern-breadcrumb" aria-label="Breadcrumb"><ol><li><a routerLink="/" aria-label="Home"><i class="bi bi-house-door-fill" aria-hidden="true"></i><span>Home</span></a></li>@for (item of items; track item.label) { <li class="separator" aria-hidden="true"><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li [class.current]="$last" [attr.aria-current]="$last ? 'page' : null">@if (!$last && item.route) { <a [routerLink]="item.route">{{ item.label }}</a> } @else { <span>{{ item.label }}</span> }</li> }</ol></nav>`,
  styles: [`.modern-breadcrumb{margin:0 0 1.25rem}.modern-breadcrumb ol{display:flex;align-items:center;flex-wrap:wrap;gap:.35rem;margin:0;padding:0;list-style:none}.modern-breadcrumb li{display:flex;align-items:center;min-width:0}.modern-breadcrumb a,.modern-breadcrumb li>span{display:inline-flex;align-items:center;gap:.4rem;max-width:32ch;padding:.45rem .7rem;border-radius:.55rem;color:#64748b;font-size:.8125rem;font-weight:600;line-height:1.3;text-decoration:none}.modern-breadcrumb a:hover{color:#1d4ed8;background:#eff6ff}.modern-breadcrumb li.current>span{overflow:hidden;color:#1e3a8a;background:#eff6ff;font-weight:800;text-overflow:ellipsis;white-space:nowrap}.modern-breadcrumb .separator{color:#94a3b8;font-size:.7rem}.modern-breadcrumb .separator i{padding:.2rem}@media(max-width:575.98px){.modern-breadcrumb li.current{max-width:100%}.modern-breadcrumb li.current>span{max-width:24ch}}`]
})
export class BreadcrumbComponent { @Input() items: readonly { label: string; route?: string }[] = []; }
