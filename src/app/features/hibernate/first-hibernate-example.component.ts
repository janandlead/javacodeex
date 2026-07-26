import { Component } from '@angular/core';

@Component({
  selector: 'app-first-hibernate-example',
  standalone: true,
  template: `
    <article class="example-page container-xl">
      <p class="eyebrow">Hibernate Fundamentals</p>
      <h1>First Hibernate Example</h1>
      <p class="lead">Build a small Hibernate application that maps an Employee object to a database table and persists it in a transaction.</p>

      <section aria-labelledby="steps">
        <h2 id="steps">Steps to Create a Hibernate Application</h2>
        <ol class="steps">
          <li>Create a persistent entity class.</li>
          <li>Create a mapping configuration.</li>
          <li>Configure the database connection.</li>
          <li>Build a <code>SessionFactory</code> and open a <code>Session</code>.</li>
          <li>Store or retrieve the persistent object inside a transaction.</li>
          <li>Add Hibernate and database-driver dependencies.</li>
          <li>Run the application from an IDE, Maven, or the command line.</li>
        </ol>
      </section>

      <section aria-labelledby="project">
        <h2 id="project">Example Project Structure</h2>
        <pre>hibernate-demo/
  pom.xml
  src/main/java/com/example/Employee.java
  src/main/java/com/example/StoreData.java
  src/main/resources/hibernate.cfg.xml</pre>
        <p>This example uses Hibernate's native bootstrapping API and annotations. Annotations are the recommended starting point for new applications; XML mapping is included below for compatibility with older projects.</p>
      </section>

      <section aria-labelledby="persistent-class">
        <h2 id="persistent-class">1. Create the Persistent Class</h2>
        <p>A persistent class represents a row in a database table. It should have a no-argument constructor, an identifier, and accessible properties. Keep the class non-final when Hibernate proxies are needed.</p>
        <pre>package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

&#64;Entity
public class Employee &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
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
        <ul>
          <li>The <code>&#64;Entity</code> annotation makes the class persistent.</li>
          <li><code>&#64;Id</code> identifies the primary-key property.</li>
          <li><code>&#64;GeneratedValue</code> lets the database generate the identifier.</li>
          <li>The protected no-argument constructor is available to Hibernate without being part of the public API.</li>
        </ul>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">2. Configure Hibernate</h2>
        <p>Create <code>hibernate.cfg.xml</code> in <code>src/main/resources</code>. Replace the URL, username, password, dialect, and driver with values for your database.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;com.mysql.cj.jdbc.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:mysql://localhost:3306/company&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;root&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;change-me&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.MySQLDialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;update&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;property name="hibernate.format_sql"&gt;true&lt;/property&gt;
    &lt;mapping class="com.example.Employee"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <div class="note-box"><strong>Production note:</strong> use migrations such as Flyway or Liquibase in production. The <code>update</code> setting is convenient for learning but should not be relied on for controlled schema changes.</div>
      </section>

      <section aria-labelledby="dependencies">
        <h2 id="dependencies">3. Add the Required JAR Files</h2>
        <p>Maven resolves Hibernate's transitive dependencies automatically. Add Hibernate ORM and the JDBC driver to <code>pom.xml</code>:</p>
        <pre>&lt;dependency&gt;
  &lt;groupId&gt;org.hibernate.orm&lt;/groupId&gt;
  &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
  &lt;version&gt;6.6.9.Final&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
  &lt;groupId&gt;com.mysql&lt;/groupId&gt;
  &lt;artifactId&gt;mysql-connector-j&lt;/artifactId&gt;
  &lt;version&gt;9.2.0&lt;/version&gt;
&lt;/dependency&gt;</pre>
        <p>For a manual setup, the Hibernate core JAR, its transitive dependencies, and the matching database JDBC driver must all be on the classpath. Maven or Gradle is safer because it keeps these versions consistent.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">4. Store the Persistent Object</h2>
        <p>Create a session, begin a transaction, persist the employee, and commit the transaction. Always close the session factory when the application shuts down.</p>
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
                session.persist(new Employee("Raj", "Kumar"));
                transaction.commit();
                System.out.println("Employee saved successfully");
            &#125; catch (RuntimeException exception) &#123;
                transaction.rollback();
                throw exception;
            &#125;
        &#125;
    &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="mapping">
        <h2 id="mapping">Optional XML Mapping</h2>
        <p>Older Hibernate applications may use an <code>Employee.hbm.xml</code> mapping file instead of annotations. The root <code>hibernate-mapping</code> element contains a class mapping, an <code>id</code> mapping, a generator, and property mappings.</p>
        <pre>&lt;hibernate-mapping&gt;
  &lt;class name="com.example.Employee" table="employee"&gt;
    &lt;id name="id" column="id"&gt;
      &lt;generator class="identity"/&gt;
    &lt;/id&gt;
    &lt;property name="firstName" column="first_name"/&gt;
    &lt;property name="lastName" column="last_name"/&gt;
  &lt;/class&gt;
&lt;/hibernate-mapping&gt;</pre>
        <p>When using XML mapping, register it with <code>&lt;mapping resource="Employee.hbm.xml"/&gt;</code> and remove the annotation-based mapping or choose one mapping strategy deliberately.</p>
      </section>

      <section aria-labelledby="run">
        <h2 id="run">5. Run the Application</h2>
        <p>Ensure that the database exists and the credentials in <code>hibernate.cfg.xml</code> are correct. Then run the class from the project directory:</p>
        <pre>mvn compile
mvn exec:java -Dexec.mainClass="com.example.StoreData"</pre>
        <p>With a manually assembled classpath, include <code>target/classes</code>, Hibernate dependencies, and the JDBC driver. The exact command depends on the operating system and the location of each JAR, which is why Maven or Gradle is recommended.</p>
      </section>

      <section aria-labelledby="result">
        <h2 id="result">What Happens Internally?</h2>
        <ol>
          <li><code>Configuration</code> reads the Hibernate configuration and entity mappings.</li>
          <li><code>SessionFactory</code> is built from that metadata and is normally reused.</li>
          <li>A <code>Session</code> opens a persistence context and a transaction starts.</li>
          <li><code>persist()</code> makes the new entity managed.</li>
          <li>On commit, Hibernate flushes an <code>INSERT</code> statement through JDBC.</li>
          <li>The session and factory close, releasing resources.</li>
        </ol>
        <div class="success-box"><strong>Expected result:</strong> one employee row is inserted into the <code>employee</code> table, and Hibernate prints the generated SQL when <code>hibernate.show_sql</code> is enabled.</div>
      </section>

      <section aria-labelledby="checklist">
        <h2 id="checklist">Common Problems Checklist</h2>
        <ul>
          <li>Check that the database server is running and the schema exists.</li>
          <li>Verify the JDBC driver, URL, username, and password.</li>
          <li>Use <code>jakarta.persistence</code> imports with Hibernate 6; older Hibernate 5 projects may use <code>javax.persistence</code>.</li>
          <li>Confirm that the entity class is registered by annotation scanning or mapping configuration.</li>
          <li>Rollback a failed transaction before closing the session.</li>
          <li>Do not create a new <code>SessionFactory</code> for every database operation.</li>
        </ul>
      </section>
    </article>
  `,
  styles: [`
    .example-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.example-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.example-page section{max-width:70rem;margin-top:3rem}.example-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.example-page p,.example-page li{line-height:1.8}.example-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.example-page code{color:#be123c}.example-page pre code{color:inherit}.steps{padding-left:1.5rem}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class FirstHibernateExampleComponent {}
