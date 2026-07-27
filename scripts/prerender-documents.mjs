import { readFile, writeFile } from 'node:fs/promises';

const javaDocuments = [
  ['introduction-to-java', 'introduction-to-java'], ['download-and-install-java', 'java-download-and-install-java'],
  ['download-and-install-intellij-idea', 'java-download-and-install-intellij-idea'], ['methods', 'java-methods'],
  ['arrays', 'java-arrays'], ['strings', 'java-strings'], ['oop-concepts', 'java-oop-concepts'],
  ['object-class', 'java-object-class'], ['interfaces', 'java-interfaces'], ['exception-handling', 'java-exception-handling'],
  ['regex', 'java-regex'], ['memory-allocation', 'java-memory-allocation'], ['generics', 'java-generics'],
  ['collections', 'java-collections'], ['java-8-features', 'java-8-features'], ['date-and-time-api', 'java-date-and-time-api'],
  ['multithreading', 'java-multithreading'], ['file-handling', 'java-file-handling'], ['networking', 'java-networking'],
  ['jdbc', 'java-jdbc'], ['marker-interface', 'java-marker-interface']
].map(([file, route]) => ({ source: `public/docs/java/${file}.html`, output: `dist/javacodeex/browser/${route}/index.html` }));

const springBootDocuments = [
  ['introduction', 'spring-boot-core'], ['setup', 'spring-boot/setup'], ['project-structure', 'project-structure'],
  ['aop', 'spring-boot-aop'], ['data-jpa', 'spring-boot-data-jpa'], ['security-comprehensive', 'spring-boot-security'],
  ['exception-handling', 'spring-boot-global-exception-handling'], ['profiles', 'spring-boot-profiles'],
  ['scheduler', 'spring-boot-scheduler'], ['rest-api', 'spring-boot-rest-api'], ['rest-api-design', 'spring-boot-rest-api-design'],
  ['validation', 'spring-boot-validation'], ['testing', 'spring-boot-testing'], ['testing-comprehensive', 'spring-boot/testing-comprehensive'],
  ['actuator', 'spring-boot-actuator'], ['deployment', 'spring-boot-deployment'], ['migration-2-to-3', 'spring-boot-2-to-3-migration']
].map(([file, route]) => ({ source: `public/docs/springboot/${file}.html`, output: `dist/javacodeex/browser/${route}/index.html` }));

const postgresqlDocuments = [
  ['introduction', 'postgresql/introduction'],
  ['pgadmin4', 'postgresql/pgadmin4'],
  ['create-table', 'postgresql/create-table'],
  ['insert-data', 'postgresql/insert-data'],
  ['installation', 'postgresql/installation'],
  ['fetch-data', 'postgresql/fetch-data'],
  ['add-column', 'postgresql/add-column'],
  ['update-data', 'postgresql/update-data'],
  ['alter-column', 'postgresql/alter-column'],
  ['drop-column', 'postgresql/drop-column'],
  ['delete-data', 'postgresql/delete-data'],
  ['drop-table', 'postgresql/drop-table'],
  ['operators', 'postgresql/operators'], ['select', 'postgresql/select'], ['select-distinct', 'postgresql/select-distinct'],
  ['where', 'postgresql/where'], ['order-by', 'postgresql/order-by'], ['limit', 'postgresql/limit'], ['min-max', 'postgresql/min-max'],
  ['count', 'postgresql/count'], ['sum', 'postgresql/sum'], ['avg', 'postgresql/avg'], ['like', 'postgresql/like'],
  ['in', 'postgresql/in'], ['between', 'postgresql/between'], ['as', 'postgresql/as'], ['joins', 'postgresql/joins'],
  ['inner-join', 'postgresql/inner-join'], ['left-join', 'postgresql/left-join'], ['right-join', 'postgresql/right-join'],
  ['full-join', 'postgresql/full-join'], ['cross-join', 'postgresql/cross-join'], ['union', 'postgresql/union'],
  ['group-by', 'postgresql/group-by'], ['having', 'postgresql/having'], ['exists', 'postgresql/exists'],
  ['any', 'postgresql/any'], ['all', 'postgresql/all'], ['case', 'postgresql/case']
].map(([file, route]) => ({ source: `public/docs/postgresql/${file}.html`, output: `dist/javacodeex/browser/${route}/index.html` }));

