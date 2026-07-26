import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-dialects',
  standalone: true,
  template: `
    <article class="dialects-page container-xl">
      <p class="eyebrow">Hibernate Database Configuration</p>
      <h1>SQL Dialects in Hibernate</h1>
      <p class="lead">Understand how Hibernate adapts SQL, data types, pagination, and schema generation to different relational databases.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">What Is a Hibernate Dialect?</h2>
        <p>A dialect is a Hibernate service that describes database-specific SQL capabilities and translates Hibernate operations into SQL supported by that database. It helps Hibernate handle differences in functions, data types, pagination, sequences, identity columns, and DDL.</p>
        <p>Dialect classes are located in the <code>org.hibernate.dialect</code> package. The correct choice depends on the Hibernate ORM version and the database version.</p>
      </section>

      <section aria-labelledby="automatic">
        <h2 id="automatic">Automatic Dialect Resolution</h2>
        <p>Hibernate 6 and later can usually determine the dialect by reading JDBC metadata. In a normal application, you often do not need to set <code>hibernate.dialect</code> manually.</p>
        <pre>hibernate.connection.url=jdbc:postgresql://localhost:5432/company
hibernate.connection.username=app_user
hibernate.connection.password=change-me
# Hibernate resolves PostgreSQL from JDBC metadata.</pre>
        <div class="note-box"><strong>When explicit configuration helps:</strong> specify a dialect when JDBC metadata is unavailable, startup must avoid database access, or the application uses a custom or community dialect.</div>
      </section>

      <section aria-labelledby="explicit">
        <h2 id="explicit">Explicit Dialect Configuration</h2>
        <p>Use the fully qualified dialect class name in a properties file or Hibernate configuration file when you need to select it explicitly.</p>
        <pre>&lt;property name="hibernate.dialect"&gt;
  org.hibernate.dialect.PostgreSQLDialect
&lt;/property&gt;</pre>
        <p>Older tutorials may show version-specific names such as <code>MySQL8Dialect</code> or <code>Oracle12cDialect</code>. Current Hibernate versions generally use the unversioned dialect class and infer supported behavior from the database. Always check the documentation for the exact Hibernate version used by the project.</p>
      </section>

      <section aria-labelledby="supported">
        <h2 id="supported">Common Built-in Dialects</h2>
        <table class="table table-bordered"><thead><tr><th>Database family</th><th>Typical Hibernate dialect</th><th>Notes</th></tr></thead><tbody>
          <tr><td>H2</td><td><code>org.hibernate.dialect.H2Dialect</code></td><td>Useful for local development and tests.</td></tr>
          <tr><td>MySQL</td><td><code>org.hibernate.dialect.MySQLDialect</code></td><td>Use a current MySQL version supported by your Hibernate release.</td></tr>
          <tr><td>MariaDB</td><td><code>org.hibernate.dialect.MariaDBDialect</code></td><td>Use the MariaDB dialect when the server is MariaDB.</td></tr>
          <tr><td>PostgreSQL</td><td><code>org.hibernate.dialect.PostgreSQLDialect</code></td><td>Supports PostgreSQL-specific SQL and types.</td></tr>
          <tr><td>Oracle</td><td><code>org.hibernate.dialect.OracleDialect</code></td><td>Check the minimum Oracle version for your Hibernate release.</td></tr>
          <tr><td>Microsoft SQL Server</td><td><code>org.hibernate.dialect.SQLServerDialect</code></td><td>Supports SQL Server syntax and capabilities.</td></tr>
          <tr><td>DB2</td><td><code>org.hibernate.dialect.DB2Dialect</code></td><td>Use the matching DB2 family dialect where required.</td></tr>
          <tr><td>HSQLDB</td><td><code>org.hibernate.dialect.HSQLDialect</code></td><td>Common in lightweight test environments.</td></tr>
          <tr><td>SAP HANA</td><td><code>org.hibernate.dialect.HANADialect</code></td><td>Use a compatible Hibernate and HANA combination.</td></tr>
          <tr><td>Sybase</td><td><code>org.hibernate.dialect.SybaseDialect</code></td><td>Some Sybase variants use separate dialect classes.</td></tr>
        </tbody></table>
        <p class="small-note">The exact supported database versions and dialect classes change between Hibernate releases. Treat this table as a starting point, not a substitute for the version-specific Hibernate dialect documentation.</p>
      </section>

      <section aria-labelledby="legacy">
        <h2 id="legacy">Legacy and Community Dialects</h2>
        <p>Older Hibernate references list classes such as <code>Oracle9Dialect</code>, <code>Oracle10gDialect</code>, <code>MySQLInnoDBDialect</code>, <code>MySQLMyISAMDialect</code>, <code>SAPDBDialect</code>, <code>InformixDialect</code>, <code>IngresDialect</code>, <code>FirebirdDialect</code>, and <code>InterbaseDialect</code>. Some are obsolete, renamed, moved, or no longer maintained in <code>hibernate-core</code>.</p>
        <p>Since Hibernate 6, some less common dialects are distributed in the optional <code>hibernate-community-dialects</code> artifact. Community dialects may have different compatibility and support expectations from dialects maintained in core.</p>
        <pre>&lt;dependency&gt;
  &lt;groupId&gt;org.hibernate.orm&lt;/groupId&gt;
  &lt;artifactId&gt;hibernate-community-dialects&lt;/artifactId&gt;
  &lt;version&gt;6.6.9.Final&lt;/version&gt;
&lt;/dependency&gt;</pre>
        <p>Only add this dependency when the selected dialect actually requires it, and keep its version aligned with <code>hibernate-core</code>.</p>
      </section>

      <section aria-labelledby="not">
        <h2 id="not">What a Dialect Does Not Do</h2>
        <ul>
          <li>It does not create a database connection; the JDBC driver and connection settings do that.</li>
          <li>It does not replace the database JDBC driver.</li>
          <li>It does not make every database feature portable.</li>
          <li>It does not remove the need for schema migrations in production.</li>
        </ul>
      </section>

      <section aria-labelledby="choose">
        <h2 id="choose">Best Practices</h2>
        <ol>
          <li>Use a Hibernate version compatible with the target database version.</li>
          <li>Prefer automatic dialect resolution in Hibernate 6+ when JDBC metadata is available.</li>
          <li>When configuring a dialect explicitly, use the class documented for your Hibernate release.</li>
          <li>Do not copy version-specific dialect names from old tutorials without checking the current API.</li>
          <li>Test generated SQL, pagination, schema validation, sequences, and database-specific types.</li>
          <li>Use Flyway, Liquibase, or another migration tool for production schema changes.</li>
        </ol>
        <div class="success-box"><strong>Summary:</strong> a dialect is Hibernate's database-specific SQL translator. In modern Hibernate, automatic resolution is usually enough; explicit configuration is reserved for special deployment or compatibility requirements.</div>
        <p class="source-link">Reference: <a href="https://docs.hibernate.org/stable/orm/dialect/" target="_blank" rel="noopener">Hibernate ORM supported dialects</a></p>
      </section>
    </article>
  `,
  styles: [`
    .dialects-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.dialects-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.dialects-page section{max-width:70rem;margin-top:3rem}.dialects-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.dialects-page p,.dialects-page li{line-height:1.8}.dialects-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.dialects-page code{color:#be123c}.dialects-page pre code{color:inherit}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}.small-note{color:#64748b;font-size:.95rem}.source-link a{color:#0369a1;font-weight:700}
  `]
})
export class HibernateDialectsComponent {}
