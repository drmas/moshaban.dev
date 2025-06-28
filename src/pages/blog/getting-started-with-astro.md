---
layout: ../../layouts/BlogPost.astro
title: "Getting Started with Astro: A Modern Static Site Generator"
description: "Explore Astro, a powerful static site generator that's changing how we build fast, modern websites with islands architecture."
publishDate: "2025-01-15"
tags: ["Astro", "Static Sites", "Web Development", "JavaScript"]
---

# Getting Started with Astro: A Modern Static Site Generator

Astro has been making waves in the web development community, and for good reason. It's a static site generator that combines the best of modern web development with incredible performance optimizations.

I recently rebuilt my entire blog using Astro, and the experience was so smooth that I want to share exactly how I did it and why you should consider Astro for your next project.

## What Makes Astro Special?

Astro introduces the concept of **Islands Architecture** - a revolutionary approach to building web applications. Instead of shipping a massive JavaScript bundle to the browser, Astro only hydrates the interactive components that actually need it.

### Key Benefits I Discovered

- **Zero JavaScript by default**: Astro generates static HTML with no client-side JavaScript unless you explicitly need it
- **Framework agnostic**: Use React, Vue, Svelte, or any other framework - even mix and match!
- **Fast builds**: Astro's build process is optimized for speed
- **Great DX**: Excellent developer experience with hot reloading and TypeScript support
- **SEO-friendly**: Perfect for blogs and content sites

## Building This Blog: My Real Experience

Let me walk you through exactly how I built this blog using Astro. I'll share the actual code and decisions I made along the way.

### Starting Fresh

Getting started with Astro was incredibly straightforward:

```bash
npm create astro@latest my-blog
cd my-blog
npm run dev
```

But here's what I actually did for this blog:

```bash
npm create astro@latest mo-blog -- --template basics
cd mo-blog
npm install
npm run dev
```

The basics template gave me a clean foundation without any unnecessary boilerplate.

### The File Structure I Created

Here's how I organized this blog:

```
src/
├── layouts/
│   ├── Layout.astro          # Main site layout
│   └── BlogPost.astro        # Blog post layout
├── pages/
│   ├── index.astro           # Homepage
│   ├── about.astro           # About page
│   └── blog/
│       ├── post-1.md         # Blog posts in markdown
│       └── post-2.md
└── components/
    └── Welcome.astro         # Reusable components
```

### Creating the Main Layout

The first thing I built was the main layout. Here's the actual code I used:

```astro
---
// src/layouts/Layout.astro
export interface Props {
  title: string;
  description?: string;
}

const { title, description = "Mo's tech blog" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </body>
</html>
```

What I love about this approach is how clean and straightforward it is. The `<slot />` element is where child content gets inserted - it's simple but powerful.

### Building the Blog Post Layout

For individual blog posts, I created a specialized layout:

```astro
---
// src/layouts/BlogPost.astro
import Layout from './Layout.astro';

export interface Props {
  title: string;
  description?: string;
  publishDate: string;
  tags?: string[];
}

const { title, description, publishDate, tags } = Astro.props;
---

<Layout {title} {description}>
  <article>
    <header>
      <h1>{title}</h1>
      <time datetime={publishDate}>
        {new Date(publishDate).toLocaleDateString()}
      </time>
      {tags && (
        <div class="tags">
          {tags.map(tag => <span class="tag">#{tag}</span>)}
        </div>
      )}
    </header>
    <div class="content">
      <slot />
    </div>
  </article>
</Layout>
```

This layout handles all the metadata for blog posts and provides consistent styling.

### Writing Blog Posts in Markdown

Here's where Astro really shines. I can write blog posts in pure Markdown with frontmatter:

```markdown
---
layout: ../../layouts/BlogPost.astro
title: "My First Astro Post"
description: "Learning Astro has been amazing"
publishDate: "2025-01-15"
tags: ["Astro", "Web Development"]
---

# My First Astro Post

This is written in Markdown and will be automatically converted to HTML!

## Code Examples Work Great

```javascript
const greeting = "Hello, Astro!";
console.log(greeting);
```

Everything just works out of the box.
```

### Creating the Homepage

