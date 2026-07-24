import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout', standalone: true, imports: [RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent],
  template: `<app-header /><app-navbar /><main class="main-content"><router-outlet /></main><app-footer />`,
  styles: [`.main-content{min-height:60vh}`]
})
export class MainLayoutComponent {}
