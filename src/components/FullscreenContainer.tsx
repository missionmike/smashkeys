import { useEffect, useRef } from "react";

interface FullscreenContainerProps {
  children: React.ReactNode;
}

const FullscreenContainer: React.FC<FullscreenContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const enterFullscreen = async () => {
    try {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      }
    } catch (err) {
      console.error("Error attempting to enter fullscreen:", err);
    }
  };

  useEffect(() => {
    enterFullscreen();
  }, []);

  return (
    <div ref={containerRef} className="app">
      {children}
    </div>
  );
};

export default FullscreenContainer;
