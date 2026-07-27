import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interview-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="interview-landing">
      <div class="container-xl position-relative">
        <a class="interview-close" routerLink="/" aria-label="Close interview question categories"><i class="bi bi-x-lg" aria-hidden="true"></i></a>
        <header class="interview-landing-header">
          <span class="eyebrow">Interview preparation</span>
          <h1>Interview Questions and Preparation</h1>
          <p>Prepare for technical, managerial, and company interview rounds with focused questions and practical guidance for your next opportunity.</p>
        </header>
        <section class="interview-category-grid" aria-label="Interview question categories">
          <a class="interview-category-card featured" routerLink="/java-technical-interview-questions">
            <span class="category-icon"><i class="bi bi-cup-hot" aria-hidden="true"></i></span><span class="category-status">Available now</span>
            <h2>Java Technical Interview Questions</h2>
            <p>Prepare for Core Java, collections, OOP, exceptions, multithreading, Spring Boot, Hibernate, databases, and more.</p>
            <span class="category-link">Start Java preparation <i class="bi bi-arrow-right" aria-hidden="true"></i></span>
          </a>
          <article class="interview-category-card coming-soon">
            <span class="category-icon"><i class="bi bi-people" aria-hidden="true"></i></span><span class="category-status">Coming soon</span>
            <h2>Manager Interview Questions</h2>
            <p>Practice leadership, communication, delivery, mentoring, stakeholder management, and people-management questions.</p>
            <span class="category-link">Manager interview preparation</span>
          </article>
          <a class="interview-category-card featured" routerLink="/company-interview-questions">
            <span class="category-icon"><i class="bi bi-building" aria-hidden="true"></i></span><span class="category-status">Available now</span>
            <h2>Company Interview Questions</h2>
            <p>Review company interview experiences using a clear format for the interview date, candidate experience, and technology stack.</p>
            <span class="category-link">View company interview format <i class="bi bi-arrow-right" aria-hidden="true"></i></span>
          </a>
        </section>
        <section class="interview-seo-content" aria-labelledby="interview-preparation-guide">
          <h2 id="interview-preparation-guide">Choose the Right Interview Preparation Track</h2>
          <p>Strong interview preparation combines clear concepts, practical problem solving, and confident communication. Use these interview question tracks to focus your study plan and understand what different hiring rounds expect.</p>
          <ul>
            <li><strong>Technical interview questions:</strong> Review Java, object-oriented programming, collections, databases, Spring Boot, Hibernate, and other development topics.</li>
            <li><strong>Managerial interview questions:</strong> Prepare for leadership, teamwork, delivery, mentoring, communication, and stakeholder situations.</li>
            <li><strong>Company interview questions:</strong> Learn how to approach company-focused rounds, role expectations, hiring patterns, and frequently asked questions.</li>
          </ul>
          <p>Start with our <a routerLink="/java-technical-interview-questions">Java technical interview questions</a> for detailed topic-based practice. Search questions by topic and difficulty, review the explanations, and return to challenging areas until you can explain each answer clearly.</p>
        </section>
      </div>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .interview-landing { min-height: calc(100vh - 76px); padding: 3rem 0 5rem; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 70%); }
    .interview-close { position: absolute; top: 0; left: 1rem; display: grid; width: 2.75rem; height: 2.75rem; place-items: center; border: 1px solid #cbd5e1; border-radius: 50%; color: #334155; background: #ffffff; box-shadow: 0 5px 16px rgba(15, 23, 42, .08); text-decoration: none; transition: all .2s ease; }
    .interview-close:hover, .interview-close:focus-visible { color: #ffffff; background: #1e3a8a; border-color: #1e3a8a; }
    .interview-landing-header { max-width: 720px; margin: 3.5rem auto 2.5rem; text-align: center; }
    .eyebrow { color: #0891b2; font-size: .8rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
    h1 { margin: .75rem 0 1rem; color: #1e3a8a; font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 800; }
    .interview-landing-header p { margin: 0; color: #64748b; font-size: 1.1rem; line-height: 1.7; }
    .interview-category-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
    .interview-category-card { display: flex; min-height: 22rem; flex-direction: column; padding: 1.75rem; border: 1px solid #e2e8f0; border-radius: 1.25rem; color: #334155; background: #ffffff; box-shadow: 0 12px 30px rgba(15, 23, 42, .08); text-decoration: none; }
    .interview-category-card.featured { border-color: #67e8f9; box-shadow: 0 16px 35px rgba(8, 145, 178, .16); transition: transform .2s ease, box-shadow .2s ease; }
    .interview-category-card.featured:hover { transform: translateY(-5px); box-shadow: 0 20px 42px rgba(8, 145, 178, .24); }
    .interview-category-card.coming-soon { background: #f8fafc; }
    .category-icon { display: grid; width: 3.5rem; height: 3.5rem; place-items: center; border-radius: 1rem; color: #0e7490; background: #cffafe; font-size: 1.5rem; }
    .category-status { margin-top: 1.25rem; color: #0e7490; font-size: .78rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
    .coming-soon .category-status { color: #64748b; }
    h2 { margin: .6rem 0 .75rem; color: #1e3a8a; font-size: 1.35rem; line-height: 1.25; }
    .interview-category-card p { flex: 1; margin: 0; color: #64748b; line-height: 1.7; }
    .category-link { margin-top: 1.5rem; color: #1d4ed8; font-weight: 700; }
    .category-link i { margin-left: .3rem; }
    .interview-seo-content { max-width: 58rem; margin: 3.5rem auto 0; padding: 2rem; border: 1px solid #e2e8f0; border-radius: 1.25rem; background: #ffffff; box-shadow: 0 10px 25px rgba(15, 23, 42, .05); }
    .interview-seo-content h2 { margin-top: 0; }
    .interview-seo-content p, .interview-seo-content li { color: #475569; line-height: 1.75; }
    .interview-seo-content ul { margin: 1rem 0; padding-left: 1.25rem; }
    .interview-seo-content a { color: #1d4ed8; font-weight: 700; }
    @media (max-width: 991.98px) { .interview-category-grid { grid-template-columns: 1fr; max-width: 40rem; margin: 0 auto; } }
    @media (max-width: 575.98px) { .interview-landing { padding-top: 2rem; } .interview-close { left: .75rem; } .interview-landing-header { margin-top: 4.5rem; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewLandingComponent {}
