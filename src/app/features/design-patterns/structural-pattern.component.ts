import { AfterViewInit, Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatternLessonLink, syncPatternNavigation } from '../../shared/utils/pattern-navigation';

interface StructuralLesson { title: string; summary: string; explanation: string; code: string; useCases: string[]; }

const LESSONS: Record<string, StructuralLesson> = {
  adapter: { title: 'Adapter Design Pattern in Java', summary: 'Connect incompatible interfaces so existing classes can work together.', explanation: 'Adapter acts like a translator. It wraps an existing class and exposes the interface that the client expects.', code: `interface PaymentProcessor {
    void pay(double amount);
}

class LegacyGateway {
    void makePayment(double value) {
        System.out.println("Paid: " + value);
    }
}

class GatewayAdapter implements PaymentProcessor {
    private final LegacyGateway gateway = new LegacyGateway();

    public void pay(double amount) {
        gateway.makePayment(amount);
    }
}`, useCases: ['Integrating a legacy library', 'Wrapping a third-party API', 'Converting data between formats'] },
  bridge: { title: 'Bridge Design Pattern in Java', summary: 'Separate an abstraction from its implementation so both can change independently.', explanation: 'Bridge uses composition instead of inheritance. The high-level object keeps a reference to an implementation object.', code: `interface Device {
    void turnOn();
}

class Television implements Device {
    public void turnOn() {
        System.out.println("TV on");
    }
}

class Remote {
    private final Device device;

    Remote(Device device) {
        this.device = device;
    }

    void pressPower() {
        device.turnOn();
    }
}`, useCases: ['Supporting multiple platforms', 'Separating controls from devices', 'Avoiding a large inheritance tree'] },
  composite: { title: 'Composite Design Pattern in Java', summary: 'Treat individual objects and groups of objects through one common interface.', explanation: 'Composite builds a tree structure. A leaf performs work, while a composite contains and delegates to other components.', code: `interface FileSystemItem {
    void print(String indent);
}

class FileItem implements FileSystemItem {
    public void print(String indent) {
        System.out.println(indent + "file");
    }
}

class Folder implements FileSystemItem {
    private final List<FileSystemItem> items = new ArrayList<>();

    void add(FileSystemItem item) {
        items.add(item);
    }

    public void print(String indent) {
        for (FileSystemItem item : items) {
            item.print(indent + "  ");
        }
    }
}`, useCases: ['File and folder trees', 'Organization hierarchies', 'Menus containing submenus'] },
  decorator: { title: 'Decorator Design Pattern in Java', summary: 'Add behavior to an object without changing its original class.', explanation: 'Decorator wraps an object that implements the same interface. Multiple decorators can be layered around one component.', code: `interface Coffee {
    String description();
    double cost();
}

class BasicCoffee implements Coffee {
    public String description() { return "Coffee"; }
    public double cost() { return 3.0; }
}

class MilkDecorator implements Coffee {
    private final Coffee coffee;

    MilkDecorator(Coffee coffee) { this.coffee = coffee; }
    public String description() { return coffee.description() + ", milk"; }
    public double cost() { return coffee.cost() + 0.5; }
}`, useCases: ['Adding optional features', 'Building configurable services', 'Java I/O stream wrappers'] },
  facade: { title: 'Facade Design Pattern in Java', summary: 'Provide one simple entry point to a complex subsystem.', explanation: 'Facade hides the order and details of several service calls. Clients use a small API instead of learning every subsystem class.', code: `class Inventory { void reserve(String item) { } }
class Payment { void charge(double amount) { } }
class Shipping { void ship(String item) { } }

class OrderFacade {
    private final Inventory inventory = new Inventory();
    private final Payment payment = new Payment();
    private final Shipping shipping = new Shipping();

    void placeOrder(String item, double amount) {
        inventory.reserve(item);
        payment.charge(amount);
        shipping.ship(item);
    }
}`, useCases: ['Simplifying a checkout workflow', 'Hiding a library subsystem', 'Providing a stable application API'] },
  flyweight: { title: 'Flyweight Design Pattern in Java', summary: 'Reuse shared objects to reduce memory usage when many objects have common data.', explanation: 'Flyweight separates intrinsic shared state from extrinsic per-use state. A factory returns an existing object when possible.', code: `record Icon(String name) { }

class IconFactory {
    private final Map<String, Icon> cache = new HashMap<>();

    Icon get(String name) {
        return cache.computeIfAbsent(name, Icon::new);
    }
}

IconFactory factory = new IconFactory();
Icon first = factory.get("warning");
Icon second = factory.get("warning");
System.out.println(first == second); // true`, useCases: ['Text character formatting', 'Game objects sharing textures', 'Large collections of repeated icons'] },
  proxy: { title: 'Proxy Design Pattern in Java', summary: 'Control access to another object through a substitute with the same interface.', explanation: 'A proxy can add security, caching, logging, lazy loading, or remote communication before forwarding a call to the real object.', code: `interface ReportService {
    String load(String id);
}

class SecureReportProxy implements ReportService {
    private final ReportService target;

    SecureReportProxy(ReportService target) {
        this.target = target;
    }

    public String load(String id) {
        checkPermission(id);
        return target.load(id);
    }

    private void checkPermission(String id) {
        System.out.println("Checking access for " + id);
    }
}`, useCases: ['Access control', 'Lazy loading expensive objects', 'Caching and logging', 'Remote service clients'] }
};

