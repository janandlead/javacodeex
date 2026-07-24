import { AfterViewInit, Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PatternLessonLink, syncPatternNavigation } from '../../shared/utils/pattern-navigation';

interface BehavioralLesson { title: string; summary: string; explanation: string; code: string; useCases: string[]; }

const LESSONS: Record<string, BehavioralLesson> = {
  'chain-of-responsibility': { title: 'Chain of Responsibility Design Pattern in Java', summary: 'Pass a request through a chain of handlers until one handler can process it.', explanation: 'Problem: request-handling logic becomes difficult to maintain when authentication, authorization, logging, validation, and business rules are hardcoded in one place. Chain of Responsibility solves this by sending a request through linked handlers. Class diagram: Client → AuthenticationFilter → AuthorizationFilter → Controller.', code: `interface Filter {
    void setNext(Filter next);
    void process(Request request);
}

record Request(String token, String path) { }

class AuthenticationFilter implements Filter {
    private Filter next;

    public void setNext(Filter next) { this.next = next; }

    public void process(Request request) {
        if (request.token() == null) {
            throw new SecurityException("Login required");
        }
        if (next != null) next.process(request);
    }
}

class AuthorizationFilter implements Filter {
    private Filter next;

    public void setNext(Filter next) { this.next = next; }

    public void process(Request request) {
        System.out.println("Checking access to " + request.path());
        if (next != null) next.process(request);
    }
}

AuthenticationFilter authentication = new AuthenticationFilter();
AuthorizationFilter authorization = new AuthorizationFilter();
authentication.setNext(authorization);
authentication.process(new Request("jwt-token", "/orders"));

// Request flow:
// Client → Authentication → Authorization → Controller`, useCases: ['Authentication filters', 'Spring Security filter chain', 'Servlet interceptor chains', 'Validation and approval workflows'] },
  command: { title: 'Command Design Pattern in Java', summary: 'Wrap an action as an object so it can be queued, logged, retried, or undone.', explanation: 'The caller works with a Command interface instead of calling a receiver directly. This separates the button, job, or request from the operation it triggers.', code: `interface Command {
    void execute();
}

class SaveDocument implements Command {
    private final Document document;

    SaveDocument(Document document) {
        this.document = document;
    }

    public void execute() {
        document.save();
    }
}

class MenuItem {
    private final Command command;
    void click() { command.execute(); }
}`, useCases: ['Undo and redo actions', 'Job queues', 'GUI buttons and menus', 'Audit logging'] },
  interpreter: { title: 'Interpreter Design Pattern in Java', summary: 'Represent a small language and interpret its expressions.', explanation: 'Interpreter is useful when users provide simple rules or queries. Each grammar element becomes an expression that can evaluate a context.', code: `interface Expression {
    boolean interpret(String input);
}

class ContainsExpression implements Expression {
    private final String word;

    ContainsExpression(String word) {
        this.word = word;
    }

    public boolean interpret(String input) {
        return input.contains(word);
    }
}

Expression rule = new ContainsExpression("urgent");
boolean matches = rule.interpret("urgent request");`, useCases: ['Search filters', 'Feature rules', 'Simple command languages', 'Permission expressions'] },
  iterator: { title: 'Iterator Design Pattern in Java', summary: 'Traverse a collection without exposing how the collection stores its data.', explanation: 'Iterator gives clients a consistent next/hasNext API. Java’s Iterable and Iterator interfaces provide this pattern in the standard library.', code: `List<String> orders = List.of("A-101", "A-102", "A-103");

Iterator<String> iterator = orders.iterator();
while (iterator.hasNext()) {
    String orderId = iterator.next();
    System.out.println("Processing " + orderId);
}

for (String orderId : orders) {
    System.out.println(orderId);
}`, useCases: ['Walking collections and trees', 'Pagination results', 'Streaming records', 'Custom data structures'] },
  mediator: { title: 'Mediator Design Pattern in Java', summary: 'Centralize communication between related objects through a mediator.', explanation: 'Instead of every component knowing every other component, each component talks to the mediator. This reduces many-to-many dependencies.', code: `class ChatRoom {
    void send(String message, User sender) {
        System.out.println(sender.name() + ": " + message);
    }
}

record User(String name, ChatRoom room) {
    void send(String message) {
        room.send(message, this);
    }
}

ChatRoom room = new ChatRoom();
new User("Asha", room).send("Hello team");`, useCases: ['Chat rooms', 'Air traffic coordination', 'UI component communication', 'Order workflow coordination'] },
  memento: { title: 'Memento Design Pattern in Java', summary: 'Capture an object’s state so it can be restored later without exposing its internals.', explanation: 'Memento is useful when users need undo or rollback. The originator creates a snapshot and a caretaker stores it.', code: `class Editor {
    private String text = "";

    void write(String value) { text = value; }
    String text() { return text; }
    Snapshot save() { return new Snapshot(text); }
    void restore(Snapshot snapshot) { text = snapshot.text(); }
}

record Snapshot(String text) { }

Editor editor = new Editor();
editor.write("Version 1");
Snapshot backup = editor.save();
editor.write("Version 2");
editor.restore(backup);`, useCases: ['Text editor undo', 'Form draft recovery', 'Game checkpoints', 'Transaction rollback'] },
  observer: { title: 'Observer Design Pattern in Java', summary: 'Notify interested objects automatically when another object changes.', explanation: 'The subject maintains subscribers and publishes an event. Observers can react without the subject knowing their detailed business logic.', code: `interface OrderListener {
    void orderCreated(String orderId);
}

class OrderService {
    private final List<OrderListener> listeners = new ArrayList<>();

    void subscribe(OrderListener listener) { listeners.add(listener); }
    void create(String id) {
        for (OrderListener listener : listeners) {
            listener.orderCreated(id);
        }
    }
}`, useCases: ['Domain events', 'Email and SMS notifications', 'Stock price updates', 'UI state refreshes'] },
  state: { title: 'State Design Pattern in Java', summary: 'Change an object’s behavior when its internal state changes.', explanation: 'State replaces large conditional blocks with state objects. The context delegates work to the current state.', code: `interface OrderState {
    void cancel(Order order);
}

class PendingState implements OrderState {
    public void cancel(Order order) {
        order.setState(new CancelledState());
        System.out.println("Order cancelled");
    }
}

class Order {
    private OrderState state = new PendingState();
    void setState(OrderState state) { this.state = state; }
    void cancel() { state.cancel(this); }
}`, useCases: ['Order lifecycles', 'Workflow states', 'Media players', 'Connection states'] },
  strategy: { title: 'Strategy Design Pattern in Java', summary: 'Make a family of algorithms interchangeable at runtime.', explanation: 'The context receives a strategy and delegates the algorithm to it. This avoids changing the context whenever a new rule is added.', code: `interface PaymentStrategy {
    void pay(double amount);
}

class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Card payment: " + amount);
    }
}

class Checkout {
    private final PaymentStrategy strategy;
    Checkout(PaymentStrategy strategy) { this.strategy = strategy; }
    void complete(double amount) { strategy.pay(amount); }
}

new Checkout(new CardPayment()).complete(99.0);`, useCases: ['Payment method selection', 'Shipping price rules', 'Tax calculations', 'Compression algorithms'] },
  'template-method': { title: 'Template Method Design Pattern in Java', summary: 'Define an algorithm’s steps in a base class while allowing subclasses to customize selected steps.', explanation: 'The template method fixes the workflow order. Subclasses implement the variable steps without duplicating the overall process.', code: `abstract class DataImporter {
    public final void importData() {
        read();
        validate();
        save();
    }

    protected abstract void read();
    protected void validate() { System.out.println("Validated"); }
    protected abstract void save();
}

class CsvImporter extends DataImporter {
    protected void read() { System.out.println("Read CSV"); }
    protected void save() { System.out.println("Saved rows"); }
}`, useCases: ['CSV and JSON import workflows', 'Report generation', 'Test setup and teardown', 'Document processing'] },
  visitor: { title: 'Visitor Design Pattern in Java', summary: 'Add operations to an object structure without changing the element classes.', explanation: 'Elements accept a visitor, and the visitor contains the operation for each element type. This is useful when the structure is stable but operations change often.', code: `interface Shape {
    void accept(ShapeVisitor visitor);
}

interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}

class AreaVisitor implements ShapeVisitor {
    public void visit(Circle circle) {
        System.out.println("Circle area");
    }
    public void visit(Rectangle rectangle) {
        System.out.println("Rectangle area");
    }
}`, useCases: ['Compiler operations over syntax trees', 'Exporting documents', 'Calculating reports', 'Applying operations to file structures'] }
};

