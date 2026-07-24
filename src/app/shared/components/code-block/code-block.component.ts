import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-block', standalone: true,
  template: `<div class="code-wrap"><div class="code-label">{{ language }}</div><pre><code>{{ code }}</code></pre></div>`,
  styles: [`.code-wrap{margin:1.5rem 0;overflow:hidden;border-radius:.75rem;background:#0f172a;box-shadow:0 .5rem 1rem rgba(15,23,42,.12)}.code-label{padding:.5rem 1rem;background:#1e293b;color:#93c5fd;font-size:.75rem;font-weight:700;text-transform:uppercase}pre{margin:0;padding:1rem;overflow:auto;color:#e2e8f0;line-height:1.6}`]
})
export class CodeBlockComponent { @Input() language = 'text'; @Input() code = ''; }

