import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY_INTERVIEWS } from './company-interviews.data';

@Component({
  selector: 'app-company-interview',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="company-interviews">
      <div class="container-xl">
        <a class="back-link" routerLink="/interviews"><i class="bi bi-arrow-left" aria-hidden="true"></i> Interview preparation</a>
        <header class="company-interviews-header">
          <span class="eyebrow">Company interview preparation</span>
          <h1>Company Interview Questions</h1>
          <p>Explore company interview experiences with interview dates, candidate experience levels, technology stacks, and detailed question sets.</p>
        </header>

        <section class="company-interview-list" aria-labelledby="interview-experiences-heading">
          <h2 id="interview-experiences-heading">Interview Experiences</h2>
          <div class="company-interview-grid">
            @for (interview of interviews; track interview.slug) {
              <article class="company-interview-card">
                <p class="company-name">{{ interview.company }}</p>
                <h3>{{ interview.role }}</h3>
                <dl class="interview-details">
                  <div><dt>Interview Date</dt><dd>{{ interview.interviewDate }}</dd></div>
                  <div><dt>Candidate Experience</dt><dd>{{ interview.candidateExperience }}</dd></div>
                  <div><dt>Tech Stack</dt><dd class="tech-stack">{{ interview.techStack.join(', ') }}</dd></div>
                </dl>
                <p class="question-count">{{ questionCount(interview) }} interview questions</p>
                <a class="view-questions" [routerLink]="['/company-interview-questions', interview.slug]">View Interview Questions <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
              </article>
            }
          </div>
        </section>
      </div>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .company-interviews { min-height: calc(100vh - 76px); padding: 2.5rem 0 5rem; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 70%); }
    .back-link, .view-questions { display: inline-flex; align-items: center; gap: .5rem; color: #1d4ed8; font-weight: 700; text-decoration: none; }
    .back-link:hover, .back-link:focus-visible, .view-questions:hover, .view-questions:focus-visible { color: #1e3a8a; text-decoration: underline; }
    .company-interviews-header { max-width: 48rem; margin: 3.5rem auto 2.5rem; text-align: center; }
    .eyebrow { color: #0891b2; font-size: .8rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
    h1 { margin: .75rem 0 1rem; color: #1e3a8a; font-size: clamp(2.2rem, 5vw, 3.75rem); font-weight: 800; }
    .company-interviews-header p { margin: 0; color: #64748b; font-size: 1.08rem; line-height: 1.7; }
    .company-interview-list { max-width: 72rem; margin: 0 auto; }
    .company-interview-list > h2 { margin: 0 0 1rem; color: #1e3a8a; font-size: 1.5rem; }
    .company-interview-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
    .company-interview-card { display: flex; flex-direction: column; padding: 1.5rem; border: 1px solid #bae6fd; border-radius: 1.25rem; background: #ffffff; box-shadow: 0 14px 32px rgba(15, 23, 42, .08); }
    .company-name { margin: 0 0 .35rem; color: #0891b2; font-size: .82rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    h3 { margin: 0; color: #1e3a8a; font-size: 1.35rem; }
    .interview-details { display: grid; gap: .75rem; margin: 1.25rem 0; }
    .interview-details > div { padding: .8rem; border-radius: .75rem; background: #f8fafc; }
    dt { color: #475569; font-size: .8rem; font-weight: 800; }
    dd { margin: .35rem 0 0; color: #0f172a; font-weight: 700; line-height: 1.5; }
    .tech-stack { color: #1e3a8a; }
    .question-count { margin: auto 0 1rem; color: #64748b; font-size: .9rem; }
    @media (max-width: 767.98px) { .company-interview-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyInterviewComponent {
  readonly interviews = COMPANY_INTERVIEWS;

  questionCount(interview: typeof COMPANY_INTERVIEWS[number]): number {
    return interview.questionGroups.reduce((total, group) => total + group.questions.length, 0);
  }
}
