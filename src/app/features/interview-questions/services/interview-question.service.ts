import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INTERVIEW_QUESTIONS, INTERVIEW_TOPICS } from '../data/interview-question.data';
import { InterviewQuestion } from '../models/interview-question.model';
import { InterviewTopic } from '../models/interview-topic.model';

@Injectable({ providedIn: 'root' })
export class InterviewQuestionService {
  getTopics(): Observable<readonly InterviewTopic[]> {
    return of(INTERVIEW_TOPICS);
  }

  getQuestionsByTopic(topicId: string, section?: string): Observable<readonly InterviewQuestion[]> {
    return of(INTERVIEW_QUESTIONS.filter((question) => question.topicId === topicId && (!section || question.section === section)));
  }

  getQuestionById(questionId: number): Observable<InterviewQuestion | undefined> {
    return of(INTERVIEW_QUESTIONS.find((question) => question.id === questionId));
  }
}
