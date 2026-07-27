export interface InterviewQuestionGroup {
  readonly category: string;
  readonly questions: readonly string[];
}

export interface CompanyInterview {
  readonly slug: string;
  readonly company: string;
  readonly role: string;
  readonly interviewDate: string;
  readonly candidateExperience: string;
  readonly techStack: readonly string[];
  readonly questionGroups: readonly InterviewQuestionGroup[];
}

export const COMPANY_INTERVIEWS: readonly CompanyInterview[] = [
  {
    slug: 'example-technology-company-java-backend',
    company: 'Example Technology Company',
    role: 'Java Backend Developer',
    interviewDate: 'July 2026',
    candidateExperience: '8 years',
    techStack: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL'],
    questionGroups: [
      {
        category: 'Core Java',
        questions: [
          'What is the Singleton Design Pattern?',
          'How do you create a Singleton class in Java? What are the different ways to implement it?',
          'What is an immutable class? How do you create one in Java?',
          'What is the difference between a List and a Set?',
          'What is ConcurrentModificationException? Why does it occur, and how can you prevent it?',
          "What are the different types of thread pools available in Java's Executor Framework?",
          'Explain the lifecycle of a thread in Java.',
          'How does a HashMap work internally in Java?',
          'What is Garbage Collection in Java? How does it work?'
        ]
      },
      {
        category: 'Spring & Spring Boot',
        questions: [
          'What is the difference between @Component and @Service in Spring?',
          'What is the difference between the Spring Framework and Spring Boot?',
          'How do you define a Many-to-Many relationship in Spring Boot using JPA/Hibernate?',
          'Which design patterns have you used in your project?'
        ]
      },
      {
        category: 'Production Support',
        questions: [
          'How do you analyze and troubleshoot production issues in a Spring Boot application?',
          'Describe your step-by-step approach to debugging a production issue.'
        ]
      },
      {
        category: 'SQL',
        questions: [
          'Write an SQL query to find the employee with the second-highest salary.'
        ]
      }
    ]
  }
];
