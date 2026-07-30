import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type ProgramKey = 'corporate' | 'java' | 'spring' | 'ai' | 'bootcamp' | 'trainer' | 'brochure';

interface ProgramPage {
  readonly key: ProgramKey;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly audience: string;
  readonly outcomes: readonly string[];
  readonly modules: readonly string[];
  readonly duration: string;
  readonly href: string;
}

interface TrainerProfile {
  readonly initials: string;
  readonly name: string;
  readonly role: string;
  readonly summary: string;
  readonly expertise: readonly string[];
}

const trainers: readonly TrainerProfile[] = [
  { initials: 'A', name: 'Anand', role: 'Founder and Lead Java Trainer', summary: 'Java developer, Spring Boot specialist, technical educator, and mentor focused on practical backend development.', expertise: ['Java', 'Spring Boot', 'Microservices', 'System design', 'AI-assisted development'] },
  { initials: 'JP', name: 'Java Platform Trainer', role: 'Core Java and Backend Specialist', summary: 'Helps engineering teams strengthen Java fundamentals, clean coding practices, concurrency, testing, and maintainable application design.', expertise: ['Core Java', 'OOP', 'Collections', 'Concurrency', 'Clean code'] },
  { initials: 'SA', name: 'Spring & AI Trainer', role: 'Spring Boot and Developer Productivity Specialist', summary: 'Guides teams through production-ready APIs, testing, observability, and responsible AI-assisted development workflows.', expertise: ['Spring Boot', 'REST APIs', 'Testing', 'Observability', 'AI workflows'] }
];

const programs: Record<Exclude<ProgramKey, 'trainer' | 'brochure'>, ProgramPage> = {
  corporate: { key: 'corporate', eyebrow: 'Corporate learning programs', title: 'Corporate Java Training That Turns Concepts Into Delivery', intro: 'Upskill engineering teams with practical Java, Spring Boot, architecture, database, testing, and AI-assisted development programs tailored to your product and delivery goals.', audience: 'Engineering teams, technology leaders, freshers, and developers moving into backend roles.', outcomes: ['A curriculum mapped to your team’s current skill level and product context.', 'Hands-on work with production-style APIs, databases, testing, and deployment.', 'Trainer-led code reviews, Q&A, exercises, and a clear post-training roadmap.', 'Flexible delivery for onsite, live online, hybrid, bootcamp, or weekend formats.'], modules: ['Core Java and clean coding', 'Spring Boot and REST API development', 'JPA, SQL, and database integration', 'Testing, security, and production readiness', 'AI tools for responsible developer productivity', 'Architecture, microservices, and system design'], duration: 'Custom one-day, multi-day, or multi-week programs', href: '/corporate-training' },
  java: { key: 'java', eyebrow: 'Corporate Java Training', title: 'Corporate Java Training for Stronger Engineering Fundamentals', intro: 'Give developers a practical Java foundation they can use to write clearer, safer, and more maintainable production code.', audience: 'Java developers, freshers, backend engineers, and teams standardizing development practices.', outcomes: ['Improve object-oriented design and code readability.', 'Use collections, generics, exceptions, concurrency, and I/O with confidence.', 'Understand JVM fundamentals, performance considerations, and debugging habits.', 'Apply clean coding, review, testing, and team collaboration practices.'], modules: ['Java language and OOP', 'Collections, generics, and streams', 'Exceptions, I/O, and testing', 'Concurrency and JVM fundamentals', 'Design patterns and clean architecture', 'Hands-on team project and review'], duration: 'One to five days, or a structured multi-week bootcamp', href: '/corporate-java-training' },
  spring: { key: 'spring', eyebrow: 'Spring Boot Corporate Training', title: 'Spring Boot Corporate Training for Production-Ready APIs', intro: 'Train your team to design, build, test, secure, and deploy maintainable Spring Boot services with practical project work.', audience: 'Java backend teams, Spring developers, API engineers, and technical leads.', outcomes: ['Build layered REST APIs with clear responsibilities.', 'Integrate JPA, SQL, validation, security, caching, and observability.', 'Test services with unit, integration, and API-level strategies.', 'Make better production decisions around deployment, errors, and performance.'], modules: ['Spring Boot fundamentals and configuration', 'REST API design and validation', 'Spring Data JPA and transactions', 'Security, authentication, and authorization', 'Testing, exception handling, and documentation', 'Deployment, Actuator, caching, and performance'], duration: 'Two to five days, with optional project mentoring', href: '/spring-boot-corporate-training' },
  ai: { key: 'ai', eyebrow: 'AI Training for Developers', title: 'AI Training for Developers Who Build With Java', intro: 'Help developers use AI coding assistants thoughtfully for discovery, implementation, testing, debugging, documentation, and review without losing engineering judgment.', audience: 'Software developers, technical leads, QA engineers, and teams adopting AI-assisted development.', outcomes: ['Write useful prompts for code, tests, explanations, and refactoring.', 'Review generated output for correctness, security, licensing, and maintainability.', 'Use AI to accelerate Spring Boot APIs, tests, documentation, and debugging.', 'Create team guidelines for responsible and repeatable AI-assisted work.'], modules: ['AI-assisted development workflows', 'Prompting for Java and Spring Boot', 'Test generation and debugging', 'Code review and security checks', 'Documentation and knowledge workflows', 'Responsible adoption and team playbooks'], duration: 'One or two days, or an AI adoption workshop series', href: '/ai-training-for-developers' },
  bootcamp: { key: 'bootcamp', eyebrow: 'Java Bootcamp India', title: 'Java Bootcamp India for Career-Ready Developers', intro: 'A structured, project-led Java and backend bootcamp for learners and teams in India who want guided practice, feedback, and interview preparation.', audience: 'Graduates, freshers, career switchers, and employers developing an entry-level engineering pipeline.', outcomes: ['Build a strong Java and SQL foundation through guided practice.', 'Develop and explain a complete backend project.', 'Learn Spring Boot, APIs, databases, testing, and deployment fundamentals.', 'Prepare for technical interviews with practical questions and code reviews.'], modules: ['Java and object-oriented programming', 'SQL, JDBC, and database design', 'Spring Boot REST services', 'Testing, Git, and deployment basics', 'Project execution and review', 'Interview and communication preparation'], duration: 'Four to eight weeks, with weekday or weekend delivery', href: '/java-bootcamp-india' }
};

@Component({
  selector: 'app-corporate-pages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './corporate-pages.component.html',
  styleUrl: './corporate-pages.component.scss'
})
export class CorporatePagesComponent {
  private readonly route = inject(ActivatedRoute);
  readonly pageKey = (this.route.snapshot.data['corporatePage'] ?? 'corporate') as ProgramKey;
  readonly page = programs[this.pageKey as keyof typeof programs] ?? programs.corporate;
  readonly programLinks = [programs.java, programs.spring, programs.ai, programs.bootcamp];
  readonly trainers = trainers;
  readonly faqs = [
    ['Can training be customized for our team?', 'Yes. We can adapt the depth, examples, project, pace, and assessment around your stack, developer experience, and delivery goals.'],
    ['Do you deliver training online or onsite?', 'Programs can be delivered live online, onsite, hybrid, or as a structured weekend bootcamp.'],
    ['Can you train teams on a real project?', 'Yes. A project or representative workflow can be used for exercises, code reviews, architecture discussions, and the final agenda.'],
    ['How do we discuss pricing and availability?', 'Use the corporate demo form with your team size, preferred topics, and timeline. The team will reply with suitable options.']
  ] as const;
}
