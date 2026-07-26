import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-generators',
  standalone: true,
  template: `
    <article class="generators-page container-xl">
      <p class="eyebrow">Hibernate Identifier Mapping</p>
      <h1>Generator Classes in Hibernate</h1>
      <p class="lead">Learn how Hibernate generates unique identifiers for entities, which strategies are recommended today, and how older XML generator names map to modern identifier generation.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">What Is a Hibernate Generator?</h2>
        <p>An identifier generator supplies the value for an entity's primary-key property when the entity is persisted. In older Hibernate XML mappings, the generator was configured as a child of <code>&lt;id&gt;</code>. In modern applications, JPA annotations such as <code>&#64;GeneratedValue</code> and <code>&#64;SequenceGenerator</code> are usually preferred.</p>
        <pre>&lt;id name="id" column="id"&gt;
  &lt;generator class="identity"/&gt;
&lt;/id&gt;</pre>
        <div class="note-box"><strong>Important:</strong> generator names and behavior differ between Hibernate generations. Strategies such as <code>hilo</code>, <code>seqhilo</code>, <code>guid</code>, and <code>sequence-identity</code> mainly belong to older Hibernate documentation. Choose a strategy supported by your Hibernate version and database dialect.</div>
      </section>

      <section aria-labelledby="modern">
        <h2 id="modern">Recommended Modern Strategies</h2>
        <table class="table table-bordered"><thead><tr><th>Strategy</th><th>Typical use</th><th>Example</th></tr></thead><tbody>
          <tr><td><code>IDENTITY</code></td><td>Database identity or auto-increment column.</td><td><code>&#64;GeneratedValue(strategy = GenerationType.IDENTITY)</code></td></tr>
          <tr><td><code>SEQUENCE</code></td><td>Databases that provide sequences, such as PostgreSQL or Oracle.</td><td><code>&#64;GeneratedValue(strategy = GenerationType.SEQUENCE)</code></td></tr>
          <tr><td><code>AUTO</code></td><td>Lets the persistence provider choose a suitable strategy.</td><td><code>&#64;GeneratedValue(strategy = GenerationType.AUTO)</code></td></tr>
          <tr><td>UUID</td><td>Distributed identifiers without a central numeric sequence.</td><td><code>&#64;UuidGenerator</code> or application-generated UUID</td></tr>
        </tbody></table>
      </section>

      <section aria-labelledby="identity">
        <h2 id="identity">Identity Generation</h2>
        <p>With identity generation, the database assigns a value when it inserts the row. It is common with MySQL auto-increment and SQL Server identity columns.</p>
        <pre>&#64;Id
&#64;GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;</pre>
        <p>The generated value is available after the insert is executed. Because the database must insert the row before returning the key, identity generation can limit some batching optimizations.</p>
      </section>

      <section aria-labelledby="sequence">
        <h2 id="sequence">Sequence Generation</h2>
        <p>A database sequence produces numeric values independently of table inserts. This is a strong choice when the database supports sequences and batching is important.</p>
        <pre>&#64;Id
&#64;SequenceGenerator(
    name = "employee_sequence",
    sequenceName = "employee_seq",
    allocationSize = 50
)
&#64;GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "employee_sequence"
)
private Long id;</pre>
        <p><code>allocationSize</code> controls how many values Hibernate can reserve at a time. Keep it aligned with the database sequence increment when configuring pooled allocation.</p>
        <p>The equivalent legacy XML mapping is:</p>
        <pre>&lt;id name="id"&gt;
  &lt;generator class="sequence"&gt;
    &lt;param name="sequence_name"&gt;employee_seq&lt;/param&gt;
  &lt;/generator&gt;
&lt;/id&gt;</pre>
      </section>

      <section aria-labelledby="uuid">
        <h2 id="uuid">UUID Generation</h2>
        <p>UUIDs are useful when identifiers must be created across services or before a database insert. They avoid a single numeric sequence but are larger than a typical integer key and can affect index locality.</p>
        <pre>import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;

&#64;Id
&#64;UuidGenerator
private UUID id;</pre>
        <p>Choose a UUID storage type deliberately. A native UUID column or binary representation is generally more compact than storing the value as a long text string.</p>
      </section>

      <section aria-labelledby="legacy">
        <h2 id="legacy">Legacy Hibernate Generator Classes</h2>
        <div class="strategy-grid">
          <article><h3><code>assigned</code></h3><p>The application supplies the identifier before calling <code>persist()</code>. It is useful for stable business keys but requires uniqueness and validation in application code.</p></article>
          <article><h3><code>increment</code></h3><p>Hibernate reads the current maximum identifier and increments it. It is unsafe for concurrent applications and should not be used for production key generation.</p></article>
          <article><h3><code>sequence</code></h3><p>Uses a database sequence. Prefer the JPA <code>SEQUENCE</code> strategy with an explicit sequence generator in new code.</p></article>
          <article><h3><code>native</code></h3><p>Older Hibernate strategy that chooses identity, sequence, or another approach based on the dialect. Prefer an explicit strategy when portability and schema behavior matter.</p></article>
          <article><h3><code>identity</code></h3><p>Uses a database identity or auto-increment column. In annotation mapping, use <code>GenerationType.IDENTITY</code>.</p></article>
          <article><h3><code>uuid</code></h3><p>Generates a UUID-style identifier. Modern Hibernate applications should use an explicit UUID property and the current UUID generator support.</p></article>
          <article><h3><code>hilo</code> and <code>seqhilo</code></h3><p>Use a high/low allocation algorithm. These are legacy strategies; sequence-based pooled optimizers are normally clearer for new applications.</p></article>
          <article><h3><code>guid</code>, <code>select</code>, <code>foreign</code></h3><p>Database GUIDs, trigger-returned keys, and identifiers borrowed from an associated object. They are specialized legacy mappings and need database-specific or association-specific design.</p></article>
        </div>
      </section>

      <section aria-labelledby="custom">
        <h2 id="custom">Custom Identifier Generators</h2>
        <p>When built-in strategies do not meet an application's requirements, Hibernate can use a custom generator. The implementation must follow the generator SPI for the Hibernate version in use.</p>
        <pre>public class BusinessKeyGenerator
        implements IdentifierGenerator &#123;
    &#64;Override
    public Object generate(
            SharedSessionContractImplementor session,
            Object entity) &#123;
        return "EMP-" + UUID.randomUUID();
    &#125;
&#125;</pre>
        <p>Custom generators should be collision-resistant, testable, and compatible with the database column type. Avoid using timestamps or table maximum values as a uniqueness guarantee in concurrent systems.</p>
      </section>

      <section aria-labelledby="choice">
        <h2 id="choice">How to Choose a Strategy</h2>
        <ol>
          <li>Use <code>IDENTITY</code> when the schema is built around an auto-increment or identity column.</li>
          <li>Use <code>SEQUENCE</code> when the database supports sequences and you want efficient allocation and batching.</li>
          <li>Use UUIDs when identifiers must be generated independently across services or before persistence.</li>
          <li>Use assigned identifiers only when the application owns a stable, unique business key.</li>
          <li>Avoid <code>increment</code> for concurrent production workloads.</li>
          <li>Do not change an entity's identifier after it has been placed in a <code>HashSet</code> or used as a <code>HashMap</code> key.</li>
        </ol>
        <div class="success-box"><strong>Rule of thumb:</strong> make the identifier strategy explicit, match it to the database schema, and test inserts, batching, rollback, and concurrent writes before production deployment.</div>
      </section>
    </article>
  `,
  styles: [`
    .generators-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.generators-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.generators-page section{max-width:70rem;margin-top:3rem}.generators-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.generators-page h3{margin:0;color:#0f766e;font-size:1rem}.generators-page p,.generators-page li{line-height:1.8}.generators-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.generators-page code{color:#be123c}.generators-page pre code{color:inherit}.strategy-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.strategy-grid article{padding:1.15rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.strategy-grid p{margin:.45rem 0 0}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}@media(max-width:700px){.strategy-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateGeneratorsComponent {}
