import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { InterviewQuestionService } from './interview-question.service';

describe('InterviewQuestionService', () => {
  let service: InterviewQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [InterviewQuestionService] });
    service = TestBed.inject(InterviewQuestionService);
  });

  it('returns all six interview topics', async () => {
    const topics = await firstValueFrom(service.getTopics());
    expect(topics.length).toBe(6);
  });

  it('returns only questions for the selected topic', async () => {
    const questions = await firstValueFrom(service.getQuestionsByTopic('kafka'));
    expect(questions.length).toBe(5);
    expect(questions.every((question) => question.topicId === 'kafka')).toBeTrue();
  });

  it('returns a question by id or undefined', async () => {
    expect((await firstValueFrom(service.getQuestionById(1)))?.topicId).toBe('java');
    expect(await firstValueFrom(service.getQuestionById(999))).toBeUndefined();
  });
});
