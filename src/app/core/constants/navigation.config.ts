import { NavigationItem } from '../models/navigation.model';

export const MAIN_NAVIGATION: readonly NavigationItem[] = [
  {
    label: 'Java', route: '/java-tutorial-overview', icon: 'bi bi-cup-hot', children: [
      { label: 'Java Tutorial Overview', route: '/java-tutorial-overview' },
      { label: 'Introduction to Java', route: '/introduction-to-java' },
      { label: 'Download and Install Java', route: '/java-download-and-install-java' },
      { label: 'Install IntelliJ IDEA', route: '/java-download-and-install-intellij-idea' },
      { label: 'Java Methods', route: '/java-methods' },
      { label: 'Java Arrays', route: '/java-arrays' },
      { label: 'Java Strings', route: '/java-strings' },
      { label: 'Java OOP Concepts', route: '/java-oop-concepts' },
      { label: 'Java Object Class', route: '/java-object-class' },
      { label: 'Java Interfaces', route: '/java-interfaces' },
      { label: 'Java Exception Handling', route: '/java-exception-handling' },
      { label: 'Java Regular Expressions', route: '/java-regex' },
      { label: 'Java Memory Management', route: '/java-memory-allocation' },
      { label: 'Java Generics', route: '/java-generics' },
      { label: 'Java Collections Framework', route: '/java-collections' },
      { label: 'Java 8+ Features', route: '/java-8-features' },
      { label: 'Java Date and Time API', route: '/java-date-and-time-api' },
      { label: 'Java Multithreading', route: '/java-multithreading' },
      { label: 'Java File Handling', route: '/java-file-handling' },
      { label: 'Java Networking', route: '/java-networking' },
      { label: 'Java JDBC', route: '/java-jdbc' },
      { label: 'Java Marker Interfaces', route: '/java-marker-interface' }
    ]
  },
  {
    label: 'Spring Boot', route: '/spring-boot-overview', icon: 'bi bi-leaf', children: [
      { label: 'Spring Boot Overview', route: '/spring-boot-overview' },
      { label: 'Spring Boot Core Concepts', route: '/spring-boot-core' },
      { label: 'Spring Boot Setup and Installation', route: '/spring-boot/setup' },
      { label: 'Spring Boot Project Structure', route: '/project-structure' },
      { label: 'Spring Boot AOP', route: '/spring-boot-aop' },
      { label: 'Spring Boot Data JPA', route: '/spring-boot-data-jpa' },
      { label: 'Spring Boot Security', route: '/spring-boot-security' },
      { label: 'Spring Boot Global Exception Handling', route: '/spring-boot-global-exception-handling' },
      { label: 'Spring Boot REST API', route: '/spring-boot-rest-api' },
      { label: 'REST API Design Best Practices', route: '/spring-boot-rest-api-design' },
      { label: 'Spring Boot Request Validation', route: '/spring-boot-validation' },
      { label: 'Spring Boot Testing', route: '/spring-boot-testing' },
      { label: 'Spring Boot Testing Comprehensive Guide', route: '/spring-boot/testing-comprehensive' },
      { label: 'Spring Boot Actuator and Monitoring', route: '/spring-boot-actuator' },
      { label: 'Spring Boot Deployment', route: '/spring-boot-deployment' }
    ]
  },
  { label: 'Angular', route: '/angular', icon: 'bi bi-braces' },
  { label: 'Interviews', route: '/interviews', icon: 'bi bi-person-workspace' },
  { label: 'Python', route: '/python', icon: 'bi bi-code-slash' },
  {
    label: 'Hibernate', route: '/hibernate-tutorial', icon: 'bi bi-database-gear', children: [
      { label: 'Hibernate Tutorial Overview', route: '/hibernate-tutorial' },
      { label: 'Hibernate Architecture', route: '/hibernate-architecture' },
      { label: 'First Hibernate Example', route: '/hibernate-first-example' },
      { label: 'Hibernate CRUD Example', route: '/hibernate-example' },
      { label: 'Hibernate Generator Classes', route: '/hibernate-generator-classes' },
      { label: 'Hibernate Dialects', route: '/hibernate/dialects' },
      { label: 'Hibernate Collection Mapping', route: '/hibernate/collection-mapping' },
      { label: 'Hibernate List Mapping', route: '/hibernate/mapping-list' },
      { label: 'Hibernate Bag Mapping', route: '/hibernate/mapping-bag' },
      { label: 'Hibernate One-to-Many Mapping', route: '/hibernate-one-to-many-mapping-using-annotation-example' },
      { label: 'Hibernate Many-to-Many Mapping', route: '/hibernate-many-to-many-example-using-annotation' },
      { label: 'Hibernate One-to-One Mapping', route: '/hibernate-one-to-one-example-using-annotation' },
      { label: 'Hibernate Many-to-One Mapping', route: '/hibernate-many-to-one-example-using-annotation' },
      { label: 'Hibernate Bidirectional Association', route: '/hibernate/bidirectional-association' },
      { label: 'Hibernate Transaction Management', route: '/hibernate-transaction-management-example' },
      { label: 'Hibernate First-Level Cache', route: '/hibernate-first-level-cache' },
      { label: 'Hibernate Second-Level Cache', route: '/hibernate-second-level-cache' }
    ]
  },
  { label: 'MySQL', route: '/mysql', icon: 'bi bi-database' },
  { label: 'PostgreSQL', route: '/postgresql', icon: 'bi bi-server' },
  { label: 'Design Patterns', route: '/design-patterns', icon: 'bi bi-diagram-3' },
  { label: 'Spring AI', route: '/spring-ai', icon: 'bi bi-stars' }
];

export const FOOTER_NAVIGATION: readonly NavigationItem[] = [
  { label: 'Java', route: '/java-tutorial-overview' },
  { label: 'Python', route: '/python' },
  { label: 'Spring Boot', route: '/spring-boot-overview' },
  { label: 'Angular', route: '/angular' },
  { label: 'MySQL', route: '/mysql' },
  { label: 'MongoDB', route: '/mongodb' },
  { label: 'PostgreSQL', route: '/postgresql' }
];
