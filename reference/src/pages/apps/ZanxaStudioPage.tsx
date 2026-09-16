import React from "react";
import { ZanxaStudioHomePage } from "../zanxastudio/home";

interface ZanxaStudioPageProps {
  onNavigate: (path: string) => void;
}

export const ZanxaStudioPage: React.FC<ZanxaStudioPageProps> = ({ onNavigate }) => {
  return <ZanxaStudioHomePage onNavigate={onNavigate} />;
};

export default ZanxaStudioPage;
