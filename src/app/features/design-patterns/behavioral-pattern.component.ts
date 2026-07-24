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
  command: { title: 'Command Design Pattern in Java', summary: 'Encapsulate a request as an object so it can be executed, queued, logged, or undone.', explanation: 'The Command pattern turns a request into a separate object. The sender, such as a remote control, only knows how to execute a command. It does not need to know how the receiver, such as a television, performs the operation. This decoupling makes commands easier to add, reuse, queue, test, and undo.', code: `// Step 1: Define the Command interface\ninterface Command {\n    void execute();\n}\n\n// Step 2: Implement concrete commands\nclass TurnOnCommand implements Command {\n    private ElectronicDevice device;\n\n    public TurnOnCommand(ElectronicDevice device) {\n        this.device = device;\n    }\n\n    @Override\n    public void execute() {\n        device.turnOn();\n    }\n}\n\nclass TurnOffCommand implements Command {\n    private ElectronicDevice device;\n\n    public TurnOffCommand(ElectronicDevice device) {\n        this.device = device;\n    }\n\n    @Override\n    public void execute() {\n        device.turnOff();\n    }\n}\n\n// Step 3: Define the Receiver\nclass ElectronicDevice {\n    private String name;\n\n    public ElectronicDevice(String name) {\n        this.name = name;\n    }\n\n    public void turnOn() {\n        System.out.println(name + " is turned on.");\n    }\n\n    public void turnOff() {\n        System.out.println(name + " is turned off.");\n    }\n}\n\n// Step 4: Create the Invoker\nclass RemoteControl {\n    private Command command;\n\n    public void setCommand(Command command) {\n        this.command = command;\n    }\n\n    public void pressButton() {\n        command.execute();\n    }\n}\n\n// Step 5: Test the implementation\npublic class Main {\n    public static void main(String[] args) {\n        ElectronicDevice tv = new ElectronicDevice("TV");\n        Command turnOnCommand = new TurnOnCommand(tv);\n        Command turnOffCommand = new TurnOffCommand(tv);\n\n        RemoteControl remoteControl = new RemoteControl();\n\n        remoteControl.setCommand(turnOnCommand);\n        remoteControl.pressButton();\n\n        remoteControl.setCommand(turnOffCommand);\n        remoteControl.pressButton();\n    }\n}`, useCases: ['Remote-control buttons', 'Undo and redo actions', 'Job and message queues', 'GUI buttons and menus', 'Audit logging and retry workflows'] },
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
  memento: { title: 'Memento Design Pattern in Java', summary: 'Capture an object’s state so it can be restored later without exposing its internal details.', explanation: 'The Memento pattern allows an object’s internal state to be captured and restored later without breaking encapsulation. It is especially useful for undo features and restoring an object to an earlier state. In a text editor, the editor is the Originator, a memento stores a snapshot of the text, and a Caretaker manages the saved snapshots.', code: `// Step 1: Define the Memento\nclass TextEditorMemento {\n    private String text;\n\n    public TextEditorMemento(String text) {\n        this.text = text;\n    }\n\n    public String getText() {\n        return text;\n    }\n}\n\n// Step 2: Define the Originator\nclass TextEditor {\n    private String text;\n\n    public void setText(String text) {\n        this.text = text;\n    }\n\n    public TextEditorMemento save() {\n        return new TextEditorMemento(text);\n    }\n\n    public void restore(TextEditorMemento memento) {\n        this.text = memento.getText();\n    }\n\n    public void printText() {\n        System.out.println("Current Text: " + text);\n    }\n}\n\n// Step 3: Define the Caretaker\nimport java.util.Stack;\n\nclass TextEditorHistory {\n    private Stack<TextEditorMemento> history = new Stack<>();\n\n    public void save(TextEditorMemento memento) {\n        history.push(memento);\n    }\n\n    public TextEditorMemento undo() {\n        if (!history.isEmpty()) {\n            return history.pop();\n        }\n        return null;\n    }\n}\n\n// Step 4: Test the implementation\npublic class Main {\n    public static void main(String[] args) {\n        TextEditor textEditor = new TextEditor();\n        TextEditorHistory history = new TextEditorHistory();\n\n        textEditor.setText("Hello World!");\n        textEditor.printText();\n\n        // Save the current state before changing the text\n        history.save(textEditor.save());\n        textEditor.setText("Updated Text");\n        textEditor.printText();\n\n        // Undo and restore the saved state\n        TextEditorMemento memento = history.undo();\n        if (memento != null) {\n            textEditor.restore(memento);\n        }\n        textEditor.printText();\n    }\n}`, useCases: ['Text editor undo and redo', 'Form draft recovery', 'Game checkpoints', 'Transaction rollback', 'Database restore points'] },
  observer: { title: 'Observer Design Pattern in Java', summary: 'Notify interested objects automatically when a subject changes its state.', explanation: 'The Observer pattern creates a one-to-many relationship between objects. When the Subject changes, it notifies all registered Observers automatically. This keeps the stock market independent from its investors: the stock market only sends updates, while each investor decides what to do with the new price. This loose coupling makes reactive and event-driven systems easier to extend.', code: `// Step 1: Define the Subject interface\ninterface Subject {\n    void registerObserver(Observer observer);\n    void removeObserver(Observer observer);\n    void notifyObservers();\n}\n\n// Step 2: Implement the Subject\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass StockMarket implements Subject {\n    private List<Observer> observers = new ArrayList<>();\n    private String stockName;\n    private double price;\n\n    public void setStockData(String stockName, double price) {\n        this.stockName = stockName;\n        this.price = price;\n        notifyObservers();\n    }\n\n    @Override\n    public void registerObserver(Observer observer) {\n        observers.add(observer);\n    }\n\n    @Override\n    public void removeObserver(Observer observer) {\n        observers.remove(observer);\n    }\n\n    @Override\n    public void notifyObservers() {\n        for (Observer observer : observers) {\n            observer.update(stockName, price);\n        }\n    }\n}\n\n// Step 3: Define the Observer interface\ninterface Observer {\n    void update(String stockName, double price);\n}\n\n// Step 4: Implement the Observer\nclass Investor implements Observer {\n    private String name;\n\n    public Investor(String name) {\n        this.name = name;\n    }\n\n    @Override\n    public void update(String stockName, double price) {\n        System.out.println(name + " received update: "\n            + stockName + " price is now $" + price);\n    }\n}\n\n// Step 5: Test the implementation\npublic class Main {\n    public static void main(String[] args) {\n        StockMarket stockMarket = new StockMarket();\n\n        Investor investor1 = new Investor("John");\n        Investor investor2 = new Investor("Alice");\n\n        // Register investors for stock updates\n        stockMarket.registerObserver(investor1);\n        stockMarket.registerObserver(investor2);\n\n        // A price change automatically notifies all investors\n        stockMarket.setStockData("ABC", 100.0);\n    }\n}`, useCases: ['Stock market price notifications', 'Email and SMS alerts', 'Domain events and messaging', 'UI state updates', 'Weather monitoring systems'] },
  state: { title: 'State Design Pattern in Java', summary: 'Change an object’s behavior when its internal state changes.', explanation: 'The State Design Pattern is a behavioral pattern from the Gang of Four (GoF). It allows an object to change its behavior when its internal state changes, so the object appears to change its class. Instead of scattering state rules across large if-else or switch statements, the behavior for each state is encapsulated in a separate class. The State interface defines common operations, Concrete State classes implement state-specific behavior, and the Context stores the current state and delegates requests to it. Use this pattern when behavior depends on the current state, conditional logic is becoming difficult to maintain, or new states need to be added easily. A traffic light demonstrates the idea clearly: Red means stop, Green means go, and Yellow means prepare to stop. The same approach works for e-commerce orders, where an order can move from Placed to Shipped to Delivered or Cancelled. State-specific rules remain inside their state classes, making transitions easier to understand, test, and extend. Advantages include better maintainability, less conditional logic, support for the Open/Closed Principle, and clearer state transitions. The main trade-off is that every state requires a class, which can increase the number of files and create a small amount of object overhead.', code: `// Example 1: Traffic light system\n\n// Step 1: Define the State interface\ninterface TrafficLightState {\n    void handleRequest(TrafficLightContext context);\n}\n\n// Step 2: Implement concrete states\nclass RedLightState implements TrafficLightState {\n    @Override\n    public void handleRequest(TrafficLightContext context) {\n        System.out.println("Red Light: Cars must stop.");\n        context.setState(new GreenLightState());\n    }\n}\n\nclass GreenLightState implements TrafficLightState {\n    @Override\n    public void handleRequest(TrafficLightContext context) {\n        System.out.println("Green Light: Cars can go.");\n        context.setState(new YellowLightState());\n    }\n}\n\nclass YellowLightState implements TrafficLightState {\n    @Override\n    public void handleRequest(TrafficLightContext context) {\n        System.out.println("Yellow Light: Cars should prepare to stop.");\n        context.setState(new RedLightState());\n    }\n}\n\n// Step 3: Create the Context\nclass TrafficLightContext {\n    private TrafficLightState currentState;\n\n    public TrafficLightContext() {\n        currentState = new RedLightState();\n    }\n\n    public void setState(TrafficLightState state) {\n        this.currentState = state;\n    }\n\n    public void changeLight() {\n        currentState.handleRequest(this);\n    }\n}\n\n// Step 4: Client code\npublic class StatePatternDemo {\n    public static void main(String[] args) {\n        TrafficLightContext trafficLight = new TrafficLightContext();\n\n        for (int i = 0; i < 6; i++) {\n            trafficLight.changeLight();\n            System.out.println();\n        }\n    }\n}\n\n// Example 2: E-commerce order states\ninterface OrderState {\n    void next(OrderContext context);\n    void cancel(OrderContext context);\n}\n\nclass OrderPlacedState implements OrderState {\n    public void next(OrderContext context) {\n        System.out.println("Order has been placed. Moving to Shipped state.");\n        context.setState(new OrderShippedState());\n    }\n\n    public void cancel(OrderContext context) {\n        System.out.println("Order has been cancelled.");\n        context.setState(new OrderCancelledState());\n    }\n}\n\nclass OrderShippedState implements OrderState {\n    public void next(OrderContext context) {\n        System.out.println("Order has been shipped. Moving to Delivered state.");\n        context.setState(new OrderDeliveredState());\n    }\n\n    public void cancel(OrderContext context) {\n        System.out.println("Cannot cancel. Order has already been shipped.");\n    }\n}\n\nclass OrderDeliveredState implements OrderState {\n    public void next(OrderContext context) {\n        System.out.println("Order is already delivered.");\n    }\n\n    public void cancel(OrderContext context) {\n        System.out.println("Cannot cancel. Order is already delivered.");\n    }\n}\n\nclass OrderCancelledState implements OrderState {\n    public void next(OrderContext context) {\n        System.out.println("Cannot proceed. Order is cancelled.");\n    }\n\n    public void cancel(OrderContext context) {\n        System.out.println("Order is already cancelled.");\n    }\n}\n\nclass OrderContext {\n    private OrderState currentState = new OrderPlacedState();\n\n    public void setState(OrderState state) {\n        this.currentState = state;\n    }\n\n    public void proceedToNext() {\n        currentState.next(this);\n    }\n\n    public void cancelOrder() {\n        currentState.cancel(this);\n    }\n}`, useCases: ['Traffic light systems', 'E-commerce order lifecycles', 'Media player states', 'User authentication workflows', 'Game character states', 'Connection states'] },
  strategy: { title: 'Strategy Design Pattern in Java', summary: 'Select an algorithm’s behavior at runtime by making a family of algorithms interchangeable.', explanation: 'The Strategy design pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. This lets the algorithm vary independently from the clients that use it. In a payment processing system, the payment context works with different payment gateways, while each gateway encapsulates its own payment-processing algorithm.', code: `// Step 1: Define the PaymentStrategy interface\ninterface PaymentStrategy {\n    void processPayment(double amount);\n}\n\n// Step 2: Implement concrete payment strategies\nclass PayPalStrategy implements PaymentStrategy {\n    private String email;\n    private String password;\n\n    public PayPalStrategy(String email, String password) {\n        this.email = email;\n        this.password = password;\n    }\n\n    @Override\n    public void processPayment(double amount) {\n        // Process payment using PayPal API\n        System.out.println("Payment processed via PayPal: $" + amount);\n    }\n}\n\nclass StripeStrategy implements PaymentStrategy {\n    private String apiKey;\n\n    public StripeStrategy(String apiKey) {\n        this.apiKey = apiKey;\n    }\n\n    @Override\n    public void processPayment(double amount) {\n        // Process payment using Stripe API\n        System.out.println("Payment processed via Stripe: $" + amount);\n    }\n}\n\n// Step 3: Define the PaymentContext\nclass PaymentContext {\n    private PaymentStrategy paymentStrategy;\n\n    public PaymentContext(PaymentStrategy paymentStrategy) {\n        this.paymentStrategy = paymentStrategy;\n    }\n\n    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {\n        this.paymentStrategy = paymentStrategy;\n    }\n\n    public void processPayment(double amount) {\n        paymentStrategy.processPayment(amount);\n    }\n}\n\n// Step 4: Test the implementation\npublic class Main {\n    public static void main(String[] args) {\n        PaymentStrategy paypalStrategy = new PayPalStrategy("paypal@example.com", "password");\n        PaymentContext paymentContext = new PaymentContext(paypalStrategy);\n\n        paymentContext.processPayment(100.0);\n\n        PaymentStrategy stripeStrategy = new StripeStrategy("stripe-api-key");\n        paymentContext.setPaymentStrategy(stripeStrategy);\n        paymentContext.processPayment(150.0);\n    }\n}`, useCases: ['Payment gateway selection', 'Shipping price rules', 'Tax calculation strategies', 'Discount and pricing rules', 'Compression algorithms'] },
  'template-method': { title: 'Template Method Design Pattern in Java', summary: 'Follow a fixed algorithm while allowing subclasses to customize selected steps.', explanation: 'The Template Method pattern defines the overall steps of an algorithm in a superclass. Subclasses can change specific steps without changing the order of the process. Think of preparing coffee or tea: boiling water and pouring into a cup are common steps, while adding coffee grounds, tea leaves, sugar, milk, or lemon is different. This gives beginners a simple way to understand code reuse and controlled customization.', code: `// Step 1: Define the abstract class\nabstract class Beverage {\n    // Template method: the order of steps cannot change\n    public final void brew() {\n        boilWater();\n        addIngredients();\n        pourInCup();\n\n        // Hook method: subclasses may customize this optional step\n        if (customerWantsCondiments()) {\n            addCondiments();\n        }\n    }\n\n    // Steps that subclasses must provide\n    protected abstract void addIngredients();\n    protected abstract void addCondiments();\n\n    // Common steps shared by every beverage\n    protected void boilWater() {\n        System.out.println("Boiling water");\n    }\n\n    protected void pourInCup() {\n        System.out.println("Pouring into cup");\n    }\n\n    // Optional hook with a default behavior\n    protected boolean customerWantsCondiments() {\n        return true;\n    }\n}\n\n// Step 2: Implement concrete beverage classes\nclass Coffee extends Beverage {\n    @Override\n    protected void addIngredients() {\n        System.out.println("Adding coffee grounds");\n    }\n\n    @Override\n    protected void addCondiments() {\n        System.out.println("Adding sugar and milk");\n    }\n\n    @Override\n    protected boolean customerWantsCondiments() {\n        // In a real application, ask the customer for their preference\n        return true;\n    }\n}\n\nclass Tea extends Beverage {\n    @Override\n    protected void addIngredients() {\n        System.out.println("Adding tea leaves");\n    }\n\n    @Override\n    protected void addCondiments() {\n        System.out.println("Adding lemon");\n    }\n}\n\n// Step 3: Test the implementation\npublic class Main {\n    public static void main(String[] args) {\n        Beverage coffee = new Coffee();\n        Beverage tea = new Tea();\n\n        System.out.println("Making Coffee:");\n        coffee.brew();\n\n        System.out.println("\\nMaking Tea:");\n        tea.brew();\n    }\n}`, useCases: ['Beverage preparation workflows', 'CSV and JSON import processes', 'Report generation', 'Test setup and teardown', 'Document processing'] },
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

