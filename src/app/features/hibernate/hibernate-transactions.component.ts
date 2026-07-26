import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-transactions',
  standalone: true,
  template: `
    <article class="transactions-page container-xl">
      <p class="eyebrow">Hibernate Persistence</p>
      <h1>Hibernate Transaction Management</h1>
      <p class="lead">Learn how to define a unit of work, commit successful changes, roll back failures, and close Hibernate resources safely.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">What Is a Transaction?</h2>
        <p>A transaction groups related database operations into one unit of work. If an operation fails, the application can roll back the complete unit instead of leaving partial changes in the database.</p>
        <div class="acid-grid"><div><strong>Atomicity</strong><p>All operations succeed together or none are applied.</p></div><div><strong>Consistency</strong><p>Committed work preserves database rules and constraints.</p></div><div><strong>Isolation</strong><p>Concurrent transactions do not see invalid intermediate state.</p></div><div><strong>Durability</strong><p>Committed data survives a later failure.</p></div></div>
      </section>

      <section aria-labelledby="api">
        <h2 id="api">Hibernate Transaction API</h2>
        <p>A Hibernate <code>Transaction</code> represents the transaction boundary for a unit of work. It is obtained from a session:</p>
        <pre>try (Session session = sessionFactory.openSession()) &#123;
    Transaction transaction = session.beginTransaction();
    // Database work belongs inside this unit of work.
    transaction.commit();
&#125;</pre>
        <table class="table table-bordered"><thead><tr><th>Operation</th><th>Purpose</th></tr></thead><tbody>
          <tr><td><code>session.beginTransaction()</code></td><td>Starts a transaction and returns its Hibernate transaction handle.</td></tr>
          <tr><td><code>transaction.commit()</code></td><td>Flushes pending changes and commits the unit of work.</td></tr>
          <tr><td><code>transaction.rollback()</code></td><td>Discards the transaction's uncommitted database changes.</td></tr>
          <tr><td><code>transaction.setTimeout(seconds)</code></td><td>Sets a timeout where supported by the transaction integration.</td></tr>
          <tr><td><code>transaction.isActive()</code></td><td>Checks whether the transaction is currently active.</td></tr>
        </tbody></table>
        <div class="note-box"><strong>Version note:</strong> older tutorials may mention methods such as <code>begin()</code>, <code>wasCommited()</code>, <code>wasRolledBack()</code>, or synchronization registration. Check the Hibernate version's API before using them; current application code normally uses <code>beginTransaction()</code>, <code>commit()</code>, <code>rollback()</code>, and <code>isActive()</code>.</div>
      </section>

      <section aria-labelledby="pattern">
        <h2 id="pattern">Recommended Commit and Rollback Pattern</h2>
        <p>Start the transaction before persistence work, commit only after every operation succeeds, and roll back in the failure path.</p>
        <pre>try (Session session = sessionFactory.openSession()) &#123;
    Transaction transaction = session.beginTransaction();
    try &#123;
        session.persist(employee);
        session.persist(address);
        transaction.commit();
    &#125; catch (RuntimeException exception) &#123;
        if (transaction.isActive()) &#123;
            transaction.rollback();
        &#125;
        throw exception;
    &#125;
&#125;</pre>
        <p>Do not continue using a session after a transaction failure without deciding whether it can safely be reused. Closing the session and starting a new unit of work is often the safest recovery strategy.</p>
      </section>

      <section aria-labelledby="complete">
        <h2 id="complete">Complete Hibernate Example</h2>
        <pre>public void saveEmployee(Employee employee) &#123;
    try (SessionFactory factory = new Configuration()
            .configure()
            .buildSessionFactory();
         Session session = factory.openSession()) &#123;

        Transaction transaction = session.beginTransaction();
        try &#123;
            session.persist(employee);
            transaction.commit();
        &#125; catch (RuntimeException exception) &#123;
            if (transaction.isActive()) &#123;
                transaction.rollback();
            &#125;
            throw exception;
        &#125;
    &#125;
&#125;</pre>
        <p>In a long-running application, create the <code>SessionFactory</code> once and reuse it. The example closes it for clarity; application shutdown code should own factory cleanup.</p>
      </section>

      <section aria-labelledby="flush">
        <h2 id="flush">Flush, Commit, and Rollback</h2>
        <ul><li><strong>Persist:</strong> makes a new entity managed in the current persistence context.</li><li><strong>Flush:</strong> synchronizes pending changes with SQL statements. Hibernate commonly flushes before commit.</li><li><strong>Commit:</strong> makes the transaction's database changes durable.</li><li><strong>Rollback:</strong> reverses uncommitted database changes; it does not undo external side effects such as an email already sent.</li></ul>
        <div class="warning-box"><strong>Important:</strong> a successful Java method does not guarantee that the database commit succeeded. Treat commit as the point at which the unit of work completes successfully.</div>
      </section>

      <section aria-labelledby="jdbc-jta">
        <h2 id="jdbc-jta">JDBC and JTA Transactions</h2>
        <p>Hibernate can integrate with different transaction environments:</p>
        <div class="transaction-grid"><div><h3>Resource-local / JDBC</h3><p>The application begins and commits a transaction through the Hibernate session. This is common for a standalone application using one database connection.</p></div><div><h3>JTA</h3><p>A container or transaction manager coordinates one or more resources. Hibernate participates in the surrounding transaction rather than independently controlling every resource.</p></div></div>
        <p>In Spring applications, use Spring's <code>&#64;Transactional</code> boundary rather than manually opening and committing a Hibernate transaction in every service method.</p>
      </section>

      <section aria-labelledby="timeouts">
        <h2 id="timeouts">Timeouts and Isolation</h2>
        <p>Transaction timeout and isolation behavior depend on the JDBC driver, database, connection pool, and transaction integration. Configure them at the layer responsible for the transaction environment and test them against the real database.</p>
        <pre>Transaction transaction = session.beginTransaction();
transaction.setTimeout(30);
try &#123;
    // Work should finish within the configured limit.
    transaction.commit();
&#125; catch (RuntimeException exception) &#123;
    if (transaction.isActive()) transaction.rollback();
    throw exception;
&#125;</pre>
      </section>

      <section aria-labelledby="mistakes">
        <h2 id="mistakes">Common Transaction Mistakes</h2>
        <ul><li>Opening a session without beginning a transaction for a write operation.</li><li>Forgetting to roll back after an exception.</li><li>Calling rollback after the transaction has already completed without checking its state.</li><li>Keeping a transaction open while waiting for network calls or user input.</li><li>Sharing a session or transaction across threads.</li><li>Creating a new <code>SessionFactory</code> for every request.</li><li>Assuming rollback can undo messages or other external side effects.</li><li>Using automatic schema updates as a substitute for database migrations.</li></ul>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Transaction Best Practices</h2>
        <ol><li>Keep one transaction focused on one business unit of work.</li><li>Keep sessions and transactions short-lived.</li><li>Commit only after all required persistence operations succeed.</li><li>Roll back in the catch path and rethrow the original exception.</li><li>Close sessions with try-with-resources.</li><li>Let Spring or JTA manage boundaries when the application uses a transaction manager.</li><li>Design retries carefully so repeated work is safe and idempotent.</li></ol>
        <div class="success-box"><strong>Summary:</strong> begin a transaction, perform the complete unit of work, commit on success, roll back on failure, and always release the session and connection resources.</div>
      </section>
    </article>
  `,
  styles: [`
    .transactions-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.transactions-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.transactions-page section{max-width:70rem;margin-top:3rem}.transactions-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.transactions-page h3{color:#0f766e}.transactions-page p,.transactions-page li{line-height:1.8}.transactions-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.transactions-page code{color:#be123c}.transactions-page pre code{color:inherit}.acid-grid,.transaction-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.acid-grid>div,.transaction-grid>div{padding:1.15rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.acid-grid strong{color:#0f766e}.acid-grid p{margin:.45rem 0 0}.note-box,.warning-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.warning-box{border-left-color:#d97706;background:#fffbeb}.success-box{border-left-color:#16a34a;background:#f0fdf4}@media(max-width:700px){.acid-grid,.transaction-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateTransactionsComponent {}
