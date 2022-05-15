import { promises as fs } from 'fs';

const baseUrl = 'https://felixgrohs.com';

try {
   // Load all pages active from next's page manifest
   const pagesManifest = JSON.parse(await fs.readFile('.next/server/pages-manifest.json', 'utf8'));

   // Exclude specific pages like 404 & api endpoints
   const pages = Object.keys(pagesManifest).filter(slug => {
      return !slug.includes('_') &&
         !slug.includes('api') &&
         !slug.includes('404');
   }).map(slug => {
      if (slug.endsWith('/')) return slug;
      return `${slug}/`;
   });

   // Generate sitemap using xml: https://sitemaps.org/protocol.html
   let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
   for (const page of pages) {
      xml += `\n\t<url>\n\t\t<loc>${baseUrl}${page}</loc>\n\t\t<priority>0.5</priority>\n\t</url>`;
   }
   xml += `\n</urlset>`;

   // Write contents to sitemap.xml (overwrite if exists)
   await fs.writeFile('public/sitemap.xml', xml);
   console.log('Sitemap generated successfully.');

} catch (err) {
   console.warn('Could not generate Sitemap:');
   console.warn(err);
}
