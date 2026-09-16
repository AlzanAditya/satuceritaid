import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/layout/Navbar";
import { NavbarInline } from "./components/layout/NavbarInline";
import { Footer } from "./components/layout/Footer";
import { ProgressiveBlur } from "./components/common/ProgressiveBlur";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogsPage } from "./pages/BlogsPage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { YobssPage } from "./pages/apps/YobssPage";
import { ZanxaStudioPage } from "./pages/apps/ZanxaStudioPage";
import { SatuCeritaPage } from "./pages/apps/SatuCeritaPage";
import { projectsData } from "./data/projectsData";
import { blogsData } from "./data/blogsData";
import { LanguageProvider } from "./context/LanguageContext";
import { AnimationProvider, useAnimation } from "./context/AnimationContext";
import { MotionConfig } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { animationsEnabled } = useAnimation();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  // Loading screen component is preserved but disabled per user preference
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Disable browser automatic scroll restoration to avoid jumping to old positions
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const navigate = (path: string) => {
    if (typeof window === "undefined") return;

    // Check if it is purely an in-page anchor scroll on the same page
    if (path.startsWith("#") || (path.startsWith("/#") && currentPath === "/")) {
      const hash = path.includes("#") ? path.substring(path.indexOf("#")) : "";
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // If navigating to the exact same page, just scroll to top
    if (path === currentPath) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    // Instant seamless navigation (loading screen disabled)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    window.history.pushState(null, "", path);
    setCurrentPath(path);
    ScrollTrigger.refresh();

    // If target URL contains a hash, scroll to it after rendering
    if (path.includes("#")) {
      const hash = path.substring(path.indexOf("#"));
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  // Browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || "/";
      if (nextPath === currentPath) return;

      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setCurrentPath(nextPath);
      ScrollTrigger.refresh();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentPath]);

  const handleExitComplete = () => {
    setIsLoading(false);
  };

  const renderContent = () => {
    // 0. Apps: /apps/yoobs (and alias /apps/yobss), /apps/zanxa-studio, /apps/satu-cerita
    if (currentPath.startsWith("/apps/yoobs") || currentPath.startsWith("/apps/yobss")) {
      return <YobssPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/apps/zanxa-studio") || currentPath.startsWith("/apps/zanxastudio")) {
      return <ZanxaStudioPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/apps/satu-cerita") || currentPath.startsWith("/apps/satucerita")) {
      return <SatuCeritaPage onNavigate={navigate} />;
    }

    // 1. Project Detail: /projects/:slug
    if (currentPath.startsWith("/projects/")) {
      const slug = currentPath.replace("/projects/", "").split("/")[0];
      const matchedProject =
        projectsData.find((p) => p.slug === slug || p.id === slug) ||
        (slug === "taksu-explore-tour-and-travel-booking"
          ? projectsData.find((p) => p.slug === "yobss-your-business-system")
          : null) ||
        (slug === "doclink-doctor-and-patient-appointment"
          ? projectsData.find((p) => p.slug === "satu-cerita")
          : null) ||
        projectsData[0];

      return (
        <ProjectDetailPage
          project={matchedProject}
          allProjects={projectsData}
          onNavigate={navigate}
        />
      );
    }

    // 2. Blog Detail: /blogs/:slug or /blog/:slug
    if (currentPath.startsWith("/blogs/") || currentPath.startsWith("/blog/")) {
      const slug = currentPath
        .replace("/blogs/", "")
        .replace("/blog/", "")
        .split("/")[0];
      const matchedBlog =
        blogsData.find((b) => b.slug === slug || b.id === slug) || blogsData[0];

      return (
        <BlogDetailPage
          blog={matchedBlog}
          allBlogs={blogsData}
          onNavigate={navigate}
        />
      );
    }

    // 3. Projects Catalog: /projects
    if (currentPath === "/projects") {
      return (
        <ProjectsPage projects={projectsData} onNavigate={navigate} />
      );
    }

    // 4. Blogs View: /blogs or /blog
    if (currentPath === "/blogs" || currentPath === "/blog") {
      return (
        <BlogsPage blogs={blogsData} onNavigate={navigate} />
      );
    }

    // 5. About Page: /about
    if (currentPath === "/about") {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Home Page: default /
    return (
      <HomePage
        projects={projectsData}
        blogs={blogsData}
        onNavigate={navigate}
      />
    );
  };

  const isAppsRoute = currentPath.startsWith("/apps/");

  return (
    <MotionConfig reducedMotion={animationsEnabled ? "never" : "always"}>
      <div className="min-h-screen w-full overflow-x-clip bg-background text-text-primary flex flex-col font-sans selection:bg-primary/20 selection:text-primary relative">
        {/* LoadingScreen component preserved but disabled per user preference */}
        <LoadingScreen isVisible={false} enabled={false} />
        {isAppsRoute ? (
          <NavbarInline currentPath={currentPath} onNavigate={navigate} />
        ) : (
          <Navbar currentPath={currentPath} onNavigate={navigate} />
        )}
        <div id="main-content-container" className="flex-1 w-full">
          {renderContent()}
        </div>
        <ProgressiveBlur />
        {!isAppsRoute && (
          <Footer key={currentPath} currentPath={currentPath} onNavigate={navigate} />
        )}
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AnimationProvider>
        <AppContent />
      </AnimationProvider>
    </LanguageProvider>
  );
}
