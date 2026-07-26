import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-bidirectional',
  standalone: true,
  template: `
    <article class="bidirectional-page container-xl">
      <p class="eyebrow">Hibernate Associations</p>
      <h1>Hibernate Bidirectional Association</h1>
      <p class="lead">Learn how two Hibernate entities reference each other, how the owning side controls the foreign key, and how to keep both sides synchronized.</p>

      <section aria-labelledby="definition">
        <h2 id="definition">What Is a Bidirectional Association?</h2>
        <p>A bidirectional association allows navigation from both entities. For example, an Employee can access its Address, and the Address can access its Employee. Both classes hold a reference, but only one side normally owns the database relationship.</p>
        <div class="relationship-flow"><span>Employee</span><b>↔</b><span>Address</span></div>
        <p>This differs from a unidirectional association, where only one entity has a reference to the other. Bidirectional navigation is useful when both directions are needed by the domain or queries.</p>
      </section>

      <section aria-labelledby="works">
        <h2 id="works">How Bidirectional Mapping Works</h2>
        <ol><li>Each entity declares a field referencing the other entity or collection.</li><li>Annotations or XML define the relationship type.</li><li>One side is the owning side and maps the foreign key or join table.</li><li>The other side uses <code>mappedBy</code> for a bidirectional association.</li><li>Application helper methods update both object references together.</li></ol>
        <div class="note-box"><strong>Key idea:</strong> two Java references do not mean that Hibernate has two independent relationships. The owning side is the source of truth for updates to the foreign key or join table.</div>
      </section>

      <section aria-labelledby="example">
        <h2 id="example">Example: Employee and Address</h2>
        <p>In this one-to-one example, Address owns the foreign key and Employee points to the owning field with <code>mappedBy</code>.</p>
        <pre>&#64;Entity
public class Employee &#123;
    &#64;Id
    &#64;GeneratedValue
    private Long id;

    private String name;

    &#64;OneToOne(
        mappedBy = "employee",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private Address address;

    public void setAddress(Address address) &#123;
        this.address = address;
        if (address != null) &#123;
            address.setEmployee(this);
        &#125;
    &#125;
&#125;

&#64;Entity
public class Address &#123;
    &#64;Id
    &#64;GeneratedValue
    private Long id;

    private String city;
    private String state;

    &#64;OneToOne
    &#64;JoinColumn(name = "employee_id", unique = true)
    private Employee employee;

    public void setEmployee(Employee employee) &#123;
        this.employee = employee;
    &#125;
&#125;</pre>
        <p>Calling <code>employee.setAddress(address)</code> updates both in-memory references. Without this synchronization, the Java object graph can disagree with the database state.</p>
      </section>

      <section aria-labelledby="types">
        <h2 id="types">Types of Bidirectional Associations</h2>
        <table class="table table-bordered"><thead><tr><th>Relationship</th><th>Typical mapping</th><th>Owning side</th></tr></thead><tbody>
          <tr><td>One-to-one</td><td><code>&#64;OneToOne</code> on both entities</td><td>Side with <code>&#64;JoinColumn</code> or <code>&#64;MapsId</code></td></tr>
          <tr><td>One-to-many / many-to-one</td><td><code>&#64;OneToMany(mappedBy = "parent")</code> and <code>&#64;ManyToOne</code></td><td>Usually the many side with the foreign key</td></tr>
          <tr><td>Many-to-many</td><td><code>&#64;ManyToMany</code> with <code>&#64;JoinTable</code></td><td>Side declaring the join table</td></tr>
        </tbody></table>
      </section>

      <section aria-labelledby="one-many">
        <h2 id="one-many">Bidirectional One-to-Many</h2>
        <p>The child usually owns the foreign key, while the parent collection uses <code>mappedBy</code>.</p>
        <pre>public class Department &#123;
    &#64;OneToMany(mappedBy = "department")
    private List&lt;Employee&gt; employees = new ArrayList&lt;&gt;();

    public void addEmployee(Employee employee) &#123;
        employees.add(employee);
        employee.setDepartment(this);
    &#125;
&#125;

public class Employee &#123;
    &#64;ManyToOne(fetch = FetchType.LAZY)
    &#64;JoinColumn(name = "department_id")
    private Department department;
&#125;</pre>
      </section>

      <section aria-labelledby="many-many">
        <h2 id="many-many">Bidirectional Many-to-Many</h2>
        <p>One side defines the join table and the other side refers to it with <code>mappedBy</code>.</p>
        <pre>public class Question &#123;
    &#64;ManyToMany
    &#64;JoinTable(name = "question_answer")
    private Set&lt;Answer&gt; answers = new HashSet&lt;&gt;();
&#125;

public class Answer &#123;
    &#64;ManyToMany(mappedBy = "answers")
    private Set&lt;Question&gt; questions = new HashSet&lt;&gt;();
&#125;</pre>
        <p>Use an explicit join entity when the association has attributes such as order, timestamp, role, approval status, or audit information.</p>
      </section>

      <section aria-labelledby="advantages">
        <h2 id="advantages">Advantages and Trade-offs</h2>
        <div class="comparison-grid"><div><h3>Advantages</h3><ul><li>Navigate naturally from either side.</li><li>Query relationships from both entities.</li><li>Keep domain objects expressive.</li><li>Represent parent-child ownership clearly.</li></ul></div><div><h3>Trade-offs</h3><ul><li>Both sides must remain synchronized.</li><li>Serialization can produce cycles.</li><li>Lazy loading can fail after session close.</li><li>Large collections can cause expensive queries.</li></ul></div></div>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Best Practices</h2>
        <ul><li>Identify the owning side before writing the mapping.</li><li>Use <code>mappedBy</code> on the inverse side.</li><li>Provide add, remove, and set helper methods that update both sides.</li><li>Use lazy loading and explicit fetch joins for required data.</li><li>Do not include associations in <code>equals()</code> or <code>hashCode()</code>.</li><li>Use DTOs or serialization annotations to prevent infinite JSON recursion.</li><li>Use <code>orphanRemoval</code> only when the child lifecycle belongs to the parent.</li><li>Add database foreign-key, unique, and join-table constraints.</li></ul>
        <div class="success-box"><strong>Summary:</strong> bidirectional associations provide navigation in both directions, but the owning side alone controls relationship persistence. Keep both references synchronized in application code.</div>
      </section>
    </article>
  `,
  styles: [`
    .bidirectional-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.bidirectional-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.bidirectional-page section{max-width:70rem;margin-top:3rem}.bidirectional-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.bidirectional-page h3{color:#0f766e}.bidirectional-page p,.bidirectional-page li{line-height:1.8}.bidirectional-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.bidirectional-page code{color:#be123c}.bidirectional-page pre code{color:inherit}.relationship-flow{display:flex;align-items:center;gap:1rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff;color:#0f3460;font-weight:800}.relationship-flow b{color:#0891b2;font-size:1.6rem}.comparison-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.comparison-grid>div{padding:1.2rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}@media(max-width:700px){.comparison-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateBidirectionalComponent {}
