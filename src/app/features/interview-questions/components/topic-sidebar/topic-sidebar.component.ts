import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { InterviewTopic } from '../../models/interview-topic.model';

@Component({
  selector: 'app-topic-sidebar',
  standalone: true,
  templateUrl: './topic-sidebar.component.html',
  styleUrl: './topic-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicSidebarComponent {
  readonly topics = input<readonly InterviewTopic[]>([]);
  readonly selectedTopicId = input('');
  readonly isOpen = input(true);
  readonly topicSelected = output<string>();
  readonly sidebarToggled = output<boolean>();
  readonly expandedTopicId = signal('java');
  readonly topLevelTopics = computed(() => this.topics().filter((topic) => !topic.parentId));

  childTopics(topicId: string): readonly InterviewTopic[] {
    return this.topics().filter((topic) => topic.parentId === topicId);
  }

  selectTopic(topicId: string): void { this.topicSelected.emit(topicId); }
  selectOrToggleTopic(topic: InterviewTopic): void {
    if (this.childTopics(topic.id).length) this.toggleTopicGroup(topic.id);
    this.selectTopic(topic.id);
  }
  toggleSidebar(): void { this.sidebarToggled.emit(!this.isOpen()); }
  toggleTopicGroup(topicId: string): void { this.expandedTopicId.update((current) => current === topicId ? '' : topicId); }
}
