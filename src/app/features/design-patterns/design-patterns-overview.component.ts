import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-design-patterns-overview',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="patterns-overview container-xl">
      <article class="patterns-document">
        <section class="overview-hero" aria-labelledby="what-are-patterns">
          <h1 id="what-are-patterns">What Are Design Patterns in Java?</h1>
          <p>A design pattern is not a complete program or ready-made code. It is a reusable design approach that explains how classes and objects can work together to solve a specific problem.</p>
          <p>Java design patterns help developers reduce tightly coupled code, organize responsibilities, and build software that is easier to understand, test, extend, and maintain.</p>
        </section>

        <section class="document-section section-card" aria-labelledby="pattern-types">
          <h2 id="pattern-types">Types of Java Design Patterns</h2>
          <p>The classic Gang of Four design patterns are grouped according to the type of software design problem they solve.</p>
          <ul class="check-list">
            <li><strong>Creational patterns:</strong> manage object creation and initialization.</li>
            <li><strong>Structural patterns:</strong> explain how classes and objects can be combined.</li>
            <li><strong>Behavioral patterns:</strong> define how objects communicate and share responsibilities.</li>
          </ul>
        </section>

        <section class="document-section section-card" aria-labelledby="why-patterns">
          <h2 id="why-patterns">Benefits of Using Design Patterns</h2>
          <ul class="check-list">
            <li>Improve code reusability and reduce duplicate logic.</li>
            <li>Make applications easier to extend and maintain.</li>
            <li>Encourage object-oriented programming best practices.</li>
            <li>Simplify complex application design and testing.</li>
            <li>Support enterprise applications, Spring Boot, microservices, and system design.</li>
          </ul>
        </section>

        <section class="document-section section-card lessons-section" aria-labelledby="available-lessons">
          <div class="section-heading">
            <div>
              <span class="section-label">Course roadmap</span>
              <h2 id="available-lessons">Available Java Design Pattern Lessons</h2>
            </div>
            <i class="bi bi-journal-code" aria-hidden="true"></i>
          </div>
          <p>Choose a pattern family below. Each lesson includes a clear definition, Java example, benefits, trade-offs, and real-world use cases.</p>

          <section class="lesson-group creational-group" aria-labelledby="creational-title">
            <h2 id="creational-title">Creational Design Patterns</h2>
            <p>Creational patterns focus on how objects are created. They are useful when object construction depends on configuration, input, dependencies, or reusable templates.</p>
            <p>In simple applications, developers may create objects directly using the <code>new</code> keyword.</p>
            <pre><code>PaymentService paymentService = new PaymentService();</code></pre>
            <p>This approach is acceptable for simple cases. However, object creation may become complex when an application has multiple implementations, configuration options, dependencies, or initialization rules.</p>
            <p>Creational patterns move object creation logic away from the main business logic. This makes the code more flexible and easier to maintain.</p>
            <ul class="lesson-links">
              <li><a routerLink="/design-patterns/singleton"><strong>Singleton Design Pattern</strong><span>Control instance creation and manage a shared object carefully.</span></a></li>
              <li><a routerLink="/design-patterns/factory-method"><strong>Factory Method</strong><span>Create objects without tightly coupling code to concrete classes.</span></a></li>
              <li><a routerLink="/design-patterns/abstract-factory"><strong>Abstract Factory</strong><span>Create families of related objects consistently.</span></a></li>
              <li><a routerLink="/design-patterns/builder"><strong>Builder</strong><span>Construct complex objects step by step with readable code.</span></a></li>
              <li><a routerLink="/design-patterns/prototype"><strong>Prototype</strong><span>Create new objects by copying an existing configured object.</span></a></li>
            </ul>
          </section>

          <section class="lesson-group structural-group" aria-labelledby="structural-title">
            <h2 id="structural-title">Structural Design Patterns</h2>
            <p>Structural patterns explain how classes and objects can be connected to create larger, flexible structures without unnecessary coupling.</p>
            <ul class="lesson-links">
              <li><a routerLink="/design-patterns/adapter"><strong>Adapter</strong><span>Connect incompatible interfaces from new, legacy, or third-party systems.</span></a></li>
              <li><a routerLink="/design-patterns/bridge"><strong>Bridge</strong><span>Separate an abstraction from its implementation so both can change independently.</span></a></li>
              <li><a routerLink="/design-patterns/composite"><strong>Composite</strong><span>Treat individual objects and groups of objects uniformly.</span></a></li>
              <li><a routerLink="/design-patterns/decorator"><strong>Decorator</strong><span>Add behavior dynamically without modifying the original class.</span></a></li>
              <li><a routerLink="/design-patterns/facade"><strong>Facade</strong><span>Provide a simple entry point to a complex subsystem.</span></a></li>
              <li><a routerLink="/design-patterns/flyweight"><strong>Flyweight</strong><span>Share common object data to reduce memory usage.</span></a></li>
              <li><a routerLink="/design-patterns/proxy"><strong>Proxy</strong><span>Control access to another object for security, caching, or lazy loading.</span></a></li>
            </ul>
          </section>

          <section class="lesson-group behavioral-group" aria-labelledby="behavioral-title">
            <h2 id="behavioral-title">Behavioral Design Patterns</h2>
            <p>Behavioral patterns define how objects communicate, share responsibilities, process requests, and change behavior at runtime.</p>
            <ul class="lesson-links">
              <li><a routerLink="/design-patterns/chain-of-responsibility"><strong>Chain of Responsibility</strong><span>Pass a request through a sequence of handlers until one can process it.</span></a></li>
              <li><a routerLink="/design-patterns/command"><strong>Command</strong><span>Turn an action into an object that can be queued, logged, or undone.</span></a></li>
              <li><a routerLink="/design-patterns/interpreter"><strong>Interpreter</strong><span>Represent and evaluate simple expressions or domain rules.</span></a></li>
              <li><a routerLink="/design-patterns/iterator"><strong>Iterator</strong><span>Traverse a collection without exposing its internal structure.</span></a></li>
              <li><a routerLink="/design-patterns/mediator"><strong>Mediator</strong><span>Centralize communication between objects and reduce direct dependencies.</span></a></li>
              <li><a routerLink="/design-patterns/memento"><strong>Memento</strong><span>Save and restore object state for undo and rollback features.</span></a></li>
              <li><a routerLink="/design-patterns/observer"><strong>Observer</strong><span>Notify registered subscribers automatically when a subject changes.</span></a></li>
              <li><a routerLink="/design-patterns/state"><strong>State</strong><span>Change an object’s behavior when its internal state changes.</span></a></li>
              <li><a routerLink="/design-patterns/strategy"><strong>Strategy</strong><span>Select interchangeable algorithms at runtime.</span></a></li>
              <li><a routerLink="/design-patterns/template-method"><strong>Template Method</strong><span>Define an algorithm structure while allowing selected steps to vary.</span></a></li>
              <li><a routerLink="/design-patterns/visitor"><strong>Visitor</strong><span>Add operations to a stable object structure without changing its classes.</span></a></li>
            </ul>
          </section>
        </section>

        <section class="document-section section-card" aria-labelledby="spring-boot-patterns">
          <h2 id="spring-boot-patterns">Design Patterns in Spring Boot</h2>
          <p>Spring Boot uses design patterns throughout dependency injection, web development, data access, security, and application monitoring.</p>
          <ul class="check-list">
            <li><strong>Singleton:</strong> Spring beans use Singleton scope by default.</li>
            <li><strong>Factory:</strong> BeanFactory and ApplicationContext create and manage objects.</li>
            <li><strong>Proxy:</strong> Spring AOP applies transactions, security, logging, and caching.</li>
            <li><strong>Template Method:</strong> JdbcTemplate and TransactionTemplate provide reusable workflows.</li>
            <li><strong>Observer:</strong> Spring application events notify listeners through <code>&#64;EventListener</code>.</li>
            <li><strong>Strategy:</strong> Security, validation, serialization, and injection use interchangeable strategies.</li>
          </ul>
        </section>

        <section class="document-section section-card" aria-labelledby="real-world-examples">
          <h2 id="real-world-examples">Real-World Examples</h2>
          <p>Java design patterns appear in everyday enterprise and backend systems. A payment application can use Strategy to switch payment methods, Adapter to connect an external gateway, and Facade to simplify order processing.</p>
          <p>Spring Boot applications commonly use Singleton beans, Proxy-based transactions and security, Observer-style application events, and Template Method utilities such as <code>JdbcTemplate</code>. These patterns help teams build APIs, microservices, workflows, notification systems, and scalable business applications.</p>
        </section>

        <section class="document-section section-card" aria-labelledby="how-to-choose">
          <h2 id="how-to-choose">How to Choose the Right Design Pattern</h2>
          <ol>
            <li>Is the problem related to object creation, structure, or behavior?</li>
            <li>Do multiple implementations exist or must behavior change at runtime?</li>
            <li>Are incompatible interfaces, undo, state restoration, or access control involved?</li>
            <li>Would a simpler solution solve the requirement with less complexity?</li>
          </ol>
          <p>Use a pattern only when it solves a real problem. A good design pattern makes the code clearer, easier to test, and easier to extend instead of adding unnecessary abstraction.</p>
        </section>

        <section class="document-section section-card" aria-labelledby="faq">
          <h2 id="faq">Frequently Asked Questions</h2>
          <h3>What are Design Patterns in Java?</h3>
          <p>They are reusable approaches for solving common object-oriented software design problems in Java applications.</p>
          <h3>How many classic design patterns are commonly recognized?</h3>
          <p>The Gang of Four book describes 23 classic patterns grouped into Creational, Structural, and Behavioral categories.</p>
          <h3>Which design patterns are common in Spring Boot?</h3>
          <p>Spring Boot commonly uses Singleton, Factory, Proxy, Template Method, Observer, Strategy, and dependency injection techniques.</p>
          <h3>Should every application use design patterns?</h3>
          <p>No. Choose a pattern only when it makes a real design problem easier to solve, test, explain, or extend.</p>
        </section>
      </article>
    </article>
  `,
  styles: [`
    .patterns-overview{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}
    .patterns-document{max-width:82.5rem;margin:0 auto;padding:1rem clamp(1rem,3vw,3rem) 3rem}
    .overview-hero{margin:0 -1rem 2.5rem;padding:clamp(2.5rem,6vw,4rem) clamp(1.25rem,4vw,3.5rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(244,114,182,.22),transparent 28%),linear-gradient(135deg,#1e1033,#4a154d 58%,#164e63);box-shadow:0 1rem 2.5rem rgba(30,16,51,.18)}
    .eyebrow,.section-label{color:#be185d;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.overview-hero .eyebrow{color:#f9a8d4}.overview-hero h1{margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.overview-hero p{max-width:64rem;margin:0;color:#fce7f3;font-size:clamp(1.05rem,2vw,1.25rem);line-height:1.75}
    .document-section{margin:0 0 1.5rem}.section-card{padding:2rem clamp(1rem,3vw,3rem);border:1px solid rgba(226,232,240,.9);border-radius:1.125rem;background:#fff;box-shadow:0 .75rem 2rem rgba(16,24,40,.08)}.document-section h1{margin:0 0 1rem;padding-left:.85rem;border-left:4px solid #06b6d4;color:#1e3a8a;font-size:clamp(2rem,4vw,3rem);line-height:1.2}.document-section h2{margin:0 0 1rem;padding-left:.85rem;border-left:4px solid #06b6d4;color:#1e3a8a;font-size:clamp(1.55rem,2.5vw,2.15rem)}.document-section h3{margin:0;color:#1e3a8a;font-size:1.35rem}.document-section p,.document-section li{color:#334155;line-height:1.8}.document-section code{padding:.1rem .3rem;border-radius:.25rem;color:#be123c;background:#fff1f2}.check-list{display:grid;gap:.55rem;padding-left:1.35rem}.check-list li::marker{color:#16a34a}
    .section-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.section-heading>i{color:#0891b2;font-size:2rem}.lessons-section{padding:clamp(1.25rem,3vw,2rem);border:1px solid #dbeafe;border-radius:1rem;background:#f8fbff}.lesson-group{margin-top:2rem;padding-top:1.5rem;border-top:1px solid #dbeafe}.lesson-group:first-of-type{margin-top:1.5rem;border-top:0}.lesson-group h2{display:flex;align-items:center;gap:.6rem;margin:0 0 1rem;padding:0;border:0;font-size:1.5rem}.lesson-group h2::before{width:.65rem;height:.65rem;border-radius:50%;background:#06b6d4;content:""}.creational-group h2::before{background:#db2777}.behavioral-group h2::before{background:#16a34a}.lesson-group pre{margin:1rem 0;padding:1rem 1.15rem;overflow:auto;border:1px solid #1e293b;border-radius:.7rem;background:#0f172a;color:#e2e8f0;font: .9rem/1.7 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.lesson-group pre code{padding:0;color:inherit;background:transparent}.lesson-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem;margin:1rem 0 0;padding:0;list-style:none}.lesson-links a{display:flex;min-height:5.5rem;flex-direction:column;justify-content:center;gap:.25rem;padding:.8rem 1rem;border:1px solid #dbeafe;border-radius:.7rem;color:#1e3a8a;background:#fff;text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}.lesson-links a:hover{border-color:#38bdf8;box-shadow:0 .45rem 1rem rgba(14,116,144,.12);transform:translateY(-2px)}.lesson-links strong{font-size:.95rem}.lesson-links span{color:#64748b;font-size:.82rem;line-height:1.5}.document-section ol{padding-left:1.5rem}
    @media(max-width:767.98px){.patterns-overview{width:min(100% - 1rem,82.5rem)}.patterns-document{padding:1rem}.overview-hero{margin:0 -.25rem 2rem;padding:2rem 1.25rem}.lesson-links{grid-template-columns:1fr}.section-heading{align-items:flex-start}}
  `]
})
export class DesignPatternsOverviewComponent {}
