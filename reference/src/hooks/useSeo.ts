import { useEffect } from "react";

export interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile" | "blog";
  siteName?: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
  category?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function useSeo({
  title,
  description = "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
  image = "/banner.jpg",
  url,
  type = "website",
  siteName = "Alzan Aditya | Personal Portfolio & Blog Insights",
  author = "Alzan Aditya",
  publishedTime,
  tags = [],
  category,
  imageWidth,
  imageHeight,
}: SeoProps) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes("Alzan Aditya") ? title : `${title} | Alzan Aditya`;
    document.title = fullTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper for link tags
    const setLinkTag = (rel: string, href: string) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    const currentUrl = url
      ? (url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url.startsWith("/") ? url : `/${url}`}`)
      : (typeof window !== "undefined" ? window.location.href : "");

    const rawImageUrl = image.startsWith("http") 
      ? image 
      : (typeof window !== "undefined" ? `${window.location.origin}${image.startsWith("/") ? image : `/${image}`}` : image);
    const fullImageUrl = encodeURI(rawImageUrl);

    // Standard SEO
    setMetaTag("name", "description", description);
    if (tags.length > 0) {
      setMetaTag("name", "keywords", tags.join(", "));
    }
    setMetaTag("name", "author", author);
    setMetaTag("name", "robots", "index, follow");

    // Open Graph
    setMetaTag("property", "og:site_name", siteName);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:image", fullImageUrl);
    setMetaTag("property", "og:image:secure_url", fullImageUrl);
    setMetaTag("property", "og:image:alt", title);
    setMetaTag("property", "og:image:type", fullImageUrl.endsWith(".png") ? "image/png" : fullImageUrl.endsWith(".webp") ? "image/webp" : "image/jpeg");
    setMetaTag("property", "og:image:width", String(imageWidth || 1200));
    setMetaTag("property", "og:image:height", String(imageHeight || (image === "/banner.jpg" ? 900 : 630)));
    setMetaTag("property", "og:locale", "id_ID");

    // Link image_src fallback for WhatsApp/crawlers
    setLinkTag("image_src", fullImageUrl);
    setLinkTag("canonical", currentUrl);

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", fullImageUrl);
    setMetaTag("name", "twitter:image:alt", title);

    if (publishedTime) {
      setMetaTag("property", "article:published_time", publishedTime);
    }
    if (author) {
      setMetaTag("property", "article:author", author);
    }
    if (category) {
      setMetaTag("property", "article:section", category);
    }

    // Dynamic Schema.org JSON-LD for Articles & Blog Posts
    let ldScript = document.querySelector('script[data-dynamic-seo="true"]') as HTMLScriptElement | null;
    if (type === "article" || type === "blog") {
      if (!ldScript) {
        ldScript = document.createElement("script");
        ldScript.type = "application/ld+json";
        ldScript.setAttribute("data-dynamic-seo", "true");
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl,
        },
        "headline": fullTitle,
        "description": description,
        "image": [fullImageUrl],
        "datePublished": publishedTime || "2026-01-01",
        "author": {
          "@type": "Person",
          "name": author || "Alzan Aditya",
          "url": typeof window !== "undefined" ? window.location.origin : "https://alzan.zanxa.studio",
        },
        "publisher": {
          "@type": "Person",
          "name": "Alzan Aditya",
          "url": typeof window !== "undefined" ? window.location.origin : "https://alzan.zanxa.studio",
        },
        "keywords": tags.join(", "),
      });
    } else if (ldScript) {
      ldScript.remove();
    }
  }, [title, description, image, url, type, author, publishedTime, tags, category, imageWidth, imageHeight]);
}
