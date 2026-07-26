import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-second-level-cache',
  standalone: true,
  template: `
    <article class="second-cache-page container-xl">
      <p class="eyebrow">Hibernate Performance</p>
      <h1>Second-Level Cache in Hibernate</h1>
      <p class="lead">Configure Hibernate's optional SessionFactory-level cache so suitable entity data can be reused across multiple sessions.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">What Is the Second-Level Cache?</h2>
        <p>The second-level cache is shared by sessions created from the same <code>SessionFactory</code>. When an eligible entity is loaded in one session, Hibernate may store its state in a cache region. A later session can reuse that state instead of querying the database.</p>
        <div class="scope-flow"><span>Session 1</span><b>→</b><span>SessionFactory cache</span><b>←</b><span>Session 2</span></div>
        <div class="note-box"><strong>Important:</strong> the cache stores entity state, not a live entity object shared between sessions. Each session still manages its own entity instance and persistence context.</div>
      </section>

      <section aria-labelledby="enable">
        <h2 id="enable">Enable Second-Level Caching</h2>
        <p>Second-level caching is not useful until a cache region factory and a cache provider are configured. Hibernate 6 provides the <code>hibernate-jcache</code> integration for JCache-compatible providers.</p>
        <pre>&lt;dependency&gt;
  &lt;groupId&gt;org.hibernate.orm&lt;/groupId&gt;
  &lt;artifactId&gt;hibernate-jcache&lt;/artifactId&gt;
  &lt;version&gt;6.6.9.Final&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
  &lt;groupId&gt;org.ehcache&lt;/groupId&gt;
  &lt;artifactId&gt;ehcache&lt;/artifactId&gt;
  &lt;version&gt;3.10.8&lt;/version&gt;
&lt;/dependency&gt;</pre>
        <p>Keep provider versions compatible with the Hibernate and Jakarta dependencies used by the application. Other integrations, such as Infinispan, may be more appropriate for clustered deployments.</p>
        <pre>&lt;property name="hibernate.cache.use_second_level_cache"&gt;true&lt;/property&gt;
&lt;property name="hibernate.cache.region.factory_class"&gt;jcache&lt;/property&gt;
&lt;property name="hibernate.javax.cache.provider"&gt;
  org.ehcache.jsr107.EhcacheCachingProvider
&lt;/property&gt;
&lt;property name="hibernate.javax.cache.uri"&gt;ehcache.xml&lt;/property&gt;</pre>
        <p>Configuration property names vary across Hibernate generations and JCache integrations. Confirm the exact settings for the selected Hibernate version and provider.</p>
      </section>

      <section aria-labelledby="entity">
        <h2 id="entity">Mark an Entity as Cacheable</h2>
        <p>Enabling the cache does not mean every entity should be cached. Mark suitable entities explicitly and choose a concurrency strategy.</p>
        <pre>import jakarta.persistence.Cacheable;
import jakarta.persistence.Entity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

&#64;Entity
&#64;Cacheable
&#64;Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Country &#123;
    &#64;Id
    private Long id;

    private String name;
&#125;</pre>
        <p><code>READ_ONLY</code> suits immutable reference data. For data that changes, select a strategy only after understanding update frequency, concurrency, and consistency requirements.</p>
      </section>

      <section aria-labelledby="strategies">
        <h2 id="strategies">Cache Concurrency Strategies</h2>
        <table class="table table-bordered"><thead><tr><th>Strategy</th><th>Typical use</th></tr></thead><tbody>
          <tr><td><code>READ_ONLY</code></td><td>Immutable data that never changes after deployment.</td></tr>
          <tr><td><code>NONSTRICT_READ_WRITE</code></td><td>Data that changes rarely and can tolerate a short stale-data window.</td></tr>
          <tr><td><code>READ_WRITE</code></td><td>Mutable data requiring coordinated cache updates through a supported strategy.</td></tr>
          <tr><td><code>TRANSACTIONAL</code></td><td>Provider and transaction environment support transactional cache semantics.</td></tr>
        </tbody></table>
        <div class="warning-box"><strong>Consistency warning:</strong> Hibernate cannot automatically know about updates made directly by another application, SQL script, or service. External changes can leave cache entries stale until they expire or are evicted.</div>
      </section>

      <section aria-labelledby="example">
        <h2 id="example">Second-Level Cache Example</h2>
        <p>The first session loads the entity. After it closes, a second session can use the shared cache when the entity is cacheable and the provider has retained the entry.</p>
        <pre>try (Session firstSession = factory.openSession()) &#123;
    Country first = firstSession.find(Country.class, 1L);
&#125;

try (Session secondSession = factory.openSession()) &#123;
    Country second = secondSession.find(Country.class, 1L);
&#125;</pre>
        <p>The second lookup is eligible for a second-level cache hit. The actual result depends on entity cache metadata, cache configuration, expiry, invalidation, and whether the first-level cache already contains the entity.</p>
      </section>

      <section aria-labelledby="regions">
        <h2 id="regions">Cache Regions and Collections</h2>
        <p>Hibernate organizes cached data into regions. An entity hierarchy has an entity region, while a cached collection has a collection-region name derived from its role.</p>
        <pre>&#64;OneToMany(mappedBy = "department")
&#64;Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
private Set&lt;Employee&gt; employees = new HashSet&lt;&gt;();</pre>
        <p>Cache a collection only when its access pattern and invalidation behavior justify the memory and operational cost. Query-result caching is separate and should not be confused with entity caching.</p>
      </section>

      <section aria-labelledby="manage">
        <h2 id="manage">Evict and Manage Cached Data</h2>
        <p>Use the Hibernate cache API when an administrative action requires explicit eviction.</p>
        <pre>SessionFactory sessionFactory = ...;

sessionFactory.getCache()
    .evictEntityData(Country.class, 1L);

sessionFactory.getCache()
    .evictEntityData(Country.class);

sessionFactory.getCache().evictAllRegions();</pre>
        <p>Eviction APIs are powerful and can affect active application traffic. Prefer correct cache invalidation and provider configuration over frequent manual eviction.</p>
      </section>

      <section aria-labelledby="comparison">
        <h2 id="comparison">First-Level versus Second-Level Cache</h2>
        <table class="table table-bordered"><thead><tr><th>Characteristic</th><th>First-level cache</th><th>Second-level cache</th></tr></thead><tbody>
          <tr><td>Scope</td><td>One Session</td><td>Shared by sessions from one SessionFactory</td></tr>
          <tr><td>Default</td><td>Enabled automatically</td><td>Requires a provider and explicit entity configuration</td></tr>
          <tr><td>Data</td><td>Managed entity instances</td><td>Cached entity state and configured collection data</td></tr>
          <tr><td>Lifetime</td><td>Session or persistence-context lifetime</td><td>Provider and region lifetime, subject to expiry and eviction</td></tr>
          <tr><td>Main benefit</td><td>Identity consistency within a unit of work</td><td>Reuse across sessions and reduced database reads</td></tr>
        </tbody></table>
      </section>

      <section aria-labelledby="providers">
        <h2 id="providers">Cache Providers</h2>
        <p>Hibernate integrates with external cache implementations rather than being a complete cache database itself.</p>
        <ul><li><strong>JCache-compatible providers:</strong> use the Hibernate JCache integration with a provider such as Ehcache where appropriate.</li><li><strong>Infinispan:</strong> useful for distributed or clustered cache scenarios when its operational model fits the application.</li><li><strong>Other integrations:</strong> verify compatibility, maintenance status, clustering behavior, serialization, and transaction support before adoption.</li></ul>
        <p>Older tutorials may mention SwarmCache, OSCache, or JBoss Cache. These names describe historical integrations and should not be copied into a current Hibernate configuration without verifying project compatibility.</p>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Second-Level Cache Best Practices</h2>
        <ul><li>Cache stable, frequently read data rather than every entity.</li><li>Measure cache hit rate, database load, memory, and stale-data behavior.</li><li>Choose a concurrency strategy that matches the data's consistency requirements.</li><li>Do not cache data that changes outside Hibernate unless invalidation is coordinated.</li><li>Keep cache regions and expiry policies explicit.</li><li>Test updates, deletes, rollbacks, deployment, and cluster behavior.</li><li>Remember that query caching is separate from second-level entity caching.</li></ul>
        <div class="success-box"><strong>Summary:</strong> the second-level cache is an optional SessionFactory-level cache shared across sessions. It can reduce repeated database reads, but only when entity selection, invalidation, provider compatibility, and consistency are designed carefully.</div>
        <p class="source-link">Reference: <a href="https://docs.hibernate.org/stable/orm/introduction/html_single/" target="_blank" rel="noopener">Hibernate ORM caching documentation</a></p>
      </section>
    </article>
  `,
  styles: [`
    .second-cache-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.second-cache-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.second-cache-page section{max-width:70rem;margin-top:3rem}.second-cache-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.second-cache-page p,.second-cache-page li{line-height:1.8}.second-cache-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.second-cache-page code{color:#be123c}.second-cache-page pre code{color:inherit}.scope-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.8rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff;color:#0f3460;font-weight:800}.scope-flow b{color:#0891b2;font-size:1.3rem}.cache-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.cache-grid>div{padding:1.15rem;border:1px solid #dbeafe;border-radius:.8rem;background:#f8fbff}.cache-grid strong{color:#0f766e}.cache-grid p{margin:.45rem 0 0}.note-box,.warning-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.warning-box{border-left-color:#d97706;background:#fffbeb}.success-box{border-left-color:#16a34a;background:#f0fdf4}.source-link a{color:#0369a1;font-weight:700}@media(max-width:700px){.cache-grid{grid-template-columns:1fr}}
  `]
})
export class HibernateSecondLevelCacheComponent {}
