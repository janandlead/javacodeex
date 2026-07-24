import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header', standalone: true,
  template: `<div class="page-header"><p class="eyebrow">{{ category }}</p><h1>{{ title }}</h1><p class="lead">{{ description }}</p></div>`,
  styles: [`.page-header{padding:3rem 0 2rem}.eyebrow{margin:0 0 .5rem;color:#0891b2;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.page-header h1{color:#1e3a8a;font-weight:800}.lead{max-width:52rem;color:#64748b}`]
})
export class PageHeaderComponent { @Input({ required: true }) title = ''; @Input() description = ''; @Input() category = ''; }

