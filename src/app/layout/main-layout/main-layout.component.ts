import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HibernatePagerComponent } from '../../shared/components/hibernate-pager/hibernate-pager.component';
import { MAIN_NAVIGATION } from '../../core/constants/navigation.config';
import { INTERVIEW_TOPICS } from '../../features/interview-questions/data/interview-question.data';
import { JAVA_PAGES } from '../../core/constants/tutorial-content';
import { NavigationItem } from '../../core/models/navigation.model';
import { PYTHON_TOPICS } from '../../core/constants/python-topics';

const javaTopicPaths = new Set(Object.keys(JAVA_PAGES).map((slug) => `/${slug === 'introduction-to-java' || slug.startsWith('java-') ? slug : `java-${slug}`}`));
const pythonTopicPaths = new Set(PYTHON_TOPICS.map((topic) => topic.slug === 'tutorial' ? '/python-tutorial' : `/${topic.slug}`));

@Component({
  selector: 'app-main-layout', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, NavbarComponent, FooterComponent, HibernatePagerComponent],
  template: `<a class="skip-link" href="#main-content">Skip to main content</a><app-header /><app-navbar /><main id="main-content" class="main-content"><div class="main-layout" [class.course-layout]="isCourseSidebarRoute" [class.interview-layout]="isInterviewRoute">
    @if (isCourseSidebarRoute) {
      <button class="mobile-course-toggle" type="button" [attr.aria-expanded]="courseMenuOpen" (click)="courseMenuOpen = !courseMenuOpen"><i [class]="sidebarItem?.icon ?? 'bi bi-journal-code'" aria-hidden="true"></i><span>{{ sidebarItem?.label }} Lessons</span><i class="bi bi-chevron-down" aria-hidden="true"></i></button>
      <aside class="course-sidebar" [class.mobile-open]="courseMenuOpen" [attr.aria-label]="sidebarItem?.label + ' lessons'"><div class="sidebar-heading"><i [class]="sidebarItem?.icon ?? 'bi bi-journal-code'" aria-hidden="true"></i><span>{{ sidebarItem?.label }} tutorial</span></div><nav [attr.aria-label]="sidebarItem?.label + ' lessons'">@for (item of sidebarLessons; track $index) { @if (item.heading) { <div class="sidebar-section-heading">{{ item.label }}</div> } @else { <a [routerLink]="normalizeRoute(item.route)" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"><span>{{ item.label }}</span></a> } }</nav></aside>
    }
    @if (isInterviewRoute) {<aside class="interview-sidebar" aria-label="Interview question topics"><div class="sidebar-heading"><i class="bi bi-patch-question" aria-hidden="true"></i><span>Interview topics</span></div><nav aria-label="Interview question topics">@for (topic of interviewTopLevelTopics; track topic.id) {<a class="interview-topic-link" [class.active]="selectedInterviewTopicId === topic.id" [routerLink]="'/java-technical-interview-questions'" [queryParams]="{ topic: topic.id }"><i [class]="topic.icon" aria-hidden="true"></i><span><strong>{{ topic.name }}</strong><small>{{ topic.questionCount }} questions</small></span></a>@for (child of interviewChildTopics(topic.id); track child.id) {<a class="interview-topic-link child" [class.active]="selectedInterviewTopicId === child.id" [routerLink]="'/java-technical-interview-questions'" [queryParams]="{ topic: child.id }"><i [class]="child.icon" aria-hidden="true"></i><span><strong>{{ child.name }}</strong><small>{{ child.questionCount }} questions</small></span></a>}}</nav></aside>}
    <div class="route-content"><router-outlet /></div></div><app-hibernate-pager /></main><app-footer />`,
  styles: [`
    .main-content{min-height:60vh}.main-layout{min-height:60vh}.course-layout,.interview-layout{display:grid;grid-template-columns:minmax(14rem,18rem) minmax(0,1fr);gap:1.5rem;align-items:start;max-width:90rem;margin:0 auto;padding:1.5rem 1rem 0}.route-content{min-width:0}.mobile-course-toggle{display:none}.course-sidebar,.interview-sidebar{position:sticky;top:1rem;max-height:calc(100vh - 2rem);overflow:auto;padding:.9rem;border:1px solid #dbeafe;border-radius:1rem;background:#fff;box-shadow:0 .5rem 1.25rem rgba(15,23,42,.06)}.sidebar-heading{display:flex;align-items:center;gap:.55rem;margin:.15rem .4rem .8rem;color:#1e3a8a;font-size:.9rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase}.sidebar-heading i{color:#0891b2;font-size:1.1rem}.course-sidebar nav,.interview-sidebar nav{display:grid;gap:.2rem}.course-sidebar a,.interview-topic-link{display:flex;align-items:flex-start;padding:.55rem .45rem;border-radius:.55rem;color:#475569;font-size:.84rem;line-height:1.35;text-decoration:none}.course-sidebar a:hover,.course-sidebar a:focus-visible,.interview-topic-link:hover,.interview-topic-link:focus-visible{color:#0e7490;background:#ecfeff}.course-sidebar a.active,.interview-topic-link.active{color:#1e3a8a;background:#e0f2fe;font-weight:700;box-shadow:inset 3px 0 #06b6d4}.sidebar-section-heading{margin:.9rem .4rem .25rem;padding-top:.7rem;border-top:1px solid #dbeafe;color:#0e7490;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.interview-topic-link{gap:.55rem}.interview-topic-link>i{width:1.35rem;flex:0 0 1.35rem;margin-top:.1rem;text-align:center}.interview-topic-link span{display:flex;min-width:0;flex:1;flex-direction:column;gap:.1rem}.interview-topic-link strong{font-size:.82rem}.interview-topic-link small{color:#64748b;font-size:.7rem}.interview-topic-link.child{margin-left:.7rem;padding-left:.55rem;border-left:2px solid #dbeafe}.interview-topic-link.child strong{font-size:.76rem}@media(max-width:991.98px){.course-layout,.interview-layout{display:block;padding-top:1rem}.mobile-course-toggle{display:flex;align-items:center;gap:.6rem;width:100%;margin:0 auto 1rem;padding:.8rem 1rem;border:1px solid #bae6fd;border-radius:.8rem;color:#1e3a8a;background:#fff;font-weight:800;text-align:left;box-shadow:0 .35rem .8rem rgba(15,23,42,.06)}.mobile-course-toggle i:last-child{margin-left:auto;color:#0891b2}.course-sidebar{display:none}.course-sidebar.mobile-open{display:block}.course-sidebar,.interview-sidebar{position:relative;top:auto;max-height:17rem;margin:0 auto 1rem}.course-sidebar nav,.interview-sidebar nav{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:.5rem}}@media(max-width:575.98px){.course-layout,.interview-layout{padding-left:0;padding-right:0}.course-sidebar,.interview-sidebar{border-radius:0;border-right:0;border-left:0}.course-sidebar nav,.interview-sidebar nav{grid-template-columns:1fr}}
    @media(max-width:991.98px){.mobile-course-toggle{display:none!important}.course-sidebar{display:block!important}}
  `]
})
export class MainLayoutComponent {
  readonly interviewTopLevelTopics = INTERVIEW_TOPICS.filter((topic) => !topic.parentId);
  readonly designPatternLessons: readonly NavigationItem[] = [
    ['Singleton', 'singleton'], ['Factory Method', 'factory-method'], ['Abstract Factory', 'abstract-factory'], ['Builder', 'builder'], ['Prototype', 'prototype'],
    ['Adapter', 'adapter'], ['Bridge', 'bridge'], ['Composite', 'composite'], ['Decorator', 'decorator'], ['Facade', 'facade'], ['Flyweight', 'flyweight'], ['Proxy', 'proxy'],
    ['Chain of Responsibility', 'chain-of-responsibility'], ['Command', 'command'], ['Interpreter', 'interpreter'], ['Iterator', 'iterator'], ['Mediator', 'mediator'], ['Memento', 'memento'], ['Observer', 'observer'], ['State', 'state'], ['Strategy', 'strategy'], ['Template Method', 'template-method'], ['Visitor', 'visitor']
  ].map(([label, slug]) => ({ label, route: `/design-patterns/${slug}` }));
  courseMenuOpen = false;

