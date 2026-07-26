function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function createTutorialFallback(
  title: string,
  description: string,
  category: string,
  primaryKeyword = title
): string {
  const safeTitle = escapeHtml(title || `${category} tutorial`);
  const safeDescription = escapeHtml(description || `Learn ${title} with practical examples and clear explanations.`);
  const safeCategory = escapeHtml(category);
  const safeKeyword = escapeHtml(primaryKeyword || title);

  if (title === 'REST API Design Best Practices') {
    return `<header class="document-title">
      <h1>${safeTitle}</h1>
      <p class="lead">${safeDescription}</p>
    </header>
    <section>
      <h2>What Is REST API Design?</h2>
      <p>REST API design is the practice of creating clear HTTP resources, request formats, response bodies, and error rules. In Spring Boot, a well-designed API gives web, mobile, and service clients a stable contract that is easy to understand and safe to evolve.</p>
      <p>Use nouns such as <code>/api/v1/customers</code> for resources. Let HTTP methods describe the action, validate request DTOs at the boundary, and return a status code that explains the result.</p>
    </section>
    <section>
      <h2>How REST API Design Works in Spring Boot</h2>
      <p>A controller maps an HTTP request to a service method. The service applies business rules, while a repository reads or writes data. DTOs keep persistence details separate from the public API contract.</p>
      <h3>Important REST API design concepts</h3>
      <ul>
        <li>Use plural resource names and nested URLs only when the relationship is meaningful.</li>
        <li>Use GET for reads, POST for creation, PUT for replacement, PATCH for partial updates, and DELETE for removal.</li>
        <li>Return 201 Created with a Location header after creating a resource.</li>
        <li>Use consistent validation and error responses, including field-level details.</li>
        <li>Paginate collections and allowlist sortable fields before passing them to the database.</li>
      </ul>
    </section>
    <section>
      <h2>Practical Spring Boot REST API Design Example</h2>
      <p>This controller exposes a versioned customer resource. The service should contain the business rules, and the request and response types should be separate DTOs.</p>
      <pre><code>@RestController
@RequestMapping("/api/v1/customers")
class CustomerController {
    @PostMapping
    ResponseEntity&lt;CustomerResponse&gt; create(
            @Valid @RequestBody CreateCustomerRequest request) {
        CustomerResponse customer = customerService.create(request);
        URI location = URI.create("/api/v1/customers/" + customer.id());
        return ResponseEntity.created(location).body(customer);
    }
}</code></pre>
      <p>Document the JSON shape with OpenAPI, protect private endpoints with Spring Security, and test both successful responses and validation failures.</p>
    </section>
    <section>
      <h2>Common REST API Design Mistakes</h2>
      <p>Avoid verbs in URLs, inconsistent error formats, unbounded list queries, leaking database entities, and returning 200 OK for failures. Do not expose stack traces or sensitive fields in production responses.</p>
      <p>Start with a small, documented contract. Add pagination, authentication, caching, observability, and versioning as the API grows. The related Spring Boot REST API tutorial covers controllers, CRUD operations, PostgreSQL persistence, and testing.</p>
    </section>`;
  }

  if (title === 'Spring Boot Request Validation') {
    return `<header class="document-title">
      <h1>${safeTitle}</h1>
      <p class="lead">${safeDescription}</p>
    </header>
    <section>
      <h2>What Is Spring Boot Request Validation?</h2>
      <p>Spring Boot request validation checks data at the API boundary before a controller passes it to business logic. It catches missing values, invalid formats, unsafe ranges, and malformed nested objects.</p>
      <p>Use a request DTO with Bean Validation annotations. Keep business rules, such as checking whether an email already exists, in the service layer. Use database constraints as the final protection for data integrity.</p>
    </section>
    <section>
      <h2>How Request Validation Works</h2>
      <h3>Validate request DTOs</h3>
      <pre><code>public record CreateUserRequest(
    @NotBlank String name,
    @Email @NotBlank String email
) {}

@PostMapping
ResponseEntity&lt;UserResponse&gt; create(
    @Valid @RequestBody CreateUserRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(userService.create(request));
}</code></pre>
      <h3>Return useful validation errors</h3>
      <p>Translate validation exceptions into a consistent 400 response with the field name, rejected value policy, and a safe message. Never return passwords, tokens, stack traces, or sensitive data.</p>
      <ul>
        <li>Use <code>@Valid</code> for request bodies and nested objects.</li>
        <li>Use <code>@Validated</code> for method and path parameter validation.</li>
        <li>Keep cross-field and uniqueness checks in the service.</li>
        <li>Use database constraints for final uniqueness and integrity.</li>
      </ul>
    </section>
    <section>
      <h2>Common Spring Boot Validation Mistakes</h2>
      <p>Do not rely only on frontend validation, expose entities as request models, put every business rule in annotations, or return a different error shape from each controller. Test valid input, invalid input, nested validation, and persistence conflicts.</p>
    </section>
    <section>
      <h2>Spring Boot Request Validation FAQs</h2>
      <h3>What is the difference between @Valid and @Validated?</h3>
      <p><code>@Valid</code> triggers standard Bean Validation, while <code>@Validated</code> also supports validation groups and method-level validation.</p>
      <h3>Where should business validation happen?</h3>
      <p>Business validation belongs in the service layer because it may require database access or coordination between multiple fields and records.</p>
      <h3>Can validation guarantee unique values?</h3>
      <p>No. Check for a friendly error in the service, but enforce uniqueness with a database constraint to handle concurrent requests safely.</p>
    </section>`;
  }

  if (title === 'Spring Boot Testing') {
    return `<header class="document-title">
      <h1>${safeTitle}</h1>
      <p class="lead">${safeDescription}</p>
    </header>
    <section>
      <h2>What Is Spring Boot Testing?</h2>
      <p>Spring Boot testing verifies application behavior at the boundary where it matters. Unit tests check business rules quickly, test slices check selected Spring infrastructure, and integration tests verify that the complete application works together.</p>
      <p>A reliable test suite should cover success paths, invalid input, missing data, security rules, database behavior, and meaningful failure cases. Keep each test focused so failures explain what needs attention.</p>
    </section>
    <section>
      <h2>How to Choose a Spring Boot Test</h2>
      <ul>
        <li>Use JUnit and Mockito for fast service and business-rule unit tests.</li>
        <li>Use <code>@WebMvcTest</code> for controllers, validation, JSON, status codes, and headers.</li>
        <li>Use <code>@DataJpaTest</code> for repository queries and persistence mappings.</li>
        <li>Use <code>@SpringBootTest</code> for application wiring and end-to-end flows.</li>
        <li>Use Testcontainers when tests need a real PostgreSQL or other external service.</li>
      </ul>
    </section>
    <section>
      <h2>Practical Spring Boot Testing Example</h2>
      <pre><code>@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired MockMvc mvc;
    @MockBean UserService userService;

    @Test
    void rejectsInvalidRequest() throws Exception {
        mvc.perform(post("/api/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"email\":\"invalid\"}"))
            .andExpect(status().isBadRequest());
    }
}</code></pre>
      <p>Arrange the test data, perform one behavior, and assert the observable result. Avoid verifying private implementation details that clients cannot observe.</p>
    </section>
    <section>
      <h2>Common Testing Mistakes</h2>
      <p>Do not mock the class under test, test only getters, share mutable state between tests, or use integration tests for every small rule. Keep tests independent and repeatable, and use real infrastructure when the integration itself is the behavior being verified.</p>
    </section>
    <section>
      <h2>Spring Boot Testing FAQs</h2>
      <h3>What is the difference between @WebMvcTest and @SpringBootTest?</h3>
      <p><code>@WebMvcTest</code> loads the MVC layer for focused controller tests. <code>@SpringBootTest</code> loads the application context and is better for wiring and integration behavior.</p>
      <h3>When should Testcontainers be used?</h3>
      <p>Use Testcontainers when an embedded substitute cannot accurately reproduce the behavior of PostgreSQL, Kafka, Redis, or another external dependency.</p>
      <h3>Should every service method have a unit test?</h3>
      <p>Test meaningful behavior and business risk rather than chasing line coverage. A small number of clear tests is more valuable than repetitive tests for implementation details.</p>
    </section>`;
  }

  if (title === 'Spring Boot Actuator') {
    return `<header class="document-title">
      <h1>${safeTitle}</h1>
      <p class="lead">${safeDescription}</p>
    </header>
    <section>
      <h2>What Is Spring Boot Actuator?</h2>
      <p>Spring Boot Actuator provides operational endpoints for observing a running application. Teams use it to check health, verify readiness, inspect metrics, expose application information, and investigate production behavior.</p>
      <p>Actuator endpoints are not business APIs. Treat them as sensitive operational data, expose only the endpoints required by your platform, and protect them with authentication and network controls.</p>
    </section>
    <section>
      <h2>Health, Liveness, and Readiness Checks</h2>
      <p>Use liveness to decide whether an application instance should be restarted. Use readiness to decide whether it can receive traffic. Keep health checks fast and configure external dependency checks carefully.</p>
      <pre><code>GET /actuator/health
GET /actuator/health/liveness
GET /actuator/health/readiness</code></pre>
      <h3>Metrics and monitoring</h3>
      <p>Micrometer metrics can describe request latency, error rates, JVM memory, thread pools, database pools, and other signals. Prometheus can scrape metrics and Grafana can visualize them.</p>
    </section>
    <section>
      <h2>Secure and Expose Actuator Endpoints</h2>
      <pre><code>management.endpoints.web.exposure.include=health,info,prometheus
management.endpoint.health.probes.enabled=true
management.endpoints.web.base-path=/actuator</code></pre>
      <p>Do not expose <code>env</code>, <code>beans</code>, or configuration details publicly without a clear security reason. Remove secrets from the info response and restrict access with Spring Security or a private management port.</p>
    </section>
    <section>
      <h2>Common Spring Boot Actuator Mistakes</h2>
      <p>Common mistakes include exposing every endpoint, using one health check for both liveness and readiness, ignoring slow dependencies, and collecting metrics without alerts. Monitor traffic, latency, errors, and resource saturation together.</p>
    </section>
    <section>
      <h2>Spring Boot Actuator FAQs</h2>
      <h3>What is the difference between liveness and readiness?</h3>
      <p>Liveness indicates whether the process should be restarted. Readiness indicates whether the instance is prepared to receive traffic.</p>
      <h3>Should all Actuator endpoints be public?</h3>
      <p>No. Expose only required endpoints and protect them because they can reveal deployment, configuration, memory, or dependency details.</p>
      <h3>How are Actuator metrics exported to Prometheus?</h3>
      <p>Add the Micrometer Prometheus registry, expose the Prometheus endpoint, and configure Prometheus to scrape it over a protected network.</p>
    </section>`;
  }

  if (title === 'Deploy Spring Boot Applications') {
    return `<header class="document-title">
      <h1>${safeTitle}</h1>
      <p class="lead">${safeDescription}</p>
    </header>
    <section>
      <h2>What Is Spring Boot Deployment?</h2>
      <p>Spring Boot deployment is the process of packaging an application, providing environment-specific configuration, running it on reliable infrastructure, and monitoring it after release. A production deployment should be repeatable, secure, observable, and easy to roll back.</p>
      <p>Build an executable JAR for a simple server, or package the application as a container for Docker and Kubernetes. Keep secrets outside the image and use environment variables or a managed configuration service.</p>
    </section>
    <section>
      <h2>Spring Boot Deployment Options</h2>
      <ul>
        <li>Executable JAR on a virtual machine or managed application platform.</li>
        <li>Docker image with a small runtime image and a non-root user.</li>
        <li>Docker Compose for local or small multi-service environments.</li>
        <li>Kubernetes Deployment and Service for orchestrated workloads.</li>
        <li>CI/CD pipeline that builds, tests, scans, publishes, and deploys the artifact.</li>
      </ul>
    </section>
    <section>
      <h2>Practical Spring Boot Deployment Example</h2>
      <pre><code>./mvnw clean verify
java -jar target/orders-0.0.1-SNAPSHOT.jar

# Keep environment-specific values outside the JAR
SPRING_PROFILES_ACTIVE=prod \\
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/orders \\
java -jar target/orders-0.0.1-SNAPSHOT.jar</code></pre>
      <p>Use Actuator health probes for liveness and readiness. Send structured logs to a central platform, expose useful metrics, and configure graceful shutdown so traffic can drain before the process exits.</p>
    </section>
    <section>
      <h2>Deployment Security and Rollback</h2>
      <p>Store credentials in a secret manager, use HTTPS, scan dependencies and images, run containers as non-root, limit network access, and grant the application only the permissions it needs. Deploy a versioned artifact so a failed release can return to the previous known-good version.</p>
    </section>
    <section>
      <h2>Spring Boot Deployment FAQs</h2>
      <h3>Should configuration be packaged inside the JAR?</h3>
      <p>Package safe defaults only. Keep environment-specific URLs, credentials, feature flags, and secrets outside the artifact.</p>
      <h3>Should Spring Boot applications run in Docker?</h3>
      <p>Docker is useful when you need repeatable environments and consistent promotion from development to production. Use a small runtime image and scan it regularly.</p>
      <h3>What should a CI/CD pipeline verify?</h3>
      <p>Build and unit tests, integration tests, dependency and image scans, configuration checks, health verification, deployment status, and rollback readiness.</p>
    </section>`;
  }

  if (category === 'Java') {
    return `<header class="document-title">
      <h1>${safeTitle}</h1>
      <p class="lead">${safeDescription}</p>
    </header>
    <section>
      <h2>Understanding ${safeKeyword}</h2>
      <p>This Java tutorial explains ${safeKeyword} with beginner-friendly definitions, practical code, and decisions that matter in real applications. Java developers use this topic to write code that is readable, testable, and safe to maintain as a project grows.</p>
      <p>Start with the vocabulary, then run each example in a small Java project. Change one value at a time and observe the result. This approach helps connect the language rule to the behavior of the running program.</p>
    </section>
    <section>
      <h2>Core ${safeKeyword} concepts in Java</h2>
      <ul>
        <li>Understand the syntax, types, classes, methods, and APIs involved.</li>
        <li>Keep responsibilities focused and choose names that explain intent.</li>
        <li>Handle invalid input, exceptions, resource cleanup, and boundary cases.</li>
        <li>Prefer standard Java APIs and document choices that affect performance or thread safety.</li>
        <li>Test the expected behavior before refactoring the implementation.</li>
      </ul>
      <p>The right design depends on the problem. A small example may use one class, while production code can separate domain logic, infrastructure, and presentation concerns.</p>
    </section>
    <section>
      <h2>Practical Java example</h2>
      <p>The following example shows a simple, reusable structure. Adapt the names and types to the ${safeKeyword} problem you are solving.</p>
      <pre><code>public class TutorialExample {
    public static void main(String[] args) {
        String topic = "${safeKeyword}";
        System.out.println("Learning Java: " + topic);
    }
}</code></pre>
      <p>Compile and run the example with <code>javac</code> and <code>java</code>, or use your IDE's test runner. Then add a failing case and improve the code until the behavior is explicit.</p>
    </section>
    <section>
      <h2>Common mistakes and next steps</h2>
      <p>Common mistakes include copying syntax without understanding its lifecycle, hiding exceptions, creating unnecessarily large classes, and optimizing before measuring. Keep methods small, use meaningful errors, and review API documentation when behavior is unclear.</p>
      <p>After learning ${safeKeyword}, continue with related Java topics such as object-oriented programming, collections, exception handling, testing, and concurrency. Combining concepts is what turns an isolated example into dependable application code.</p>
    </section>
    <section>
      <h2>${safeKeyword} FAQs</h2>
      <h3>What should I learn first?</h3>
      <p>Begin with the vocabulary and the smallest runnable example. Then change the input and test both the expected result and an invalid case.</p>
      <h3>How can I practise this Java topic?</h3>
      <p>Create a small class, compile it with the JDK, and write tests for normal, boundary, and failure behavior. Practical repetition makes the API easier to remember.</p>
      <h3>What is a common mistake?</h3>
      <p>A common mistake is using a language feature without considering ownership, error handling, resource cleanup, or how another developer will maintain the code.</p>
    </section>`;
  }

  return `<header class="document-title">
    <h1>${safeTitle}</h1>
    <p class="lead">${safeDescription}</p>
  </header>
  <section>
    <h2>What Is ${safeKeyword}?</h2>
    <p>${safeKeyword} is an important ${safeCategory} concept. This tutorial explains the idea in simple language and connects it to the way developers build reliable applications. You will learn the purpose of the concept, the problem it solves, and the decisions that matter when you use it in a real project.</p>
    <p>A good understanding starts with the basic vocabulary. Read each example carefully, then change the values and observe the result. Small experiments make technical ideas easier to remember than memorising definitions alone.</p>
  </section>
  <section>
    <h2>How ${safeKeyword} Works</h2>
    <p>Most applications use this concept as part of a larger flow. First, the application receives input or configuration. Next, the relevant ${safeCategory} component validates that input and performs its main operation. Finally, it returns a result that another component can use. Keeping these responsibilities clear makes code easier to test and maintain.</p>
    <h3>Important Concepts</h3>
    <ul>
      <li>Understand the role of each class, method, or configuration property.</li>
      <li>Keep the example small before adding framework or production concerns.</li>
      <li>Handle invalid input and failure cases explicitly.</li>
      <li>Measure behaviour before making performance changes.</li>
    </ul>
  </section>
  <section>
    <h2>Practical ${safeKeyword} Example</h2>
    <p>The following small example shows the shape of a typical implementation. Adapt the names and values to your application rather than copying it blindly.</p>
    <pre><code>public class TutorialExample {
    public static void main(String[] args) {
        String topic = "${safeKeyword}";
        System.out.println("Learning: " + topic);
    }
}</code></pre>
    <p>In a production application, place business rules in focused services, validate external data, and add tests for both successful and failing cases. This keeps the tutorial idea useful as the codebase grows.</p>
  </section>
  <section>
    <h2>Common Mistakes and Key Points</h2>
    <p>Common mistakes include using a feature without understanding its lifecycle, hiding errors, duplicating configuration, and placing too much work in one class. Start with the simplest correct implementation. Then review logging, security, testing, and performance requirements for your own use case.</p>
    <p>Remember that ${safeKeyword} is one part of a complete ${safeCategory} solution. Combine it with clear naming, small methods, useful documentation, and automated tests. The related tutorials on Java Codeex can help you continue from this topic to the next practical skill.</p>
  </section>`;
}

export function normalizeTutorialHeadings(document: Document): void {
  document.querySelectorAll('h4').forEach((heading) => {
    const replacement = document.createElement('h3');
    replacement.innerHTML = heading.innerHTML;
    Array.from(heading.attributes).forEach((attribute) => replacement.setAttribute(attribute.name, attribute.value));
    heading.replaceWith(replacement);
  });

  document.querySelectorAll('h5, h6').forEach((heading) => {
    const replacement = document.createElement('p');
    replacement.innerHTML = heading.innerHTML;
    replacement.className = `${heading.className} tutorial-label`.trim();
    Array.from(heading.attributes).forEach((attribute) => {
      if (attribute.name !== 'class') replacement.setAttribute(attribute.name, attribute.value);
    });
    heading.replaceWith(replacement);
  });
}
