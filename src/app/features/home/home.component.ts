import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CourseCard {
  readonly name: string;
  readonly route: string;
  readonly icon: string;
  readonly iconUrl?: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly accent: string;
  readonly available: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly courses: readonly CourseCard[] = [
    { name: 'Java', route: '/java', icon: 'bi bi-cup-hot-fill', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', eyebrow: 'Core programming', description: 'Master Java fundamentals, OOP, collections, concurrency, IO, networking, and JDBC.', accent: '#2563eb', available: true },
    { name: 'Spring Boot', route: '/spring-boot', icon: 'bi bi-leaf-fill', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', eyebrow: 'Backend development', description: 'Build production-ready APIs with web, persistence, security, testing, and deployment.', accent: '#16a34a', available: true },
    { name: 'Hibernate', route: '/hibernate', icon: 'bi bi-database-fill-gear', eyebrow: 'Java persistence', description: 'Understand ORM, entities, relationships, fetching, caching, queries, and transaction management.', accent: '#ca8a04', available: false },
    { name: 'MySQL', route: '/mysql', icon: 'bi bi-database-fill', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', eyebrow: 'Relational database', description: 'Learn SQL, schema design, joins, indexing, transactions, and practical database operations.', accent: '#0891b2', available: false },
    { name: 'PostgreSQL', route: '/postgresql', icon: 'bi bi-server', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', eyebrow: 'Advanced SQL', description: 'Explore PostgreSQL features, reliable data modeling, queries, performance, and production practices.', accent: '#7c3aed', available: false },
    { name: 'Design Patterns', route: '/design-patterns', icon: 'bi bi-diagram-3-fill', eyebrow: 'Software architecture', description: 'Learn reusable solutions for creating flexible, testable, and maintainable object-oriented applications.', accent: '#1e3a8a', available: true },
    { name: 'Spring AI', route: '/spring-ai', icon: 'bi bi-stars', eyebrow: 'AI application development', description: 'Build practical AI features in Java with Spring AI, prompts, models, RAG, and production-ready patterns.', accent: '#0f766e', available: false }
  ];
}
