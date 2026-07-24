import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-placeholder', standalone: true, imports: [RouterLink],
  template: `<section class="placeholder-page container-xl"><span class="course-icon"><i class="bi bi-stars"></i></span><p class="eyebrow">{{ category }}</p><h1>{{ title }}</h1><p class="lead">{{ description }}</p><div class="notice"><i class="bi bi-hourglass-split"></i><div><h2>Course coming soon</h2><p>We are preparing practical lessons and examples for this learning path. Explore Java or Spring Boot while this course is being built.</p></div></div><a class="btn btn-primary" routerLink="/">Browse all courses</a></section>`,
  styles: [`.placeholder-page{padding:6rem 1rem}.course-icon{display:grid;width:4rem;height:4rem;place-items:center;border-radius:1rem;background:#e0f2fe;color:#0284c7;font-size:1.8rem}.eyebrow{margin-top:1.5rem;color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.placeholder-page h1{color:#1e3a8a;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800}.lead{max-width:44rem;color:#64748b;line-height:1.75}.notice{display:flex;max-width:42rem;gap:1rem;margin:2rem 0;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff}.notice>i{color:#0284c7;font-size:1.5rem}.notice h2{font-size:1.1rem;color:#0c4a6e}.notice p{margin:0;color:#475569}`]
})
export class CoursePlaceholderComponent { @Input() category = ''; @Input() title = ''; @Input() description = ''; }
