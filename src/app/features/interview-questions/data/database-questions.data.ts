import { InterviewQuestion } from '../models/interview-question.model';

const question = (id: number, text: string, difficulty: InterviewQuestion['difficulty'], tags: readonly string[]): InterviewQuestion => ({ id, topicId: 'database', question: text, answer: '', difficulty, tags });

export const DATABASE_QUESTIONS: readonly InterviewQuestion[] = [
  question(1501, 'What is the difference between SQL and NoSQL databases?', 'Beginner', ['SQL', 'NoSQL']),
  question(1502, 'What is the difference between a primary key and a unique key?', 'Beginner', ['Primary key', 'Unique key']),
  question(1503, 'What is the difference between a primary key and a foreign key?', 'Beginner', ['Primary key', 'Foreign key']),
  question(1504, 'What is database normalization, and why is it required?', 'Beginner', ['Normalization', 'Data modeling']),
  question(1505, 'What are First, Second, and Third Normal Forms?', 'Intermediate', ['Normalization', 'Database design']),
  question(1506, 'What is denormalization, and when should it be used?', 'Intermediate', ['Denormalization', 'Performance']),
  question(1507, 'What are joins, and what are the different types of SQL joins?', 'Beginner', ['Joins', 'SQL']),
  question(1508, 'What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?', 'Beginner', ['Joins', 'SQL']),
  question(1509, 'What is the difference between WHERE and HAVING?', 'Beginner', ['WHERE', 'HAVING']),
  question(1510, 'What is the difference between GROUP BY and ORDER BY?', 'Beginner', ['GROUP BY', 'ORDER BY']),
  question(1511, 'What is the difference between a subquery and a join?', 'Intermediate', ['Subquery', 'Joins']),
  question(1512, 'What is an index, and how does it improve query performance?', 'Beginner', ['Indexes', 'Performance']),
  question(1513, 'What is the difference between clustered and non-clustered indexes?', 'Intermediate', ['Clustered index', 'Non-clustered index']),
  question(1514, 'What is a composite index, and why does column order matter?', 'Advanced', ['Composite index', 'Indexes']),
  question(1515, 'What are ACID properties in database transactions?', 'Beginner', ['ACID', 'Transactions']),
  question(1516, 'What are transaction isolation levels?', 'Intermediate', ['Isolation', 'Transactions']),
  question(1517, 'What are dirty reads, non-repeatable reads, and phantom reads?', 'Advanced', ['Isolation', 'Concurrency']),
  question(1518, 'What is a database deadlock, and how can it be prevented?', 'Advanced', ['Deadlock', 'Transactions']),
  question(1519, 'How does database connection pooling work in a Java application?', 'Intermediate', ['Connection pooling', 'Java']),
  question(1520, 'How do you identify and optimize a slow SQL query?', 'Advanced', ['SQL', 'Query optimization'])
];
