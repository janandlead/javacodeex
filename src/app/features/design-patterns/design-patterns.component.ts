import { AfterViewInit, Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatternLessonLink, syncPatternNavigation } from '../../shared/utils/pattern-navigation';

@Component({
  selector: 'app-design-patterns',
  standalone: true,
  imports: [RouterLink],
  template: `<article class="pattern-page container-xl">
    <section class="pattern-hero">
      <span class="eyebrow">Design Patterns · Java</span>
      <h1>Singleton Design Pattern in Java</h1>
      <p>Understand when one shared instance is useful, how to implement it safely, and why Enum Singleton is often the strongest default.</p>
      <div class="hero-tags"><span><i class="bi bi-clock"></i> 12 min read</span><span><i class="bi bi-bar-chart"></i> Beginner to intermediate</span><span><i class="bi bi-code-slash"></i> Java examples</span></div>
    </section>

    <div class="pattern-layout">
      <aside class="pattern-toc" aria-label="On this page">
        <p>On this page</p>
        <a href="#what">What is Singleton?</a>
        <a href="#when">When to use it</a>
        <a href="#implementations">Implementations</a>
        <a href="#thread-safety">Thread safety</a>
        <a href="#enum">Enum Singleton</a>
        <a href="#spring">Singleton in Spring</a>
        <a href="#trade-offs">Trade-offs</a>
      </aside>

      <main class="pattern-content">
        <section class="intro-card" id="what">
          <span class="section-icon"><i class="bi bi-bullseye"></i></span>
          <div><h2>What is the Singleton pattern?</h2><p>Singleton is a creational design pattern that controls object creation so a class exposes one shared instance and a well-defined access point. The important part is not the static method itself; it is the lifecycle guarantee and the reason the shared resource should exist only once.</p></div>
        </section>

        <section class="content-section" id="when">
          <h2>When is a single instance useful?</h2>
          <p>Use this pattern only when multiple instances would be incorrect or wasteful. Typical examples include a configuration snapshot, a process-wide cache, a metrics registry, or a carefully managed resource coordinator.</p>
          <div class="use-case-grid"><div><i class="bi bi-gear-wide-connected"></i><strong>Configuration</strong><span>One consistent source of application settings.</span></div><div><i class="bi bi-journal-text"></i><strong>Logging</strong><span>A shared logging pipeline with one policy.</span></div><div><i class="bi bi-database-check"></i><strong>Resource manager</strong><span>Coordinate a pool or registry without duplicates.</span></div></div>
          <div class="callout warning"><i class="bi bi-exclamation-triangle"></i><p><strong>Design caution:</strong> a Singleton is shared mutable state. Prefer dependency injection and immutable data when a normal service object is enough.</p></div>
        </section>

        <section class="content-section" id="implementations">
          <h2>Common implementations</h2>
          <p>Each implementation makes a different trade-off between startup cost, lazy creation, simplicity, and concurrency safety.</p>
          <h3>1. Lazy initialization</h3>
          <p>The object is created on first access. This compact version is useful for learning, but it is not safe when several threads can call it at the same time.</p>
          <pre><code>public final class LazyConfig &#123;
    private static LazyConfig instance;

    private LazyConfig() &#123; &#125;

    public static LazyConfig getInstance() &#123;
        if (instance == null) &#123;
            instance = new LazyConfig();
        &#125;
        return instance;
    &#125;
&#125;</code></pre>
          <div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Good for</strong><span>Simple single-threaded examples.</span></div><div class="dont"><strong><i class="bi bi-x-circle"></i> Avoid for</strong><span>Shared state accessed by concurrent requests.</span></div></div>

          <h3>2. Eager initialization</h3>
          <p>The JVM creates the instance while the class is initialized. Class initialization is thread-safe, so this is simple and reliable when the object is inexpensive.</p>
          <pre><code>public final class EagerConfig &#123;
    private static final EagerConfig INSTANCE = new EagerConfig();

    private EagerConfig() &#123; &#125;

    public static EagerConfig getInstance() &#123;
        return INSTANCE;
    &#125;
&#125;</code></pre>

          <h3>3. Bill Pugh holder idiom</h3>
          <p>A nested holder delays creation until the accessor is called while relying on the JVM’s class-initialization guarantees. It is a strong non-enum option.</p>
          <pre><code>public final class FeatureFlags &#123;
    private FeatureFlags() &#123; &#125;

    private static class Holder &#123;
        private static final FeatureFlags INSTANCE = new FeatureFlags();
    &#125;

    public static FeatureFlags getInstance() &#123;
        return Holder.INSTANCE;
    &#125;
&#125;</code></pre>
        </section>

        <section class="content-section" id="thread-safety">
          <h2>Thread safety and double-checked locking</h2>
          <p>A check-then-create implementation can allow two request threads to observe a missing instance simultaneously. If lazy creation is required and the holder idiom cannot be used, double-checked locking can reduce synchronization overhead.</p>
          <pre><code>public final class ConnectionRegistry &#123;
    private static volatile ConnectionRegistry instance;

    private ConnectionRegistry() &#123; &#125;

    public static ConnectionRegistry getInstance() &#123;
        if (instance == null) &#123;
            synchronized (ConnectionRegistry.class) &#123;
                if (instance == null) &#123;
                    instance = new ConnectionRegistry();
                &#125;
            &#125;
        &#125;
        return instance;
    &#125;
&#125;</code></pre>
          <div class="callout info"><i class="bi bi-lightbulb"></i><p><strong>Why volatile?</strong> It prevents a thread from observing a reference before the object’s construction is safely visible. Without it, instruction reordering can make this pattern incorrect.</p></div>
        </section>

        <section class="content-section" id="enum">
          <h2>Enum Singleton: the practical default</h2>
          <p>For a true singleton that does not need lazy configuration, an enum is concise and benefits from Java’s guarantees around initialization and serialization.</p>
          <pre><code>public enum AppMetrics &#123;
    INSTANCE;

    public void record(String event) &#123;
        System.out.println("Recorded: " + event);
    &#125;
&#125;

AppMetrics.INSTANCE.record("user-login");</code></pre>
          <ul class="check-list"><li>Safe initialization managed by the JVM.</li><li>Serialization preserves the enum constant.</li><li>Reflection cannot create another enum constant.</li><li>Easy to read and difficult to misuse.</li></ul>
        </section>

        <section class="content-section" id="spring">
          <h2>Singleton scope in Spring Boot</h2>
          <p>Spring-managed beans use singleton scope by default: the container creates one bean instance per application context and injects that same instance wherever it is needed.</p>
          <pre><code>&#64;Service
public class PaymentService &#123;
    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) &#123;
        this.repository = repository;
    &#125;
&#125;</code></pre>
          <p>This is usually preferable to writing a static Singleton yourself because dependency injection keeps dependencies visible, improves testing, and lets Spring manage the lifecycle.</p>
        </section>

        <section class="content-section" id="trade-offs">
          <h2>Trade-offs and interview summary</h2>
          <div class="comparison"><div class="comparison-head"><span>Approach</span><span>Lazy</span><span>Thread-safe</span><span>Recommendation</span></div><div><strong>Lazy field</strong><span>Yes</span><span>No</span><span>Learning only</span></div><div><strong>Eager field</strong><span>No</span><span>Yes</span><span>Small, cheap object</span></div><div><strong>Holder idiom</strong><span>Yes</span><span>Yes</span><span>Best class-based option</span></div><div><strong>Enum</strong><span>On class use</span><span>Yes</span><span>Best general default</span></div></div>
          <p>Singleton can reduce duplicate resources, but it can also introduce hidden global state, tight coupling, and difficult tests. In modern applications, first consider a framework-managed singleton or a normal injected service.</p>
          <div class="key-takeaway"><i class="bi bi-bookmark-star"></i><div><strong>Key takeaway</strong><span>Choose the simplest lifecycle that satisfies the requirement. Use Enum Singleton for a true Java singleton, the holder idiom for a class-based lazy option, and Spring’s default scope for application services.</span></div></div>
        </section>
        <nav class="lesson-actions" aria-label="Design patterns navigation"><a routerLink="/" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> All courses</a><a routerLink="/spring-ai" class="btn btn-primary">Explore Spring AI <i class="bi bi-arrow-right"></i></a></nav>
      </main>
    </div>
  </article>`,
  styles: [`.pattern-page{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}.pattern-hero{margin:1rem 0 2rem;padding:clamp(2rem,5vw,4rem) clamp(1.25rem,4vw,3.5rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(244,114,182,.22),transparent 28%),linear-gradient(135deg,#1e1033,#4a154d 58%,#164e63);box-shadow:0 1rem 2.5rem rgba(30,16,51,.18)}.eyebrow{color:#f9a8d4;font-size:.8rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pattern-hero h1{max-width:52rem;margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.pattern-hero p{max-width:48rem;margin:0;color:#fce7f3;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65}.hero-tags{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.hero-tags span{padding:.45rem .75rem;border:1px solid rgba(249,168,212,.35);border-radius:999px;color:#fce7f3;background:rgba(255,255,255,.08);font-size:.8rem;font-weight:700}.hero-tags i{margin-right:.3rem;color:#f9a8d4}.pattern-layout{display:grid;grid-template-columns:14rem minmax(0,1fr);gap:2rem}.pattern-toc{position:sticky;top:6rem;align-self:start;padding:1rem;border:1px solid #fbcfe8;border-radius:1rem;background:#fff}.pattern-toc p{margin:0 0 .65rem;color:#86198f;font-size:.75rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.pattern-toc a{display:block;padding:.45rem .55rem;border-radius:.4rem;color:#475569;font-size:.86rem;text-decoration:none}.pattern-toc a:hover{color:#be185d;background:#fdf2f8}.pattern-content{min-width:0}.intro-card,.content-section{margin-bottom:1.5rem;padding:clamp(1.25rem,3vw,2.25rem);border:1px solid #e2e8f0;border-radius:1.15rem;background:#fff;box-shadow:0 .6rem 1.75rem rgba(15,23,42,.06)}.intro-card{display:flex;gap:1rem;border-color:#fbcfe8;background:linear-gradient(135deg,#fff,#fdf2f8)}.section-icon{display:grid;width:3rem;height:3rem;flex:0 0 3rem;place-items:center;border-radius:.8rem;color:#be185d;background:#fce7f3;font-size:1.35rem}.content-section h2,.intro-card h2{margin:0 0 .85rem;color:#1e3a8a;font-size:clamp(1.4rem,2.5vw,2rem)}.content-section h3{margin:1.7rem 0 .55rem;color:#86198f;font-size:1.2rem}.content-section p{color:#334155;line-height:1.8}.content-section pre{margin:1rem 0 1.25rem;overflow:auto;padding:1.15rem;border-radius:.75rem;background:#111827;color:#e5e7eb;font-size:.88rem;line-height:1.65}.content-section code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.use-case-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin:1.25rem 0}.use-case-grid div{display:flex;min-height:8rem;flex-direction:column;gap:.35rem;padding:1rem;border:1px solid #fbcfe8;border-radius:.75rem;background:#fff7fb}.use-case-grid i{color:#db2777;font-size:1.35rem}.use-case-grid strong{color:#86198f}.use-case-grid span{color:#64748b;font-size:.88rem;line-height:1.5}.callout{display:flex;gap:.75rem;margin:1.25rem 0;padding:1rem;border-radius:.75rem}.callout i{font-size:1.2rem}.callout p{margin:0}.callout.warning{border-left:4px solid #f59e0b;background:#fffbeb}.callout.warning i{color:#d97706}.callout.info{border-left:4px solid #06b6d4;background:#ecfeff}.callout.info i{color:#0891b2}.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.pros-cons>div{display:flex;flex-direction:column;gap:.35rem;padding:.85rem 1rem;border-radius:.65rem}.pros-cons span{color:#475569;font-size:.9rem}.pros-cons .do{background:#f0fdf4}.pros-cons .do strong{color:#15803d}.pros-cons .dont{background:#fff7ed}.pros-cons .dont strong{color:#c2410c}.check-list{display:grid;gap:.55rem;margin:1rem 0 0;padding:0;list-style:none;color:#334155}.check-list li:before{margin-right:.5rem;color:#16a34a;content:"✓";font-weight:800}.comparison{overflow:hidden;margin:1.25rem 0;border:1px solid #e2e8f0;border-radius:.75rem}.comparison>div{display:grid;grid-template-columns:1.35fr .8fr .9fr 1fr;gap:.75rem;padding:.75rem 1rem;border-top:1px solid #e2e8f0;color:#475569;font-size:.9rem}.comparison .comparison-head{border-top:0;color:#fff;background:#1e3a8a;font-weight:800}.comparison strong{color:#1e3a8a}.key-takeaway{display:flex;gap:.75rem;padding:1rem;border:1px solid #bae6fd;border-radius:.75rem;background:#eff6ff}.key-takeaway>i{color:#0284c7;font-size:1.3rem}.key-takeaway div{display:flex;flex-direction:column;gap:.3rem}.key-takeaway strong{color:#0c4a6e}.key-takeaway span{color:#334155;line-height:1.6}.lesson-actions{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0}.lesson-actions .btn{min-height:2.75rem;font-weight:700}@media(max-width:900px){.pattern-layout{grid-template-columns:1fr}.pattern-toc{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:.25rem}.pattern-toc p{width:100%;margin-bottom:.2rem}.pattern-toc a{padding:.4rem .55rem;background:#fdf2f8}}@media(max-width:575.98px){.pattern-page{width:min(100% - 1rem,82.5rem)}.pattern-hero{padding:1.75rem 1.25rem}.intro-card{flex-direction:column}.use-case-grid,.pros-cons{grid-template-columns:1fr}.comparison{font-size:.78rem}.comparison>div{grid-template-columns:1.2fr .7fr .8fr .95fr;gap:.35rem;padding:.65rem .5rem}.lesson-actions{flex-direction:column}.lesson-actions .btn{width:100%}}`]
})
export class DesignPatternsComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly lessons: readonly PatternLessonLink[] = [
    { route: '/design-patterns/singleton', label: 'Singleton' },
    { route: '/design-patterns/factory-method', label: 'Factory Method' },
    { route: '/design-patterns/abstract-factory', label: 'Abstract Factory' },
    { route: '/design-patterns/builder', label: 'Builder' },
    { route: '/design-patterns/prototype', label: 'Prototype' }
  ];

  ngAfterViewInit(): void { syncPatternNavigation(this.host.nativeElement, this.router, this.lessons, '/design-patterns/singleton'); }
  @HostListener('click', ['$event'])
  handleInternalAnchor(event: MouseEvent): void {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const target = document.getElementById(anchor.getAttribute('href')?.slice(1) ?? '');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
