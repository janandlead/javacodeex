import { AfterViewInit, Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatternLessonLink, syncPatternNavigation } from '../../shared/utils/pattern-navigation';

@Component({
  selector: 'app-creational-pattern', standalone: true, imports: [RouterLink],
  template: `<article class="creational-page container-xl"><section class="pattern-hero"><span class="eyebrow">Creational Design Pattern · Java</span><h1>{{ title }}</h1><p>{{ summary }}</p><div class="hero-tags"><span><i class="bi bi-clock"></i> 10 min read</span><span><i class="bi bi-bar-chart"></i> Beginner friendly</span><span><i class="bi bi-code-slash"></i> Java examples</span></div></section><div class="pattern-layout"><aside class="pattern-toc" aria-label="On this page"><p>On this page</p><a href="#what">What is it?</a><a href="#example">Simple example</a><a href="#benefits">Benefits</a><a href="#when">When to use it</a></aside><main class="pattern-content">
    @if (pattern === 'abstract-factory') { <section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-building"></i></span><div><h2>What is Abstract Factory?</h2><p>Abstract Factory creates families of related objects without exposing their concrete classes. A theme factory, for example, can create a matching button and dialog for a light or dark user interface.</p></div></section><section class="content-section" id="example"><h2>Simple theme example</h2><p>First define contracts for the products in the family.</p><pre><code>interface Button &#123;
    void render();
&#125;
interface Dialog &#123;
    void render();
&#125;</code></pre><p>Then create one family of compatible products and a factory for that family.</p><pre><code>class DarkButton implements Button &#123;
    public void render() &#123;
        System.out.println("Dark button");
    &#125;
&#125;

interface ThemeFactory &#123;
    Button createButton();
    Dialog createDialog();
&#125;

class DarkThemeFactory implements ThemeFactory &#123;
    public Button createButton() &#123;
        return new DarkButton();
    &#125;
    public Dialog createDialog() &#123;
        return new DarkDialog();
    &#125;
&#125;</code></pre><p>The application uses <code>ThemeFactory</code>, so switching from dark products to light products does not change the application workflow.</p></section><section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Keeps related products compatible.</li><li>Hides concrete implementation classes.</li><li>Makes switching product families easy.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Adding a product type changes every factory.</li><li>Can introduce many interfaces and classes.</li></ul></div></div></section><section class="content-section" id="when"><h2>When should you use it?</h2><ul class="check-list"><li>Your application supports multiple compatible product families.</li><li>Products must work together consistently.</li><li>You want to switch themes, environments, or platforms in one place.</li></ul></section> }
    @if (pattern === 'builder') { <section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-tools"></i></span><div><h2>What is Builder?</h2><p>Builder constructs a complex object one step at a time. It is useful when a class has many optional fields and a long constructor would be difficult to read.</p></div></section><section class="content-section" id="example"><h2>Simple request example</h2><p>Here, the URL is required while the method and timeout have useful defaults.</p><pre><code>public final class HttpRequest &#123;
    private final String url;
    private final String method;
    private final int timeout;

    private HttpRequest(Builder builder) &#123;
        url = builder.url;
        method = builder.method;
        timeout = builder.timeout;
    &#125;

    public static class Builder &#123;
        private final String url;
        private String method = "GET";
        private int timeout = 30;

        public Builder(String url) &#123; this.url = url; &#125;
        public Builder method(String value) &#123;
            method = value; return this;
        &#125;
        public Builder timeout(int seconds) &#123;
            timeout = seconds; return this;
        &#125;
        public HttpRequest build() &#123;
            return new HttpRequest(this);
        &#125;
    &#125;
&#125;</code></pre><pre><code>HttpRequest request = new HttpRequest.Builder(
        "https://api.example.com/orders")
    .method("POST")
    .timeout(60)
    .build();</code></pre><div class="callout info"><i class="bi bi-lightbulb"></i><p><strong>Why it reads well:</strong> each optional choice is named, and the finished object can remain immutable.</p></div></section><section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Readable object construction.</li><li>Handles optional values cleanly.</li><li>Supports immutable objects.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Requires a builder class.</li><li>May be unnecessary for tiny objects.</li></ul></div></div></section><section class="content-section" id="when"><h2>When should you use it?</h2><ul class="check-list"><li>A class has many optional constructor parameters.</li><li>Construction steps should be easy to understand.</li><li>Validation is needed before creating the object.</li></ul></section> }
    @if (pattern === 'prototype') { <section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-copy"></i></span><div><h2>What is Prototype?</h2><p>Prototype creates a new object by copying an existing object instead of rebuilding every detail. The existing object acts as a prepared template.</p></div></section><section class="content-section" id="example"><h2>Simple report example</h2><p>A copy method can make the copying rules explicit and safer than an unrestricted clone operation.</p><pre><code>public final class Report &#123;
    private final String title;
    private final List&lt;String&gt; sections;

    public Report(String title, List&lt;String&gt; sections) &#123;
        this.title = title;
        this.sections = new ArrayList&lt;&gt;(sections);
    &#125;

    public Report copy() &#123;
        return new Report(title, sections);
    &#125;
&#125;</code></pre><pre><code>Report monthly = new Report(
    "Monthly report", List.of("Summary", "Metrics"));
Report regional = monthly.copy();</code></pre><p>The copied list is independent from the original list. For nested mutable objects, decide whether a deeper copy is required.</p><div class="callout warning"><i class="bi bi-exclamation-triangle"></i><p><strong>Watch for shallow copies:</strong> copying a reference does not copy the object behind it.</p></div></section><section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Reuses expensive setup work.</li><li>Creates similar objects quickly.</li><li>Provides a known baseline for variants.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Nested state can be difficult to copy.</li><li>Mutable references can cause surprises.</li></ul></div></div></section><section class="content-section" id="when"><h2>When should you use it?</h2><ul class="check-list"><li>Object creation is expensive.</li><li>Many objects share mostly identical configuration.</li><li>You need independent variations from a template.</li></ul></section> }
    <div class="key-takeaway"><i class="bi bi-bookmark-star"></i><div><strong>Key takeaway</strong><span>{{ takeaway }}</span></div></div><nav class="lesson-actions" aria-label="Creational pattern navigation"><a routerLink="/design-patterns/factory-method" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> Factory Method</a><a routerLink="/design-patterns" class="btn btn-primary">All patterns <i class="bi bi-arrow-right"></i></a></nav>
    </main></div></article>`,
  styles: [`.creational-page{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}.pattern-hero{margin:1rem 0 2rem;padding:clamp(2rem,5vw,4rem) clamp(1.25rem,4vw,3.5rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(167,139,250,.22),transparent 28%),linear-gradient(135deg,#1e1b4b,#3730a3 58%,#164e63);box-shadow:0 1rem 2.5rem rgba(30,27,75,.18)}.eyebrow{color:#c4b5fd;font-size:.8rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pattern-hero h1{max-width:52rem;margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.pattern-hero p{max-width:48rem;margin:0;color:#e0e7ff;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65}.hero-tags{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.hero-tags span{padding:.45rem .75rem;border:1px solid rgba(196,181,253,.35);border-radius:999px;color:#e0e7ff;background:rgba(255,255,255,.08);font-size:.8rem;font-weight:700}.hero-tags i{margin-right:.3rem;color:#c4b5fd}.pattern-layout{display:grid;grid-template-columns:14rem minmax(0,1fr);gap:2rem}.pattern-toc{position:sticky;top:6rem;align-self:start;padding:1rem;border:1px solid #ddd6fe;border-radius:1rem;background:#fff}.pattern-toc p{margin:0 0 .65rem;color:#4338ca;font-size:.75rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.pattern-toc a{display:block;padding:.45rem .55rem;border-radius:.4rem;color:#475569;font-size:.86rem;text-decoration:none}.pattern-toc a:hover{color:#4338ca;background:#eef2ff}.pattern-content{min-width:0}.intro-card,.content-section{margin-bottom:1.5rem;padding:clamp(1.25rem,3vw,2.25rem);border:1px solid #e2e8f0;border-radius:1.15rem;background:#fff;box-shadow:0 .6rem 1.75rem rgba(15,23,42,.06)}.intro-card{display:flex;gap:1rem;border-color:#ddd6fe;background:linear-gradient(135deg,#fff,#eef2ff)}.section-icon{display:grid;width:3rem;height:3rem;flex:0 0 3rem;place-items:center;border-radius:.8rem;color:#4338ca;background:#e0e7ff;font-size:1.35rem}.content-section h2,.intro-card h2{margin:0 0 .85rem;color:#1e3a8a;font-size:clamp(1.4rem,2.5vw,2rem)}.content-section h3{margin:1.7rem 0 .55rem;color:#4338ca;font-size:1.2rem}.content-section p,.content-section li{color:#334155;line-height:1.8}.content-section code{padding:.1rem .3rem;border-radius:.25rem;color:#be123c;background:#fff1f2}.content-section pre{margin:1rem 0 1.25rem;overflow:auto;padding:1.15rem;border-radius:.75rem;background:#111827;color:#e5e7eb;font-size:.88rem;line-height:1.65}.content-section pre code{padding:0;color:inherit;background:transparent;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.callout{display:flex;gap:.75rem;margin:1.25rem 0;padding:1rem;border-left:4px solid #06b6d4;border-radius:.75rem;background:#ecfeff}.callout i{color:#0891b2;font-size:1.2rem}.callout p{margin:0}.callout.warning{border-color:#f59e0b;background:#fffbeb}.callout.warning i{color:#d97706}.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.pros-cons>div{padding:1rem;border-radius:.65rem}.pros-cons ul{margin:.6rem 0 0;padding-left:1.1rem}.pros-cons .do{background:#f0fdf4}.pros-cons .do strong{color:#15803d}.pros-cons .dont{background:#fffbeb}.pros-cons .dont strong{color:#b45309}.check-list{display:grid;gap:.55rem;margin:1rem 0;padding:0;list-style:none}.check-list li:before{margin-right:.5rem;color:#16a34a;content:"✓";font-weight:800}.key-takeaway{display:flex;gap:.75rem;margin-bottom:1.5rem;padding:1rem;border:1px solid #c7d2fe;border-radius:.75rem;background:#eef2ff}.key-takeaway>i{color:#4338ca;font-size:1.3rem}.key-takeaway div{display:flex;flex-direction:column;gap:.3rem}.key-takeaway strong{color:#312e81}.key-takeaway span{color:#334155;line-height:1.6}.lesson-actions{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0}.lesson-actions .btn{min-height:2.75rem;font-weight:700}@media(max-width:900px){.pattern-layout{grid-template-columns:1fr}.pattern-toc{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:.25rem}.pattern-toc p{width:100%;margin-bottom:.2rem}.pattern-toc a{padding:.4rem .55rem;background:#eef2ff}}@media(max-width:575.98px){.creational-page{width:min(100% - 1rem,82.5rem)}.pattern-hero{padding:1.75rem 1.25rem}.intro-card{flex-direction:column}.pros-cons{grid-template-columns:1fr}.lesson-actions{flex-direction:column}.lesson-actions .btn{width:100%}}`]
})
export class CreationalPatternComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly lessons: readonly PatternLessonLink[] = [
    { route: '/design-patterns/singleton', label: 'Singleton' },
    { route: '/design-patterns/factory-method', label: 'Factory Method' },
    { route: '/design-patterns/abstract-factory', label: 'Abstract Factory' },
    { route: '/design-patterns/builder', label: 'Builder' },
    { route: '/design-patterns/prototype', label: 'Prototype' }
  ];
  ngAfterViewInit(): void { syncPatternNavigation(this.host.nativeElement, this.router, this.lessons, `/design-patterns/${this.pattern}`); }
  @Input() pattern = 'abstract-factory';
  get title(): string { return this.pattern === 'builder' ? 'Builder Design Pattern in Java' : this.pattern === 'prototype' ? 'Prototype Design Pattern in Java' : 'Abstract Factory Design Pattern in Java'; }
  get summary(): string { return this.pattern === 'builder' ? 'Construct complex objects step by step with readable, flexible Java code.' : this.pattern === 'prototype' ? 'Create new objects by copying a prepared object and customizing the result.' : 'Create families of related objects without coupling your application to concrete classes.'; }
  get takeaway(): string { return this.pattern === 'builder' ? 'Builder makes complex construction readable and keeps the final object easy to validate and maintain.' : this.pattern === 'prototype' ? 'Prototype is useful when a prepared template can be copied faster and more safely than rebuilding every detail.' : 'Abstract Factory keeps related products compatible while allowing the whole product family to change behind one interface.'; }

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
