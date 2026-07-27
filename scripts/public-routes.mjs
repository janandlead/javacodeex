export const siteUrl = 'https://javacodeex.com';

const javaRoutes = [
  '/java-tutorial-overview', '/introduction-to-java', '/java-download-and-install-java',
  '/java-download-and-install-intellij-idea', '/java-methods', '/java-arrays', '/java-strings',
  '/java-oop-concepts', '/java-object-class', '/java-interfaces', '/java-exception-handling',
  '/java-regex', '/java-memory-allocation', '/java-generics', '/java-collections',
  '/java-8-features', '/java-date-and-time-api', '/java-multithreading', '/java-file-handling',
  '/java-networking', '/java-jdbc', '/java-marker-interface'
];

const springBootRoutes = [
  '/spring-boot-overview', '/spring-boot-core', '/spring-boot/setup', '/project-structure',
  '/spring-boot-aop', '/spring-boot-data-jpa', '/spring-boot-security',
  '/spring-boot-global-exception-handling', '/spring-boot-profiles', '/spring-boot-scheduler',
  '/spring-boot-rest-api', '/spring-boot-rest-api-design', '/spring-boot-validation',
  '/spring-boot-testing', '/spring-boot/testing-comprehensive', '/spring-boot-actuator',
  '/spring-boot-deployment', '/spring-boot-2-to-3-migration'
];

const hibernateRoutes = [
  '/hibernate-tutorial', '/hibernate-architecture', '/hibernate-first-example', '/hibernate-example',
  '/hibernate-generator-classes', '/hibernate/dialects', '/hibernate/collection-mapping',
  '/hibernate/mapping-list', '/hibernate/mapping-bag', '/hibernate-one-to-many-mapping-using-annotation-example',
  '/hibernate-many-to-many-example-using-annotation', '/hibernate-one-to-one-example-using-annotation',
  '/hibernate-many-to-one-example-using-annotation', '/hibernate/bidirectional-association',
  '/hibernate-transaction-management-example', '/hibernate-first-level-cache', '/hibernate-second-level-cache'
];

const interviewRoutes = [
  '/company-interview-questions', '/company-interview-questions/example-technology-company-java-backend', '/java-technical-interview-questions', '/interview-questions/java-oops', '/interview-questions/java-exception-handling',
  '/interview-questions/java-collections', '/interview-questions/java-garbage-collection', '/interview-questions/java-multithreading',
  '/interview-questions/java-strings', '/interview-questions/java-design-patterns', '/interview-questions/spring-boot',
  '/interview-questions/spring-boot-fundamentals', '/interview-questions/spring-boot-auto-configuration',
  '/interview-questions/spring-boot-annotations', '/interview-questions/spring-boot-dependency-injection',
  '/interview-questions/spring-boot-rest-api', '/interview-questions/spring-boot-configuration',
  '/interview-questions/spring-boot-data-jpa', '/interview-questions/spring-boot-transactions',
  '/interview-questions/spring-boot-security', '/interview-questions/spring-boot-actuator',
  '/interview-questions/spring-boot-logging', '/interview-questions/spring-boot-caching',
  '/interview-questions/spring-boot-production-performance', '/interview-questions/spring-boot-3',
  '/interview-questions/hibernate', '/interview-questions/kafka', '/interview-questions/microservices',
  '/interview-questions/database'
];

const patternRoutes = ['singleton', 'factory-method', 'abstract-factory', 'builder', 'prototype', 'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy', 'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator', 'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor'].map((pattern) => `/design-patterns/${pattern}`);

const postgresqlRoutes = [
  'introduction', 'installation', 'pgadmin4', 'create-table', 'insert-data', 'fetch-data', 'add-column', 'update-data', 'alter-column', 'drop-column', 'delete-data', 'drop-table',
  'operators', 'select', 'select-distinct', 'where', 'order-by', 'limit', 'min-max', 'count', 'sum', 'avg', 'like', 'in', 'between', 'as', 'joins', 'inner-join', 'left-join', 'right-join', 'full-join', 'cross-join', 'union', 'group-by', 'having', 'exists', 'any', 'all', 'case'
].map((route) => `/postgresql/${route}`);

const mysqlRoutes = [
  'sql', 'select', 'select-distinct', 'where', 'order-by', 'and', 'or', 'not', 'insert-into', 'null-values', 'update', 'delete', 'limit', 'aggregate-functions', 'min', 'max', 'count', 'sum', 'avg', 'like', 'wildcards', 'in', 'between', 'aliases', 'joins', 'inner-join', 'left-join', 'right-join', 'cross-join', 'self-join', 'union', 'union-all', 'group-by', 'having', 'exists', 'any', 'all', 'insert-select', 'case', 'null-functions', 'stored-procedures', 'comments', 'operators', 'create-db', 'drop-db', 'create-table', 'drop-table', 'alter-table', 'constraints', 'not-null', 'unique', 'primary-key', 'foreign-key', 'check', 'default', 'create-index', 'auto-increment', 'dates', 'views', 'injection', 'prepared-statements'
].map((route) => `/mysql/${route}`);

export const publicRoutes = [
  '/', ...javaRoutes, ...springBootRoutes, ...hibernateRoutes,
  '/spring-boot-2-to-3-migration', '/python', '/angular', '/mysql', '/mongodb', ...mysqlRoutes, ...postgresqlRoutes,
  '/spring-ai', '/design-patterns', '/interviews', ...interviewRoutes,
  '/about', '/author', '/categories', '/contact', '/privacy-policy', '/terms-and-conditions', '/disclaimer',
  ...patternRoutes
].filter((route, index, routes) => routes.indexOf(route) === index);
