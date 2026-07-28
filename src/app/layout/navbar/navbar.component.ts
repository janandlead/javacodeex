import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { MAIN_NAVIGATION } from '../../core/constants/navigation.config';
import { NavigationItem } from '../../core/models/navigation.model';

@Component({
  selector: 'app-navbar', standalone: true, imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html', styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly navigationItems = MAIN_NAVIGATION;
  menuOpen = false;
  openDropdown: string | null = null;
  closedDropdown: string | null = null;

  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.menuOpen = false;
      this.openDropdown = null;
      if (typeof window !== 'undefined' && !event.urlAfterRedirects.includes('#')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  toggleDropdown(label: string): void {
    this.closedDropdown = null;
    this.openDropdown = this.openDropdown === label ? null : label;
  }
  closeDropdown(label: string): void { this.openDropdown = null; this.closedDropdown = label; }
  resetDropdown(label: string): void {
    if (this.closedDropdown === label) this.closedDropdown = null;
  }
  hasChildren(item: NavigationItem): boolean { return !!item.children?.length; }
  normalizeRoute(route?: string): string | undefined {
    if (route === '/python/tutorial') return '/python-tutorial';
    return route?.startsWith('/python/') ? `/${route.slice('/python/'.length)}` : route;
  }
  formatNavigationLabel(label: string): string {
    return {
      'Python Variable & Data Type': 'Python Variables and Data Types',
      'Python If else': 'Python if-else',
      'Python Boolean': 'Python Booleans',
      'Python OOPs': 'Python OOP',
      'Python OOPs Concepts': 'Python OOP Concepts',
      'def Function in Python': 'Python Function Definition',
      'Python Collection Module': 'Python `collections` Module',
      'Python Math Module': 'Python `math` Module',
      'Python OS Module': 'Python `os` Module',
      'Python Random Module': 'Python `random` Module',
      'Python Statistics Module': 'Python `statistics` Module',
      'Python Sys Module': 'Python `sys` Module',
      'Python Read CSV File': 'Read CSV Files in Python',
      'Python Write CSV File': 'Write CSV Files in Python',
      'Read Excel File': 'Read Excel Files in Python',
      'Write Excel File': 'Write Excel Files in Python',
      'Python JSON': 'JSON in Python',
      'Context Manager in Python': 'Python Context Managers'
    }[label] ?? label;
  }
}