@Component({
  selector: 'app-structural-pattern', standalone: true, imports: [RouterLink],
  template: `<article class="structural-page container-xl"><section class="pattern-hero"><span class="eyebrow">Structural Design Pattern · Java</span><h1>{{ lesson.title }}</h1><p>{{ lesson.summary }}</p><div class="hero-tags"><span><i class="bi bi-clock"></i> 10 min read</span><span><i class="bi bi-bar-chart"></i> Beginner friendly</span><span><i class="bi bi-code-slash"></i> Java examples</span></div></section><div class="pattern-layout"><aside class="pattern-toc" aria-label="On this page"><p>On this page</p><a href="#what">What is it?</a><a href="#example">Java example</a><a href="#benefits">Benefits</a><a href="#when">When to use it</a></aside><main class="pattern-content"><section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-diagram-3"></i></span><div><h2>What is {{ lesson.title.replace(' Design Pattern in Java', '') }}?</h2><p>{{ lesson.explanation }}</p></div></section><section class="content-section" id="example"><h2>Beginner-friendly Java example</h2><p>The following example shows the central idea of this pattern in a small, practical scenario.</p><pre><code>{{ lesson.code }}</code></pre></section><section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Separates responsibilities clearly.</li><li>Improves flexibility as the application grows.</li><li>Encapsulates structural complexity.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Can introduce extra wrapper classes.</li><li>Choose the pattern only when the complexity is real.</li></ul></div></div></section><section class="content-section" id="when"><h2>When should you use it?</h2><ul class="check-list">@for (useCase of lesson.useCases; track useCase) { <li>{{ useCase }}</li> }</ul><div class="key-takeaway"><i class="bi bi-bookmark-star"></i><div><strong>Key takeaway</strong><span>{{ lesson.summary }} Start with the smallest structure that solves the coupling or composition problem.</span></div></div></section><nav class="lesson-actions" aria-label="Structural pattern navigation"><a routerLink="/design-patterns" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> All patterns</a><a routerLink="/design-patterns" class="btn btn-primary">More lessons <i class="bi bi-arrow-right"></i></a></nav></main></div></article>`,
  styles: [`.structural-page{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}.pattern-hero{margin:1rem 0 2rem;padding:clamp(2rem,5vw,2rem) clamp(1.25rem,4vw,1rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(34,211,238,.2),transparent 28%),linear-gradient(135deg,#082f49,#155e75 58%,#1e3a8a);box-shadow:0 1rem 2.5rem rgba(8,47,73,.18)}.eyebrow{color:#a5f3fc;font-size:.8rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pattern-hero h1{margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.pattern-hero p{max-width:48rem;margin:0;color:#cffafe;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65}.hero-tags{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.hero-tags span{padding:.45rem .75rem;border:1px solid rgba(165,243,252,.35);border-radius:999px;color:#cffafe;background:rgba(255,255,255,.08);font-size:.8rem;font-weight:700}.hero-tags i{margin-right:.3rem;color:#67e8f9}.pattern-layout{display:grid;grid-template-columns:14rem minmax(0,1fr);gap:2rem}.pattern-toc{position:sticky;top:6rem;align-self:start;padding:1rem;border:1px solid #bae6fd;border-radius:1rem;background:#fff}.pattern-toc p{margin:0 0 .65rem;color:#0369a1;font-size:.75rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.pattern-toc a{display:block;padding:.45rem .55rem;border-radius:.4rem;color:#475569;font-size:.86rem;text-decoration:none}.pattern-toc a:hover{color:#0e7490;background:#ecfeff}.pattern-content{min-width:0}.intro-card,.content-section{margin-bottom:1.5rem;padding:clamp(1.25rem,3vw,2.25rem);border:1px solid #e2e8f0;border-radius:1.15rem;background:#fff;box-shadow:0 .6rem 1.75rem rgba(15,23,42,.06)}.intro-card{display:flex;gap:1rem;border-color:#bae6fd;background:linear-gradient(135deg,#fff,#f0f9ff)}.section-icon{display:grid;width:3rem;height:3rem;flex:0 0 3rem;place-items:center;border-radius:.8rem;color:#0369a1;background:#e0f2fe;font-size:1.35rem}.content-section h2,.intro-card h2{margin:0 0 .85rem;color:#1e3a8a;font-size:clamp(1.4rem,2.5vw,2rem)}.content-section p,.content-section li{color:#334155;line-height:1.8}.content-section pre{margin:1rem 0 1.25rem;overflow:auto;padding:1.15rem;border-radius:.75rem;background:#111827;color:#e5e7eb;font-size:.88rem;line-height:1.65}.content-section code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.pros-cons>div{padding:1rem;border-radius:.65rem}.pros-cons ul{margin:.6rem 0 0;padding-left:1.1rem}.pros-cons .do{background:#f0fdf4}.pros-cons .do strong{color:#15803d}.pros-cons .dont{background:#fffbeb}.pros-cons .dont strong{color:#b45309}.check-list{display:grid;gap:.55rem;margin:1rem 0;padding:0;list-style:none}.check-list li:before{margin-right:.5rem;color:#16a34a;content:"✓";font-weight:800}.key-takeaway{display:flex;gap:.75rem;margin-top:1.25rem;padding:1rem;border:1px solid #bae6fd;border-radius:.75rem;background:#eff6ff}.key-takeaway>i{color:#0284c7;font-size:1.3rem}.key-takeaway div{display:flex;flex-direction:column;gap:.3rem}.key-takeaway strong{color:#0c4a6e}.key-takeaway span{color:#334155;line-height:1.6}.lesson-actions{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0}.lesson-actions .btn{min-height:2.75rem;font-weight:700}@media(max-width:900px){.pattern-layout{grid-template-columns:1fr}.pattern-toc{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:.25rem}.pattern-toc p{width:100%;margin-bottom:.2rem}.pattern-toc a{padding:.4rem .55rem;background:#f0f9ff}}@media(max-width:575.98px){.structural-page{width:min(100% - 1rem,82.5rem)}.pattern-hero{padding:1.75rem 1.25rem}.intro-card{flex-direction:column}.pros-cons{grid-template-columns:1fr}.lesson-actions{flex-direction:column}.lesson-actions .btn{width:100%}}`]
})
export class StructuralPatternComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly lessons: readonly PatternLessonLink[] = [
    { route: '/design-patterns/adapter', label: 'Adapter' },
    { route: '/design-patterns/bridge', label: 'Bridge' },
    { route: '/design-patterns/composite', label: 'Composite' },
    { route: '/design-patterns/decorator', label: 'Decorator' },
    { route: '/design-patterns/facade', label: 'Facade' },
    { route: '/design-patterns/flyweight', label: 'Flyweight' },
    { route: '/design-patterns/proxy', label: 'Proxy' }
  ];
  @Input() pattern = 'adapter';
  get lesson(): StructuralLesson { return LESSONS[this.pattern] ?? LESSONS['adapter']; }
  ngAfterViewInit(): void { syncPatternNavigation(this.host.nativeElement, this.router, this.lessons, `/design-patterns/${this.pattern}`); }

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