LESSONS['chain-of-responsibility'] = {
  title: 'Chain of Responsibility Design Pattern in Java',
  summary: 'Understand request handling through an employee leave approval chain.',
  explanation: 'The Chain of Responsibility pattern allows an object to pass a request along a chain of handlers. Each handler decides whether to process the request or pass it to the next handler. This decouples the sender from the receivers. In this real-time example, an employee leave request moves from Team Lead to Manager and then Department Head. The first handler that can approve the requested number of days handles it.',
  code: `// Step 1: Define the request
class LeaveRequest {
    private final String employeeName;
    private final int days;

    public LeaveRequest(String employeeName, int days) {
        this.employeeName = employeeName;
        this.days = days;
    }

    public String getEmployeeName() { return employeeName; }
    public int getDays() { return days; }
}

// Step 2: Define the handler interface
interface LeaveApprover {
    void approveLeave(LeaveRequest leaveRequest);
}

// Step 3: Implement concrete handlers
class TeamLead implements LeaveApprover {
    private static final int MAX_LEAVES_ALLOWED = 2;
    private LeaveApprover nextApprover;

    public void setNextApprover(LeaveApprover nextApprover) {
        this.nextApprover = nextApprover;
    }

    public void approveLeave(LeaveRequest request) {
        if (request.getDays() <= MAX_LEAVES_ALLOWED) {
            System.out.println("Approved by Team Lead for "
                    + request.getEmployeeName());
        } else if (nextApprover != null) {
            nextApprover.approveLeave(request);
        }
    }
}

class Manager implements LeaveApprover {
    private static final int MAX_LEAVES_ALLOWED = 5;
    private LeaveApprover nextApprover;

    public void setNextApprover(LeaveApprover nextApprover) {
        this.nextApprover = nextApprover;
    }

    public void approveLeave(LeaveRequest request) {
        if (request.getDays() <= MAX_LEAVES_ALLOWED) {
            System.out.println("Approved by Manager for "
                    + request.getEmployeeName());
        } else if (nextApprover != null) {
            nextApprover.approveLeave(request);
        }
    }
}

class DepartmentHead implements LeaveApprover {
    private static final int MAX_LEAVES_ALLOWED = 10;

    public void approveLeave(LeaveRequest request) {
        if (request.getDays() <= MAX_LEAVES_ALLOWED) {
            System.out.println("Approved by Department Head for "
                    + request.getEmployeeName());
        } else {
            System.out.println("Leave denied for "
                    + request.getEmployeeName());
        }
    }
}

// Step 4: Construct and use the chain
public class ChainOfResponsibilityExample {
    public static void main(String[] args) {
        TeamLead teamLead = new TeamLead();
        Manager manager = new Manager();
        DepartmentHead departmentHead = new DepartmentHead();

        teamLead.setNextApprover(manager);
        manager.setNextApprover(departmentHead);

        teamLead.approveLeave(new LeaveRequest("John", 3));
        teamLead.approveLeave(new LeaveRequest("Alice", 7));
        teamLead.approveLeave(new LeaveRequest("Bob", 12));
    }
}

// Flow: Team Lead -> Manager -> Department Head`,
  useCases: ['Employee leave approval', 'Authentication filters', 'Spring Security chains', 'Servlet interceptor chains', 'Support ticket escalation']
};

