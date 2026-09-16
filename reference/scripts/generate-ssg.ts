import fs from "fs";
import path from "path";
import { projectsData } from "../src/data/projectsData";
import { blogsData } from "../src/data/blogsData";
import { personalInfo } from "../src/data/portfolioData";

interface PageMeta {
  route: string;
  outputPath: string[];
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article" | "profile" | "blog";
  siteName?: string;
  author?: string;
  publishedTime?: string;
  category?: string;
  tags?: string[];
  jsonLd?: object;
}

const DIST_DIR = path.resolve(process.cwd(), "dist");
const BASE_URL = process.env.SITE_URL || "https://alzan.zanxa.studio";
const DEFAULT_4_3_IMAGE = "/banner.jpg";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function ensureAbsoluteUrl(urlOrPath: string): string {
  if (!urlOrPath) return encodeURI(`${BASE_URL}${DEFAULT_4_3_IMAGE}`);
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    return encodeURI(urlOrPath);
  }
  const cleanPath = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return encodeURI(`${BASE_URL}${cleanPath}`);
}

function generateHtmlWithMeta(baseHtml: string, meta: PageMeta): string {
  const fullTitle = escapeHtml(meta.title);
  const cleanDesc = escapeHtml(meta.description.replace(/\s+/g, " ").trim());
  const absoluteImageUrl = ensureAbsoluteUrl(meta.image);
  const canonicalUrl = `${BASE_URL}${meta.route.startsWith("/") ? meta.route : `/${meta.route}`}`;
  const pageType = meta.type || "website";
  const imageAlt = escapeHtml(meta.imageAlt || meta.title);

  // Extract script and link stylesheet tags produced by Vite
  const viteScripts = (baseHtml.match(/<script\s+type="module"[^>]*><\/script>/gi) || []).join("\n    ");
  const viteStyles = (baseHtml.match(/<link\s+rel="stylesheet"[^>]*>/gi) || []).join("\n    ");

  // Build new SEO & Social meta block
  const articleMetaTags =
    pageType === "article"
      ? `
    <meta property="article:author" content="${escapeHtml(meta.author || personalInfo.name)}" />
    ${meta.publishedTime ? `<meta property="article:published_time" content="${escapeHtml(meta.publishedTime)}" />` : ""}
    ${meta.category ? `<meta property="article:section" content="${escapeHtml(meta.category)}" />` : ""}
    ${(meta.tags || []).map((t) => `<meta property="article:tag" content="${escapeHtml(t)}" />`).join("\n    ")}`
      : "";

  const jsonLdScript = meta.jsonLd
    ? `\n    <script type="application/ld+json">\n${JSON.stringify(meta.jsonLd, null, 2)}\n    </script>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${fullTitle}</title>
    <meta name="description" content="${cleanDesc}" />
    <meta name="author" content="${escapeHtml(meta.author || personalInfo.name)}" />
    <meta name="robots" content="index, follow" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="image_src" href="${absoluteImageUrl}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:site_name" content="${escapeHtml(meta.siteName || `${personalInfo.name} | Personal Portfolio & Blog Insights`)}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${cleanDesc}" />
    <meta property="og:type" content="${pageType}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${absoluteImageUrl}" />
    <meta property="og:image:secure_url" content="${absoluteImageUrl}" />
    <meta property="og:image:type" content="${absoluteImageUrl.endsWith('.png') ? 'image/png' : absoluteImageUrl.endsWith('.webp') ? 'image/webp' : 'image/jpeg'}" />
    <meta property="og:image:alt" content="${imageAlt}" />
    <meta property="og:image:width" content="${meta.imageWidth || 1200}" />
    <meta property="og:image:height" content="${meta.imageHeight || (meta.image === DEFAULT_4_3_IMAGE ? 900 : 630)}" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:locale:alternate" content="en_US" />${articleMetaTags}

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${cleanDesc}" />
    <meta name="twitter:image" content="${absoluteImageUrl}" />
    <meta name="twitter:image:alt" content="${imageAlt}" />${jsonLdScript}

    ${viteStyles}
    ${viteScripts}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
}

function writeHtmlFiles(baseHtml: string, meta: PageMeta) {
  const rendered = generateHtmlWithMeta(baseHtml, meta);

  for (const relativeOut of meta.outputPath) {
    const fullOut = path.join(DIST_DIR, relativeOut);
    const dir = path.dirname(fullOut);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullOut, rendered, "utf-8");
  }
}

function generateSitemap(pages: PageMeta[]) {
  const now = new Date().toISOString().split("T")[0];
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of pages) {
    const loc = `${BASE_URL}${page.route === "/" ? "" : page.route}`;
    let priority = "0.7";
    let changefreq = "weekly";

    if (page.route === "/") {
      priority = "1.0";
      changefreq = "daily";
    } else if (page.route === "/projects" || page.route === "/blogs" || page.route === "/about") {
      priority = "0.9";
      changefreq = "weekly";
    } else if (page.type === "article") {
      priority = "0.8";
      changefreq = "monthly";
    }

    sitemapXml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${page.publishedTime ? new Date(page.publishedTime).toISOString().split("T")[0] : now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }

  sitemapXml += `\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), sitemapXml, "utf-8");
}

