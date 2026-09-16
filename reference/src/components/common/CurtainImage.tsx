import React, { useState, useEffect, useRef } from "react";

interface CurtainImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  curtainClassName?: string;
}

export const CurtainImage: React.FC<CurtainImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  curtainClassName = "bg-white",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if the image is already cached/complete
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Curtain overlay that slides up (-100%) when loaded */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${curtainClassName} ${
          isLoaded ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Image that starts translated down (100%) and hidden until loaded, then slides up smoothly */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
};
