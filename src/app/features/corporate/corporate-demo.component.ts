import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-corporate-demo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="demo-page">
      <section class="demo-hero"><div class="container-xl"><p class="eyebrow">Corporate training enquiry</p><h1>Request a Corporate Demo</h1><p>Tell us about your team, current stack, and learning goals. We will use the details to suggest a practical Java, Spring Boot, AI, or bootcamp format.</p></div></section>
      <section class="container-xl demo-content"><div class="demo-grid">
        <div><p class="eyebrow">What happens next</p><h2>A focused conversation about your team</h2><ul class="demo-list"><li><i class="bi bi-1-circle" aria-hidden="true"></i><span>Share your team size, topics, and preferred timeline.</span></li><li><i class="bi bi-2-circle" aria-hidden="true"></i><span>Discuss delivery options, agenda depth, and project context.</span></li><li><i class="bi bi-3-circle" aria-hidden="true"></i><span>Receive suitable program options and next steps.</span></li></ul><p class="demo-note">Your email app will open a prefilled request to contact&#64;javacodeex.com. Please do not include passwords, API keys, or confidential information.</p></div>
        <form class="demo-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="field-grid"><label>Full name<input formControlName="fullName" autocomplete="name" /></label><label>Work email<input type="email" formControlName="email" autocomplete="email" /></label><label>Company<input formControlName="company" autocomplete="organization" /></label><label>Job title<input formControlName="jobTitle" autocomplete="organization-title" /></label><label>Team size<select formControlName="teamSize"><option value="">Select</option><option>1–10</option><option>11–25</option><option>26–50</option><option>51–100</option><option>100+</option></select></label><label>Preferred format<select formControlName="format"><option value="">Select</option><option>Live online</option><option>Onsite</option><option>Hybrid</option><option>Weekend bootcamp</option></select></label></div>
          <label>Training topics<textarea rows="4" formControlName="topics" placeholder="Java, Spring Boot, AI, testing, architecture, or another goal"></textarea></label><label>Preferred timeline<input formControlName="timeline" placeholder="For example: August 2026 or Q4" /></label><label class="consent"><input type="checkbox" formControlName="consent" /> <span>I agree to be contacted about this training enquiry and have read the <a routerLink="/privacy-policy">privacy policy</a>.</span></label>
          @if (form.invalid && submitted) { <p class="form-error" role="alert">Please complete the required fields and consent checkbox.</p> }
          <button class="demo-button" type="submit">Open email request <i class="bi bi-envelope-arrow-up" aria-hidden="true"></i></button>
          @if (sent) { <p class="form-success" role="status">Your email draft is ready. Please review and send it from your email app.</p> }
        </form>
      </div></section>
    </main>
  `,
  styles: [`.demo-page{min-height:60vh;color:#334155;background:#f8fafc}.container-xl{width:min(100% - 2rem,var(--app-content-width));margin-inline:auto}.demo-hero{padding:4.5rem 0;color:#fff;background:radial-gradient(circle at 80% 15%,rgba(6,182,212,.2),transparent 30%),linear-gradient(135deg,#07111f,#172554 65%,#0f4c5c)}.eyebrow{margin:0 0 .8rem;color:#67e8f9;font-size:.76rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.demo-hero h1{margin:0 0 1rem;color:#fff;font-size:clamp(2.5rem,6vw,4.8rem);letter-spacing:-.06em}.demo-hero p:not(.eyebrow){max-width:48rem;color:#cfe3f3;font-size:1.15rem;line-height:1.7}.demo-content{padding-top:4rem;padding-bottom:5rem}.demo-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:4rem;align-items:start}.demo-grid h2{margin:0 0 1rem;color:#102a43;font-size:clamp(1.8rem,3vw,2.7rem);letter-spacing:-.04em}.demo-list{display:grid;gap:1rem;margin:2rem 0;padding:0;list-style:none}.demo-list li{display:flex;gap:.8rem;align-items:flex-start}.demo-list i{color:#0891b2;font-size:1.5rem}.demo-list span{padding-top:.15rem;line-height:1.6}.demo-note{padding:1rem;border-left:4px solid #67e8f9;color:#64748b;background:#ecfeff;font-size:.9rem;line-height:1.6}.demo-form{display:grid;gap:1rem;padding:clamp(1.3rem,4vw,2.5rem);border:1px solid #dbeafe;border-radius:1.2rem;background:#fff;box-shadow:0 1rem 2rem rgba(15,23,42,.06)}.field-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}.demo-form label{display:grid;gap:.4rem;color:#334155;font-size:.85rem;font-weight:800}.demo-form input,.demo-form select,.demo-form textarea{width:100%;border:1px solid #cbd5e1;border-radius:.55rem;padding:.7rem .75rem;color:#334155;background:#fff;font:inherit;font-weight:400}.demo-form input:focus,.demo-form select:focus,.demo-form textarea:focus{outline:3px solid #cffafe;border-color:#0891b2}.consent{display:flex!important;grid-template-columns:none!important;align-items:flex-start;gap:.55rem!important;font-weight:500!important;line-height:1.5}.consent input{width:1rem;margin-top:.2rem}.consent a{color:#0891b2}.demo-button{display:inline-flex;justify-content:center;gap:.55rem;border:0;border-radius:.65rem;padding:.85rem 1rem;color:#07111f;background:#67e8f9;font:inherit;font-weight:900;cursor:pointer}.form-error{margin:0;color:#b91c1c;font-size:.85rem}.form-success{margin:0;padding:.75rem;border-radius:.55rem;color:#166534;background:#dcfce7;font-size:.85rem}@media(max-width:800px){.demo-grid{grid-template-columns:1fr;gap:2rem}}@media(max-width:560px){.field-grid{grid-template-columns:1fr}}`]
})
export class CorporateDemoComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]], email: ['', [Validators.required, Validators.email]], company: ['', Validators.required], jobTitle: [''], teamSize: ['', Validators.required], format: ['', Validators.required], topics: ['', [Validators.required, Validators.minLength(10)]], timeline: ['', Validators.required], consent: [false, Validators.requiredTrue]
  });
  submitted = false;
  sent = false;

  submit(): void {
    this.submitted = true;
    this.sent = false;
    if (this.form.invalid) return;
    const values = this.form.getRawValue();
    const subject = encodeURIComponent(`Corporate training demo request - ${values.company}`);
    const body = encodeURIComponent([`Name: ${values.fullName}`, `Work email: ${values.email}`, `Company: ${values.company}`, `Job title: ${values.jobTitle}`, `Team size: ${values.teamSize}`, `Preferred format: ${values.format}`, `Training topics: ${values.topics}`, `Preferred timeline: ${values.timeline}`].join('\n'));
    window.location.href = `mailto:contact@javacodeex.com?subject=${subject}&body=${body}`;
    this.sent = true;
  }
}
