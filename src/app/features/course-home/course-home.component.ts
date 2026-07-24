import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationItem } from '../../core/models/navigation.model';

@Component({
  selector: 'app-course-home', standalone: true, imports: [RouterLink],
  template: `<section class="course-hero"><div class="container-xl"><p class="eyebrow">{{ category }}</p><h1>{{ title }}</h1><p>{{ description }}</p></div></section><main class="container-xl py-5"><div class="row g-3">@for (item of items; track item.label) { <div class="col-md-6 col-lg-4"><a class="topic-card" [routerLink]="item.route"><i class="bi bi-book"></i><span>{{ item.label }}</span><i class="bi bi-arrow-right ms-auto"></i></a></div> }</div></main>`,
  styles: [`.course-hero{padding:5rem 0;background:linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff}.course-hero h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:800}.course-hero p:last-child{max-width:44rem;color:#dbeafe;font-size:1.2rem;line-height:1.7}.eyebrow{color:#67e8f9;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.topic-card{display:flex;align-items:center;gap:.75rem;height:100%;padding:1.25rem;border:1px solid #dbeafe;border-radius:1rem;color:#1e3a8a;background:#fff;text-decoration:none;font-weight:700;box-shadow:0 .5rem 1rem rgba(15,23,42,.06)}.topic-card:hover{transform:translateY(-2px);border-color:#06b6d4;color:#0891b2}`]
})
export class CourseHomeComponent { @Input({ required: true }) category = ''; @Input({ required: true }) title = ''; @Input() description = ''; @Input() items: readonly NavigationItem[] = []; }