  constructor(private readonly router: Router) {}

  get sidebarItem() {
    const path = this.router.url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    return MAIN_NAVIGATION.find((item) => item.label === 'Java' && (path === '/java' || path === '/java-tutorial-overview' || path.startsWith('/java/') || javaTopicPaths.has(path)) || item.label === 'Spring Boot' && !this.isWorkshopRoute(path) && (path === '/project-structure' || this.matchesCoursePath(path, '/spring-boot')) || item.label === 'Python' && (path === '/python-tutorial' || path === '/python' || pythonTopicPaths.has(path) || this.matchesCoursePath(path, '/python')) || item.label === 'Hibernate' && this.matchesCoursePath(path, '/hibernate') || item.label === 'PostgreSQL' && this.matchesCoursePath(path, '/postgresql') || item.label === 'MySQL' && this.matchesCoursePath(path, '/mysql') || item.label === 'Design Patterns' && this.matchesCoursePath(path, '/design-patterns'));
  }

  get sidebarLessons() {
    const lessons = this.sidebarItem?.label === 'Design Patterns' ? this.designPatternLessons : this.sidebarItem?.children ?? [];
    return lessons.map((item) => ({ ...item, label: this.formatNavigationLabel(item.label) }));
  }
  normalizeRoute(route?: string): string | undefined {
    if (route === '/python/tutorial') return '/python-tutorial';
    return route?.startsWith('/python/') ? `/${route.slice('/python/'.length)}` : route;
  }
  formatNavigationLabel(label: string): string {
    return {
      'Python Variable & Data Type': 'Python Variables and Data Types', 'Python If else': 'Python if-else', 'Python Boolean': 'Python Booleans',
      'Python OOPs': 'Python OOP', 'Python OOPs Concepts': 'Python OOP Concepts', 'def Function in Python': 'Python Function Definition',
      'Python Collection Module': 'Python `collections` Module', 'Python Math Module': 'Python `math` Module', 'Python OS Module': 'Python `os` Module',
      'Python Random Module': 'Python `random` Module', 'Python Statistics Module': 'Python `statistics` Module', 'Python Sys Module': 'Python `sys` Module',
      'Python Read CSV File': 'Read CSV Files in Python', 'Python Write CSV File': 'Write CSV Files in Python', 'Read Excel File': 'Read Excel Files in Python',
      'Write Excel File': 'Write Excel Files in Python', 'Python JSON': 'JSON in Python', 'Context Manager in Python': 'Python Context Managers'
    }[label] ?? label;
  }

  get isCourseSidebarRoute(): boolean { return !!this.sidebarItem; }
  get isInterviewRoute(): boolean { const path = this.router.url.split(/[?#]/)[0]; return path === '/java-technical-interview-questions' || path.startsWith('/interview-questions'); }
  private isWorkshopRoute(path: string): boolean { return path === '/workshops' || path === '/spring-boot-ai-workshop'; }
  get selectedInterviewTopicId(): string { return new URLSearchParams(this.router.url.split('?')[1]?.split('#')[0] ?? '').get('topic') ?? 'java'; }
  interviewChildTopics(topicId: string) { return INTERVIEW_TOPICS.filter((topic) => topic.parentId === topicId); }
  private matchesCoursePath(path: string, prefix: string): boolean { return path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(`${prefix}-`); }
}
