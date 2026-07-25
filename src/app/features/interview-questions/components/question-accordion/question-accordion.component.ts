import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InterviewQuestion } from '../../models/interview-question.model';

@Component({
  selector: 'app-question-accordion',
  standalone: true,
  templateUrl: './question-accordion.component.html',
  styleUrl: './question-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionAccordionComponent {
  readonly questions = input<readonly InterviewQuestion[]>([]);
  readonly topicName = input('');
}
