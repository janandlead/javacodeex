import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface WorkshopDetail {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
}

interface AgendaItem {
  readonly duration: string;
  readonly title: string;
  readonly topics: readonly string[];
}

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss'
})
export class WorkshopComponent {
  readonly registrationUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeOJNbzUk1yNIgQKScFT8eCC7sLrOofzmFz4EzD_7-vG_xxNg/viewform';

  scrollToAgenda(event: Event): void {
    event.preventDefault();
    document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  readonly details: readonly WorkshopDetail[] = [
    { icon: 'bi bi-calendar-event', label: 'Date', value: 'To be announced' },
    { icon: 'bi bi-clock', label: 'Duration', value: '2 hours' },
    { icon: 'bi bi-camera-video', label: 'Mode', value: 'Live on Google Meet' },
    { icon: 'bi bi-ticket-perforated', label: 'Cost', value: 'Free' },
    { icon: 'bi bi-bar-chart', label: 'Level', value: 'Beginner friendly' },
    { icon: 'bi bi-translate', label: 'Language', value: 'English' }
  ];

  readonly benefits = [
    ['bi bi-code-square', 'Hands-on coding', 'Follow along while we build a real API.'],
    ['bi bi-database-check', 'Real project', 'Work with CRUD, PostgreSQL, JPA, and clean layers.'],
    ['bi bi-stars', 'AI-assisted development', 'Use AI tools thoughtfully to write and improve code.'],
    ['bi bi-chat-dots', 'Live doubt solving', 'Ask questions and learn from practical explanations.'],
    ['bi bi-file-earmark-code', 'Take-home resources', 'Get source code, Postman collection, and slides.'],
    ['bi bi-map', 'Clear next steps', 'Leave with a practical Spring Boot learning roadmap.']
  ] as const;

  readonly agenda: readonly AgendaItem[] = [
    { duration: '10 min', title: 'Spring Boot and AI overview', topics: ['Spring vs Spring Boot', 'How AI supports Java developers'] },
    { duration: '15 min', title: 'Project setup', topics: ['Spring Initializr and Maven', 'Project structure and configuration'] },
    { duration: '30 min', title: 'Build the REST API', topics: ['Controller, service, and repository layers', 'GET, POST, PUT, and DELETE endpoints'] },
    { duration: '20 min', title: 'Connect PostgreSQL with JPA', topics: ['Entities and Spring Data JPA', 'Persist and retrieve employee data'] },
    { duration: '15 min', title: 'AI coding session', topics: ['Generate CRUD code and tests', 'Explain stack traces and fix bugs'] },
    { duration: '15 min', title: 'Test and review', topics: ['Postman, Swagger, and status codes', 'Q&A, resources, and roadmap'] }
  ];

  readonly faqs = [
    ['Is this workshop free?', 'Yes. The live workshop is free, but registration is required because seats may be limited.'],
    ['Who can attend?', 'Java learners, students, freshers, and developers who want a practical introduction to Spring Boot can attend.'],
    ['Do I need prior Spring Boot knowledge?', 'No. Basic Java knowledge is helpful, but the session is designed to be beginner friendly.'],
    ['Will source code be shared?', 'Yes. Registered attendees will receive the workshop resources after the session.'],
    ['Do I need to install anything?', 'Bring a laptop if you want to code along. Setup instructions for JDK, an IDE, PostgreSQL, and Postman will be shared before the session.']
  ] as const;
}
