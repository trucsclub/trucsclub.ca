import fs from 'fs';
import xml2js from 'xml2js';

async function removeBrokenUrls(sitemapPath, outputPath) {
    try {
        // Read the sitemap file
        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        
        // Parse XML
        const parser = new xml2js.Parser();
        const parsed = await parser.parseStringPromise(sitemapContent);
        
        // Filter out URLs containing "404"
        if (parsed.urlset && parsed.urlset.url) {
            parsed.urlset.url = parsed.urlset.url.filter(
                item => !item.loc[0].includes('404')
            );
        }
        
        // Convert back to XML
        const builder = new xml2js.Builder();
        const cleanedXml = builder.buildObject(parsed);
        
        // Write to output file
        fs.writeFileSync(outputPath, cleanedXml, 'utf8');
        console.log(`Removed URLs with "404". Output saved to ${outputPath}`);
    } catch (error) {
        console.error('Error processing sitemap:', error);
    }
}

// Usage
removeBrokenUrls('.svelte-kit/cloudflare/sitemap.xml', '.svelte-kit/cloudflare/sitemap.xml');