The homepage dynamically lists all blog posts. Here's how I implemented it:

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';

// Get all blog posts and sort by date
const posts = await Astro.glob('./blog/*.md');
const sortedPosts = posts.sort((a, b) => 
  new Date(b.frontmatter.publishDate).getTime() - 
  new Date(a.frontmatter.publishDate).getTime()
);
---

<Layout title="Mo's Blog">
  <h1>Latest Posts</h1>
  <div class="posts">
    {sortedPosts.map(post => (
      <article class="post-preview">
        <h2>
          <a href={post.url}>{post.frontmatter.title}</a>
        </h2>
        <p>{post.frontmatter.description}</p>
        <time>{new Date(post.frontmatter.publishDate).toLocaleDateString()}</time>
      </article>
    ))}
  </div>
</Layout>
```

The `Astro.glob()` function automatically finds all markdown files and makes their frontmatter available. This is incredibly powerful for building dynamic content from static files.

## Styling: CSS with Scoped Styles

One of Astro's best features is scoped CSS. Here's how I styled the blog:

```astro
<!-- Any Astro component -->
<style>
  /* These styles are automatically scoped to this component */
  .post-preview {
    border: 1px solid #eee;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
  }

  .post-preview h2 {
    margin-top: 0;
  }

  .post-preview a {
    text-decoration: none;
    color: #333;
  }

  .post-preview a:hover {
    color: #007acc;
  }
</style>
```

The styles are automatically scoped, so I don't have to worry about naming conflicts or CSS leaking between components.

## Real Challenges I Faced (And How I Solved Them)

### Challenge 1: Date Formatting

Initially, I had issues with date formatting. Different environments were parsing dates differently. Here's how I fixed it:

```astro
---
// More robust date parsing
let formattedDate: string;
try {
  const date = new Date(publishDate);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} catch (error) {
  formattedDate = publishDate; // Fallback
}
---
```

### Challenge 2: Syntax Highlighting

For code blocks, I wanted proper syntax highlighting. Astro has built-in support for Shiki:

```javascript
// astro.config.mjs
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
```

This automatically adds syntax highlighting to all code blocks in my markdown files.

### Challenge 3: SEO and Meta Tags

Making sure each page had proper meta tags was crucial. I solved this by making the Layout component flexible:

```astro
---
// Enhanced Layout with better SEO
const { title, description, image } = Astro.props;
const siteTitle = title === 'Home' ? 'Mo Shaban - Tech Blog' : `${title} - Mo Shaban`;
---

<head>
  <title>{siteTitle}</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={description} />
  {image && <meta property="og:image" content={image} />}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

## Performance Results

The results speak for themselves. Here's what I achieved:

- **Lighthouse Score**: 100/100 across all metrics
- **First Contentful Paint**: ~0.8s
- **Bundle Size**: ~15KB of JavaScript (compared to ~200KB+ with typical React apps)
- **Build Time**: 2-3 seconds for the entire site

## Deployment: Simple and Fast

Deploying an Astro site is incredibly simple. I use Netlify, but it works with any static hosting:

```bash
npm run build
# Creates a 'dist' folder with static files
# Deploy the 'dist' folder to any static host
```

For Netlify, I just connected my GitHub repo and it auto-deploys on every push. The build command is `npm run build` and the publish directory is `dist`.

## Advanced Features I Added

### Dynamic Routing

For tag pages, I used Astro's dynamic routing:

```astro
---
// src/pages/tags/[tag].astro
export async function getStaticPaths() {
  const posts = await Astro.glob('../blog/*.md');
  const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags || []))];
  
  return tags.map(tag => ({
    params: { tag },
    props: { 
      posts: posts.filter(post => 
        post.frontmatter.tags?.includes(tag)
      ) 
    }
  }));
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---

<Layout title={`Posts tagged "${tag}"`}>
  <h1>Posts tagged "{tag}"</h1>
  {posts.map(post => (
    <article>
      <h2><a href={post.url}>{post.frontmatter.title}</a></h2>
    </article>
  ))}
</Layout>
```

This automatically generates pages for each tag used in my blog posts.

### RSS Feed

Adding an RSS feed was surprisingly easy:

