import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { TutorialPage } from '../../core/models/tutorial.model';

@Component({
  selector: 'app-tutorial-page', standalone: true,
  imports: [RouterLink, BreadcrumbComponent, PageHeaderComponent, CodeBlockComponent],
  templateUrl: './tutorial-page.component.html', styleUrl: './tutorial-page.component.scss'
})
export class TutorialPageComponent { @Input({ required: true }) page!: TutorialPage; }

