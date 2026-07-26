import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-first-level-cache',
  standalone: true,
  template: `
    <article class="cache-page container-xl">
      <p class="eyebrow">Hibernate Performance</p>
      <h1>First-Level Cache in Hibernate</h1>
      <p class="lead">Understand Hibernate's automatic Session-level cache, how repeated entity lookups avoid duplicate SQL, and how it differs from the second-level cache.</p>

      <section aria-labelledby="caching">
        <h2 id="caching">What Is Caching in Hibernate?</h2>
        <p>Caching keeps recently used data available so an application can avoid repeating expensive database work. Hibernate provides a first-level cache for every session and can optionally use a shared second-level cache.</p>
        <div class="cache-grid"><div><strong>First-level cache</strong><p>Built into every <code>Session</code>, scoped to one persistence context, and enabled by default.</p></div><div><strong>Second-level cache</strong><p>Optional, shared across sessions, and configured through a compatible cache provider.</p></div></div>
      </section>

      <section aria-labelledby="first">
        <h2 id="first">What Is the First-Level Cache?</h2>
        <p>The first-level cache is the persistence context associated with a Hibernate <code>Session</code>. When Hibernate loads an entity, the session keeps the managed instance in memory. A later lookup for the same entity identity in the same session can return that managed instance without another SQL select.</p>
        <ul><li>It is enabled by default.</li><li>It belongs to one session and is not shared across sessions.</li><li>It stores managed entity instances and their state.</li><li>It is cleared when the session is cleared or closed.</li><li>It also supports identity consistency: one session normally returns one object instance for a given entity identity.</li></ul>
      </section>

      <section aria-labelledby="example">
        <h2 id="example">First-Level Cache Example</h2>
        <p>The second lookup occurs in the same session and uses the same entity type and identifier.</p>
        <pre>try (Session session = sessionFactory.openSession()) &#123;
    Employee first = session.find(Employee.class, 101L);
    Employee second = session.find(Employee.class, 101L);

    System.out.println(first == second); // true
&#125;</pre>
        <p>With SQL logging enabled, Hibernate normally shows one select for the first lookup. The second lookup is resolved from the current session's persistence context.</p>
        <div class="note-box"><strong>Scope matters:</strong> if the second lookup uses a different session, it has a different first-level cache and may execute another SQL query.</div>
      </section>

      <section aria-labelledby="lifecycle">
        <h2 id="lifecycle">First-Level Cache Lifecycle</h2>
        <ol><li>A session is opened.</li><li>Hibernate loads or persists an entity.</li><li>The entity becomes managed in the session's persistence context.</li><li>Repeated access to the same identity can use the managed instance.</li><li>Hibernate performs dirty checking during flush.</li><li>The session is cleared or closed and its first-level cache is discarded.</li></ol>
        <pre>try (Session session = sessionFactory.openSession()) &#123;
    Employee employee = session.find(Employee.class, 101L);
    employee.setName("Updated name");

    // Hibernate detects the change during flush or commit.
    session.flush();
&#125;</pre>
      </section>

      <section aria-labelledby="operations">
        <h2 id="operations">Managing the Persistence Context</h2>
        <table class="table table-bordered"><thead><tr><th>Method</th><th>Effect</th></tr></thead><tbody>
          <tr><td><code>session.clear()</code></td><td>Detaches all managed entities and empties the session cache.</td></tr>
          <tr><td><code>session.evict(entity)</code></td><td>Detaches one entity from the persistence context.</td></tr>
          <tr><td><code>session.refresh(entity)</code></td><td>Reloads the entity state from the database and discards its in-memory changes.</td></tr>
          <tr><td><code>session.detach(entity)</code></td><td>JPA-style operation that detaches one entity where supported.</td></tr>
          <tr><td><code>session.close()</code></td><td>Closes the session and discards its first-level cache.</td></tr>
        </tbody></table>
        <pre>Employee employee = session.find(Employee.class, 101L);
session.evict(employee);

// The entity is no longer managed by this session.
Employee reloaded = session.find(Employee.class, 101L);</pre>
      </section>

      <section aria-labelledby="batch">
        <h2 id="batch">Large Loops and Batch Processing</h2>
        <p>The first-level cache grows as entities become managed. In a large import, periodically flush changes and clear the session to control memory usage.</p>
        <pre>for (int index = 1; index &lt;= 1_000; index++) &#123;
    session.persist(new Employee("Employee " + index));

    if (index % 50 == 0) &#123;
        session.flush();
        session.clear();
    &#125;
&#125;</pre>
        <p>After <code>clear()</code>, previously managed objects become detached. Do not assume that references still point to managed entities; reattach or reload objects when the next operation requires management.</p>
      </section>

      <section aria-labelledby="second">
        <h2 id="second">First-Level versus Second-Level Cache</h2>
        <table class="table table-bordered"><thead><tr><th>Characteristic</th><th>First-level cache</th><th>Second-level cache</th></tr></thead><tbody>
          <tr><td>Scope</td><td>One Session</td><td>Shared across sessions in a SessionFactory</td></tr>
          <tr><td>Default</td><td>Enabled automatically</td><td>Optional and requires configuration</td></tr>
          <tr><td>Lifetime</td><td>Session or persistence-context lifetime</td><td>Provider and SessionFactory lifetime</td></tr>
          <tr><td>Purpose</td><td>Identity consistency and avoiding repeated work in one unit of work</td><td>Reducing database reads across sessions</td></tr>
        </tbody></table>
        <p>The first-level cache is not a replacement for a second-level cache. Use a second-level cache only after measuring access patterns, invalidation requirements, memory usage, and data staleness tolerance.</p>
      </section>

      <section aria-labelledby="queries">
        <h2 id="queries">Entity Lookup versus Query Results</h2>
        <p>The persistence context primarily guarantees identity for managed entities. A query may still execute SQL each time unless query caching or application-level result reuse is configured. Do not assume that every repeated HQL query is automatically served without SQL.</p>
        <pre>Employee first = session.find(Employee.class, 101L);

List&lt;Employee&gt; results = session
    .createQuery(
        "from Employee where id = :id",
        Employee.class)
    .setParameter("id", 101L)
    .getResultList();</pre>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Best Practices</h2>
        <ul><li>Keep sessions short and aligned with a unit of work.</li><li>Use one session consistently when repeated entity access should benefit from the first-level cache.</li><li>Flush and clear during large batch operations.</li><li>Do not share a session between threads.</li><li>Remember that clearing the session detaches managed entities.</li><li>Use SQL logging and measurements before optimizing cache behavior.</li><li>Be careful with stale data when adding a second-level cache.</li></ul>
        <div class="success-box"><strong>Summary:</strong> Hibernate's first-level cache is the session's persistence context. It is automatic, session-scoped, and can prevent repeated entity loads within the same unit of work.</div>
      </section>
    </article>
  `,
  styles: [`
    .cache-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.cache-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.cache-page section{max-width:70rem;margin-top:3rem}.cache-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.cache-page p,.cache-page li{line-height:1.8}.cache-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.cache-page code{color:#be123c}.cache-page pre code{color:inherit}.cache-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.cache-grid>div{padding:1.15rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.cache-grid strong{color:#0f766e}.cache-grid p{margin:.45rem 0 0}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}@media(max-width:700px){.cache-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateFirstLevelCacheComponent {}
