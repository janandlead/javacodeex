import { PYTHON_TOPICS } from '../core/constants/python-topics';

export interface FurtherReadingLink {
  label: string;
  href: string;
}

const SPRING_BOOT_READING: Record<string, FurtherReadingLink[]> = {
  introduction: [
    { label: 'Spring Boot Setup and Installation', href: '/spring-boot/setup' },
    { label: 'Spring Boot Project Structure', href: '/project-structure' },
    { label: 'Spring Boot Profiles', href: '/spring-boot-profiles' }
  ],
  'project-structure': [
    { label: 'Spring Boot Core Concepts', href: '/spring-boot-core' },
    { label: 'Spring Boot Dependency Injection', href: '/spring-boot/dependency-injection' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' }
  ],
  security: [
    { label: 'Spring Boot 2 to 3 Migration', href: '/spring-boot-2-to-3-migration' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' },
    { label: 'Spring Boot Actuator', href: '/spring-boot-actuator' }
  ],
  'security-comprehensive': [
    { label: 'Spring Boot 2 to 3 Migration', href: '/spring-boot-2-to-3-migration' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' },
    { label: 'Spring Boot Actuator', href: '/spring-boot-actuator' }
  ],
  profiles: [
    { label: 'Spring Boot Deployment', href: '/spring-boot-deployment' },
    { label: 'Spring Boot Scheduler', href: '/spring-boot-scheduler' },
    { label: 'Spring Boot 2 to 3 Migration', href: '/spring-boot-2-to-3-migration' }
  ],
  scheduler: [
    { label: 'Spring Boot Profiles', href: '/spring-boot-profiles' },
    { label: 'Spring Boot Actuator', href: '/spring-boot-actuator' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' }
  ],
  'exception-handling': [
    { label: 'Spring Boot REST API', href: '/spring-boot-rest-api' },
    { label: 'Spring Boot Request Validation', href: '/spring-boot-validation' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' }
  ],
  'data-jpa': [
    { label: 'Spring Boot REST API', href: '/spring-boot-rest-api' },
    { label: 'Spring Boot Request Validation', href: '/spring-boot-validation' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' }
  ],
  'rest-api': [
    { label: 'REST API Design Best Practices', href: '/spring-boot-rest-api-design' },
    { label: 'Spring Boot Request Validation', href: '/spring-boot-validation' },
    { label: 'Spring Boot Global Exception Handling', href: '/spring-boot-global-exception-handling' }
  ],
  validation: [
    { label: 'Spring Boot REST API', href: '/spring-boot-rest-api' },
    { label: 'Spring Boot Global Exception Handling', href: '/spring-boot-global-exception-handling' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' }
  ],
  testing: [
    { label: 'Spring Boot Security', href: '/spring-boot-security' },
    { label: 'Spring Boot REST API', href: '/spring-boot-rest-api' },
    { label: 'Spring Boot Deployment', href: '/spring-boot-deployment' }
  ],
  actuator: [
    { label: 'Spring Boot Deployment', href: '/spring-boot-deployment' },
    { label: 'Spring Boot Scheduler', href: '/spring-boot-scheduler' },
    { label: 'Spring Boot Security', href: '/spring-boot-security' }
  ],
  deployment: [
    { label: 'Spring Boot Actuator', href: '/spring-boot-actuator' },
    { label: 'Spring Boot Profiles', href: '/spring-boot-profiles' },
    { label: 'Spring Boot Security', href: '/spring-boot-security' }
  ],
  'migration-2-to-3': [
    { label: 'Spring Boot Security', href: '/spring-boot-security' },
    { label: 'Spring Boot Testing', href: '/spring-boot-testing' },
    { label: 'Spring Boot Profiles', href: '/spring-boot-profiles' }
  ]
};

const SPRING_BOOT_ALL_READING: FurtherReadingLink[] = [
  { label: 'Spring Boot Overview', href: '/spring-boot-overview' },
  { label: 'Spring Boot Core Concepts', href: '/spring-boot-core' },
  { label: 'Spring Boot Setup and Installation', href: '/spring-boot/setup' },
  { label: 'Spring Boot Project Structure', href: '/project-structure' },
  { label: 'Spring Boot AOP', href: '/spring-boot-aop' },
  { label: 'Spring Boot Data JPA', href: '/spring-boot-data-jpa' },
  { label: 'Spring Boot Hikari Connection Pool', href: '/spring-boot-hikari-connection-pool' },
  { label: 'Spring Boot Redis Cache', href: '/spring-boot-redis-cache' },
  { label: 'Spring Boot File Upload', href: '/spring-boot-file-upload' },
  { label: 'Spring Boot Security', href: '/spring-boot-security' },
  { label: 'Spring Boot Global Exception Handling', href: '/spring-boot-global-exception-handling' },
  { label: 'Spring Boot Profiles', href: '/spring-boot-profiles' },
  { label: 'Spring Boot Scheduler', href: '/spring-boot-scheduler' },
  { label: 'Spring Boot REST API', href: '/spring-boot-rest-api' },
  { label: 'REST API Design Best Practices', href: '/spring-boot-rest-api-design' },
  { label: 'Spring Boot Request Validation', href: '/spring-boot-validation' },
  { label: 'Spring Boot Testing', href: '/spring-boot-testing' },
  { label: 'Spring Boot Testing Comprehensive Guide', href: '/spring-boot/testing-comprehensive' },
  { label: 'Spring Boot Actuator and Monitoring', href: '/spring-boot-actuator' },
  { label: 'Spring Boot Deployment', href: '/spring-boot-deployment' },
  { label: 'Spring Boot 2 to 3 Migration', href: '/spring-boot-2-to-3-migration' }
];

const JAVA_ALL_READING: FurtherReadingLink[] = [
  { label: 'Introduction to Java', href: '/introduction-to-java' },
  { label: 'Download and Install Java', href: '/java-download-and-install-java' },
  { label: 'Install IntelliJ IDEA', href: '/java-download-and-install-intellij-idea' },
  { label: 'Java Methods', href: '/java-methods' },
  { label: 'Java Arrays', href: '/java-arrays' },
  { label: 'Java Strings', href: '/java-strings' },
  { label: 'Java OOP Concepts', href: '/java-oop-concepts' },
  { label: 'Java Object Class', href: '/java-object-class' },
  { label: 'Java Interfaces', href: '/java-interfaces' },
  { label: 'Java Exception Handling', href: '/java-exception-handling' },
  { label: 'Java Regular Expressions', href: '/java-regex' },
  { label: 'Java Memory Management', href: '/java-memory-allocation' },
  { label: 'Java Generics', href: '/java-generics' },
  { label: 'Java Collections Framework', href: '/java-collections' },
  { label: 'Java 8+ Features', href: '/java-8-features' },
  { label: 'Java Date and Time API', href: '/java-date-and-time-api' },
  { label: 'Java Multithreading', href: '/java-multithreading' },
  { label: 'Java File Handling', href: '/java-file-handling' },
  { label: 'Java Networking', href: '/java-networking' },
  { label: 'Java JDBC', href: '/java-jdbc' },
  { label: 'Java Marker Interfaces', href: '/java-marker-interface' }
];

const JAVA_READING: Record<string, FurtherReadingLink[]> = {
  'marker-interface': [
    { label: 'Java Interfaces', href: '/java-interfaces' },
    { label: 'Java Object Class', href: '/java-object-class' },
    { label: 'Java OOP Concepts', href: '/java-oop-concepts' }
  ],
  collections: [
    { label: 'Java Generics', href: '/java-generics' },
    { label: 'Java Multithreading', href: '/java-multithreading' },
    { label: 'Java 8+ Features', href: '/java-8-features' }
  ],
  generics: [
    { label: 'Java Collections Framework', href: '/java-collections' },
    { label: 'Java Interfaces', href: '/java-interfaces' },
    { label: 'Java OOP Concepts', href: '/java-oop-concepts' }
  ],
  'oop-concepts': [
    { label: 'Java Interfaces', href: '/java-interfaces' },
    { label: 'Java Object Class', href: '/java-object-class' },
    { label: 'Java Marker Interfaces', href: '/java-marker-interface' }
  ],
  jdbc: [
    { label: 'Java File Handling', href: '/java-file-handling' },
    { label: 'Java Exception Handling', href: '/java-exception-handling' },
    { label: 'Java Networking', href: '/java-networking' }
  ],
  'exception-handling': [
    { label: 'Java File Handling', href: '/java-file-handling' },
    { label: 'Java JDBC', href: '/java-jdbc' },
    { label: 'Java Networking', href: '/java-networking' }
  ],
  multithreading: [
    { label: 'Java Memory Management', href: '/java-memory-allocation' },
    { label: 'Java Collections Framework', href: '/java-collections' },
    { label: 'Java 8+ Features', href: '/java-8-features' }
  ],
  'memory-allocation': [
    { label: 'Java Multithreading', href: '/java-multithreading' },
    { label: 'Java OOP Concepts', href: '/java-oop-concepts' },
    { label: 'Java Collections Framework', href: '/java-collections' }
  ],
  strings: [
    { label: 'Java Regular Expressions', href: '/java-regex' },
    { label: 'Java Collections Framework', href: '/java-collections' },
    { label: 'Java 8+ Features', href: '/java-8-features' }
  ],
  arrays: [
    { label: 'Java Collections Framework', href: '/java-collections' },
    { label: 'Java Generics', href: '/java-generics' },
    { label: 'Java 8+ Features', href: '/java-8-features' }
  ]
};

const PYTHON_ALL_READING: FurtherReadingLink[] = PYTHON_TOPICS
  .filter((topic) => topic.slug !== 'tutorial')
  .map((topic) => ({ label: topic.title, href: `/${topic.slug}` }));

const POSTGRESQL_READING: Record<string, FurtherReadingLink[]> = {
  introduction: [
    { label: 'PostgreSQL Installation', href: '/postgresql/installation' },
    { label: 'PostgreSQL pgAdmin 4', href: '/postgresql/pgadmin4' },
    { label: 'PostgreSQL Create Table', href: '/postgresql/create-table' }
  ],
  installation: [
    { label: 'PostgreSQL Introduction', href: '/postgresql/introduction' },
    { label: 'PostgreSQL pgAdmin 4', href: '/postgresql/pgadmin4' },
    { label: 'PostgreSQL Create Table', href: '/postgresql/create-table' }
  ],
  pgadmin4: [
    { label: 'PostgreSQL Create Table', href: '/postgresql/create-table' },
    { label: 'PostgreSQL Insert Data', href: '/postgresql/insert-data' },
    { label: 'PostgreSQL Select Data', href: '/postgresql/fetch-data' }
  ],
  'create-table': [
    { label: 'PostgreSQL Insert Data', href: '/postgresql/insert-data' },
    { label: 'PostgreSQL Select Data', href: '/postgresql/fetch-data' },
    { label: 'PostgreSQL ADD COLUMN', href: '/postgresql/add-column' }
  ],
  'insert-data': [
    { label: 'PostgreSQL Select Data', href: '/postgresql/fetch-data' },
    { label: 'PostgreSQL UPDATE', href: '/postgresql/update-data' },
    { label: 'PostgreSQL DELETE', href: '/postgresql/delete-data' }
  ],
  'fetch-data': [
    { label: 'PostgreSQL Insert Data', href: '/postgresql/insert-data' },
    { label: 'PostgreSQL UPDATE', href: '/postgresql/update-data' },
    { label: 'PostgreSQL DELETE', href: '/postgresql/delete-data' }
  ],
  'add-column': [
    { label: 'PostgreSQL ALTER COLUMN', href: '/postgresql/alter-column' },
    { label: 'PostgreSQL DROP COLUMN', href: '/postgresql/drop-column' },
    { label: 'PostgreSQL Create Table', href: '/postgresql/create-table' }
  ],
  'update-data': [
    { label: 'PostgreSQL Select Data', href: '/postgresql/fetch-data' },
    { label: 'PostgreSQL Insert Data', href: '/postgresql/insert-data' },
    { label: 'PostgreSQL DELETE', href: '/postgresql/delete-data' }
  ],
  'alter-column': [
    { label: 'PostgreSQL ADD COLUMN', href: '/postgresql/add-column' },
    { label: 'PostgreSQL DROP COLUMN', href: '/postgresql/drop-column' },
    { label: 'PostgreSQL Create Table', href: '/postgresql/create-table' }
  ],
  'drop-column': [
    { label: 'PostgreSQL ADD COLUMN', href: '/postgresql/add-column' },
    { label: 'PostgreSQL ALTER COLUMN', href: '/postgresql/alter-column' },
    { label: 'PostgreSQL DROP TABLE', href: '/postgresql/drop-table' }
  ],
  'delete-data': [
    { label: 'PostgreSQL Select Data', href: '/postgresql/fetch-data' },
    { label: 'PostgreSQL UPDATE', href: '/postgresql/update-data' },
    { label: 'PostgreSQL DROP TABLE', href: '/postgresql/drop-table' }
  ],
  'drop-table': [
    { label: 'PostgreSQL Create Table', href: '/postgresql/create-table' },
    { label: 'PostgreSQL DELETE', href: '/postgresql/delete-data' },
    { label: 'PostgreSQL ADD COLUMN', href: '/postgresql/add-column' }
  ]
};

const POSTGRESQL_ALL_READING: FurtherReadingLink[] = [
  { label: 'PostgreSQL SELECT', href: '/postgresql/select' },
  { label: 'PostgreSQL WHERE', href: '/postgresql/where' },
  { label: 'PostgreSQL ORDER BY', href: '/postgresql/order-by' },
  { label: 'PostgreSQL Joins', href: '/postgresql/joins' },
  { label: 'PostgreSQL GROUP BY', href: '/postgresql/group-by' },
  { label: 'PostgreSQL HAVING', href: '/postgresql/having' },
  { label: 'PostgreSQL CASE', href: '/postgresql/case' }
];

export function appendFurtherReading(
  document: Document,
  pageKey: string,
  fallbackLinks: FurtherReadingLink[],
  overviewLink: FurtherReadingLink,
  currentHref = ''
): void {
  const alreadyPresent = Array.from(document.querySelectorAll('h2')).some((heading) =>
    heading.textContent?.trim().toLowerCase() === 'further reading'
  );
  if (alreadyPresent) return;
  if (pageKey.startsWith('mysql-')) return;

  const isJavaPage = JAVA_ALL_READING.some((link) => link.href === currentHref);
  const isSpringBootPage = SPRING_BOOT_ALL_READING.some((link) => link.href === currentHref);
  const isPythonPage = PYTHON_ALL_READING.some((link) => link.href === currentHref);
  const links = isJavaPage
    ? JAVA_ALL_READING
    : isSpringBootPage
    ? SPRING_BOOT_ALL_READING
    : isPythonPage
    ? fallbackLinks
    : pageKey.startsWith('postgresql-')
    ? POSTGRESQL_READING[pageKey.replace('postgresql-', '')] ?? POSTGRESQL_ALL_READING
    : pageKey === 'springboot-index'
    ? SPRING_BOOT_ALL_READING
      : pageKey === 'java-index'
      ? JAVA_ALL_READING
      : pageKey in SPRING_BOOT_READING
    ? SPRING_BOOT_READING[pageKey]
    : pageKey in JAVA_READING
      ? JAVA_READING[pageKey]
      : fallbackLinks;
  const isOverview = pageKey === 'springboot-index' || pageKey === 'java-index';
  const isPostgreSql = pageKey.startsWith('postgresql-');
  const uniqueLinks = (isOverview || isJavaPage || isSpringBootPage || isPythonPage || isPostgreSql ? links : [overviewLink, ...links])
    .filter((link) => link.href !== currentHref)
    .filter((link, index, all) => all.findIndex((item) => item.href === link.href) === index)
    .slice(0, isOverview || isJavaPage || isSpringBootPage || isPythonPage ? undefined : 4);

  const section = document.createElement('section');
  section.className = 'further-reading';
  const heading = document.createElement('h2');
  heading.textContent = 'Further Reading';
  section.appendChild(heading);
  const paragraph = document.createElement('p');
  paragraph.textContent = isJavaPage
    ? 'Continue learning with these related Java tutorials:'
    : isSpringBootPage
    ? 'Continue learning with these related Spring Boot tutorials:'
    : isPythonPage
    ? 'Continue learning with these related Python tutorials:'
    : isPostgreSql
    ? 'Continue learning with these related PostgreSQL tutorials:'
    : 'Continue learning with these related Java and Spring Boot tutorials:';
  section.appendChild(paragraph);
  const list = document.createElement('ul');
  uniqueLinks.forEach((link, index) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    const number = document.createElement('span');
    number.className = 'further-reading-index';
    number.textContent = String(index + 1).padStart(2, '0');
    const label = document.createElement('span');
    label.className = 'further-reading-label';
    label.textContent = link.label;
    const arrow = document.createElement('span');
    arrow.className = 'further-reading-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    anchor.appendChild(number);
    anchor.appendChild(label);
    anchor.appendChild(arrow);
    item.appendChild(anchor);
    list.appendChild(item);
  });
  section.appendChild(list);

  const content = document.querySelector('.document-body') ?? document.body;
  content.appendChild(section);
}