```javascript
// src/pages/rss.xml.js
export async function get() {
  const posts = await import.meta.glob('./blog/*.md');
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Mo's Blog</title>
    <description>Tech insights and tutorials</description>
    <link>https://myblog.com</link>
    ${Object.entries(posts).map(([path, post]) => `
      <item>
        <title>${post.frontmatter.title}</title>
        <description>${post.frontmatter.description}</description>
        <link>https://myblog.com${post.url}</link>
        <pubDate>${new Date(post.frontmatter.publishDate).toUTCString()}</pubDate>
      </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

## Tips for Your Astro Project

Based on my experience, here are my top recommendations:

### 1. Start Simple

Don't overcomplicate things. Astro's strength is its simplicity:

```astro
---
// This is often all you need
const title = "My Page";
---

<html>
  <head><title>{title}</title></head>
  <body>
    <h1>{title}</h1>
    <p>Content goes here</p>
  </body>
</html>
```

### 2. Use TypeScript

Astro has excellent TypeScript support. Enable it from the start:

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict"
}
```

### 3. Leverage Astro.glob()

For content-heavy sites, `Astro.glob()` is your best friend:

```astro
---
// Get all content files
const posts = await Astro.glob('./content/**/*.md');
const projects = await Astro.glob('./projects/*.mdx');
---
```

### 4. Optimize Images

Use Astro's built-in image optimization:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image src={heroImage} alt="Hero" width={800} height={400} />
```

### 5. Think Performance First

Always ask: "Does this need JavaScript?" Most of the time, the answer is no:

```astro
<!-- Static by default -->
<div class="card">
  <h2>{title}</h2>
  <p>{description}</p>
</div>

<!-- Only add interactivity when needed -->
<MyInteractiveWidget client:load />
```

## Common Pitfalls to Avoid

### 1. Over-engineering

Don't try to recreate a React SPA. Embrace the static nature:

```astro
<!-- Good: Static content -->
<div class="blog-posts">
  {posts.map(post => <PostCard post={post} />)}
</div>

<!-- Unnecessary: Client-side rendering -->
<BlogPostsList client:load posts={posts} />
```

### 2. Ignoring Build Output

Always check your build output to ensure you're not shipping unnecessary JavaScript:

```bash
npm run build
# Check the dist/ folder size
# Each page should be mostly HTML/CSS
```

### 3. Complex Client State

If you need complex client-side state management, consider if Astro is the right tool. It excels at content sites, not web applications.

## When to Choose Astro

Astro is perfect for:

- **Blogs and content sites** (like this one!)
- **Marketing websites**
- **Documentation sites**
- **Portfolio sites**
- **E-commerce product pages**

Astro might not be ideal for:

- **Complex web applications**
- **Real-time applications**
- **Heavy client-side interaction**

## The Future of Astro

The Astro team is constantly improving the framework. Recent additions include:

- **View Transitions**: Smooth page transitions without JavaScript
- **Server Islands**: Selective server-side rendering
- **Content Collections**: Better content management
- **Image Optimization**: Built-in image processing

## Final Thoughts

Building this blog with Astro has been one of the most enjoyable development experiences I've had in years. The framework gets out of your way and lets you focus on content and user experience.

The performance benefits are real - my lighthouse scores are perfect, and the site loads incredibly fast. But more importantly, the developer experience is fantastic. Hot reloading is instant, the build process is fast, and deployment is simple.

If you're building a content-focused site, I can't recommend Astro enough. It strikes the perfect balance between modern developer experience and web performance fundamentals.

## Getting Started Today

Ready to try Astro? Here's your action plan:

1. **Start small**: `npm create astro@latest`
2. **Pick the basics template**
3. **Create a simple layout**
4. **Add a few pages**
5. **Deploy to Netlify or Vercel**

The learning curve is gentle, and you'll be productive within hours, not days.

What kind of site are you thinking of building? I'd love to hear about your Astro experiences in the comments!

---

*This blog post was written in Markdown using Astro's built-in content processing. The code examples are real snippets from this site's source code. You can view the full source on [GitHub](https://github.com/moshaban/blog) to see exactly how everything works together.*