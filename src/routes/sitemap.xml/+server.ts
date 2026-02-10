import clubs from '$lib/data/clubs.json';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async({url}) => {
	const domain = url.origin;

	const urls = [
    `${domain}/`,
    ...Object.keys(clubs).flatMap((slug) => [
      `${domain}/club/${slug}`,
      `${domain}/club/${slug}/members`
    ])
  ];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((loc) => `<url>
      <loc>${loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`).join('\n')}
  </urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
