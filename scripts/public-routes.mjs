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
  '/spring-boot-aop', '/spring-boot-data-jpa', '/spring-boot-hikari-connection-pool', '/spring-boot-redis-cache', '/spring-boot-file-upload', '/spring-boot-security',
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

const pythonRoutes = [
  'what-is-python', 'python-features', 'advantages-of-python', 'history-of-python', 'python-applications', 'hello-world-program', 'install-python', 'python-syntax', 'python-keywords', 'python-literals', 'python-operators', 'python-comments',
  'python-variables', 'python-data-types', 'python-numbers', 'type-casting', 'python-strings', 'python-string-methods', 'python-boolean',
  'python-if-else', 'python-loops', 'python-for-loop', 'python-while-loop', 'python-continue', 'python-break-statement', 'python-pass', 'difference-between-break-and-continue-in-python', 'difference-between-for-loop-and-while-loop-in-python', 'control-statements-in-python',
  'python-data-structures', 'python-lists', 'python-list-methods', 'python-tuples', 'python-tuple-methods', 'list-vs-tuple', 'python-sets', 'python-set-methods', 'python-dictionary', 'python-dictionary-methods', 'list-vs-dictionary', 'list-set-tuple-dictionary', 'set-vs-dictionary',
  'python-functions', 'python-built-in-functions', 'python-lambda-functions', 'def-function', 'python-modules', 'python-list-comprehension', 'python-collection-module', 'python-math-module', 'python-os-module', 'python-random-module', 'python-statistics-module', 'python-sys-module',
  'python-oops', 'python-oops-concepts', 'classes-and-objects', 'python-constructors', 'python-inheritance', 'python-abstraction', 'python-encapsulation', 'python-access-modifiers', 'python-method-overloading',
  'python-exception-handling', 'exception-handling', 'catch-multiple-exceptions', 'python-raise-exception', 'finally-keyword', 'python-built-in-exceptions',
  'python-file-handling', 'read-csv-file', 'write-csv-file', 'read-excel-file', 'write-excel-file', 'python-json', 'context-manager'
].map((route) => `/${route}`);

export const publicRoutes = [
  '/', '/workshops', '/corporate-training', '/corporate-java-training', '/spring-boot-corporate-training', '/ai-training-for-developers', '/java-bootcamp-india', '/trainers', '/brochure', '/request-corporate-demo', '/spring-boot-ai-workshop', ...javaRoutes, ...springBootRoutes, ...hibernateRoutes,
  '/spring-boot-2-to-3-migration', '/python-tutorial', '/angular', '/mysql', '/mongodb', ...mysqlRoutes, ...postgresqlRoutes, ...pythonRoutes,
  '/spring-ai', '/java-ai-assistant-projects/spring-boot-ai-assist-project', '/design-patterns', '/interviews', ...interviewRoutes,
  '/about', '/author', '/categories', '/contact', '/privacy-policy', '/terms-and-conditions', '/disclaimer',
  ...patternRoutes
].filter((route, index, routes) => routes.indexOf(route) === index);