@Component({
  selector: 'app-behavioral-pattern', standalone: true, imports: [RouterLink],
  template: `<article class="behavioral-page container-xl"><section class="pattern-hero"><span class="eyebrow">Behavioral Design Pattern · Java</span><h1>{{ lesson.title }}</h1><p>{{ lesson.summary }}</p><div class="hero-tags"><span><i class="bi bi-clock"></i> 10 min read</span><span><i class="bi bi-bar-chart"></i> Beginner friendly</span><span><i class="bi bi-code-slash"></i> Java examples</span></div></section><div class="pattern-layout"><aside class="pattern-toc" aria-label="On this page"><p>On this page</p><a href="#what">What is it?</a><a href="#example">Java example</a><a href="#benefits">Benefits</a><a href="#when">Real-time use cases</a></aside><main class="pattern-content"><section class="intro-card" id="what"><span class="section-icon"><i class="bi bi-bezier2"></i></span><div><h2>What is {{ lesson.title.replace(' Design Pattern in Java', '') }}?</h2><p>{{ lesson.explanation }}</p></div></section><section class="content-section" id="example"><h2>Beginner-friendly Java example</h2><p>Focus on the roles in the example first. The pattern becomes easier when you can identify the sender, receiver, context, state, or strategy involved.</p><pre><code>{{ lesson.code }}</code></pre></section><section class="content-section" id="benefits"><h2>Benefits and trade-offs</h2><div class="pros-cons"><div class="do"><strong><i class="bi bi-check-circle"></i> Benefits</strong><ul><li>Keeps responsibilities focused.</li><li>Reduces conditional and tightly coupled code.</li><li>Makes behavior easier to extend and test.</li></ul></div><div class="dont"><strong><i class="bi bi-exclamation-circle"></i> Trade-offs</strong><ul><li>Can introduce extra objects and interfaces.</li><li>Too many small classes can make simple logic harder to follow.</li></ul></div></div></section><section class="content-section" id="when"><h2>Real-time use cases</h2><ul class="check-list">@for (useCase of lesson.useCases; track useCase) { <li>{{ useCase }}</li> }</ul><div class="key-takeaway"><i class="bi bi-bookmark-star"></i><div><strong>Key takeaway</strong><span>{{ lesson.summary }} Use it when behavior or communication is changing faster than the objects themselves.</span></div></div></section><nav class="lesson-actions" aria-label="Behavioral pattern navigation"><a routerLink="/design-patterns" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> All patterns</a><a routerLink="/design-patterns" class="btn btn-primary">More lessons <i class="bi bi-arrow-right"></i></a></nav></main></div></article>`,
  styles: [`.behavioral-page{width:min(100% - 2rem,82.5rem);padding:1.5rem 0 4rem}.pattern-hero{margin:1rem 0 2rem;padding:clamp(2rem,5vw,1rem) clamp(1.25rem,4vw,1rem);border-radius:1.25rem;color:#fff;background:radial-gradient(circle at 85% 10%,rgba(74,222,128,.2),transparent 28%),linear-gradient(135deg,#052e16,#166534 58%,#164e63);box-shadow:0 1rem 2.5rem rgba(5,46,22,.18)}.eyebrow{color:#bbf7d0;font-size:.8rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pattern-hero h1{margin:.65rem 0 .85rem;color:#fff;font-size:clamp(2.2rem,5vw,4rem);font-weight:850;letter-spacing:-.04em}.pattern-hero p{max-width:48rem;margin:0;color:#dcfce7;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65}.hero-tags{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.hero-tags span{padding:.45rem .75rem;border:1px solid rgba(187,247,208,.35);border-radius:999px;color:#dcfce7;background:rgba(255,255,255,.08);font-size:.8rem;font-weight:700}.hero-tags i{margin-right:.3rem;color:#86efac}.pattern-layout{display:grid;grid-template-columns:14rem minmax(0,1fr);gap:2rem}.pattern-toc{position:sticky;top:6rem;align-self:start;padding:1rem;border:1px solid #bbf7d0;border-radius:1rem;background:#fff}.pattern-toc p{margin:0 0 .65rem;color:#15803d;font-size:.75rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.pattern-toc a{display:block;padding:.45rem .55rem;border-radius:.4rem;color:#475569;font-size:.86rem;text-decoration:none}.pattern-toc a:hover{color:#15803d;background:#f0fdf4}.pattern-content{min-width:0}.intro-card,.content-section{margin-bottom:1.5rem;padding:clamp(1.25rem,3vw,2.25rem);border:1px solid #e2e8f0;border-radius:1.15rem;background:#fff;box-shadow:0 .6rem 1.75rem rgba(15,23,42,.06)}.intro-card{display:flex;gap:1rem;border-color:#bbf7d0;background:linear-gradient(135deg,#fff,#f0fdf4)}.section-icon{display:grid;width:3rem;height:3rem;flex:0 0 3rem;place-items:center;border-radius:.8rem;color:#15803d;background:#dcfce7;font-size:1.35rem}.content-section h2,.intro-card h2{margin:0 0 .85rem;color:#1e3a8a;font-size:clamp(1.4rem,2.5vw,2rem)}.content-section p,.content-section li{color:#334155;line-height:1.8}.content-section pre{margin:1rem 0 1.25rem;overflow:auto;padding:1.15rem;border-radius:.75rem;background:#111827;color:#e5e7eb;font-size:.88rem;line-height:1.65}.content-section code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.pros-cons>div{padding:1rem;border-radius:.65rem}.pros-cons ul{margin:.6rem 0 0;padding-left:1.1rem}.pros-cons .do{background:#f0fdf4}.pros-cons .do strong{color:#15803d}.pros-cons .dont{background:#fff7ed}.pros-cons .dont strong{color:#c2410c}.check-list{display:grid;gap:.55rem;margin:1rem 0;padding:0;list-style:none}.check-list li:before{margin-right:.5rem;color:#16a34a;content:"✓";font-weight:800}.key-takeaway{display:flex;gap:.75rem;margin-top:1.25rem;padding:1rem;border:1px solid #bbf7d0;border-radius:.75rem;background:#f0fdf4}.key-takeaway>i{color:#15803d;font-size:1.3rem}.key-takeaway div{display:flex;flex-direction:column;gap:.3rem}.key-takeaway strong{color:#166534}.key-takeaway span{color:#334155;line-height:1.6}.lesson-actions{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0}.lesson-actions .btn{min-height:2.75rem;font-weight:700}@media(max-width:900px){.pattern-layout{grid-template-columns:1fr}.pattern-toc{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:.25rem}.pattern-toc p{width:100%;margin-bottom:.2rem}.pattern-toc a{padding:.4rem .55rem;background:#f0fdf4}}@media(max-width:575.98px){.behavioral-page{width:min(100% - 1rem,82.5rem)}.pattern-hero{padding:1.75rem 1.25rem}.intro-card{flex-direction:column}.pros-cons{grid-template-columns:1fr}.lesson-actions{flex-direction:column}.lesson-actions .btn{width:100%}}`]
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
  ngAfterViewInit(): void {
    syncPatternNavigation(this.host.nativeElement, this.router, this.lessons, `/design-patterns/${this.pattern}`);
    if (this.pattern === 'state') this.renderStateExample();
    if (this.pattern === 'strategy') this.renderStrategyExample();
    if (this.pattern === 'chain-of-responsibility') this.renderChainExplanation();
    if (this.pattern === 'command') this.renderCommandExplanation();
    if (this.pattern === 'memento') this.renderMementoExplanation();
    if (this.pattern === 'observer') this.renderObserverExplanation();
  }

  private renderStateExample(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (explanation) {
      const points = [
        'The State Design Pattern is a behavioral pattern from the Gang of Four (GoF).',
        'It allows an object to change its behavior when its internal state changes, so the object appears to change its class.',
        'Instead of scattering state rules across large if-else or switch statements, each state keeps its behavior in a separate class.',
        'The State interface defines common operations, Concrete State classes implement state-specific behavior, and the Context stores the current state and delegates requests to it.',
        'Use this pattern when behavior depends on the current state, conditional logic is difficult to maintain, or new states may need to be added.',
        'A traffic light demonstrates the idea clearly: Red means stop, Green means go, and Yellow means prepare to stop.',
        'The same approach works for e-commerce orders that move from Placed to Shipped, Delivered, or Cancelled.',
        'Keeping state-specific rules inside state classes makes transitions easier to understand, test, and extend.',
        'Advantages include better maintainability, less conditional logic, support for the Open/Closed Principle, and clearer state transitions.',
        'The main trade-off is that every state requires a class, which can increase the number of files and create some object overhead.'
      ];
      const list = document.createElement('ul');
      list.className = 'state-overview-points';
      for (const point of points) {
        const item = document.createElement('li');
        item.textContent = point;
        list.appendChild(item);
      }
      explanation.replaceWith(list);
    }

    const originalCode = (this.host.nativeElement as HTMLElement).querySelector('#example pre') as HTMLPreElement | null;
    if (!originalCode) return;

    const source = originalCode.textContent ?? '';
    const steps = [
      {
        title: 'Step 1: Define the State interface',
        text: 'The State interface declares the operation that every traffic-light state must implement. The Context is passed in so a state can request the next transition.',
        start: '// Step 1: Define the State interface',
        end: '// Step 2: Implement concrete states'
      },
      {
        title: 'Step 2: Implement concrete states',
        text: 'Each concrete state contains the behavior for one situation. Red stops traffic and moves to Green, Green moves to Yellow, and Yellow moves back to Red.',
        start: '// Step 2: Implement concrete states',
        end: '// Step 3: Create the Context'
      },
      {
        title: 'Step 3: Create the Context',
        text: 'The Context owns the current state. It does not contain a large conditional statement; it simply delegates the request to the current state object.',
        start: '// Step 3: Create the Context',
        end: '// Step 4: Client code'
      },
      {
        title: 'Step 4: Run the client code',
        text: 'The client calls changeLight repeatedly. Each call uses the current state, prints its behavior, and moves the Context to the next state.',
        start: '// Step 4: Client code',
        end: '// Example 2: E-commerce order states'
      },
      {
        title: 'Real-world example: E-commerce order states',
        text: 'The same design works for an order workflow. A Placed order can be shipped or cancelled, a Shipped order can be delivered but should not be cancelled, and Delivered or Cancelled orders cannot move to another active state.',
        start: '// Example 2: E-commerce order states',
        end: source.length.toString()
      }
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'state-example-steps';

    for (const step of steps) {
      const startIndex = source.indexOf(step.start);
      const endIndex = step.end === source.length.toString() ? source.length : source.indexOf(step.end);
      if (startIndex < 0 || endIndex <= startIndex) continue;

      const section = document.createElement('section');
      section.className = 'state-example-step';
      const heading = document.createElement('h3');
      heading.textContent = step.title;
      const explanation = document.createElement('p');
      explanation.textContent = step.text;
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = source.slice(startIndex, endIndex).trim();
      pre.appendChild(code);
      section.append(heading, explanation, pre);
      wrapper.appendChild(section);
    }

    originalCode.replaceWith(wrapper);
  }

  private renderGenericExample(): void {
    const root = this.host.nativeElement as HTMLElement;
    const explanation = root.querySelector('#what p');
    if (explanation) {
      const points = this.lesson.explanation.split(/(?<=\.)\s+/).filter(Boolean);
      const list = document.createElement('ul');
      list.className = 'guided-overview-points';
      for (const point of points) {
        const item = document.createElement('li');
        item.textContent = point;
        list.appendChild(item);
      }
      explanation.replaceWith(list);
    }

    const originalCode = root.querySelector('#example pre') as HTMLPreElement | null;
    if (!originalCode) return;

    const blocks = (originalCode.textContent ?? '').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
    if (blocks.length < 2) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'guided-example-steps';
    blocks.forEach((block, index) => {
      const section = document.createElement('section');
      section.className = 'guided-example-step';
      const heading = document.createElement('h3');
      heading.textContent = `Implementation step ${index + 1}`;
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = block;
      pre.appendChild(code);
      section.append(heading, pre);
      wrapper.appendChild(section);
    });

    originalCode.replaceWith(wrapper);
  }

  private renderTemplateMethodExample(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (explanation) {
      const points = [
        'The Template Method Design Pattern defines the overall steps of an algorithm in a superclass.',
        'The template method fixes the order of the workflow, so subclasses cannot accidentally change the overall process.',
        'Subclasses provide their own implementation for the steps that are different.',
        'Common steps, such as boiling water and pouring a beverage into a cup, can be reused by every subclass.',
        'In this example, Beverage is the abstract class and Coffee and Tea are concrete subclasses.',
        'The customerWantsCondiments method is a hook: a subclass may override it to customize an optional step.',
        'This pattern is useful when several workflows follow the same structure but have small variations.',
        'The main benefit is consistent behavior with less duplicate code; the trade-off is that subclasses depend on the superclass workflow.'
      ];
      const list = document.createElement('ul');
      list.className = 'template-overview-points';
      for (const point of points) {
        const item = document.createElement('li');
        item.textContent = point;
        list.appendChild(item);
      }
      explanation.replaceWith(list);
    }

    const originalCode = (this.host.nativeElement as HTMLElement).querySelector('#example pre') as HTMLPreElement | null;
    if (!originalCode) return;

    const source = originalCode.textContent ?? '';
    const steps = [
      {
        title: 'Step 1: Define the abstract Beverage class',
        text: 'The final brew method is the template method. It controls the order of the process, while abstract methods and the optional hook provide customization points.',
        start: '// Step 1: Define the abstract class',
        end: '// Step 2: Implement concrete beverage classes'
      },
      {
        title: 'Step 2: Implement Coffee and Tea',
        text: 'Coffee and Tea implement the steps that are unique to each beverage. They reuse boilWater, pourInCup, and the workflow defined by Beverage.',
        start: '// Step 2: Implement concrete beverage classes',
        end: '// Step 3: Test the implementation'
      },
      {
        title: 'Step 3: Run the client code',
        text: 'The client creates Coffee and Tea objects through the Beverage type and calls brew. Each beverage follows the same sequence but produces different ingredients and condiments.',
        start: '// Step 3: Test the implementation',
        end: source.length.toString()
      }
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'template-example-steps';

    for (const step of steps) {
      const startIndex = source.indexOf(step.start);
      const endIndex = step.end === source.length.toString() ? source.length : source.indexOf(step.end);
      if (startIndex < 0 || endIndex <= startIndex) continue;

      const section = document.createElement('section');
      section.className = 'template-example-step';
      const heading = document.createElement('h3');
      heading.textContent = step.title;
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = source.slice(startIndex, endIndex).trim();
      pre.appendChild(code);
      section.append(heading, pre);
      wrapper.appendChild(section);
    }

    originalCode.replaceWith(wrapper);
  }

  private renderStrategyExample(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (explanation) {
      const points = [
        'The Strategy Design Pattern lets an application select an algorithm at runtime.',
        'It defines a family of algorithms, encapsulates each algorithm in its own class, and makes them interchangeable.',
        'The client can change the algorithm without changing the code that uses it.',
        'In this example, PaymentStrategy is the common interface for different payment gateways.',
        'PayPalStrategy and StripeStrategy contain the payment-processing behavior for their respective gateways.',
        'PaymentContext uses the selected strategy and does not need to know the internal details of PayPal or Stripe.',
        'A new payment gateway can be added by creating another strategy class instead of modifying the context.',
        'This pattern is useful for payment methods, tax rules, shipping costs, discounts, and compression algorithms.'
      ];
      const list = document.createElement('ul');
      list.className = 'strategy-overview-points';
      for (const point of points) {
        const item = document.createElement('li');
        item.textContent = point;
        list.appendChild(item);
      }
      explanation.replaceWith(list);
    }

    const originalCode = (this.host.nativeElement as HTMLElement).querySelector('#example pre') as HTMLPreElement | null;
    if (!originalCode) return;

    const source = originalCode.textContent ?? '';
    const steps = [
      {
        title: 'Step 1: Define the PaymentStrategy interface',
        text: 'The interface provides one common operation. Every payment gateway must implement processPayment, so the context can work with any gateway in the same way.',
        start: '// Step 1: Define the PaymentStrategy interface',
        end: '// Step 2: Implement concrete payment strategies'
      },
      {
        title: 'Step 2: Implement concrete payment strategies',
        text: 'Each concrete strategy contains the details for one payment provider. The PayPal and Stripe classes can change independently of the rest of the application.',
        start: '// Step 2: Implement concrete payment strategies',
        end: '// Step 3: Define the PaymentContext'
      },
      {
        title: 'Step 3: Define the PaymentContext',
        text: 'The context stores the current strategy and delegates payment processing to it. Replacing the strategy changes the algorithm without changing the context.',
        start: '// Step 3: Define the PaymentContext',
        end: '// Step 4: Test the implementation'
      },
      {
        title: 'Step 4: Select and switch strategies',
        text: 'The client starts with PayPal, processes a payment, then switches to Stripe at runtime. This demonstrates why the algorithms are interchangeable.',
        start: '// Step 4: Test the implementation',
        end: source.length.toString()
      }
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'strategy-example-steps';

    for (const step of steps) {
      const startIndex = source.indexOf(step.start);
      const endIndex = step.end === source.length.toString() ? source.length : source.indexOf(step.end);
      if (startIndex < 0 || endIndex <= startIndex) continue;

      const section = document.createElement('section');
      section.className = 'strategy-example-step';
      const heading = document.createElement('h3');
      heading.textContent = step.title;
      const explanationText = document.createElement('p');
      explanationText.textContent = step.text;
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = source.slice(startIndex, endIndex).trim();
      pre.appendChild(code);
      section.append(heading, explanationText, pre);
      wrapper.appendChild(section);
    }

    originalCode.replaceWith(wrapper);
  }

  private renderChainExplanation(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (!explanation) return;

    const points = [
      'A request is passed from one handler to the next handler in a defined chain.',
      'Each handler decides whether it can process the request.',
      'If a handler cannot process the request, it forwards the request to the next handler.',
      'The sender does not need to know which receiver will finally handle the request.',
      'This decouples the sender from the receivers and keeps request-processing rules easier to maintain.',
      'In the leave-approval example, the request moves from Team Lead to Manager and then Department Head.',
      'The first handler that can approve the requested number of days processes the request.'
    ];
    const list = document.createElement('ul');
    list.className = 'chain-overview-points';
    for (const point of points) {
      const item = document.createElement('li');
      item.textContent = point;
      list.appendChild(item);
    }
    explanation.replaceWith(list);
  }

  private renderCommandExplanation(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (!explanation) return;

    const points = [
      'The Command pattern turns a request into a separate object.',
      'The command object contains the operation that should be executed.',
      'The sender, such as a remote control, only knows how to execute a command.',
      'The sender does not need to know how the receiver, such as a television, performs the operation.',
      'This separates the action that starts a request from the object that performs the work.',
      'Commands can be added, reused, queued, logged, tested, retried, or undone more easily.'
    ];
    const list = document.createElement('ul');
    list.className = 'command-overview-points';
    for (const point of points) {
      const item = document.createElement('li');
      item.textContent = point;
      list.appendChild(item);
    }
    explanation.replaceWith(list);
  }

  private renderMementoExplanation(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (!explanation) return;

    const points = [
      'The Memento pattern captures an object’s internal state so it can be restored later.',
      'The saved state can be restored without exposing or breaking the object’s encapsulation.',
      'A memento is a snapshot of the object at a specific point in time.',
      'The Originator is the object whose state needs to be saved and restored.',
      'The Caretaker stores and manages mementos but does not inspect their internal details.',
      'In a text editor, the editor is the Originator, the saved text is the Memento, and the history manager is the Caretaker.',
      'This pattern is especially useful for undo features, checkpoints, draft recovery, and rollback operations.'
    ];
    const list = document.createElement('ul');
    list.className = 'memento-overview-points';
    for (const point of points) {
      const item = document.createElement('li');
      item.textContent = point;
      list.appendChild(item);
    }
    explanation.replaceWith(list);
  }

  private renderObserverExplanation(): void {
    const explanation = (this.host.nativeElement as HTMLElement).querySelector('#what p');
    if (!explanation) return;

    const points = [
      'The Observer pattern creates a one-to-many relationship between objects.',
      'The Subject is the object whose data or state can change.',
      'Observers register their interest in the Subject and wait for updates.',
      'When the Subject changes, it automatically notifies every registered Observer.',
      'The Subject sends the update without depending on the detailed business logic of each Observer.',
      'In the stock-market example, the stock market is the Subject and investors are the Observers.',
      'Each investor decides how to respond when a stock price changes.',
      'This loose coupling makes reactive and event-driven systems easier to extend.'
    ];
    const list = document.createElement('ul');
    list.className = 'observer-overview-points';
    for (const point of points) {
      const item = document.createElement('li');
      item.textContent = point;
      list.appendChild(item);
    }
    explanation.replaceWith(list);
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
