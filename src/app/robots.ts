import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://healthcare-ai-consultant.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        // Google AI/Bard
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        // OpenAI/ChatGPT
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        // Anthropic/Claude
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        // Anthropic Claude
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        // Perplexity
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        // Common Crawl (used by many AI models)
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
