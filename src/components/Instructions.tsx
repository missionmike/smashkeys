import "./Instructions.css";

import { useEffect, useState } from "react";

export const Instructions = () => {
  const [hasTyped, setHasTyped] = useState(false);

  const handleKeyDown = () => {
    setHasTyped(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="instructions" data-has-typed={hasTyped}>
      <h1>SmashKeys!</h1>
      <p>Type to make stuff happen! 🎉</p>
      <p>
        <em>(best in full-screen!)</em>
      </p>
    </div>
  );
};
