import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../core/models/navigation.model';

@Component({
  selector: 'app-sidebar', standalone: true, imports: [RouterLink, RouterLinkActive],
  template: `<aside class="course-sidebar" aria-label="Course navigation"><h2>{{ title }}</h2><ul>@for (item of items; track item.label) { <li><a [routerLink]="item.route" routerLinkActive="active">{{ item.label }}</a></li> }</ul></aside>`,
  styles: [`.course-sidebar{position:sticky;top:1rem;padding:1.25rem;background:#eff6ff;border:1px solid #dbeafe;border-radius:1rem}.course-sidebar h2{font-size:1rem;color:#1e3a8a}.course-sidebar ul{list-style:none;margin:0;padding:0}.course-sidebar a{display:block;padding:.4rem 0;color:#334155;text-decoration:none}.course-sidebar a.active,.course-sidebar a:hover{color:#1d4ed8;font-weight:700}`]
})
export class SidebarComponent { @Input() title = 'Course navigation'; @Input() items: readonly NavigationItem[] = []; }

