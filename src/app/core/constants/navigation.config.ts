import { NavigationItem } from '../models/navigation.model';

export const MAIN_NAVIGATION: readonly NavigationItem[] = [
  {
    label: 'Java', route: '/java', icon: 'bi bi-cup-hot', children: [
      { label: 'Introduction', route: '/java/introduction-to-java' },
      { label: 'Download and Install Java', route: '/java/download-and-install-java' },
      { label: 'Install IntelliJ IDEA', route: '/java/download-and-install-intellij-idea' },
      { label: 'Methods', route: '/java/methods' },
      { label: 'Arrays', route: '/java/arrays' },
      { label: 'Strings', route: '/java/strings' },
      { label: 'OOP Concepts', route: '/java/oop-concepts' },
      { label: 'Interfaces', route: '/java/interfaces' },
      { label: 'Exception Handling', route: '/java/exception-handling' },
      { label: 'Regular Expressions', route: '/java/regex' },
      { label: 'Memory Allocation', route: '/java/memory-allocation' },
      { label: 'Generics', route: '/java/generics' },
      { label: 'Collections', route: '/java/collections' },
      { label: 'Java 8+ Features', route: '/java/java-8-features' },
      { label: 'Date and Time API', route: '/java/date-and-time-api' },
      { label: 'Multithreading', route: '/java/multithreading' },
      { label: 'File Handling', route: '/java/file-handling' },
      { label: 'Networking', route: '/java/networking' },
      { label: 'JDBC', route: '/java/jdbc' },
      { label: 'Marker Interfaces', route: '/java/marker-interface' }
    ]
  },
  {
    label: 'Spring Boot', route: '/spring-boot', icon: 'bi bi-leaf', children: [
      { label: 'Spring Core', route: '/spring-boot/introduction' },
      { label: 'Setup and Installation', route: '/spring-boot/setup' },
      { label: 'Project Structure', route: '/spring-boot/project-structure' },
      { label: 'AOP', route: '/spring-boot/aop' },
      { label: 'Data JPA', route: '/spring-boot/data-jpa' },
      { label: 'Security', route: '/spring-boot/security-comprehensive' },
      { label: 'Exception Handling', route: '/spring-boot/exception-handling' },
      { label: 'REST APIs', route: '/spring-boot/rest-api' },
      { label: 'REST API Design', route: '/spring-boot/rest-api-design' },
      { label: 'Validation', route: '/spring-boot/validation' },
      { label: 'Testing', route: '/spring-boot/testing' },
      { label: 'Testing Comprehensive', route: '/spring-boot/testing-comprehensive' },
      { label: 'Actuator and Monitoring', route: '/spring-boot/actuator' },
      { label: 'Deployment', route: '/spring-boot/deployment' }
    ]
  },
  { label: 'Angular', route: '/angular', icon: 'bi bi-braces' },
  { label: 'Interviews', route: '/interviews', icon: 'bi bi-person-workspace' },
  { label: 'Python', route: '/python', icon: 'bi bi-code-slash' },
  { label: 'Hibernate', route: '/hibernate', icon: 'bi bi-database-gear' },
  { label: 'MySQL', route: '/mysql', icon: 'bi bi-database' },
  { label: 'PostgreSQL', route: '/postgresql', icon: 'bi bi-server' },
  { label: 'Design Patterns', route: '/design-patterns', icon: 'bi bi-diagram-3' },
  { label: 'Spring AI', route: '/spring-ai', icon: 'bi bi-stars' }
];

export const FOOTER_NAVIGATION: readonly NavigationItem[] = [
  { label: 'Java', route: '/java' },
  { label: 'Python', route: '/python' },
  { label: 'Spring Boot', route: '/spring-boot' },
  { label: 'Angular', route: '/angular' },
  { label: 'MySQL', route: '/mysql' },
  { label: 'MongoDB', route: '/mongodb' },
  { label: 'PostgreSQL', route: '/postgresql' }
];
