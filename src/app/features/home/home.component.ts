import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface CourseCard {
  readonly name: string;
  readonly route: string;
  readonly icon: string;
  readonly iconUrl?: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly accent: string;
  readonly available: boolean;
  readonly enrollmentOnly?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly enrollmentOptions = ['Java', 'Spring Boot', 'Microservices', 'Design Patterns', 'Focused Java Topics', 'Real-time Project Execution for Freshers', 'Architecture Guidance', 'AWS Course', 'Interview Preparation Tips', 'AI Assistance Tools and Tech Stack Guidance', 'Project Review or Mock Interview', 'One-to-One Mentoring'];
  readonly enrollmentDurations: Readonly<Record<string, string>> = { Java: '4 weekends · 40 hours', 'Spring Boot': '4 weekends · 40 hours', Microservices: '4 weekends · 40 hours', 'Design Patterns': '2 weekends · 20 hours', 'Focused Java Topics': '1 weekend · 10 hours', 'Real-time Project Execution for Freshers': '4 weekends · 40 hours', 'Architecture Guidance': '2 weekends · 20 hours', 'AWS Course': '4 weekends · 40 hours', 'Interview Preparation Tips': '2 weekends · 20 hours', 'AI Assistance Tools and Tech Stack Guidance': '2 weekends · 20 hours', 'Project Review or Mock Interview': '1 session', 'One-to-One Mentoring': '1 hour' };
  private readonly formBuilder = inject(FormBuilder);
  readonly enrollmentForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, Validators.pattern(/^[+]?[0-9][0-9\s-]{7,14}$/)]],
    email: ['', [Validators.required, Validators.email]],
    termsAccepted: [false, Validators.requiredTrue]
  });
  selectedCourse = '';
  selectedEnrollmentCourse = '';
  selectedCourseDetails = '';
  isEnrollmentOpen = false;
  enrollmentMessage = '';
  get selectedEnrollmentDuration(): string { return this.enrollmentDurations[this.selectedEnrollmentCourse] ?? ''; }
  readonly courses: readonly CourseCard[] = [
    { name: 'Java', route: '/java-tutorial-overview', icon: 'bi bi-cup-hot-fill', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', eyebrow: 'Core programming', description: 'Master Java fundamentals, OOP, collections, concurrency, IO, networking, and JDBC.', accent: '#2563eb', available: true },
    { name: 'Python', route: '/python-tutorial', icon: 'bi bi-code-slash', eyebrow: 'Programming fundamentals', description: 'Learn Python syntax, data types, control flow, functions, collections, files, and practical application development.', accent: '#0f766e', available: true },
    { name: 'Spring Boot', route: '/spring-boot-overview', icon: 'bi bi-leaf-fill', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', eyebrow: 'Backend development', description: 'Build APIs for production with web, data, security, testing, and deployment lessons.', accent: '#16a34a', available: true },
    { name: 'Hibernate', route: '/hibernate-tutorial', icon: 'bi bi-database-fill-gear', eyebrow: 'Java persistence', description: 'Understand ORM, entities, relationships, fetching, caching, queries, and transaction management.', accent: '#ca8a04', available: true },
    { name: 'MySQL', route: '/mysql', icon: 'bi bi-database-fill', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', eyebrow: 'Relational database', description: 'Learn MySQL SQL, database design, joins, constraints, views, stored procedures, and secure application practices.', accent: '#0891b2', available: true },
    { name: 'PostgreSQL', route: '/postgresql/introduction', icon: 'bi bi-server', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', eyebrow: 'Advanced SQL', description: 'Learn PostgreSQL queries, data modeling, joins, aggregation, schema changes, and production database practices.', accent: '#7c3aed', available: true },
    { name: 'Angular', route: '/angular', icon: 'bi bi-braces', eyebrow: 'Frontend development', description: 'Learn Angular components, routing, services, forms, and responsive application development with practical examples.', accent: '#dc2626', available: true },
    { name: 'Interviews', route: '/interviews', icon: 'bi bi-person-workspace', eyebrow: 'Interview preparation', description: 'Build confidence with technical, manager, and company questions plus focused practice for your next opportunity.', accent: '#7c3aed', available: true },
    { name: 'Design Patterns', route: '/design-patterns', icon: 'bi bi-diagram-3-fill', eyebrow: 'Software architecture', description: 'Learn reusable solutions for creating flexible, testable, and maintainable object-oriented applications.', accent: '#1e3a8a', available: true },
    { name: 'Weekend Batch Enrollment', route: '/java-tutorial-overview', icon: 'bi bi-calendar2-week-fill', eyebrow: 'Live weekend learning', description: 'Build Java, Spring Boot, AWS, and AI projects with live guidance, mentor feedback, reviews, and interview practice.', accent: '#ea580c', available: true, enrollmentOnly: true },
    { name: 'Spring AI', route: '/spring-ai', icon: 'bi bi-stars', eyebrow: 'AI application development', description: 'Build AI features in Java with Spring AI, prompts, models, RAG, and patterns for production.', accent: '#0f766e', available: false }
  ];

  openEnrollment(course: CourseCard): void {
    this.selectedCourse = course.name;
    this.selectedEnrollmentCourse = course.enrollmentOnly ? this.enrollmentOptions[0] : course.name;
    this.selectedCourseDetails = course.description;
    this.enrollmentMessage = '';
    this.enrollmentForm.reset();
    this.isEnrollmentOpen = true;
  }

  openWeekendEnrollment(): void {
    const weekendCourse = this.courses.find((course) => course.enrollmentOnly);
    if (weekendCourse) this.openEnrollment(weekendCourse);
  }

  closeEnrollment(): void { this.isEnrollmentOpen = false; }

  submitEnrollment(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }
    const { fullName, mobile, email } = this.enrollmentForm.getRawValue();
    const courseDetails = this.selectedCourse === 'Weekend Batch Enrollment' ? '' : `\nCourse details: ${this.selectedCourseDetails}`;
    const message = encodeURIComponent(`Course enrollment request\nCourse: ${this.selectedEnrollmentCourse}\nDuration: ${this.selectedEnrollmentDuration}${courseDetails}\nFull name: ${fullName}\nMobile: ${mobile}\nEmail: ${email}\nTerms accepted: Yes`);
    window.open(`https://wa.me/919390416489?text=${message}`, '_blank', 'noopener');
    this.enrollmentMessage = 'WhatsApp is opening with the enrollment details.';
  }
}
