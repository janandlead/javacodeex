import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type SitePage = {
  label: string;
  title: string;
  intro: string;
  sections: { heading: string; paragraphs?: string[]; items?: string[] }[];
};

const pages: Record<string, SitePage> = {
  about: {
    label: 'About Java Codeex', title: 'Learn. Build. Grow.',
    intro: 'Java Codeex is a practical learning platform for developers who want clear explanations, useful code examples, and guided paths through modern technology.',
    sections: [
      { heading: 'What we publish', paragraphs: ['We publish tutorials and learning resources covering Java, Spring Boot, Hibernate, databases, design patterns, interview preparation, and related technologies.', 'Our goal is to explain concepts in plain language and connect them to code that developers can understand, test, and adapt to their own projects.'] },
      { heading: 'Our approach', items: ['Start with the concept and the problem it solves.', 'Use focused examples that can be adapted to real applications.', 'Call out common mistakes, trade-offs, and production considerations.', 'Review and update content as tools and recommended practices change.'] },
      { heading: 'A note about the content', paragraphs: ['Technology changes quickly. Always verify versions, security guidance, and configuration details against the official documentation for the tools you use.'] }
    ]
  },
  author: {
    label: 'Author and instructor', title: 'Meet the Java Codeex author',
    intro: 'Java Codeex is maintained by a software-development educator focused on making Java and backend engineering easier to learn.',
    sections: [
      { heading: 'Areas of expertise', items: ['Core Java and object-oriented programming', 'Spring Boot and REST API development', 'Hibernate, JPA, and database integration', 'Design patterns and interview preparation'] },
      { heading: 'How tutorials are prepared', paragraphs: ['Tutorials are organized around a practical learning outcome. Examples are written to make the important idea visible, explain why a solution works, and identify where it should be adapted for a real project.', 'If you find an error, an outdated example, or a topic that needs clarification, please contact us so it can be reviewed.'] },
      { heading: 'Contact the author', paragraphs: ['For corrections, suggestions, or collaboration enquiries, email contact@javacodeex.com.'] }
    ]
  },
  categories: {
    label: 'Tutorial categories', title: 'Explore Java Codeex tutorials',
    intro: 'Choose a learning path and move from fundamentals to practical development skills.',
    sections: [
      { heading: 'Java', paragraphs: ['Build a strong foundation with syntax, methods, arrays, strings, OOP, exceptions, collections, generics, multithreading, JDBC, and more.'] },
      { heading: 'Backend development', paragraphs: ['Learn Spring Boot, REST APIs, validation, security, testing, deployment, Hibernate, JPA, transactions, caching, and database integration.'] },
      { heading: 'Software design', paragraphs: ['Study creational, structural, and behavioral design patterns with Java examples and practical use cases.'] },
      { heading: 'Career preparation', paragraphs: ['Prepare for technical interviews with topic-based Java questions, explanations, and focused practice.'] }
    ]
  },
  contact: {
    label: 'Contact Java Codeex', title: 'We would like to hear from you',
    intro: 'Send questions, corrections, suggestions, or collaboration enquiries to the Java Codeex team.',
    sections: [
      { heading: 'Email', paragraphs: ['General enquiries: contact@javacodeex.com', 'Please include the relevant page URL when reporting a correction or technical issue.'] },
      { heading: 'Before you write', items: ['For code questions, include the error message and the smallest relevant example.', 'For content corrections, explain what is inaccurate and include a reliable reference when possible.', 'Do not send passwords, API keys, or other confidential information.'] }
    ]
  },
  privacy: {
    label: 'Privacy policy', title: 'Privacy Policy',
    intro: 'This policy explains how Java Codeex may collect and use information when you visit javacodeex.com. Last updated: July 26, 2026.',
    sections: [
      { heading: 'Information we may collect', paragraphs: ['If you contact us, we may receive your name, email address, message, and any information you choose to include. Our hosting provider may also process technical information such as IP address, browser type, device information, and request logs for security and reliability.'] },
      { heading: 'Cookies, analytics, and advertising', paragraphs: ['Java Codeex uses Google AdSense to display third-party advertisements. Google and its advertising partners may use cookies or similar identifiers to measure activity, deliver advertisements, limit repeated ads, or personalize advertising according to their own policies and applicable consent requirements. The AdSense publisher ID used by this site is ca-pub-8341518286626722.', 'You can control cookies through your browser settings. Where required, we will request consent before using non-essential cookies. Blocking some cookies may affect site features.'] },
      { heading: 'How information is used', items: ['To operate, secure, maintain, and improve the website.', 'To respond to enquiries and investigate reported errors.', 'To understand which tutorials are useful and improve navigation.', 'To comply with legal obligations and prevent abuse.'] },
      { heading: 'Third-party services and links', paragraphs: ['The website may link to documentation, tools, or other websites operated by third parties. Their privacy practices are controlled by their own policies. We are not responsible for external websites.'] },
      { heading: 'Data retention and your choices', paragraphs: ['We retain enquiry information only as long as reasonably necessary for communication, records, security, or legal obligations. You may request access, correction, or deletion of personal information you sent to us by emailing contact@javacodeex.com.'] },
      { heading: 'Changes and contact', paragraphs: ['We may update this policy when the website, services, or legal requirements change. Questions about this policy can be sent to contact@javacodeex.com.'] }
    ]
  },
  terms: {
    label: 'Terms and conditions', title: 'Terms and Conditions',
    intro: 'By using javacodeex.com, you agree to these terms. Last updated: July 26, 2026.',
    sections: [
      { heading: 'Educational use', paragraphs: ['Java Codeex provides tutorials and examples for educational purposes. You are responsible for testing code, checking dependencies and versions, and deciding whether an approach is suitable for your application.'] },
      { heading: 'Acceptable use', items: ['Use the website lawfully and respectfully.', 'Do not attempt to disrupt, scrape, overload, or gain unauthorized access to the website.', 'Do not use examples to create harmful, illegal, or abusive systems.'] },
      { heading: 'Intellectual property', paragraphs: ['Unless otherwise stated, Java Codeex text, branding, layout, and original graphics belong to Java Codeex. You may use tutorial concepts and examples for personal and commercial development, but do not republish substantial portions of the site as your own. Third-party names and materials remain the property of their respective owners.'] },
      { heading: 'Availability and external links', paragraphs: ['We may change, suspend, or remove content without notice. The website may contain links to third-party websites; those websites are outside our control and are governed by their own terms.'] },
      { heading: 'Contact', paragraphs: ['Questions about these terms can be sent to contact@javacodeex.com.'] }
    ]
  },
  disclaimer: {
    label: 'Disclaimer', title: 'Disclaimer',
    intro: 'The information on Java Codeex is provided in good faith for general educational purposes. Last updated: July 26, 2026.',
    sections: [
      { heading: 'No professional advice', paragraphs: ['Tutorials are not professional software, security, legal, financial, or compliance advice. Review important decisions with an appropriately qualified professional.'] },
      { heading: 'Accuracy and changes', paragraphs: ['We aim to keep examples accurate, but software versions, APIs, security recommendations, and service terms can change. We do not guarantee that every example is complete, current, error-free, or suitable for production.'] },
      { heading: 'Third-party products and advertising', paragraphs: ['References to products, services, tools, or external websites do not constitute an endorsement. If advertising or affiliate relationships are introduced, they may generate revenue for Java Codeex and will be disclosed where required.'] },
      { heading: 'Use at your own risk', paragraphs: ['Test code in a safe environment, protect credentials and personal data, and perform your own security and licensing review before deploying anything. Java Codeex is not liable for loss or damage resulting from reliance on website content to the extent permitted by applicable law.'] }
    ]
  }
};

