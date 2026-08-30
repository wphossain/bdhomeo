import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/auth/callback'],
    },
    sitemap: 'https://bdhomeo.com/sitemap.xml',
  };
}
