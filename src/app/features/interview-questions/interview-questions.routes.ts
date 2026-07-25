import { Routes } from '@angular/router';

export const INTERVIEW_QUESTION_ROUTES: Routes = [
  { path: '', redirectTo: 'java', pathMatch: 'full' },
  {
    path: ':topicId/:sectionId',
    title: 'Interview Questions | Java Codeex',
    data: { category: 'Java Interview Preparation', primaryKeyword: 'Java interview questions', description: 'Prepare for Java technical interviews with focused questions covering core Java, Spring Boot, Hibernate, Kafka, microservices, and databases.', keywords: 'Java interview questions, technical interview preparation, Java interview preparation' },
    loadComponent: () => import('./components/interview-questions/interview-questions.component').then((component) => component.InterviewQuestionsComponent)
  },
  {
    path: ':topicId',
    title: 'Interview Questions | Java Codeex',
    data: { category: 'Java Interview Preparation', primaryKeyword: 'Java interview questions', description: 'Prepare for Java technical interviews with focused questions covering core Java, Spring Boot, Hibernate, Kafka, microservices, and databases.', keywords: 'Java interview questions, technical interview preparation, Java interview preparation' },
    loadComponent: () => import('./components/interview-questions/interview-questions.component').then((component) => component.InterviewQuestionsComponent)
  }
];
