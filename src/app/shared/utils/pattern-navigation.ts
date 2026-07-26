import { Router } from '@angular/router';

export interface PatternLessonLink { route: string; label: string; }

export function syncPatternNavigation(host: HTMLElement, router: Router, lessons: readonly PatternLessonLink[], currentRoute: string): void {
  const index = lessons.findIndex((lesson) => lesson.route === currentRoute);
  if (index < 0) return;
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const navigation = host.querySelector<HTMLElement>('.lesson-actions');
  if (!navigation) return;
  navigation.classList.remove('lesson-actions');
  navigation.classList.add('course-pager');
  if (!host.querySelector('.pager-heading')) {
    const heading = host.ownerDocument.createElement('p');
    heading.className = 'pager-heading';
    heading.textContent = 'Continue learning';
    navigation.before(heading);
  }
  const buttons = Array.from(navigation.querySelectorAll<HTMLAnchorElement>('a'));
  const configure = (button: HTMLAnchorElement, direction: 'Previous' | 'Next', lesson: PatternLessonLink | undefined): void => {
    button.className = `pager-link ${direction.toLowerCase()}`;
    if (!lesson) {
      button.classList.add('disabled');
      button.removeAttribute('href');
      button.setAttribute('aria-hidden', 'true');
      button.innerHTML = '';
      return;
    }
    button.removeAttribute('aria-hidden');
    button.innerHTML = `<span class="pager-direction">${direction === 'Previous' ? '<i class="bi bi-arrow-left"></i> Previous' : 'Next <i class="bi bi-arrow-right"></i>'}</span><strong>${lesson.label}</strong>`;
    button.href = lesson.route;
    button.onclick = (event) => { event.preventDefault(); void router.navigateByUrl(lesson.route); };
  };
  if (buttons[0]) configure(buttons[0], 'Previous', previous);
  if (buttons[1]) configure(buttons[1], 'Next', next);
}