const mysqlDocuments = [
  'index', 'sql', 'select', 'select-distinct', 'where', 'order-by', 'and', 'or', 'not', 'insert-into', 'null-values', 'update', 'delete', 'limit', 'aggregate-functions', 'min', 'max', 'count', 'sum', 'avg', 'like', 'wildcards', 'in', 'between', 'aliases', 'joins', 'inner-join', 'left-join', 'right-join', 'cross-join', 'self-join', 'union', 'union-all', 'group-by', 'having', 'exists', 'any', 'all', 'insert-select', 'case', 'null-functions', 'stored-procedures', 'comments', 'operators', 'create-db', 'drop-db', 'create-table', 'drop-table', 'alter-table', 'constraints', 'not-null', 'unique', 'primary-key', 'foreign-key', 'check', 'default', 'create-index', 'auto-increment', 'dates', 'views', 'injection', 'prepared-statements'
].map((file) => ({ source: `public/docs/mysql/${file}.html`, output: `dist/javacodeex/browser/mysql${file === 'index' ? '' : `/${file}`}/index.html` }));

const documents = [
  { source: 'public/docs/java/index.html', output: 'dist/javacodeex/browser/java-tutorial-overview/index.html', overview: 'java' },
  ...javaDocuments,
  { source: 'public/docs/springboot/index.html', output: 'dist/javacodeex/browser/spring-boot-overview/index.html', overview: 'springboot' },
  ...springBootDocuments,
  ...postgresqlDocuments,
  ...mysqlDocuments
];

const javaReading = [
  ['Introduction to Java', '/introduction-to-java'],
  ['Download and Install Java', '/java-download-and-install-java'],
  ['Install IntelliJ IDEA', '/java-download-and-install-intellij-idea'],
  ['Java Methods', '/java-methods'], ['Java Arrays', '/java-arrays'],
  ['Java Strings', '/java-strings'], ['Java OOP Concepts', '/java-oop-concepts'],
  ['Java Object Class', '/java-object-class'], ['Java Interfaces', '/java-interfaces'],
  ['Java Exception Handling', '/java-exception-handling'], ['Java Regular Expressions', '/java-regex'],
  ['Java Memory Management', '/java-memory-allocation'], ['Java Generics', '/java-generics'],
  ['Java Collections Framework', '/java-collections'], ['Java 8+ Features', '/java-8-features'],
  ['Java Date and Time API', '/java-date-and-time-api'], ['Java Multithreading', '/java-multithreading'],
  ['Java File Handling', '/java-file-handling'], ['Java Networking', '/java-networking'],
  ['Java JDBC', '/java-jdbc'], ['Java Marker Interfaces', '/java-marker-interface']
];

const springBootReading = [
  ['Spring Boot Core', '/spring-boot-core'], ['Spring Boot Setup', '/spring-boot/setup'],
  ['Spring Boot Project Structure', '/project-structure'], ['Spring Boot AOP', '/spring-boot-aop'],
  ['Spring Data JPA', '/spring-boot-data-jpa'], ['Spring Boot Security', '/spring-boot-security'],
  ['Global Exception Handling', '/spring-boot-global-exception-handling'],
  ['Spring Boot Profiles', '/spring-boot-profiles'], ['Spring Boot Scheduler', '/spring-boot-scheduler'],
  ['Spring Boot REST APIs', '/spring-boot-rest-api'], ['REST API Design', '/spring-boot-rest-api-design'],
  ['Spring Boot Validation', '/spring-boot-validation'], ['Spring Boot Testing', '/spring-boot-testing'],
  ['Comprehensive Spring Boot Testing', '/spring-boot/testing-comprehensive'],
  ['Spring Boot Actuator', '/spring-boot-actuator'], ['Spring Boot Deployment', '/spring-boot-deployment'],
  ['Spring Boot 2 to 3 Migration', '/spring-boot-2-to-3-migration']
];

