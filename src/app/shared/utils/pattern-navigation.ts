import { Router } from '@angular/router';

export interface PatternLessonLink { route: string; label: string; }

export function syncPatternNavigation(host: HTMLElement, router: Router, lessons: readonly PatternLessonLink[], currentRoute: string): void {
  const index = lessons.findIndex((lesson) => lesson.route === currentRoute);
  if (index < 0) return;
  const previous = lessons[index - 1] ?? { route: '/design-patterns', label: 'Design Patterns' };
  const next = lessons[index + 1] ?? { route: '/design-patterns', label: 'Design Patterns' };
  const buttons = Array.from(host.querySelectorAll<HTMLAnchorElement>('.lesson-actions a'));
  const configure = (button: HTMLAnchorElement, direction: 'Previous' | 'Next', lesson: PatternLessonLink): void => {
    button.innerHTML = `${direction === 'Previous' ? '<i class="bi bi-arrow-left"></i> Previous' : 'Next <i class="bi bi-arrow-right"></i>'}<strong>${lesson.label}</strong>`;
    button.href = lesson.route;
    button.onclick = (event) => { event.preventDefault(); void router.navigateByUrl(lesson.route); };
  };
  if (buttons[0]) configure(buttons[0], 'Previous', previous);
  if (buttons[1]) configure(buttons[1], 'Next', next);
}
