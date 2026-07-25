import { InterviewQuestion } from '../models/interview-question.model';
import { GARBAGE_COLLECTION_QUESTIONS } from './garbage-collection-questions.data';
import { MULTITHREADING_QUESTIONS } from './multithreading-questions.data';
import { STRINGS_QUESTIONS } from './strings-questions.data';

const question = (id: number, topicId: string, text: string, answer: string, difficulty: InterviewQuestion['difficulty'], tags: readonly string[], codeExample?: string): InterviewQuestion => ({ id, topicId, question: text, answer, difficulty, tags, codeExample });

export const JAVA_SPECIALTY_QUESTIONS: readonly InterviewQuestion[] = [
  ...GARBAGE_COLLECTION_QUESTIONS,
  ...MULTITHREADING_QUESTIONS,
  ...STRINGS_QUESTIONS,
  question(230, 'java-design-patterns', 'What is a design pattern, and why is it used in software development?', '', 'Beginner', ['Patterns', 'Design']),
  question(231, 'java-design-patterns', 'What are the three main categories of design patterns?', '', 'Beginner', ['Patterns', 'Categories']),
  question(232, 'java-design-patterns', 'What is the difference between creational, structural, and behavioral design patterns?', '', 'Beginner', ['Creational', 'Structural', 'Behavioral']),
  question(233, 'java-design-patterns', 'What is the Singleton design pattern, and how can it be implemented in Java?', '', 'Intermediate', ['Singleton', 'Creational']),
  question(234, 'java-design-patterns', 'How can you make a Singleton class thread-safe?', '', 'Advanced', ['Singleton', 'Thread safety']),
  question(235, 'java-design-patterns', 'Why is an enum considered a good way to implement Singleton in Java?', '', 'Intermediate', ['Singleton', 'Enum']),
  question(236, 'java-design-patterns', 'What is the Factory Method design pattern?', '', 'Intermediate', ['Factory Method', 'Creational']),
  question(237, 'java-design-patterns', 'What is the difference between Factory Method and Abstract Factory patterns?', '', 'Advanced', ['Factory Method', 'Abstract Factory']),
  question(238, 'java-design-patterns', 'What is the Builder design pattern, and when should it be used?', '', 'Beginner', ['Builder', 'Creational']),
  question(239, 'java-design-patterns', 'What is the difference between Builder and Factory design patterns?', '', 'Intermediate', ['Builder', 'Factory']),
  question(240, 'java-design-patterns', 'What is the Prototype design pattern, and how does cloning work in Java?', '', 'Intermediate', ['Prototype', 'Creational']),
  question(241, 'java-design-patterns', 'What is the Adapter design pattern, and when would you use it?', '', 'Beginner', ['Adapter', 'Structural']),
  question(242, 'java-design-patterns', 'What is the difference between Adapter, Facade, and Proxy patterns?', '', 'Advanced', ['Adapter', 'Facade', 'Proxy']),
  question(243, 'java-design-patterns', 'What is the Decorator design pattern, and how is it different from inheritance?', '', 'Intermediate', ['Decorator', 'Structural']),
  question(244, 'java-design-patterns', 'What is the Observer design pattern, and where is it used in real applications?', '', 'Beginner', ['Observer', 'Behavioral']),
  question(245, 'java-design-patterns', 'What is the Strategy design pattern, and how does it help replace conditional logic?', '', 'Intermediate', ['Strategy', 'Behavioral']),
  question(246, 'java-design-patterns', 'What is the difference between Strategy and State design patterns?', '', 'Advanced', ['Strategy', 'State']),
  question(247, 'java-design-patterns', 'What is the Template Method design pattern?', '', 'Intermediate', ['Template Method', 'Behavioral']),
  question(248, 'java-design-patterns', 'What is the Chain of Responsibility design pattern, and where is it useful?', '', 'Intermediate', ['Chain of Responsibility', 'Behavioral']),
  question(249, 'java-design-patterns', 'Which design patterns are commonly used in Spring and Spring Boot applications?', '', 'Advanced', ['Spring', 'Spring Boot', 'Patterns'])
];
