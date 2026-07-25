import { InterviewQuestion } from '../models/interview-question.model';
import { InterviewTopic } from '../models/interview-topic.model';
import { JAVA_OOP_QUESTIONS } from './java-oop-questions.data';
import { JAVA_EXCEPTION_QUESTIONS } from './java-exception-questions.data';
import { JAVA_SPECIALTY_QUESTIONS } from './java-specialty-questions.data';
import { JAVA_COLLECTIONS_QUESTIONS } from './java-collections-questions.data';
import { SPRING_BOOT_QUESTIONS } from './spring-boot-questions.data';
import { KAFKA_QUESTIONS } from './kafka-questions.data';
import { MICROSERVICES_QUESTIONS } from './microservices-questions.data';
import { HIBERNATE_QUESTIONS } from './hibernate-questions.data';
import { DATABASE_QUESTIONS } from './database-questions.data';

export const INTERVIEW_TOPICS: readonly InterviewTopic[] = [
  { id: 'java', name: 'Java Core', icon: 'bi bi-cup-hot', description: 'Prepare for Java Core interview questions covering the JVM, language fundamentals, memory, collections, and modern Java features.', questionCount: 5 },
  { id: 'java-oops', name: 'OOP Interview Questions', icon: 'bi bi-diagram-3', description: 'Classes, objects, encapsulation, inheritance, polymorphism, abstraction, and Java design principles.', questionCount: 60, sourceTopicId: 'java', questionSection: 'oops', parentId: 'java' },
  { id: 'java-exception-handling', name: 'Exception Handling', icon: 'bi bi-shield-exclamation', description: 'Java exceptions, custom errors, resources, Spring Boot handlers, transactions, Kafka, and production failures.', questionCount: 89, sourceTopicId: 'java', questionSection: 'exception-handling', parentId: 'java' },
  { id: 'java-collections', name: 'Collections', icon: 'bi bi-collection', description: 'Lists, sets, maps, queues, iterators, generics, sorting, streams, concurrency, and collection performance.', questionCount: 102, parentId: 'java' },
  { id: 'java-garbage-collection', name: 'Garbage Collection', icon: 'bi bi-recycle', description: 'Java memory, heap generations, garbage collectors, GC roots, and troubleshooting.', questionCount: 20, parentId: 'java' },
  { id: 'java-multithreading', name: 'Multithreading', icon: 'bi bi-cpu', description: 'Threads, executors, synchronization, locks, concurrency utilities, and virtual threads.', questionCount: 20, parentId: 'java' },
  { id: 'java-strings', name: 'Strings', icon: 'bi bi-fonts', description: 'String immutability, pooling, StringBuilder, equality, and text processing.', questionCount: 20, parentId: 'java' },
  { id: 'java-design-patterns', name: 'Design Patterns', icon: 'bi bi-bezier2', description: 'Common Java design patterns, their trade-offs, and practical object-oriented use cases.', questionCount: 20, parentId: 'java' },
  { id: 'spring-boot', name: 'Spring Boot', icon: 'bi bi-leaf', description: 'Spring Boot fundamentals, auto-configuration, REST APIs, data access, security, monitoring, and production practices.', questionCount: 192 },
  { id: 'spring-boot-fundamentals', name: 'Spring Boot Fundamentals', icon: 'bi bi-book', description: 'Spring Boot architecture, startup, embedded servers, and the application context.', questionCount: 10, parentId: 'spring-boot' },
  { id: 'spring-boot-auto-configuration', name: 'Auto-Configuration', icon: 'bi bi-magic', description: 'Conditional configuration, auto-configuration internals, exclusions, and diagnostics.', questionCount: 10, parentId: 'spring-boot' },
  { id: 'spring-boot-annotations', name: 'Important Annotations', icon: 'bi bi-at', description: 'Core Spring and Spring Boot annotations for configuration, components, and properties.', questionCount: 10, parentId: 'spring-boot' },
  { id: 'spring-boot-dependency-injection', name: 'Dependency Injection and Beans', icon: 'bi bi-diagram-3', description: 'Dependency injection, bean wiring, scopes, lifecycle, and circular dependencies.', questionCount: 15, parentId: 'spring-boot' },
  { id: 'spring-boot-rest-api', name: 'REST API Development', icon: 'bi bi-cloud-arrow-up', description: 'REST controllers, validation, errors, pagination, JSON, CORS, and file handling.', questionCount: 20, parentId: 'spring-boot' },
  { id: 'spring-boot-configuration', name: 'Configuration and Profiles', icon: 'bi bi-sliders', description: 'Externalized configuration, properties, profiles, environment variables, and secrets.', questionCount: 10, parentId: 'spring-boot' },
  { id: 'spring-boot-data-jpa', name: 'Spring Data JPA and Hibernate', icon: 'bi bi-database-gear', description: 'Repositories, queries, fetching, caching, locking, transactions, and persistence performance.', questionCount: 25, parentId: 'spring-boot' },
  { id: 'spring-boot-transactions', name: 'Transaction Management', icon: 'bi bi-arrow-repeat', description: 'Transactional proxies, propagation, isolation, rollback, and distributed transactions.', questionCount: 14, parentId: 'spring-boot' },
  { id: 'spring-boot-security', name: 'Spring Security', icon: 'bi bi-shield-lock', description: 'Authentication, authorization, filter chains, JWT, OAuth, CSRF, and endpoint security.', questionCount: 20, parentId: 'spring-boot' },
  { id: 'spring-boot-actuator', name: 'Actuator and Monitoring', icon: 'bi bi-heart-pulse', description: 'Health, metrics, probes, observability, Prometheus, Grafana, and monitoring security.', questionCount: 11, parentId: 'spring-boot' },
  { id: 'spring-boot-logging', name: 'Logging and Exception Handling', icon: 'bi bi-journal-text', description: 'Logging frameworks, levels, correlation IDs, structured logs, and production troubleshooting.', questionCount: 11, parentId: 'spring-boot' },
  { id: 'spring-boot-caching', name: 'Caching', icon: 'bi bi-speedometer2', description: 'Spring caching, Redis integration, eviction, expiration, consistency, and cache stampede prevention.', questionCount: 9, parentId: 'spring-boot' },
  { id: 'spring-boot-production-performance', name: 'Production and Performance', icon: 'bi bi-graph-up-arrow', description: 'Application performance, connection pools, JVM diagnostics, thread pools, payloads, and production troubleshooting.', questionCount: 17, parentId: 'spring-boot' },
  { id: 'spring-boot-3', name: 'Spring Boot 3', icon: 'bi bi-box-arrow-up-right', description: 'Spring Boot 3 features, Java 17, Jakarta migration, native images, observability, and security changes.', questionCount: 10, parentId: 'spring-boot' },
  { id: 'hibernate', name: 'Hibernate', icon: 'bi bi-database-gear', description: 'ORM mapping, fetching, caching, transactions, locking, and query performance.', questionCount: 40 },
  { id: 'kafka', name: 'Kafka', icon: 'bi bi-diagram-3', description: 'Events, partitions, consumer groups, delivery guarantees, and reliable processing.', questionCount: 13 },
  { id: 'microservices', name: 'Microservices', icon: 'bi bi-boxes', description: 'Prepare for Microservices interview questions covering service communication, resilience, security, distributed tracing, and data consistency patterns.', questionCount: 20 },
  { id: 'database', name: 'Database', icon: 'bi bi-database', description: 'SQL, NoSQL, indexes, normalization, transactions, and database performance.', questionCount: 20 }
];

