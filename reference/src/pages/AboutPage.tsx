import React from "react";
import { AboutPageView } from "../components/about/AboutPageView";
import { useSeo } from "../hooks/useSeo";

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useSeo({
    title: "About Me | Alzan Aditya - Web Developer",
    description:
      "Learn more about Alzan Aditya, a passionate web developer and software engineering student building scalable web applications and digital products.",
    image: "/banner.jpg",
    url: "/about",
    type: "profile",
  });

  return <AboutPageView onNavigate={onNavigate} />;
};

export default AboutPage;
