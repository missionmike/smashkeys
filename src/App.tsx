import "./App.css";

import { Orb, useOrbAnimation } from "./hooks/useOrbAnimation";

import Canvas from "./components/Canvas";
import FullscreenContainer from "./components/FullscreenContainer";
import { useRef } from "react";

function App() {
  const orbsRef = useRef<Orb[]>([]);
  const animationFrameRef = useRef<number>();

  useOrbAnimation({ orbsRef, animationFrameRef });

  return (
    <FullscreenContainer>
      <Canvas orbsRef={orbsRef} animationFrameRef={animationFrameRef} />
    </FullscreenContainer>
  );
}

export default App;
