export async function GET() {
  const posts = await import.meta.glob('./blog/*.md');
  const siteUrl = 'https://moshaban.dev';
  
  // Get all blog posts
  const blogUrls = await Promise.all(
    Object.keys(posts).map(async (path) => {
      const post = await posts[path]();
      const url = path.replace('./blog/', '/blog/').replace('.md', '');
      return {
        url: `${siteUrl}${url}`,
        lastmod: new Date(post.frontmatter.publishDate).toISOString(),
        priority: '0.8',
        changefreq: 'monthly'
      };
    })
  );
  
  // Get all tags
  const allTags = new Set();
  await Promise.all(
    Object.values(posts).map(async (module) => {
      const post = await module();
      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach(tag => {
          allTags.add(tag.toLowerCase().replace(/\s+/g, '-'));
        });
      }
    })
  );
  
  const tagUrls = Array.from(allTags).map(tag => ({
    url: `${siteUrl}/tags/${tag}`,
    lastmod: new Date().toISOString(),
    priority: '0.6',
    changefreq: 'weekly'
  }));
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastmod: new Date().toISOString(),
      priority: '1.0',
      changefreq: 'daily'
    },
    {
      url: `${siteUrl}/about`,
      lastmod: new Date().toISOString(),
      priority: '0.9',
      changefreq: 'monthly'
    }
  ];
  
  const allUrls = [...staticPages, ...blogUrls, ...tagUrls];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, priority, changefreq }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=3600, s-maxage=3600'
    }
  });
}