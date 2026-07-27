import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { COMPANY_INTERVIEWS, CompanyInterview } from './company-interviews.data';

@Component({
  selector: 'app-company-interview-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="company-interview-detail">
      <div class="container-xl">
        @if (interview; as currentInterview) {
          <a class="back-link" routerLink="/company-interview-questions"><i class="bi bi-arrow-left" aria-hidden="true"></i> All company interviews</a>
          <header class="detail-header">
            <span class="eyebrow">{{ currentInterview.company }}</span>
            <h1>{{ currentInterview.role }} Interview Questions</h1>
            <p>Interview experience for a candidate with {{ currentInterview.candidateExperience }} of experience.</p>
          </header>

          <section class="experience-summary" aria-label="Interview summary">
            <div><strong>Interview Date</strong><span>{{ currentInterview.interviewDate }}</span></div>
            <div><strong>Candidate Experience</strong><span>{{ currentInterview.candidateExperience }}</span></div>
            <div><strong>Tech Stack</strong><span>{{ currentInterview.techStack.join(', ') }}</span></div>
          </section>

          <section class="question-list" aria-labelledby="questions-heading">
            <h2 id="questions-heading">Interview Questions</h2>
            @for (group of currentInterview.questionGroups; track group.category) {
              <details>
                <summary>{{ group.category }} <span>{{ group.questions.length }} questions</span></summary>
                <ol>
                  @for (question of group.questions; track question) {
                    <li>{{ question }}</li>
                  }
                </ol>
              </details>
            }
          </section>
        } @else {
          <section class="not-found">
            <h1>Interview experience not found</h1>
            <p>The requested company interview could not be found.</p>
            <a class="view-link" routerLink="/company-interview-questions">View all company interviews</a>
          </section>
        }
      </div>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .company-interview-detail { min-height: calc(100vh - 76px); padding: 2.5rem 0 5rem; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 70%); }
    .back-link, .view-link { color: #1d4ed8; font-weight: 700; text-decoration: none; }
    .back-link:hover, .back-link:focus-visible, .view-link:hover, .view-link:focus-visible { text-decoration: underline; }
    .detail-header { max-width: 52rem; margin: 3.5rem auto 2rem; text-align: center; }
    .eyebrow { color: #0891b2; font-size: .8rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
    h1 { margin: .75rem 0 1rem; color: #1e3a8a; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; }
    .detail-header p { color: #64748b; font-size: 1.05rem; line-height: 1.7; }
    .experience-summary, .question-list { max-width: 58rem; margin: 0 auto; }
    .experience-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
    .experience-summary div { display: flex; flex-direction: column; gap: .45rem; padding: 1rem; border-radius: .85rem; background: #ecfeff; }
    .experience-summary strong { color: #0e7490; font-size: .82rem; }
    .experience-summary span { color: #0f172a; font-weight: 700; line-height: 1.5; }
    .question-list h2 { color: #1e3a8a; font-size: 1.6rem; }
    details { margin: 1rem 0; border: 1px solid #dbeafe; border-radius: .9rem; background: #ffffff; box-shadow: 0 8px 20px rgba(15, 23, 42, .05); }
    summary { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; cursor: pointer; color: #1e3a8a; font-weight: 800; }
    summary span { color: #64748b; font-size: .8rem; font-weight: 600; }
    ol { margin: 0; padding: 0 1.5rem 1.25rem 2.75rem; color: #475569; }
    li { margin: .6rem 0; padding-left: .25rem; line-height: 1.6; }
    .not-found { max-width: 42rem; margin: 5rem auto; text-align: center; }
    @media (max-width: 767.98px) { .experience-summary { grid-template-columns: 1fr; } summary { flex-direction: column; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyInterviewDetailComponent {
  readonly interview: CompanyInterview | undefined;

  constructor(route: ActivatedRoute) {
    const slug = route.snapshot.paramMap.get('slug');
    this.interview = COMPANY_INTERVIEWS.find((item) => item.slug === slug);
  }
}
