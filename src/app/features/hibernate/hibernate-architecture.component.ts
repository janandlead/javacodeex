import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-architecture',
  standalone: true,
  template: `
    <article class="architecture-page container-xl">
      <p class="eyebrow">Hibernate Fundamentals</p>
      <h1>Hibernate Architecture</h1>
      <p class="lead">Understand the layers and core objects Hibernate uses to connect Java applications with relational databases.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">Hibernate Architecture Overview</h2>
        <p>Hibernate architecture is built from objects that coordinate object-relational mapping, database connections, transactions, queries, and persistence state. A Java application works with domain objects and Hibernate APIs, while Hibernate translates that work into JDBC calls and SQL.</p>
        <div class="architecture-flow"><span>Java application</span><b>→</b><span>Hibernate framework</span><b>→</b><span>JDBC / JTA / JNDI</span><b>→</b><span>Database</span></div>
      </section>

      <section aria-labelledby="layers">
        <h2 id="layers">Layers of Hibernate Architecture</h2>
        <p>Hibernate is commonly explained using four cooperating layers:</p>
        <div class="layer-grid">
          <article><strong>Java Application Layer</strong><p>The top layer contains Java classes, business logic, services, and user interactions. Application code uses Hibernate or Jakarta Persistence APIs to perform database operations.</p></article>
          <article><strong>Hibernate Framework Layer</strong><p>This layer contains ORM components such as <code>Session</code>, <code>SessionFactory</code>, <code>Transaction</code>, queries, mappings, and configuration. It manages the relationship between objects and relational data.</p></article>
          <article><strong>Back-End API Layer</strong><p>JDBC provides database connectivity. JTA can coordinate transactions in managed environments, and JNDI can locate configured resources. These APIs bridge Hibernate and infrastructure.</p></article>
          <article><strong>Database Layer</strong><p>The bottom layer is the relational database, such as MySQL, PostgreSQL, Oracle, or SQL Server. Hibernate reads, inserts, updates, and deletes data through the back-end APIs.</p></article>
        </div>
      </section>

      <section aria-labelledby="elements">
        <h2 id="elements">Elements of Hibernate Architecture</h2>
        <table class="table table-bordered"><thead><tr><th>Element</th><th>Responsibility</th><th>Typical lifetime</th></tr></thead><tbody>
          <tr><td><code>SessionFactory</code></td><td>Creates sessions and owns shared configuration and optional second-level cache.</td><td>Application-wide, expensive to create</td></tr>
          <tr><td><code>Session</code></td><td>Represents a unit of work and persistence context for loading and changing entities.</td><td>Short-lived, not thread-safe</td></tr>
          <tr><td><code>Transaction</code></td><td>Groups database work into an atomic commit or rollback boundary.</td><td>Per unit of work</td></tr>
          <tr><td><code>ConnectionProvider</code></td><td>Supplies and releases JDBC connections, often through a pool or DataSource.</td><td>Managed by Hibernate</td></tr>
          <tr><td><code>TransactionCoordinator</code></td><td>Integrates Hibernate transaction handling with JDBC or JTA transactions.</td><td>Managed internally</td></tr>
          <tr><td>Persistent object</td><td>An entity whose state is tracked by the current persistence context.</td><td>While attached to a session</td></tr>
        </tbody></table>
        <div class="info-box"><strong>Version note:</strong> older Hibernate material often calls this component <code>TransactionFactory</code>. Modern Hibernate versions use transaction coordination services and integrations rather than exposing that older factory as the central application concept.</div>
      </section>

      <section aria-labelledby="session-factory">
        <h2 id="session-factory">SessionFactory</h2>
        <p><code>SessionFactory</code> is a thread-safe, application-wide factory for Hibernate sessions. Building it reads mappings and configuration, so it should normally be created once and reused. It can also coordinate shared services and an optional second-level cache.</p>
        <pre>SessionFactory sessionFactory = ...;

try (Session session = sessionFactory.openSession()) &#123;
    // Perform one unit of work.
&#125;</pre>
      </section>

      <section aria-labelledby="session">
        <h2 id="session">Session</h2>
        <p>A <code>Session</code> represents a short-lived unit of work and contains the first-level cache, also called the persistence context. It loads entities, tracks changes, creates queries, and provides access to transactions. A session is not thread-safe; do not share one session across concurrent requests.</p>
        <pre>try (Session session = sessionFactory.openSession()) &#123;
    Employee employee = session.find(Employee.class, 101L);
    // employee is managed while it belongs to this session.
&#125;</pre>
      </section>

      <section aria-labelledby="transaction">
        <h2 id="transaction">Transaction</h2>
        <p>A transaction defines an atomic unit of database work. Successful work is committed; failures can be rolled back. In modern applications, transaction boundaries are often managed by Spring or JTA, but the same atomicity principle applies.</p>
        <pre>Transaction transaction = session.beginTransaction();
try &#123;
    session.persist(new Employee("Anand"));
    transaction.commit();
&#125; catch (RuntimeException exception) &#123;
    transaction.rollback();
    throw exception;
&#125;</pre>
      </section>

      <section aria-labelledby="connection-provider">
        <h2 id="connection-provider">ConnectionProvider</h2>
        <p><code>ConnectionProvider</code> abstracts how Hibernate obtains and releases JDBC connections. It can work with a configured DataSource or connection pool instead of requiring application code to call <code>DriverManager</code> directly. Keeping connection management behind this service improves portability and operational control.</p>
      </section>

      <section aria-labelledby="transaction-coordination">
        <h2 id="transaction-coordination">TransactionFactory and Transaction Coordination</h2>
        <p>Older Hibernate tutorials describe a <code>TransactionFactory</code> that creates transaction objects. Current Hibernate architecture uses transaction coordination services to integrate local JDBC transactions or JTA-managed transactions. Application developers should normally use the transaction API supplied by their Hibernate or Spring integration rather than constructing internal services.</p>
      </section>
      <section aria-labelledby="entity-states"><h2 id="entity-states">Hibernate Entity States</h2><p>An entity can move through four primary states: <strong>transient</strong>, <strong>persistent</strong>, <strong>detached</strong>, and <strong>removed</strong>. These states determine whether Hibernate manages the object, performs dirty checking, and synchronizes changes with the database.</p><pre>Transient -- persist() --&gt; Persistent -- detach(), clear(), close() --&gt; Detached -- merge() --&gt; Persistent -- remove() --&gt; Removed</pre></section>
      <section aria-labelledby="transient-state"><h2 id="transient-state">1. Transient State</h2><p>A transient entity is a normal Java object that is not associated with a Hibernate session or persistence context. Hibernate does not manage it, perform dirty checking for it, or automatically store its changes.</p><pre>Employee employee = new Employee();&#10;employee.setName("Anand");&#10;employee.setDepartment("Engineering");&#10;&#10;session.persist(employee); // Transient -&gt; Persistent</pre></section>
      <section aria-labelledby="persistent-state"><h2 id="persistent-state">2. Persistent State</h2><p>A persistent entity is associated with an active session and persistence context. Hibernate stores it in the first-level cache, tracks relationships, and detects changes through dirty checking.</p><pre>Employee employee = session.find(Employee.class, 1L);&#10;employee.setDepartment("Architecture");&#10;&#10;// Hibernate can flush:&#10;// UPDATE employee SET department = ? WHERE id = ?;</pre><p>An entity returned by <code>session.find()</code> or a Hibernate query is normally persistent while it remains associated with the session.</p></section>
      <section aria-labelledby="detached-state"><h2 id="detached-state">3. Detached State</h2><p>A detached entity was previously persistent but is no longer connected to an active persistence context. This happens when a session is closed or when <code>detach()</code>, <code>clear()</code>, or eviction is used.</p><pre>Employee employee = entityManager.find(Employee.class, 1L);&#10;entityManager.detach(employee);&#10;employee.setName("Updated Name"); // Not automatically saved&#10;&#10;Employee managed = entityManager.merge(employee);</pre><p><code>merge()</code> copies the detached object’s state into a managed object and returns that managed object. The original and returned references are generally different, so continue working with <code>managed</code>.</p></section>
      <section aria-labelledby="removed-state"><h2 id="removed-state">4. Removed State</h2><p>A removed entity is a managed entity scheduled for deletion. Hibernate usually sends the delete statement during flush or transaction commit.</p><pre>Employee employee = entityManager.find(Employee.class, 1L);&#10;entityManager.remove(employee);&#10;// DELETE FROM employee WHERE id = ?;</pre></section>
      <section aria-labelledby="state-comparison"><h2 id="state-comparison">Entity-State Comparison</h2><div class="table-responsive"><table class="table table-bordered"><thead><tr><th>State</th><th>Managed?</th><th>Database row</th><th>Dirty checking</th><th>Typical operation</th></tr></thead><tbody><tr><td>Transient</td><td>No</td><td>Usually no</td><td>No</td><td><code>new</code></td></tr><tr><td>Persistent</td><td>Yes</td><td>Existing or pending insert</td><td>Yes</td><td><code>persist()</code> or <code>find()</code></td></tr><tr><td>Detached</td><td>No</td><td>Usually yes</td><td>No</td><td><code>detach()</code> or session close</td></tr><tr><td>Removed</td><td>Yes until completion</td><td>Scheduled for deletion</td><td>Delete tracked</td><td><code>remove()</code></td></tr></tbody></table></div></section>
      <section aria-labelledby="dirty-checking"><h2 id="dirty-checking">Dirty Checking and Entity States</h2><p>Dirty checking works only for persistent entities. Hibernate compares a managed entity with its original state and generates the required update during flush.</p><pre>&#64;Transactional&#10;public void updateEmployee(Long employeeId) &#123;&#10;    Employee employee = entityManager.find(Employee.class, employeeId);&#10;    employee.setName("Updated Name");&#10;&#125;</pre><p>After <code>detach()</code>, changing the same object does not automatically update the database because Hibernate no longer manages it.</p></section>
      <section aria-labelledby="entity-operations"><h2 id="entity-operations">persist(), merge(), remove(), detach(), clear(), and refresh()</h2><div class="layer-grid"><article><strong><code>persist()</code></strong><p>Moves a transient object to persistent state.</p></article><article><strong><code>merge()</code></strong><p>Copies transient or detached state into a managed instance.</p></article><article><strong><code>remove()</code></strong><p>Marks a persistent entity for deletion.</p></article><article><strong><code>detach()</code></strong><p>Removes one entity from the persistence context.</p></article><article><strong><code>clear()</code></strong><p>Detaches every entity in the persistence context.</p></article><article><strong><code>refresh()</code></strong><p>Reloads the current entity state from the database.</p></article></div><p>For large batches, periodically call <code>flush()</code> and <code>clear()</code> to synchronize changes and limit first-level-cache growth.</p></section>

      <section aria-labelledby="lifecycle">
        <h2 id="lifecycle">A Typical Hibernate Request Lifecycle</h2>
        <ol><li>Application code receives a request and starts a unit of work.</li><li>A session is obtained from the shared SessionFactory.</li><li>A transaction begins.</li><li>Hibernate loads or persists entities through the session.</li><li>Dirty checking detects changes and Hibernate flushes SQL through JDBC.</li><li>The transaction commits or rolls back.</li><li>The session closes and its first-level cache is discarded.</li></ol>
        <div class="note-box"><strong>Practical rule:</strong> keep sessions and transactions short, never share a session between threads, and inspect generated SQL when diagnosing performance or correctness problems.</div>
      </section>
    </article>
  `,
  styles: [`
    .architecture-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.architecture-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:56rem;color:#64748b;font-size:1.15rem;line-height:1.8}.architecture-page section{max-width:68rem;margin-top:3rem}.architecture-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.architecture-page p,.architecture-page li{line-height:1.8}.architecture-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.architecture-page code{color:#be123c}.architecture-page pre code{color:inherit}.architecture-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff}.architecture-flow span{padding:.7rem 1rem;border:1px solid #7dd3fc;border-radius:.6rem;background:#fff;color:#0f3460;font-weight:700}.architecture-flow b{color:#0891b2;font-size:1.4rem}.layer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.layer-grid article{padding:1.25rem;border:1px solid #dbeafe;border-radius:.9rem;background:#f8fbff}.layer-grid strong{color:#0f766e}.layer-grid p{margin:.5rem 0 0}.info-box,.note-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}@media(max-width:700px){.layer-grid{grid-template-columns:1fr}.architecture-flow b{transform:rotate(90deg)}}
  `]
})
export class HibernateArchitectureComponent {}
