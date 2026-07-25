export const siteUrl = 'https://javacodeex.in';

const java = ['introduction-to-java', 'download-and-install-java', 'download-and-install-intellij-idea', 'methods', 'arrays', 'strings', 'oop-concepts', 'interfaces', 'exception-handling', 'regex', 'memory-allocation', 'generics', 'collections', 'java-8-features', 'date-and-time-api', 'multithreading', 'file-handling', 'networking', 'jdbc', 'marker-interface'];
const springBoot = ['introduction', 'setup', 'project-structure', 'aop', 'data-jpa', 'security-comprehensive', 'exception-handling', 'rest-api', 'rest-api-design', 'validation', 'testing', 'testing-comprehensive', 'actuator', 'deployment'];
const patterns = ['singleton', 'factory-method', 'abstract-factory', 'builder', 'prototype', 'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy', 'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator', 'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor'];

export const publicRoutes = [
  '/', '/java', ...java.map((topic) => `/java/${topic}`), '/spring-boot', ...springBoot.map((topic) => `/spring-boot/${topic}`),
  '/python', '/angular', '/hibernate', '/mysql', '/mongodb', '/postgresql', '/spring-ai', '/design-patterns',
  '/interview-questions/java', '/interview-questions/java-oops', '/interview-questions/java-exception-handling', '/interview-questions/java-collections', '/interview-questions/java-garbage-collection', '/interview-questions/java-multithreading', '/interview-questions/java-strings', '/interview-questions/java-design-patterns',
  '/interview-questions/spring-boot', '/interview-questions/spring-boot-fundamentals', '/interview-questions/spring-boot-auto-configuration', '/interview-questions/spring-boot-annotations', '/interview-questions/spring-boot-dependency-injection', '/interview-questions/spring-boot-rest-api', '/interview-questions/spring-boot-configuration', '/interview-questions/spring-boot-data-jpa', '/interview-questions/spring-boot-transactions', '/interview-questions/spring-boot-security', '/interview-questions/spring-boot-actuator', '/interview-questions/spring-boot-logging', '/interview-questions/spring-boot-caching', '/interview-questions/spring-boot-production-performance', '/interview-questions/spring-boot-3',
  '/interview-questions/hibernate', '/interview-questions/kafka', '/interview-questions/microservices', '/interview-questions/database', ...patterns.map((pattern) => `/design-patterns/${pattern}`)
];
