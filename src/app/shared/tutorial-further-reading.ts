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
  { label: 'Spring Boot Core', href: '/spring-boot-core' },
  { label: 'Spring Boot Setup', href: '/spring-boot/setup' },
  { label: 'Spring Boot Project Structure', href: '/project-structure' },
  { label: 'Spring Boot AOP', href: '/spring-boot-aop' },
  { label: 'Spring Data JPA', href: '/spring-boot-data-jpa' },
  { label: 'Spring Boot Security', href: '/spring-boot-security' },
  { label: 'Global Exception Handling', href: '/spring-boot-global-exception-handling' },
  { label: 'Spring Boot Profiles', href: '/spring-boot-profiles' },
  { label: 'Spring Boot Scheduler', href: '/spring-boot-scheduler' },
  { label: 'Spring Boot REST APIs', href: '/spring-boot-rest-api' },
  { label: 'REST API Design', href: '/spring-boot-rest-api-design' },
  { label: 'Spring Boot Validation', href: '/spring-boot-validation' },
  { label: 'Spring Boot Testing', href: '/spring-boot-testing' },
  { label: 'Comprehensive Spring Boot Testing', href: '/spring-boot/testing-comprehensive' },
  { label: 'Spring Boot Actuator', href: '/spring-boot-actuator' },
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

const MYSQL_ALL_READING: FurtherReadingLink[] = [
  { label: 'MySQL SQL', href: '/mysql/sql' },
  { label: 'MySQL SELECT', href: '/mysql/select' },
  { label: 'MySQL WHERE', href: '/mysql/where' },
  { label: 'MySQL Joins', href: '/mysql/joins' },
  { label: 'MySQL GROUP BY', href: '/mysql/group-by' },
  { label: 'MySQL Create Table', href: '/mysql/create-table' },
  { label: 'MySQL Constraints', href: '/mysql/constraints' },
  { label: 'MySQL Prepared Statements', href: '/mysql/prepared-statements' }
];

export function appendFurtherReading(
  document: Document,
  pageKey: string,
  fallbackLinks: FurtherReadingLink[],
  overviewLink: FurtherReadingLink
): void {
  const alreadyPresent = Array.from(document.querySelectorAll('h2')).some((heading) =>
    heading.textContent?.trim().toLowerCase() === 'further reading'
  );
  if (alreadyPresent) return;

  const links = pageKey.startsWith('mysql-')
    ? MYSQL_ALL_READING
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
  const isMySql = pageKey.startsWith('mysql-');
  const uniqueLinks = (isOverview || isPostgreSql || isMySql ? links : [overviewLink, ...links])
    .filter((link, index, all) => all.findIndex((item) => item.href === link.href) === index)
    .slice(0, isOverview ? undefined : 4);

  const section = document.createElement('section');
  section.className = 'further-reading';
  const heading = document.createElement('h2');
  heading.textContent = 'Further Reading';
  section.appendChild(heading);
  const paragraph = document.createElement('p');
  paragraph.textContent = isMySql
    ? 'Continue learning with these related MySQL tutorials:'
    : isPostgreSql
    ? 'Continue learning with these related PostgreSQL tutorials:'
    : 'Continue learning with these related Java and Spring Boot tutorials:';
  section.appendChild(paragraph);
  const list = document.createElement('ul');
  uniqueLinks.forEach((link) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    item.appendChild(anchor);
    list.appendChild(item);
  });
  section.appendChild(list);

  const content = document.querySelector('.document-body') ?? document.body;
  content.appendChild(section);
}
