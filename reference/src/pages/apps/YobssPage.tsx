import React from "react";
import { YobssHomePage } from "../yobss/home";

interface YobssPageProps {
  onNavigate: (path: string) => void;
}

export const YobssPage: React.FC<YobssPageProps> = ({ onNavigate }) => {
  return <YobssHomePage onNavigate={onNavigate} />;
};

export default YobssPage;