const postgresqlReading = [
  ['PostgreSQL Introduction', '/postgresql/introduction'],
  ['PostgreSQL pgAdmin 4', '/postgresql/pgadmin4'],
  ['PostgreSQL Create Table', '/postgresql/create-table'],
  ['PostgreSQL Insert Data', '/postgresql/insert-data'],
  ['PostgreSQL Select Data', '/postgresql/fetch-data'],
  ['PostgreSQL ADD COLUMN', '/postgresql/add-column'],
  ['PostgreSQL UPDATE', '/postgresql/update-data'],
  ['PostgreSQL ALTER COLUMN', '/postgresql/alter-column'],
  ['PostgreSQL DROP COLUMN', '/postgresql/drop-column'],
  ['PostgreSQL DELETE', '/postgresql/delete-data'],
  ['PostgreSQL DROP TABLE', '/postgresql/drop-table'],
  ['PostgreSQL Operators', '/postgresql/operators'], ['PostgreSQL SELECT', '/postgresql/select'],
  ['PostgreSQL SELECT DISTINCT', '/postgresql/select-distinct'], ['PostgreSQL WHERE', '/postgresql/where'],
  ['PostgreSQL ORDER BY', '/postgresql/order-by'], ['PostgreSQL LIMIT', '/postgresql/limit'],
  ['PostgreSQL MIN and MAX', '/postgresql/min-max'], ['PostgreSQL COUNT', '/postgresql/count'],
  ['PostgreSQL SUM', '/postgresql/sum'], ['PostgreSQL AVG', '/postgresql/avg'], ['PostgreSQL LIKE', '/postgresql/like'],
  ['PostgreSQL IN', '/postgresql/in'], ['PostgreSQL BETWEEN', '/postgresql/between'], ['PostgreSQL AS', '/postgresql/as'],
  ['PostgreSQL Joins', '/postgresql/joins'], ['PostgreSQL INNER JOIN', '/postgresql/inner-join'],
  ['PostgreSQL LEFT JOIN', '/postgresql/left-join'], ['PostgreSQL RIGHT JOIN', '/postgresql/right-join'],
  ['PostgreSQL FULL JOIN', '/postgresql/full-join'], ['PostgreSQL CROSS JOIN', '/postgresql/cross-join'],
  ['PostgreSQL UNION', '/postgresql/union'], ['PostgreSQL GROUP BY', '/postgresql/group-by'],
  ['PostgreSQL HAVING', '/postgresql/having'], ['PostgreSQL EXISTS', '/postgresql/exists'],
  ['PostgreSQL ANY', '/postgresql/any'], ['PostgreSQL ALL', '/postgresql/all'], ['PostgreSQL CASE', '/postgresql/case']
];

const mysqlReading = [
  ['MySQL SQL', '/mysql/sql'], ['MySQL SELECT', '/mysql/select'], ['MySQL WHERE', '/mysql/where'],
  ['MySQL INSERT INTO', '/mysql/insert-into'], ['MySQL UPDATE', '/mysql/update'], ['MySQL DELETE', '/mysql/delete'],
  ['MySQL Aggregate Functions', '/mysql/aggregate-functions'], ['MySQL Joins', '/mysql/joins'], ['MySQL GROUP BY', '/mysql/group-by'],
  ['MySQL Create Table', '/mysql/create-table'], ['MySQL Constraints', '/mysql/constraints'], ['MySQL Views', '/mysql/views'],
  ['MySQL Injection', '/mysql/injection'], ['MySQL Prepared Statements', '/mysql/prepared-statements']
];

