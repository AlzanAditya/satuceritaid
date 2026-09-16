import React from "react";

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const SplitWords: React.FC<SplitWordsProps> = ({
  text,
  className = "",
  wordClassName = "word inline-block",
}) => {
  if (!text) return null;
  const words = text.trim().split(/\s+/);
  return (
    <span key={text} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block pb-0.5">
          <span className={wordClassName}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
};