@Component({
  selector: 'app-site-pages', standalone: true, imports: [RouterLink],
  template: `<article class="site-page container-xl"><p class="site-page-label">{{ page.label }}</p><h1>{{ page.title }}</h1><p class="site-page-intro">{{ page.intro }}</p><div class="site-page-content">@for (section of page.sections; track section.heading) {<section><h2>{{ section.heading }}</h2>@for (paragraph of section.paragraphs ?? []; track paragraph) {<p>{{ paragraph }}</p>}@if (section.items?.length) {<ul>@for (item of section.items; track item) {<li>{{ item }}</li>}</ul>}</section>}</div><nav class="site-page-actions" aria-label="Related pages"><a routerLink="/categories">Browse tutorial categories</a><a routerLink="/contact">Contact us</a></nav></article>`,
  styles: [`.site-page{padding:4rem 1rem 5rem}.site-page-label{margin-bottom:1rem;color:#0891b2;font-size:.85rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.site-page h1{max-width:52rem;margin-bottom:1rem;color:#1e3a8a;font-size:clamp(2.2rem,5vw,4rem)}.site-page-intro{max-width:52rem;color:#64748b;font-size:1.1rem;line-height:1.8}.site-page-content{max-width:52rem;margin-top:3rem}.site-page-content section{margin-bottom:2.5rem;padding:1.5rem;border:1px solid #dbeafe;border-radius:1rem;background:#fff;box-shadow:0 .5rem 1.25rem rgba(15,23,42,.04)}.site-page-content h2{margin-bottom:1rem;color:#1e3a8a;font-size:1.45rem}.site-page-content p{color:#475569;line-height:1.8}.site-page-content ul{margin-bottom:0;padding-left:1.3rem;color:#475569}.site-page-content li+li{margin-top:.55rem}.site-page-actions{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}.site-page-actions a{padding:.7rem 1rem;border:1px solid #bae6fd;border-radius:.65rem;color:#0e7490;background:#ecfeff;font-weight:700;text-decoration:none}.site-page-actions a:hover{border-color:#06b6d4;background:#cffafe}`]
})
export class SitePagesComponent {
  private readonly route = inject(ActivatedRoute);
  readonly page: SitePage = pages[this.route.snapshot.data['sitePage'] as string] ?? pages['about'];
}
