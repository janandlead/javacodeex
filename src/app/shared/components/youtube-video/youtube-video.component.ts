import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

@Component({
  selector: 'app-youtube-video',
  standalone: true,
  template: `<section class="youtube-video" aria-labelledby="youtube-video-title"><h2 id="youtube-video-title">{{ title }}</h2><div class="youtube-frame"><iframe [src]="embedUrl" [title]="title" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><a class="youtube-fallback" [href]="videoUrl" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></section>`,
  styles: [`.youtube-video{margin:1rem 0 2rem;padding:1rem 1.25rem;border:1px solid #dbeafe;border-left:4px solid #06b6d4;border-radius:.75rem;background:#eff6ff}.youtube-video h2{margin:0 0 1rem;color:#1e3a8a;font-size:1.35rem}.youtube-frame{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:.5rem;background:#0f172a}.youtube-frame iframe{width:100%;height:100%;border:0}.youtube-fallback{display:inline-block;margin-top:.85rem;color:#1d4ed8;font-weight:600}`]
})
export class YoutubeVideoComponent implements OnChanges {
  @Input({ required: true }) videoUrl = '';
  @Input() title = 'Spring Boot 2 to Spring Boot 3 Migration Tutorial';
  embedUrl: SafeResourceUrl = '';
  private readonly sanitizer = inject(DomSanitizer);

  ngOnChanges(_changes: SimpleChanges): void {
    const videoId = this.extractVideoId(this.videoUrl);
    const url = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : 'about:blank';
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private extractVideoId(value: string): string {
    try {
      const url = new URL(value);
      if (url.hostname === 'youtu.be') return this.cleanId(url.pathname.slice(1));
      if (url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com' || url.hostname === 'm.youtube.com') {
        if (url.pathname === '/watch') return this.cleanId(url.searchParams.get('v') ?? '');
        if (url.pathname.startsWith('/embed/')) return this.cleanId(url.pathname.slice('/embed/'.length));
        if (url.pathname.startsWith('/shorts/')) return this.cleanId(url.pathname.slice('/shorts/'.length));
      }
    } catch {
      return '';
    }
    return '';
  }

  private cleanId(value: string): string {
    return /^[A-Za-z0-9_-]{11}$/.test(value) ? value : '';
  }
}
