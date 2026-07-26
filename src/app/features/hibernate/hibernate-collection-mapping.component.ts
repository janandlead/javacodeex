import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-collection-mapping',
  standalone: true,
  template: `
    <article class="collection-page container-xl">
      <p class="eyebrow">Hibernate Associations and Collections</p>
      <h1>Collection Mapping in Hibernate</h1>
      <p class="lead">Learn how to map lists, sets, maps, bags, value collections, and entity relationships using Hibernate and JPA.</p>

      <section aria-labelledby="types">
        <h2 id="types">Collection Types Supported by Hibernate</h2>
        <p>A persistent class can contain a collection of values or entity references. Common Java collection types are:</p>
        <ul class="type-list"><li><code>List</code></li><li><code>Set</code></li><li><code>SortedSet</code></li><li><code>Map</code></li><li><code>SortedMap</code></li><li><code>Collection</code></li></ul>
        <p>Hibernate also supports custom collection semantics through its extension points. Prefer standard Java collections and JPA annotations for application code.</p>
        <pre>public class Question &#123;
    private Long id;
    private String text;
    private List&lt;String&gt; answers;
&#125;</pre>
      </section>

      <section aria-labelledby="value-list">
        <h2 id="value-list">Mapping a List of Basic Values</h2>
        <p>Use <code>&#64;ElementCollection</code> when the collection contains values such as strings, numbers, or embeddable value objects rather than entities.</p>
        <pre>&#64;Entity
public class Question &#123;
    &#64;Id
    &#64;GeneratedValue
    private Long id;

    private String text;

    &#64;ElementCollection
    &#64;CollectionTable(
        name = "question_answer",
        joinColumns = &#64;JoinColumn(name = "question_id")
    )
    &#64;OrderColumn(name = "answer_position")
    &#64;Column(name = "answer")
    private List&lt;String&gt; answers = new ArrayList&lt;&gt;();
&#125;</pre>
        <p><code>&#64;OrderColumn</code> stores the list position. Without an order column, use a <code>Set</code> when order is not part of the data model.</p>
      </section>

      <section aria-labelledby="entity-list">
        <h2 id="entity-list">Mapping a List of Entities</h2>
        <p>When a collection contains entity objects, use a relationship such as one-to-many or many-to-many. The following bidirectional mapping stores many answers for one question.</p>
        <pre>&#64;Entity
public class Question &#123;
    &#64;Id
    &#64;GeneratedValue
    private Long id;

    &#64;OneToMany(
        mappedBy = "question",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    &#64;OrderBy("id ASC")
    private List&lt;Answer&gt; answers = new ArrayList&lt;&gt;();
&#125;

&#64;Entity
public class Answer &#123;
    &#64;Id
    &#64;GeneratedValue
    private Long id;

    private String text;

    &#64;ManyToOne(fetch = FetchType.LAZY, optional = false)
    &#64;JoinColumn(name = "question_id", nullable = false)
    private Question question;
&#125;</pre>
        <p><code>mappedBy</code> identifies the owning field on <code>Answer</code>. Keep both sides synchronized in helper methods so the in-memory model and database relationship remain consistent.</p>
      </section>

      <section aria-labelledby="xml">
        <h2 id="xml">Mapping a Collection in an XML Mapping File</h2>
        <p>Legacy Hibernate mapping files use <code>&lt;list&gt;</code>, <code>&lt;set&gt;</code>, <code>&lt;bag&gt;</code>, or <code>&lt;map&gt;</code> inside a <code>&lt;class&gt;</code> mapping.</p>
        <pre>&lt;class name="com.example.Question" table="question"&gt;
  &lt;id name="id" column="id"&gt;
    &lt;generator class="identity"/&gt;
  &lt;/id&gt;
  &lt;property name="text" column="question_text"/&gt;

  &lt;list name="answers" table="question_answer"&gt;
    &lt;key column="question_id" not-null="true"/&gt;
    &lt;index column="answer_position"/&gt;
    &lt;element column="answer" type="string"/&gt;
  &lt;/list&gt;
&lt;/class&gt;</pre>
        <p>The <code>&lt;key&gt;</code> stores the foreign key, <code>&lt;index&gt;</code> stores the list position, and <code>&lt;element&gt;</code> stores the basic value. For entity references, replace <code>&lt;element&gt;</code> with <code>&lt;one-to-many&gt;</code> or <code>&lt;many-to-many&gt;</code>.</p>
      </section>

      <section aria-labelledby="key">
        <h2 id="key">Understanding the Key Element</h2>
        <p>The key column is the foreign key in the collection table. It points back to the identifier of the owning entity.</p>
        <pre>&lt;key
  column="question_id"
  not-null="true"
  on-delete="cascade"
/&gt;</pre>
        <p>Important legacy attributes include:</p>
        <ul><li><code>column</code>: foreign-key column name.</li><li><code>not-null</code>: prevents collection rows without an owner.</li><li><code>on-delete</code>: controls database-level delete behavior where supported.</li><li><code>property-ref</code>: references a property other than the owner's primary key.</li><li><code>unique</code>: adds a uniqueness constraint when the relationship requires it.</li></ul>
      </section>

      <section aria-labelledby="indexed">
        <h2 id="indexed">Indexed and Non-Indexed Collections</h2>
        <div class="comparison-grid"><div><h3>Indexed</h3><p><code>List</code> and <code>Map</code> need an additional value that represents position or key. In XML this is commonly <code>&lt;index&gt;</code> or <code>&lt;index-many-to-many&gt;</code>.</p></div><div><h3>Non-indexed</h3><p><code>Set</code>, <code>Bag</code>, and ordinary collections do not use a numeric position. A set relies on equality and hash code behavior to identify unique elements.</p></div></div>
        <pre>&#64;ElementCollection
&#64;MapKeyColumn(name = "answer_type")
private Map&lt;String, String&gt; answersByType = new HashMap&lt;&gt;();</pre>
      </section>

      <section aria-labelledby="elements">
        <h2 id="elements">Collection Element Types</h2>
        <table class="table table-bordered"><thead><tr><th>Mapping</th><th>Use it for</th><th>Modern annotation</th></tr></thead><tbody>
          <tr><td>Basic element</td><td>Strings, numbers, dates, and other basic values.</td><td><code>&#64;ElementCollection</code></td></tr>
          <tr><td>Component element</td><td>Embeddable value objects such as addresses.</td><td><code>&#64;ElementCollection</code> with <code>&#64;Embeddable</code></td></tr>
          <tr><td>One-to-many</td><td>Many child entities belong to one parent.</td><td><code>&#64;OneToMany</code></td></tr>
          <tr><td>Many-to-many</td><td>Multiple entities on both sides share a relationship.</td><td><code>&#64;ManyToMany</code></td></tr>
        </tbody></table>
        <div class="note-box"><strong>Performance note:</strong> collections are commonly lazy, but accessing them outside an open persistence context can cause <code>LazyInitializationException</code>. Fetch only the data required by the use case.</div>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Collection Mapping Best Practices</h2>
        <ul><li>Initialize collection fields to an empty collection instead of <code>null</code>.</li><li>Use <code>Set</code> only when equality and uniqueness are well defined.</li><li>Use <code>List</code> with an explicit order column when position is meaningful.</li><li>Use <code>Map</code> when a stable key makes lookup clearer than scanning a list.</li><li>Use cascade and orphan removal only when the child lifecycle truly belongs to the parent.</li><li>Avoid eager collection fetching for large relationships.</li><li>Do not include lazy collections in <code>equals()</code> or <code>hashCode()</code>.</li><li>Use migrations to create collection tables and foreign-key constraints in production.</li></ul>
        <div class="success-box"><strong>Next topics:</strong> mapping List, mapping Bag, mapping Set, mapping Map, one-to-many collections, and many-to-many collections.</div>
      </section>
    </article>
  `,
  styles: [`
    .collection-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.collection-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.collection-page section{max-width:70rem;margin-top:3rem}.collection-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.collection-page h3{color:#0f766e}.collection-page p,.collection-page li{line-height:1.8}.collection-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.collection-page code{color:#be123c}.collection-page pre code{color:inherit}.type-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.65rem;padding-left:1.2rem}.comparison-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.comparison-grid>div{padding:1.2rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.comparison-grid h3{margin-top:0}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}@media(max-width:700px){.type-list,.comparison-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateCollectionMappingComponent {}
