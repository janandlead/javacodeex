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
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
      this.openDropdown = null;
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
}
