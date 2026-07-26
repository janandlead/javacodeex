import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-many-to-one',
  standalone: true,
  template: `
    <article class="many-to-one-page container-xl">
      <p class="eyebrow">Hibernate Relationships</p>
      <h1>Hibernate Many-to-One Mapping Using Annotations</h1>
      <p class="lead">Map many Employee entities to one shared Address using Jakarta Persistence annotations and a foreign-key column.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">Many-to-One Association</h2>
        <p>A many-to-one relationship means that many employees can refer to the same address, while each employee has one address reference.</p>
        <div class="relationship-flow"><span>employee</span><b>*</b><span>────────</span><b>1</b><span>address</span></div>
        <p>The foreign key is stored in the <code>employee</code> table. The Employee entity is the owning side because it declares <code>&#64;JoinColumn</code> and controls the relationship.</p>
      </section>

      <section aria-labelledby="dependencies">
        <h2 id="dependencies">1. Add Maven Dependencies</h2>
        <p>This example uses Hibernate 6, Jakarta Persistence, and H2.</p>
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
        <p>Use the compatible JDBC driver and dialect for your database. Hibernate 5 applications may use <code>javax.persistence</code>, but Jakarta and javax imports must not be mixed.</p>
      </section>

      <section aria-labelledby="address">
        <h2 id="address">2. Create the Address Entity</h2>
        <p>Address is the referenced entity. It does not need a back-reference unless the application must navigate from an address to all employees.</p>
        <pre>package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

&#64;Entity
public class Address &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String addressLine;
    private String city;
    private String state;
    private String country;
    private String postalCode;

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

    public Long getId() &#123; return id; &#125;
    public String getAddressLine() &#123; return addressLine; &#125;
    public String getCity() &#123; return city; &#125;
    public String getState() &#123; return state; &#125;
    public String getCountry() &#123; return country; &#125;
    public String getPostalCode() &#123; return postalCode; &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="employee">
        <h2 id="employee">3. Create the Employee Entity</h2>
        <p><code>&#64;ManyToOne</code> maps the reference, while <code>&#64;JoinColumn</code> creates the <code>address_id</code> foreign key in the employee table. The relationship is lazy so loading an employee does not automatically load the address.</p>
        <pre>package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

&#64;Entity
public class Employee &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    &#64;ManyToOne(fetch = FetchType.LAZY, optional = false)
    &#64;JoinColumn(name = "address_id", nullable = false)
    private Address address;

    protected Employee() &#123; &#125;

    public Employee(String name, String email, Address address) &#123;
        this.name = name;
        this.email = email;
        this.address = address;
    &#125;

    public Long getId() &#123; return id; &#125;
    public String getName() &#123; return name; &#125;
    public String getEmail() &#123; return email; &#125;
    public Address getAddress() &#123; return address; &#125;
&#125;</pre>
        <div class="note-box"><strong>Cascade note:</strong> the many side should not blindly use <code>CascadeType.ALL</code> when an address can be shared by multiple employees. Persist the address first or use only the cascade operations that match its lifecycle.</div>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">4. Configure Hibernate</h2>
        <p>Place <code>hibernate.cfg.xml</code> in <code>src/main/resources</code> and register both entities.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;org.h2.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:h2:mem:employee-address;DB_CLOSE_DELAY=-1&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;sa&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.H2Dialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;create-drop&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;mapping class="com.example.Address"/&gt;
    &lt;mapping class="com.example.Employee"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p>Use Flyway, Liquibase, or another migration tool instead of <code>create-drop</code> for production schema changes.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">5. Store Two Employees with One Address</h2>
        <p>Persist one Address and use it for two Employee objects. This produces one address row and two employee rows that reference it.</p>
        <pre>try (SessionFactory factory = new Configuration()
        .configure()
        .buildSessionFactory();
     Session session = factory.openSession()) &#123;

    Transaction transaction = session.beginTransaction();
    try &#123;
        Address office = new Address(
            "13 Sector 3",
            "Noida",
            "Uttar Pradesh",
            "India",
            "201301");
        session.persist(office);

        Employee first = new Employee(
            "Ravi Malik", "ravi&#64;example.com", office);
        Employee second = new Employee(
            "Anuj Verma", "anuj&#64;example.com", office);
        session.persist(first);
        session.persist(second);

        transaction.commit();
    &#125; catch (RuntimeException exception) &#123;
        transaction.rollback();
        throw exception;
    &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="fetch">
        <h2 id="fetch">6. Fetch Employees and Their Address</h2>
        <p>Use a typed HQL fetch join when the result requires both employees and addresses.</p>
        <pre>List&lt;Employee&gt; employees = session
    .createQuery(
        "select e from Employee e "
        + "join fetch e.address",
        Employee.class)
    .getResultList();

for (Employee employee : employees) &#123;
    Address address = employee.getAddress();
    System.out.println(
        employee.getName() + " - "
        + address.getCity());
&#125;</pre>
        <p>Access a lazy association while the session is open, or fetch it explicitly as shown. Avoid returning entities with uninitialized relationships from a closed-session web request.</p>
      </section>

      <section aria-labelledby="bidirectional">
        <h2 id="bidirectional">Optional Bidirectional Mapping</h2>
        <p>If the application must find all employees for an address, add a collection to Address:</p>
        <pre>&#64;OneToMany(mappedBy = "address")
private List&lt;Employee&gt; employees = new ArrayList&lt;&gt;();</pre>
        <p>The Employee field remains the owning side. Maintain both sides with helper methods and avoid eager loading a large employee collection.</p>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Many-to-One Best Practices</h2>
        <ul><li>Put the foreign key on the many-side table.</li><li>Use <code>optional = false</code> and a non-null join column when every employee must have an address.</li><li>Do not use <code>CascadeType.REMOVE</code> when the referenced address can be shared.</li><li>Use lazy loading and deliberate fetch joins.</li><li>Add an index on the foreign-key column for large employee tables.</li><li>Use database constraints to enforce referential integrity.</li><li>Exclude associations from <code>equals()</code> and <code>hashCode()</code>.</li><li>Use schema migrations in production.</li></ul>
        <div class="success-box"><strong>Result:</strong> many employees reference one address through the <code>employee.address_id</code> foreign key.</div>
      </section>
    </article>
  `,
  styles: [`
    .many-to-one-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.many-to-one-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.many-to-one-page section{max-width:70rem;margin-top:3rem}.many-to-one-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.many-to-one-page p,.many-to-one-page li{line-height:1.8}.many-to-one-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.many-to-one-page code{color:#be123c}.many-to-one-page pre code{color:inherit}.relationship-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.8rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff;color:#0f3460;font-weight:800}.relationship-flow b{color:#0891b2;font-size:1.3rem}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class HibernateManyToOneComponent {}
