import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found', standalone: true, imports: [RouterLink],
  template: `<section class="container-xl text-center not-found" data-page-status="404"><p class="display-1 fw-bold text-primary">404</p><h1>Page not found</h1><p class="text-muted">The page you requested does not exist.</p><a class="btn btn-primary" routerLink="/">Return home</a></section>`,
  styles: [`.not-found{padding:7rem 1rem}`]
})
export class NotFoundComponent {}
