import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-example',
  standalone: true,
  template: `
    <article class="hibernate-example-page container-xl">
      <p class="eyebrow">Hibernate ORM</p>
      <h1>Hibernate Example with Annotations</h1>
      <p class="lead">Create a Maven-based Hibernate application that maps an Employee entity to a database table without an XML mapping file.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">Hibernate Annotation Example</h2>
        <p>Hibernate annotations provide metadata directly in Java source code. They are based on the Jakarta Persistence specification and remove the need for a separate Hibernate mapping file for common entity mappings.</p>
        <div class="annotation-grid">
          <div><code>&#64;Entity</code><p>Marks a class as a persistent entity.</p></div>
          <div><code>&#64;Table</code><p>Customizes the database table name.</p></div>
          <div><code>&#64;Id</code><p>Identifies the primary-key property.</p></div>
          <div><code>&#64;Column</code><p>Customizes a column name and constraints.</p></div>
          <div><code>&#64;GeneratedValue</code><p>Defines how an identifier is generated.</p></div>
          <div><code>&#64;Transient</code><p>Excludes a property from persistence.</p></div>
        </div>
        <div class="note-box"><strong>Package note:</strong> Hibernate 6 uses <code>jakarta.persistence</code>. Older Hibernate 5 applications commonly use <code>javax.persistence</code>. Do not mix the two namespaces in one application.</div>
      </section>

      <section aria-labelledby="project">
        <h2 id="project">1. Create a Maven Project</h2>
        <p>Create a standard Maven project in your IDE or from the command line. A simple structure looks like this:</p>
        <pre>hibernate-annotation-demo/
  pom.xml
  src/main/java/com/example/Employee.java
  src/main/java/com/example/StoreData.java
  src/main/resources/hibernate.cfg.xml</pre>
      </section>

      <section aria-labelledby="pom">
        <h2 id="pom">2. Configure Maven Dependencies</h2>
        <p>Add Hibernate ORM and a JDBC driver to <code>pom.xml</code>. Maven downloads Hibernate's transitive dependencies automatically.</p>
        <pre>&lt;properties&gt;
  &lt;maven.compiler.release&gt;17&lt;/maven.compiler.release&gt;
  &lt;hibernate.version&gt;6.6.9.Final&lt;/hibernate.version&gt;
&lt;/properties&gt;

&lt;dependencies&gt;
  &lt;dependency&gt;
    &lt;groupId&gt;org.hibernate.orm&lt;/groupId&gt;
    &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
  &lt;version&gt;&#36;&#123;hibernate.version&#125;&lt;/version&gt;
  &lt;/dependency&gt;
  &lt;dependency&gt;
    &lt;groupId&gt;com.h2database&lt;/groupId&gt;
    &lt;artifactId&gt;h2&lt;/artifactId&gt;
    &lt;version&gt;2.3.232&lt;/version&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
  &lt;/dependency&gt;
&lt;/dependencies&gt;</pre>
        <p>H2 keeps this example self-contained. For MySQL or PostgreSQL, replace H2 with the corresponding JDBC driver and update the connection settings. Avoid adding old or manually downloaded Oracle driver artifacts unless your project has a licensed, compatible driver.</p>
      </section>

      <section aria-labelledby="entity">
        <h2 id="entity">3. Create the Persistent Entity</h2>
        <p>The entity below maps Java fields to the <code>employee</code> table. A no-argument constructor is required by Hibernate, and the generated identifier is assigned when the entity is persisted.</p>
        <pre>package com.example;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

&#64;Entity
&#64;Table(name = "employee")
public class Employee &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    &#64;Column(name = "first_name", nullable = false)
    private String firstName;

    &#64;Column(name = "last_name", nullable = false)
    private String lastName;

    protected Employee() &#123;
        // Required by Hibernate.
    &#125;

    public Employee(String firstName, String lastName) &#123;
        this.firstName = firstName;
        this.lastName = lastName;
    &#125;

    public Long getId() &#123; return id; &#125;
    public String getFirstName() &#123; return firstName; &#125;
    public String getLastName() &#123; return lastName; &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">4. Create the Hibernate Configuration</h2>
        <p>Place <code>hibernate.cfg.xml</code> in <code>src/main/resources</code>. The <code>mapping class</code> element registers the annotated entity.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;org.h2.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:h2:mem:company;DB_CLOSE_DELAY=-1&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;sa&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.H2Dialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;create-drop&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;property name="hibernate.format_sql"&gt;true&lt;/property&gt;
    &lt;mapping class="com.example.Employee"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p><code>create-drop</code> creates the table for the example and removes it when the factory closes. Use migrations such as Flyway or Liquibase for production schema management.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">5. Store the Persistent Object</h2>
        <p>Open a session, begin a transaction, persist an Employee, and commit. The transaction rollback protects the database if the operation fails.</p>
        <pre>package com.example;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class StoreData &#123;
    public static void main(String[] args) &#123;
        try (SessionFactory factory = new Configuration()
                .configure()
                .buildSessionFactory();
             Session session = factory.openSession()) &#123;

            Transaction transaction = session.beginTransaction();
            try &#123;
                Employee employee = new Employee("Gaurav", "Chawla");
                session.persist(employee);
                transaction.commit();
                System.out.println("Employee saved with id: " + employee.getId());
            &#125; catch (RuntimeException exception) &#123;
                transaction.rollback();
                throw exception;
            &#125;
        &#125;
    &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="run">
        <h2 id="run">6. Run the Application</h2>
        <p>From the project directory, compile and run the class using Maven:</p>
        <pre>mvn compile
mvn exec:java -Dexec.mainClass="com.example.StoreData"</pre>
        <p>If your IDE runs the class directly, make sure <code>src/main/resources</code> is on the runtime classpath. Hibernate should create the table, execute an <code>INSERT</code>, and print the generated identifier.</p>
        <div class="success-box"><strong>Expected result:</strong> an employee is inserted into the <code>employee</code> table and the console prints a message similar to <code>Employee saved with id: 1</code>.</div>
      </section>

      <section aria-labelledby="annotations">
        <h2 id="annotations">How the Annotations Work</h2>
        <table class="table table-bordered"><thead><tr><th>Annotation</th><th>Purpose</th></tr></thead><tbody>
          <tr><td><code>&#64;Entity</code></td><td>Declares that the class can be persisted.</td></tr>
          <tr><td><code>&#64;Table(name = "employee")</code></td><td>Maps the entity to a specific table. Without it, the provider derives a table name.</td></tr>
          <tr><td><code>&#64;Id</code></td><td>Marks the primary-key attribute.</td></tr>
          <tr><td><code>&#64;GeneratedValue</code></td><td>Delegates identifier generation to the selected strategy and database.</td></tr>
          <tr><td><code>&#64;Column</code></td><td>Customizes a column name and constraints such as <code>nullable</code>.</td></tr>
        </tbody></table>
      </section>

      <section aria-labelledby="troubleshooting">
        <h2 id="troubleshooting">Common Problems</h2>
        <ul>
          <li><strong>Entity not found:</strong> verify the <code>mapping class</code> entry or package scanning configuration.</li>
          <li><strong>Driver error:</strong> confirm that the JDBC driver is in the runtime dependencies.</li>
          <li><strong>Namespace error:</strong> use <code>jakarta.persistence</code> with Hibernate 6 and <code>javax.persistence</code> only with a matching older stack.</li>
          <li><strong>Table changes are unexpected:</strong> replace development-only schema generation with a database migration tool.</li>
          <li><strong>Resource leaks:</strong> close the <code>Session</code> and <code>SessionFactory</code>, preferably with try-with-resources.</li>
        </ul>
      </section>
    </article>
  `,
  styles: [`
    .hibernate-example-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.hibernate-example-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.hibernate-example-page section{max-width:70rem;margin-top:3rem}.hibernate-example-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.hibernate-example-page p,.hibernate-example-page li{line-height:1.8}.hibernate-example-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.hibernate-example-page code{color:#be123c}.hibernate-example-page pre code{color:inherit}.annotation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.annotation-grid div{padding:1.1rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.annotation-grid code{font-weight:800;color:#0f766e}.annotation-grid p{margin:.45rem 0 0}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}@media(max-width:700px){.annotation-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateExampleComponent {}
