export async function GET() {
  const posts = await import.meta.glob('./blog/*.md');
  const siteUrl = 'https://moshaban.dev';
  const siteName = 'Mo Shaban - Tech Blog';
  const siteDescription = "Tech insights, web development tutorials, and programming thoughts from Mo Shaban";
  
  // Process posts and sort by date
  const processedPosts = await Promise.all(
    Object.entries(posts).map(async ([path, module]) => {
      const post = await module();
      const url = path.replace('./blog/', '/blog/').replace('.md', '');
      return {
        ...post.frontmatter,
        url: `${siteUrl}${url}`,
        content: post.compiledContent ? await post.compiledContent() : ''
      };
    })
  );
  
  const sortedPosts = processedPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName}</title>
    <description>${siteDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@moshaban.dev (Mo Shaban)</managingEditor>
    <webMaster>hello@moshaban.dev (Mo Shaban)</webMaster>
    <image>
      <url>${siteUrl}/favicon.svg</url>
      <title>${siteName}</title>
      <link>${siteUrl}</link>
    </image>
    ${sortedPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ''}]]></description>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <author>hello@moshaban.dev (Mo Shaban)</author>
      ${post.tags ? post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('') : ''}
      <content:encoded><![CDATA[${post.content || post.description || ''}]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=3600, s-maxage=3600'
    }
  });
}