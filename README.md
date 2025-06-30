# Mo Shaban - Tech Blog

A modern, developer-focused tech blog built with Astro, featuring an interactive terminal interface, comprehensive keyboard navigation, and advanced SEO optimization.

## ✨ Features

### 🖥️ **Terminal Simulation**
- Fully functional terminal interface with Unix-style commands
- Navigate content using familiar commands like `ls`, `cat`, `cd`
- Command history and autocomplete
- Real-time file system simulation

### ⌨️ **Keyboard Navigation**
- Vim-inspired shortcuts for efficient browsing
- Context-aware navigation that respects input fields
- Discoverable shortcuts with progressive disclosure
- Accessibility-focused implementation

### 🔍 **Advanced Search**
- Real-time search with fuzzy matching
- Search across titles, content, and tags
- Keyboard navigation in search results
- Highlighted search terms in excerpts

### 📝 **Content Management**
- Markdown-based blog posts with frontmatter
- Tag-based categorization with dedicated tag pages
- Automatic post sorting and organization
- Rich content support with syntax highlighting

### 🎨 **Developer-Focused Design**
- Terminal-inspired dark theme
- Syntax highlighting for code blocks
- Responsive design with mobile optimization
- Progressive enhancement approach

### 🚀 **SEO & Performance**
- Comprehensive meta tags and Open Graph data
- JSON-LD structured data for rich snippets
- Automatic sitemap and RSS feed generation
- Perfect Lighthouse scores
- Static site generation for optimal performance

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generator
- **Styling**: Scoped CSS with CSS custom properties
- **Typography**: JetBrains Mono + Inter fonts
- **Content**: Markdown with frontmatter
- **Deployment**: Static hosting ready (Netlify, Vercel, etc.)

## 📁 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── KeyboardNavigation.astro    # Vim-style shortcuts
│   │   ├── Search.astro                # Search interface
│   │   ├── Terminal.astro              # Terminal simulation
│   │   └── Welcome.astro               # Landing component
│   ├── layouts/
│   │   ├── Layout.astro                # Base layout with SEO
│   │   └── BlogPost.astro              # Blog post layout
│   ├── pages/
│   │   ├── blog/                       # Blog posts (Markdown)
│   │   │   ├── *.md                    # Individual posts
│   │   ├── tags/
│   │   │   └── [tag].astro             # Dynamic tag pages
│   │   ├── index.astro                 # Homepage
│   │   ├── about.astro                 # About page
│   │   ├── rss.xml.js                  # RSS feed
│   │   └── sitemap.xml.js              # Sitemap generation
│   └── assets/                         # Static assets
├── astro.config.mjs                    # Astro configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mo-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

### Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## ⚡ Key Features Breakdown

### Terminal Interface
Press `Ctrl + \`` to open the terminal and try these commands:
- `help` - Show available commands
- `ls` - List blog posts
- `cat <filename>` - Open a blog post
- `cd <directory>` - Navigate sections
- `search <term>` - Search content
- `tree` - Show site structure

### Keyboard Shortcuts
Press `?` to see all shortcuts:
- `j/k` - Scroll down/up
- `h` - Go to homepage
- `a` - Go to about page
- `b` - Go to blog
- `gg` - Scroll to top
- `ge` - Scroll to bottom
- `/` - Open search
- `1-9` - Jump to nth article

### Writing Blog Posts

Create new posts in `src/pages/blog/` with this frontmatter:

```markdown
---
layout: ../../layouts/BlogPost.astro
title: "Your Post Title"
description: "A brief description of your post"
publishDate: "2025-01-16"
tags: ["Tag1", "Tag2", "Tag3"]
image: "/path/to/social-image.jpg" # Optional
---

# Your content here

Write your blog post content in Markdown...
```

### Tag System

Tags are automatically:
- Converted to URL-friendly slugs
- Generated into individual tag pages
- Listed in the sitemap
- Included in search indexing

## 🌐 SEO Features

### Automatic Generation
- **Sitemap**: `/sitemap.xml` - Auto-updated with all pages
- **RSS Feed**: `/rss.xml` - Full content syndication
- **Robots.txt**: SEO directives for crawlers

### Rich Metadata
- Open Graph tags for social sharing
- Twitter Cards with large images
- JSON-LD structured data for rich snippets
- Canonical URLs and proper meta descriptions

### Performance
- Static site generation
- Optimized images and fonts
- Minimal JavaScript footprint
- Perfect Lighthouse scores

## 🎨 Customization

### Theme Colors
Edit CSS custom properties in `src/layouts/Layout.astro`:

```css
:root {
  --accent-primary: #4fc3f7;
  --accent-secondary: #ff8a65;
  --bg-primary: #0a0e13;
  /* ... */
}
```

### Site Configuration
Update site metadata in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

## 📱 Mobile Experience

- Responsive design works across all devices
- Touch-friendly navigation fallbacks
- Optimized typography for mobile reading
- Progressive enhancement approach

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Reduced motion preferences

## 🚀 Deployment

### Static Hosting (Recommended)

The site builds to static files in `dist/` directory:

```bash
npm run build
```

Deploy to:
- **Netlify**: Auto-deploy from Git
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Static hosting
- **Cloudflare Pages**: Edge deployment

### Environment Setup

For production, ensure:
1. Update `site` URL in `astro.config.mjs`
2. Configure proper canonical URLs
3. Set up analytics (optional)
4. Verify social sharing images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📞 Contact

- **Website**: [moshaban.dev](https://moshaban.dev)
- **Email**: hello@moshaban.dev
- **GitHub**: [@moshaban](https://github.com/moshaban)
- **Twitter**: [@_mo_shaban](https://twitter.com/_mo_shaban)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using [Astro](https://astro.build) and modern web technologies.