function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), robotsTxt, "utf-8");
}

export function runSSG() {
  console.log("⚡ Starting Static Site Generation (SSG)...");

  if (!fs.existsSync(DIST_DIR)) {
    console.error("❌ Error: dist/ directory not found. Please run 'vite build' first.");
    process.exit(1);
  }

  const templatePath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("❌ Error: dist/index.html not found.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, "utf-8");
  const pages: PageMeta[] = [];

  // 1. Root / Home Page (4:3 Cover Image)
  pages.push({
    route: "/",
    outputPath: ["index.html"],
    title: "Alzan Aditya | Personal Portfolio & Blog Insights",
    description:
      "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
    image: DEFAULT_4_3_IMAGE,
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt: "Alzan Aditya Portfolio Cover 4:3",
    type: "website",
    author: personalInfo.name,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      url: BASE_URL,
      image: ensureAbsoluteUrl(personalInfo.avatar),
      jobTitle: personalInfo.role,
      description:
        "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
      sameAs: [
        personalInfo.github,
        personalInfo.instagram,
        personalInfo.linkedin,
        personalInfo.tiktok,
      ].filter(Boolean),
    },
  });

  // 2. About Page (4:3 Cover Image)
  pages.push({
    route: "/about",
    outputPath: ["about.html", "about/index.html"],
    title: `About Me | ${personalInfo.name} - Web Developer`,
    description: `Learn more about ${personalInfo.name}, a passionate web developer with 3+ years experience building scalable software, ERP platforms, and websites.`,
    image: DEFAULT_4_3_IMAGE,
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt: `About ${personalInfo.name}`,
    type: "profile",
    author: personalInfo.name,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: personalInfo.name,
        jobTitle: personalInfo.role,
        description: personalInfo.bio,
      },
    },
  });

  // 3. Projects Catalog Page (4:3 Cover Image)
  pages.push({
    route: "/projects",
    outputPath: ["projects.html", "projects/index.html"],
    title: `Featured Projects & Case Studies | ${personalInfo.name}`,
    description: `Explore full-stack web applications, tour & travel reservation systems, library ERP platforms, and custom digital software engineered by ${personalInfo.name}.`,
    image: DEFAULT_4_3_IMAGE,
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt: `Projects by ${personalInfo.name}`,
    type: "website",
    author: personalInfo.name,
  });

  // 4. Blogs Catalog Page (4:3 Cover Image)
  pages.push({
    route: "/blogs",
    outputPath: ["blogs.html", "blogs/index.html", "blog.html", "blog/index.html"],
    title: `Tech Articles & Freelance Guides | ${personalInfo.name}`,
    description: `Read technical guides, client communication strategies, freelance roadmaps, and tech stack insights by ${personalInfo.name}.`,
    image: DEFAULT_4_3_IMAGE,
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt: `Blogs & Guides by ${personalInfo.name}`,
    type: "blog",
    author: personalInfo.name,
  });

  // 5. Individual Projects (Uses individual project cover image)
  for (const project of projectsData) {
    const projectCover =
      project.images && project.images.length > 0
        ? project.images[0]
        : DEFAULT_4_3_IMAGE;

    const outPaths = [
      `projects/${project.slug}/index.html`,
      `projects/${project.slug}.html`,
    ];

    if (project.id && project.id !== project.slug) {
      outPaths.push(`projects/${project.id}/index.html`);
      outPaths.push(`projects/${project.id}.html`);
    }

    pages.push({
      route: `/projects/${project.slug}`,
      outputPath: outPaths,
      title: `${project.title} - Case Study | ${personalInfo.name}`,
      description: project.overview.length > 200 ? `${project.overview.slice(0, 197)}...` : project.overview,
      image: projectCover,
      imageAlt: `${project.title} Cover`,
      type: "article",
      category: project.category,
      tags: project.tags,
      author: project.authors?.[0]?.name || personalInfo.name,
      publishedTime: project.uploadedDate,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.overview,
        applicationCategory: project.category,
        image: ensureAbsoluteUrl(projectCover),
        author: {
          "@type": "Person",
          name: project.authors?.[0]?.name || personalInfo.name,
        },
        datePublished: project.uploadedDate,
      },
    });
  }

  // 6. Individual Blogs (Uses individual blog thumbnail/cover image)
  for (const blog of blogsData) {
    const blogCover = blog.coverImage || DEFAULT_4_3_IMAGE;

    const outPaths = [
      `blogs/${blog.slug}/index.html`,
      `blogs/${blog.slug}.html`,
      `blog/${blog.slug}/index.html`,
      `blog/${blog.slug}.html`,
    ];

    if (blog.id && blog.id !== blog.slug) {
      outPaths.push(`blogs/${blog.id}/index.html`);
      outPaths.push(`blogs/${blog.id}.html`);
    }

    pages.push({
      route: `/blogs/${blog.slug}`,
      outputPath: outPaths,
      title: `${blog.title} | ${personalInfo.name}`,
      description: blog.excerpt || blog.content.slice(0, 180),
      image: blogCover,
      imageAlt: `${blog.title} Thumbnail`,
      type: "article",
      category: blog.category,
      tags: blog.tags,
      author: blog.author?.name || personalInfo.name,
      publishedTime: blog.publishDate,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt,
        image: ensureAbsoluteUrl(blogCover),
        datePublished: blog.publishDate,
        author: {
          "@type": "Person",
          name: blog.author?.name || personalInfo.name,
        },
        publisher: {
          "@type": "Person",
          name: personalInfo.name,
          image: ensureAbsoluteUrl(personalInfo.avatar),
        },
      },
    });
  }

  // 7. Yobss Application (/apps/yoobs and /apps/yobss)
  pages.push({
    route: "/apps/yoobs",
    outputPath: [
      "apps/yoobs/index.html",
      "apps/yoobs.html",
      "apps/yobss/index.html",
      "apps/yobss.html",
    ],
    title: "Yobss - Your Business System | Platform Modular Manajemen Bisnis",
    description:
      "YOBSS (Your Business System) adalah platform business management modular yang dirancang untuk membantu perusahaan mengelola proses bisnis, aset, operasional, inventory, maintenance, workforce, dan pelaporan terpadu.",
    image: "/logos/yobss.png",
    imageWidth: 256,
    imageHeight: 256,
    imageAlt: "Logo YOBSS - Your Business System",
    type: "website",
    siteName: "Yobss - Your Business System",
    author: personalInfo.name,
    category: "Business Management System",
    tags: [
      "Asset Management",
      "Multi-Role",
      "inventory",
      "worker management",
      "service Management",
      "Reporting System",
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "YOBSS - Your Business System",
      description:
        "Platform business management modular yang dirancang untuk membantu perusahaan mengelola berbagai proses bisnis dan operasional dalam satu sistem yang terstruktur.",
      applicationCategory: "BusinessApplication",
      image: ensureAbsoluteUrl("/logos/yobss.png"),
      operatingSystem: "Web Browser",
      author: {
        "@type": "Person",
        name: personalInfo.name,
      },
    },
  });

  // 8. Zanxa Studio Application (/apps/zanxa-studio and /apps/zanxastudio)
  pages.push({
    route: "/apps/zanxa-studio",
    outputPath: [
      "apps/zanxa-studio/index.html",
      "apps/zanxa-studio.html",
      "apps/zanxastudio/index.html",
      "apps/zanxastudio.html",
    ],
    title: "Zanxa Studio | Creative Web Agency & Digital Solutions",
    description:
      "Zanxa Studio adalah studio pengembangan website profesional oleh Alzan Aditya yang berfokus membangun website modern, sistem bisnis digital terintegrasi, dan solusi kreatif berkinerja tinggi.",
    image: "/logos/zanxa-studio.png",
    imageWidth: 256,
    imageHeight: 256,
    imageAlt: "Logo Zanxa Studio",
    type: "website",
    siteName: "Zanxa Studio",
    author: personalInfo.name,
    category: "Web Development Agency",
    tags: [
      "Web Design",
      "Web Development",
      "Custom ERP",
      "Digital Transformation",
      "Creative Agency",
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Zanxa Studio",
      description:
        "Studio pengembangan website profesional berfokus membangun website modern, scalable business systems, dan solusi digital kreatif.",
      image: ensureAbsoluteUrl("/logos/zanxa-studio.png"),
      founder: {
        "@type": "Person",
        name: personalInfo.name,
      },
      url: `${BASE_URL}/apps/zanxa-studio`,
    },
  });

  // 9. Satu Cerita Application (/apps/satu-cerita and /apps/satucerita)
  pages.push({
    route: "/apps/satu-cerita",
    outputPath: [
      "apps/satu-cerita/index.html",
      "apps/satu-cerita.html",
      "apps/satucerita/index.html",
      "apps/satucerita.html",
    ],
    title: "Satu Cerita - Buat Momen Spesial Jadi Lebih Berkesan | Platform Undangan Digital & Event",
    description:
      "Hadirkan undangan yang istimewa dan bagikan momen spesial Anda. Satu Cerita adalah platform SaaS undangan digital dan manajemen perayaan modern dengan RSVP real-time, buku tamu digital, dan integrasi kustom.",
    image: "/logos/satucerita.png",
    imageWidth: 256,
    imageHeight: 256,
    imageAlt: "Logo Satu Cerita",
    type: "website",
    siteName: "Satu Cerita",
    author: personalInfo.name,
    category: "Digital Invitation SaaS",
    tags: [
      "Digital Invitation",
      "SaaS",
      "Event Management",
      "RSVP",
      "Undangan Digital",
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Satu Cerita",
      description:
        "Platform SaaS undangan digital dan manajemen acara modern untuk pernikahan, perayaan, dan berbagai momen istimewa.",
      applicationCategory: "WebApplication",
      image: ensureAbsoluteUrl("/logos/satucerita.png"),
      operatingSystem: "Web Browser",
      author: {
        "@type": "Person",
        name: personalInfo.name,
      },
    },
  });

  // Generate HTML files
  let fileCount = 0;
  for (const page of pages) {
    writeHtmlFiles(baseHtml, page);
    fileCount += page.outputPath.length;
  }

  // Generate Sitemap and Robots.txt
  generateSitemap(pages);
  generateRobotsTxt();

  console.log(`✅ SSG Complete! Generated ${fileCount} static HTML files across ${pages.length} unique routes.`);
  console.log(`✅ sitemap.xml and robots.txt generated successfully.`);
}

runSSG();
