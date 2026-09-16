import React from "react";
import { SatuCeritaHomePage } from "../satucerita/home";

interface SatuCeritaPageProps {
  onNavigate: (path: string) => void;
}

export const SatuCeritaPage: React.FC<SatuCeritaPageProps> = ({ onNavigate }) => {
  return <SatuCeritaHomePage onNavigate={onNavigate} />;
};

export default SatuCeritaPage;