export const INTERVIEW_QUESTIONS: readonly InterviewQuestion[] = [
  { id: 1, topicId: 'java', question: 'What is the difference between JDK, JRE, and JVM?', answer: 'The JDK develops Java applications, the JRE runs them, and the JVM executes bytecode. The JDK includes development tools such as javac and the JRE. The JRE contains the JVM and runtime libraries. The JVM loads, verifies, and executes Java bytecode while providing portability across operating systems.', difficulty: 'Beginner', tags: ['JVM', 'Java fundamentals'] },
  { id: 2, topicId: 'java', question: 'What is the difference between HashMap and ConcurrentHashMap?', answer: 'HashMap is not thread-safe and permits one null key. ConcurrentHashMap supports concurrent access using fine-grained coordination, does not allow null keys or values, and provides atomic operations such as putIfAbsent.', codeExample: 'Map<String, Integer> counts = new ConcurrentHashMap<>();\ncounts.merge("java", 1, Integer::sum);', difficulty: 'Intermediate', tags: ['Collections', 'Concurrency'] },
  { id: 3, topicId: 'java', question: 'How does garbage collection work in Java?', answer: 'The garbage collector identifies objects that are no longer reachable from GC roots and reclaims their memory. Modern collectors use generations because most objects become unreachable soon after creation.', difficulty: 'Intermediate', tags: ['Memory', 'JVM'] },
  { id: 4, topicId: 'java', question: 'What is the difference between an interface and an abstract class?', answer: 'An interface defines a contract that multiple unrelated classes can implement. An abstract class provides a shared base with state and implementation. Choose an interface for capabilities and an abstract class for a close family of types.', difficulty: 'Beginner', tags: ['OOP', 'Abstraction'] },
  { id: 5, topicId: 'java', question: 'What important features were introduced in Java 17?', answer: 'Java 17 introduced or finalized features including sealed classes, records, pattern matching for instanceof, text blocks, and a modern LTS release baseline.', codeExample: 'public record User(long id, String name) {}\npublic sealed interface Result permits Success, Failure {}', difficulty: 'Advanced', tags: ['Java 17', 'Language features'] },
  ...JAVA_OOP_QUESTIONS,
  ...JAVA_EXCEPTION_QUESTIONS,
  ...JAVA_SPECIALTY_QUESTIONS,
  ...JAVA_COLLECTIONS_QUESTIONS,

  ...SPRING_BOOT_QUESTIONS,

  ...HIBERNATE_QUESTIONS,

  ...KAFKA_QUESTIONS,

  ...MICROSERVICES_QUESTIONS,

  ...DATABASE_QUESTIONS
];