function stripOverviewSubtopics(content, overview) {
  if (overview === 'java') {
    return content.replace(/(<div id="[^"]+" class="card section-card[\s\S]*?<p class="text-muted mb-3">[\s\S]*?<\/p>)[\s\S]*?(<ul class="list-group[\s\S]*?<\/ul>)/g, '$1');
  }
  if (overview === 'springboot') {
    return content
      .replace(/<ul class="list-group[\s\S]*?<\/ul>/g, '')
      .replace(/<div class="spring-subtopic-nav"[\s\S]*?<\/div>\s*/g, '')
      .replace(/<div class="spring-topic-nav"[\s\S]*?<\/div>\s*/g, '');
  }
  return content;
}

function furtherReading(links) {
  return `<section class="further-reading"><h2>Further Reading</h2><p>Continue learning with these related tutorials:</p><ul>${links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></section>`;
}

const javaLinkRoutes = {
  'introduction-to-java': '/introduction-to-java', 'download-and-install-java': '/java-download-and-install-java',
  'download-and-install-intellij-idea': '/java-download-and-install-intellij-idea', methods: '/java-methods',
  arrays: '/java-arrays', strings: '/java-strings', 'oop-concepts': '/java-oop-concepts',
  'object-class': '/java-object-class', interfaces: '/java-interfaces', 'exception-handling': '/java-exception-handling',
  regex: '/java-regex', 'memory-allocation': '/java-memory-allocation', generics: '/java-generics',
  collections: '/java-collections', 'java-8-features': '/java-8-features', 'date-and-time-api': '/java-date-and-time-api',
  multithreading: '/java-multithreading', 'file-handling': '/java-file-handling', networking: '/java-networking',
  jdbc: '/java-jdbc', 'marker-interface': '/java-marker-interface', index: '/java-tutorial-overview'
};
const springBootLinkRoutes = {
  introduction: '/spring-boot-core', setup: '/spring-boot/setup', 'project-structure': '/project-structure',
  aop: '/spring-boot-aop', 'data-jpa': '/spring-boot-data-jpa', 'security-comprehensive': '/spring-boot-security',
  'exception-handling': '/spring-boot-global-exception-handling', profiles: '/spring-boot-profiles', scheduler: '/spring-boot-scheduler',
  'rest-api': '/spring-boot-rest-api', 'rest-api-design': '/spring-boot-rest-api-design', validation: '/spring-boot-validation',
  testing: '/spring-boot-testing', 'testing-comprehensive': '/spring-boot/testing-comprehensive', actuator: '/spring-boot-actuator',
  deployment: '/spring-boot-deployment', 'migration-2-to-3': '/spring-boot-2-to-3-migration', index: '/spring-boot-overview'
};

function rewriteLegacyLinks(content, overview) {
  const routes = overview === 'java' ? javaLinkRoutes : springBootLinkRoutes;
  return content.replace(/href="([^"]+)"/g, (match, href) => {
    const sameSite = href.replace(/^https?:\/\/javacodeex\.com/, '');
    if (!sameSite.endsWith('.html') && !sameSite.includes('.html#')) return match;
    const [withoutHash, hash] = sameSite.split('#');
    const file = withoutHash.split('/').pop().replace(/\.html$/, '');
    const route = routes[file];
    return route ? `href="${route}${hash ? `#${hash}` : ''}"` : match;
  });
}

for (const document of documents) {
  const source = await readFile(document.source, 'utf8');
  const prerendered = await readFile(document.output, 'utf8');
  const mainMatch = source.match(/<main class="container-xl py-5">([\s\S]*?)<\/main>/)
    ?? source.match(/<div class="container-xl py-5">([\s\S]*?)(?:\n\s*<!-- Footer -->|\n\s*<footer|\n\s*<\/body>)/);
  if (!mainMatch) continue;
  const titleMatch = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = (titleMatch?.[1] ?? document.source.split('/').pop().replace(/\.html$/, ''))
    .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  const bodyMarker = '<div class="document-body">';
  const bodyStart = prerendered.indexOf(bodyMarker);
  const bodyEnd = prerendered.indexOf('</div><p class="pager-heading">', bodyStart);
  if (bodyStart < 0 || bodyEnd < 0) continue;
  const mainContent = rewriteLegacyLinks(stripOverviewSubtopics(mainMatch[1].trim(), document.overview), document.source.includes('/java/') ? 'java' : 'springboot');
  const heading = /<h1\b/i.test(mainContent) ? '' : `<h1 class="document-prerender-title">${title}</h1>`;
  const content = `${heading}${mainContent}${document.overview === 'java' ? furtherReading(javaReading) : ''}${document.overview === 'springboot' ? furtherReading(springBootReading) : ''}${document.source.includes('/postgresql/') ? furtherReading(postgresqlReading) : ''}${document.source.includes('/mysql/') ? furtherReading(mysqlReading) : ''}`;
  await writeFile(document.output, `${prerendered.slice(0, bodyStart + bodyMarker.length)}${content}${prerendered.slice(bodyEnd)}`);
  console.log(`Injected ${content.length} characters into ${document.output}.`);
}