LESSONS['chain-of-responsibility'] = {
  title: 'Chain of Responsibility Design Pattern in Java',
  summary: 'Pass a request through a chain of handlers until one handler can process it.',
  explanation: 'Each handler decides whether to handle a request or forward it. The sender does not need to know which handler will finally process the request.',
  code: `abstract class ApprovalHandler {
    private ApprovalHandler next;

    void setNext(ApprovalHandler next) {
        this.next = next;
    }

    void approve(int amount) {
        if (canApprove(amount)) handle(amount);
        else if (next != null) next.approve(amount);
    }

    abstract boolean canApprove(int amount);
    abstract void handle(int amount);
}`,
  useCases: ['Expense approval workflows', 'Servlet and security filters', 'Support ticket escalation', 'Validation pipelines']
};

@Component({
  selector: 'app-behavioral-pattern', standalone: true, imports: [RouterLink],
  template: `<article class="behavioral-page container-xl"><section class="pattern-hero"><span class="eyebrow">Behavioral Design Pattern · Java</span><h1>{{ lesson.title }}</h1><p>{{ lesson.summary }}</p><div class="hero-tags"><span><i class="bi bi-clock"></i> 10 min read</span><span><i class="bi bi-bar-chart"></i> Beginner friendly</span><span><i class="bi bi-code-slash"></i> Java examples</span></div></section><div class="pattern-layout"><aside class="pattern-toc" aria-label="On this page"><p>On this page</p><a href="#what">What is it?</a><a href="#example">Java example</a><a href="#benefits">Benefits</a><a href="#when">Real-time use cases</a></aside><main class="pattern-content"><section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-bezier2"></i></span><div><h2>What is {{ lesson.title.replace(' Design Pattern in Java', '') }}?</h2><p>{{ lesson.explanation }}</p></div></section><section class="content-section" id="example"><h2>Beginner-friendly Java example</h2><p>Focus on the roles in the example first. The pattern becomes easier when you can identify the sender, receiver, context, state, or strategy involved.</p><pre><code>{{ lesson.code }}</code></pre></section><section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Keeps responsibilities focused.</li><li>Reduces conditional and tightly coupled code.</li><li>Makes behavior easier to extend and test.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Can introduce extra objects and interfaces.</li><li>Too many small classes can make simple logic harder to follow.</li></ul></div></div></section><section class="content-section" id="when"><h2>Real-time use cases</h2><ul class="check-list">@for (useCase of lesson.useCases; track useCase) { <li>{{ useCase }}</li> }</ul><div class="key-takeaway"><i class="bi bi-bookmark-star"></i><div><strong>Key takeaway</strong><span>{{ lesson.summary }} Use it when behavior or communication is changing faster than the objects themselves.</span></div></div></section><nav class="lesson-actions" aria-label="Behavioral pattern navigation"><a routerLink="/design-patterns" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> All patterns</a><a routerLink="/design-patterns" class="btn btn-primary">More lessons <i class="bi bi-arrow-right"></i></a></nav></main></div></article>`,
  styles: [`.behavioral-page{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}.pattern-hero{margin:1rem 0 2rem;padding:clamp(2rem,5vw,4rem) clamp(1.25rem,4vw,3.5rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(74,222,128,.2),transparent 28%),linear-gradient(135deg,#052e16,#166534 58%,#164e63);box-shadow:0 1rem 2.5rem rgba(5,46,22,.18)}.eyebrow{color:#bbf7d0;font-size:.8rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pattern-hero h1{max-width:52rem;margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.pattern-hero p{max-width:48rem;margin:0;color:#dcfce7;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65}.hero-tags{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.hero-tags span{padding:.45rem .75rem;border:1px solid rgba(187,247,208,.35);border-radius:999px;color:#dcfce7;background:rgba(255,255,255,.08);font-size:.8rem;font-weight:700}.hero-tags i{margin-right:.3rem;color:#86efac}.pattern-layout{display:grid;grid-template-columns:14rem minmax(0,1fr);gap:2rem}.pattern-toc{position:sticky;top:6rem;align-self:start;padding:1rem;border:1px solid #bbf7d0;border-radius:1rem;background:#fff}.pattern-toc p{margin:0 0 .65rem;color:#15803d;font-size:.75rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.pattern-toc a{display:block;padding:.45rem .55rem;border-radius:.4rem;color:#475569;font-size:.86rem;text-decoration:none}.pattern-toc a:hover{color:#15803d;background:#f0fdf4}.pattern-content{min-width:0}.intro-card,.content-section{margin-bottom:1.5rem;padding:clamp(1.25rem,3vw,2.25rem);border:1px solid #e2e8f0;border-radius:1.15rem;background:#fff;box-shadow:0 .6rem 1.75rem rgba(15,23,42,.06)}.intro-card{display:flex;gap:1rem;border-color:#bbf7d0;background:linear-gradient(135deg,#fff,#f0fdf4)}.section-icon{display:grid;width:3rem;height:3rem;flex:0 0 3rem;place-items:center;border-radius:.8rem;color:#15803d;background:#dcfce7;font-size:1.35rem}.content-section h2,.intro-card h2{margin:0 0 .85rem;color:#1e3a8a;font-size:clamp(1.4rem,2.5vw,2rem)}.content-section p,.content-section li{color:#334155;line-height:1.8}.content-section pre{margin:1rem 0 1.25rem;overflow:auto;padding:1.15rem;border-radius:.75rem;background:#111827;color:#e5e7eb;font-size:.88rem;line-height:1.65}.content-section code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.pros-cons>div{padding:1rem;border-radius:.65rem}.pros-cons ul{margin:.6rem 0 0;padding-left:1.1rem}.pros-cons .do{background:#f0fdf4}.pros-cons .do strong{color:#15803d}.pros-cons .dont{background:#fff7ed}.pros-cons .dont strong{color:#c2410c}.check-list{display:grid;gap:.55rem;margin:1rem 0;padding:0;list-style:none}.check-list li:before{margin-right:.5rem;color:#16a34a;content:"✓";font-weight:800}.key-takeaway{display:flex;gap:.75rem;margin-top:1.25rem;padding:1rem;border:1px solid #bbf7d0;border-radius:.75rem;background:#f0fdf4}.key-takeaway>i{color:#15803d;font-size:1.3rem}.key-takeaway div{display:flex;flex-direction:column;gap:.3rem}.key-takeaway strong{color:#166534}.key-takeaway span{color:#334155;line-height:1.6}.lesson-actions{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0}.lesson-actions .btn{min-height:2.75rem;font-weight:700}@media(max-width:900px){.pattern-layout{grid-template-columns:1fr}.pattern-toc{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:.25rem}.pattern-toc p{width:100%;margin-bottom:.2rem}.pattern-toc a{padding:.4rem .55rem;background:#f0fdf4}}@media(max-width:575.98px){.behavioral-page{width:min(100% - 1rem,82.5rem)}.pattern-hero{padding:1.75rem 1.25rem}.intro-card{flex-direction:column}.pros-cons{grid-template-columns:1fr}.lesson-actions{flex-direction:column}.lesson-actions .btn{width:100%}}`]
})
export class BehavioralPatternComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly lessons: readonly PatternLessonLink[] = [
    { route: '/design-patterns/chain-of-responsibility', label: 'Chain of Responsibility' },
    { route: '/design-patterns/command', label: 'Command' },
    { route: '/design-patterns/interpreter', label: 'Interpreter' },
    { route: '/design-patterns/iterator', label: 'Iterator' },
    { route: '/design-patterns/mediator', label: 'Mediator' },
    { route: '/design-patterns/memento', label: 'Memento' },
    { route: '/design-patterns/observer', label: 'Observer' },
    { route: '/design-patterns/state', label: 'State' },
    { route: '/design-patterns/strategy', label: 'Strategy' },
    { route: '/design-patterns/template-method', label: 'Template Method' },
    { route: '/design-patterns/visitor', label: 'Visitor' }
  ];
  @Input() pattern = 'observer';
  get lesson(): BehavioralLesson { return LESSONS[this.pattern] ?? LESSONS['observer']; }
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
