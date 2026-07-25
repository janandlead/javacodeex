import { AfterViewInit, Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatternLessonLink, syncPatternNavigation } from '../../shared/utils/pattern-navigation';

@Component({
  selector: 'app-factory-method',
  standalone: true,
  imports: [RouterLink],
  template: `<article class="factory-page container-xl">
    <section class="factory-hero"><span class="eyebrow">Creational Design Pattern · Java</span><h1>Factory Method Design Pattern in Java</h1><p>Learn how the Factory Method design pattern creates objects without tightly coupling your Java code to concrete classes.</p></section>
    <div class="factory-layout"><aside class="factory-toc" aria-label="On this page"><p>On this page</p><a href="#what">What is Factory Method?</a><a href="#problem">The problem it solves</a><a href="#example">Simple example</a><a href="#benefits">Benefits and trade-offs</a><a href="#when">When to use it</a></aside><div class="factory-content">
      <section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-box-seam"></i></span><div><h2>What is the Factory Method pattern?</h2><p>The Factory Method pattern creates objects without exposing the exact object creation logic to the client.</p><p>Instead of using the <code>new</code> keyword directly, the client asks a factory to create the required object. This keeps business logic independent from concrete implementations.</p></div></section>
      <section class="content-section" id="factory-guidance"><h2>When to Use Factory Method</h2><p>Use Factory Method when:</p><ul class="check-list"><li>Object type depends on user input.</li><li>Multiple implementations of an interface exist.</li><li>Object creation logic may change.</li><li>The client should not know the concrete implementation.</li><li>Runtime decisions determine which object to create.</li></ul><h3>Advantages of Factory Method</h3><ul class="check-list"><li>Hides object creation logic.</li><li>Reduces coupling.</li><li>Supports multiple implementations.</li><li>Makes the code easier to extend.</li><li>Centralizes object creation.</li></ul><h3>Disadvantages of Factory Method</h3><ul class="check-list"><li>Adds additional classes.</li><li>Factory logic may become large.</li><li>Too many conditions can reduce maintainability.</li></ul><h3>Real-World Examples</h3><ul class="check-list"><li>Creating payment processors.</li><li>Selecting notification channels.</li><li>Creating file parsers.</li><li>Choosing database drivers.</li><li>Creating objects based on input.</li></ul></section>
      <section class="content-section" id="problem"><h2>The problem it solves</h2><p>Imagine an order system that creates different notification types. If every service directly creates <code>EmailNotification</code>, <code>SmsNotification</code>, and <code>PushNotification</code>, the business code becomes coupled to every concrete class.</p><div class="flow"><span>Business logic</span><i class="bi bi-arrow-right"></i><strong>new EmailNotification()</strong></div><p>When a new notification type is added, many classes may need changes. Factory Method gives the creation decision one clear home.</p><div class="callout info"><i class="bi bi-lightbulb"></i><p><strong>Simple idea:</strong> ask for a product by its common type, and let a factory decide which concrete implementation to create.</p></div></section>
      <section class="content-section" id="example"><h2>Beginner-friendly Java example</h2><h3>Step 1: Define the product contract</h3><p>All notification types implement the same interface. This allows the rest of the application to work with <code>Notification</code> instead of a specific class.</p><pre><code>public interface Notification &#123;
    void send(String message);
&#125;</code></pre><h3>Step 2: Create concrete products</h3><pre><code>public class EmailNotification implements Notification &#123;
    public void send(String message) &#123;
        System.out.println("Email: " + message);
    &#125;
&#125;

public class SmsNotification implements Notification &#123;
    public void send(String message) &#123;
        System.out.println("SMS: " + message);
    &#125;
&#125;</code></pre><h3>Step 3: Create the factory method</h3><p>The factory hides the <code>new</code> operation and returns the shared product type.</p><pre><code>public final class NotificationFactory &#123;
    private NotificationFactory() &#123; &#125;

    public static Notification create(String channel) &#123;
        return switch (channel.toLowerCase()) &#123;
            case "email" -&gt; new EmailNotification();
            case "sms" -&gt; new SmsNotification();
            default -&gt; throw new IllegalArgumentException(
                "Unsupported channel: " + channel);
        &#125;;
    &#125;
&#125;</code></pre><h3>Step 4: Use the factory</h3><pre><code>Notification notification =
    NotificationFactory.create("email");

notification.send("Your order was shipped");</code></pre><div class="output"><i class="bi bi-terminal"></i><span>Email: Your order was shipped</span></div></section>
      <section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Centralizes object creation.</li><li>Reduces coupling to concrete classes.</li><li>Makes new product types easier to add.</li><li>Improves testing through common interfaces.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Introduces additional classes or methods.</li><li>The factory can become large if it handles too many products.</li><li>Invalid input needs clear validation.</li></ul></div></div></section>
      <section class="content-section" id="when"><h2>When should you use Factory Method?</h2><ul class="check-list"><li>Object creation depends on input, configuration, or environment.</li><li>Several classes share a common interface.</li><li>You expect new product implementations over time.</li><li>You want business logic to avoid direct constructor calls.</li></ul><div class="key-takeaway"><i class="bi bi-bookmark-star"></i><div><strong>Key takeaway</strong><span>Factory Method separates “what the application needs” from “which class is created.” Start with a small factory and grow it only when object creation becomes a real source of coupling.</span></div></div></section>
      <nav class="lesson-actions" aria-label="Creational pattern navigation"><a routerLink="/design-patterns/singleton" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> Singleton</a><a routerLink="/design-patterns" class="btn btn-primary">All patterns <i class="bi bi-arrow-right"></i></a></nav>
    </div></div>
  </article>`,
  styles: [`.factory-page{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}.factory-hero{margin:1rem 0 2rem;padding:clamp(2rem,5vw,4rem) clamp(1.25rem,4vw,3.5rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.2),transparent 28%),linear-gradient(135deg,#082f49,#155e75 58%,#1e3a8a);box-shadow:0 1rem 2.5rem rgba(8,47,73,.18)}.eyebrow{color:#a5f3fc;font-size:.8rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.factory-hero h1{margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.factory-hero p{max-width:48rem;margin:0;color:#cffafe;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65}.hero-tags{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.hero-tags span{padding:.45rem .75rem;border:1px solid rgba(165,243,252,.35);border-radius:999px;color:#cffafe;background:rgba(255,255,255,.08);font-size:.8rem;font-weight:700}.hero-tags i{margin-right:.3rem;color:#67e8f9}.factory-layout{display:grid;grid-template-columns:14rem minmax(0,1fr);gap:2rem}.factory-toc{position:sticky;top:6rem;align-self:start;padding:1rem;border:1px solid #bae6fd;border-radius:1rem;background:#fff}.factory-toc p{margin:0 0 .65rem;color:#0369a1;font-size:.75rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.factory-toc a{display:block;padding:.45rem .55rem;border-radius:.4rem;color:#475569;font-size:.86rem;text-decoration:none}.factory-toc a:hover{color:#0e7490;background:#ecfeff}.factory-content{min-width:0}.intro-card,.content-section{margin-bottom:1.5rem;padding:clamp(1.25rem,3vw,2.25rem);border:1px solid #e2e8f0;border-radius:1.15rem;background:#fff;box-shadow:0 .6rem 1.75rem rgba(15,23,42,.06)}.intro-card{display:flex;gap:1rem;border-color:#bae6fd;background:linear-gradient(135deg,#fff,#f0f9ff)}.section-icon{display:grid;width:3rem;height:3rem;flex:0 0 3rem;place-items:center;border-radius:.8rem;color:#0369a1;background:#e0f2fe;font-size:1.35rem}.content-section h2,.intro-card h2{margin:0 0 .85rem;color:#1e3a8a;font-size:clamp(1.4rem,2.5vw,2rem)}.content-section h3{margin:1.7rem 0 .55rem;color:#0369a1;font-size:1.2rem}.content-section p,.content-section li{color:#334155;line-height:1.8}.content-section code{padding:.1rem .3rem;border-radius:.25rem;color:#be123c;background:#fff1f2}.content-section pre{margin:1rem 0 1.25rem;overflow:auto;padding:1.15rem;border-radius:.75rem;background:#111827;color:#e5e7eb;font-size:.88rem;line-height:1.65}.content-section pre code{padding:0;color:inherit;background:transparent;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.flow{display:flex;align-items:center;justify-content:center;gap:.75rem;margin:1.25rem 0;padding:1rem;border:1px solid #bae6fd;border-radius:.75rem;color:#0369a1;background:#f0f9ff}.flow strong{padding:.45rem .65rem;border-radius:.4rem;color:#0c4a6e;background:#cffafe;font-size:.85rem}.callout{display:flex;gap:.75rem;margin:1.25rem 0;padding:1rem;border-left:4px solid #06b6d4;border-radius:.75rem;background:#ecfeff}.callout i{color:#0891b2;font-size:1.2rem}.callout p{margin:0}.output{display:flex;align-items:center;gap:.65rem;margin:1rem 0;padding:.75rem 1rem;border-left:4px solid #22c55e;border-radius:.5rem;color:#166534;background:#f0fdf4;font-family:ui-monospace,monospace}.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.pros-cons>div{padding:1rem;border-radius:.65rem}.pros-cons ul{margin:.6rem 0 0;padding-left:1.1rem}.pros-cons .do{background:#f0fdf4}.pros-cons .do strong{color:#15803d}.pros-cons .dont{background:#fffbeb}.pros-cons .dont strong{color:#b45309}.check-list{display:grid;gap:.55rem;margin:1rem 0;padding:0;list-style:none}.check-list li:before{margin-right:.5rem;color:#16a34a;content:"✓";font-weight:800}.key-takeaway{display:flex;gap:.75rem;padding:1rem;border:1px solid #bae6fd;border-radius:.75rem;background:#eff6ff}.key-takeaway>i{color:#0284c7;font-size:1.3rem}.key-takeaway div{display:flex;flex-direction:column;gap:.3rem}.key-takeaway strong{color:#0c4a6e}.key-takeaway span{color:#334155;line-height:1.6}.lesson-actions{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0}.lesson-actions .btn{min-height:2.75rem;font-weight:700}@media(max-width:900px){.factory-layout{grid-template-columns:1fr}.factory-toc{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:.25rem}.factory-toc p{width:100%;margin-bottom:.2rem}.factory-toc a{padding:.4rem .55rem;background:#f0f9ff}}@media(max-width:575.98px){.factory-page{width:min(100% - 1rem,82.5rem)}.factory-hero{padding:1.75rem 1.25rem}.intro-card{flex-direction:column}.flow{align-items:stretch;flex-direction:column;text-align:center}.pros-cons{grid-template-columns:1fr}.lesson-actions{flex-direction:column}.lesson-actions .btn{width:100%}}`]
})
export class FactoryMethodComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly lessons: readonly PatternLessonLink[] = [
    { route: '/design-patterns/singleton', label: 'Singleton' },
    { route: '/design-patterns/factory-method', label: 'Factory Method' },
    { route: '/design-patterns/abstract-factory', label: 'Abstract Factory' },
    { route: '/design-patterns/builder', label: 'Builder' },
    { route: '/design-patterns/prototype', label: 'Prototype' }
  ];
  ngAfterViewInit(): void {
    if (typeof document === 'undefined') return;
    const heroes = this.host.nativeElement.querySelectorAll('.factory-hero');
    if (heroes.length > 1) heroes[0].remove();
    this.host.nativeElement.querySelector('#factory-guidance')?.remove();
    syncPatternNavigation(this.host.nativeElement, this.router, this.lessons, '/design-patterns/factory-method');
  }
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
