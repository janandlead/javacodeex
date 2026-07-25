export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InterviewQuestion {
  readonly id: number;
  readonly topicId: string;
  readonly section?: string;
  readonly question: string;
  readonly answer: string;
  readonly codeExample?: string;
  readonly difficulty: InterviewDifficulty;
  readonly tags?: readonly string[];
}
