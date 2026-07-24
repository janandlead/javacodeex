export interface TutorialSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly code?: string;
}

export interface TutorialPage {
  readonly title: string;
  readonly description: string;
  readonly category: 'Java' | 'Spring Boot' | 'Python';
  readonly sections: readonly TutorialSection[];
}

