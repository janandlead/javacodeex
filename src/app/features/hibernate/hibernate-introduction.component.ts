import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-introduction',
  standalone: true,
  template: `
    <article class="hibernate-page container-xl">
      <section class="page-hero" aria-labelledby="hibernate-title">
        <p class="eyebrow">Java Persistence</p>
        <h1 id="hibernate-title">Hibernate Tutorial</h1>
        <p class="lead">Learn Hibernate ORM from the fundamentals with clear explanations and practical examples.</p>
      </section>

      <section class="section-card" aria-labelledby="hibernate-framework">
        <h2 id="hibernate-framework">Hibernate Framework</h2>
        <p>Hibernate is an open-source, lightweight Java ORM framework that simplifies application development when working with relational databases. It maps Java objects to database tables and manages much of the persistence work for you.</p>
        <p>Hibernate originated in 2001, led by Gavin King, as an alternative to EJB2-style entity beans. Today, Hibernate is one of the most widely used implementations of the Jakarta Persistence specification.</p>
      </section>

      <section class="section-card" aria-labelledby="orm-tool">
        <h2 id="orm-tool">What Is an ORM Tool?</h2>
        <p>Object-Relational Mapping (ORM) is a programming technique that maps objects in an application to rows and tables in a relational database.</p>
        <table class="table table-bordered"><thead><tr><th>Java application</th><th>Relational database</th></tr></thead><tbody><tr><td>Class</td><td>Table</td></tr><tr><td>Object</td><td>Row</td></tr><tr><td>Field</td><td>Column</td></tr><tr><td>Relationship</td><td>Foreign-key relationship</td></tr></tbody></table>
        <p>Hibernate uses JDBC internally to communicate with the database, while providing entity mapping, query support, transactions, dirty checking, and caching at a higher level.</p>
      </section>

      <section class="section-card" aria-labelledby="jpa">
        <h2 id="jpa">What Is JPA?</h2>
        <p>JPA, now called Jakarta Persistence, is a specification that defines a standard API and annotations for persistence in Java. Hibernate is a popular implementation of that specification; JPA is the contract, while Hibernate is the provider that performs the work.</p>
        <div class="info-box"><strong>Package note:</strong> older JPA 2 applications use <code>javax.persistence</code>. Modern Jakarta Persistence applications use <code>jakarta.persistence</code>. The correct package depends on the application and framework version.</div>
        <pre>import jakarta.persistence.Entity;
import jakarta.persistence.Id;

&#64;Entity
public class Employee &#123;
    &#64;Id
    private Long id;
    private String name;
&#125;</pre>
      </section>

      <section class="section-card" aria-labelledby="advantages">
        <h2 id="advantages">Advantages of Hibernate</h2>
        <h3>Open Source and Lightweight</h3>
        <p>Hibernate is open source and can be added as a library to Java applications. It reduces repetitive JDBC mapping code while leaving application code focused on domain behavior.</p>
        <h3>Fast Performance with Caching</h3>
        <p>Hibernate supports a first-level cache associated with the persistence context and optional second-level caching. The first-level cache is enabled by default. Caching should still be configured and measured carefully for the workload.</p>
        <h3>Database-Independent Queries</h3>
        <p>HQL and JPQL query entities and their properties rather than database-specific table details. Hibernate translates them to SQL for the configured database, which can reduce database portability work.</p>
        <pre>String hql = "from Employee e where e.department = :department";
List&lt;Employee&gt; employees = session
    .createQuery(hql, Employee.class)
    .setParameter("department", "Engineering")
    .getResultList();</pre>
        <h3>Schema Generation Support</h3>
        <p>Hibernate can create or update database schemas in development through configuration. Production systems should usually use a versioned migration tool such as Flyway or Liquibase instead of relying on automatic schema updates.</p>
        <h3>Simplifies Complex Joins</h3>
        <p>Entity relationships allow applications to navigate related data through objects. Fetch joins and carefully designed queries can load related data efficiently, while avoiding unnecessary eager loading.</p>
        <h3>Query Statistics and Database Visibility</h3>
        <p>Hibernate can expose statistics such as query counts, entity operations, cache activity, and session behavior. These metrics help diagnose slow queries, N+1 query problems, and inefficient persistence workflows.</p>
      </section>

      <section class="section-card" aria-labelledby="workflow">
        <h2 id="workflow">How Hibernate Fits in an Application</h2>
        <div class="flow"><span>Entity objects</span><b>→</b><span>Hibernate Session / EntityManager</span><b>→</b><span>JDBC</span><b>→</b><span>Database</span></div>
        <p>Applications typically define entities, obtain a persistence context, perform work inside a transaction, and let Hibernate flush changes as SQL. The persistence context tracks managed objects and performs dirty checking before flush or commit.</p>
      </section>

    </article>
  `,
  styles: [`
    .hibernate-page{max-width:82.5rem;padding:1.5rem 1rem 4rem;color:#334155}.hibernate-page .page-hero{margin:0 auto 1.5rem;padding:2.5rem clamp(1.5rem,4vw,2.5rem);border-radius:1rem;background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.18),transparent 28%),linear-gradient(135deg,#0b1220,#172554 62%,#164e63);color:#fff;box-shadow:0 .75rem 2rem rgba(15,23,42,.12)}.hibernate-page .eyebrow{color:#67e8f9;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.hibernate-page h1{margin:.5rem 0 1rem;color:#fff;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:54rem;margin:0;color:#dbeafe;font-size:1.15rem;line-height:1.8}.hibernate-page .section-card{width:100%;max-width:none;margin:0 0 1.5rem;padding:2rem clamp(1rem,3vw,3rem);border:1px solid rgba(226,232,240,.9);border-radius:1.125rem;background:#fff;box-shadow:0 .75rem 2rem rgba(16,24,40,.08)}.hibernate-page h2{margin:0 0 1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.hibernate-page h3{margin-top:1.7rem;color:#0f766e}.hibernate-page p,.hibernate-page li{line-height:1.8}.hibernate-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.hibernate-page code{color:#be123c}.hibernate-page pre code{color:inherit}.hibernate-page .info-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.hibernate-page .flow{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff}.hibernate-page .flow span{padding:.7rem 1rem;border:1px solid #7dd3fc;border-radius:.6rem;background:#fff;color:#0f3460;font-weight:700}.hibernate-page .flow b{color:#0891b2;font-size:1.4rem}@media(max-width:600px){.hibernate-page{padding-inline:.5rem}.hibernate-page .page-hero{padding:1.5rem}.hibernate-page .section-card{padding:1.25rem}.hibernate-page .flow b{transform:rotate(90deg)}}
  `]
})
export class HibernateIntroductionComponent {}
