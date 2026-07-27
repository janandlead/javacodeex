export interface SeoConfig {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl: string;
  readonly keywords?: readonly string[];
  readonly keyword?: string;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
  readonly robots?: string;
  readonly type?: 'website' | 'article';
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly primaryKeyword?: string;
  readonly articleSection?: string;
  readonly breadcrumbs?: readonly { name: string; url: string }[];
  readonly howTo?: {
    readonly name: string;
    readonly description: string;
    readonly steps: readonly { name: string; text: string }[];
  };
  readonly video?: {
    readonly name: string;
    readonly description: string;
    readonly thumbnailUrl: string;
    readonly embedUrl: string;
    readonly contentUrl?: string;
  };
}

export interface StructuredDataConfig {
  readonly faq?: readonly { question: string; answer: string }[];
  readonly breadcrumbs?: readonly { name: string; url: string }[];
}
