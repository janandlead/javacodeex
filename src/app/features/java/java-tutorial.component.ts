import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-java-tutorial',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="java-tutorial-page">
      <header class="java-tutorial-hero">
        <div class="container-xl">
          <p class="eyebrow">Java learning path</p>
          <h1>Java Tutorial for Beginners</h1>
          <p class="lead">Learn Java programming step by step with practical examples. This Java tutorial covers core Java, object-oriented programming, collections, exception handling, multithreading, Java 8 features, Java 17, Java 21, JVM concepts and interview preparation.</p>
        </div>
      </header>

      <section class="container-xl py-5" aria-labelledby="java-topics">
        <h2 id="java-topics">Learn Java from basics to advanced concepts</h2>
        <p class="intro">Follow the lessons in order or jump directly to the Java topic you need. Each guide includes explanations, runnable examples, and practical development notes.</p>
        <div class="row g-3">
          @for (topic of topics; track topic.route) {
            <div class="col-md-6 col-lg-4">
              <a class="topic-card" [routerLink]="topic.route">
                <span><strong>{{ topic.label }}</strong><small>{{ topic.description }}</small></span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          }
        </div>
      </section>

      <section class="container-xl pb-5" aria-labelledby="java-next-steps">
        <div class="next-steps">
          <h2 id="java-next-steps">Continue learning Java</h2>
          <p>Use the complete Java tutorial overview for the full curriculum, then explore Spring Boot and Java interview questions when you are ready to build and prepare for real-world development.</p>
          <a class="btn btn-primary" routerLink="/java-tutorial-overview">Open the Java tutorial overview</a>
          <a class="btn btn-outline-primary ms-2" routerLink="/interviews">Practice Java interview questions</a>
        </div>
      </section>
    </article>
  `,
  styles: [`
    .java-tutorial-hero{padding:5rem 0;background:linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff}
    .java-tutorial-hero h1{max-width:52rem;margin:.75rem 0 1rem;font-size:clamp(2.4rem,6vw,4.8rem);font-weight:850;letter-spacing:-.04em}
    .lead{max-width:50rem;color:#dbeafe;font-size:1.15rem;line-height:1.8}
    .eyebrow{color:#67e8f9;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
    h2{color:#1e3a8a;font-weight:800}.intro{max-width:52rem;color:#475569;line-height:1.8}
    .topic-card{display:flex;align-items:center;justify-content:space-between;gap:1rem;height:100%;padding:1.25rem;border:1px solid #dbeafe;border-radius:1rem;color:#1e3a8a;background:#fff;text-decoration:none;box-shadow:0 .5rem 1rem rgba(15,23,42,.06)}
    .topic-card:hover{transform:translateY(-2px);border-color:#06b6d4;color:#0891b2}.topic-card small{display:block;margin-top:.35rem;color:#64748b;line-height:1.5}
    .next-steps{padding:2rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff}.next-steps p{max-width:52rem;color:#475569;line-height:1.7}
  `]
})
export class JavaTutorialComponent {
  readonly topics = [
    { label: 'Java basics', route: '/introduction-to-java', description: 'Syntax, variables, types, and the JVM.' },
    { label: 'Object-oriented programming', route: '/java-oop-concepts', description: 'Classes, inheritance, interfaces, and polymorphism.' },
    { label: 'Java collections', route: '/java-collections', description: 'List, Set, Map, queues, and useful APIs.' },
    { label: 'Exception handling', route: '/java-exception-handling', description: 'Try-catch, custom exceptions, and best practices.' },
    { label: 'Multithreading', route: '/java-multithreading', description: 'Threads, executors, synchronization, and concurrency.' },
    { label: 'Java 8 features', route: '/java-8-features', description: 'Lambdas, streams, Optional, and functional interfaces.' },
    { label: 'JVM memory', route: '/java-memory-allocation', description: 'Stack, heap, garbage collection, and class loading.' },
    { label: 'Java JDBC', route: '/java-jdbc', description: 'Connect Java applications to relational databases.' },
    { label: 'Java interview preparation', route: '/interviews/java', description: 'Practice core Java and advanced interview questions.' }
  ] as const;
}
