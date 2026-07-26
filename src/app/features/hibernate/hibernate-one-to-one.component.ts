import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-one-to-one',
  standalone: true,
  template: `
    <article class="one-to-one-page container-xl">
      <p class="eyebrow">Hibernate Relationships</p>
      <h1>Hibernate One-to-One Example Using Annotations</h1>
      <p class="lead">Map one Employee to one Address with a bidirectional Hibernate relationship and a shared primary key.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">One-to-One Association</h2>
        <p>A one-to-one relationship means that one employee has one address and one address belongs to one employee. This page uses a shared-primary-key design: the Address identifier is also a foreign key to Employee.</p>
        <div class="relationship-flow"><span>employee</span><b>1</b><span>────────</span><b>1</b><span>address</span></div>
        <p>The foreign key is stored in the <code>address</code> table, not the <code>employee</code> table. This is a reliable way to enforce that an address belongs to at most one employee.</p>
      </section>

      <section aria-labelledby="dependencies">
        <h2 id="dependencies">1. Add Maven Dependencies</h2>
        <p>This example uses Hibernate 6, Jakarta Persistence, and H2 for a self-contained database.</p>
        <pre>&lt;dependency&gt;
  &lt;groupId&gt;org.hibernate.orm&lt;/groupId&gt;
  &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
  &lt;version&gt;6.6.9.Final&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
  &lt;groupId&gt;com.h2database&lt;/groupId&gt;
  &lt;artifactId&gt;h2&lt;/artifactId&gt;
  &lt;version&gt;2.3.232&lt;/version&gt;
  &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</pre>
        <p>For Hibernate 5, the equivalent persistence imports use <code>javax.persistence</code>. Do not mix the Jakarta and javax namespaces in one application.</p>
      </section>

      <section aria-labelledby="employee">
        <h2 id="employee">2. Create the Employee Entity</h2>
        <p>The Employee entity is the parent in this example. <code>cascade = CascadeType.ALL</code> allows the address to be persisted with the employee, while <code>orphanRemoval</code> removes an address that is detached from its employee.</p>
        <pre>package com.example;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

&#64;Entity
public class Employee &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    &#64;OneToOne(
        mappedBy = "employee",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private Address address;

    protected Employee() &#123; &#125;

    public Employee(String name, String email) &#123;
        this.name = name;
        this.email = email;
    &#125;

    public void setAddress(Address address) &#123;
        this.address = address;
        if (address != null) &#123;
            address.setEmployee(this);
        &#125;
    &#125;

    public Long getId() &#123; return id; &#125;
    public String getName() &#123; return name; &#125;
    public String getEmail() &#123; return email; &#125;
    public Address getAddress() &#123; return address; &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="address">
        <h2 id="address">3. Create the Address Entity</h2>
        <p><code>&#64;MapsId</code> makes the Address identifier use the same value as the associated Employee identifier. The <code>address.employee_id</code> column is both a primary key and a foreign key.</p>
        <pre>package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

&#64;Entity
public class Address &#123;
    &#64;Id
    private Long id;

    private String addressLine;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    &#64;MapsId
    &#64;OneToOne
    &#64;JoinColumn(name = "employee_id")
    private Employee employee;

    protected Address() &#123; &#125;

    public Address(
            String addressLine,
            String city,
            String state,
            String country,
            String postalCode) &#123;
        this.addressLine = addressLine;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
    &#125;

    public void setEmployee(Employee employee) &#123;
        this.employee = employee;
    &#125;

    public String getAddressLine() &#123; return addressLine; &#125;
    public String getCity() &#123; return city; &#125;
    public String getState() &#123; return state; &#125;
    public String getCountry() &#123; return country; &#125;
    public String getPostalCode() &#123; return postalCode; &#125;
&#125;</pre>
        <p>Address is the owning side because it declares <code>&#64;JoinColumn</code>. Employee's <code>mappedBy = "employee"</code> points to that field.</p>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">4. Configure Hibernate</h2>
        <p>Place <code>hibernate.cfg.xml</code> in <code>src/main/resources</code> and register both annotated entities.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;org.h2.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:h2:mem:employee;DB_CLOSE_DELAY=-1&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;sa&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.H2Dialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;create-drop&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;mapping class="com.example.Employee"/&gt;
    &lt;mapping class="com.example.Address"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p>Use Flyway, Liquibase, or another migration tool instead of <code>create-drop</code> in production.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">5. Persist an Employee and Address</h2>
        <p>Set the relationship through the helper method so both sides of the bidirectional association are synchronized.</p>
        <pre>try (SessionFactory factory = new Configuration()
        .configure()
        .buildSessionFactory();
     Session session = factory.openSession()) &#123;

    Transaction transaction = session.beginTransaction();
    try &#123;
        Employee employee = new Employee(
            "Ravi Malik", "ravi&#64;example.com");
        Address address = new Address(
            "21 Lohia Nagar",
            "Ghaziabad",
            "Uttar Pradesh",
            "India",
            "201301");

        employee.setAddress(address);
        session.persist(employee);
        transaction.commit();
        System.out.println("Employee saved with address");
    &#125; catch (RuntimeException exception) &#123;
        transaction.rollback();
        throw exception;
    &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="fetch">
        <h2 id="fetch">6. Fetch the Employee and Address</h2>
        <p>Use a fetch join when a screen needs the employee and address together.</p>
        <pre>Employee employee = session
    .createQuery(
        "select e from Employee e "
        + "join fetch e.address "
        + "where e.email = :email",
        Employee.class)
    .setParameter("email", "ravi&#64;example.com")
    .getSingleResult();

Address address = employee.getAddress();
System.out.println(employee.getName());
System.out.println(address.getAddressLine());
System.out.println(address.getCity());</pre>
        <p>Keeping the session open while a lazy association is accessed prevents a <code>LazyInitializationException</code>. A fetch join makes the required data explicit.</p>
      </section>

      <section aria-labelledby="alternatives">
        <h2 id="alternatives">One-to-One Mapping Alternatives</h2>
        <table class="table table-bordered"><thead><tr><th>Design</th><th>When to use it</th></tr></thead><tbody>
          <tr><td>Shared primary key with <code>&#64;MapsId</code></td><td>The dependent row cannot exist without the parent and should share its identifier.</td></tr>
          <tr><td>Unique foreign key</td><td>The dependent table has its own identifier but the foreign-key column must be unique.</td></tr>
          <tr><td>Join table</td><td>The relationship needs a separate table or both sides have independent lifecycle requirements.</td></tr>
        </tbody></table>
        <p>A one-to-one association is not automatically enforced by Java annotations alone. Use primary-key, foreign-key, and unique constraints in the database to enforce cardinality.</p>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Best Practices</h2>
        <ul><li>Choose the owning side based on where the foreign key belongs.</li><li>Keep both sides synchronized with helper methods.</li><li>Use <code>LAZY</code> loading where supported and fetch deliberately.</li><li>Use <code>orphanRemoval</code> only when the dependent lifecycle belongs to the parent.</li><li>Do not include the relationship in <code>equals()</code> or <code>hashCode()</code>.</li><li>Add database constraints to guarantee one-to-one cardinality.</li><li>Use migrations for production schema changes.</li></ul>
        <div class="success-box"><strong>Result:</strong> the employee row is stored in <code>employee</code>, the address row is stored in <code>address</code>, and <code>address.employee_id</code> links the two with a shared primary key.</div>
      </section>
    </article>
  `,
  styles: [`
    .one-to-one-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.one-to-one-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.one-to-one-page section{max-width:70rem;margin-top:3rem}.one-to-one-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.one-to-one-page p,.one-to-one-page li{line-height:1.8}.one-to-one-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.one-to-one-page code{color:#be123c}.one-to-one-page pre code{color:inherit}.relationship-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.8rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff;color:#0f3460;font-weight:800}.relationship-flow b{color:#0891b2;font-size:1.3rem}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class HibernateOneToOneComponent {}
