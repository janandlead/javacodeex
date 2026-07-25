export interface InterviewTopic {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly description: string;
  readonly questionCount: number;
  readonly sourceTopicId?: string;
  readonly questionSection?: string;
  readonly parentId?: string;
}
