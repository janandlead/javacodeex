import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InterviewQuestion } from '../../models/interview-question.model';
import { InterviewTopic } from '../../models/interview-topic.model';
import { InterviewQuestionService } from '../../services/interview-question.service';
import { QuestionAccordionComponent } from '../question-accordion/question-accordion.component';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-interview-questions',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, QuestionAccordionComponent],
  templateUrl: './interview-questions.component.html',
  styleUrl: './interview-questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewQuestionsComponent {
  readonly topics = signal<readonly InterviewTopic[]>([]);
  readonly questions = signal<readonly InterviewQuestion[]>([]);
  readonly selectedTopicId = signal('java');
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly difficultyControl = new FormControl<'All' | InterviewQuestion['difficulty']>('All', { nonNullable: true });
  readonly searchText = toSignal(this.searchControl.valueChanges, { initialValue: '' });
  readonly selectedDifficulty = toSignal(this.difficultyControl.valueChanges, { initialValue: 'All' as const });
  readonly selectedTopic = computed<InterviewTopic | undefined>(() => this.topics().find((topic) => topic.id === this.selectedTopicId()) ?? this.topics()[0]);
  readonly selectedTopicName = computed(() => this.selectedTopic()?.name.replace(/\s+Interview Questions?$/i, '').trim() ?? 'Technical');
  readonly pageHeading = computed(() => this.selectedTopicId() === 'java' ? 'Java Technical Interview Questions' : `${this.selectedTopicName()} Interview Questions`);
  readonly filteredQuestions = computed(() => {
    const search = this.searchText().toLowerCase().trim();
    const difficulty = this.selectedDifficulty();
    return this.questions().filter((question) => {
      const searchable = [question.question, question.answer, ...(question.tags ?? []), question.difficulty].join(' ').toLowerCase();
      return (!search || searchable.includes(search)) && (difficulty === 'All' || question.difficulty === difficulty);
    });
  });

  private readonly service = inject(InterviewQuestionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seo = inject(SeoService);

  constructor() {
    this.service.getTopics().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((topics) => this.topics.set(topics));
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const section = params.get('sectionId') ?? undefined;
      const topicId = section === 'exception-handling' ? 'java-exception-handling' : params.get('topicId') ?? 'java';
      this.selectTopic(topicId, false, section);
    });
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const topicId = params.get('topic');
      if (topicId) this.selectTopic(topicId, false);
    });
  }


  selectTopic(topicId: string, navigate = true, section?: string): void {
    const topic = this.topics().find((item) => item.id === topicId) ?? this.topics()[0];
    if (!topic) return;
    this.selectedTopicId.set(topic.id);
    this.seo.updateInterviewTopic(topic);
    this.service.getQuestionsByTopic(topic.sourceTopicId ?? topic.id, topic.questionSection ?? section).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((questions) => this.questions.set(questions));
    if (navigate && (this.route.snapshot.paramMap.get('topicId') !== topic.id || this.route.snapshot.paramMap.has('sectionId'))) void this.router.navigate(['/interview-questions', topic.id]);
    this.isMobile();
  }

  private isMobile(): boolean { return this.router.url.length >= 0 && (globalThis.innerWidth ?? 1024) < 768; }
}
